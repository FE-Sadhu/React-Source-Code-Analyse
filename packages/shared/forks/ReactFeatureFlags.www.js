/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import typeof * as FeatureFlagsType from 'shared/ReactFeatureFlags';
import typeof * as ExportsType from './ReactFeatureFlags.www';
import typeof * as DynamicFeatureFlags from './ReactFeatureFlags.www-dynamic';

// Re-export dynamic flags from the www version.
const dynamicFeatureFlags: DynamicFeatureFlags = require('ReactFeatureFlags');

export const {
  alwaysThrottleRetries,
  disableDefaultPropsExceptForClasses,
  disableSchedulerTimeoutInWorkLoop,
  enableAddPropertiesFastPath,
  enableDebugTracing,
  enableDeferRootSchedulingToMicrotask,
  enableDO_NOT_USE_disableStrictPassiveEffect,
  enableFastJSX,
  enableInfiniteRenderLoopDetection,
  enableLazyContextPropagation,
  enableNoCloningMemoCache,
  enableObjectFiber,
  enableRenderableContext,
  enableRetryLaneExpiration,
  enableTransitionTracing,
  enableTrustedTypesIntegration,
  enableUseDeferredValueInitialArg,
  favorSafetyOverHydrationPerf,
  renameElementSymbol,
  retryLaneExpirationMs,
  syncLaneExpirationMs,
  transitionLaneExpirationMs,
} = dynamicFeatureFlags;

// On WWW, __EXPERIMENTAL__ is used for a new modern build.
// It's not used anywhere in production yet.

export const debugRenderPhaseSideEffectsForStrictMode = __DEV__;
export const enableProfilerTimer = __PROFILE__;
export const enableProfilerCommitHooks = __PROFILE__;
export const enableProfilerNestedUpdatePhase = __PROFILE__;
export const enableUpdaterTracking = __PROFILE__;

export const enableSuspenseAvoidThisFallback = true;
export const enableSuspenseAvoidThisFallbackFizz = false;

export const disableIEWorkarounds = true;
export const enableCPUSuspense = true;
export const enableUseMemoCacheHook = true;
export const enableUseEffectEventHook = true;
export const enableFilterEmptyStringAttributesDOM = true;
export const enableAsyncActions = true;
export const disableInputAttributeSyncing = false;
export const enableLegacyFBSupport = true;

// Logs additional User Timing API marks for use with an experimental profiling tool.
export const enableSchedulingProfiler: boolean =
  __PROFILE__ && dynamicFeatureFlags.enableSchedulingProfiler;

export const disableLegacyContext = __EXPERIMENTAL__;
export const enableGetInspectorDataForInstanceInProduction = false;

export const enableCache = true;
export const enableLegacyCache = true;

export const enableBinaryFlight = true;
export const enableFlightReadableStream = true;
export const enableAsyncIterableChildren = false;

export const enableTaint = false;

export const enablePostpone = false;

// TODO: www currently relies on this feature. It's disabled in open source.
// Need to remove it.
export const disableCommentsAsDOMContainers = false;

export const enableCreateEventHandleAPI = true;

export const enableScopeAPI = true;

export const enableSuspenseCallback = true;

export const enableLegacyHidden = true;

export const enableComponentStackLocations = true;

export const enableRefAsProp = true;

export const disableTextareaChildren = __EXPERIMENTAL__;

export const allowConcurrentByDefault = true;

export const consoleManagedByDevToolsDuringStrictMode = true;

export const enableFizzExternalRuntime = true;

export const forceConcurrentByDefaultForTesting = false;

export const passChildrenWhenCloningPersistedNodes = false;

export const enableAsyncDebugInfo = false;
export const disableClientCache = true;

export const enableServerComponentLogs = true;

export const enableReactTestRendererWarning = false;
export const useModernStrictMode = true;

// TODO: Roll out with GK. Don't keep as dynamic flag for too long, though,
// because JSX is an extremely hot path.
export const disableStringRefs = false;

export const disableLegacyMode: boolean =
  __EXPERIMENTAL__ || dynamicFeatureFlags.disableLegacyMode;

export const enableOwnerStacks = false;
export const enableShallowPropDiffing = false;

// Flow magic to verify the exports of this file match the original version.
((((null: any): ExportsType): FeatureFlagsType): ExportsType);
