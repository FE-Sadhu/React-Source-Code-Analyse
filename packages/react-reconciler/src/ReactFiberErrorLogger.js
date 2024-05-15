/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Fiber, FiberRoot} from './ReactInternalTypes';
import type {CapturedValue} from './ReactCapturedValue';

import getComponentNameFromFiber from 'react-reconciler/src/getComponentNameFromFiber';

import {ClassComponent} from './ReactWorkTags';

import reportGlobalError from 'shared/reportGlobalError';

import ReactSharedInternals from 'shared/ReactSharedInternals';

// Side-channel since I'm not sure we want to make this part of the public API
let componentName: null | string = null;
let errorBoundaryName: null | string = null;

export function defaultOnUncaughtError(
  error: mixed,
  errorInfo: {+componentStack?: ?string},
): void {
  // Overriding this can silence these warnings e.g. for tests.
  // See https://github.com/facebook/react/pull/13384

  // For uncaught root errors we report them as uncaught to the browser's
  // onerror callback. This won't have component stacks and the error addendum.
  // So we add those into a separate console.warn.
  reportGlobalError(error);
  if (__DEV__) {
    const componentStack =
      errorInfo.componentStack != null ? errorInfo.componentStack : '';

    const componentNameMessage = componentName
      ? `An error occurred in the <${componentName}> component:`
      : 'An error occurred in one of your React components:';

    console['warn'](
      '%s\n%s\n\n%s',
      componentNameMessage,
      componentStack || '',
      'Consider adding an error boundary to your tree to customize error handling behavior.\n' +
        'Visit https://react.dev/link/error-boundaries to learn more about error boundaries.',
    );
  }
}

export function defaultOnCaughtError(
  error: mixed,
  errorInfo: {
    +componentStack?: ?string,
    +errorBoundary?: ?React$Component<any, any>,
  },
): void {
  // Overriding this can silence these warnings e.g. for tests.
  // See https://github.com/facebook/react/pull/13384

  // Caught by error boundary
  if (__DEV__) {
    const componentStack =
      errorInfo.componentStack != null ? errorInfo.componentStack : '';

    const componentNameMessage = componentName
      ? `The above error occurred in the <${componentName}> component:`
      : 'The above error occurred in one of your React components:';

    // In development, we provide our own message which includes the component stack
    // in addition to the error.
    // Don't transform to our wrapper
    console['error'](
      '%o\n\n%s\n%s\n\n%s',
      error,
      componentNameMessage,
      componentStack,
      `React will try to recreate this component tree from scratch ` +
        `using the error boundary you provided, ${
          errorBoundaryName || 'Anonymous'
        }.`,
    );
  } else {
    // In production, we print the error directly.
    // This will include the message, the JS stack, and anything the browser wants to show.
    // We pass the error object instead of custom message so that the browser displays the error natively.
    console['error'](error); // Don't transform to our wrapper
  }
}

export function defaultOnRecoverableError(
  error: mixed,
  errorInfo: {+componentStack?: ?string},
) {
  reportGlobalError(error);
}

export function logUncaughtError(
  root: FiberRoot,
  errorInfo: CapturedValue<mixed>,
): void {
  try {
    if (__DEV__) {
      componentName = errorInfo.source
        ? getComponentNameFromFiber(errorInfo.source)
        : null;
      errorBoundaryName = null;
    }
    const error = (errorInfo.value: any);
    if (__DEV__ && ReactSharedInternals.actQueue !== null) {
      // For uncaught errors inside act, we track them on the act and then
      // rethrow them into the test.
      ReactSharedInternals.thrownErrors.push(error);
      return;
    }
    const onUncaughtError = root.onUncaughtError;
    onUncaughtError(error, {
      componentStack: errorInfo.stack,
    });
  } catch (e) {
    // This method must not throw, or React internal state will get messed up.
    // If console.error is overridden, or logCapturedError() shows a dialog that throws,
    // we want to report this error outside of the normal stack as a last resort.
    // https://github.com/facebook/react/issues/13188
    setTimeout(() => {
      throw e;
    });
  }
}

export function logCaughtError(
  root: FiberRoot,
  boundary: Fiber,
  errorInfo: CapturedValue<mixed>,
): void {
  try {
    if (__DEV__) {
      componentName = errorInfo.source
        ? getComponentNameFromFiber(errorInfo.source)
        : null;
      errorBoundaryName = getComponentNameFromFiber(boundary);
    }
    const error = (errorInfo.value: any);
    const onCaughtError = root.onCaughtError;
    onCaughtError(error, {
      componentStack: errorInfo.stack,
      errorBoundary:
        boundary.tag === ClassComponent
          ? boundary.stateNode // This should always be the case as long as we only have class boundaries
          : null,
    });
  } catch (e) {
    // This method must not throw, or React internal state will get messed up.
    // If console.error is overridden, or logCapturedError() shows a dialog that throws,
    // we want to report this error outside of the normal stack as a last resort.
    // https://github.com/facebook/react/issues/13188
    setTimeout(() => {
      throw e;
    });
  }
}
