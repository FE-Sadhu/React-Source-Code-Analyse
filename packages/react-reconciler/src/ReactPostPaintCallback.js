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
import {requestPostPaintCallback} from './ReactFiberHostConfig';

let postPaintCallbackScheduled = false;
let callbacks = [];
=======
import {requestPostPaintCallback} from './ReactFiberConfig';

let postPaintCallbackScheduled = false;
let callbacks: Array<any | ((endTime: number) => void)> = [];
>>>>>>> remotes/upstream/main

export function schedulePostPaintCallback(callback: (endTime: number) => void) {
  callbacks.push(callback);
  if (!postPaintCallbackScheduled) {
    postPaintCallbackScheduled = true;
    requestPostPaintCallback(endTime => {
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](endTime);
      }
      postPaintCallbackScheduled = false;
      callbacks = [];
    });
  }
}
