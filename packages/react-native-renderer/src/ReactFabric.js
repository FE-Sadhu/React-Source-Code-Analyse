/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {ReactPortal, ReactNodeList} from 'shared/ReactTypes';
import type {ElementRef, Element, ElementType} from 'react';
import type {FiberRoot} from 'react-reconciler/src/ReactInternalTypes';
import type {RenderRootOptions} from './ReactNativeTypes';

import './ReactFabricInjection';

import {
  batchedUpdates as batchedUpdatesImpl,
  discreteUpdates,
  createContainer,
  updateContainer,
  injectIntoDevTools,
  getPublicRootInstance,
  defaultOnUncaughtError,
  defaultOnCaughtError,
  defaultOnRecoverableError,
} from 'react-reconciler/src/ReactFiberReconciler';

import {createPortal as createPortalImpl} from 'react-reconciler/src/ReactPortal';
import {setBatchingImplementation} from './legacy-events/ReactGenericBatching';
import ReactVersion from 'shared/ReactVersion';

import {getClosestInstanceFromNode} from './ReactFabricComponentTree';
import {
  getInspectorDataForViewTag,
  getInspectorDataForViewAtPoint,
  getInspectorDataForInstance,
} from './ReactNativeFiberInspector';
import {LegacyRoot, ConcurrentRoot} from 'react-reconciler/src/ReactRootTags';
import {
  findHostInstance_DEPRECATED,
  findNodeHandle,
  dispatchCommand,
  sendAccessibilityEvent,
  getNodeFromInternalInstanceHandle,
  isChildPublicInstance,
} from './ReactNativePublicCompat';
import {getPublicInstanceFromInternalInstanceHandle} from './ReactFiberConfigFabric';

// Module provided by RN:
import {ReactFiberErrorDialog} from 'react-native/Libraries/ReactPrivate/ReactNativePrivateInterface';
import {disableLegacyMode} from 'shared/ReactFeatureFlags';

if (typeof ReactFiberErrorDialog.showErrorDialog !== 'function') {
  throw new Error(
    'Expected ReactFiberErrorDialog.showErrorDialog to be a function.',
  );
}

function nativeOnUncaughtError(
  error: mixed,
  errorInfo: {+componentStack?: ?string},
): void {
  const componentStack =
    errorInfo.componentStack != null ? errorInfo.componentStack : '';
  const logError = ReactFiberErrorDialog.showErrorDialog({
    errorBoundary: null,
    error,
    componentStack,
  });

  // Allow injected showErrorDialog() to prevent default console.error logging.
  // This enables renderers like ReactNative to better manage redbox behavior.
  if (logError === false) {
    return;
  }

  defaultOnUncaughtError(error, errorInfo);
}
function nativeOnCaughtError(
  error: mixed,
  errorInfo: {
    +componentStack?: ?string,
    +errorBoundary?: ?React$Component<any, any>,
  },
): void {
  const errorBoundary = errorInfo.errorBoundary;
  const componentStack =
    errorInfo.componentStack != null ? errorInfo.componentStack : '';
  const logError = ReactFiberErrorDialog.showErrorDialog({
    errorBoundary,
    error,
    componentStack,
  });

  // Allow injected showErrorDialog() to prevent default console.error logging.
  // This enables renderers like ReactNative to better manage redbox behavior.
  if (logError === false) {
    return;
  }

  defaultOnCaughtError(error, errorInfo);
}

function render(
  element: Element<ElementType>,
  containerTag: number,
  callback: ?() => void,
  concurrentRoot: ?boolean,
  options: ?RenderRootOptions,
): ?ElementRef<ElementType> {
  if (disableLegacyMode && !concurrentRoot) {
    throw new Error('render: Unsupported Legacy Mode API.');
  }

  let root = roots.get(containerTag);

  if (!root) {
    // TODO: these defaults are for backwards compatibility.
    // Once RN implements these options internally,
    // we can remove the defaults and ReactFiberErrorDialog.
    let onUncaughtError = nativeOnUncaughtError;
    let onCaughtError = nativeOnCaughtError;
    let onRecoverableError = defaultOnRecoverableError;

    if (options && options.onUncaughtError !== undefined) {
      onUncaughtError = options.onUncaughtError;
    }
    if (options && options.onCaughtError !== undefined) {
      onCaughtError = options.onCaughtError;
    }
    if (options && options.onRecoverableError !== undefined) {
      onRecoverableError = options.onRecoverableError;
    }

    // TODO (bvaughn): If we decide to keep the wrapper component,
    // We could create a wrapper for containerTag as well to reduce special casing.
    root = createContainer(
      containerTag,
      concurrentRoot ? ConcurrentRoot : LegacyRoot,
      null,
      false,
      null,
      '',
      onUncaughtError,
      onCaughtError,
      onRecoverableError,
      null,
    );
    roots.set(containerTag, root);
  }
  updateContainer(element, root, null, callback);

  return getPublicRootInstance(root);
}

// $FlowFixMe[missing-this-annot]
function unmountComponentAtNode(containerTag: number) {
  this.stopSurface(containerTag);
}

function stopSurface(containerTag: number) {
  const root = roots.get(containerTag);
  if (root) {
    // TODO: Is it safe to reset this now or should I wait since this unmount could be deferred?
    updateContainer(null, root, null, () => {
      roots.delete(containerTag);
    });
  }
}

function createPortal(
  children: ReactNodeList,
  containerTag: number,
  key: ?string = null,
): ReactPortal {
  return createPortalImpl(children, containerTag, null, key);
}

setBatchingImplementation(batchedUpdatesImpl, discreteUpdates);

const roots = new Map<number, FiberRoot>();

export {
  // This is needed for implementation details of TouchableNativeFeedback
  // Remove this once TouchableNativeFeedback doesn't use cloneElement
  findHostInstance_DEPRECATED,
  findNodeHandle,
  dispatchCommand,
  sendAccessibilityEvent,
  render,
  // Deprecated - this function is being renamed to stopSurface, use that instead.
  // TODO (T47576999): Delete this once it's no longer called from native code.
  unmountComponentAtNode,
  stopSurface,
  createPortal,
  // This export is typically undefined in production builds.
  // See the "enableGetInspectorDataForInstanceInProduction" flag.
  getInspectorDataForInstance,
  // The public instance has a reference to the internal instance handle.
  // This method allows it to acess the most recent shadow node for
  // the instance (it's only accessible through it).
  getNodeFromInternalInstanceHandle,
  // Fabric native methods to traverse the host tree return the same internal
  // instance handles we use to dispatch events. This provides a way to access
  // the public instances we created from them (potentially created lazily).
  getPublicInstanceFromInternalInstanceHandle,
  // DEV-only:
  isChildPublicInstance,
};

injectIntoDevTools({
  // $FlowExpectedError[incompatible-call] The type of `Instance` in `getClosestInstanceFromNode` does not match in Fabric and the legacy renderer, so it fails to typecheck here.
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: __DEV__ ? 1 : 0,
  version: ReactVersion,
  rendererPackageName: 'react-native-renderer',
  rendererConfig: {
    getInspectorDataForInstance,
    getInspectorDataForViewTag: getInspectorDataForViewTag,
    getInspectorDataForViewAtPoint: getInspectorDataForViewAtPoint.bind(
      null,
      findNodeHandle,
    ),
  },
});
