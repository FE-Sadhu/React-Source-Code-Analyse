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
import {isEnabled} from './src/events/ReactDOMEventListener';

import {__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED} from './src/client/ReactDOM';

// For classic WWW builds, include a few internals that are already in use.
Object.assign((__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: any), {
=======
import {isEnabled} from 'react-dom-bindings/src/events/ReactDOMEventListener';

import Internals from './src/ReactDOMSharedInternals';

// For classic WWW builds, include a few internals that are already in use.
Object.assign((Internals: any), {
>>>>>>> remotes/upstream/main
  ReactBrowserEventEmitter: {
    isEnabled,
  },
});

export {
<<<<<<< HEAD
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
=======
>>>>>>> remotes/upstream/main
  createPortal,
  createRoot,
  hydrateRoot,
  findDOMNode,
  flushSync,
  hydrate,
  render,
  unmountComponentAtNode,
  unstable_batchedUpdates,
  unstable_createEventHandle,
<<<<<<< HEAD
  unstable_flushControlled,
  unstable_isNewReconciler,
  unstable_renderSubtreeIntoContainer,
  unstable_runWithPriority, // DO NOT USE: Temporarily exposed to migrate off of Scheduler.runWithPriority.
  version,
} from './src/client/ReactDOM';
=======
  unstable_renderSubtreeIntoContainer,
  unstable_runWithPriority, // DO NOT USE: Temporarily exposed to migrate off of Scheduler.runWithPriority.
  useFormStatus,
  useFormState,
  prefetchDNS,
  preconnect,
  preload,
  preloadModule,
  preinit,
  preinitModule,
  version,
} from './src/client/ReactDOM';

export {Internals as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED};
>>>>>>> remotes/upstream/main
