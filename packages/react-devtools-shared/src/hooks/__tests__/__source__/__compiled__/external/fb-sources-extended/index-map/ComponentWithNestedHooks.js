"use strict";

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
 * 
 */
const {
  useMemo,
  useState
} = require('react');

function Component(props) {
  const InnerComponent = useMemo(() => () => {
    const [state] = useState(0);
    return state;
  });
  props.callback(InnerComponent);
  return null;
}

module.exports = {
  Component
};
//# sourceMappingURL=ComponentWithNestedHooks.js.map?foo=bar&param=some_value