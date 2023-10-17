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
import type {Dispatcher as DispatcherType} from 'react-reconciler/src/ReactInternalTypes';

import type {
  MutableSource,
  MutableSourceGetSnapshotFn,
  MutableSourceSubscribeFn,
=======
import type {Dispatcher} from 'react-reconciler/src/ReactInternalTypes';

import type {
>>>>>>> remotes/upstream/main
  ReactContext,
  StartTransitionOptions,
  Thenable,
  Usable,
<<<<<<< HEAD
} from 'shared/ReactTypes';

import type {ResponseState} from './ReactServerFormatConfig';
import type {Task} from './ReactFizzServer';
import type {ThenableState} from './ReactFizzWakeable';

import {readContext as readContextImpl} from './ReactFizzNewContext';
import {getTreeId} from './ReactFizzTreeContext';
import {
  getPreviouslyUsedThenableAtIndex,
  createThenableState,
  trackUsedThenable,
} from './ReactFizzWakeable';

import {makeId} from './ReactServerFormatConfig';

import {
  enableCache,
  enableUseHook,
  enableUseMemoCacheHook,
=======
  ReactCustomFormAction,
} from 'shared/ReactTypes';

import type {ResumableState} from './ReactFizzConfig';
import type {Request, Task, KeyNode} from './ReactFizzServer';
import type {ThenableState} from './ReactFizzThenable';
import type {TransitionStatus} from './ReactFizzConfig';

import {readContext as readContextImpl} from './ReactFizzNewContext';
import {getTreeId} from './ReactFizzTreeContext';
import {createThenableState, trackUsedThenable} from './ReactFizzThenable';

import {makeId, NotPendingTransition} from './ReactFizzConfig';
import {createFastHash} from './ReactServerStreamConfig';

import {
  enableCache,
  enableUseEffectEventHook,
  enableUseMemoCacheHook,
  enableAsyncActions,
  enableFormActions,
  enableUseDeferredValueInitialArg,
>>>>>>> remotes/upstream/main
} from 'shared/ReactFeatureFlags';
import is from 'shared/objectIs';
import {
  REACT_SERVER_CONTEXT_TYPE,
  REACT_CONTEXT_TYPE,
<<<<<<< HEAD
} from 'shared/ReactSymbols';
=======
  REACT_MEMO_CACHE_SENTINEL,
} from 'shared/ReactSymbols';
import {checkAttributeStringCoercion} from 'shared/CheckStringCoercion';
import {getFormState} from './ReactFizzServer';
>>>>>>> remotes/upstream/main

type BasicStateAction<S> = (S => S) | S;
type Dispatch<A> = A => void;

type Update<A> = {
  action: A,
  next: Update<A> | null,
};

type UpdateQueue<A> = {
  last: Update<A> | null,
  dispatch: any,
};

type Hook = {
  memoizedState: any,
  queue: UpdateQueue<any> | null,
  next: Hook | null,
};

let currentlyRenderingComponent: Object | null = null;
let currentlyRenderingTask: Task | null = null;
<<<<<<< HEAD
=======
let currentlyRenderingRequest: Request | null = null;
let currentlyRenderingKeyPath: KeyNode | null = null;
>>>>>>> remotes/upstream/main
let firstWorkInProgressHook: Hook | null = null;
let workInProgressHook: Hook | null = null;
// Whether the work-in-progress hook is a re-rendered hook
let isReRender: boolean = false;
// Whether an update was scheduled during the currently executing render pass.
let didScheduleRenderPhaseUpdate: boolean = false;
// Counts the number of useId hooks in this component
let localIdCounter: number = 0;
<<<<<<< HEAD
=======
// Chunks that should be pushed to the stream once the component
// finishes rendering.
// Counts the number of useFormState calls in this component
let formStateCounter: number = 0;
// The index of the useFormState hook that matches the one passed in at the
// root during an MPA navigation, if any.
let formStateMatchingIndex: number = -1;
>>>>>>> remotes/upstream/main
// Counts the number of use(thenable) calls in this component
let thenableIndexCounter: number = 0;
let thenableState: ThenableState | null = null;
// Lazily created map of render-phase updates
let renderPhaseUpdates: Map<UpdateQueue<any>, Update<any>> | null = null;
// Counter to prevent infinite loops.
let numberOfReRenders: number = 0;
const RE_RENDER_LIMIT = 25;

let isInHookUserCodeInDev = false;

// In DEV, this is the name of the currently executing primitive hook
let currentHookNameInDev: ?string;

function resolveCurrentlyRenderingComponent(): Object {
  if (currentlyRenderingComponent === null) {
    throw new Error(
      'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' +
        ' one of the following reasons:\n' +
        '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
        '2. You might be breaking the Rules of Hooks\n' +
        '3. You might have more than one copy of React in the same app\n' +
        'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.',
    );
  }

  if (__DEV__) {
    if (isInHookUserCodeInDev) {
      console.error(
        'Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. ' +
          'You can only call Hooks at the top level of your React function. ' +
          'For more information, see ' +
          'https://reactjs.org/link/rules-of-hooks',
      );
    }
  }
  return currentlyRenderingComponent;
}

function areHookInputsEqual(
  nextDeps: Array<mixed>,
  prevDeps: Array<mixed> | null,
) {
  if (prevDeps === null) {
    if (__DEV__) {
      console.error(
        '%s received a final argument during this render, but not during ' +
          'the previous render. Even though the final argument is optional, ' +
          'its type cannot change between renders.',
        currentHookNameInDev,
      );
    }
    return false;
  }

  if (__DEV__) {
    // Don't bother comparing lengths in prod because these arrays should be
    // passed inline.
    if (nextDeps.length !== prevDeps.length) {
      console.error(
        'The final argument passed to %s changed size between renders. The ' +
          'order and size of this array must remain constant.\n\n' +
          'Previous: %s\n' +
          'Incoming: %s',
        currentHookNameInDev,
        `[${nextDeps.join(', ')}]`,
        `[${prevDeps.join(', ')}]`,
      );
    }
  }
<<<<<<< HEAD
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
=======
  // $FlowFixMe[incompatible-use] found when upgrading Flow
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    // $FlowFixMe[incompatible-use] found when upgrading Flow
>>>>>>> remotes/upstream/main
    if (is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}

function createHook(): Hook {
  if (numberOfReRenders > 0) {
    throw new Error('Rendered more hooks than during the previous render');
  }
  return {
    memoizedState: null,
    queue: null,
    next: null,
  };
}

function createWorkInProgressHook(): Hook {
  if (workInProgressHook === null) {
    // This is the first hook in the list
    if (firstWorkInProgressHook === null) {
      isReRender = false;
      firstWorkInProgressHook = workInProgressHook = createHook();
    } else {
      // There's already a work-in-progress. Reuse it.
      isReRender = true;
      workInProgressHook = firstWorkInProgressHook;
    }
  } else {
    if (workInProgressHook.next === null) {
      isReRender = false;
      // Append to the end of the list
      workInProgressHook = workInProgressHook.next = createHook();
    } else {
      // There's already a work-in-progress. Reuse it.
      isReRender = true;
      workInProgressHook = workInProgressHook.next;
    }
  }
  return workInProgressHook;
}

export function prepareToUseHooks(
<<<<<<< HEAD
  task: Task,
=======
  request: Request,
  task: Task,
  keyPath: KeyNode | null,
>>>>>>> remotes/upstream/main
  componentIdentity: Object,
  prevThenableState: ThenableState | null,
): void {
  currentlyRenderingComponent = componentIdentity;
  currentlyRenderingTask = task;
<<<<<<< HEAD
=======
  currentlyRenderingRequest = request;
  currentlyRenderingKeyPath = keyPath;
>>>>>>> remotes/upstream/main
  if (__DEV__) {
    isInHookUserCodeInDev = false;
  }

  // The following should have already been reset
  // didScheduleRenderPhaseUpdate = false;
  // firstWorkInProgressHook = null;
  // numberOfReRenders = 0;
  // renderPhaseUpdates = null;
  // workInProgressHook = null;

  localIdCounter = 0;
<<<<<<< HEAD
=======
  formStateCounter = 0;
  formStateMatchingIndex = -1;
>>>>>>> remotes/upstream/main
  thenableIndexCounter = 0;
  thenableState = prevThenableState;
}

export function finishHooks(
  Component: any,
  props: any,
  children: any,
  refOrContext: any,
): any {
  // This must be called after every function component to prevent hooks from
  // being used in classes.

  while (didScheduleRenderPhaseUpdate) {
    // Updates were scheduled during the render phase. They are stored in
    // the `renderPhaseUpdates` map. Call the component again, reusing the
    // work-in-progress hooks and applying the additional updates on top. Keep
    // restarting until no more updates are scheduled.
    didScheduleRenderPhaseUpdate = false;
    localIdCounter = 0;
<<<<<<< HEAD
=======
    formStateCounter = 0;
    formStateMatchingIndex = -1;
>>>>>>> remotes/upstream/main
    thenableIndexCounter = 0;
    numberOfReRenders += 1;

    // Start over from the beginning of the list
    workInProgressHook = null;

    children = Component(props, refOrContext);
  }
<<<<<<< HEAD
=======

>>>>>>> remotes/upstream/main
  resetHooksState();
  return children;
}

export function getThenableStateAfterSuspending(): null | ThenableState {
  const state = thenableState;
  thenableState = null;
  return state;
}

export function checkDidRenderIdHook(): boolean {
  // This should be called immediately after every finishHooks call.
  // Conceptually, it's part of the return value of finishHooks; it's only a
  // separate function to avoid using an array tuple.
  const didRenderIdHook = localIdCounter !== 0;
  return didRenderIdHook;
}

<<<<<<< HEAD
=======
export function getFormStateCount(): number {
  // This should be called immediately after every finishHooks call.
  // Conceptually, it's part of the return value of finishHooks; it's only a
  // separate function to avoid using an array tuple.
  return formStateCounter;
}
export function getFormStateMatchingIndex(): number {
  // This should be called immediately after every finishHooks call.
  // Conceptually, it's part of the return value of finishHooks; it's only a
  // separate function to avoid using an array tuple.
  return formStateMatchingIndex;
}

>>>>>>> remotes/upstream/main
// Reset the internal hooks state if an error occurs while rendering a component
export function resetHooksState(): void {
  if (__DEV__) {
    isInHookUserCodeInDev = false;
  }

  currentlyRenderingComponent = null;
  currentlyRenderingTask = null;
<<<<<<< HEAD
=======
  currentlyRenderingRequest = null;
  currentlyRenderingKeyPath = null;
>>>>>>> remotes/upstream/main
  didScheduleRenderPhaseUpdate = false;
  firstWorkInProgressHook = null;
  numberOfReRenders = 0;
  renderPhaseUpdates = null;
  workInProgressHook = null;
}

<<<<<<< HEAD
function getCacheForType<T>(resourceType: () => T): T {
  // TODO: This should silently mark this as client rendered since it's not necessarily
  // considered an error. It needs to work for things like Flight though.
  throw new Error('Not implemented.');
}

=======
>>>>>>> remotes/upstream/main
function readContext<T>(context: ReactContext<T>): T {
  if (__DEV__) {
    if (isInHookUserCodeInDev) {
      console.error(
        'Context can only be read while React is rendering. ' +
          'In classes, you can read it in the render method or getDerivedStateFromProps. ' +
          'In function components, you can read it directly in the function body, but not ' +
          'inside Hooks like useReducer() or useMemo().',
      );
    }
  }
  return readContextImpl(context);
}

function useContext<T>(context: ReactContext<T>): T {
  if (__DEV__) {
    currentHookNameInDev = 'useContext';
  }
  resolveCurrentlyRenderingComponent();
  return readContextImpl(context);
}

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
<<<<<<< HEAD
  // $FlowFixMe: Flow doesn't like mixed types
=======
  // $FlowFixMe[incompatible-use]: Flow doesn't like mixed types
>>>>>>> remotes/upstream/main
  return typeof action === 'function' ? action(state) : action;
}

export function useState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  if (__DEV__) {
    currentHookNameInDev = 'useState';
  }
  return useReducer(
    basicStateReducer,
    // useReducer has a special case to support lazy useState initializers
    (initialState: any),
  );
}

export function useReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  if (__DEV__) {
    if (reducer !== basicStateReducer) {
      currentHookNameInDev = 'useReducer';
    }
  }
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  if (isReRender) {
    // This is a re-render. Apply the new render phase updates to the previous
    // current hook.
    const queue: UpdateQueue<A> = (workInProgressHook.queue: any);
    const dispatch: Dispatch<A> = (queue.dispatch: any);
    if (renderPhaseUpdates !== null) {
      // Render phase updates are stored in a map of queue -> linked list
      const firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
      if (firstRenderPhaseUpdate !== undefined) {
<<<<<<< HEAD
        renderPhaseUpdates.delete(queue);
        let newState = workInProgressHook.memoizedState;
        let update = firstRenderPhaseUpdate;
=======
        // $FlowFixMe[incompatible-use] found when upgrading Flow
        renderPhaseUpdates.delete(queue);
        // $FlowFixMe[incompatible-use] found when upgrading Flow
        let newState = workInProgressHook.memoizedState;
        let update: Update<any> = firstRenderPhaseUpdate;
>>>>>>> remotes/upstream/main
        do {
          // Process this render phase update. We don't have to check the
          // priority because it will always be the same as the current
          // render's.
          const action = update.action;
          if (__DEV__) {
            isInHookUserCodeInDev = true;
          }
          newState = reducer(newState, action);
          if (__DEV__) {
            isInHookUserCodeInDev = false;
          }
<<<<<<< HEAD
          update = update.next;
        } while (update !== null);

=======
          // $FlowFixMe[incompatible-type] we bail out when we get a null
          update = update.next;
        } while (update !== null);

        // $FlowFixMe[incompatible-use] found when upgrading Flow
>>>>>>> remotes/upstream/main
        workInProgressHook.memoizedState = newState;

        return [newState, dispatch];
      }
    }
<<<<<<< HEAD
=======
    // $FlowFixMe[incompatible-use] found when upgrading Flow
>>>>>>> remotes/upstream/main
    return [workInProgressHook.memoizedState, dispatch];
  } else {
    if (__DEV__) {
      isInHookUserCodeInDev = true;
    }
    let initialState;
    if (reducer === basicStateReducer) {
      // Special case for `useState`.
      initialState =
        typeof initialArg === 'function'
          ? ((initialArg: any): () => S)()
          : ((initialArg: any): S);
    } else {
      initialState =
        init !== undefined ? init(initialArg) : ((initialArg: any): S);
    }
    if (__DEV__) {
      isInHookUserCodeInDev = false;
    }
<<<<<<< HEAD
    workInProgressHook.memoizedState = initialState;
=======
    // $FlowFixMe[incompatible-use] found when upgrading Flow
    workInProgressHook.memoizedState = initialState;
    // $FlowFixMe[incompatible-use] found when upgrading Flow
>>>>>>> remotes/upstream/main
    const queue: UpdateQueue<A> = (workInProgressHook.queue = {
      last: null,
      dispatch: null,
    });
    const dispatch: Dispatch<A> = (queue.dispatch = (dispatchAction.bind(
      null,
      currentlyRenderingComponent,
      queue,
    ): any));
<<<<<<< HEAD
=======
    // $FlowFixMe[incompatible-use] found when upgrading Flow
>>>>>>> remotes/upstream/main
    return [workInProgressHook.memoizedState, dispatch];
  }
}

function useMemo<T>(nextCreate: () => T, deps: Array<mixed> | void | null): T {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();

  const nextDeps = deps === undefined ? null : deps;

  if (workInProgressHook !== null) {
    const prevState = workInProgressHook.memoizedState;
    if (prevState !== null) {
      if (nextDeps !== null) {
        const prevDeps = prevState[1];
        if (areHookInputsEqual(nextDeps, prevDeps)) {
          return prevState[0];
        }
      }
    }
  }

  if (__DEV__) {
    isInHookUserCodeInDev = true;
  }
  const nextValue = nextCreate();
  if (__DEV__) {
    isInHookUserCodeInDev = false;
  }
<<<<<<< HEAD
=======
  // $FlowFixMe[incompatible-use] found when upgrading Flow
>>>>>>> remotes/upstream/main
  workInProgressHook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

function useRef<T>(initialValue: T): {current: T} {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  const previousRef = workInProgressHook.memoizedState;
  if (previousRef === null) {
    const ref = {current: initialValue};
    if (__DEV__) {
      Object.seal(ref);
    }
<<<<<<< HEAD
=======
    // $FlowFixMe[incompatible-use] found when upgrading Flow
>>>>>>> remotes/upstream/main
    workInProgressHook.memoizedState = ref;
    return ref;
  } else {
    return previousRef;
  }
}

<<<<<<< HEAD
export function useLayoutEffect(
  create: () => (() => void) | void,
  inputs: Array<mixed> | void | null,
) {
  if (__DEV__) {
    currentHookNameInDev = 'useLayoutEffect';
    console.error(
      'useLayoutEffect does nothing on the server, because its effect cannot ' +
        "be encoded into the server renderer's output format. This will lead " +
        'to a mismatch between the initial, non-hydrated UI and the intended ' +
        'UI. To avoid this, useLayoutEffect should only be used in ' +
        'components that render exclusively on the client. ' +
        'See https://reactjs.org/link/uselayouteffect-ssr for common fixes.',
    );
  }
}

=======
>>>>>>> remotes/upstream/main
function dispatchAction<A>(
  componentIdentity: Object,
  queue: UpdateQueue<A>,
  action: A,
<<<<<<< HEAD
) {
=======
): void {
>>>>>>> remotes/upstream/main
  if (numberOfReRenders >= RE_RENDER_LIMIT) {
    throw new Error(
      'Too many re-renders. React limits the number of renders to prevent ' +
        'an infinite loop.',
    );
  }

  if (componentIdentity === currentlyRenderingComponent) {
    // This is a render phase update. Stash it in a lazily-created map of
    // queue -> linked list of updates. After this render pass, we'll restart
    // and apply the stashed updates on top of the work-in-progress hook.
    didScheduleRenderPhaseUpdate = true;
    const update: Update<A> = {
      action,
      next: null,
    };
    if (renderPhaseUpdates === null) {
      renderPhaseUpdates = new Map();
    }
    const firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
    if (firstRenderPhaseUpdate === undefined) {
<<<<<<< HEAD
=======
      // $FlowFixMe[incompatible-use] found when upgrading Flow
>>>>>>> remotes/upstream/main
      renderPhaseUpdates.set(queue, update);
    } else {
      // Append the update to the end of the list.
      let lastRenderPhaseUpdate = firstRenderPhaseUpdate;
      while (lastRenderPhaseUpdate.next !== null) {
        lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
      }
      lastRenderPhaseUpdate.next = update;
    }
  } else {
    // This means an update has happened after the function component has
    // returned. On the server this is a no-op. In React Fiber, the update
    // would be scheduled for a future render.
  }
}

export function useCallback<T>(
  callback: T,
  deps: Array<mixed> | void | null,
): T {
  return useMemo(() => callback, deps);
}

<<<<<<< HEAD
// TODO Decide on how to implement this hook for server rendering.
// If a mutation occurs during render, consider triggering a Suspense boundary
// and falling back to client rendering.
function useMutableSource<Source, Snapshot>(
  source: MutableSource<Source>,
  getSnapshot: MutableSourceGetSnapshotFn<Source, Snapshot>,
  subscribe: MutableSourceSubscribeFn<Source, Snapshot>,
): Snapshot {
  resolveCurrentlyRenderingComponent();
  return getSnapshot(source._source);
=======
function throwOnUseEffectEventCall() {
  throw new Error(
    "A function wrapped in useEffectEvent can't be called during rendering.",
  );
}

export function useEffectEvent<Args, Return, F: (...Array<Args>) => Return>(
  callback: F,
): F {
  // $FlowIgnore[incompatible-return]
  return throwOnUseEffectEventCall;
>>>>>>> remotes/upstream/main
}

function useSyncExternalStore<T>(
  subscribe: (() => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T,
): T {
  if (getServerSnapshot === undefined) {
    throw new Error(
      'Missing getServerSnapshot, which is required for ' +
        'server-rendered content. Will revert to client rendering.',
    );
  }
  return getServerSnapshot();
}

<<<<<<< HEAD
function useDeferredValue<T>(value: T): T {
  resolveCurrentlyRenderingComponent();
  return value;
=======
function useDeferredValue<T>(value: T, initialValue?: T): T {
  resolveCurrentlyRenderingComponent();
  if (enableUseDeferredValueInitialArg) {
    return initialValue !== undefined ? initialValue : value;
  } else {
    return value;
  }
>>>>>>> remotes/upstream/main
}

function unsupportedStartTransition() {
  throw new Error('startTransition cannot be called during server rendering.');
}

function useTransition(): [
  boolean,
  (callback: () => void, options?: StartTransitionOptions) => void,
] {
  resolveCurrentlyRenderingComponent();
  return [false, unsupportedStartTransition];
}

<<<<<<< HEAD
=======
function useHostTransitionStatus(): TransitionStatus {
  resolveCurrentlyRenderingComponent();
  return NotPendingTransition;
}

function unsupportedSetOptimisticState() {
  throw new Error('Cannot update optimistic state while rendering.');
}

function useOptimistic<S, A>(
  passthrough: S,
  reducer: ?(S, A) => S,
): [S, (A) => void] {
  resolveCurrentlyRenderingComponent();
  return [passthrough, unsupportedSetOptimisticState];
}

function createPostbackFormStateKey(
  permalink: string | void,
  componentKeyPath: KeyNode | null,
  hookIndex: number,
): string {
  if (permalink !== undefined) {
    // Don't bother to hash a permalink-based key since it's already short.
    return 'p' + permalink;
  } else {
    // Append a node to the key path that represents the form state hook.
    const keyPath: KeyNode = [componentKeyPath, null, hookIndex];
    // Key paths are hashed to reduce the size. It does not need to be secure,
    // and it's more important that it's fast than that it's completely
    // collision-free.
    const keyPathHash = createFastHash(JSON.stringify(keyPath));
    return 'k' + keyPathHash;
  }
}

function useFormState<S, P>(
  action: (S, P) => Promise<S>,
  initialState: S,
  permalink?: string,
): [S, (P) => void] {
  resolveCurrentlyRenderingComponent();

  // Count the number of useFormState hooks per component. We also use this to
  // track the position of this useFormState hook relative to the other ones in
  // this component, so we can generate a unique key for each one.
  const formStateHookIndex = formStateCounter++;
  const request: Request = (currentlyRenderingRequest: any);

  // $FlowIgnore[prop-missing]
  const formAction = action.$$FORM_ACTION;
  if (typeof formAction === 'function') {
    // This is a server action. These have additional features to enable
    // MPA-style form submissions with progressive enhancement.

    // TODO: If the same permalink is passed to multiple useFormStates, and
    // they all have the same action signature, Fizz will pass the postback
    // state to all of them. We should probably only pass it to the first one,
    // and/or warn.

    // The key is lazily generated and deduped so the that the keypath doesn't
    // get JSON.stringify-ed unnecessarily, and at most once.
    let nextPostbackStateKey = null;

    // Determine the current form state. If we received state during an MPA form
    // submission, then we will reuse that, if the action identity matches.
    // Otherwise we'll use the initial state argument. We will emit a comment
    // marker into the stream that indicates whether the state was reused.
    let state = initialState;
    const componentKeyPath = (currentlyRenderingKeyPath: any);
    const postbackFormState = getFormState(request);
    // $FlowIgnore[prop-missing]
    const isSignatureEqual = action.$$IS_SIGNATURE_EQUAL;
    if (postbackFormState !== null && typeof isSignatureEqual === 'function') {
      const postbackKey = postbackFormState[1];
      const postbackReferenceId = postbackFormState[2];
      const postbackBoundArity = postbackFormState[3];
      if (
        isSignatureEqual.call(action, postbackReferenceId, postbackBoundArity)
      ) {
        nextPostbackStateKey = createPostbackFormStateKey(
          permalink,
          componentKeyPath,
          formStateHookIndex,
        );
        if (postbackKey === nextPostbackStateKey) {
          // This was a match
          formStateMatchingIndex = formStateHookIndex;
          // Reuse the state that was submitted by the form.
          state = postbackFormState[0];
        }
      }
    }

    // Bind the state to the first argument of the action.
    const boundAction = action.bind(null, state);

    // Wrap the action so the return value is void.
    const dispatch = (payload: P): void => {
      boundAction(payload);
    };

    // $FlowIgnore[prop-missing]
    if (typeof boundAction.$$FORM_ACTION === 'function') {
      // $FlowIgnore[prop-missing]
      dispatch.$$FORM_ACTION = (prefix: string) => {
        const metadata: ReactCustomFormAction =
          boundAction.$$FORM_ACTION(prefix);

        // Override the action URL
        if (permalink !== undefined) {
          if (__DEV__) {
            checkAttributeStringCoercion(permalink, 'target');
          }
          permalink += '';
          metadata.action = permalink;
        }

        const formData = metadata.data;
        if (formData) {
          if (nextPostbackStateKey === null) {
            nextPostbackStateKey = createPostbackFormStateKey(
              permalink,
              componentKeyPath,
              formStateHookIndex,
            );
          }
          formData.append('$ACTION_KEY', nextPostbackStateKey);
        }
        return metadata;
      };
    }

    return [state, dispatch];
  } else {
    // This is not a server action, so the implementation is much simpler.

    // Bind the state to the first argument of the action.
    const boundAction = action.bind(null, initialState);
    // Wrap the action so the return value is void.
    const dispatch = (payload: P): void => {
      boundAction(payload);
    };
    return [initialState, dispatch];
  }
}

>>>>>>> remotes/upstream/main
function useId(): string {
  const task: Task = (currentlyRenderingTask: any);
  const treeId = getTreeId(task.treeContext);

<<<<<<< HEAD
  const responseState = currentResponseState;
  if (responseState === null) {
=======
  const resumableState = currentResumableState;
  if (resumableState === null) {
>>>>>>> remotes/upstream/main
    throw new Error(
      'Invalid hook call. Hooks can only be called inside of the body of a function component.',
    );
  }

  const localId = localIdCounter++;
<<<<<<< HEAD
  return makeId(responseState, treeId, localId);
=======
  return makeId(resumableState, treeId, localId);
>>>>>>> remotes/upstream/main
}

function use<T>(usable: Usable<T>): T {
  if (usable !== null && typeof usable === 'object') {
<<<<<<< HEAD
    if (typeof usable.then === 'function') {
      // This is a thenable.
      const thenable: Thenable<T> = (usable: any);

      // Track the position of the thenable within this fiber.
      const index = thenableIndexCounter;
      thenableIndexCounter += 1;

      switch (thenable.status) {
        case 'fulfilled': {
          const fulfilledValue: T = thenable.value;
          return fulfilledValue;
        }
        case 'rejected': {
          const rejectedError = thenable.reason;
          throw rejectedError;
        }
        default: {
          const prevThenableAtIndex: Thenable<T> | null = getPreviouslyUsedThenableAtIndex(
            thenableState,
            index,
          );
          if (prevThenableAtIndex !== null) {
            switch (prevThenableAtIndex.status) {
              case 'fulfilled': {
                const fulfilledValue: T = prevThenableAtIndex.value;
                return fulfilledValue;
              }
              case 'rejected': {
                const rejectedError: mixed = prevThenableAtIndex.reason;
                throw rejectedError;
              }
              default: {
                // The thenable still hasn't resolved. Suspend with the same
                // thenable as last time to avoid redundant listeners.
                throw prevThenableAtIndex;
              }
            }
          } else {
            // This is the first time something has been used at this index.
            // Stash the thenable at the current index so we can reuse it during
            // the next attempt.
            if (thenableState === null) {
              thenableState = createThenableState();
            }
            trackUsedThenable(thenableState, thenable, index);

            // Suspend.
            // TODO: Throwing here is an implementation detail that allows us to
            // unwind the call stack. But we shouldn't allow it to leak into
            // userspace. Throw an opaque placeholder value instead of the
            // actual thenable. If it doesn't get captured by the work loop, log
            // a warning, because that means something in userspace must have
            // caught it.
            throw thenable;
          }
        }
      }
=======
    // $FlowFixMe[method-unbinding]
    if (typeof usable.then === 'function') {
      // This is a thenable.
      const thenable: Thenable<T> = (usable: any);
      return unwrapThenable(thenable);
>>>>>>> remotes/upstream/main
    } else if (
      usable.$$typeof === REACT_CONTEXT_TYPE ||
      usable.$$typeof === REACT_SERVER_CONTEXT_TYPE
    ) {
      const context: ReactContext<T> = (usable: any);
      return readContext(context);
    }
  }

  // eslint-disable-next-line react-internal/safe-string-coercion
  throw new Error('An unsupported type was passed to use(): ' + String(usable));
}

<<<<<<< HEAD
=======
export function unwrapThenable<T>(thenable: Thenable<T>): T {
  const index = thenableIndexCounter;
  thenableIndexCounter += 1;
  if (thenableState === null) {
    thenableState = createThenableState();
  }
  return trackUsedThenable(thenableState, thenable, index);
}

>>>>>>> remotes/upstream/main
function unsupportedRefresh() {
  throw new Error('Cache cannot be refreshed during server rendering.');
}

function useCacheRefresh(): <T>(?() => T, ?T) => void {
  return unsupportedRefresh;
}

function useMemoCache(size: number): Array<any> {
<<<<<<< HEAD
  return new Array(size);
=======
  const data = new Array<any>(size);
  for (let i = 0; i < size; i++) {
    data[i] = REACT_MEMO_CACHE_SENTINEL;
  }
  return data;
>>>>>>> remotes/upstream/main
}

function noop(): void {}

<<<<<<< HEAD
export const Dispatcher: DispatcherType = {
  readContext,
=======
export const HooksDispatcher: Dispatcher = {
  readContext,
  use,
>>>>>>> remotes/upstream/main
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
  useInsertionEffect: noop,
<<<<<<< HEAD
  useLayoutEffect,
=======
  useLayoutEffect: noop,
>>>>>>> remotes/upstream/main
  useCallback,
  // useImperativeHandle is not run in the server environment
  useImperativeHandle: noop,
  // Effects are not run in the server environment.
  useEffect: noop,
  // Debugging effect
  useDebugValue: noop,
  useDeferredValue,
  useTransition,
  useId,
  // Subscriptions are not setup in a server environment.
<<<<<<< HEAD
  useMutableSource,
=======
>>>>>>> remotes/upstream/main
  useSyncExternalStore,
};

if (enableCache) {
<<<<<<< HEAD
  Dispatcher.getCacheForType = getCacheForType;
  Dispatcher.useCacheRefresh = useCacheRefresh;
}
if (enableUseMemoCacheHook) {
  Dispatcher.useMemoCache = useMemoCache;
}
if (enableUseHook) {
  Dispatcher.use = use;
}

export let currentResponseState: null | ResponseState = (null: any);
export function setCurrentResponseState(
  responseState: null | ResponseState,
): void {
  currentResponseState = responseState;
=======
  HooksDispatcher.useCacheRefresh = useCacheRefresh;
}
if (enableUseEffectEventHook) {
  HooksDispatcher.useEffectEvent = useEffectEvent;
}
if (enableUseMemoCacheHook) {
  HooksDispatcher.useMemoCache = useMemoCache;
}
if (enableFormActions && enableAsyncActions) {
  HooksDispatcher.useHostTransitionStatus = useHostTransitionStatus;
}
if (enableAsyncActions) {
  HooksDispatcher.useOptimistic = useOptimistic;
  HooksDispatcher.useFormState = useFormState;
}

export let currentResumableState: null | ResumableState = (null: any);
export function setCurrentResumableState(
  resumableState: null | ResumableState,
): void {
  currentResumableState = resumableState;
>>>>>>> remotes/upstream/main
}
