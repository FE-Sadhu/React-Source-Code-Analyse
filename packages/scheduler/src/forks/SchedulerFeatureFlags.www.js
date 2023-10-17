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
<<<<<<< HEAD
 */

const dynamicFeatureFlags = require('SchedulerFeatureFlags');

// Re-export dynamic flags from the www version.
export const {
  enableIsInputPending,
  enableSchedulerDebugging,
  enableProfiling: enableProfilingFeatureFlag,
  enableIsInputPendingContinuous,
  frameYieldMs,
  continuousYieldMs,
  maxYieldMs,
} = dynamicFeatureFlags;

export const enableProfiling = __PROFILE__ && enableProfilingFeatureFlag;
=======
 * @flow
 */

const {enableProfiling: enableProfilingFeatureFlag} =
  // $FlowFixMe[cannot-resolve-module]
  require('SchedulerFeatureFlags');

export const enableSchedulerDebugging = true;
export const enableProfiling: boolean =
  __PROFILE__ && enableProfilingFeatureFlag;
export const enableIsInputPending = true;
export const enableIsInputPendingContinuous = true;
export const frameYieldMs = 5;
export const continuousYieldMs = 10;
export const maxYieldMs = 10;
>>>>>>> remotes/upstream/main
