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
import type {ServerContextJSONValue} from 'shared/ReactTypes';
import type {BundlerConfig} from './ReactFlightServerWebpackBundlerConfig';
=======
import type {ReactClientValue} from 'react-server/src/ReactFlightServer';
import type {ServerContextJSONValue, Thenable} from 'shared/ReactTypes';
import type {ClientManifest} from './ReactFlightServerConfigWebpackBundler';
import type {ServerManifest} from 'react-client/src/ReactFlightClientConfig';
>>>>>>> remotes/upstream/main

import {
  createRequest,
  startWork,
  startFlowing,
<<<<<<< HEAD
  abort,
} from 'react-server/src/ReactFlightServer';

=======
  stopFlowing,
  abort,
} from 'react-server/src/ReactFlightServer';

import {
  createResponse,
  close,
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

>>>>>>> remotes/upstream/main
type Options = {
  identifierPrefix?: string,
  signal?: AbortSignal,
  context?: Array<[string, ServerContextJSONValue]>,
  onError?: (error: mixed) => void,
<<<<<<< HEAD
};

function renderToReadableStream(
  model: ReactModel,
  webpackMap: BundlerConfig,
=======
  onPostpone?: (reason: string) => void,
};

function renderToReadableStream(
  model: ReactClientValue,
  webpackMap: ClientManifest,
>>>>>>> remotes/upstream/main
  options?: Options,
): ReadableStream {
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
  if (options && options.signal) {
    const signal = options.signal;
    if (signal.aborted) {
      abort(request, (signal: any).reason);
    } else {
      const listener = () => {
        abort(request, (signal: any).reason);
        signal.removeEventListener('abort', listener);
      };
      signal.addEventListener('abort', listener);
    }
  }
  const stream = new ReadableStream(
    {
      type: 'bytes',
<<<<<<< HEAD
      start(controller): ?Promise<void> {
        startWork(request);
      },
      pull(controller): ?Promise<void> {
        startFlowing(request, controller);
      },
      cancel(reason): ?Promise<void> {},
    },
    // $FlowFixMe size() methods are not allowed on byte streams.
=======
      start: (controller): ?Promise<void> => {
        startWork(request);
      },
      pull: (controller): ?Promise<void> => {
        startFlowing(request, controller);
      },
      cancel: (reason): ?Promise<void> => {
        stopFlowing(request);
        abort(request, reason);
      },
    },
    // $FlowFixMe[prop-missing] size() methods are not allowed on byte streams.
>>>>>>> remotes/upstream/main
    {highWaterMark: 0},
  );
  return stream;
}

<<<<<<< HEAD
export {renderToReadableStream};
=======
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

export {renderToReadableStream, decodeReply, decodeAction, decodeFormState};
>>>>>>> remotes/upstream/main
