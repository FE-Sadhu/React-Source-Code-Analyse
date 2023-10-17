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
export {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
=======
export {default as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED} from './src/ReactDOMSharedInternals';
export {
>>>>>>> remotes/upstream/main
  createPortal,
  createRoot,
  hydrateRoot,
  flushSync,
  unstable_batchedUpdates,
  unstable_createEventHandle,
<<<<<<< HEAD
  unstable_flushControlled,
  unstable_isNewReconciler,
  unstable_runWithPriority, // DO NOT USE: Temporarily exposed to migrate off of Scheduler.runWithPriority.
=======
  unstable_runWithPriority, // DO NOT USE: Temporarily exposed to migrate off of Scheduler.runWithPriority.
  useFormStatus,
  useFormState,
  prefetchDNS,
  preconnect,
  preload,
  preloadModule,
  preinit,
  preinitModule,
>>>>>>> remotes/upstream/main
  version,
} from './src/client/ReactDOM';
