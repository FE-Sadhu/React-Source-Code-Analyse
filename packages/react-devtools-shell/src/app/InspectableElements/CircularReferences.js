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

<<<<<<< HEAD
const arrayOne = [];
const arrayTwo = [];
arrayTwo.push(arrayOne);
arrayOne.push(arrayTwo);

const objectOne = {};
const objectTwo = {objectOne};
=======
const arrayOne: $FlowFixMe = [];
const arrayTwo: $FlowFixMe = [];
arrayTwo.push(arrayOne);
arrayOne.push(arrayTwo);

type ObjectOne = {
  objectTwo?: ObjectTwo,
};
type ObjectTwo = {
  objectOne: ObjectOne,
};

const objectOne: ObjectOne = {};
const objectTwo: ObjectTwo = {objectOne};
>>>>>>> remotes/upstream/main
objectOne.objectTwo = objectTwo;

export default function CircularReferences(): React.Node {
  return <ChildComponent arrayOne={arrayOne} objectOne={objectOne} />;
}

function ChildComponent(props: any) {
  return null;
}
