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

import type {Request} from 'react-server/src/ReactFizzServer';

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

import {Readable} from 'stream';

type ServerOptions = {
  identifierPrefix?: string,
};

class ReactMarkupReadableStream extends Readable {
  request: Request;
  startedFlowing: boolean;
  constructor() {
    // Calls the stream.Readable(options) constructor. Consider exposing built-in
    // features like highWaterMark in the future.
    super({});
    this.request = (null: any);
    this.startedFlowing = false;
  }

<<<<<<< HEAD
  _destroy(err, callback) {
    abort(this.request);
    // $FlowFixMe: The type definition for the callback should allow undefined and null.
    callback(err);
  }

=======
  // $FlowFixMe[missing-local-annot]
  _destroy(err, callback) {
    abort(this.request);
    callback(err);
  }

  // $FlowFixMe[missing-local-annot]
>>>>>>> remotes/upstream/main
  _read(size) {
    if (this.startedFlowing) {
      startFlowing(this.request, this);
    }
  }
}

function onError() {
  // Non-fatal errors are ignored.
}

function renderToNodeStreamImpl(
  children: ReactNodeList,
  options: void | ServerOptions,
  generateStaticMarkup: boolean,
): Readable {
  function onAllReady() {
    // We wait until everything has loaded before starting to write.
    // That way we only end up with fully resolved HTML even if we suspend.
    destination.startedFlowing = true;
    startFlowing(request, destination);
  }
  const destination = new ReactMarkupReadableStream();
<<<<<<< HEAD
  const request = createRequest(
    children,
    createResponseState(false, options ? options.identifierPrefix : undefined),
=======
  const resumableState = createResumableState(
    options ? options.identifierPrefix : undefined,
    undefined,
  );
  const request = createRequest(
    children,
    resumableState,
    createRenderState(resumableState, false),
>>>>>>> remotes/upstream/main
    createRootFormatContext(),
    Infinity,
    onError,
    onAllReady,
    undefined,
    undefined,
<<<<<<< HEAD
=======
    undefined,
>>>>>>> remotes/upstream/main
  );
  destination.request = request;
  startWork(request);
  return destination;
}

function renderToNodeStream(
  children: ReactNodeList,
  options?: ServerOptions,
): Readable {
  if (__DEV__) {
    console.error(
      'renderToNodeStream is deprecated. Use renderToPipeableStream instead.',
    );
  }
  return renderToNodeStreamImpl(children, options, false);
}

function renderToStaticNodeStream(
  children: ReactNodeList,
  options?: ServerOptions,
): Readable {
  return renderToNodeStreamImpl(children, options, true);
}

export {renderToNodeStream, renderToStaticNodeStream};
