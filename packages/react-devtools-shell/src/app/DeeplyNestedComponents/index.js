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

<<<<<<< HEAD
function wrapWithHoc(Component, index) {
=======
function wrapWithHoc(Component: () => any, index: number) {
>>>>>>> remotes/upstream/main
  function HOC() {
    return <Component />;
  }

<<<<<<< HEAD
  // $FlowFixMe
  const displayName = Component.displayName || Component.name;
=======
  const displayName = (Component: any).displayName || Component.name;
>>>>>>> remotes/upstream/main

  HOC.displayName = `withHoc${index}(${displayName})`;
  return HOC;
}

<<<<<<< HEAD
function wrapWithNested(Component, times) {
=======
function wrapWithNested(Component: () => any, times: number) {
>>>>>>> remotes/upstream/main
  for (let i = 0; i < times; i++) {
    Component = wrapWithHoc(Component, i);
  }

  return Component;
}

function Nested() {
  return <div>Deeply nested div</div>;
}

const DeeplyNested = wrapWithNested(Nested, 100);

export default function DeeplyNestedComponents(): React.Node {
  return (
    <Fragment>
      <h1>Deeply nested component</h1>
      <DeeplyNested />
    </Fragment>
  );
}
