/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 * @jest-environment ./scripts/jest/ReactDOMServerIntegrationEnvironment
 */

'use strict';

// Polyfills for test environment
global.ReadableStream =
  require('web-streams-polyfill/ponyfill/es6').ReadableStream;
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
if (typeof Blob === 'undefined') {
  global.Blob = require('buffer').Blob;
}
if (typeof File === 'undefined') {
  global.File = require('buffer').File;
}

// Don't wait before processing work on the server.
// TODO: we can replace this with FlightServer.act().
global.setTimeout = cb => cb();

let serverExports;
let clientExports;
let webpackMap;
let webpackModules;
let webpackModuleLoading;
let React;
let ReactDOMServer;
let ReactServerDOMServer;
let ReactServerDOMClient;
let use;

describe('ReactFlightDOMEdge', () => {
  beforeEach(() => {
    jest.resetModules();

    // Simulate the condition resolution
    jest.mock('react', () => require('react/react.react-server'));
    jest.mock('react-server-dom-webpack/server', () =>
      require('react-server-dom-webpack/server.edge'),
    );

    const WebpackMock = require('./utils/WebpackMock');

    serverExports = WebpackMock.serverExports;
    clientExports = WebpackMock.clientExports;
    webpackMap = WebpackMock.webpackMap;
    webpackModules = WebpackMock.webpackModules;
    webpackModuleLoading = WebpackMock.moduleLoading;

    ReactServerDOMServer = require('react-server-dom-webpack/server');

    jest.resetModules();
    __unmockReact();
    jest.unmock('react-server-dom-webpack/server');
    jest.mock('react-server-dom-webpack/client', () =>
      require('react-server-dom-webpack/client.edge'),
    );
    React = require('react');
    ReactDOMServer = require('react-dom/server.edge');
    ReactServerDOMClient = require('react-server-dom-webpack/client');
    use = React.use;
  });

  function passThrough(stream) {
    // Simulate more realistic network by splitting up and rejoining some chunks.
    // This lets us test that we don't accidentally rely on particular bounds of the chunks.
    return new ReadableStream({
      async start(controller) {
        const reader = stream.getReader();
        let prevChunk = new Uint8Array(0);
        function push() {
          reader.read().then(({done, value}) => {
            if (done) {
              controller.enqueue(prevChunk);
              prevChunk = new Uint8Array(0);
              controller.close();
              return;
            }
            const chunk = new Uint8Array(prevChunk.length + value.length);
            chunk.set(prevChunk, 0);
            chunk.set(value, prevChunk.length);
            if (chunk.length > 50) {
              controller.enqueue(chunk.subarray(0, chunk.length - 50));
              prevChunk = chunk.subarray(chunk.length - 50);
            } else {
              // Wait to see if we get some more bytes to join in.
              prevChunk = chunk;
              // Flush if we don't get any more.
              (async function flushAfterAFewTasks() {
                for (let i = 0; i < 10; i++) {
                  await i;
                }
                if (prevChunk.byteLength > 0) {
                  controller.enqueue(prevChunk);
                }
                prevChunk = new Uint8Array(0);
              })();
            }
            push();
          });
        }
        push();
      },
    });
  }

  async function readResult(stream) {
    const reader = stream.getReader();
    let result = '';
    while (true) {
      const {done, value} = await reader.read();
      if (done) {
        return result;
      }
      result += Buffer.from(value).toString('utf8');
    }
  }

  async function readByteLength(stream) {
    const reader = stream.getReader();
    let length = 0;
    while (true) {
      const {done, value} = await reader.read();
      if (done) {
        return length;
      }
      length += value.byteLength;
    }
  }

  it('should allow an alternative module mapping to be used for SSR', async () => {
    function ClientComponent() {
      return <span>Client Component</span>;
    }
    // The Client build may not have the same IDs as the Server bundles for the same
    // component.
    const ClientComponentOnTheClient = clientExports(ClientComponent);
    const ClientComponentOnTheServer = clientExports(ClientComponent);

    // In the SSR bundle this module won't exist. We simulate this by deleting it.
    const clientId = webpackMap[ClientComponentOnTheClient.$$id].id;
    delete webpackModules[clientId];

    // Instead, we have to provide a translation from the client meta data to the SSR
    // meta data.
    const ssrMetadata = webpackMap[ClientComponentOnTheServer.$$id];
    const translationMap = {
      [clientId]: {
        '*': ssrMetadata,
      },
    };

    function App() {
      return <ClientComponentOnTheClient />;
    }

    const stream = ReactServerDOMServer.renderToReadableStream(
      <App />,
      webpackMap,
    );
    const response = ReactServerDOMClient.createFromReadableStream(stream, {
      ssrManifest: {
        moduleMap: translationMap,
        moduleLoading: webpackModuleLoading,
      },
    });

    function ClientRoot() {
      return use(response);
    }

    const ssrStream = await ReactDOMServer.renderToReadableStream(
      <ClientRoot />,
    );
    const result = await readResult(ssrStream);
    expect(result).toEqual('<span>Client Component</span>');
  });

  it('should encode long string in a compact format', async () => {
    const testString = '"\n\t'.repeat(500) + '🙃';
    const testString2 = 'hello'.repeat(400);

    const stream = ReactServerDOMServer.renderToReadableStream({
      text: testString,
      text2: testString2,
    });
    const [stream1, stream2] = passThrough(stream).tee();

    const serializedContent = await readResult(stream1);
    // The content should be compact an unescaped
    expect(serializedContent.length).toBeLessThan(4000);
    expect(serializedContent).not.toContain('\\n');
    expect(serializedContent).not.toContain('\\t');
    expect(serializedContent).not.toContain('\\"');
    expect(serializedContent).toContain('\t');

    const result = await ReactServerDOMClient.createFromReadableStream(
      stream2,
      {
        ssrManifest: {
          moduleMap: null,
          moduleLoading: null,
        },
      },
    );
    // Should still match the result when parsed
    expect(result.text).toBe(testString);
    expect(result.text2).toBe(testString2);
  });

  it('should encode repeated objects in a compact format by deduping', async () => {
    const obj = {
      this: {is: 'a large objected'},
      with: {many: 'properties in it'},
    };
    const props = {
      items: new Array(30).fill(obj),
    };
    const stream = ReactServerDOMServer.renderToReadableStream(props);
    const [stream1, stream2] = passThrough(stream).tee();

    const serializedContent = await readResult(stream1);
    expect(serializedContent.length).toBeLessThan(400);

    const result = await ReactServerDOMClient.createFromReadableStream(
      stream2,
      {
        ssrManifest: {
          moduleMap: null,
          moduleLoading: null,
        },
      },
    );
    // Should still match the result when parsed
    expect(result).toEqual(props);
    expect(result.items[5]).toBe(result.items[10]); // two random items are the same instance
    // TODO: items[0] is not the same as the others in this case
  });

  it('should execute repeated server components only once', async () => {
    const str = 'this is a long return value';
    let timesRendered = 0;
    function ServerComponent() {
      timesRendered++;
      return str;
    }
    const element = <ServerComponent />;
    const children = new Array(30).fill(element);
    const resolvedChildren = new Array(30).fill(str);
    const stream = ReactServerDOMServer.renderToReadableStream(children);
    const [stream1, stream2] = passThrough(stream).tee();

    const serializedContent = await readResult(stream1);

    expect(serializedContent.length).toBeLessThan(400);
    expect(timesRendered).toBeLessThan(5);

    const model = await ReactServerDOMClient.createFromReadableStream(stream2, {
      ssrManifest: {
        moduleMap: null,
        moduleLoading: null,
      },
    });

    // Use the SSR render to resolve any lazy elements
    const ssrStream = await ReactDOMServer.renderToReadableStream(model);
    // Should still match the result when parsed
    const result = await readResult(ssrStream);
    expect(result).toEqual(resolvedChildren.join('<!-- -->'));
  });

  it('should execute repeated host components only once', async () => {
    const div = <div>this is a long return value</div>;
    let timesRendered = 0;
    function ServerComponent() {
      timesRendered++;
      return div;
    }
    const element = <ServerComponent />;
    const children = new Array(30).fill(element);
    const resolvedChildren = new Array(30).fill(
      '<div>this is a long return value</div>',
    );
    const stream = ReactServerDOMServer.renderToReadableStream(children);
    const [stream1, stream2] = passThrough(stream).tee();

    const serializedContent = await readResult(stream1);
    expect(serializedContent.length).toBeLessThan(400);
    expect(timesRendered).toBeLessThan(5);

    const model = await ReactServerDOMClient.createFromReadableStream(stream2, {
      ssrManifest: {
        moduleMap: null,
        moduleLoading: null,
      },
    });

    // Use the SSR render to resolve any lazy elements
    const ssrStream = await ReactDOMServer.renderToReadableStream(model);
    // Should still match the result when parsed
    const result = await readResult(ssrStream);
    expect(result).toEqual(resolvedChildren.join(''));
  });

  it('should execute repeated server components in a compact form', async () => {
    async function ServerComponent({recurse}) {
      if (recurse > 0) {
        return <ServerComponent recurse={recurse - 1} />;
      }
      return <div>Fin</div>;
    }
    const stream = ReactServerDOMServer.renderToReadableStream(
      <ServerComponent recurse={20} />,
    );
    const serializedContent = await readResult(stream);
    const expectedDebugInfoSize = __DEV__ ? 64 * 20 : 0;
    expect(serializedContent.length).toBeLessThan(150 + expectedDebugInfoSize);
  });

  // @gate enableBinaryFlight
  it('should be able to serialize any kind of typed array', async () => {
    const buffer = new Uint8Array([
      123, 4, 10, 5, 100, 255, 244, 45, 56, 67, 43, 124, 67, 89, 100, 20,
    ]).buffer;
    const buffers = [
      buffer,
      new Int8Array(buffer, 1),
      new Uint8Array(buffer, 2),
      new Uint8ClampedArray(buffer, 2),
      new Int16Array(buffer, 2),
      new Uint16Array(buffer, 2),
      new Int32Array(buffer, 4),
      new Uint32Array(buffer, 4),
      new Float32Array(buffer, 4),
      new Float64Array(buffer, 0),
      new BigInt64Array(buffer, 0),
      new BigUint64Array(buffer, 0),
      new DataView(buffer, 3),
    ];
    const stream = passThrough(
      ReactServerDOMServer.renderToReadableStream(buffers),
    );
    const result = await ReactServerDOMClient.createFromReadableStream(stream, {
      ssrManifest: {
        moduleMap: null,
        moduleLoading: null,
      },
    });
    expect(result).toEqual(buffers);
  });

  // @gate enableBinaryFlight
  it('should be able to serialize a blob', async () => {
    const bytes = new Uint8Array([
      123, 4, 10, 5, 100, 255, 244, 45, 56, 67, 43, 124, 67, 89, 100, 20,
    ]);
    const blob = new Blob([bytes, bytes], {
      type: 'application/x-test',
    });
    const stream = passThrough(
      ReactServerDOMServer.renderToReadableStream(blob),
    );
    const result = await ReactServerDOMClient.createFromReadableStream(stream, {
      ssrManifest: {
        moduleMap: null,
        moduleLoading: null,
      },
    });
    expect(result instanceof Blob).toBe(true);
    expect(result.size).toBe(bytes.length * 2);
    expect(await result.arrayBuffer()).toEqual(await blob.arrayBuffer());
  });

  if (typeof FormData !== 'undefined' && typeof File !== 'undefined') {
    // @gate enableBinaryFlight
    it('can transport FormData (blobs)', async () => {
      const bytes = new Uint8Array([
        123, 4, 10, 5, 100, 255, 244, 45, 56, 67, 43, 124, 67, 89, 100, 20,
      ]);
      const blob = new Blob([bytes, bytes], {
        type: 'application/x-test',
      });

      const formData = new FormData();
      formData.append('hi', 'world');
      formData.append('file', blob, 'filename.test');

      expect(formData.get('file') instanceof File).toBe(true);
      expect(formData.get('file').name).toBe('filename.test');

      const stream = passThrough(
        ReactServerDOMServer.renderToReadableStream(formData),
      );
      const result = await ReactServerDOMClient.createFromReadableStream(
        stream,
        {
          ssrManifest: {
            moduleMap: null,
            moduleLoading: null,
          },
        },
      );

      expect(result instanceof FormData).toBe(true);
      expect(result.get('hi')).toBe('world');
      const resultBlob = result.get('file');
      expect(resultBlob instanceof Blob).toBe(true);
      expect(resultBlob.name).toBe('blob'); // We should not pass through the file name for security.
      expect(resultBlob.size).toBe(bytes.length * 2);
      expect(await resultBlob.arrayBuffer()).toEqual(await blob.arrayBuffer());
    });
  }

  it('can pass an async import that resolves later to an outline object like a Map', async () => {
    let resolve;
    const promise = new Promise(r => (resolve = r));

    const asyncClient = clientExports(promise);

    // We await the value on the servers so it's an async value that the client should wait for
    const awaitedValue = await asyncClient;

    const map = new Map();
    map.set('value', awaitedValue);

    const stream = passThrough(
      ReactServerDOMServer.renderToReadableStream(map, webpackMap),
    );

    // Parsing the root blocks because the module hasn't loaded yet
    const resultPromise = ReactServerDOMClient.createFromReadableStream(
      stream,
      {
        ssrManifest: {
          moduleMap: null,
          moduleLoading: null,
        },
      },
    );

    // Afterwards we finally resolve the module value so it's available on the client
    resolve('hello');

    const result = await resultPromise;
    expect(result instanceof Map).toBe(true);
    expect(result.get('value')).toBe('hello');
  });

  // @gate enableFlightReadableStream
  it('can pass an async import to a ReadableStream while enqueuing in order', async () => {
    let resolve;
    const promise = new Promise(r => (resolve = r));

    const asyncClient = clientExports(promise);

    // We await the value on the servers so it's an async value that the client should wait for
    const awaitedValue = await asyncClient;

    const s = new ReadableStream({
      start(c) {
        c.enqueue('hello');
        c.enqueue(awaitedValue);
        c.enqueue('!');
        c.close();
      },
    });

    const stream = passThrough(
      ReactServerDOMServer.renderToReadableStream(s, webpackMap),
    );

    const result = await ReactServerDOMClient.createFromReadableStream(stream, {
      ssrManifest: {
        moduleMap: null,
        moduleLoading: null,
      },
    });

    const reader = result.getReader();

    expect(await reader.read()).toEqual({value: 'hello', done: false});

    const readPromise = reader.read();
    // We resolve this after we've already received the '!' row.
    await resolve('world');

    expect(await readPromise).toEqual({value: 'world', done: false});
    expect(await reader.read()).toEqual({value: '!', done: false});
    expect(await reader.read()).toEqual({value: undefined, done: true});
  });

  // @gate enableFlightReadableStream
  it('can pass an async import a AsyncIterable while allowing peaking at future values', async () => {
    let resolve;
    const promise = new Promise(r => (resolve = r));

    const asyncClient = clientExports(promise);

    const multiShotIterable = {
      async *[Symbol.asyncIterator]() {
        yield 'hello';
        // We await the value on the servers so it's an async value that the client should wait for
        yield await asyncClient;
        yield '!';
      },
    };

    const stream = passThrough(
      ReactServerDOMServer.renderToReadableStream(
        multiShotIterable,
        webpackMap,
      ),
    );

    // Parsing the root blocks because the module hasn't loaded yet
    const result = await ReactServerDOMClient.createFromReadableStream(stream, {
      ssrManifest: {
        moduleMap: null,
        moduleLoading: null,
      },
    });

    const iterator = result[Symbol.asyncIterator]();

    expect(await iterator.next()).toEqual({value: 'hello', done: false});

    const readPromise = iterator.next();

    // While the previous promise didn't resolve yet, we should be able to peak at the next value
    // by iterating past it.
    expect(await iterator.next()).toEqual({value: '!', done: false});

    // We resolve the previous row after we've already received the '!' row.
    await resolve('world');
    expect(await readPromise).toEqual({value: 'world', done: false});

    expect(await iterator.next()).toEqual({value: undefined, done: true});
  });

  it('warns if passing a this argument to bind() of a server reference', async () => {
    const ServerModule = serverExports({
      greet: function () {},
    });

    const ServerModuleImportedOnClient = {
      greet: ReactServerDOMClient.createServerReference(
        ServerModule.greet.$$id,
        async function (ref, args) {},
      ),
    };

    expect(() => {
      ServerModule.greet.bind({}, 'hi');
    }).toErrorDev(
      'Cannot bind "this" of a Server Action. Pass null or undefined as the first argument to .bind().',
      {withoutStack: true},
    );

    expect(() => {
      ServerModuleImportedOnClient.greet.bind({}, 'hi');
    }).toErrorDev(
      'Cannot bind "this" of a Server Action. Pass null or undefined as the first argument to .bind().',
      {withoutStack: true},
    );
  });

  // @gate enableFlightReadableStream && enableBinaryFlight
  it('should supports ReadableStreams with typed arrays', async () => {
    const buffer = new Uint8Array([
      123, 4, 10, 5, 100, 255, 244, 45, 56, 67, 43, 124, 67, 89, 100, 20,
    ]).buffer;
    const buffers = [
      buffer,
      new Int8Array(buffer, 1),
      new Uint8Array(buffer, 2),
      new Uint8ClampedArray(buffer, 2),
      new Int16Array(buffer, 2),
      new Uint16Array(buffer, 2),
      new Int32Array(buffer, 4),
      new Uint32Array(buffer, 4),
      new Float32Array(buffer, 4),
      new Float64Array(buffer, 0),
      new BigInt64Array(buffer, 0),
      new BigUint64Array(buffer, 0),
      new DataView(buffer, 3),
    ];

    // This is not a binary stream, it's a stream that contain binary chunks.
    const s = new ReadableStream({
      start(c) {
        for (let i = 0; i < buffers.length; i++) {
          c.enqueue(buffers[i]);
        }
        c.close();
      },
    });

    const stream = ReactServerDOMServer.renderToReadableStream(s, {});

    const [stream1, stream2] = passThrough(stream).tee();

    const result = await ReactServerDOMClient.createFromReadableStream(
      stream1,
      {
        ssrManifest: {
          moduleMap: null,
          moduleLoading: null,
        },
      },
    );

    expect(await readByteLength(stream2)).toBeLessThan(300);

    const streamedBuffers = [];
    const reader = result.getReader();
    let entry;
    while (!(entry = await reader.read()).done) {
      streamedBuffers.push(entry.value);
    }

    expect(streamedBuffers).toEqual(buffers);
  });

  // @gate enableFlightReadableStream && enableBinaryFlight
  it('should support BYOB binary ReadableStreams', async () => {
    const buffer = new Uint8Array([
      123, 4, 10, 5, 100, 255, 244, 45, 56, 67, 43, 124, 67, 89, 100, 20,
    ]).buffer;
    const buffers = [
      new Int8Array(buffer, 1),
      new Uint8Array(buffer, 2),
      new Uint8ClampedArray(buffer, 2),
      new Int16Array(buffer, 2),
      new Uint16Array(buffer, 2),
      new Int32Array(buffer, 4),
      new Uint32Array(buffer, 4),
      new Float32Array(buffer, 4),
      new Float64Array(buffer, 0),
      new BigInt64Array(buffer, 0),
      new BigUint64Array(buffer, 0),
      new DataView(buffer, 3),
    ];

    // This a binary stream where each chunk ends up as Uint8Array.
    const s = new ReadableStream({
      type: 'bytes',
      start(c) {
        for (let i = 0; i < buffers.length; i++) {
          c.enqueue(buffers[i]);
        }
        c.close();
      },
    });

    const stream = ReactServerDOMServer.renderToReadableStream(s, {});

    const [stream1, stream2] = passThrough(stream).tee();

    const result = await ReactServerDOMClient.createFromReadableStream(
      stream1,
      {
        ssrManifest: {
          moduleMap: null,
          moduleLoading: null,
        },
      },
    );

    expect(await readByteLength(stream2)).toBeLessThan(300);

    const streamedBuffers = [];
    const reader = result.getReader({mode: 'byob'});
    let entry;
    while (!(entry = await reader.read(new Uint8Array(10))).done) {
      expect(entry.value instanceof Uint8Array).toBe(true);
      streamedBuffers.push(entry.value);
    }

    // The streamed buffers might be in different chunks and in Uint8Array form but
    // the concatenated bytes should be the same.
    expect(streamedBuffers.flatMap(t => Array.from(t))).toEqual(
      buffers.flatMap(c =>
        Array.from(new Uint8Array(c.buffer, c.byteOffset, c.byteLength)),
      ),
    );
  });
});
