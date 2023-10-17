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

/* eslint-disable no-func-assign */

'use strict';

let React;
let ReactNoop;
let Scheduler;
let act;
let useEffect;
let useLayoutEffect;
<<<<<<< HEAD

describe('ReactHooksWithNoopRenderer', () => {
=======
let assertLog;

describe('ReactEffectOrdering', () => {
>>>>>>> remotes/upstream/main
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;
    useEffect = React.useEffect;
    useLayoutEffect = React.useLayoutEffect;
=======
    act = require('internal-test-utils').act;
    useEffect = React.useEffect;
    useLayoutEffect = React.useLayoutEffect;

    const InternalTestUtils = require('internal-test-utils');
    assertLog = InternalTestUtils.assertLog;
>>>>>>> remotes/upstream/main
  });

  test('layout unmounts on deletion are fired in parent -> child order', async () => {
    const root = ReactNoop.createRoot();

    function Parent() {
      useLayoutEffect(() => {
<<<<<<< HEAD
        return () => Scheduler.unstable_yieldValue('Unmount parent');
=======
        return () => Scheduler.log('Unmount parent');
>>>>>>> remotes/upstream/main
      });
      return <Child />;
    }

    function Child() {
      useLayoutEffect(() => {
<<<<<<< HEAD
        return () => Scheduler.unstable_yieldValue('Unmount child');
=======
        return () => Scheduler.log('Unmount child');
>>>>>>> remotes/upstream/main
      });
      return 'Child';
    }

<<<<<<< HEAD
    await act(async () => {
      root.render(<Parent />);
    });
    expect(root).toMatchRenderedOutput('Child');
    await act(async () => {
      root.render(null);
    });
    expect(Scheduler).toHaveYielded(['Unmount parent', 'Unmount child']);
=======
    await act(() => {
      root.render(<Parent />);
    });
    expect(root).toMatchRenderedOutput('Child');
    await act(() => {
      root.render(null);
    });
    assertLog(['Unmount parent', 'Unmount child']);
>>>>>>> remotes/upstream/main
  });

  test('passive unmounts on deletion are fired in parent -> child order', async () => {
    const root = ReactNoop.createRoot();

    function Parent() {
      useEffect(() => {
<<<<<<< HEAD
        return () => Scheduler.unstable_yieldValue('Unmount parent');
=======
        return () => Scheduler.log('Unmount parent');
>>>>>>> remotes/upstream/main
      });
      return <Child />;
    }

    function Child() {
      useEffect(() => {
<<<<<<< HEAD
        return () => Scheduler.unstable_yieldValue('Unmount child');
=======
        return () => Scheduler.log('Unmount child');
>>>>>>> remotes/upstream/main
      });
      return 'Child';
    }

<<<<<<< HEAD
    await act(async () => {
      root.render(<Parent />);
    });
    expect(root).toMatchRenderedOutput('Child');
    await act(async () => {
      root.render(null);
    });
    expect(Scheduler).toHaveYielded(['Unmount parent', 'Unmount child']);
=======
    await act(() => {
      root.render(<Parent />);
    });
    expect(root).toMatchRenderedOutput('Child');
    await act(() => {
      root.render(null);
    });
    assertLog(['Unmount parent', 'Unmount child']);
>>>>>>> remotes/upstream/main
  });
});
