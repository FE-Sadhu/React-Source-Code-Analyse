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

const objectWithModifiedHasOwnProperty = {
  foo: 'abc',
  bar: 123,
  hasOwnProperty: true,
};

const objectWithNullProto = Object.create(null);
<<<<<<< HEAD
objectWithNullProto.foo = 'abc';
=======
// $FlowFixMe[prop-missing] found when upgrading Flow
objectWithNullProto.foo = 'abc';
// $FlowFixMe[prop-missing] found when upgrading Flow
>>>>>>> remotes/upstream/main
objectWithNullProto.bar = 123;

export default function EdgeCaseObjects(): React.Node {
  return (
    <ChildComponent
      objectWithModifiedHasOwnProperty={objectWithModifiedHasOwnProperty}
      objectWithNullProto={objectWithNullProto}
    />
  );
}

function ChildComponent(props: any) {
  return null;
}
