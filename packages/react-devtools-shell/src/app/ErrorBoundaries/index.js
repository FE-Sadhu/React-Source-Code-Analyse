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

import * as React from 'react';
import {Fragment} from 'react';

class ErrorBoundary extends React.Component {
<<<<<<< HEAD
  state = {hasError: false};

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  render() {
=======
  state: {hasError: boolean} = {hasError: false};

  static getDerivedStateFromError(error: any): {hasError: boolean} {
    return {hasError: true};
  }

  render(): any {
>>>>>>> remotes/upstream/main
    const {hasError} = this.state;
    if (hasError) {
      return (
        <div
          style={{
            color: 'red',
            border: '1px solid red',
            borderRadius: '0.25rem',
            margin: '0.5rem',
            padding: '0.5rem',
          }}>
          An error was thrown.
        </div>
      );
    }

    const {children} = this.props;
    return (
      <div
        style={{
          border: '1px solid gray',
          borderRadius: '0.25rem',
          margin: '0.5rem',
          padding: '0.5rem',
        }}>
        {children}
      </div>
    );
  }
}

<<<<<<< HEAD
=======
// $FlowFixMe[missing-local-annot]
>>>>>>> remotes/upstream/main
function Component({label}) {
  return <div>{label}</div>;
}

export default function ErrorBoundaries(): React.Node {
  return (
    <Fragment>
      <h1>Nested error boundaries demo</h1>
      <ErrorBoundary>
        <Component label="Outer component" />
        <ErrorBoundary>
          <Component label="Inner component" />
        </ErrorBoundary>
      </ErrorBoundary>
      <ErrorBoundary>
        <Component label="Neighbour component" />
      </ErrorBoundary>
    </Fragment>
  );
}
