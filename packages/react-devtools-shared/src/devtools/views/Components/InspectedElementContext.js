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
=======
import type {ReactContext} from 'shared/ReactTypes';

>>>>>>> remotes/upstream/main
import * as React from 'react';
import {
  createContext,
  startTransition,
  unstable_useCacheRefresh as useCacheRefresh,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {TreeStateContext} from './TreeContext';
import {BridgeContext, StoreContext} from '../context';
import {
<<<<<<< HEAD
  checkForUpdate,
  inspectElement,
=======
  inspectElement,
  startElementUpdatesPolling,
>>>>>>> remotes/upstream/main
} from 'react-devtools-shared/src/inspectedElementCache';
import {
  clearHookNamesCache,
  hasAlreadyLoadedHookNames,
  loadHookNames,
} from 'react-devtools-shared/src/hookNamesCache';
import {loadModule} from 'react-devtools-shared/src/dynamicImportCache';
import FetchFileWithCachingContext from 'react-devtools-shared/src/devtools/views/Components/FetchFileWithCachingContext';
import HookNamesModuleLoaderContext from 'react-devtools-shared/src/devtools/views/Components/HookNamesModuleLoaderContext';
import {SettingsContext} from '../Settings/SettingsContext';
<<<<<<< HEAD
import {enableNamedHooksFeature} from 'react-devtools-feature-flags';

import type {HookNames} from 'react-devtools-shared/src/types';
=======

import type {HookNames} from 'react-devtools-shared/src/frontend/types';
>>>>>>> remotes/upstream/main
import type {ReactNodeList} from 'shared/ReactTypes';
import type {
  Element,
  InspectedElement,
<<<<<<< HEAD
} from 'react-devtools-shared/src/devtools/views/Components/types';
=======
} from 'react-devtools-shared/src/frontend/types';
>>>>>>> remotes/upstream/main

type Path = Array<string | number>;
type InspectPathFunction = (path: Path) => void;
export type ToggleParseHookNames = () => void;

type Context = {
  hookNames: HookNames | null,
  inspectedElement: InspectedElement | null,
  inspectPaths: InspectPathFunction,
  parseHookNames: boolean,
  toggleParseHookNames: ToggleParseHookNames,
};

<<<<<<< HEAD
export const InspectedElementContext = createContext<Context>(
  ((null: any): Context),
);

const POLL_INTERVAL = 1000;
=======
export const InspectedElementContext: ReactContext<Context> =
  createContext<Context>(((null: any): Context));
>>>>>>> remotes/upstream/main

export type Props = {
  children: ReactNodeList,
};

<<<<<<< HEAD
export function InspectedElementContextController({children}: Props) {
=======
export function InspectedElementContextController({
  children,
}: Props): React.Node {
>>>>>>> remotes/upstream/main
  const {selectedElementID} = useContext(TreeStateContext);
  const fetchFileWithCaching = useContext(FetchFileWithCachingContext);
  const bridge = useContext(BridgeContext);
  const store = useContext(StoreContext);
  const {parseHookNames: parseHookNamesByDefault} = useContext(SettingsContext);

  // parseHookNames has a lot of code.
  // Embedding it into a build makes the build large.
  // This function enables DevTools to make use of Suspense to lazily import() it only if the feature will be used.
  // TODO (Webpack 5) Hopefully we can remove this indirection once the Webpack 5 upgrade is completed.
  const hookNamesModuleLoader = useContext(HookNamesModuleLoaderContext);

  const refresh = useCacheRefresh();

  // Temporarily stores most recently-inspected (hydrated) path.
  // The transition that updates this causes the component to re-render and ask the cache->backend for the new path.
  // When a path is sent along with an "inspectElement" request,
  // the backend knows to send its dehydrated data even if the element hasn't updated since the last request.
  const [state, setState] = useState<{
    element: Element | null,
    path: Array<number | string> | null,
  }>({
    element: null,
    path: null,
  });

  const element =
    selectedElementID !== null ? store.getElementByID(selectedElementID) : null;

  const alreadyLoadedHookNames =
    element != null && hasAlreadyLoadedHookNames(element);

  // Parse the currently inspected element's hook names.
  // This may be enabled by default (for all elements)
  // or it may be opted into on a per-element basis (if it's too slow to be on by default).
  const [parseHookNames, setParseHookNames] = useState<boolean>(
    parseHookNamesByDefault || alreadyLoadedHookNames,
  );

<<<<<<< HEAD
=======
  const [bridgeIsAlive, setBridgeIsAliveStatus] = useState<boolean>(true);

>>>>>>> remotes/upstream/main
  const elementHasChanged = element !== null && element !== state.element;

  // Reset the cached inspected paths when a new element is selected.
  if (elementHasChanged) {
    setState({
      element,
      path: null,
    });

    setParseHookNames(parseHookNamesByDefault || alreadyLoadedHookNames);
  }

  const purgeCachedMetadataRef = useRef(null);

  // Don't load a stale element from the backend; it wastes bridge bandwidth.
  let hookNames: HookNames | null = null;
  let inspectedElement = null;
  if (!elementHasChanged && element !== null) {
    inspectedElement = inspectElement(element, state.path, store, bridge);

<<<<<<< HEAD
    if (enableNamedHooksFeature) {
      if (typeof hookNamesModuleLoader === 'function') {
        if (parseHookNames || alreadyLoadedHookNames) {
          const hookNamesModule = loadModule(hookNamesModuleLoader);
          if (hookNamesModule !== null) {
            const {
              parseHookNames: loadHookNamesFunction,
              purgeCachedMetadata,
            } = hookNamesModule;

            purgeCachedMetadataRef.current = purgeCachedMetadata;

            if (
              inspectedElement !== null &&
              inspectedElement.hooks !== null &&
              loadHookNamesFunction !== null
            ) {
              hookNames = loadHookNames(
                element,
                inspectedElement.hooks,
                loadHookNamesFunction,
                fetchFileWithCaching,
              );
            }
=======
    if (typeof hookNamesModuleLoader === 'function') {
      if (parseHookNames || alreadyLoadedHookNames) {
        const hookNamesModule = loadModule(hookNamesModuleLoader);
        if (hookNamesModule !== null) {
          const {parseHookNames: loadHookNamesFunction, purgeCachedMetadata} =
            hookNamesModule;

          purgeCachedMetadataRef.current = purgeCachedMetadata;

          if (
            inspectedElement !== null &&
            inspectedElement.hooks !== null &&
            loadHookNamesFunction !== null
          ) {
            hookNames = loadHookNames(
              element,
              inspectedElement.hooks,
              loadHookNamesFunction,
              fetchFileWithCaching,
            );
>>>>>>> remotes/upstream/main
          }
        }
      }
    }
  }

<<<<<<< HEAD
  const toggleParseHookNames: ToggleParseHookNames = useCallback<ToggleParseHookNames>(() => {
    startTransition(() => {
      setParseHookNames(value => !value);
      refresh();
    });
  }, [setParseHookNames]);
=======
  const toggleParseHookNames: ToggleParseHookNames =
    useCallback<ToggleParseHookNames>(() => {
      startTransition(() => {
        setParseHookNames(value => !value);
        refresh();
      });
    }, [setParseHookNames]);
>>>>>>> remotes/upstream/main

  const inspectPaths: InspectPathFunction = useCallback<InspectPathFunction>(
    (path: Path) => {
      startTransition(() => {
        setState({
          element: state.element,
          path,
        });
        refresh();
      });
    },
    [setState, state],
  );

<<<<<<< HEAD
  const inspectedElementRef = useRef(null);
=======
  const inspectedElementRef = useRef<null | InspectedElement>(null);
>>>>>>> remotes/upstream/main
  useEffect(() => {
    if (
      inspectedElement !== null &&
      inspectedElement.hooks !== null &&
      inspectedElementRef.current !== inspectedElement
    ) {
      inspectedElementRef.current = inspectedElement;
    }
  }, [inspectedElement]);

  useEffect(() => {
    const purgeCachedMetadata = purgeCachedMetadataRef.current;
    if (typeof purgeCachedMetadata === 'function') {
      // When Fast Refresh updates a component, any cached AST metadata may be invalid.
      const fastRefreshScheduled = () => {
        startTransition(() => {
          clearHookNamesCache();
          purgeCachedMetadata();
          refresh();
        });
      };
      bridge.addListener('fastRefreshScheduled', fastRefreshScheduled);
      return () =>
        bridge.removeListener('fastRefreshScheduled', fastRefreshScheduled);
    }
  }, [bridge]);

  // Reset path now that we've asked the backend to hydrate it.
  // The backend is stateful, so we don't need to remember this path the next time we inspect.
  useEffect(() => {
    if (state.path !== null) {
      setState({
        element: state.element,
        path: null,
      });
    }
  }, [state]);

<<<<<<< HEAD
  // Periodically poll the selected element for updates.
  useEffect(() => {
    if (element !== null) {
      const checkForUpdateWrapper = () => {
        checkForUpdate({bridge, element, refresh, store});
        timeoutID = setTimeout(checkForUpdateWrapper, POLL_INTERVAL);
      };
      let timeoutID = setTimeout(checkForUpdateWrapper, POLL_INTERVAL);
      return () => {
        clearTimeout(timeoutID);
=======
  useEffect(() => {
    // Assuming that new bridge is always alive at this moment
    setBridgeIsAliveStatus(true);

    const listener = () => setBridgeIsAliveStatus(false);
    bridge.addListener('shutdown', listener);

    return () => bridge.removeListener('shutdown', listener);
  }, [bridge]);

  // Periodically poll the selected element for updates.
  useEffect(() => {
    if (element !== null && bridgeIsAlive) {
      const {abort, pause, resume} = startElementUpdatesPolling({
        bridge,
        element,
        refresh,
        store,
      });

      bridge.addListener('resumeElementPolling', resume);
      bridge.addListener('pauseElementPolling', pause);

      return () => {
        bridge.removeListener('resumeElementPolling', resume);
        bridge.removeListener('pauseElementPolling', pause);

        abort();
>>>>>>> remotes/upstream/main
      };
    }
  }, [
    element,
    hookNames,
    // Reset this timer any time the element we're inspecting gets a new response.
    // No sense to ping right away after e.g. inspecting/hydrating a path.
    inspectedElement,
    state,
<<<<<<< HEAD
=======
    bridgeIsAlive,
>>>>>>> remotes/upstream/main
  ]);

  const value = useMemo<Context>(
    () => ({
      hookNames,
      inspectedElement,
      inspectPaths,
      parseHookNames,
      toggleParseHookNames,
    }),
    [
      hookNames,
      inspectedElement,
      inspectPaths,
      parseHookNames,
      toggleParseHookNames,
    ],
  );

  return (
    <InspectedElementContext.Provider value={value}>
      {children}
    </InspectedElementContext.Provider>
  );
}
