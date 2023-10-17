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

import type {HookSourceAndMetadata} from './loadSourceAndMetadata';
import type {HooksNode, HooksTree} from 'react-debug-tools/src/ReactDebugHooks';
<<<<<<< HEAD
import type {HookNames} from 'react-devtools-shared/src/types';
=======
import type {HookNames} from 'react-devtools-shared/src/frontend/types';
>>>>>>> remotes/upstream/main
import type {FetchFileWithCaching} from 'react-devtools-shared/src/devtools/views/Components/FetchFileWithCachingContext';

import {withAsyncPerfMeasurements} from 'react-devtools-shared/src/PerformanceLoggingUtils';
import WorkerizedParseSourceAndMetadata from './parseSourceAndMetadata.worker';
import typeof * as ParseSourceAndMetadataModule from './parseSourceAndMetadata';
import {flattenHooksList, loadSourceAndMetadata} from './loadSourceAndMetadata';

<<<<<<< HEAD
const workerizedParseHookNames: ParseSourceAndMetadataModule = WorkerizedParseSourceAndMetadata();
=======
const workerizedParseHookNames: ParseSourceAndMetadataModule =
  WorkerizedParseSourceAndMetadata();
>>>>>>> remotes/upstream/main

export function parseSourceAndMetadata(
  hooksList: Array<HooksNode>,
  locationKeyToHookSourceAndMetadata: Map<string, HookSourceAndMetadata>,
): Promise<HookNames | null> {
  return workerizedParseHookNames.parseSourceAndMetadata(
    hooksList,
    locationKeyToHookSourceAndMetadata,
  );
}

export const purgeCachedMetadata = workerizedParseHookNames.purgeCachedMetadata;

<<<<<<< HEAD
const EMPTY_MAP = new Map();
=======
const EMPTY_MAP: HookNames = new Map();
>>>>>>> remotes/upstream/main

export async function parseHookNames(
  hooksTree: HooksTree,
  fetchFileWithCaching: FetchFileWithCaching | null,
): Promise<HookNames | null> {
  return withAsyncPerfMeasurements('parseHookNames', async () => {
    const hooksList = flattenHooksList(hooksTree);
    if (hooksList.length === 0) {
      // This component tree contains no named hooks.
      return EMPTY_MAP;
    }

    // Runs on the main/UI thread so it can reuse Network cache:
    const locationKeyToHookSourceAndMetadata = await loadSourceAndMetadata(
      hooksList,
      fetchFileWithCaching,
    );

    // Runs in a Worker because it's CPU intensive:
    return parseSourceAndMetadata(
      hooksList,
      locationKeyToHookSourceAndMetadata,
    );
  });
}
