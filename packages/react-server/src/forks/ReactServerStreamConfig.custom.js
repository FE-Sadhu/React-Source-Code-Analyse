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

// This is a host config that's used for the `react-server` package on npm.
// It is only used by third-party renderers.
//
// Its API lets you pass the host config as an argument.
// However, inside the `react-server` we treat host config as a module.
// This file is a shim between two worlds.
//
// It works because the `react-server` bundle is wrapped in something like:
//
// module.exports = function ($$$config) {
//   /* renderer code */
// }
//
// So `$$$config` looks like a global variable, but it's
// really an argument to a top-level wrapping function.

<<<<<<< HEAD
declare var $$$hostConfig: any;
=======
declare var $$$config: any;
>>>>>>> remotes/upstream/main
export opaque type Destination = mixed; // eslint-disable-line no-undef

export opaque type PrecomputedChunk = mixed; // eslint-disable-line no-undef
export opaque type Chunk = mixed; // eslint-disable-line no-undef
<<<<<<< HEAD

export const scheduleWork = $$$hostConfig.scheduleWork;
export const beginWriting = $$$hostConfig.beginWriting;
export const writeChunk = $$$hostConfig.writeChunk;
export const writeChunkAndReturn = $$$hostConfig.writeChunkAndReturn;
export const completeWriting = $$$hostConfig.completeWriting;
export const flushBuffered = $$$hostConfig.flushBuffered;
export const close = $$$hostConfig.close;
export const closeWithError = $$$hostConfig.closeWithError;
export const stringToChunk = $$$hostConfig.stringToChunk;
export const stringToPrecomputedChunk = $$$hostConfig.stringToPrecomputedChunk;
=======
export opaque type BinaryChunk = mixed; // eslint-disable-line no-undef

export const scheduleWork = $$$config.scheduleWork;
export const beginWriting = $$$config.beginWriting;
export const writeChunk = $$$config.writeChunk;
export const writeChunkAndReturn = $$$config.writeChunkAndReturn;
export const completeWriting = $$$config.completeWriting;
export const flushBuffered = $$$config.flushBuffered;
export const close = $$$config.close;
export const closeWithError = $$$config.closeWithError;
export const stringToChunk = $$$config.stringToChunk;
export const stringToPrecomputedChunk = $$$config.stringToPrecomputedChunk;
export const typedArrayToBinaryChunk = $$$config.typedArrayToBinaryChunk;
export const clonePrecomputedChunk = $$$config.clonePrecomputedChunk;
export const byteLengthOfChunk = $$$config.byteLengthOfChunk;
export const byteLengthOfBinaryChunk = $$$config.byteLengthOfBinaryChunk;
export const createFastHash = $$$config.createFastHash;
>>>>>>> remotes/upstream/main
