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
import type {Writable} from 'stream';
import type {BootstrapScriptDescriptor} from './ReactDOMServerFormatConfig';
import type {Destination} from 'react-server/src/ReactServerStreamConfigNode';
=======
import type {Request, PostponedState} from 'react-server/src/ReactFizzServer';
import type {ReactNodeList, ReactFormState} from 'shared/ReactTypes';
import type {Writable} from 'stream';
import type {BootstrapScriptDescriptor} from 'react-dom-bindings/src/server/ReactFizzConfigDOM';
import type {Destination} from 'react-server/src/ReactServerStreamConfigNode';
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

function createDrainHandler(destination: Destination, request) {
  return () => startFlowing(request, destination);
}

function createAbortHandler(request, reason) {
  // eslint-disable-next-line react-internal/prod-error-codes
  return () => abort(request, new Error(reason));
=======
  createResumableState,
  createRenderState,
  resumeRenderState,
  createRootFormatContext,
} from 'react-dom-bindings/src/server/ReactFizzConfigDOM';

function createDrainHandler(destination: Destination, request: Request) {
  return () => startFlowing(request, destination);
}

function createCancelHandler(request: Request, reason: string) {
  return () => {
    stopFlowing(request);
    // eslint-disable-next-line react-internal/prod-error-codes
    abort(request, new Error(reason));
  };
>>>>>>> remotes/upstream/main
}

type Options = {
  identifierPrefix?: string,
  namespaceURI?: string,
  nonce?: string,
  bootstrapScriptContent?: string,
  bootstrapScripts?: Array<string | BootstrapScriptDescriptor>,
  bootstrapModules?: Array<string | BootstrapScriptDescriptor>,
  progressiveChunkSize?: number,
  onShellReady?: () => void,
  onShellError?: (error: mixed) => void,
  onAllReady?: () => void,
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
  onShellReady?: () => void,
  onShellError?: (error: mixed) => void,
  onAllReady?: () => void,
  onError?: (error: mixed) => ?string,
  onPostpone?: (reason: string) => void,
>>>>>>> remotes/upstream/main
};

type PipeableStream = {
  // Cancel any pending I/O and put anything remaining into
  // client rendered mode.
  abort(reason: mixed): void,
  pipe<T: Writable>(destination: T): T,
};

function createRequestImpl(children: ReactNodeList, options: void | Options) {
<<<<<<< HEAD
  return createRequest(
    children,
    createResponseState(
      options ? options.identifierPrefix : undefined,
=======
  const resumableState = createResumableState(
    options ? options.identifierPrefix : undefined,
    options ? options.unstable_externalRuntimeSrc : undefined,
  );
  return createRequest(
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
    options ? options.onAllReady : undefined,
    options ? options.onShellReady : undefined,
    options ? options.onShellError : undefined,
    undefined,
<<<<<<< HEAD
=======
    options ? options.onPostpone : undefined,
    options ? options.formState : undefined,
>>>>>>> remotes/upstream/main
  );
}

function renderToPipeableStream(
  children: ReactNodeList,
  options?: Options,
): PipeableStream {
  const request = createRequestImpl(children, options);
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
      destination.on(
        'error',
<<<<<<< HEAD
        createAbortHandler(
=======
        createCancelHandler(
>>>>>>> remotes/upstream/main
          request,
          'The destination stream errored while writing data.',
        ),
      );
      destination.on(
        'close',
<<<<<<< HEAD
        createAbortHandler(request, 'The destination stream closed early.'),
=======
        createCancelHandler(request, 'The destination stream closed early.'),
>>>>>>> remotes/upstream/main
      );
      return destination;
    },
    abort(reason: mixed) {
      abort(request, reason);
    },
  };
}

<<<<<<< HEAD
export {renderToPipeableStream, ReactVersion as version};
=======
function resumeRequestImpl(
  children: ReactNodeList,
  postponedState: PostponedState,
  options: void | ResumeOptions,
) {
  return resumeRequest(
    children,
    postponedState,
    resumeRenderState(
      postponedState.resumableState,
      options ? options.nonce : undefined,
    ),
    options ? options.onError : undefined,
    options ? options.onAllReady : undefined,
    options ? options.onShellReady : undefined,
    options ? options.onShellError : undefined,
    undefined,
    options ? options.onPostpone : undefined,
  );
}

function resumeToPipeableStream(
  children: ReactNodeList,
  postponedState: PostponedState,
  options?: ResumeOptions,
): PipeableStream {
  const request = resumeRequestImpl(children, postponedState, options);
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
      return destination;
    },
    abort(reason: mixed) {
      abort(request, reason);
    },
  };
}

export {
  renderToPipeableStream,
  resumeToPipeableStream,
  ReactVersion as version,
};
>>>>>>> remotes/upstream/main
