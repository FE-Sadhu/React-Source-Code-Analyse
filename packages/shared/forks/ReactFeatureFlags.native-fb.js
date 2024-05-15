/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import typeof * as FeatureFlagsType from 'shared/ReactFeatureFlags';
import typeof * as ExportsType from './ReactFeatureFlags.native-fb';
import typeof * as DynamicExportsType from './ReactFeatureFlags.native-fb-dynamic';

// Re-export dynamic flags from the internal module.
// Intentionally using * because this import is compiled to a `require` call.
import * as dynamicFlagsUntyped from 'ReactNativeInternalFeatureFlags';
const dynamicFlags: DynamicExportsType = (dynamicFlagsUntyped: any);

// We destructure each value before re-exporting to avoid a dynamic look-up on
// the exports object every time a flag is read.
export const {
  alwaysThrottleRetries,
  consoleManagedByDevToolsDuringStrictMode,
  enableAsyncActions,
  enableComponentStackLocations,
  enableDeferRootSchedulingToMicrotask,
  enableInfiniteRenderLoopDetection,
  enableRenderableContext,
  enableUnifiedSyncLane,
  passChildrenWhenCloningPersistedNodes,
  useModernStrictMode,
  disableDefaultPropsExceptForClasses,
} = dynamicFlags;

// The rest of the flags are static for better dead code elimination.
export const enableDebugTracing = false;
export const enableAsyncDebugInfo = false;
export const enableSchedulingProfiler = __PROFILE__;
export const enableProfilerTimer = __PROFILE__;
export const enableProfilerCommitHooks = __PROFILE__;
export const enableProfilerNestedUpdatePhase = __PROFILE__;
export const enableUpdaterTracking = __PROFILE__;
export const enableCache = true;
export const enableLegacyCache = false;
export const enableFetchInstrumentation = false;
export const enableBinaryFlight = true;
export const enableFlightReadableStream = true;
export const enableTaint = true;
export const enablePostpone = false;
export const debugRenderPhaseSideEffectsForStrictMode = __DEV__;
export const disableCommentsAsDOMContainers = true;
export const disableInputAttributeSyncing = false;
export const disableIEWorkarounds = true;
export const enableScopeAPI = false;
export const enableCreateEventHandleAPI = false;
export const enableSuspenseCallback = false;
export const disableLegacyContext = false;
export const enableTrustedTypesIntegration = false;
export const disableTextareaChildren = false;
export const enableSuspenseAvoidThisFallback = false;
export const enableSuspenseAvoidThisFallbackFizz = false;
export const enableCPUSuspense = true;
export const enableUseMemoCacheHook = true;
export const enableUseEffectEventHook = false;
export const favorSafetyOverHydrationPerf = true;
export const enableLegacyFBSupport = false;
export const enableFilterEmptyStringAttributesDOM = true;
export const enableGetInspectorDataForInstanceInProduction = true;

export const enableRetryLaneExpiration = false;
export const retryLaneExpirationMs = 5000;
export const syncLaneExpirationMs = 250;
export const transitionLaneExpirationMs = 5000;

export const disableSchedulerTimeoutInWorkLoop = false;
export const enableLazyContextPropagation = false;
export const enableLegacyHidden = false;
export const forceConcurrentByDefaultForTesting = false;
export const allowConcurrentByDefault = false;

export const enableTransitionTracing = false;

export const enableDO_NOT_USE_disableStrictPassiveEffect = false;
export const enableFizzExternalRuntime = true;

export const enableUseDeferredValueInitialArg = true;
export const disableClientCache = true;

export const enableServerComponentKeys = true;
export const enableServerComponentLogs = true;

// TODO: Roll out with GK. Don't keep as dynamic flag for too long, though,
// because JSX is an extremely hot path.
export const enableRefAsProp = false;
export const disableStringRefs = false;

export const enableReactTestRendererWarning = false;
export const disableLegacyMode = false;
export const disableDOMTestUtils = false;

// Flow magic to verify the exports of this file match the original version.
((((null: any): ExportsType): FeatureFlagsType): ExportsType);
