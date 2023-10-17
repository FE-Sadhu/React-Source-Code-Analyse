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
let ReactNoop;
let Scheduler;
let ContinuousEventPriority;
let act;
<<<<<<< HEAD

describe('ReactIncrementalUpdates', () => {
  beforeEach(() => {
    jest.resetModuleRegistry();
=======
let waitForAll;
let waitFor;
let assertLog;

describe('ReactIncrementalUpdates', () => {
  beforeEach(() => {
    jest.resetModules();
>>>>>>> remotes/upstream/main

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;
    ContinuousEventPriority = require('react-reconciler/constants')
      .ContinuousEventPriority;
  });

  function span(prop) {
    return {type: 'span', children: [], prop, hidden: false};
  }

  function flushNextRenderIfExpired() {
    // This will start rendering the next level of work. If the work hasn't
    // expired yet, React will exit without doing anything. If it has expired,
    // it will schedule a sync task.
    Scheduler.unstable_flushExpired();
    // Flush the sync task.
    ReactNoop.flushSync();
  }

  it('applies updates in order of priority', () => {
=======
    act = require('internal-test-utils').act;
    ContinuousEventPriority =
      require('react-reconciler/constants').ContinuousEventPriority;

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitFor = InternalTestUtils.waitFor;
    assertLog = InternalTestUtils.assertLog;
  });

  function Text({text}) {
    Scheduler.log(text);
    return text;
  }

  it('applies updates in order of priority', async () => {
>>>>>>> remotes/upstream/main
    let state;
    class Foo extends React.Component {
      state = {};
      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('commit');
        ReactNoop.deferredUpdates(() => {
=======
        Scheduler.log('commit');
        React.startTransition(() => {
>>>>>>> remotes/upstream/main
          // Has low priority
          this.setState({b: 'b'});
          this.setState({c: 'c'});
        });
        // Has Task priority
        this.setState({a: 'a'});
      }
      render() {
        state = this.state;
        return <div />;
      }
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough(['commit']);

    expect(state).toEqual({a: 'a'});
    expect(Scheduler).toFlushWithoutYielding();
    expect(state).toEqual({a: 'a', b: 'b', c: 'c'});
  });

  it('applies updates with equal priority in insertion order', () => {
=======
    await waitFor(['commit']);

    expect(state).toEqual({a: 'a'});
    await waitForAll([]);
    expect(state).toEqual({a: 'a', b: 'b', c: 'c'});
  });

  it('applies updates with equal priority in insertion order', async () => {
>>>>>>> remotes/upstream/main
    let state;
    class Foo extends React.Component {
      state = {};
      componentDidMount() {
        // All have Task priority
        this.setState({a: 'a'});
        this.setState({b: 'b'});
        this.setState({c: 'c'});
      }
      render() {
        state = this.state;
        return <div />;
      }
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(state).toEqual({a: 'a', b: 'b', c: 'c'});
  });

  it('only drops updates with equal or lesser priority when replaceState is called', () => {
=======
    await waitForAll([]);
    expect(state).toEqual({a: 'a', b: 'b', c: 'c'});
  });

  it('only drops updates with equal or lesser priority when replaceState is called', async () => {
>>>>>>> remotes/upstream/main
    let instance;
    class Foo extends React.Component {
      state = {};
      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('componentDidMount');
      }
      componentDidUpdate() {
        Scheduler.unstable_yieldValue('componentDidUpdate');
      }
      render() {
        Scheduler.unstable_yieldValue('render');
=======
        Scheduler.log('componentDidMount');
      }
      componentDidUpdate() {
        Scheduler.log('componentDidUpdate');
      }
      render() {
        Scheduler.log('render');
>>>>>>> remotes/upstream/main
        instance = this;
        return <div />;
      }
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['render', 'componentDidMount']);

    ReactNoop.flushSync(() => {
      ReactNoop.deferredUpdates(() => {
=======
    await waitForAll(['render', 'componentDidMount']);

    ReactNoop.flushSync(() => {
      React.startTransition(() => {
>>>>>>> remotes/upstream/main
        instance.setState({x: 'x'});
        instance.setState({y: 'y'});
      });
      instance.setState({a: 'a'});
      instance.setState({b: 'b'});
<<<<<<< HEAD
      ReactNoop.deferredUpdates(() => {
=======
      React.startTransition(() => {
>>>>>>> remotes/upstream/main
        instance.updater.enqueueReplaceState(instance, {c: 'c'});
        instance.setState({d: 'd'});
      });
    });

    // Even though a replaceState has been already scheduled, it hasn't been
    // flushed yet because it has async priority.
    expect(instance.state).toEqual({a: 'a', b: 'b'});
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['render', 'componentDidUpdate']);

    expect(Scheduler).toFlushAndYield(['render', 'componentDidUpdate']);
=======
    assertLog(['render', 'componentDidUpdate']);

    await waitForAll(['render', 'componentDidUpdate']);
>>>>>>> remotes/upstream/main
    // Now the rest of the updates are flushed, including the replaceState.
    expect(instance.state).toEqual({c: 'c', d: 'd'});
  });

<<<<<<< HEAD
  it('can abort an update, schedule additional updates, and resume', () => {
=======
  it('can abort an update, schedule additional updates, and resume', async () => {
>>>>>>> remotes/upstream/main
    let instance;
    class Foo extends React.Component {
      state = {};
      render() {
        instance = this;
<<<<<<< HEAD
        return (
          <span
            prop={Object.keys(this.state)
              .sort()
              .join('')}
          />
        );
=======
        return <span prop={Object.keys(this.state).sort().join('')} />;
>>>>>>> remotes/upstream/main
      }
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    function createUpdate(letter) {
      return () => {
        Scheduler.unstable_yieldValue(letter);
=======
    await waitForAll([]);

    function createUpdate(letter) {
      return () => {
        Scheduler.log(letter);
>>>>>>> remotes/upstream/main
        return {
          [letter]: letter,
        };
      };
    }

    // Schedule some async updates
<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
=======
    if (
      gate(
        flags =>
          !flags.forceConcurrentByDefaultForTesting ||
          flags.enableUnifiedSyncLane,
      )
    ) {
>>>>>>> remotes/upstream/main
      React.startTransition(() => {
        instance.setState(createUpdate('a'));
        instance.setState(createUpdate('b'));
        instance.setState(createUpdate('c'));
      });
    } else {
      instance.setState(createUpdate('a'));
      instance.setState(createUpdate('b'));
      instance.setState(createUpdate('c'));
    }

    // Begin the updates but don't flush them yet
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough(['a', 'b', 'c']);
    expect(ReactNoop.getChildren()).toEqual([span('')]);

    // Schedule some more updates at different priorities
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      instance.setState(createUpdate('d'));
      ReactNoop.flushSync(() => {
        instance.setState(createUpdate('e'));
        instance.setState(createUpdate('f'));
      });
      React.startTransition(() => {
        instance.setState(createUpdate('g'));
      });

      // The sync updates should have flushed, but not the async ones
      expect(Scheduler).toHaveYielded(['e', 'f']);
      expect(ReactNoop.getChildren()).toEqual([span('ef')]);

      // Now flush the remaining work. Even though e and f were already processed,
      // they should be processed again, to ensure that the terminal state
      // is deterministic.
      expect(Scheduler).toFlushAndYield([
=======
    await waitFor(['a', 'b', 'c']);
    expect(ReactNoop).toMatchRenderedOutput(<span prop="" />);

    // Schedule some more updates at different priorities
    instance.setState(createUpdate('d'));
    ReactNoop.flushSync(() => {
      instance.setState(createUpdate('e'));
      instance.setState(createUpdate('f'));
    });
    React.startTransition(() => {
      instance.setState(createUpdate('g'));
    });

    // The sync updates should have flushed, but not the async ones.
    if (
      gate(
        flags =>
          !flags.forceConcurrentByDefaultForTesting &&
          flags.enableUnifiedSyncLane,
      )
    ) {
      assertLog(['d', 'e', 'f']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="def" />);
    } else {
      // Update d was dropped and replaced by e.
      assertLog(['e', 'f']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="ef" />);
    }

    // Now flush the remaining work. Even though e and f were already processed,
    // they should be processed again, to ensure that the terminal state
    // is deterministic.
    if (
      gate(
        flags =>
          !flags.forceConcurrentByDefaultForTesting &&
          !flags.enableUnifiedSyncLane,
      )
    ) {
      await waitForAll([
>>>>>>> remotes/upstream/main
        // Since 'g' is in a transition, we'll process 'd' separately first.
        // That causes us to process 'd' with 'e' and 'f' rebased.
        'd',
        'e',
        'f',
        // Then we'll re-process everything for 'g'.
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span('abcdefg')]);
    } else {
      instance.setState(createUpdate('d'));
      ReactNoop.flushSync(() => {
        instance.setState(createUpdate('e'));
        instance.setState(createUpdate('f'));
      });
      instance.setState(createUpdate('g'));

      // The sync updates should have flushed, but not the async ones
      expect(Scheduler).toHaveYielded(['e', 'f']);
      expect(ReactNoop.getChildren()).toEqual([span('ef')]);

      // Now flush the remaining work. Even though e and f were already processed,
      // they should be processed again, to ensure that the terminal state
      // is deterministic.
      expect(Scheduler).toFlushAndYield(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
      expect(ReactNoop.getChildren()).toEqual([span('abcdefg')]);
    }
  });

  it('can abort an update, schedule a replaceState, and resume', () => {
=======
    } else {
      await waitForAll([
        // Then we'll re-process everything for 'g'.
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
      ]);
    }
    expect(ReactNoop).toMatchRenderedOutput(<span prop="abcdefg" />);
  });

  it('can abort an update, schedule a replaceState, and resume', async () => {
>>>>>>> remotes/upstream/main
    let instance;
    class Foo extends React.Component {
      state = {};
      render() {
        instance = this;
<<<<<<< HEAD
        return (
          <span
            prop={Object.keys(this.state)
              .sort()
              .join('')}
          />
        );
=======
        return <span prop={Object.keys(this.state).sort().join('')} />;
>>>>>>> remotes/upstream/main
      }
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    function createUpdate(letter) {
      return () => {
        Scheduler.unstable_yieldValue(letter);
=======
    await waitForAll([]);

    function createUpdate(letter) {
      return () => {
        Scheduler.log(letter);
>>>>>>> remotes/upstream/main
        return {
          [letter]: letter,
        };
      };
    }

    // Schedule some async updates
<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
=======
    if (
      gate(
        flags =>
          !flags.forceConcurrentByDefaultForTesting ||
          flags.enableUnifiedSyncLane,
      )
    ) {
>>>>>>> remotes/upstream/main
      React.startTransition(() => {
        instance.setState(createUpdate('a'));
        instance.setState(createUpdate('b'));
        instance.setState(createUpdate('c'));
      });
    } else {
      instance.setState(createUpdate('a'));
      instance.setState(createUpdate('b'));
      instance.setState(createUpdate('c'));
    }

    // Begin the updates but don't flush them yet
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough(['a', 'b', 'c']);
    expect(ReactNoop.getChildren()).toEqual([span('')]);

    // Schedule some more updates at different priorities
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      instance.setState(createUpdate('d'));

      ReactNoop.flushSync(() => {
        instance.setState(createUpdate('e'));
        // No longer a public API, but we can test that it works internally by
        // reaching into the updater.
        instance.updater.enqueueReplaceState(instance, createUpdate('f'));
      });
      React.startTransition(() => {
        instance.setState(createUpdate('g'));
      });

      // The sync updates should have flushed, but not the async ones.
      expect(Scheduler).toHaveYielded(['e', 'f']);
      expect(ReactNoop.getChildren()).toEqual([span('f')]);

      // Now flush the remaining work. Even though e and f were already processed,
      // they should be processed again, to ensure that the terminal state
      // is deterministic.
      expect(Scheduler).toFlushAndYield([
=======
    await waitFor(['a', 'b', 'c']);
    expect(ReactNoop).toMatchRenderedOutput(<span prop="" />);

    // Schedule some more updates at different priorities
    instance.setState(createUpdate('d'));

    ReactNoop.flushSync(() => {
      instance.setState(createUpdate('e'));
      // No longer a public API, but we can test that it works internally by
      // reaching into the updater.
      instance.updater.enqueueReplaceState(instance, createUpdate('f'));
    });
    React.startTransition(() => {
      instance.setState(createUpdate('g'));
    });

    // The sync updates should have flushed, but not the async ones.
    if (
      gate(
        flags =>
          !flags.forceConcurrentByDefaultForTesting &&
          flags.enableUnifiedSyncLane,
      )
    ) {
      assertLog(['d', 'e', 'f']);
    } else {
      // Update d was dropped and replaced by e.
      assertLog(['e', 'f']);
    }
    expect(ReactNoop).toMatchRenderedOutput(<span prop="f" />);

    // Now flush the remaining work. Even though e and f were already processed,
    // they should be processed again, to ensure that the terminal state
    // is deterministic.
    if (
      gate(
        flags =>
          !flags.forceConcurrentByDefaultForTesting &&
          !flags.enableUnifiedSyncLane,
      )
    ) {
      await waitForAll([
>>>>>>> remotes/upstream/main
        // Since 'g' is in a transition, we'll process 'd' separately first.
        // That causes us to process 'd' with 'e' and 'f' rebased.
        'd',
        'e',
        'f',
        // Then we'll re-process everything for 'g'.
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span('fg')]);
    } else {
      instance.setState(createUpdate('d'));
      ReactNoop.flushSync(() => {
        instance.setState(createUpdate('e'));
        // No longer a public API, but we can test that it works internally by
        // reaching into the updater.
        instance.updater.enqueueReplaceState(instance, createUpdate('f'));
      });
      instance.setState(createUpdate('g'));

      // The sync updates should have flushed, but not the async ones. Update d
      // was dropped and replaced by e.
      expect(Scheduler).toHaveYielded(['e', 'f']);
      expect(ReactNoop.getChildren()).toEqual([span('f')]);

      // Now flush the remaining work. Even though e and f were already processed,
      // they should be processed again, to ensure that the terminal state
      // is deterministic.
      expect(Scheduler).toFlushAndYield(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
      expect(ReactNoop.getChildren()).toEqual([span('fg')]);
    }
  });

  it('passes accumulation of previous updates to replaceState updater function', () => {
=======
    } else {
      await waitForAll([
        // Then we'll re-process everything for 'g'.
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
      ]);
    }
    expect(ReactNoop).toMatchRenderedOutput(<span prop="fg" />);
  });

  it('passes accumulation of previous updates to replaceState updater function', async () => {
>>>>>>> remotes/upstream/main
    let instance;
    class Foo extends React.Component {
      state = {};
      render() {
        instance = this;
        return <span />;
      }
    }
    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    instance.setState({a: 'a'});
    instance.setState({b: 'b'});
    // No longer a public API, but we can test that it works internally by
    // reaching into the updater.
    instance.updater.enqueueReplaceState(instance, previousState => ({
      previousState,
    }));
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(instance.state).toEqual({previousState: {a: 'a', b: 'b'}});
  });

  it('does not call callbacks that are scheduled by another callback until a later commit', () => {
    class Foo extends React.Component {
      state = {};
      componentDidMount() {
        Scheduler.unstable_yieldValue('did mount');
        this.setState({a: 'a'}, () => {
          Scheduler.unstable_yieldValue('callback a');
          this.setState({b: 'b'}, () => {
            Scheduler.unstable_yieldValue('callback b');
=======
    await waitForAll([]);
    expect(instance.state).toEqual({previousState: {a: 'a', b: 'b'}});
  });

  it('does not call callbacks that are scheduled by another callback until a later commit', async () => {
    class Foo extends React.Component {
      state = {};
      componentDidMount() {
        Scheduler.log('did mount');
        this.setState({a: 'a'}, () => {
          Scheduler.log('callback a');
          this.setState({b: 'b'}, () => {
            Scheduler.log('callback b');
>>>>>>> remotes/upstream/main
          });
        });
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('render');
=======
        Scheduler.log('render');
>>>>>>> remotes/upstream/main
        return <div />;
      }
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'render',
      'did mount',
      'render',
      'callback a',
      'render',
      'callback b',
    ]);
  });

<<<<<<< HEAD
  it('gives setState during reconciliation the same priority as whatever level is currently reconciling', () => {
=======
  it('gives setState during reconciliation the same priority as whatever level is currently reconciling', async () => {
>>>>>>> remotes/upstream/main
    let instance;

    class Foo extends React.Component {
      state = {};
      UNSAFE_componentWillReceiveProps() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('componentWillReceiveProps');
        this.setState({b: 'b'});
      }
      render() {
        Scheduler.unstable_yieldValue('render');
=======
        Scheduler.log('componentWillReceiveProps');
        this.setState({b: 'b'});
      }
      render() {
        Scheduler.log('render');
>>>>>>> remotes/upstream/main
        instance = this;
        return <div />;
      }
    }
    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['render']);
=======
    await waitForAll(['render']);
>>>>>>> remotes/upstream/main

    ReactNoop.flushSync(() => {
      instance.setState({a: 'a'});

      ReactNoop.render(<Foo />); // Trigger componentWillReceiveProps
    });

    expect(instance.state).toEqual({a: 'a', b: 'b'});

<<<<<<< HEAD
    if (gate(flags => flags.deferRenderPhaseUpdateToNextBatch)) {
      expect(Scheduler).toHaveYielded([
        'componentWillReceiveProps',
        'render',
        'render',
      ]);
    } else {
      expect(Scheduler).toHaveYielded(['componentWillReceiveProps', 'render']);
    }
  });

  it('updates triggered from inside a class setState updater', () => {
=======
    assertLog(['componentWillReceiveProps', 'render']);
  });

  it('updates triggered from inside a class setState updater', async () => {
>>>>>>> remotes/upstream/main
    let instance;
    class Foo extends React.Component {
      state = {};
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('render');
=======
        Scheduler.log('render');
>>>>>>> remotes/upstream/main
        instance = this;
        return <div />;
      }
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      // Initial render
      'render',
    ]);

    instance.setState(function a() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('setState updater');
=======
      Scheduler.log('setState updater');
>>>>>>> remotes/upstream/main
      this.setState({b: 'b'});
      return {a: 'a'};
    });

<<<<<<< HEAD
    expect(() =>
      expect(Scheduler).toFlushAndYield(
        gate(flags =>
          flags.deferRenderPhaseUpdateToNextBatch
            ? [
                'setState updater',
                // In the new reconciler, updates inside the render phase are
                // treated as if they came from an event, so the update gets
                // shifted to a subsequent render.
                'render',
                'render',
              ]
            : [
                'setState updater',
                // In the old reconciler, updates in the render phase receive
                // the currently rendering expiration time, so the update
                // flushes immediately in the same render.
                'render',
              ],
        ),
      ),
=======
    await expect(
      async () =>
        await waitForAll([
          'setState updater',
          // Updates in the render phase receive the currently rendering
          // lane, so the update flushes immediately in the same render.
          'render',
        ]),
>>>>>>> remotes/upstream/main
    ).toErrorDev(
      'An update (setState, replaceState, or forceUpdate) was scheduled ' +
        'from inside an update function. Update functions should be pure, ' +
        'with zero side-effects. Consider using componentDidUpdate or a ' +
<<<<<<< HEAD
        'callback.',
=======
        'callback.\n\nPlease update the following component: Foo',
>>>>>>> remotes/upstream/main
    );
    expect(instance.state).toEqual({a: 'a', b: 'b'});

    // Test deduplication (no additional warnings expected)
    instance.setState(function a() {
      this.setState({a: 'a'});
      return {b: 'b'};
    });
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(
      gate(flags =>
        flags.deferRenderPhaseUpdateToNextBatch
          ? // In the new reconciler, updates inside the render phase are
            // treated as if they came from an event, so the update gets shifted
            // to a subsequent render.
            ['render', 'render']
          : // In the old reconciler, updates in the render phase receive
            // the currently rendering expiration time, so the update flushes
            // immediately in the same render.
            ['render'],
=======
    await waitForAll(
      gate(flags =>
        // Updates in the render phase receive the currently rendering
        // lane, so the update flushes immediately in the same render.
        ['render'],
>>>>>>> remotes/upstream/main
      ),
    );
  });

  it('getDerivedStateFromProps should update base state of updateQueue (based on product bug)', () => {
    // Based on real-world bug.

    let foo;
    class Foo extends React.Component {
      state = {value: 'initial state'};
      static getDerivedStateFromProps() {
        return {value: 'derived state'};
      }
      render() {
        foo = this;
        return (
          <>
            <span prop={this.state.value} />
            <Bar />
          </>
        );
      }
    }

    let bar;
    class Bar extends React.Component {
      render() {
        bar = this;
        return null;
      }
    }

    ReactNoop.flushSync(() => {
      ReactNoop.render(<Foo />);
    });
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('derived state')]);
=======
    expect(ReactNoop).toMatchRenderedOutput(<span prop="derived state" />);
>>>>>>> remotes/upstream/main

    ReactNoop.flushSync(() => {
      // Triggers getDerivedStateFromProps again
      ReactNoop.render(<Foo />);
      // The noop callback is needed to trigger the specific internal path that
      // led to this bug. Removing it causes it to "accidentally" work.
      foo.setState({value: 'update state'}, function noop() {});
    });
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('derived state')]);
=======
    expect(ReactNoop).toMatchRenderedOutput(<span prop="derived state" />);
>>>>>>> remotes/upstream/main

    ReactNoop.flushSync(() => {
      bar.setState({});
    });
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('derived state')]);
  });

  it('regression: does not expire soon due to layout effects in the last batch', () => {
=======
    expect(ReactNoop).toMatchRenderedOutput(<span prop="derived state" />);
  });

  it('regression: does not expire soon due to layout effects in the last batch', async () => {
>>>>>>> remotes/upstream/main
    const {useState, useLayoutEffect} = React;

    let setCount;
    function App() {
      const [count, _setCount] = useState(0);
      setCount = _setCount;
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Render: ' + count);
      useLayoutEffect(() => {
        setCount(prevCount => prevCount + 1);
        Scheduler.unstable_yieldValue('Commit: ' + count);
      }, []);
      return null;
    }

    act(() => {
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          ReactNoop.render(<App />);
        });
      } else {
        ReactNoop.render(<App />);
      }
      flushNextRenderIfExpired();
      expect(Scheduler).toHaveYielded([]);
      expect(Scheduler).toFlushAndYield([
        'Render: 0',
        'Commit: 0',
        'Render: 1',
      ]);

      Scheduler.unstable_advanceTime(10000);
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          setCount(2);
        });
      } else {
        setCount(2);
      }
      flushNextRenderIfExpired();
      expect(Scheduler).toHaveYielded([]);
    });
  });

  it('regression: does not expire soon due to previous flushSync', () => {
    function Text({text}) {
      Scheduler.unstable_yieldValue(text);
      return text;
    }

    ReactNoop.flushSync(() => {
      ReactNoop.render(<Text text="A" />);
    });
    expect(Scheduler).toHaveYielded(['A']);

    Scheduler.unstable_advanceTime(10000);

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Text text="B" />);
      });
    } else {
      ReactNoop.render(<Text text="B" />);
    }
    flushNextRenderIfExpired();
    expect(Scheduler).toHaveYielded([]);
  });

  it('regression: does not expire soon due to previous expired work', () => {
    function Text({text}) {
      Scheduler.unstable_yieldValue(text);
      return text;
    }

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Text text="A" />);
      });
    } else {
      ReactNoop.render(<Text text="A" />);
    }
    Scheduler.unstable_advanceTime(10000);
    flushNextRenderIfExpired();
    expect(Scheduler).toHaveYielded(['A']);

    Scheduler.unstable_advanceTime(10000);

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Text text="B" />);
      });
    } else {
      ReactNoop.render(<Text text="B" />);
    }
    flushNextRenderIfExpired();
    expect(Scheduler).toHaveYielded([]);
=======
      Scheduler.log('Render: ' + count);
      useLayoutEffect(() => {
        setCount(1);
        Scheduler.log('Commit: ' + count);
      }, []);
      return <Text text="Child" />;
    }

    await act(async () => {
      React.startTransition(() => {
        ReactNoop.render(<App />);
      });
      assertLog([]);
      await waitForAll([
        'Render: 0',
        'Child',
        'Commit: 0',
        'Render: 1',
        'Child',
      ]);

      Scheduler.unstable_advanceTime(10000);
      React.startTransition(() => {
        setCount(2);
      });
      // The transition should not have expired, so we should be able to
      // partially render it.
      await waitFor(['Render: 2']);
      // Now do the rest
      await waitForAll(['Child']);
    });
  });

  it('regression: does not expire soon due to previous flushSync', async () => {
    ReactNoop.flushSync(() => {
      ReactNoop.render(<Text text="A" />);
    });
    assertLog(['A']);

    Scheduler.unstable_advanceTime(10000);

    React.startTransition(() => {
      ReactNoop.render(
        <>
          <Text text="A" />
          <Text text="B" />
          <Text text="C" />
          <Text text="D" />
        </>,
      );
    });
    // The transition should not have expired, so we should be able to
    // partially render it.
    await waitFor(['A']);
    await waitFor(['B']);
    await waitForAll(['C', 'D']);
  });

  it('regression: does not expire soon due to previous expired work', async () => {
    React.startTransition(() => {
      ReactNoop.render(
        <>
          <Text text="A" />
          <Text text="B" />
          <Text text="C" />
          <Text text="D" />
        </>,
      );
    });

    await waitFor(['A']);
    // This will expire the rest of the update
    Scheduler.unstable_advanceTime(10000);
    await waitFor(['B'], {
      additionalLogsAfterAttemptingToYield: ['C', 'D'],
    });

    Scheduler.unstable_advanceTime(10000);

    // Now do another transition. This one should not expire.
    React.startTransition(() => {
      ReactNoop.render(
        <>
          <Text text="A" />
          <Text text="B" />
          <Text text="C" />
          <Text text="D" />
        </>,
      );
    });

    // The transition should not have expired, so we should be able to
    // partially render it.
    await waitFor(['A']);
    await waitFor(['B']);
    await waitForAll(['C', 'D']);
>>>>>>> remotes/upstream/main
  });

  it('when rebasing, does not exclude updates that were already committed, regardless of priority', async () => {
    const {useState, useLayoutEffect} = React;

    let pushToLog;
    function App() {
      const [log, setLog] = useState('');
      pushToLog = msg => {
        setLog(prevLog => prevLog + msg);
      };

      useLayoutEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Committed: ' + log);
=======
        Scheduler.log('Committed: ' + log);
>>>>>>> remotes/upstream/main
        if (log === 'B') {
          // Right after B commits, schedule additional updates.
          ReactNoop.unstable_runWithPriority(ContinuousEventPriority, () =>
            pushToLog('C'),
          );
          setLog(prevLog => prevLog + 'D');
        }
      }, [log]);

      return log;
    }

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
      root.render(<App />);
    });
    expect(Scheduler).toHaveYielded(['Committed: ']);
    expect(root).toMatchRenderedOutput(null);

    await act(async () => {
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          pushToLog('A');
        });
      } else {
        pushToLog('A');
      }
=======
    await act(() => {
      root.render(<App />);
    });
    assertLog(['Committed: ']);
    expect(root).toMatchRenderedOutput(null);

    await act(() => {
      React.startTransition(() => {
        pushToLog('A');
      });
>>>>>>> remotes/upstream/main

      ReactNoop.unstable_runWithPriority(ContinuousEventPriority, () =>
        pushToLog('B'),
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      // A and B are pending. B is higher priority, so we'll render that first.
      'Committed: B',
      // Because A comes first in the queue, we're now in rebase mode. B must
      // be rebased on top of A. Also, in a layout effect, we received two new
      // updates: C and D. C is user-blocking and D is synchronous.
      //
      // First render the synchronous update. What we're testing here is that
      // B *is not dropped* even though it has lower than sync priority. That's
      // because we already committed it. However, this render should not
      // include C, because that update wasn't already committed.
      'Committed: BD',
      'Committed: BCD',
      'Committed: ABCD',
    ]);
=======
    if (gate(flags => flags.enableUnifiedSyncLane)) {
      assertLog(['Committed: B', 'Committed: BCD', 'Committed: ABCD']);
    } else {
      assertLog([
        // A and B are pending. B is higher priority, so we'll render that first.
        'Committed: B',
        // Because A comes first in the queue, we're now in rebase mode. B must
        // be rebased on top of A. Also, in a layout effect, we received two new
        // updates: C and D. C is user-blocking and D is synchronous.
        //
        // First render the synchronous update. What we're testing here is that
        // B *is not dropped* even though it has lower than sync priority. That's
        // because we already committed it. However, this render should not
        // include C, because that update wasn't already committed.
        'Committed: BD',
        'Committed: BCD',
        'Committed: ABCD',
      ]);
    }
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('ABCD');
  });

  it('when rebasing, does not exclude updates that were already committed, regardless of priority (classes)', async () => {
    let pushToLog;
    class App extends React.Component {
      state = {log: ''};
      pushToLog = msg => {
        this.setState(prevState => ({log: prevState.log + msg}));
      };
      componentDidUpdate() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Committed: ' + this.state.log);
=======
        Scheduler.log('Committed: ' + this.state.log);
>>>>>>> remotes/upstream/main
        if (this.state.log === 'B') {
          // Right after B commits, schedule additional updates.
          ReactNoop.unstable_runWithPriority(ContinuousEventPriority, () =>
            this.pushToLog('C'),
          );
          this.pushToLog('D');
        }
      }
      render() {
        pushToLog = this.pushToLog;
        return this.state.log;
      }
    }

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
      root.render(<App />);
    });
    expect(Scheduler).toHaveYielded([]);
    expect(root).toMatchRenderedOutput(null);

    await act(async () => {
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          pushToLog('A');
        });
      } else {
        pushToLog('A');
      }
=======
    await act(() => {
      root.render(<App />);
    });
    assertLog([]);
    expect(root).toMatchRenderedOutput(null);

    await act(() => {
      React.startTransition(() => {
        pushToLog('A');
      });
>>>>>>> remotes/upstream/main
      ReactNoop.unstable_runWithPriority(ContinuousEventPriority, () =>
        pushToLog('B'),
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      // A and B are pending. B is higher priority, so we'll render that first.
      'Committed: B',
      // Because A comes first in the queue, we're now in rebase mode. B must
      // be rebased on top of A. Also, in a layout effect, we received two new
      // updates: C and D. C is user-blocking and D is synchronous.
      //
      // First render the synchronous update. What we're testing here is that
      // B *is not dropped* even though it has lower than sync priority. That's
      // because we already committed it. However, this render should not
      // include C, because that update wasn't already committed.
      'Committed: BD',
      'Committed: BCD',
      'Committed: ABCD',
    ]);
=======
    if (gate(flags => flags.enableUnifiedSyncLane)) {
      assertLog(['Committed: B', 'Committed: BCD', 'Committed: ABCD']);
    } else {
      assertLog([
        // A and B are pending. B is higher priority, so we'll render that first.
        'Committed: B',
        // Because A comes first in the queue, we're now in rebase mode. B must
        // be rebased on top of A. Also, in a layout effect, we received two new
        // updates: C and D. C is user-blocking and D is synchronous.
        //
        // First render the synchronous update. What we're testing here is that
        // B *is not dropped* even though it has lower than sync priority. That's
        // because we already committed it. However, this render should not
        // include C, because that update wasn't already committed.
        'Committed: BD',
        'Committed: BCD',
        'Committed: ABCD',
      ]);
    }
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('ABCD');
  });

  it("base state of update queue is initialized to its fiber's memoized state", async () => {
    // This test is very weird because it tests an implementation detail but
    // is tested in terms of public APIs. When it was originally written, the
    // test failed because the update queue was initialized to the state of
    // the alternate fiber.
    let app;
    class App extends React.Component {
      state = {prevProp: 'A', count: 0};
      static getDerivedStateFromProps(props, state) {
        // Add 100 whenever the label prop changes. The prev label is stored
        // in state. If the state is dropped incorrectly, we'll fail to detect
        // prop changes.
        if (props.prop !== state.prevProp) {
          return {
            prevProp: props.prop,
            count: state.count + 100,
          };
        }
        return null;
      }
      render() {
        app = this;
        return this.state.count;
      }
    }

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<App prop="A" />);
    });
    expect(root).toMatchRenderedOutput('0');

    // Changing the prop causes the count to increase by 100
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<App prop="B" />);
    });
    expect(root).toMatchRenderedOutput('100');

    // Now increment the count by 1 with a state update. And, in the same
    // batch, change the prop back to its original value.
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<App prop="A" />);
      app.setState(state => ({count: state.count + 1}));
    });
    // There were two total prop changes, plus an increment.
    expect(root).toMatchRenderedOutput('201');
  });
});
