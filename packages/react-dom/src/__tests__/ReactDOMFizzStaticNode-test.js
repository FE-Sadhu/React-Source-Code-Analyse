/**
<<<<<<< HEAD
 * Copyright (c) Facebook, Inc. and its affiliates.
=======
 * Copyright (c) Meta Platforms, Inc. and affiliates.
>>>>>>> remotes/upstream/main
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
<<<<<<< HEAD
 */

// TODO: This should actually run in `@jest-environment node` but we currently
// run an old jest that doesn't support AbortController so we use DOM for now.

=======
 * @jest-environment node
 */

>>>>>>> remotes/upstream/main
'use strict';

let React;
let ReactDOMFizzStatic;
let Suspense;

describe('ReactDOMFizzStaticNode', () => {
  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    if (__EXPERIMENTAL__) {
      ReactDOMFizzStatic = require('react-dom/static');
    }
    Suspense = React.Suspense;
  });

  const theError = new Error('This is an error');
  function Throw() {
    throw theError;
  }
  const theInfinitePromise = new Promise(() => {});
  function InfiniteSuspend() {
    throw theInfinitePromise;
  }

  function readContent(readable) {
    return new Promise((resolve, reject) => {
      let content = '';
      readable.on('data', chunk => {
        content += Buffer.from(chunk).toString('utf8');
      });
      readable.on('error', error => {
        reject(error);
      });
      readable.on('end', () => resolve(content));
    });
  }

  // @gate experimental
<<<<<<< HEAD
  it('should call prerenderToNodeStreams', async () => {
    const result = await ReactDOMFizzStatic.prerenderToNodeStreams(
=======
  it('should call prerenderToNodeStream', async () => {
    const result = await ReactDOMFizzStatic.prerenderToNodeStream(
>>>>>>> remotes/upstream/main
      <div>hello world</div>,
    );
    const prelude = await readContent(result.prelude);
    expect(prelude).toMatchInlineSnapshot(`"<div>hello world</div>"`);
  });

  // @gate experimental
  it('should emit DOCTYPE at the root of the document', async () => {
<<<<<<< HEAD
    const result = await ReactDOMFizzStatic.prerenderToNodeStreams(
=======
    const result = await ReactDOMFizzStatic.prerenderToNodeStream(
>>>>>>> remotes/upstream/main
      <html>
        <body>hello world</body>
      </html>,
    );
    const prelude = await readContent(result.prelude);
<<<<<<< HEAD
    expect(prelude).toMatchInlineSnapshot(
      `"<!DOCTYPE html><html><body>hello world</body></html>"`,
    );
=======
    if (gate(flags => flags.enableFloat)) {
      expect(prelude).toMatchInlineSnapshot(
        `"<!DOCTYPE html><html><head></head><body>hello world</body></html>"`,
      );
    } else {
      expect(prelude).toMatchInlineSnapshot(
        `"<!DOCTYPE html><html><body>hello world</body></html>"`,
      );
    }
>>>>>>> remotes/upstream/main
  });

  // @gate experimental
  it('should emit bootstrap script src at the end', async () => {
<<<<<<< HEAD
    const result = await ReactDOMFizzStatic.prerenderToNodeStreams(
=======
    const result = await ReactDOMFizzStatic.prerenderToNodeStream(
>>>>>>> remotes/upstream/main
      <div>hello world</div>,
      {
        bootstrapScriptContent: 'INIT();',
        bootstrapScripts: ['init.js'],
        bootstrapModules: ['init.mjs'],
      },
    );
    const prelude = await readContent(result.prelude);
    expect(prelude).toMatchInlineSnapshot(
<<<<<<< HEAD
      `"<div>hello world</div><script>INIT();</script><script src=\\"init.js\\" async=\\"\\"></script><script type=\\"module\\" src=\\"init.mjs\\" async=\\"\\"></script>"`,
=======
      `"<link rel="preload" as="script" fetchPriority="low" href="init.js"/><link rel="modulepreload" fetchPriority="low" href="init.mjs"/><div>hello world</div><script>INIT();</script><script src="init.js" async=""></script><script type="module" src="init.mjs" async=""></script>"`,
>>>>>>> remotes/upstream/main
    );
  });

  // @gate experimental
  it('emits all HTML as one unit', async () => {
    let hasLoaded = false;
    let resolve;
    const promise = new Promise(r => (resolve = r));
    function Wait() {
      if (!hasLoaded) {
        throw promise;
      }
      return 'Done';
    }
<<<<<<< HEAD
    const resultPromise = ReactDOMFizzStatic.prerenderToNodeStreams(
=======
    const resultPromise = ReactDOMFizzStatic.prerenderToNodeStream(
>>>>>>> remotes/upstream/main
      <div>
        <Suspense fallback="Loading">
          <Wait />
        </Suspense>
      </div>,
    );

    await jest.runAllTimers();

    // Resolve the loading.
    hasLoaded = true;
    await resolve();

    const result = await resultPromise;
    const prelude = await readContent(result.prelude);
    expect(prelude).toMatchInlineSnapshot(
      `"<div><!--$-->Done<!-- --><!--/$--></div>"`,
    );
  });

  // @gate experimental
  it('should reject the promise when an error is thrown at the root', async () => {
    const reportedErrors = [];
    let caughtError = null;
    try {
<<<<<<< HEAD
      await ReactDOMFizzStatic.prerenderToNodeStreams(
=======
      await ReactDOMFizzStatic.prerenderToNodeStream(
>>>>>>> remotes/upstream/main
        <div>
          <Throw />
        </div>,
        {
          onError(x) {
            reportedErrors.push(x);
          },
        },
      );
    } catch (error) {
      caughtError = error;
    }
    expect(caughtError).toBe(theError);
    expect(reportedErrors).toEqual([theError]);
  });

  // @gate experimental
  it('should reject the promise when an error is thrown inside a fallback', async () => {
    const reportedErrors = [];
    let caughtError = null;
    try {
<<<<<<< HEAD
      await ReactDOMFizzStatic.prerenderToNodeStreams(
=======
      await ReactDOMFizzStatic.prerenderToNodeStream(
>>>>>>> remotes/upstream/main
        <div>
          <Suspense fallback={<Throw />}>
            <InfiniteSuspend />
          </Suspense>
        </div>,
        {
          onError(x) {
            reportedErrors.push(x);
          },
        },
      );
    } catch (error) {
      caughtError = error;
    }
    expect(caughtError).toBe(theError);
    expect(reportedErrors).toEqual([theError]);
  });

  // @gate experimental
  it('should not error the stream when an error is thrown inside suspense boundary', async () => {
    const reportedErrors = [];
<<<<<<< HEAD
    const result = await ReactDOMFizzStatic.prerenderToNodeStreams(
=======
    const result = await ReactDOMFizzStatic.prerenderToNodeStream(
>>>>>>> remotes/upstream/main
      <div>
        <Suspense fallback={<div>Loading</div>}>
          <Throw />
        </Suspense>
      </div>,
      {
        onError(x) {
          reportedErrors.push(x);
        },
      },
    );

    const prelude = await readContent(result.prelude);
    expect(prelude).toContain('Loading');
    expect(reportedErrors).toEqual([theError]);
  });

  // @gate experimental
  it('should be able to complete by aborting even if the promise never resolves', async () => {
    const errors = [];
    const controller = new AbortController();
<<<<<<< HEAD
    const resultPromise = ReactDOMFizzStatic.prerenderToNodeStreams(
=======
    const resultPromise = ReactDOMFizzStatic.prerenderToNodeStream(
>>>>>>> remotes/upstream/main
      <div>
        <Suspense fallback={<div>Loading</div>}>
          <InfiniteSuspend />
        </Suspense>
      </div>,
      {
        signal: controller.signal,
        onError(x) {
          errors.push(x.message);
        },
      },
    );

    await jest.runAllTimers();

    controller.abort();

    const result = await resultPromise;

    const prelude = await readContent(result.prelude);
    expect(prelude).toContain('Loading');

<<<<<<< HEAD
    expect(errors).toEqual([
      'The render was aborted by the server without a reason.',
    ]);
=======
    expect(errors).toEqual(['This operation was aborted']);
>>>>>>> remotes/upstream/main
  });

  // @gate experimental
  it('should reject if aborting before the shell is complete', async () => {
    const errors = [];
    const controller = new AbortController();
<<<<<<< HEAD
    const promise = ReactDOMFizzStatic.prerenderToNodeStreams(
=======
    const promise = ReactDOMFizzStatic.prerenderToNodeStream(
>>>>>>> remotes/upstream/main
      <div>
        <InfiniteSuspend />
      </div>,
      {
        signal: controller.signal,
        onError(x) {
          errors.push(x.message);
        },
      },
    );

    await jest.runAllTimers();

    const theReason = new Error('aborted for reasons');
<<<<<<< HEAD
    // @TODO this is a hack to work around lack of support for abortSignal.reason in node
    // The abort call itself should set this property but since we are testing in node we
    // set it here manually
    controller.signal.reason = theReason;
=======
>>>>>>> remotes/upstream/main
    controller.abort(theReason);

    let caughtError = null;
    try {
      await promise;
    } catch (error) {
      caughtError = error;
    }
    expect(caughtError).toBe(theReason);
    expect(errors).toEqual(['aborted for reasons']);
  });

  // @gate experimental
  it('should be able to abort before something suspends', async () => {
    const errors = [];
    const controller = new AbortController();
    function App() {
      controller.abort();
      return (
        <Suspense fallback={<div>Loading</div>}>
          <InfiniteSuspend />
        </Suspense>
      );
    }
<<<<<<< HEAD
    const streamPromise = ReactDOMFizzStatic.prerenderToNodeStreams(
=======
    const streamPromise = ReactDOMFizzStatic.prerenderToNodeStream(
>>>>>>> remotes/upstream/main
      <div>
        <App />
      </div>,
      {
        signal: controller.signal,
        onError(x) {
          errors.push(x.message);
        },
      },
    );

    let caughtError = null;
    try {
      await streamPromise;
    } catch (error) {
      caughtError = error;
    }
<<<<<<< HEAD
    expect(caughtError.message).toBe(
      'The render was aborted by the server without a reason.',
    );
    expect(errors).toEqual([
      'The render was aborted by the server without a reason.',
    ]);
=======
    expect(caughtError.message).toBe('This operation was aborted');
    expect(errors).toEqual(['This operation was aborted']);
>>>>>>> remotes/upstream/main
  });

  // @gate experimental
  it('should reject if passing an already aborted signal', async () => {
    const errors = [];
    const controller = new AbortController();
    const theReason = new Error('aborted for reasons');
<<<<<<< HEAD
    // @TODO this is a hack to work around lack of support for abortSignal.reason in node
    // The abort call itself should set this property but since we are testing in node we
    // set it here manually
    controller.signal.reason = theReason;
    controller.abort(theReason);

    const promise = ReactDOMFizzStatic.prerenderToNodeStreams(
=======
    controller.abort(theReason);

    const promise = ReactDOMFizzStatic.prerenderToNodeStream(
>>>>>>> remotes/upstream/main
      <div>
        <Suspense fallback={<div>Loading</div>}>
          <InfiniteSuspend />
        </Suspense>
      </div>,
      {
        signal: controller.signal,
        onError(x) {
          errors.push(x.message);
        },
      },
    );

    // Technically we could still continue rendering the shell but currently the
    // semantics mean that we also abort any pending CPU work.
    let caughtError = null;
    try {
      await promise;
    } catch (error) {
      caughtError = error;
    }
    expect(caughtError).toBe(theReason);
    expect(errors).toEqual(['aborted for reasons']);
  });

  // @gate experimental
  it('supports custom abort reasons with a string', async () => {
    const promise = new Promise(r => {});
    function Wait() {
      throw promise;
    }
    function App() {
      return (
        <div>
          <p>
            <Suspense fallback={'p'}>
              <Wait />
            </Suspense>
          </p>
          <span>
            <Suspense fallback={'span'}>
              <Wait />
            </Suspense>
          </span>
        </div>
      );
    }

    const errors = [];
    const controller = new AbortController();
<<<<<<< HEAD
    const resultPromise = ReactDOMFizzStatic.prerenderToNodeStreams(<App />, {
=======
    const resultPromise = ReactDOMFizzStatic.prerenderToNodeStream(<App />, {
>>>>>>> remotes/upstream/main
      signal: controller.signal,
      onError(x) {
        errors.push(x);
        return 'a digest';
      },
    });

    await jest.runAllTimers();

<<<<<<< HEAD
    // @TODO this is a hack to work around lack of support for abortSignal.reason in node
    // The abort call itself should set this property but since we are testing in node we
    // set it here manually
    controller.signal.reason = 'foobar';
=======
>>>>>>> remotes/upstream/main
    controller.abort('foobar');

    await resultPromise;

    expect(errors).toEqual(['foobar', 'foobar']);
  });

  // @gate experimental
  it('supports custom abort reasons with an Error', async () => {
    const promise = new Promise(r => {});
    function Wait() {
      throw promise;
    }
    function App() {
      return (
        <div>
          <p>
            <Suspense fallback={'p'}>
              <Wait />
            </Suspense>
          </p>
          <span>
            <Suspense fallback={'span'}>
              <Wait />
            </Suspense>
          </span>
        </div>
      );
    }

    const errors = [];
    const controller = new AbortController();
<<<<<<< HEAD
    const resultPromise = ReactDOMFizzStatic.prerenderToNodeStreams(<App />, {
=======
    const resultPromise = ReactDOMFizzStatic.prerenderToNodeStream(<App />, {
>>>>>>> remotes/upstream/main
      signal: controller.signal,
      onError(x) {
        errors.push(x.message);
        return 'a digest';
      },
    });

    await jest.runAllTimers();

<<<<<<< HEAD
    // @TODO this is a hack to work around lack of support for abortSignal.reason in node
    // The abort call itself should set this property but since we are testing in node we
    // set it here manually
    controller.signal.reason = new Error('uh oh');
=======
>>>>>>> remotes/upstream/main
    controller.abort(new Error('uh oh'));

    await resultPromise;

    expect(errors).toEqual(['uh oh', 'uh oh']);
  });
});
