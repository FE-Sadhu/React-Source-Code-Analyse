/**
<<<<<<< HEAD
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
=======
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
>>>>>>> remotes/upstream/main
 */

// Provided by www
const ReactFbErrorUtils = require('ReactFbErrorUtils');

if (typeof ReactFbErrorUtils.invokeGuardedCallback !== 'function') {
  throw new Error(
    'Expected ReactFbErrorUtils.invokeGuardedCallback to be a function.',
  );
}

<<<<<<< HEAD
const invokeGuardedCallbackImpl = function<A, B, C, D, E, F, Context>(
=======
function invokeGuardedCallbackImpl<A, B, C, D, E, F, Context>(
>>>>>>> remotes/upstream/main
  name: string | null,
  func: (a: A, b: B, c: C, d: D, e: E, f: F) => mixed,
  context: Context,
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
) {
  // This will call `this.onError(err)` if an error was caught.
  ReactFbErrorUtils.invokeGuardedCallback.apply(this, arguments);
<<<<<<< HEAD
};
=======
}
>>>>>>> remotes/upstream/main

export default invokeGuardedCallbackImpl;
