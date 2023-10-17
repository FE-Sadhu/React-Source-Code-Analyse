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
 * @flow
 */

<<<<<<< HEAD
import type {ReactModel} from 'react-server/src/ReactFlightServer';
import type {Destination} from 'react-server/src/ReactServerStreamConfigNode';
import type {BundlerConfig} from './ReactFlightServerWebpackBundlerConfig';
import type {Writable} from 'stream';
import type {ServerContextJSONValue} from 'shared/ReactTypes';
=======
import type {
  Request,
  ReactClientValue,
} from 'react-server/src/ReactFlightServer';
import type {Destination} from 'react-server/src/ReactServerStreamConfigNode';
import type {ClientManifest} from './ReactFlightServerConfigWebpackBundler';
import type {ServerManifest} from 'react-client/src/ReactFlightClientConfig';
import type {Busboy} from 'busboy';
import type {Writable} from 'stream';
import type {ServerContextJSONValue, Thenable} from 'shared/ReactTypes';
>>>>>>> remotes/upstream/main

import {
  createRequest,
  startWork,
  startFlowing,
<<<<<<< HEAD
  abort,
} from 'react-server/src/ReactFlightServer';

function createDrainHandler(destination: Destination, request) {
  return () => startFlowing(request, destination);
}

type Options = {
  onError?: (error: mixed) => void,
=======
  stopFlowing,
  abort,
} from 'react-server/src/ReactFlightServer';

import {
  createResponse,
  reportGlobalError,
  close,
  resolveField,
  resolveFileInfo,
  resolveFileChunk,
  resolveFileComplete,
  getRoot,
} from 'react-server/src/ReactFlightReplyServer';

import {
  decodeAction,
  decodeFormState,
} from 'react-server/src/ReactFlightActionServer';

export {
  registerServerReference,
  registerClientReference,
  createClientModuleProxy,
} from './ReactFlightWebpackReferences';

function createDrainHandler(destination: Destination, request: Request) {
  return () => startFlowing(request, destination);
}

function createCancelHandler(request: Request, reason: string) {
  return () => {
    stopFlowing(request);
    // eslint-disable-next-line react-internal/prod-error-codes
    abort(request, new Error(reason));
  };
}

type Options = {
  onError?: (error: mixed) => void,
  onPostpone?: (reason: string) => void,
>>>>>>> remotes/upstream/main
  context?: Array<[string, ServerContextJSONValue]>,
  identifierPrefix?: string,
};

type PipeableStream = {
  abort(reason: mixed): void,
  pipe<T: Writable>(destination: T): T,
};

function renderToPipeableStream(
<<<<<<< HEAD
  model: ReactModel,
  webpackMap: BundlerConfig,
=======
  model: ReactClientValue,
  webpackMap: ClientManifest,
>>>>>>> remotes/upstream/main
  options?: Options,
): PipeableStream {
  const request = createRequest(
    model,
    webpackMap,
    options ? options.onError : undefined,
    options ? options.context : undefined,
    options ? options.identifierPrefix : undefined,
<<<<<<< HEAD
=======
    options ? options.onPostpone : undefined,
>>>>>>> remotes/upstream/main
  );
  let hasStartedFlowing = false;
  startWork(request);
  return {
    pipe<T: Writable>(destination: T): T {
      if (hasStartedFlowing) {
        throw new Error(
          'React currently only supports piping to one writable stream.',
        );
      }
      hasStartedFlowing = true;
      startFlowing(request, destination);
      destination.on('drain', createDrainHandler(destination, request));
<<<<<<< HEAD
=======
      destination.on(
        'error',
        createCancelHandler(
          request,
          'The destination stream errored while writing data.',
        ),
      );
      destination.on(
        'close',
        createCancelHandler(request, 'The destination stream closed early.'),
      );
>>>>>>> remotes/upstream/main
      return destination;
    },
    abort(reason: mixed) {
      abort(request, reason);
    },
  };
}

<<<<<<< HEAD
export {renderToPipeableStream};
=======
function decodeReplyFromBusboy<T>(
  busboyStream: Busboy,
  webpackMap: ServerManifest,
): Thenable<T> {
  const response = createResponse(webpackMap, '');
  let pendingFiles = 0;
  const queuedFields: Array<string> = [];
  busboyStream.on('field', (name, value) => {
    if (pendingFiles > 0) {
      // Because the 'end' event fires two microtasks after the next 'field'
      // we would resolve files and fields out of order. To handle this properly
      // we queue any fields we receive until the previous file is done.
      queuedFields.push(name, value);
    } else {
      resolveField(response, name, value);
    }
  });
  busboyStream.on('file', (name, value, {filename, encoding, mimeType}) => {
    if (encoding.toLowerCase() === 'base64') {
      throw new Error(
        "React doesn't accept base64 encoded file uploads because we don't expect " +
          "form data passed from a browser to ever encode data that way. If that's " +
          'the wrong assumption, we can easily fix it.',
      );
    }
    pendingFiles++;
    const file = resolveFileInfo(response, name, filename, mimeType);
    value.on('data', chunk => {
      resolveFileChunk(response, file, chunk);
    });
    value.on('end', () => {
      resolveFileComplete(response, name, file);
      pendingFiles--;
      if (pendingFiles === 0) {
        // Release any queued fields
        for (let i = 0; i < queuedFields.length; i += 2) {
          resolveField(response, queuedFields[i], queuedFields[i + 1]);
        }
        queuedFields.length = 0;
      }
    });
  });
  busboyStream.on('finish', () => {
    close(response);
  });
  busboyStream.on('error', err => {
    reportGlobalError(
      response,
      // $FlowFixMe[incompatible-call] types Error and mixed are incompatible
      err,
    );
  });
  return getRoot(response);
}

function decodeReply<T>(
  body: string | FormData,
  webpackMap: ServerManifest,
): Thenable<T> {
  if (typeof body === 'string') {
    const form = new FormData();
    form.append('0', body);
    body = form;
  }
  const response = createResponse(webpackMap, '', body);
  close(response);
  return getRoot(response);
}

export {
  renderToPipeableStream,
  decodeReplyFromBusboy,
  decodeReply,
  decodeAction,
  decodeFormState,
};
>>>>>>> remotes/upstream/main
