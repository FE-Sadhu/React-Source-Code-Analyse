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
 * @emails react-core
 * @jest-environment node
 */

'use strict';

let React;
let ReactFabric;
let ReactNative;
let UIManager;
let createReactNativeComponentClass;
let ReactNativePrivateInterface;
<<<<<<< HEAD
=======
let getNativeTagFromPublicInstance;
>>>>>>> remotes/upstream/main

describe('created with ReactFabric called with ReactNative', () => {
  beforeEach(() => {
    jest.resetModules();
    require('react-native/Libraries/ReactPrivate/InitializeNativeFabricUIManager');
    ReactNative = require('react-native-renderer');
    jest.resetModules();
    ReactNativePrivateInterface = require('react-native/Libraries/ReactPrivate/ReactNativePrivateInterface');
<<<<<<< HEAD
    UIManager = require('react-native/Libraries/ReactPrivate/ReactNativePrivateInterface')
      .UIManager;
=======
    UIManager =
      require('react-native/Libraries/ReactPrivate/ReactNativePrivateInterface').UIManager;
>>>>>>> remotes/upstream/main
    jest.mock('shared/ReactFeatureFlags', () =>
      require('shared/forks/ReactFeatureFlags.native-oss'),
    );

    React = require('react');
    ReactFabric = require('react-native-renderer/fabric');
<<<<<<< HEAD
    createReactNativeComponentClass = require('react-native/Libraries/ReactPrivate/ReactNativePrivateInterface')
      .ReactNativeViewConfigRegistry.register;
=======
    createReactNativeComponentClass =
      require('react-native/Libraries/ReactPrivate/ReactNativePrivateInterface')
        .ReactNativeViewConfigRegistry.register;
    getNativeTagFromPublicInstance =
      require('react-native/Libraries/ReactPrivate/ReactNativePrivateInterface').getNativeTagFromPublicInstance;
>>>>>>> remotes/upstream/main
  });

  it('find Fabric instances with the RN renderer', () => {
    const View = createReactNativeComponentClass('RCTView', () => ({
      validAttributes: {title: true},
      uiViewClassName: 'RCTView',
    }));

    const ref = React.createRef();

    class Component extends React.Component {
      render() {
        return <View title="foo" />;
      }
    }

    ReactFabric.render(<Component ref={ref} />, 11);

    const instance = ReactNative.findHostInstance_DEPRECATED(ref.current);
<<<<<<< HEAD
    expect(instance._nativeTag).toBe(2);
=======
    expect(getNativeTagFromPublicInstance(instance)).toBe(2);
>>>>>>> remotes/upstream/main
  });

  it('find Fabric nodes with the RN renderer', () => {
    const View = createReactNativeComponentClass('RCTView', () => ({
      validAttributes: {title: true},
      uiViewClassName: 'RCTView',
    }));

    const ref = React.createRef();

    class Component extends React.Component {
      render() {
        return <View title="foo" />;
      }
    }

    ReactFabric.render(<Component ref={ref} />, 11);

    const handle = ReactNative.findNodeHandle(ref.current);
    expect(handle).toBe(2);
  });

  it('dispatches commands on Fabric nodes with the RN renderer', () => {
    nativeFabricUIManager.dispatchCommand.mockClear();
    const View = createReactNativeComponentClass('RCTView', () => ({
      validAttributes: {title: true},
      uiViewClassName: 'RCTView',
    }));

    const ref = React.createRef();

    ReactFabric.render(<View title="bar" ref={ref} />, 11);
    expect(nativeFabricUIManager.dispatchCommand).not.toBeCalled();
    ReactNative.dispatchCommand(ref.current, 'myCommand', [10, 20]);
    expect(nativeFabricUIManager.dispatchCommand).toHaveBeenCalledTimes(1);
<<<<<<< HEAD
    expect(
      nativeFabricUIManager.dispatchCommand,
    ).toHaveBeenCalledWith(expect.any(Object), 'myCommand', [10, 20]);
=======
    expect(nativeFabricUIManager.dispatchCommand).toHaveBeenCalledWith(
      expect.any(Object),
      'myCommand',
      [10, 20],
    );
>>>>>>> remotes/upstream/main
    expect(UIManager.dispatchViewManagerCommand).not.toBeCalled();
  });

  it('dispatches sendAccessibilityEvent on Fabric nodes with the RN renderer', () => {
    nativeFabricUIManager.sendAccessibilityEvent.mockClear();
    const View = createReactNativeComponentClass('RCTView', () => ({
      validAttributes: {title: true},
      uiViewClassName: 'RCTView',
    }));

    const ref = React.createRef();

    ReactFabric.render(<View title="bar" ref={ref} />, 11);
    expect(nativeFabricUIManager.sendAccessibilityEvent).not.toBeCalled();
    ReactNative.sendAccessibilityEvent(ref.current, 'focus');
    expect(nativeFabricUIManager.sendAccessibilityEvent).toHaveBeenCalledTimes(
      1,
    );
    expect(nativeFabricUIManager.sendAccessibilityEvent).toHaveBeenCalledWith(
      expect.any(Object),
      'focus',
    );
    expect(UIManager.sendAccessibilityEvent).not.toBeCalled();
  });
});

describe('created with ReactNative called with ReactFabric', () => {
  beforeEach(() => {
    jest.resetModules();
    require('react-native/Libraries/ReactPrivate/InitializeNativeFabricUIManager');
    ReactFabric = require('react-native-renderer/fabric');
    jest.resetModules();
<<<<<<< HEAD
    UIManager = require('react-native/Libraries/ReactPrivate/ReactNativePrivateInterface')
      .UIManager;
=======
    UIManager =
      require('react-native/Libraries/ReactPrivate/ReactNativePrivateInterface').UIManager;
>>>>>>> remotes/upstream/main
    jest.mock('shared/ReactFeatureFlags', () =>
      require('shared/forks/ReactFeatureFlags.native-oss'),
    );
    ReactNative = require('react-native-renderer');

    React = require('react');
<<<<<<< HEAD
    createReactNativeComponentClass = require('react-native/Libraries/ReactPrivate/ReactNativePrivateInterface')
      .ReactNativeViewConfigRegistry.register;
=======
    createReactNativeComponentClass =
      require('react-native/Libraries/ReactPrivate/ReactNativePrivateInterface')
        .ReactNativeViewConfigRegistry.register;
>>>>>>> remotes/upstream/main
  });

  it('find Paper instances with the Fabric renderer', () => {
    const View = createReactNativeComponentClass('RCTView', () => ({
      validAttributes: {title: true},
      uiViewClassName: 'RCTView',
    }));

    const ref = React.createRef();

    class Component extends React.Component {
      render() {
        return <View title="foo" />;
      }
    }

    ReactNative.render(<Component ref={ref} />, 11);

    const instance = ReactFabric.findHostInstance_DEPRECATED(ref.current);
    expect(instance._nativeTag).toBe(3);
  });

  it('find Paper nodes with the Fabric renderer', () => {
    const View = createReactNativeComponentClass('RCTView', () => ({
      validAttributes: {title: true},
      uiViewClassName: 'RCTView',
    }));

    const ref = React.createRef();

    class Component extends React.Component {
      render() {
        return <View title="foo" />;
      }
    }

    ReactNative.render(<Component ref={ref} />, 11);

    const handle = ReactFabric.findNodeHandle(ref.current);
    expect(handle).toBe(3);
  });

  it('dispatches commands on Paper nodes with the Fabric renderer', () => {
    UIManager.dispatchViewManagerCommand.mockReset();
    const View = createReactNativeComponentClass('RCTView', () => ({
      validAttributes: {title: true},
      uiViewClassName: 'RCTView',
    }));

    const ref = React.createRef();

    ReactNative.render(<View title="bar" ref={ref} />, 11);
    expect(UIManager.dispatchViewManagerCommand).not.toBeCalled();
    ReactFabric.dispatchCommand(ref.current, 'myCommand', [10, 20]);
    expect(UIManager.dispatchViewManagerCommand).toHaveBeenCalledTimes(1);
<<<<<<< HEAD
    expect(
      UIManager.dispatchViewManagerCommand,
    ).toHaveBeenCalledWith(expect.any(Number), 'myCommand', [10, 20]);
=======
    expect(UIManager.dispatchViewManagerCommand).toHaveBeenCalledWith(
      expect.any(Number),
      'myCommand',
      [10, 20],
    );
>>>>>>> remotes/upstream/main

    expect(nativeFabricUIManager.dispatchCommand).not.toBeCalled();
  });

  it('dispatches sendAccessibilityEvent on Paper nodes with the Fabric renderer', () => {
    ReactNativePrivateInterface.legacySendAccessibilityEvent.mockReset();
    const View = createReactNativeComponentClass('RCTView', () => ({
      validAttributes: {title: true},
      uiViewClassName: 'RCTView',
    }));

    const ref = React.createRef();

    ReactNative.render(<View title="bar" ref={ref} />, 11);
    expect(
      ReactNativePrivateInterface.legacySendAccessibilityEvent,
    ).not.toBeCalled();
    ReactFabric.sendAccessibilityEvent(ref.current, 'focus');
    expect(
      ReactNativePrivateInterface.legacySendAccessibilityEvent,
    ).toHaveBeenCalledTimes(1);
    expect(
      ReactNativePrivateInterface.legacySendAccessibilityEvent,
    ).toHaveBeenCalledWith(expect.any(Number), 'focus');

    expect(nativeFabricUIManager.sendAccessibilityEvent).not.toBeCalled();
  });
});
