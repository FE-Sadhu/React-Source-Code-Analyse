/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

import type {ReactNodeList} from 'shared/ReactTypes';
import type {
  RootType,
  HydrateRootOptions,
  CreateRootOptions,
} from './src/client/ReactDOMRoot';

import {
  createRoot as createRootImpl,
  hydrateRoot as hydrateRootImpl,
  __DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE as Internals,
} from './';

export function createRoot(
  container: Element | Document | DocumentFragment,
  options?: CreateRootOptions,
): RootType {
  if (__DEV__) {
    (Internals: any).usingClientEntryPoint = true;
  }
  try {
    return createRootImpl(container, options);
  } finally {
    if (__DEV__) {
      (Internals: any).usingClientEntryPoint = false;
    }
  }
}

export function hydrateRoot(
  container: Document | Element,
  children: ReactNodeList,
  options?: HydrateRootOptions,
): RootType {
  if (__DEV__) {
    (Internals: any).usingClientEntryPoint = true;
  }
  try {
    return hydrateRootImpl(container, children, options);
  } finally {
    if (__DEV__) {
      (Internals: any).usingClientEntryPoint = false;
    }
  }
}
