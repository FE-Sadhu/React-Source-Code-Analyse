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

export const moduleAStartError = new Error();
export const innerErrorA = new Error();
export const moduleAStopError = new Error();

export const outerError = new Error();

export const moduleBStartError = new Error();
export const innerErrorB = new Error();
export const moduleBStopError = new Error();
