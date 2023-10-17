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
 * @flow strict-local
 */

'use strict';

<<<<<<< HEAD
import type {
  ReactNativeBaseComponentViewConfig,
  ViewConfigGetter,
} from './ReactNativeTypes';

// Event configs
const customBubblingEventTypes = {};
const customDirectEventTypes = {};
const eventTypes = {};

exports.customBubblingEventTypes = customBubblingEventTypes;
exports.customDirectEventTypes = customDirectEventTypes;
exports.eventTypes = eventTypes;
=======
import {type ViewConfig} from './ReactNativeTypes';

// Event configs
export const customBubblingEventTypes = {};
export const customDirectEventTypes = {};
>>>>>>> remotes/upstream/main

const viewConfigCallbacks = new Map();
const viewConfigs = new Map();

<<<<<<< HEAD
function processEventTypes(
  viewConfig: ReactNativeBaseComponentViewConfig<>,
): void {
=======
function processEventTypes(viewConfig: ViewConfig): void {
>>>>>>> remotes/upstream/main
  const {bubblingEventTypes, directEventTypes} = viewConfig;

  if (__DEV__) {
    if (bubblingEventTypes != null && directEventTypes != null) {
      for (const topLevelType in directEventTypes) {
        if (bubblingEventTypes[topLevelType] != null) {
          throw new Error(
            `Event cannot be both direct and bubbling: ${topLevelType}`,
          );
        }
      }
    }
  }

  if (bubblingEventTypes != null) {
    for (const topLevelType in bubblingEventTypes) {
      if (customBubblingEventTypes[topLevelType] == null) {
<<<<<<< HEAD
        eventTypes[topLevelType] = customBubblingEventTypes[topLevelType] =
=======
        customBubblingEventTypes[topLevelType] =
>>>>>>> remotes/upstream/main
          bubblingEventTypes[topLevelType];
      }
    }
  }

  if (directEventTypes != null) {
    for (const topLevelType in directEventTypes) {
      if (customDirectEventTypes[topLevelType] == null) {
<<<<<<< HEAD
        eventTypes[topLevelType] = customDirectEventTypes[topLevelType] =
          directEventTypes[topLevelType];
=======
        customDirectEventTypes[topLevelType] = directEventTypes[topLevelType];
>>>>>>> remotes/upstream/main
      }
    }
  }
}

/**
 * Registers a native view/component by name.
 * A callback is provided to load the view config from UIManager.
 * The callback is deferred until the view is actually rendered.
<<<<<<< HEAD
 * This is done to avoid causing Prepack deopts.
 */
exports.register = function(name: string, callback: ViewConfigGetter): string {
=======
 */
export function register(name: string, callback: () => ViewConfig): string {
>>>>>>> remotes/upstream/main
  if (viewConfigCallbacks.has(name)) {
    throw new Error(`Tried to register two views with the same name ${name}`);
  }

  if (typeof callback !== 'function') {
    throw new Error(
      `View config getter callback for component \`${name}\` must be a function (received \`${
        callback === null ? 'null' : typeof callback
      }\`)`,
    );
  }

  viewConfigCallbacks.set(name, callback);
  return name;
<<<<<<< HEAD
};
=======
}
>>>>>>> remotes/upstream/main

/**
 * Retrieves a config for the specified view.
 * If this is the first time the view has been used,
 * This configuration will be lazy-loaded from UIManager.
 */
<<<<<<< HEAD
exports.get = function(name: string): ReactNativeBaseComponentViewConfig<> {
=======
export function get(name: string): ViewConfig {
>>>>>>> remotes/upstream/main
  let viewConfig;
  if (!viewConfigs.has(name)) {
    const callback = viewConfigCallbacks.get(name);
    if (typeof callback !== 'function') {
      throw new Error(
        `View config getter callback for component \`${name}\` must be a function (received \`${
          callback === null ? 'null' : typeof callback
        }\`).${
          typeof name[0] === 'string' && /[a-z]/.test(name[0])
            ? ' Make sure to start component names with a capital letter.'
            : ''
        }`,
      );
    }
    viewConfig = callback();
    processEventTypes(viewConfig);
    viewConfigs.set(name, viewConfig);

    // Clear the callback after the config is set so that
    // we don't mask any errors during registration.
    viewConfigCallbacks.set(name, null);
  } else {
    viewConfig = viewConfigs.get(name);
  }

  if (!viewConfig) {
    throw new Error(`View config not found for name ${name}`);
  }

  return viewConfig;
<<<<<<< HEAD
};
=======
}
>>>>>>> remotes/upstream/main
