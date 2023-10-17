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
import typeof * as ExportsType from './ReactFeatureFlags.native-oss';

export const debugRenderPhaseSideEffectsForStrictMode = false;
export const enableDebugTracing = false;
export const enableSchedulingProfiler = false;
export const replayFailedUnitOfWorkWithInvokeGuardedCallback = __DEV__;
<<<<<<< HEAD
export const warnAboutDeprecatedLifecycles = true;
=======
>>>>>>> remotes/upstream/main
export const enableProfilerTimer = __PROFILE__;
export const enableProfilerCommitHooks = __PROFILE__;
export const enableProfilerNestedUpdatePhase = __PROFILE__;
export const enableProfilerNestedUpdateScheduledHook = false;
export const enableUpdaterTracking = __PROFILE__;
export const enableCache = false;
<<<<<<< HEAD
export const enableCacheElement = false;
export const disableJavaScriptURLs = false;
export const disableCommentsAsDOMContainers = true;
export const disableInputAttributeSyncing = false;
=======
export const enableLegacyCache = false;
export const enableCacheElement = false;
export const enableFetchInstrumentation = false;
export const enableFormActions = true; // Doesn't affect Native
export const enableBinaryFlight = true;
export const enableTaint = true;
export const enablePostpone = false;
export const disableJavaScriptURLs = false;
export const disableCommentsAsDOMContainers = true;
export const disableInputAttributeSyncing = false;
export const disableIEWorkarounds = true;
>>>>>>> remotes/upstream/main
export const enableSchedulerDebugging = false;
export const enableScopeAPI = false;
export const enableCreateEventHandleAPI = false;
export const enableSuspenseCallback = false;
<<<<<<< HEAD
export const warnAboutDefaultPropsOnFunctionComponents = false;
export const warnAboutStringRefs = false;
export const disableLegacyContext = false;
export const disableSchedulerTimeoutBasedOnReactExpirationTime = false;
export const enableTrustedTypesIntegration = false;
export const disableTextareaChildren = false;
export const disableModulePatternComponents = false;
export const warnAboutSpreadingKeyToJSX = false;
export const enableSuspenseAvoidThisFallback = false;
export const enableSuspenseAvoidThisFallbackFizz = false;
export const enableCPUSuspense = false;
export const enableUseHook = false;
export const enableUseMemoCacheHook = false;
export const enableUseEventHook = false;
export const enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay = true;
=======
export const disableLegacyContext = false;
export const enableTrustedTypesIntegration = false;
export const disableTextareaChildren = false;
export const disableModulePatternComponents = false;
export const enableSuspenseAvoidThisFallback = false;
export const enableSuspenseAvoidThisFallbackFizz = false;
export const enableCPUSuspense = false;
export const enableUseMemoCacheHook = false;
export const enableUseEffectEventHook = false;
>>>>>>> remotes/upstream/main
export const enableClientRenderFallbackOnTextMismatch = true;
export const enableComponentStackLocations = false;
export const enableLegacyFBSupport = false;
export const enableFilterEmptyStringAttributesDOM = false;
<<<<<<< HEAD
export const disableNativeComponentFrames = false;
export const skipUnmountedBoundaries = false;
export const deletedTreeCleanUpLevel = 3;
export const enableGetInspectorDataForInstanceInProduction = false;
export const enableNewReconciler = false;
export const deferRenderPhaseUpdateToNextBatch = false;

export const enableStrictEffects = false;
=======
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
export const allowConcurrentByDefault = false;
export const enableCustomElementPropertySupport = false;

export const consoleManagedByDevToolsDuringStrictMode = false;
export const enableServerContext = false;
<<<<<<< HEAD
export const enableUseMutableSource = false;

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

export const enableAsyncActions = false;

export const alwaysThrottleRetries = true;

export const useMicrotasksForSchedulingInFabric = false;
export const passChildrenWhenCloningPersistedNodes = false;
export const enableUseDeferredValueInitialArg = __EXPERIMENTAL__;

// Flow magic to verify the exports of this file match the original version.
((((null: any): ExportsType): FeatureFlagsType): ExportsType);
>>>>>>> remotes/upstream/main
