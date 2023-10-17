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
import type {
  Destination,
  Chunk,
  BundlerConfig,
  ModuleMetaData,
  ModuleReference,
  ModuleKey,
} from './ReactFlightServerConfig';
import type {ContextSnapshot} from './ReactFlightNewContext';
import type {ThenableState} from './ReactFlightWakeable';
=======
import type {Chunk, BinaryChunk, Destination} from './ReactServerStreamConfig';

import type {Postpone} from 'react/src/ReactPostpone';

import {
  enableBinaryFlight,
  enablePostpone,
  enableTaint,
} from 'shared/ReactFeatureFlags';

import {
  scheduleWork,
  flushBuffered,
  beginWriting,
  writeChunkAndReturn,
  stringToChunk,
  typedArrayToBinaryChunk,
  byteLengthOfChunk,
  byteLengthOfBinaryChunk,
  completeWriting,
  close,
  closeWithError,
} from './ReactServerStreamConfig';

export type {Destination, Chunk} from './ReactServerStreamConfig';

import type {
  ClientManifest,
  ClientReferenceMetadata,
  ClientReference,
  ClientReferenceKey,
  ServerReference,
  ServerReferenceId,
  Hints,
  HintCode,
  HintModel,
} from './ReactFlightServerConfig';
import type {ContextSnapshot} from './ReactFlightNewContext';
import type {ThenableState} from './ReactFlightThenable';
>>>>>>> remotes/upstream/main
import type {
  ReactProviderType,
  ServerContextJSONValue,
  Wakeable,
<<<<<<< HEAD
} from 'shared/ReactTypes';

import {
  scheduleWork,
  beginWriting,
  writeChunkAndReturn,
  completeWriting,
  flushBuffered,
  close,
  closeWithError,
  processModelChunk,
  processModuleChunk,
  processProviderChunk,
  processSymbolChunk,
  processErrorChunk,
  processReferenceChunk,
  resolveModuleMetaData,
  getModuleKey,
  isModuleReference,
} from './ReactFlightServerConfig';

import {
  Dispatcher,
  getCurrentCache,
=======
  Thenable,
  PendingThenable,
  FulfilledThenable,
  RejectedThenable,
  ReactServerContext,
} from 'shared/ReactTypes';
import type {LazyComponent} from 'react/src/ReactLazy';

import {
  resolveClientReferenceMetadata,
  getServerReferenceId,
  getServerReferenceBoundArguments,
  getClientReferenceKey,
  isClientReference,
  isServerReference,
  supportsRequestStorage,
  requestStorage,
  prepareHostDispatcher,
  createHints,
} from './ReactFlightServerConfig';

import {
  HooksDispatcher,
>>>>>>> remotes/upstream/main
  prepareToUseHooksForRequest,
  prepareToUseHooksForComponent,
  getThenableStateAfterSuspending,
  resetHooksForRequest,
<<<<<<< HEAD
  setCurrentCache,
} from './ReactFlightHooks';
=======
} from './ReactFlightHooks';
import {DefaultCacheDispatcher} from './flight/ReactFlightServerCache';
>>>>>>> remotes/upstream/main
import {
  pushProvider,
  popProvider,
  switchContext,
  getActiveContext,
  rootContextSnapshot,
} from './ReactFlightNewContext';
<<<<<<< HEAD
import {trackSuspendedWakeable} from './ReactFlightWakeable';

import {
=======

import {
  getIteratorFn,
>>>>>>> remotes/upstream/main
  REACT_ELEMENT_TYPE,
  REACT_FORWARD_REF_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_LAZY_TYPE,
  REACT_MEMO_TYPE,
<<<<<<< HEAD
  REACT_PROVIDER_TYPE,
} from 'shared/ReactSymbols';

import {getOrCreateServerContext} from 'shared/ReactServerContextRegistry';
import ReactSharedInternals from 'shared/ReactSharedInternals';
import isArray from 'shared/isArray';
=======
  REACT_POSTPONE_TYPE,
  REACT_PROVIDER_TYPE,
} from 'shared/ReactSymbols';

import {
  describeValueForErrorMessage,
  describeObjectForErrorMessage,
  isSimpleObject,
  jsxPropsParents,
  jsxChildrenParents,
  objectName,
} from 'shared/ReactSerializationErrors';

import {getOrCreateServerContext} from 'shared/ReactServerContextRegistry';
import ReactSharedInternals from 'shared/ReactSharedInternals';
import ReactServerSharedInternals from './ReactServerSharedInternals';
import isArray from 'shared/isArray';
import getPrototypeOf from 'shared/getPrototypeOf';
import binaryToComparableString from 'shared/binaryToComparableString';

import {SuspenseException, getSuspendedThenable} from './ReactFlightThenable';

const ObjectPrototype = Object.prototype;

type JSONValue =
  | string
  | boolean
  | number
  | null
  | {+[key: string]: JSONValue}
  | $ReadOnlyArray<JSONValue>;

const stringify = JSON.stringify;
>>>>>>> remotes/upstream/main

type ReactJSONValue =
  | string
  | boolean
  | number
  | null
  | $ReadOnlyArray<ReactJSONValue>
<<<<<<< HEAD
  | ReactModelObject;

export type ReactModel =
  | React$Element<any>
=======
  | ReactClientObject;

// Serializable values
export type ReactClientValue =
  // Server Elements and Lazy Components are unwrapped on the Server
  | React$Element<React$AbstractComponent<any, any>>
  | LazyComponent<ReactClientValue, any>
  // References are passed by their value
  | ClientReference<any>
  | ServerReference<any>
  // The rest are passed as is. Sub-types can be passed in but lose their
  // subtype, so the receiver can only accept once of these.
  | React$Element<string>
  | React$Element<ClientReference<any> & any>
  | ReactServerContext<any>
>>>>>>> remotes/upstream/main
  | string
  | boolean
  | number
  | symbol
  | null
<<<<<<< HEAD
  | Iterable<ReactModel>
  | ReactModelObject;

type ReactModelObject = {+[key: string]: ReactModel};
=======
  | void
  | bigint
  | Iterable<ReactClientValue>
  | Array<ReactClientValue>
  | Map<ReactClientValue, ReactClientValue>
  | Set<ReactClientValue>
  | Date
  | ReactClientObject
  | Promise<ReactClientValue>; // Thenable<ReactClientValue>

type ReactClientObject = {+[key: string]: ReactClientValue};
>>>>>>> remotes/upstream/main

const PENDING = 0;
const COMPLETED = 1;
const ABORTED = 3;
const ERRORED = 4;

type Task = {
  id: number,
  status: 0 | 1 | 3 | 4,
<<<<<<< HEAD
  model: ReactModel,
=======
  model: ReactClientValue,
>>>>>>> remotes/upstream/main
  ping: () => void,
  context: ContextSnapshot,
  thenableState: ThenableState | null,
};

export type Request = {
  status: 0 | 1 | 2,
<<<<<<< HEAD
  fatalError: mixed,
  destination: null | Destination,
  bundlerConfig: BundlerConfig,
  cache: Map<Function, mixed>,
  nextChunkId: number,
  pendingChunks: number,
  abortableTasks: Set<Task>,
  pingedTasks: Array<Task>,
  completedModuleChunks: Array<Chunk>,
  completedJSONChunks: Array<Chunk>,
  completedErrorChunks: Array<Chunk>,
  writtenSymbols: Map<symbol, number>,
  writtenModules: Map<ModuleKey, number>,
  writtenProviders: Map<string, number>,
  identifierPrefix: string,
  identifierCount: number,
  onError: (error: mixed) => void,
  toJSON: (key: string, value: ReactModel) => ReactJSONValue,
};

const ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;

=======
  flushScheduled: boolean,
  fatalError: mixed,
  destination: null | Destination,
  bundlerConfig: ClientManifest,
  cache: Map<Function, mixed>,
  nextChunkId: number,
  pendingChunks: number,
  hints: Hints,
  abortableTasks: Set<Task>,
  pingedTasks: Array<Task>,
  completedImportChunks: Array<Chunk>,
  completedHintChunks: Array<Chunk>,
  completedRegularChunks: Array<Chunk | BinaryChunk>,
  completedErrorChunks: Array<Chunk>,
  writtenSymbols: Map<symbol, number>,
  writtenClientReferences: Map<ClientReferenceKey, number>,
  writtenServerReferences: Map<ServerReference<any>, number>,
  writtenProviders: Map<string, number>,
  identifierPrefix: string,
  identifierCount: number,
  taintCleanupQueue: Array<string | bigint>,
  onError: (error: mixed) => ?string,
  onPostpone: (reason: string) => void,
  toJSON: (key: string, value: ReactClientValue) => ReactJSONValue,
};

const {
  TaintRegistryObjects,
  TaintRegistryValues,
  TaintRegistryByteLengths,
  TaintRegistryPendingRequests,
  ReactCurrentCache,
} = ReactServerSharedInternals;
const ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;

function throwTaintViolation(message: string) {
  // eslint-disable-next-line react-internal/prod-error-codes
  throw new Error(message);
}

function cleanupTaintQueue(request: Request): void {
  const cleanupQueue = request.taintCleanupQueue;
  TaintRegistryPendingRequests.delete(cleanupQueue);
  for (let i = 0; i < cleanupQueue.length; i++) {
    const entryValue = cleanupQueue[i];
    const entry = TaintRegistryValues.get(entryValue);
    if (entry !== undefined) {
      if (entry.count === 1) {
        TaintRegistryValues.delete(entryValue);
      } else {
        entry.count--;
      }
    }
  }
  cleanupQueue.length = 0;
}

>>>>>>> remotes/upstream/main
function defaultErrorHandler(error: mixed) {
  console['error'](error);
  // Don't transform to our wrapper
}

<<<<<<< HEAD
=======
function defaultPostponeHandler(reason: string) {
  // Noop
}

>>>>>>> remotes/upstream/main
const OPEN = 0;
const CLOSING = 1;
const CLOSED = 2;

export function createRequest(
<<<<<<< HEAD
  model: ReactModel,
  bundlerConfig: BundlerConfig,
  onError: void | ((error: mixed) => void),
  context?: Array<[string, ServerContextJSONValue]>,
  identifierPrefix?: string,
): Request {
  const abortSet: Set<Task> = new Set();
  const pingedTasks = [];
  const request = {
    status: OPEN,
=======
  model: ReactClientValue,
  bundlerConfig: ClientManifest,
  onError: void | ((error: mixed) => ?string),
  context?: Array<[string, ServerContextJSONValue]>,
  identifierPrefix?: string,
  onPostpone: void | ((reason: string) => void),
): Request {
  if (
    ReactCurrentCache.current !== null &&
    ReactCurrentCache.current !== DefaultCacheDispatcher
  ) {
    throw new Error(
      'Currently React only supports one RSC renderer at a time.',
    );
  }
  prepareHostDispatcher();
  ReactCurrentCache.current = DefaultCacheDispatcher;

  const abortSet: Set<Task> = new Set();
  const pingedTasks: Array<Task> = [];
  const cleanupQueue: Array<string | bigint> = [];
  if (enableTaint) {
    TaintRegistryPendingRequests.add(cleanupQueue);
  }
  const hints = createHints();
  const request: Request = {
    status: OPEN,
    flushScheduled: false,
>>>>>>> remotes/upstream/main
    fatalError: null,
    destination: null,
    bundlerConfig,
    cache: new Map(),
    nextChunkId: 0,
    pendingChunks: 0,
<<<<<<< HEAD
    abortableTasks: abortSet,
    pingedTasks: pingedTasks,
    completedModuleChunks: [],
    completedJSONChunks: [],
    completedErrorChunks: [],
    writtenSymbols: new Map(),
    writtenModules: new Map(),
    writtenProviders: new Map(),
    identifierPrefix: identifierPrefix || '',
    identifierCount: 1,
    onError: onError === undefined ? defaultErrorHandler : onError,
    toJSON: function(key: string, value: ReactModel): ReactJSONValue {
=======
    hints,
    abortableTasks: abortSet,
    pingedTasks: pingedTasks,
    completedImportChunks: ([]: Array<Chunk>),
    completedHintChunks: ([]: Array<Chunk>),
    completedRegularChunks: ([]: Array<Chunk | BinaryChunk>),
    completedErrorChunks: ([]: Array<Chunk>),
    writtenSymbols: new Map(),
    writtenClientReferences: new Map(),
    writtenServerReferences: new Map(),
    writtenProviders: new Map(),
    identifierPrefix: identifierPrefix || '',
    identifierCount: 1,
    taintCleanupQueue: cleanupQueue,
    onError: onError === undefined ? defaultErrorHandler : onError,
    onPostpone: onPostpone === undefined ? defaultPostponeHandler : onPostpone,
    // $FlowFixMe[missing-this-annot]
    toJSON: function (key: string, value: ReactClientValue): ReactJSONValue {
>>>>>>> remotes/upstream/main
      return resolveModelToJSON(request, this, key, value);
    },
  };
  request.pendingChunks++;
  const rootContext = createRootContext(context);
  const rootTask = createTask(request, model, rootContext, abortSet);
  pingedTasks.push(rootTask);
  return request;
}

<<<<<<< HEAD
=======
let currentRequest: null | Request = null;

export function resolveRequest(): null | Request {
  if (currentRequest) return currentRequest;
  if (supportsRequestStorage) {
    const store = requestStorage.getStore();
    if (store) return store;
  }
  return null;
}

>>>>>>> remotes/upstream/main
function createRootContext(
  reqContext?: Array<[string, ServerContextJSONValue]>,
) {
  return importServerContexts(reqContext);
}

const POP = {};

<<<<<<< HEAD
function attemptResolveElement(
=======
function serializeThenable(request: Request, thenable: Thenable<any>): number {
  request.pendingChunks++;
  const newTask = createTask(
    request,
    null,
    getActiveContext(),
    request.abortableTasks,
  );

  switch (thenable.status) {
    case 'fulfilled': {
      // We have the resolved value, we can go ahead and schedule it for serialization.
      newTask.model = thenable.value;
      pingTask(request, newTask);
      return newTask.id;
    }
    case 'rejected': {
      const x = thenable.reason;
      if (
        enablePostpone &&
        typeof x === 'object' &&
        x !== null &&
        (x: any).$$typeof === REACT_POSTPONE_TYPE
      ) {
        const postponeInstance: Postpone = (x: any);
        logPostpone(request, postponeInstance.message);
        emitPostponeChunk(request, newTask.id, postponeInstance);
      } else {
        const digest = logRecoverableError(request, x);
        emitErrorChunk(request, newTask.id, digest, x);
      }
      return newTask.id;
    }
    default: {
      if (typeof thenable.status === 'string') {
        // Only instrument the thenable if the status if not defined. If
        // it's defined, but an unknown value, assume it's been instrumented by
        // some custom userspace implementation. We treat it as "pending".
        break;
      }
      const pendingThenable: PendingThenable<mixed> = (thenable: any);
      pendingThenable.status = 'pending';
      pendingThenable.then(
        fulfilledValue => {
          if (thenable.status === 'pending') {
            const fulfilledThenable: FulfilledThenable<mixed> = (thenable: any);
            fulfilledThenable.status = 'fulfilled';
            fulfilledThenable.value = fulfilledValue;
          }
        },
        (error: mixed) => {
          if (thenable.status === 'pending') {
            const rejectedThenable: RejectedThenable<mixed> = (thenable: any);
            rejectedThenable.status = 'rejected';
            rejectedThenable.reason = error;
          }
        },
      );
      break;
    }
  }

  thenable.then(
    value => {
      newTask.model = value;
      pingTask(request, newTask);
    },
    reason => {
      newTask.status = ERRORED;
      request.abortableTasks.delete(newTask);
      // TODO: We should ideally do this inside performWork so it's scheduled
      const digest = logRecoverableError(request, reason);
      emitErrorChunk(request, newTask.id, digest, reason);
      if (request.destination !== null) {
        flushCompletedChunks(request, request.destination);
      }
    },
  );

  return newTask.id;
}

export function emitHint<Code: HintCode>(
  request: Request,
  code: Code,
  model: HintModel<Code>,
): void {
  emitHintChunk(request, code, model);
  enqueueFlush(request);
}

export function getHints(request: Request): Hints {
  return request.hints;
}

export function getCache(request: Request): Map<Function, mixed> {
  return request.cache;
}

function readThenable<T>(thenable: Thenable<T>): T {
  if (thenable.status === 'fulfilled') {
    return thenable.value;
  } else if (thenable.status === 'rejected') {
    throw thenable.reason;
  }
  throw thenable;
}

function createLazyWrapperAroundWakeable(wakeable: Wakeable) {
  // This is a temporary fork of the `use` implementation until we accept
  // promises everywhere.
  const thenable: Thenable<mixed> = (wakeable: any);
  switch (thenable.status) {
    case 'fulfilled':
    case 'rejected':
      break;
    default: {
      if (typeof thenable.status === 'string') {
        // Only instrument the thenable if the status if not defined. If
        // it's defined, but an unknown value, assume it's been instrumented by
        // some custom userspace implementation. We treat it as "pending".
        break;
      }
      const pendingThenable: PendingThenable<mixed> = (thenable: any);
      pendingThenable.status = 'pending';
      pendingThenable.then(
        fulfilledValue => {
          if (thenable.status === 'pending') {
            const fulfilledThenable: FulfilledThenable<mixed> = (thenable: any);
            fulfilledThenable.status = 'fulfilled';
            fulfilledThenable.value = fulfilledValue;
          }
        },
        (error: mixed) => {
          if (thenable.status === 'pending') {
            const rejectedThenable: RejectedThenable<mixed> = (thenable: any);
            rejectedThenable.status = 'rejected';
            rejectedThenable.reason = error;
          }
        },
      );
      break;
    }
  }
  const lazyType: LazyComponent<any, Thenable<any>> = {
    $$typeof: REACT_LAZY_TYPE,
    _payload: thenable,
    _init: readThenable,
  };
  return lazyType;
}

function attemptResolveElement(
  request: Request,
>>>>>>> remotes/upstream/main
  type: any,
  key: null | React$Key,
  ref: mixed,
  props: any,
  prevThenableState: ThenableState | null,
<<<<<<< HEAD
): ReactModel {
=======
): ReactClientValue {
>>>>>>> remotes/upstream/main
  if (ref !== null && ref !== undefined) {
    // When the ref moves to the regular props object this will implicitly
    // throw for functions. We could probably relax it to a DEV warning for other
    // cases.
    throw new Error(
<<<<<<< HEAD
      'Refs cannot be used in server components, nor passed to client components.',
    );
  }
  if (typeof type === 'function') {
    if (isModuleReference(type)) {
      // This is a reference to a client component.
=======
      'Refs cannot be used in Server Components, nor passed to Client Components.',
    );
  }
  if (__DEV__) {
    jsxPropsParents.set(props, type);
    if (typeof props.children === 'object' && props.children !== null) {
      jsxChildrenParents.set(props.children, type);
    }
  }
  if (typeof type === 'function') {
    if (isClientReference(type)) {
      // This is a reference to a Client Component.
>>>>>>> remotes/upstream/main
      return [REACT_ELEMENT_TYPE, type, key, props];
    }
    // This is a server-side component.
    prepareToUseHooksForComponent(prevThenableState);
<<<<<<< HEAD
    return type(props);
=======
    const result = type(props);
    if (
      typeof result === 'object' &&
      result !== null &&
      typeof result.then === 'function'
    ) {
      // When the return value is in children position we can resolve it immediately,
      // to its value without a wrapper if it's synchronously available.
      const thenable: Thenable<any> = result;
      if (thenable.status === 'fulfilled') {
        return thenable.value;
      }
      // TODO: Once we accept Promises as children on the client, we can just return
      // the thenable here.
      return createLazyWrapperAroundWakeable(result);
    }
    return result;
>>>>>>> remotes/upstream/main
  } else if (typeof type === 'string') {
    // This is a host element. E.g. HTML.
    return [REACT_ELEMENT_TYPE, type, key, props];
  } else if (typeof type === 'symbol') {
    if (type === REACT_FRAGMENT_TYPE) {
      // For key-less fragments, we add a small optimization to avoid serializing
      // it as a wrapper.
      // TODO: If a key is specified, we should propagate its key to any children.
<<<<<<< HEAD
      // Same as if a server component has a key.
=======
      // Same as if a Server Component has a key.
>>>>>>> remotes/upstream/main
      return props.children;
    }
    // This might be a built-in React component. We'll let the client decide.
    // Any built-in works as long as its props are serializable.
    return [REACT_ELEMENT_TYPE, type, key, props];
  } else if (type != null && typeof type === 'object') {
<<<<<<< HEAD
    if (isModuleReference(type)) {
      // This is a reference to a client component.
=======
    if (isClientReference(type)) {
      // This is a reference to a Client Component.
>>>>>>> remotes/upstream/main
      return [REACT_ELEMENT_TYPE, type, key, props];
    }
    switch (type.$$typeof) {
      case REACT_LAZY_TYPE: {
        const payload = type._payload;
        const init = type._init;
        const wrappedType = init(payload);
        return attemptResolveElement(
<<<<<<< HEAD
=======
          request,
>>>>>>> remotes/upstream/main
          wrappedType,
          key,
          ref,
          props,
          prevThenableState,
        );
      }
      case REACT_FORWARD_REF_TYPE: {
        const render = type.render;
        prepareToUseHooksForComponent(prevThenableState);
        return render(props, undefined);
      }
      case REACT_MEMO_TYPE: {
        return attemptResolveElement(
<<<<<<< HEAD
=======
          request,
>>>>>>> remotes/upstream/main
          type.type,
          key,
          ref,
          props,
          prevThenableState,
        );
      }
      case REACT_PROVIDER_TYPE: {
        pushProvider(type._context, props.value);
        if (__DEV__) {
          const extraKeys = Object.keys(props).filter(value => {
            if (value === 'children' || value === 'value') {
              return false;
            }
            return true;
          });
          if (extraKeys.length !== 0) {
            console.error(
              'ServerContext can only have a value prop and children. Found: %s',
              JSON.stringify(extraKeys),
            );
          }
        }
<<<<<<< HEAD
        // $FlowFixMe issue discovered when updating Flow
=======
>>>>>>> remotes/upstream/main
        return [
          REACT_ELEMENT_TYPE,
          type,
          key,
          // Rely on __popProvider being serialized last to pop the provider.
          {value: props.value, children: props.children, __pop: POP},
        ];
      }
    }
  }
  throw new Error(
<<<<<<< HEAD
    `Unsupported server component type: ${describeValueForErrorMessage(type)}`,
=======
    `Unsupported Server Component type: ${describeValueForErrorMessage(type)}`,
>>>>>>> remotes/upstream/main
  );
}

function pingTask(request: Request, task: Task): void {
  const pingedTasks = request.pingedTasks;
  pingedTasks.push(task);
  if (pingedTasks.length === 1) {
<<<<<<< HEAD
=======
    request.flushScheduled = request.destination !== null;
>>>>>>> remotes/upstream/main
    scheduleWork(() => performWork(request));
  }
}

function createTask(
  request: Request,
<<<<<<< HEAD
  model: ReactModel,
=======
  model: ReactClientValue,
>>>>>>> remotes/upstream/main
  context: ContextSnapshot,
  abortSet: Set<Task>,
): Task {
  const id = request.nextChunkId++;
<<<<<<< HEAD
  const task = {
=======
  const task: Task = {
>>>>>>> remotes/upstream/main
    id,
    status: PENDING,
    model,
    context,
    ping: () => pingTask(request, task),
    thenableState: null,
  };
  abortSet.add(task);
  return task;
}

function serializeByValueID(id: number): string {
  return '$' + id.toString(16);
}

<<<<<<< HEAD
function serializeByRefID(id: number): string {
  return '@' + id.toString(16);
}

function serializeModuleReference(
  request: Request,
  parent: {+[key: string | number]: ReactModel} | $ReadOnlyArray<ReactModel>,
  key: string,
  moduleReference: ModuleReference<any>,
): string {
  const moduleKey: ModuleKey = getModuleKey(moduleReference);
  const writtenModules = request.writtenModules;
  const existingId = writtenModules.get(moduleKey);
=======
function serializeLazyID(id: number): string {
  return '$L' + id.toString(16);
}

function serializePromiseID(id: number): string {
  return '$@' + id.toString(16);
}

function serializeServerReferenceID(id: number): string {
  return '$F' + id.toString(16);
}

function serializeSymbolReference(name: string): string {
  return '$S' + name;
}

function serializeProviderReference(name: string): string {
  return '$P' + name;
}

function serializeNumber(number: number): string | number {
  if (Number.isFinite(number)) {
    if (number === 0 && 1 / number === -Infinity) {
      return '$-0';
    } else {
      return number;
    }
  } else {
    if (number === Infinity) {
      return '$Infinity';
    } else if (number === -Infinity) {
      return '$-Infinity';
    } else {
      return '$NaN';
    }
  }
}

function serializeUndefined(): string {
  return '$undefined';
}

function serializeDateFromDateJSON(dateJSON: string): string {
  // JSON.stringify automatically calls Date.prototype.toJSON which calls toISOString.
  // We need only tack on a $D prefix.
  return '$D' + dateJSON;
}

function serializeBigInt(n: bigint): string {
  return '$n' + n.toString(10);
}

function serializeRowHeader(tag: string, id: number) {
  return id.toString(16) + ':' + tag;
}

function encodeReferenceChunk(
  request: Request,
  id: number,
  reference: string,
): Chunk {
  const json = stringify(reference);
  const row = id.toString(16) + ':' + json + '\n';
  return stringToChunk(row);
}

function serializeClientReference(
  request: Request,
  parent:
    | {+[key: string | number]: ReactClientValue}
    | $ReadOnlyArray<ReactClientValue>,
  key: string,
  clientReference: ClientReference<any>,
): string {
  const clientReferenceKey: ClientReferenceKey =
    getClientReferenceKey(clientReference);
  const writtenClientReferences = request.writtenClientReferences;
  const existingId = writtenClientReferences.get(clientReferenceKey);
>>>>>>> remotes/upstream/main
  if (existingId !== undefined) {
    if (parent[0] === REACT_ELEMENT_TYPE && key === '1') {
      // If we're encoding the "type" of an element, we can refer
      // to that by a lazy reference instead of directly since React
      // knows how to deal with lazy values. This lets us suspend
      // on this component rather than its parent until the code has
      // loaded.
<<<<<<< HEAD
      return serializeByRefID(existingId);
=======
      return serializeLazyID(existingId);
>>>>>>> remotes/upstream/main
    }
    return serializeByValueID(existingId);
  }
  try {
<<<<<<< HEAD
    const moduleMetaData: ModuleMetaData = resolveModuleMetaData(
      request.bundlerConfig,
      moduleReference,
    );
    request.pendingChunks++;
    const moduleId = request.nextChunkId++;
    emitModuleChunk(request, moduleId, moduleMetaData);
    writtenModules.set(moduleKey, moduleId);
=======
    const clientReferenceMetadata: ClientReferenceMetadata =
      resolveClientReferenceMetadata(request.bundlerConfig, clientReference);
    request.pendingChunks++;
    const importId = request.nextChunkId++;
    emitImportChunk(request, importId, clientReferenceMetadata);
    writtenClientReferences.set(clientReferenceKey, importId);
>>>>>>> remotes/upstream/main
    if (parent[0] === REACT_ELEMENT_TYPE && key === '1') {
      // If we're encoding the "type" of an element, we can refer
      // to that by a lazy reference instead of directly since React
      // knows how to deal with lazy values. This lets us suspend
      // on this component rather than its parent until the code has
      // loaded.
<<<<<<< HEAD
      return serializeByRefID(moduleId);
    }
    return serializeByValueID(moduleId);
  } catch (x) {
    request.pendingChunks++;
    const errorId = request.nextChunkId++;
    emitErrorChunk(request, errorId, x);
=======
      return serializeLazyID(importId);
    }
    return serializeByValueID(importId);
  } catch (x) {
    request.pendingChunks++;
    const errorId = request.nextChunkId++;
    const digest = logRecoverableError(request, x);
    emitErrorChunk(request, errorId, digest, x);
>>>>>>> remotes/upstream/main
    return serializeByValueID(errorId);
  }
}

<<<<<<< HEAD
function escapeStringValue(value: string): string {
  if (value[0] === '$' || value[0] === '@') {
    // We need to escape $ or @ prefixed strings since we use those to encode
=======
function outlineModel(request: Request, value: any): number {
  request.pendingChunks++;
  const outlinedId = request.nextChunkId++;
  // We assume that this object doesn't suspend, but a child might.
  emitModelChunk(request, outlinedId, value);
  return outlinedId;
}

function serializeServerReference(
  request: Request,
  parent:
    | {+[key: string | number]: ReactClientValue}
    | $ReadOnlyArray<ReactClientValue>,
  key: string,
  serverReference: ServerReference<any>,
): string {
  const writtenServerReferences = request.writtenServerReferences;
  const existingId = writtenServerReferences.get(serverReference);
  if (existingId !== undefined) {
    return serializeServerReferenceID(existingId);
  }

  const bound: null | Array<any> = getServerReferenceBoundArguments(
    request.bundlerConfig,
    serverReference,
  );
  const serverReferenceMetadata: {
    id: ServerReferenceId,
    bound: null | Promise<Array<any>>,
  } = {
    id: getServerReferenceId(request.bundlerConfig, serverReference),
    bound: bound ? Promise.resolve(bound) : null,
  };
  const metadataId = outlineModel(request, serverReferenceMetadata);
  writtenServerReferences.set(serverReference, metadataId);
  return serializeServerReferenceID(metadataId);
}

function serializeLargeTextString(request: Request, text: string): string {
  request.pendingChunks += 2;
  const textId = request.nextChunkId++;
  const textChunk = stringToChunk(text);
  const binaryLength = byteLengthOfChunk(textChunk);
  const row = textId.toString(16) + ':T' + binaryLength.toString(16) + ',';
  const headerChunk = stringToChunk(row);
  request.completedRegularChunks.push(headerChunk, textChunk);
  return serializeByValueID(textId);
}

function serializeMap(
  request: Request,
  map: Map<ReactClientValue, ReactClientValue>,
): string {
  const id = outlineModel(request, Array.from(map));
  return '$Q' + id.toString(16);
}

function serializeSet(request: Request, set: Set<ReactClientValue>): string {
  const id = outlineModel(request, Array.from(set));
  return '$W' + id.toString(16);
}

function serializeTypedArray(
  request: Request,
  tag: string,
  typedArray: $ArrayBufferView,
): string {
  if (enableTaint) {
    if (TaintRegistryByteLengths.has(typedArray.byteLength)) {
      // If we have had any tainted values of this length, we check
      // to see if these bytes matches any entries in the registry.
      const tainted = TaintRegistryValues.get(
        binaryToComparableString(typedArray),
      );
      if (tainted !== undefined) {
        throwTaintViolation(tainted.message);
      }
    }
  }
  request.pendingChunks += 2;
  const bufferId = request.nextChunkId++;
  // TODO: Convert to little endian if that's not the server default.
  const binaryChunk = typedArrayToBinaryChunk(typedArray);
  const binaryLength = byteLengthOfBinaryChunk(binaryChunk);
  const row =
    bufferId.toString(16) + ':' + tag + binaryLength.toString(16) + ',';
  const headerChunk = stringToChunk(row);
  request.completedRegularChunks.push(headerChunk, binaryChunk);
  return serializeByValueID(bufferId);
}

function escapeStringValue(value: string): string {
  if (value[0] === '$') {
    // We need to escape $ prefixed strings since we use those to encode
>>>>>>> remotes/upstream/main
    // references to IDs and as special symbol values.
    return '$' + value;
  } else {
    return value;
  }
}

<<<<<<< HEAD
function isObjectPrototype(object): boolean {
  if (!object) {
    return false;
  }
  const ObjectPrototype = Object.prototype;
  if (object === ObjectPrototype) {
    return true;
  }
  // It might be an object from a different Realm which is
  // still just a plain simple object.
  if (Object.getPrototypeOf(object)) {
    return false;
  }
  const names = Object.getOwnPropertyNames(object);
  for (let i = 0; i < names.length; i++) {
    if (!(names[i] in ObjectPrototype)) {
      return false;
    }
  }
  return true;
}

function isSimpleObject(object): boolean {
  if (!isObjectPrototype(Object.getPrototypeOf(object))) {
    return false;
  }
  const names = Object.getOwnPropertyNames(object);
  for (let i = 0; i < names.length; i++) {
    const descriptor = Object.getOwnPropertyDescriptor(object, names[i]);
    if (!descriptor) {
      return false;
    }
    if (!descriptor.enumerable) {
      if (
        (names[i] === 'key' || names[i] === 'ref') &&
        typeof descriptor.get === 'function'
      ) {
        // React adds key and ref getters to props objects to issue warnings.
        // Those getters will not be transferred to the client, but that's ok,
        // so we'll special case them.
        continue;
      }
      return false;
    }
  }
  return true;
}

function objectName(object): string {
  const name = Object.prototype.toString.call(object);
  return name.replace(/^\[object (.*)\]$/, function(m, p0) {
    return p0;
  });
}

function describeKeyForErrorMessage(key: string): string {
  const encodedKey = JSON.stringify(key);
  return '"' + key + '"' === encodedKey ? key : encodedKey;
}

function describeValueForErrorMessage(value: ReactModel): string {
  switch (typeof value) {
    case 'string': {
      return JSON.stringify(
        value.length <= 10 ? value : value.substr(0, 10) + '...',
      );
    }
    case 'object': {
      if (isArray(value)) {
        return '[...]';
      }
      const name = objectName(value);
      if (name === 'Object') {
        return '{...}';
      }
      return name;
    }
    case 'function':
      return 'function';
    default:
      // eslint-disable-next-line react-internal/safe-string-coercion
      return String(value);
  }
}

function describeObjectForErrorMessage(
  objectOrArray:
    | {+[key: string | number]: ReactModel, ...}
    | $ReadOnlyArray<ReactModel>,
  expandedName?: string,
): string {
  if (isArray(objectOrArray)) {
    let str = '[';
    const array: $ReadOnlyArray<ReactModel> = objectOrArray;
    for (let i = 0; i < array.length; i++) {
      if (i > 0) {
        str += ', ';
      }
      if (i > 6) {
        str += '...';
        break;
      }
      const value = array[i];
      if (
        '' + i === expandedName &&
        typeof value === 'object' &&
        value !== null
      ) {
        str += describeObjectForErrorMessage(value);
      } else {
        str += describeValueForErrorMessage(value);
      }
    }
    str += ']';
    return str;
  } else {
    let str = '{';
    const object: {+[key: string | number]: ReactModel, ...} = objectOrArray;
    const names = Object.keys(object);
    for (let i = 0; i < names.length; i++) {
      if (i > 0) {
        str += ', ';
      }
      if (i > 6) {
        str += '...';
        break;
      }
      const name = names[i];
      str += describeKeyForErrorMessage(name) + ': ';
      const value = object[name];
      if (
        name === expandedName &&
        typeof value === 'object' &&
        value !== null
      ) {
        str += describeObjectForErrorMessage(value);
      } else {
        str += describeValueForErrorMessage(value);
      }
    }
    str += '}';
    return str;
  }
}

let insideContextProps = null;
let isInsideContextValue = false;

export function resolveModelToJSON(
  request: Request,
  parent: {+[key: string | number]: ReactModel} | $ReadOnlyArray<ReactModel>,
  key: string,
  value: ReactModel,
): ReactJSONValue {
  if (__DEV__) {
    // $FlowFixMe
    const originalValue = parent[key];
    if (typeof originalValue === 'object' && originalValue !== value) {
      console.error(
        'Only plain objects can be passed to client components from server components. ' +
          'Objects with toJSON methods are not supported. Convert it manually ' +
          'to a simple value before passing it to props. ' +
          'Remove %s from these props: %s',
        describeKeyForErrorMessage(key),
        describeObjectForErrorMessage(parent),
      );
=======
let insideContextProps = null;
let isInsideContextValue = false;

function resolveModelToJSON(
  request: Request,
  parent:
    | {+[key: string | number]: ReactClientValue}
    | $ReadOnlyArray<ReactClientValue>,
  key: string,
  value: ReactClientValue,
): ReactJSONValue {
  // Make sure that `parent[key]` wasn't JSONified before `value` was passed to us
  if (__DEV__) {
    // $FlowFixMe[incompatible-use]
    const originalValue = parent[key];
    if (
      typeof originalValue === 'object' &&
      originalValue !== value &&
      !(originalValue instanceof Date)
    ) {
      if (objectName(originalValue) !== 'Object') {
        const jsxParentType = jsxChildrenParents.get(parent);
        if (typeof jsxParentType === 'string') {
          console.error(
            '%s objects cannot be rendered as text children. Try formatting it using toString().%s',
            objectName(originalValue),
            describeObjectForErrorMessage(parent, key),
          );
        } else {
          console.error(
            'Only plain objects can be passed to Client Components from Server Components. ' +
              '%s objects are not supported.%s',
            objectName(originalValue),
            describeObjectForErrorMessage(parent, key),
          );
        }
      } else {
        console.error(
          'Only plain objects can be passed to Client Components from Server Components. ' +
            'Objects with toJSON methods are not supported. Convert it manually ' +
            'to a simple value before passing it to props.%s',
          describeObjectForErrorMessage(parent, key),
        );
      }
>>>>>>> remotes/upstream/main
    }
  }

  // Special Symbols
  switch (value) {
    case REACT_ELEMENT_TYPE:
      return '$';
  }

  if (__DEV__) {
    if (
      parent[0] === REACT_ELEMENT_TYPE &&
      parent[1] &&
<<<<<<< HEAD
      parent[1].$$typeof === REACT_PROVIDER_TYPE &&
=======
      (parent[1]: any).$$typeof === REACT_PROVIDER_TYPE &&
>>>>>>> remotes/upstream/main
      key === '3'
    ) {
      insideContextProps = value;
    } else if (insideContextProps === parent && key === 'value') {
      isInsideContextValue = true;
    } else if (insideContextProps === parent && key === 'children') {
      isInsideContextValue = false;
    }
  }

<<<<<<< HEAD
  // Resolve server components.
=======
  // Resolve Server Components.
>>>>>>> remotes/upstream/main
  while (
    typeof value === 'object' &&
    value !== null &&
    ((value: any).$$typeof === REACT_ELEMENT_TYPE ||
      (value: any).$$typeof === REACT_LAZY_TYPE)
  ) {
    if (__DEV__) {
      if (isInsideContextValue) {
        console.error('React elements are not allowed in ServerContext');
      }
    }

    try {
      switch ((value: any).$$typeof) {
        case REACT_ELEMENT_TYPE: {
          // TODO: Concatenate keys of parents onto children.
          const element: React$Element<any> = (value: any);
<<<<<<< HEAD
          // Attempt to render the server component.
          value = attemptResolveElement(
=======
          // Attempt to render the Server Component.
          value = attemptResolveElement(
            request,
>>>>>>> remotes/upstream/main
            element.type,
            element.key,
            element.ref,
            element.props,
            null,
          );
          break;
        }
        case REACT_LAZY_TYPE: {
          const payload = (value: any)._payload;
          const init = (value: any)._init;
          value = init(payload);
          break;
        }
      }
<<<<<<< HEAD
    } catch (x) {
      if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
        // Something suspended, we'll need to create a new task and resolve it later.
        request.pendingChunks++;
        const newTask = createTask(
          request,
          value,
          getActiveContext(),
          request.abortableTasks,
        );
        const ping = newTask.ping;
        x.then(ping, ping);

        const wakeable: Wakeable = x;
        trackSuspendedWakeable(wakeable);
        newTask.thenableState = getThenableStateAfterSuspending();

        return serializeByRefID(newTask.id);
      } else {
        logRecoverableError(request, x);
        // Something errored. We'll still send everything we have up until this point.
        // We'll replace this element with a lazy reference that throws on the client
        // once it gets rendered.
        request.pendingChunks++;
        const errorId = request.nextChunkId++;
        emitErrorChunk(request, errorId, x);
        return serializeByRefID(errorId);
      }
=======
    } catch (thrownValue) {
      const x =
        thrownValue === SuspenseException
          ? // This is a special type of exception used for Suspense. For historical
            // reasons, the rest of the Suspense implementation expects the thrown
            // value to be a thenable, because before `use` existed that was the
            // (unstable) API for suspending. This implementation detail can change
            // later, once we deprecate the old API in favor of `use`.
            getSuspendedThenable()
          : thrownValue;
      if (typeof x === 'object' && x !== null) {
        // $FlowFixMe[method-unbinding]
        if (typeof x.then === 'function') {
          // Something suspended, we'll need to create a new task and resolve it later.
          request.pendingChunks++;
          const newTask = createTask(
            request,
            value,
            getActiveContext(),
            request.abortableTasks,
          );
          const ping = newTask.ping;
          x.then(ping, ping);
          newTask.thenableState = getThenableStateAfterSuspending();
          return serializeLazyID(newTask.id);
        } else if (enablePostpone && x.$$typeof === REACT_POSTPONE_TYPE) {
          // Something postponed. We'll still send everything we have up until this point.
          // We'll replace this element with a lazy reference that postpones on the client.
          const postponeInstance: Postpone = (x: any);
          request.pendingChunks++;
          const postponeId = request.nextChunkId++;
          logPostpone(request, postponeInstance.message);
          emitPostponeChunk(request, postponeId, postponeInstance);
          return serializeLazyID(postponeId);
        }
      }
      // Something errored. We'll still send everything we have up until this point.
      // We'll replace this element with a lazy reference that throws on the client
      // once it gets rendered.
      request.pendingChunks++;
      const errorId = request.nextChunkId++;
      const digest = logRecoverableError(request, x);
      emitErrorChunk(request, errorId, digest, x);
      return serializeLazyID(errorId);
>>>>>>> remotes/upstream/main
    }
  }

  if (value === null) {
    return null;
  }

  if (typeof value === 'object') {
<<<<<<< HEAD
    if (isModuleReference(value)) {
      return serializeModuleReference(request, parent, key, (value: any));
=======
    if (enableTaint) {
      const tainted = TaintRegistryObjects.get(value);
      if (tainted !== undefined) {
        throwTaintViolation(tainted);
      }
    }
    if (isClientReference(value)) {
      return serializeClientReference(request, parent, key, (value: any));
      // $FlowFixMe[method-unbinding]
    } else if (typeof value.then === 'function') {
      // We assume that any object with a .then property is a "Thenable" type,
      // or a Promise type. Either of which can be represented by a Promise.
      const promiseId = serializeThenable(request, (value: any));
      return serializePromiseID(promiseId);
>>>>>>> remotes/upstream/main
    } else if ((value: any).$$typeof === REACT_PROVIDER_TYPE) {
      const providerKey = ((value: any): ReactProviderType<any>)._context
        ._globalName;
      const writtenProviders = request.writtenProviders;
      let providerId = writtenProviders.get(key);
      if (providerId === undefined) {
        request.pendingChunks++;
        providerId = request.nextChunkId++;
        writtenProviders.set(providerKey, providerId);
        emitProviderChunk(request, providerId, providerKey);
      }
      return serializeByValueID(providerId);
    } else if (value === POP) {
      popProvider();
      if (__DEV__) {
        insideContextProps = null;
        isInsideContextValue = false;
      }
      return (undefined: any);
    }

<<<<<<< HEAD
    if (__DEV__) {
      if (value !== null && !isArray(value)) {
        // Verify that this is a simple plain object.
        if (objectName(value) !== 'Object') {
          console.error(
            'Only plain objects can be passed to client components from server components. ' +
              'Built-ins like %s are not supported. ' +
              'Remove %s from these props: %s',
            objectName(value),
            describeKeyForErrorMessage(key),
            describeObjectForErrorMessage(parent),
          );
        } else if (!isSimpleObject(value)) {
          console.error(
            'Only plain objects can be passed to client components from server components. ' +
              'Classes or other objects with methods are not supported. ' +
              'Remove %s from these props: %s',
            describeKeyForErrorMessage(key),
            describeObjectForErrorMessage(parent, key),
          );
        } else if (Object.getOwnPropertySymbols) {
          const symbols = Object.getOwnPropertySymbols(value);
          if (symbols.length > 0) {
            console.error(
              'Only plain objects can be passed to client components from server components. ' +
                'Objects with symbol properties like %s are not supported. ' +
                'Remove %s from these props: %s',
              symbols[0].description,
              describeKeyForErrorMessage(key),
              describeObjectForErrorMessage(parent, key),
            );
          }
=======
    if (isArray(value)) {
      // $FlowFixMe[incompatible-return]
      return value;
    }

    if (value instanceof Map) {
      return serializeMap(request, value);
    }
    if (value instanceof Set) {
      return serializeSet(request, value);
    }

    if (enableBinaryFlight) {
      if (value instanceof ArrayBuffer) {
        return serializeTypedArray(request, 'A', new Uint8Array(value));
      }
      if (value instanceof Int8Array) {
        // char
        return serializeTypedArray(request, 'C', value);
      }
      if (value instanceof Uint8Array) {
        // unsigned char
        return serializeTypedArray(request, 'c', value);
      }
      if (value instanceof Uint8ClampedArray) {
        // unsigned clamped char
        return serializeTypedArray(request, 'U', value);
      }
      if (value instanceof Int16Array) {
        // sort
        return serializeTypedArray(request, 'S', value);
      }
      if (value instanceof Uint16Array) {
        // unsigned short
        return serializeTypedArray(request, 's', value);
      }
      if (value instanceof Int32Array) {
        // long
        return serializeTypedArray(request, 'L', value);
      }
      if (value instanceof Uint32Array) {
        // unsigned long
        return serializeTypedArray(request, 'l', value);
      }
      if (value instanceof Float32Array) {
        // float
        return serializeTypedArray(request, 'F', value);
      }
      if (value instanceof Float64Array) {
        // double
        return serializeTypedArray(request, 'D', value);
      }
      if (value instanceof BigInt64Array) {
        // number
        return serializeTypedArray(request, 'N', value);
      }
      if (value instanceof BigUint64Array) {
        // unsigned number
        // We use "m" instead of "n" since JSON can start with "null"
        return serializeTypedArray(request, 'm', value);
      }
      if (value instanceof DataView) {
        return serializeTypedArray(request, 'V', value);
      }
    }

    const iteratorFn = getIteratorFn(value);
    if (iteratorFn) {
      return Array.from((value: any));
    }

    // Verify that this is a simple plain object.
    const proto = getPrototypeOf(value);
    if (
      proto !== ObjectPrototype &&
      (proto === null || getPrototypeOf(proto) !== null)
    ) {
      throw new Error(
        'Only plain objects, and a few built-ins, can be passed to Client Components ' +
          'from Server Components. Classes or null prototypes are not supported.',
      );
    }
    if (__DEV__) {
      if (objectName(value) !== 'Object') {
        console.error(
          'Only plain objects can be passed to Client Components from Server Components. ' +
            '%s objects are not supported.%s',
          objectName(value),
          describeObjectForErrorMessage(parent, key),
        );
      } else if (!isSimpleObject(value)) {
        console.error(
          'Only plain objects can be passed to Client Components from Server Components. ' +
            'Classes or other objects with methods are not supported.%s',
          describeObjectForErrorMessage(parent, key),
        );
      } else if (Object.getOwnPropertySymbols) {
        const symbols = Object.getOwnPropertySymbols(value);
        if (symbols.length > 0) {
          console.error(
            'Only plain objects can be passed to Client Components from Server Components. ' +
              'Objects with symbol properties like %s are not supported.%s',
            symbols[0].description,
            describeObjectForErrorMessage(parent, key),
          );
>>>>>>> remotes/upstream/main
        }
      }
    }

<<<<<<< HEAD
    // $FlowFixMe
=======
    // $FlowFixMe[incompatible-return]
>>>>>>> remotes/upstream/main
    return value;
  }

  if (typeof value === 'string') {
<<<<<<< HEAD
    return escapeStringValue(value);
  }

  if (
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    typeof value === 'undefined'
  ) {
    return value;
  }

  if (typeof value === 'function') {
    if (isModuleReference(value)) {
      return serializeModuleReference(request, parent, key, (value: any));
    }
    if (/^on[A-Z]/.test(key)) {
      throw new Error(
        'Event handlers cannot be passed to client component props. ' +
          `Remove ${describeKeyForErrorMessage(
            key,
          )} from these props if possible: ${describeObjectForErrorMessage(
            parent,
          )}
` +
          'If you need interactivity, consider converting part of this to a client component.',
      );
    } else {
      throw new Error(
        'Functions cannot be passed directly to client components ' +
          "because they're not serializable. " +
          `Remove ${describeKeyForErrorMessage(key)} (${value.displayName ||
            value.name ||
            'function'}) from this object, or avoid the entire object: ${describeObjectForErrorMessage(
            parent,
          )}`,
=======
    if (enableTaint) {
      const tainted = TaintRegistryValues.get(value);
      if (tainted !== undefined) {
        throwTaintViolation(tainted.message);
      }
    }
    // TODO: Maybe too clever. If we support URL there's no similar trick.
    if (value[value.length - 1] === 'Z') {
      // Possibly a Date, whose toJSON automatically calls toISOString
      // $FlowFixMe[incompatible-use]
      const originalValue = parent[key];
      if (originalValue instanceof Date) {
        return serializeDateFromDateJSON(value);
      }
    }
    if (value.length >= 1024) {
      // For large strings, we encode them outside the JSON payload so that we
      // don't have to double encode and double parse the strings. This can also
      // be more compact in case the string has a lot of escaped characters.
      return serializeLargeTextString(request, value);
    }
    return escapeStringValue(value);
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return serializeNumber(value);
  }

  if (typeof value === 'undefined') {
    return serializeUndefined();
  }

  if (typeof value === 'function') {
    if (enableTaint) {
      const tainted = TaintRegistryObjects.get(value);
      if (tainted !== undefined) {
        throwTaintViolation(tainted);
      }
    }
    if (isClientReference(value)) {
      return serializeClientReference(request, parent, key, (value: any));
    }
    if (isServerReference(value)) {
      return serializeServerReference(request, parent, key, (value: any));
    }
    if (/^on[A-Z]/.test(key)) {
      throw new Error(
        'Event handlers cannot be passed to Client Component props.' +
          describeObjectForErrorMessage(parent, key) +
          '\nIf you need interactivity, consider converting part of this to a Client Component.',
      );
    } else {
      throw new Error(
        'Functions cannot be passed directly to Client Components ' +
          'unless you explicitly expose it by marking it with "use server".' +
          describeObjectForErrorMessage(parent, key),
>>>>>>> remotes/upstream/main
      );
    }
  }

  if (typeof value === 'symbol') {
    const writtenSymbols = request.writtenSymbols;
    const existingId = writtenSymbols.get(value);
    if (existingId !== undefined) {
      return serializeByValueID(existingId);
    }
<<<<<<< HEAD
    // $FlowFixMe `description` might be undefined
    const name: string = value.description;

    // $FlowFixMe `name` might be undefined
    if (Symbol.for(name) !== value) {
      throw new Error(
        'Only global symbols received from Symbol.for(...) can be passed to client components. ' +
          `The symbol Symbol.for(${
            // $FlowFixMe `description` might be undefined
            value.description
          }) cannot be found among global symbols. ` +
          `Remove ${describeKeyForErrorMessage(
            key,
          )} from this object, or avoid the entire object: ${describeObjectForErrorMessage(
            parent,
          )}`,
=======
    // $FlowFixMe[incompatible-type] `description` might be undefined
    const name: string = value.description;

    if (Symbol.for(name) !== value) {
      throw new Error(
        'Only global symbols received from Symbol.for(...) can be passed to Client Components. ' +
          `The symbol Symbol.for(${
            // $FlowFixMe[incompatible-type] `description` might be undefined
            value.description
          }) cannot be found among global symbols.` +
          describeObjectForErrorMessage(parent, key),
>>>>>>> remotes/upstream/main
      );
    }

    request.pendingChunks++;
    const symbolId = request.nextChunkId++;
    emitSymbolChunk(request, symbolId, name);
    writtenSymbols.set(value, symbolId);
    return serializeByValueID(symbolId);
  }

<<<<<<< HEAD
  // $FlowFixMe: bigint isn't added to Flow yet.
  if (typeof value === 'bigint') {
    throw new Error(
      `BigInt (${value}) is not yet supported in client component props. ` +
        `Remove ${describeKeyForErrorMessage(
          key,
        )} from this object or use a plain number instead: ${describeObjectForErrorMessage(
          parent,
        )}`,
    );
  }

  throw new Error(
    `Type ${typeof value} is not supported in client component props. ` +
      `Remove ${describeKeyForErrorMessage(
        key,
      )} from this object, or avoid the entire object: ${describeObjectForErrorMessage(
        parent,
      )}`,
  );
}

function logRecoverableError(request: Request, error: mixed): void {
  const onError = request.onError;
  onError(error);
}

function fatalError(request: Request, error: mixed): void {
=======
  if (typeof value === 'bigint') {
    if (enableTaint) {
      const tainted = TaintRegistryValues.get(value);
      if (tainted !== undefined) {
        throwTaintViolation(tainted.message);
      }
    }
    return serializeBigInt(value);
  }

  throw new Error(
    `Type ${typeof value} is not supported in Client Component props.` +
      describeObjectForErrorMessage(parent, key),
  );
}

function logPostpone(request: Request, reason: string): void {
  const onPostpone = request.onPostpone;
  onPostpone(reason);
}

function logRecoverableError(request: Request, error: mixed): string {
  const onError = request.onError;
  const errorDigest = onError(error);
  if (errorDigest != null && typeof errorDigest !== 'string') {
    // eslint-disable-next-line react-internal/prod-error-codes
    throw new Error(
      `onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "${typeof errorDigest}" instead`,
    );
  }
  return errorDigest || '';
}

function fatalError(request: Request, error: mixed): void {
  if (enableTaint) {
    cleanupTaintQueue(request);
  }
>>>>>>> remotes/upstream/main
  // This is called outside error handling code such as if an error happens in React internals.
  if (request.destination !== null) {
    request.status = CLOSED;
    closeWithError(request.destination, error);
  } else {
    request.status = CLOSING;
    request.fatalError = error;
  }
}

<<<<<<< HEAD
function emitErrorChunk(request: Request, id: number, error: mixed): void {
  // TODO: We should not leak error messages to the client in prod.
  // Give this an error code instead and log on the server.
  // We can serialize the error in DEV as a convenience.
  let message;
  let stack = '';
  try {
    if (error instanceof Error) {
      // eslint-disable-next-line react-internal/safe-string-coercion
      message = String(error.message);
      // eslint-disable-next-line react-internal/safe-string-coercion
      stack = String(error.stack);
    } else {
      message = 'Error: ' + (error: any);
    }
  } catch (x) {
    message = 'An error occurred but serializing the error message failed.';
  }

  const processedChunk = processErrorChunk(request, id, message, stack);
  request.completedErrorChunks.push(processedChunk);
}

function emitModuleChunk(
  request: Request,
  id: number,
  moduleMetaData: ModuleMetaData,
): void {
  // $FlowFixMe ModuleMetaData is not a ReactModel
  const processedChunk = processModuleChunk(request, id, moduleMetaData);
  request.completedModuleChunks.push(processedChunk);
}

function emitSymbolChunk(request: Request, id: number, name: string): void {
  const processedChunk = processSymbolChunk(request, id, name);
  request.completedModuleChunks.push(processedChunk);
=======
function emitPostponeChunk(
  request: Request,
  id: number,
  postponeInstance: Postpone,
): void {
  let row;
  if (__DEV__) {
    let reason = '';
    let stack = '';
    try {
      // eslint-disable-next-line react-internal/safe-string-coercion
      reason = String(postponeInstance.message);
      // eslint-disable-next-line react-internal/safe-string-coercion
      stack = String(postponeInstance.stack);
    } catch (x) {}
    row = serializeRowHeader('P', id) + stringify({reason, stack}) + '\n';
  } else {
    // No reason included in prod.
    row = serializeRowHeader('P', id) + '\n';
  }
  const processedChunk = stringToChunk(row);
  request.completedErrorChunks.push(processedChunk);
}

function emitErrorChunk(
  request: Request,
  id: number,
  digest: string,
  error: mixed,
): void {
  let errorInfo: any;
  if (__DEV__) {
    let message;
    let stack = '';
    try {
      if (error instanceof Error) {
        // eslint-disable-next-line react-internal/safe-string-coercion
        message = String(error.message);
        // eslint-disable-next-line react-internal/safe-string-coercion
        stack = String(error.stack);
      } else {
        message = 'Error: ' + (error: any);
      }
    } catch (x) {
      message = 'An error occurred but serializing the error message failed.';
    }
    errorInfo = {digest, message, stack};
  } else {
    errorInfo = {digest};
  }
  const row = serializeRowHeader('E', id) + stringify(errorInfo) + '\n';
  const processedChunk = stringToChunk(row);
  request.completedErrorChunks.push(processedChunk);
}

function emitImportChunk(
  request: Request,
  id: number,
  clientReferenceMetadata: ClientReferenceMetadata,
): void {
  // $FlowFixMe[incompatible-type] stringify can return null
  const json: string = stringify(clientReferenceMetadata);
  const row = serializeRowHeader('I', id) + json + '\n';
  const processedChunk = stringToChunk(row);
  request.completedImportChunks.push(processedChunk);
}

function emitHintChunk<Code: HintCode>(
  request: Request,
  code: Code,
  model: HintModel<Code>,
): void {
  const json: string = stringify(model);
  const id = request.nextChunkId++;
  const row = serializeRowHeader('H' + code, id) + json + '\n';
  const processedChunk = stringToChunk(row);
  request.completedHintChunks.push(processedChunk);
}

function emitSymbolChunk(request: Request, id: number, name: string): void {
  const symbolReference = serializeSymbolReference(name);
  const processedChunk = encodeReferenceChunk(request, id, symbolReference);
  request.completedImportChunks.push(processedChunk);
>>>>>>> remotes/upstream/main
}

function emitProviderChunk(
  request: Request,
  id: number,
  contextName: string,
): void {
<<<<<<< HEAD
  const processedChunk = processProviderChunk(request, id, contextName);
  request.completedJSONChunks.push(processedChunk);
=======
  const contextReference = serializeProviderReference(contextName);
  const processedChunk = encodeReferenceChunk(request, id, contextReference);
  request.completedRegularChunks.push(processedChunk);
}

function emitModelChunk(
  request: Request,
  id: number,
  model: ReactClientValue,
): void {
  // $FlowFixMe[incompatible-type] stringify can return null
  const json: string = stringify(model, request.toJSON);
  const row = id.toString(16) + ':' + json + '\n';
  const processedChunk = stringToChunk(row);
  request.completedRegularChunks.push(processedChunk);
>>>>>>> remotes/upstream/main
}

function retryTask(request: Request, task: Task): void {
  if (task.status !== PENDING) {
    // We completed this by other means before we had a chance to retry it.
    return;
  }

  switchContext(task.context);
  try {
    let value = task.model;
    if (
      typeof value === 'object' &&
      value !== null &&
      (value: any).$$typeof === REACT_ELEMENT_TYPE
    ) {
      // TODO: Concatenate keys of parents onto children.
      const element: React$Element<any> = (value: any);

      // When retrying a component, reuse the thenableState from the
      // previous attempt.
      const prevThenableState = task.thenableState;

<<<<<<< HEAD
      // Attempt to render the server component.
=======
      // Attempt to render the Server Component.
>>>>>>> remotes/upstream/main
      // Doing this here lets us reuse this same task if the next component
      // also suspends.
      task.model = value;
      value = attemptResolveElement(
<<<<<<< HEAD
=======
        request,
>>>>>>> remotes/upstream/main
        element.type,
        element.key,
        element.ref,
        element.props,
        prevThenableState,
      );

      // Successfully finished this component. We're going to keep rendering
      // using the same task, but we reset its thenable state before continuing.
      task.thenableState = null;

      // Keep rendering and reuse the same task. This inner loop is separate
      // from the render above because we don't need to reset the thenable state
      // until the next time something suspends and retries.
      while (
        typeof value === 'object' &&
        value !== null &&
        (value: any).$$typeof === REACT_ELEMENT_TYPE
      ) {
        // TODO: Concatenate keys of parents onto children.
        const nextElement: React$Element<any> = (value: any);
        task.model = value;
        value = attemptResolveElement(
<<<<<<< HEAD
=======
          request,
>>>>>>> remotes/upstream/main
          nextElement.type,
          nextElement.key,
          nextElement.ref,
          nextElement.props,
          null,
        );
      }
    }

<<<<<<< HEAD
    const processedChunk = processModelChunk(request, task.id, value);
    request.completedJSONChunks.push(processedChunk);
    request.abortableTasks.delete(task);
    task.status = COMPLETED;
  } catch (x) {
    if (typeof x === 'object' && x !== null && typeof x.then === 'function') {
      // Something suspended again, let's pick it back up later.
      const ping = task.ping;
      x.then(ping, ping);

      const wakeable: Wakeable = x;
      trackSuspendedWakeable(wakeable);
      task.thenableState = getThenableStateAfterSuspending();
      return;
    } else {
      request.abortableTasks.delete(task);
      task.status = ERRORED;
      logRecoverableError(request, x);
      // This errored, we need to serialize this error to the
      emitErrorChunk(request, task.id, x);
    }
=======
    emitModelChunk(request, task.id, value);
    request.abortableTasks.delete(task);
    task.status = COMPLETED;
  } catch (thrownValue) {
    const x =
      thrownValue === SuspenseException
        ? // This is a special type of exception used for Suspense. For historical
          // reasons, the rest of the Suspense implementation expects the thrown
          // value to be a thenable, because before `use` existed that was the
          // (unstable) API for suspending. This implementation detail can change
          // later, once we deprecate the old API in favor of `use`.
          getSuspendedThenable()
        : thrownValue;
    if (typeof x === 'object' && x !== null) {
      // $FlowFixMe[method-unbinding]
      if (typeof x.then === 'function') {
        // Something suspended again, let's pick it back up later.
        const ping = task.ping;
        x.then(ping, ping);
        task.thenableState = getThenableStateAfterSuspending();
        return;
      } else if (enablePostpone && x.$$typeof === REACT_POSTPONE_TYPE) {
        request.abortableTasks.delete(task);
        task.status = ERRORED;
        const postponeInstance: Postpone = (x: any);
        logPostpone(request, postponeInstance.message);
        emitPostponeChunk(request, task.id, postponeInstance);
        return;
      }
    }
    request.abortableTasks.delete(task);
    task.status = ERRORED;
    const digest = logRecoverableError(request, x);
    emitErrorChunk(request, task.id, digest, x);
>>>>>>> remotes/upstream/main
  }
}

function performWork(request: Request): void {
  const prevDispatcher = ReactCurrentDispatcher.current;
<<<<<<< HEAD
  const prevCache = getCurrentCache();
  ReactCurrentDispatcher.current = Dispatcher;
  setCurrentCache(request.cache);
=======
  ReactCurrentDispatcher.current = HooksDispatcher;
  const prevRequest = currentRequest;
  currentRequest = request;
>>>>>>> remotes/upstream/main
  prepareToUseHooksForRequest(request);

  try {
    const pingedTasks = request.pingedTasks;
    request.pingedTasks = [];
    for (let i = 0; i < pingedTasks.length; i++) {
      const task = pingedTasks[i];
      retryTask(request, task);
    }
    if (request.destination !== null) {
      flushCompletedChunks(request, request.destination);
    }
  } catch (error) {
    logRecoverableError(request, error);
    fatalError(request, error);
  } finally {
    ReactCurrentDispatcher.current = prevDispatcher;
<<<<<<< HEAD
    setCurrentCache(prevCache);
    resetHooksForRequest();
=======
    resetHooksForRequest();
    currentRequest = prevRequest;
>>>>>>> remotes/upstream/main
  }
}

function abortTask(task: Task, request: Request, errorId: number): void {
  task.status = ABORTED;
  // Instead of emitting an error per task.id, we emit a model that only
  // has a single value referencing the error.
  const ref = serializeByValueID(errorId);
<<<<<<< HEAD
  const processedChunk = processReferenceChunk(request, task.id, ref);
=======
  const processedChunk = encodeReferenceChunk(request, task.id, ref);
>>>>>>> remotes/upstream/main
  request.completedErrorChunks.push(processedChunk);
}

function flushCompletedChunks(
  request: Request,
  destination: Destination,
): void {
  beginWriting(destination);
  try {
    // We emit module chunks first in the stream so that
    // they can be preloaded as early as possible.
<<<<<<< HEAD
    const moduleChunks = request.completedModuleChunks;
    let i = 0;
    for (; i < moduleChunks.length; i++) {
      request.pendingChunks--;
      const chunk = moduleChunks[i];
=======
    const importsChunks = request.completedImportChunks;
    let i = 0;
    for (; i < importsChunks.length; i++) {
      request.pendingChunks--;
      const chunk = importsChunks[i];
>>>>>>> remotes/upstream/main
      const keepWriting: boolean = writeChunkAndReturn(destination, chunk);
      if (!keepWriting) {
        request.destination = null;
        i++;
        break;
      }
    }
<<<<<<< HEAD
    moduleChunks.splice(0, i);
    // Next comes model data.
    const jsonChunks = request.completedJSONChunks;
    i = 0;
    for (; i < jsonChunks.length; i++) {
      request.pendingChunks--;
      const chunk = jsonChunks[i];
=======
    importsChunks.splice(0, i);

    // Next comes hints.
    const hintChunks = request.completedHintChunks;
    i = 0;
    for (; i < hintChunks.length; i++) {
      const chunk = hintChunks[i];
>>>>>>> remotes/upstream/main
      const keepWriting: boolean = writeChunkAndReturn(destination, chunk);
      if (!keepWriting) {
        request.destination = null;
        i++;
        break;
      }
    }
<<<<<<< HEAD
    jsonChunks.splice(0, i);
=======
    hintChunks.splice(0, i);

    // Next comes model data.
    const regularChunks = request.completedRegularChunks;
    i = 0;
    for (; i < regularChunks.length; i++) {
      request.pendingChunks--;
      const chunk = regularChunks[i];
      const keepWriting: boolean = writeChunkAndReturn(destination, chunk);
      if (!keepWriting) {
        request.destination = null;
        i++;
        break;
      }
    }
    regularChunks.splice(0, i);

>>>>>>> remotes/upstream/main
    // Finally, errors are sent. The idea is that it's ok to delay
    // any error messages and prioritize display of other parts of
    // the page.
    const errorChunks = request.completedErrorChunks;
    i = 0;
    for (; i < errorChunks.length; i++) {
      request.pendingChunks--;
      const chunk = errorChunks[i];
      const keepWriting: boolean = writeChunkAndReturn(destination, chunk);
      if (!keepWriting) {
        request.destination = null;
        i++;
        break;
      }
    }
    errorChunks.splice(0, i);
  } finally {
<<<<<<< HEAD
=======
    request.flushScheduled = false;
>>>>>>> remotes/upstream/main
    completeWriting(destination);
  }
  flushBuffered(destination);
  if (request.pendingChunks === 0) {
    // We're done.
<<<<<<< HEAD
=======
    if (enableTaint) {
      cleanupTaintQueue(request);
    }
>>>>>>> remotes/upstream/main
    close(destination);
  }
}

export function startWork(request: Request): void {
<<<<<<< HEAD
  scheduleWork(() => performWork(request));
=======
  request.flushScheduled = request.destination !== null;
  if (supportsRequestStorage) {
    scheduleWork(() => requestStorage.run(request, performWork, request));
  } else {
    scheduleWork(() => performWork(request));
  }
}

function enqueueFlush(request: Request): void {
  if (
    request.flushScheduled === false &&
    // If there are pinged tasks we are going to flush anyway after work completes
    request.pingedTasks.length === 0 &&
    // If there is no destination there is nothing we can flush to. A flush will
    // happen when we start flowing again
    request.destination !== null
  ) {
    const destination = request.destination;
    request.flushScheduled = true;
    scheduleWork(() => flushCompletedChunks(request, destination));
  }
>>>>>>> remotes/upstream/main
}

export function startFlowing(request: Request, destination: Destination): void {
  if (request.status === CLOSING) {
    request.status = CLOSED;
    closeWithError(destination, request.fatalError);
    return;
  }
  if (request.status === CLOSED) {
    return;
  }
  if (request.destination !== null) {
    // We're already flowing.
    return;
  }
  request.destination = destination;
  try {
    flushCompletedChunks(request, destination);
  } catch (error) {
    logRecoverableError(request, error);
    fatalError(request, error);
  }
}

<<<<<<< HEAD
=======
export function stopFlowing(request: Request): void {
  request.destination = null;
}

>>>>>>> remotes/upstream/main
// This is called to early terminate a request. It creates an error at all pending tasks.
export function abort(request: Request, reason: mixed): void {
  try {
    const abortableTasks = request.abortableTasks;
    if (abortableTasks.size > 0) {
      // We have tasks to abort. We'll emit one error row and then emit a reference
      // to that row from every row that's still remaining.
      const error =
        reason === undefined
          ? new Error('The render was aborted by the server without a reason.')
          : reason;

<<<<<<< HEAD
      logRecoverableError(request, error);
      request.pendingChunks++;
      const errorId = request.nextChunkId++;
      emitErrorChunk(request, errorId, error);
=======
      const digest = logRecoverableError(request, error);
      request.pendingChunks++;
      const errorId = request.nextChunkId++;
      emitErrorChunk(request, errorId, digest, error);
>>>>>>> remotes/upstream/main
      abortableTasks.forEach(task => abortTask(task, request, errorId));
      abortableTasks.clear();
    }
    if (request.destination !== null) {
      flushCompletedChunks(request, request.destination);
    }
  } catch (error) {
    logRecoverableError(request, error);
    fatalError(request, error);
  }
}

function importServerContexts(
  contexts?: Array<[string, ServerContextJSONValue]>,
) {
  if (contexts) {
    const prevContext = getActiveContext();
    switchContext(rootContextSnapshot);
    for (let i = 0; i < contexts.length; i++) {
      const [name, value] = contexts[i];
      const context = getOrCreateServerContext(name);
      pushProvider(context, value);
    }
    const importedContext = getActiveContext();
    switchContext(prevContext);
    return importedContext;
  }
  return rootContextSnapshot;
}
