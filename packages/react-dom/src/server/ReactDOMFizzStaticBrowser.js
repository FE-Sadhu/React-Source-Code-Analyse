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

import type {ReactNodeList} from 'shared/ReactTypes';
<<<<<<< HEAD
import type {BootstrapScriptDescriptor} from './ReactDOMServerFormatConfig';
=======
import type {BootstrapScriptDescriptor} from 'react-dom-bindings/src/server/ReactFizzConfigDOM';
import type {PostponedState} from 'react-server/src/ReactFizzServer';
import type {ImportMap} from '../shared/ReactDOMTypes';
>>>>>>> remotes/upstream/main

import ReactVersion from 'shared/ReactVersion';

import {
<<<<<<< HEAD
  createRequest,
  startWork,
  startFlowing,
  abort,
} from 'react-server/src/ReactFizzServer';

import {
  createResponseState,
  createRootFormatContext,
} from './ReactDOMServerFormatConfig';
=======
  createPrerenderRequest,
  startWork,
  startFlowing,
  stopFlowing,
  abort,
  getPostponedState,
} from 'react-server/src/ReactFizzServer';

import {
  createResumableState,
  createRenderState,
  createRootFormatContext,
} from 'react-dom-bindings/src/server/ReactFizzConfigDOM';
>>>>>>> remotes/upstream/main

type Options = {
  identifierPrefix?: string,
  namespaceURI?: string,
  bootstrapScriptContent?: string,
  bootstrapScripts?: Array<string | BootstrapScriptDescriptor>,
  bootstrapModules?: Array<string | BootstrapScriptDescriptor>,
  progressiveChunkSize?: number,
  signal?: AbortSignal,
  onError?: (error: mixed) => ?string,
<<<<<<< HEAD
};

type StaticResult = {
=======
  onPostpone?: (reason: string) => void,
  unstable_externalRuntimeSrc?: string | BootstrapScriptDescriptor,
  importMap?: ImportMap,
};

type StaticResult = {
  postponed: null | PostponedState,
>>>>>>> remotes/upstream/main
  prelude: ReadableStream,
};

function prerender(
  children: ReactNodeList,
  options?: Options,
): Promise<StaticResult> {
  return new Promise((resolve, reject) => {
    const onFatalError = reject;

    function onAllReady() {
      const stream = new ReadableStream(
        {
          type: 'bytes',
<<<<<<< HEAD
          pull(controller): ?Promise<void> {
            startFlowing(request, controller);
          },
        },
        // $FlowFixMe size() methods are not allowed on byte streams.
=======
          pull: (controller): ?Promise<void> => {
            startFlowing(request, controller);
          },
          cancel: (reason): ?Promise<void> => {
            stopFlowing(request);
            abort(request);
          },
        },
        // $FlowFixMe[prop-missing] size() methods are not allowed on byte streams.
>>>>>>> remotes/upstream/main
        {highWaterMark: 0},
      );

      const result = {
<<<<<<< HEAD
=======
        postponed: getPostponedState(request),
>>>>>>> remotes/upstream/main
        prelude: stream,
      };
      resolve(result);
    }
<<<<<<< HEAD
    const request = createRequest(
      children,
      createResponseState(
        options ? options.identifierPrefix : undefined,
        undefined,
        options ? options.bootstrapScriptContent : undefined,
        options ? options.bootstrapScripts : undefined,
        options ? options.bootstrapModules : undefined,
=======
    const resources = createResumableState(
      options ? options.identifierPrefix : undefined,
      options ? options.unstable_externalRuntimeSrc : undefined,
    );
    const request = createPrerenderRequest(
      children,
      resources,
      createRenderState(
        resources,
        undefined, // nonce is not compatible with prerendered bootstrap scripts
        options ? options.bootstrapScriptContent : undefined,
        options ? options.bootstrapScripts : undefined,
        options ? options.bootstrapModules : undefined,
        options ? options.unstable_externalRuntimeSrc : undefined,
        options ? options.importMap : undefined,
>>>>>>> remotes/upstream/main
      ),
      createRootFormatContext(options ? options.namespaceURI : undefined),
      options ? options.progressiveChunkSize : undefined,
      options ? options.onError : undefined,
      onAllReady,
      undefined,
      undefined,
      onFatalError,
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
    startWork(request);
  });
}

export {prerender, ReactVersion as version};
