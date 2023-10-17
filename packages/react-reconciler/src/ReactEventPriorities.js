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
import {enableNewReconciler} from 'shared/ReactFeatureFlags';

import {
  DiscreteEventPriority as DiscreteEventPriority_old,
  ContinuousEventPriority as ContinuousEventPriority_old,
  DefaultEventPriority as DefaultEventPriority_old,
  IdleEventPriority as IdleEventPriority_old,
  getCurrentUpdatePriority as getCurrentUpdatePriority_old,
  setCurrentUpdatePriority as setCurrentUpdatePriority_old,
  runWithPriority as runWithPriority_old,
  isHigherEventPriority as isHigherEventPriority_old,
} from './ReactEventPriorities.old';

import {
  DiscreteEventPriority as DiscreteEventPriority_new,
  ContinuousEventPriority as ContinuousEventPriority_new,
  DefaultEventPriority as DefaultEventPriority_new,
  IdleEventPriority as IdleEventPriority_new,
  getCurrentUpdatePriority as getCurrentUpdatePriority_new,
  setCurrentUpdatePriority as setCurrentUpdatePriority_new,
  runWithPriority as runWithPriority_new,
  isHigherEventPriority as isHigherEventPriority_new,
} from './ReactEventPriorities.new';

export opaque type EventPriority = number;

export const DiscreteEventPriority: EventPriority = enableNewReconciler
  ? (DiscreteEventPriority_new: any)
  : (DiscreteEventPriority_old: any);
export const ContinuousEventPriority: EventPriority = enableNewReconciler
  ? (ContinuousEventPriority_new: any)
  : (ContinuousEventPriority_old: any);
export const DefaultEventPriority: EventPriority = enableNewReconciler
  ? (DefaultEventPriority_new: any)
  : (DefaultEventPriority_old: any);
export const IdleEventPriority: EventPriority = enableNewReconciler
  ? (IdleEventPriority_new: any)
  : (IdleEventPriority_old: any);

export function runWithPriority<T>(priority: EventPriority, fn: () => T): T {
  return enableNewReconciler
    ? runWithPriority_new((priority: any), fn)
    : runWithPriority_old((priority: any), fn);
}

export function getCurrentUpdatePriority(): EventPriority {
  return enableNewReconciler
    ? (getCurrentUpdatePriority_new(): any)
    : (getCurrentUpdatePriority_old(): any);
}

export function setCurrentUpdatePriority(priority: EventPriority): void {
  return enableNewReconciler
    ? setCurrentUpdatePriority_new((priority: any))
    : setCurrentUpdatePriority_old((priority: any));
=======
import type {Lane, Lanes} from './ReactFiberLane';

import {
  NoLane,
  SyncLane,
  InputContinuousLane,
  DefaultLane,
  IdleLane,
  getHighestPriorityLane,
  includesNonIdleWork,
} from './ReactFiberLane';

export opaque type EventPriority = Lane;

export const DiscreteEventPriority: EventPriority = SyncLane;
export const ContinuousEventPriority: EventPriority = InputContinuousLane;
export const DefaultEventPriority: EventPriority = DefaultLane;
export const IdleEventPriority: EventPriority = IdleLane;

let currentUpdatePriority: EventPriority = NoLane;

export function getCurrentUpdatePriority(): EventPriority {
  return currentUpdatePriority;
}

export function setCurrentUpdatePriority(newPriority: EventPriority) {
  currentUpdatePriority = newPriority;
}

export function runWithPriority<T>(priority: EventPriority, fn: () => T): T {
  const previousPriority = currentUpdatePriority;
  try {
    currentUpdatePriority = priority;
    return fn();
  } finally {
    currentUpdatePriority = previousPriority;
  }
}

export function higherEventPriority(
  a: EventPriority,
  b: EventPriority,
): EventPriority {
  return a !== 0 && a < b ? a : b;
}

export function lowerEventPriority(
  a: EventPriority,
  b: EventPriority,
): EventPriority {
  return a === 0 || a > b ? a : b;
>>>>>>> remotes/upstream/main
}

export function isHigherEventPriority(
  a: EventPriority,
  b: EventPriority,
): boolean {
<<<<<<< HEAD
  return enableNewReconciler
    ? isHigherEventPriority_new((a: any), (b: any))
    : isHigherEventPriority_old((a: any), (b: any));
=======
  return a !== 0 && a < b;
}

export function lanesToEventPriority(lanes: Lanes): EventPriority {
  const lane = getHighestPriorityLane(lanes);
  if (!isHigherEventPriority(DiscreteEventPriority, lane)) {
    return DiscreteEventPriority;
  }
  if (!isHigherEventPriority(ContinuousEventPriority, lane)) {
    return ContinuousEventPriority;
  }
  if (includesNonIdleWork(lane)) {
    return DefaultEventPriority;
  }
  return IdleEventPriority;
>>>>>>> remotes/upstream/main
}
