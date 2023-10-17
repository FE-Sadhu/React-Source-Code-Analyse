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

import ReactVersion from 'shared/ReactVersion';

import type {ReactNodeList} from 'shared/ReactTypes';

import {
  createRequest,
  startWork,
  startFlowing,
  abort,
} from 'react-server/src/ReactFizzServer';

import {
<<<<<<< HEAD
  createResponseState,
  createRootFormatContext,
} from './ReactDOMServerLegacyFormatConfig';
=======
  createResumableState,
  createRenderState,
  createRootFormatContext,
} from 'react-dom-bindings/src/server/ReactFizzConfigDOMLegacy';
>>>>>>> remotes/upstream/main

type ServerOptions = {
  identifierPrefix?: string,
};

function onError() {
  // Non-fatal errors are ignored.
}

function renderToStringImpl(
  children: ReactNodeList,
  options: void | ServerOptions,
  generateStaticMarkup: boolean,
  abortReason: string,
): string {
  let didFatal = false;
  let fatalError = null;
  let result = '';
  const destination = {
<<<<<<< HEAD
=======
    // $FlowFixMe[missing-local-annot]
>>>>>>> remotes/upstream/main
    push(chunk) {
      if (chunk !== null) {
        result += chunk;
      }
      return true;
    },
<<<<<<< HEAD
=======
    // $FlowFixMe[missing-local-annot]
>>>>>>> remotes/upstream/main
    destroy(error) {
      didFatal = true;
      fatalError = error;
    },
  };

  let readyToStream = false;
  function onShellReady() {
    readyToStream = true;
  }
<<<<<<< HEAD
  const request = createRequest(
    children,
    createResponseState(
      generateStaticMarkup,
      options ? options.identifierPrefix : undefined,
    ),
=======
  const resumableState = createResumableState(
    options ? options.identifierPrefix : undefined,
    undefined,
  );
  const request = createRequest(
    children,
    resumableState,
    createRenderState(resumableState, generateStaticMarkup),
>>>>>>> remotes/upstream/main
    createRootFormatContext(),
    Infinity,
    onError,
    undefined,
    onShellReady,
    undefined,
    undefined,
<<<<<<< HEAD
=======
    undefined,
>>>>>>> remotes/upstream/main
  );
  startWork(request);
  // If anything suspended and is still pending, we'll abort it before writing.
  // That way we write only client-rendered boundaries from the start.
  abort(request, abortReason);
  startFlowing(request, destination);
  if (didFatal && fatalError !== abortReason) {
    throw fatalError;
  }

  if (!readyToStream) {
    // Note: This error message is the one we use on the client. It doesn't
    // really make sense here. But this is the legacy server renderer, anyway.
    // We're going to delete it soon.
    throw new Error(
      'A component suspended while responding to synchronous input. This ' +
        'will cause the UI to be replaced with a loading indicator. To fix, ' +
        'updates that suspend should be wrapped with startTransition.',
    );
  }

  return result;
}

export {renderToStringImpl, ReactVersion as version};
