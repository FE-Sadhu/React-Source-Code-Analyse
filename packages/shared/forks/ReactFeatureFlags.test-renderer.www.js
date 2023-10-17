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

import typeof * as FeatureFlagsType from 'shared/ReactFeatureFlags';
import typeof * as ExportsType from './ReactFeatureFlags.test-renderer.www';

export const debugRenderPhaseSideEffectsForStrictMode = false;
export const enableDebugTracing = false;
export const enableSchedulingProfiler = false;
<<<<<<< HEAD
export const warnAboutDeprecatedLifecycles = true;
=======
>>>>>>> remotes/upstream/main
export const replayFailedUnitOfWorkWithInvokeGuardedCallback = false;
export const enableProfilerTimer = __PROFILE__;
export const enableProfilerCommitHooks = __PROFILE__;
export const enableProfilerNestedUpdatePhase = __PROFILE__;
export const enableProfilerNestedUpdateScheduledHook = false;
export const enableUpdaterTracking = false;
export const enableCache = true;
<<<<<<< HEAD
export const enableCacheElement = true;
=======
export const enableLegacyCache = true;
export const enableCacheElement = true;
export const enableFetchInstrumentation = false;
export const enableFormActions = true; // Doesn't affect Test Renderer
export const enableBinaryFlight = true;
export const enableTaint = true;
export const enablePostpone = false;
>>>>>>> remotes/upstream/main
export const enableSchedulerDebugging = false;
export const disableJavaScriptURLs = false;
export const disableCommentsAsDOMContainers = true;
export const disableInputAttributeSyncing = false;
<<<<<<< HEAD
export const enableScopeAPI = true;
export const enableCreateEventHandleAPI = false;
export const enableSuspenseCallback = true;
export const warnAboutDefaultPropsOnFunctionComponents = false;
export const warnAboutStringRefs = false;
export const disableLegacyContext = false;
export const disableSchedulerTimeoutBasedOnReactExpirationTime = false;
export const enableTrustedTypesIntegration = false;
export const disableTextareaChildren = false;
export const disableModulePatternComponents = true;
export const warnAboutSpreadingKeyToJSX = false;
export const enableSuspenseAvoidThisFallback = true;
export const enableSuspenseAvoidThisFallbackFizz = false;
export const enableCPUSuspense = false;
export const enableUseHook = false;
export const enableUseMemoCacheHook = false;
export const enableUseEventHook = false;
export const enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay = true;
export const enableClientRenderFallbackOnTextMismatch = true;
export const enableComponentStackLocations = true;
export const enableLegacyFBSupport = false;
export const enableFilterEmptyStringAttributesDOM = false;
export const disableNativeComponentFrames = false;
export const skipUnmountedBoundaries = false;
export const deletedTreeCleanUpLevel = 3;
export const enableGetInspectorDataForInstanceInProduction = false;
export const enableNewReconciler = false;
export const deferRenderPhaseUpdateToNextBatch = false;

export const enableStrictEffects = true;
=======
export const disableIEWorkarounds = true;
export const enableScopeAPI = true;
export const enableCreateEventHandleAPI = false;
export const enableSuspenseCallback = true;
export const disableLegacyContext = false;
export const enableTrustedTypesIntegration = false;
export const disableTextareaChildren = false;
export const disableModulePatternComponents = true;
export const enableSuspenseAvoidThisFallback = true;
export const enableSuspenseAvoidThisFallbackFizz = false;
export const enableCPUSuspense = false;
export const enableUseMemoCacheHook = false;
export const enableUseEffectEventHook = false;
export const enableClientRenderFallbackOnTextMismatch = true;
export const enableComponentStackLocations = true;
export const enableLegacyFBSupport = false;
export const enableFilterEmptyStringAttributesDOM = true;
export const enableGetInspectorDataForInstanceInProduction = false;

>>>>>>> remotes/upstream/main
export const createRootStrictEffectsByDefault = false;
export const enableUseRefAccessWarning = false;

export const disableSchedulerTimeoutInWorkLoop = false;
export const enableLazyContextPropagation = false;
export const enableLegacyHidden = false;
<<<<<<< HEAD
export const enableSyncDefaultUpdates = true;
=======
export const forceConcurrentByDefaultForTesting = false;
export const enableUnifiedSyncLane = false;
>>>>>>> remotes/upstream/main
export const allowConcurrentByDefault = true;
export const enableCustomElementPropertySupport = false;

export const consoleManagedByDevToolsDuringStrictMode = false;
export const enableServerContext = false;

<<<<<<< HEAD
// Some www surfaces are still using this. Remove once they have been migrated.
export const enableUseMutableSource = true;

export const enableTransitionTracing = false;

export const enableFloat = false;
// Flow magic to verify the exports of this file match the original version.
// eslint-disable-next-line no-unused-vars
type Check<_X, Y: _X, X: Y = _X> = null;
// eslint-disable-next-line no-unused-expressions
(null: Check<ExportsType, FeatureFlagsType>);
=======
export const enableTransitionTracing = false;

export const enableFloat = true;
export const enableHostSingletons = true;

export const useModernStrictMode = false;
export const enableDO_NOT_USE_disableStrictPassiveEffect = false;
export const enableFizzExternalRuntime = false;
export const enableDeferRootSchedulingToMicrotask = true;

export const enableAsyncActions = true;

export const alwaysThrottleRetries = true;

export const useMicrotasksForSchedulingInFabric = false;
export const passChildrenWhenCloningPersistedNodes = false;
export const enableUseDeferredValueInitialArg = true;

// Flow magic to verify the exports of this file match the original version.
((((null: any): ExportsType): FeatureFlagsType): ExportsType);
>>>>>>> remotes/upstream/main
