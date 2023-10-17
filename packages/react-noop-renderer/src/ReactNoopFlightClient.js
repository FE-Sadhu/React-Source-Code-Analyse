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

/**
 * This is a renderer of React that doesn't have a render target output.
 * It is useful to demonstrate the internals of the reconciler in isolation
 * and for testing semantics of reconciliation separate from the host
 * environment.
 */

import {readModule} from 'react-noop-renderer/flight-modules';

import ReactFlightClient from 'react-client/flight';

<<<<<<< HEAD
type Source = Array<string>;

const {createResponse, processStringChunk, getRoot, close} = ReactFlightClient({
  supportsBinaryStreams: false,
  resolveModuleReference(bundlerConfig: null, idx: string) {
    return idx;
  },
=======
type Source = Array<Uint8Array>;

const decoderOptions = {stream: true};

const {createResponse, processBinaryChunk, getRoot, close} = ReactFlightClient({
  createStringDecoder() {
    return new TextDecoder();
  },
  readPartialStringChunk(decoder: TextDecoder, buffer: Uint8Array): string {
    return decoder.decode(buffer, decoderOptions);
  },
  readFinalStringChunk(decoder: TextDecoder, buffer: Uint8Array): string {
    return decoder.decode(buffer);
  },
  resolveClientReference(bundlerConfig: null, idx: string) {
    return idx;
  },
  prepareDestinationForModule(moduleLoading: null, metadata: string) {},
>>>>>>> remotes/upstream/main
  preloadModule(idx: string) {},
  requireModule(idx: string) {
    return readModule(idx);
  },
  parseModel(response: Response, json) {
    return JSON.parse(json, response._fromJSON);
  },
});

function read<T>(source: Source): Thenable<T> {
  const response = createResponse(source, null);
  for (let i = 0; i < source.length; i++) {
<<<<<<< HEAD
    processStringChunk(response, source[i], 0);
=======
    processBinaryChunk(response, source[i], 0);
>>>>>>> remotes/upstream/main
  }
  close(response);
  return getRoot(response);
}

export {read};
