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
 * @flow strict-local
 */

<<<<<<< HEAD
=======
export opaque type PublicInstance = mixed;
export opaque type PublicTextInstance = mixed;

>>>>>>> remotes/upstream/main
module.exports = {
  get BatchedBridge() {
    return require('./BatchedBridge.js');
  },
  get Platform() {
    return require('./Platform');
  },
  get RCTEventEmitter() {
    return require('./RCTEventEmitter');
  },
  get ReactFiberErrorDialog() {
    return require('./ReactFiberErrorDialog');
  },
  get ReactNativeViewConfigRegistry() {
    return require('./ReactNativeViewConfigRegistry');
  },
  get TextInputState() {
    return require('./TextInputState');
  },
  get UIManager() {
    return require('./UIManager');
  },
  get deepDiffer() {
    return require('./deepDiffer');
  },
  get deepFreezeAndThrowOnMutationInDev() {
    return require('./deepFreezeAndThrowOnMutationInDev');
  },
  get flattenStyle() {
    return require('./flattenStyle');
  },
  get legacySendAccessibilityEvent() {
    return require('./legacySendAccessibilityEvent');
  },
  get RawEventEmitter() {
    return require('./RawEventEmitter').default;
  },
<<<<<<< HEAD
  get CustomEvent() {
    return require('./CustomEvent').default;
=======
  get getNativeTagFromPublicInstance() {
    return require('./getNativeTagFromPublicInstance').default;
  },
  get getNodeFromPublicInstance() {
    return require('./getNodeFromPublicInstance').default;
  },
  get createPublicInstance() {
    return require('./createPublicInstance').default;
  },
  get createPublicTextInstance() {
    return require('./createPublicTextInstance').default;
>>>>>>> remotes/upstream/main
  },
};
