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

// Module provided by RN:
import {UIManager} from 'react-native/Libraries/ReactPrivate/ReactNativePrivateInterface';

const ReactNativeGlobalResponderHandler = {
<<<<<<< HEAD
  onChange: function(from: any, to: any, blockNativeResponder: boolean) {
=======
  onChange: function (from: any, to: any, blockNativeResponder: boolean) {
>>>>>>> remotes/upstream/main
    if (to !== null) {
      const tag = to.stateNode._nativeTag;
      UIManager.setJSResponder(tag, blockNativeResponder);
    } else {
      UIManager.clearJSResponder();
    }
  },
};

export default ReactNativeGlobalResponderHandler;
