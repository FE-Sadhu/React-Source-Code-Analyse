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
import type {Dispatcher} from 'react-reconciler/src/ReactInternalTypes';
import ReactSharedInternals from 'shared/ReactSharedInternals';

const ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
=======
import type {CacheDispatcher} from 'react-reconciler/src/ReactInternalTypes';
import ReactSharedInternals from 'shared/ReactSharedInternals';

const ReactCurrentCache = ReactSharedInternals.ReactCurrentCache;
>>>>>>> remotes/upstream/main

function unsupported() {
  throw new Error('This feature is not supported by ReactSuspenseTestUtils.');
}

export function waitForSuspense<T>(fn: () => T): Promise<T> {
  const cache: Map<Function, mixed> = new Map();
<<<<<<< HEAD
  const testDispatcher: Dispatcher = {
=======
  const testDispatcher: CacheDispatcher = {
    getCacheSignal: unsupported,
>>>>>>> remotes/upstream/main
    getCacheForType<R>(resourceType: () => R): R {
      let entry: R | void = (cache.get(resourceType): any);
      if (entry === undefined) {
        entry = resourceType();
        // TODO: Warn if undefined?
        cache.set(resourceType, entry);
      }
      return entry;
    },
<<<<<<< HEAD
    readContext: unsupported,
    useContext: unsupported,
    useMemo: unsupported,
    useReducer: unsupported,
    useRef: unsupported,
    useState: unsupported,
    useInsertionEffect: unsupported,
    useLayoutEffect: unsupported,
    useCallback: unsupported,
    useImperativeHandle: unsupported,
    useEffect: unsupported,
    useDebugValue: unsupported,
    useDeferredValue: unsupported,
    useTransition: unsupported,
    useId: unsupported,
    useMutableSource: unsupported,
    useSyncExternalStore: unsupported,
    useCacheRefresh: unsupported,
    useMemoCache: unsupported,
=======
>>>>>>> remotes/upstream/main
  };
  // Not using async/await because we don't compile it.
  return new Promise((resolve, reject) => {
    function retry() {
<<<<<<< HEAD
      const prevDispatcher = ReactCurrentDispatcher.current;
      ReactCurrentDispatcher.current = testDispatcher;
=======
      const prevDispatcher = ReactCurrentCache.current;
      ReactCurrentCache.current = testDispatcher;
>>>>>>> remotes/upstream/main
      try {
        const result = fn();
        resolve(result);
      } catch (thrownValue) {
        if (typeof thrownValue.then === 'function') {
          thrownValue.then(retry, retry);
        } else {
          reject(thrownValue);
        }
      } finally {
<<<<<<< HEAD
        ReactCurrentDispatcher.current = prevDispatcher;
=======
        ReactCurrentCache.current = prevDispatcher;
>>>>>>> remotes/upstream/main
      }
    }
    retry();
  });
}
