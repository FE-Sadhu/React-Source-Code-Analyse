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
import type {ReactNodeList} from 'shared/ReactTypes';
import type {BootstrapScriptDescriptor} from './ReactDOMServerFormatConfig';
=======
import type {PostponedState} from 'react-server/src/ReactFizzServer';
import type {ReactNodeList, ReactFormState} from 'shared/ReactTypes';
import type {BootstrapScriptDescriptor} from 'react-dom-bindings/src/server/ReactFizzConfigDOM';
import type {ImportMap} from '../shared/ReactDOMTypes';
>>>>>>> remotes/upstream/main

import ReactVersion from 'shared/ReactVersion';

import {
  createRequest,
<<<<<<< HEAD
  startWork,
  startFlowing,
=======
  resumeRequest,
  startWork,
  startFlowing,
  stopFlowing,
>>>>>>> remotes/upstream/main
  abort,
} from 'react-server/src/ReactFizzServer';

import {
<<<<<<< HEAD
  createResponseState,
  createRootFormatContext,
} from './ReactDOMServerFormatConfig';
=======
  createResumableState,
  createRenderState,
  resumeRenderState,
  createRootFormatContext,
} from 'react-dom-bindings/src/server/ReactFizzConfigDOM';
>>>>>>> remotes/upstream/main

type Options = {
  identifierPrefix?: string,
  namespaceURI?: string,
  nonce?: string,
  bootstrapScriptContent?: string,
  bootstrapScripts?: Array<string | BootstrapScriptDescriptor>,
  bootstrapModules?: Array<string | BootstrapScriptDescriptor>,
  progressiveChunkSize?: number,
  signal?: AbortSignal,
  onError?: (error: mixed) => ?string,
<<<<<<< HEAD
=======
  onPostpone?: (reason: string) => void,
  unstable_externalRuntimeSrc?: string | BootstrapScriptDescriptor,
  importMap?: ImportMap,
  formState?: ReactFormState<any, any> | null,
};

type ResumeOptions = {
  nonce?: string,
  signal?: AbortSignal,
  onError?: (error: mixed) => ?string,
  onPostpone?: (reason: string) => void,
  unstable_externalRuntimeSrc?: string | BootstrapScriptDescriptor,
>>>>>>> remotes/upstream/main
};

// TODO: Move to sub-classing ReadableStream.
type ReactDOMServerReadableStream = ReadableStream & {
  allReady: Promise<void>,
};

function renderToReadableStream(
  children: ReactNodeList,
  options?: Options,
): Promise<ReactDOMServerReadableStream> {
  return new Promise((resolve, reject) => {
    let onFatalError;
    let onAllReady;
<<<<<<< HEAD
    const allReady = new Promise((res, rej) => {
=======
    const allReady = new Promise<void>((res, rej) => {
>>>>>>> remotes/upstream/main
      onAllReady = res;
      onFatalError = rej;
    });

    function onShellReady() {
      const stream: ReactDOMServerReadableStream = (new ReadableStream(
        {
          type: 'bytes',
<<<<<<< HEAD
          pull(controller): ?Promise<void> {
            startFlowing(request, controller);
          },
          cancel(reason): ?Promise<void> {
            abort(request);
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
      ): any);
      // TODO: Move to sub-classing ReadableStream.
      stream.allReady = allReady;
      resolve(stream);
    }
    function onShellError(error: mixed) {
      // If the shell errors the caller of `renderToReadableStream` won't have access to `allReady`.
      // However, `allReady` will be rejected by `onFatalError` as well.
      // So we need to catch the duplicate, uncatchable fatal error in `allReady` to prevent a `UnhandledPromiseRejection`.
      allReady.catch(() => {});
      reject(error);
    }
<<<<<<< HEAD
    const request = createRequest(
      children,
      createResponseState(
        options ? options.identifierPrefix : undefined,
=======
    const resumableState = createResumableState(
      options ? options.identifierPrefix : undefined,
      options ? options.unstable_externalRuntimeSrc : undefined,
    );
    const request = createRequest(
      children,
      resumableState,
      createRenderState(
        resumableState,
>>>>>>> remotes/upstream/main
        options ? options.nonce : undefined,
        options ? options.bootstrapScriptContent : undefined,
        options ? options.bootstrapScripts : undefined,
        options ? options.bootstrapModules : undefined,
<<<<<<< HEAD
=======
        options ? options.unstable_externalRuntimeSrc : undefined,
        options ? options.importMap : undefined,
>>>>>>> remotes/upstream/main
      ),
      createRootFormatContext(options ? options.namespaceURI : undefined),
      options ? options.progressiveChunkSize : undefined,
      options ? options.onError : undefined,
      onAllReady,
      onShellReady,
      onShellError,
      onFatalError,
<<<<<<< HEAD
=======
      options ? options.onPostpone : undefined,
      options ? options.formState : undefined,
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

<<<<<<< HEAD
export {renderToReadableStream, ReactVersion as version};
=======
function resume(
  children: ReactNodeList,
  postponedState: PostponedState,
  options?: ResumeOptions,
): Promise<ReactDOMServerReadableStream> {
  return new Promise((resolve, reject) => {
    let onFatalError;
    let onAllReady;
    const allReady = new Promise<void>((res, rej) => {
      onAllReady = res;
      onFatalError = rej;
    });

    function onShellReady() {
      const stream: ReactDOMServerReadableStream = (new ReadableStream(
        {
          type: 'bytes',
          pull: (controller): ?Promise<void> => {
            startFlowing(request, controller);
          },
          cancel: (reason): ?Promise<void> => {
            stopFlowing(request);
            abort(request);
          },
        },
        // $FlowFixMe[prop-missing] size() methods are not allowed on byte streams.
        {highWaterMark: 0},
      ): any);
      // TODO: Move to sub-classing ReadableStream.
      stream.allReady = allReady;
      resolve(stream);
    }
    function onShellError(error: mixed) {
      // If the shell errors the caller of `renderToReadableStream` won't have access to `allReady`.
      // However, `allReady` will be rejected by `onFatalError` as well.
      // So we need to catch the duplicate, uncatchable fatal error in `allReady` to prevent a `UnhandledPromiseRejection`.
      allReady.catch(() => {});
      reject(error);
    }
    const request = resumeRequest(
      children,
      postponedState,
      resumeRenderState(
        postponedState.resumableState,
        options ? options.nonce : undefined,
      ),
      options ? options.onError : undefined,
      onAllReady,
      onShellReady,
      onShellError,
      onFatalError,
      options ? options.onPostpone : undefined,
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

export {renderToReadableStream, resume, ReactVersion as version};
>>>>>>> remotes/upstream/main
