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
 */

'use strict';

let act;
let useSubscription;
let BehaviorSubject;
let React;
let ReactTestRenderer;
let Scheduler;
let ReplaySubject;
<<<<<<< HEAD
=======
let assertLog;
let waitForAll;
let waitFor;
>>>>>>> remotes/upstream/main

describe('useSubscription', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock('scheduler', () => require('scheduler/unstable_mock'));

    useSubscription = require('use-subscription').useSubscription;
    React = require('react');
    ReactTestRenderer = require('react-test-renderer');
    Scheduler = require('scheduler');

<<<<<<< HEAD
    act = require('jest-react').act;

    BehaviorSubject = require('rxjs').BehaviorSubject;
    ReplaySubject = require('rxjs').ReplaySubject;
=======
    act = require('internal-test-utils').act;

    BehaviorSubject = require('rxjs').BehaviorSubject;
    ReplaySubject = require('rxjs').ReplaySubject;

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    assertLog = InternalTestUtils.assertLog;
    waitFor = InternalTestUtils.waitFor;
>>>>>>> remotes/upstream/main
  });

  function createBehaviorSubject(initialValue) {
    const behaviorSubject = new BehaviorSubject();
    if (initialValue) {
      behaviorSubject.next(initialValue);
    }
    return behaviorSubject;
  }

  function createReplaySubject(initialValue) {
    const replaySubject = new ReplaySubject();
    if (initialValue) {
      replaySubject.next(initialValue);
    }
    return replaySubject;
  }

<<<<<<< HEAD
  it('supports basic subscription pattern', () => {
    function Child({value = 'default'}) {
      Scheduler.unstable_yieldValue(value);
=======
  it('supports basic subscription pattern', async () => {
    function Child({value = 'default'}) {
      Scheduler.log(value);
>>>>>>> remotes/upstream/main
      return null;
    }

    function Subscription({source}) {
      const value = useSubscription(
        React.useMemo(
          () => ({
            getCurrentValue: () => source.getValue(),
            subscribe: callback => {
              const subscription = source.subscribe(callback);
              return () => subscription.unsubscribe();
            },
          }),
          [source],
        ),
      );
      return <Child value={value} />;
    }

    const observable = createBehaviorSubject();
    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(
        <Subscription source={observable} />,
        {unstable_isConcurrent: true},
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['default']);

    // Updates while subscribed should re-render the child component
    act(() => observable.next(123));
    expect(Scheduler).toHaveYielded([123]);
    act(() => observable.next('abc'));
    expect(Scheduler).toHaveYielded(['abc']);

    // Unmounting the subscriber should remove listeners
    act(() => renderer.update(<div />));
    act(() => observable.next(456));
    expect(Scheduler).toFlushAndYield([]);
  });

  it('should support observable types like RxJS ReplaySubject', () => {
    function Child({value = 'default'}) {
      Scheduler.unstable_yieldValue(value);
=======
    assertLog(['default']);

    // Updates while subscribed should re-render the child component
    await act(() => observable.next(123));
    assertLog([123]);
    await act(() => observable.next('abc'));
    assertLog(['abc']);

    // Unmounting the subscriber should remove listeners
    await act(() => renderer.update(<div />));
    await act(() => observable.next(456));
    await waitForAll([]);
  });

  it('should support observable types like RxJS ReplaySubject', async () => {
    function Child({value = 'default'}) {
      Scheduler.log(value);
>>>>>>> remotes/upstream/main
      return null;
    }

    function Subscription({source}) {
      const value = useSubscription(
        React.useMemo(
          () => ({
            getCurrentValue: () => {
              let currentValue;
              source
                .subscribe(tempValue => {
                  currentValue = tempValue;
                })
                .unsubscribe();
              return currentValue;
            },
            subscribe: callback => {
              const subscription = source.subscribe(callback);
              return () => subscription.unsubscribe();
            },
          }),
          [source],
        ),
      );
      return <Child value={value} />;
    }

    let observable = createReplaySubject('initial');
    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(
        <Subscription source={observable} />,
        {unstable_isConcurrent: true},
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['initial']);
    act(() => observable.next('updated'));
    expect(Scheduler).toHaveYielded(['updated']);

    Scheduler.unstable_flushAll();

    // Unsetting the subscriber prop should reset subscribed values
    observable = createReplaySubject(undefined);
    act(() => renderer.update(<Subscription source={observable} />));
    expect(Scheduler).toHaveYielded(['default']);
  });

  it('should unsubscribe from old sources and subscribe to new sources when memoized props change', () => {
    function Child({value = 'default'}) {
      Scheduler.unstable_yieldValue(value);
=======
    assertLog(['initial']);
    await act(() => observable.next('updated'));
    assertLog(['updated']);

    await waitForAll([]);

    // Unsetting the subscriber prop should reset subscribed values
    observable = createReplaySubject(undefined);
    await act(() => renderer.update(<Subscription source={observable} />));
    assertLog(['default']);
  });

  it('should unsubscribe from old sources and subscribe to new sources when memoized props change', async () => {
    function Child({value = 'default'}) {
      Scheduler.log(value);
>>>>>>> remotes/upstream/main
      return null;
    }

    const subscriptions = [];

    function Subscription({source}) {
      const value = useSubscription(
        React.useMemo(
          () => ({
            getCurrentValue: () => source.getValue(),
            subscribe: callback => {
              subscriptions.push(source);
              const subscription = source.subscribe(callback);
              return () => subscription.unsubscribe();
            },
          }),
          [source],
        ),
      );
      return <Child value={value} />;
    }

    const observableA = createBehaviorSubject('a-0');
    const observableB = createBehaviorSubject('b-0');

    expect(subscriptions).toHaveLength(0);

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(
        <Subscription source={observableA} />,
        {unstable_isConcurrent: true},
      );
    });

    // Updates while subscribed should re-render the child component
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['a-0']);
=======
    assertLog(['a-0']);
>>>>>>> remotes/upstream/main
    expect(subscriptions).toHaveLength(1);
    expect(subscriptions[0]).toBe(observableA);

    // Unsetting the subscriber prop should reset subscribed values
<<<<<<< HEAD
    act(() => renderer.update(<Subscription source={observableB} />));

    expect(Scheduler).toHaveYielded(['b-0']);
=======
    await act(() => renderer.update(<Subscription source={observableB} />));

    assertLog(['b-0']);
>>>>>>> remotes/upstream/main
    expect(subscriptions).toHaveLength(2);
    expect(subscriptions[1]).toBe(observableB);

    // Updates to the old subscribable should not re-render the child component
<<<<<<< HEAD
    act(() => observableA.next('a-1'));
    expect(Scheduler).toFlushAndYield([]);

    // Updates to the bew subscribable should re-render the child component
    act(() => observableB.next('b-1'));
    expect(Scheduler).toHaveYielded(['b-1']);
=======
    await act(() => observableA.next('a-1'));
    await waitForAll([]);

    // Updates to the bew subscribable should re-render the child component
    await act(() => observableB.next('b-1'));
    assertLog(['b-1']);
>>>>>>> remotes/upstream/main

    expect(subscriptions).toHaveLength(2);
  });

<<<<<<< HEAD
  it('should unsubscribe from old sources and subscribe to new sources when useCallback functions change', () => {
    function Child({value = 'default'}) {
      Scheduler.unstable_yieldValue(value);
=======
  it('should unsubscribe from old sources and subscribe to new sources when useCallback functions change', async () => {
    function Child({value = 'default'}) {
      Scheduler.log(value);
>>>>>>> remotes/upstream/main
      return null;
    }

    const subscriptions = [];

    function Subscription({source}) {
      const value = useSubscription({
        getCurrentValue: React.useCallback(() => source.getValue(), [source]),
        subscribe: React.useCallback(
          callback => {
            subscriptions.push(source);
            const subscription = source.subscribe(callback);
            return () => subscription.unsubscribe();
          },
          [source],
        ),
      });
      return <Child value={value} />;
    }

    const observableA = createBehaviorSubject('a-0');
    const observableB = createBehaviorSubject('b-0');

    expect(subscriptions).toHaveLength(0);

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(
        <Subscription source={observableA} />,
        {unstable_isConcurrent: true},
      );
    });

    // Updates while subscribed should re-render the child component
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['a-0']);
=======
    assertLog(['a-0']);
>>>>>>> remotes/upstream/main
    expect(subscriptions).toHaveLength(1);
    expect(subscriptions[0]).toBe(observableA);

    // Unsetting the subscriber prop should reset subscribed values
<<<<<<< HEAD
    act(() => renderer.update(<Subscription source={observableB} />));
    expect(Scheduler).toHaveYielded(['b-0']);
=======
    await act(() => renderer.update(<Subscription source={observableB} />));
    assertLog(['b-0']);
>>>>>>> remotes/upstream/main
    expect(subscriptions).toHaveLength(2);
    expect(subscriptions[1]).toBe(observableB);

    // Updates to the old subscribable should not re-render the child component
<<<<<<< HEAD
    act(() => observableA.next('a-1'));
    expect(Scheduler).toFlushAndYield([]);

    // Updates to the bew subscribable should re-render the child component
    act(() => observableB.next('b-1'));
    expect(Scheduler).toHaveYielded(['b-1']);
=======
    await act(() => observableA.next('a-1'));
    await waitForAll([]);

    // Updates to the bew subscribable should re-render the child component
    await act(() => observableB.next('b-1'));
    assertLog(['b-1']);
>>>>>>> remotes/upstream/main

    expect(subscriptions).toHaveLength(2);
  });

<<<<<<< HEAD
  it('should ignore values emitted by a new subscribable until the commit phase', () => {
    const log = [];

    function Grandchild({value}) {
      Scheduler.unstable_yieldValue('Grandchild: ' + value);
=======
  it('should ignore values emitted by a new subscribable until the commit phase', async () => {
    const log = [];

    function Grandchild({value}) {
      Scheduler.log('Grandchild: ' + value);
>>>>>>> remotes/upstream/main
      return null;
    }

    function Child({value = 'default'}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Child: ' + value);
=======
      Scheduler.log('Child: ' + value);
>>>>>>> remotes/upstream/main
      return <Grandchild value={value} />;
    }

    function Subscription({source}) {
      const value = useSubscription(
        React.useMemo(
          () => ({
            getCurrentValue: () => source.getValue(),
            subscribe: callback => {
              const subscription = source.subscribe(callback);
              return () => subscription.unsubscribe();
            },
          }),
          [source],
        ),
      );
      return <Child value={value} />;
    }

    class Parent extends React.Component {
      state = {};

      static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.observed !== prevState.observed) {
          return {
            observed: nextProps.observed,
          };
        }

        return null;
      }

      componentDidMount() {
        log.push('Parent.componentDidMount');
      }

      componentDidUpdate() {
        log.push('Parent.componentDidUpdate');
      }

      render() {
        return <Subscription source={this.state.observed} />;
      }
    }

    const observableA = createBehaviorSubject('a-0');
    const observableB = createBehaviorSubject('b-0');

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(<Parent observed={observableA} />, {
        unstable_isConcurrent: true,
      });
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Child: a-0', 'Grandchild: a-0']);
    expect(log).toEqual(['Parent.componentDidMount']);

    // Start React update, but don't finish
    act(() => {
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          renderer.update(<Parent observed={observableB} />);
        });
      } else {
        renderer.update(<Parent observed={observableB} />);
      }

      expect(Scheduler).toFlushAndYieldThrough(['Child: b-0']);
=======
    assertLog(['Child: a-0', 'Grandchild: a-0']);
    expect(log).toEqual(['Parent.componentDidMount']);

    // Start React update, but don't finish
    await act(async () => {
      React.startTransition(() => {
        renderer.update(<Parent observed={observableB} />);
      });

      await waitFor(['Child: b-0']);
>>>>>>> remotes/upstream/main
      expect(log).toEqual(['Parent.componentDidMount']);

      // Emit some updates from the uncommitted subscribable
      observableB.next('b-1');
      observableB.next('b-2');
      observableB.next('b-3');
    });

    // Update again
<<<<<<< HEAD
    act(() => renderer.update(<Parent observed={observableA} />));
=======
    await act(() => renderer.update(<Parent observed={observableA} />));
>>>>>>> remotes/upstream/main

    // Flush everything and ensure that the correct subscribable is used
    // We expect the last emitted update to be rendered (because of the commit phase value check)
    // But the intermediate ones should be ignored,
    // And the final rendered output should be the higher-priority observable.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'Grandchild: b-0',
      'Child: b-3',
      'Grandchild: b-3',
      'Child: a-0',
      'Grandchild: a-0',
    ]);
    expect(log).toEqual([
      'Parent.componentDidMount',
      'Parent.componentDidUpdate',
      'Parent.componentDidUpdate',
    ]);
  });

<<<<<<< HEAD
  it('should not drop values emitted between updates', () => {
    const log = [];

    function Grandchild({value}) {
      Scheduler.unstable_yieldValue('Grandchild: ' + value);
=======
  it('should not drop values emitted between updates', async () => {
    const log = [];

    function Grandchild({value}) {
      Scheduler.log('Grandchild: ' + value);
>>>>>>> remotes/upstream/main
      return null;
    }

    function Child({value = 'default'}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Child: ' + value);
=======
      Scheduler.log('Child: ' + value);
>>>>>>> remotes/upstream/main
      return <Grandchild value={value} />;
    }

    function Subscription({source}) {
      const value = useSubscription(
        React.useMemo(
          () => ({
            getCurrentValue: () => source.getValue(),
            subscribe: callback => {
              const subscription = source.subscribe(callback);
              return () => subscription.unsubscribe();
            },
          }),
          [source],
        ),
      );
      return <Child value={value} />;
    }

    class Parent extends React.Component {
      state = {};

      static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.observed !== prevState.observed) {
          return {
            observed: nextProps.observed,
          };
        }

        return null;
      }

      componentDidMount() {
        log.push('Parent.componentDidMount:' + this.props.observed.value);
      }

      componentDidUpdate() {
        log.push('Parent.componentDidUpdate:' + this.props.observed.value);
      }

      render() {
        return <Subscription source={this.state.observed} />;
      }
    }

    const observableA = createBehaviorSubject('a-0');
    const observableB = createBehaviorSubject('b-0');

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(<Parent observed={observableA} />, {
        unstable_isConcurrent: true,
      });
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Child: a-0', 'Grandchild: a-0']);
=======
    assertLog(['Child: a-0', 'Grandchild: a-0']);
>>>>>>> remotes/upstream/main
    expect(log).toEqual(['Parent.componentDidMount:a-0']);
    log.splice(0);

    // Start React update, but don't finish
<<<<<<< HEAD
    act(() => {
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          renderer.update(<Parent observed={observableB} />);
        });
      } else {
        renderer.update(<Parent observed={observableB} />);
      }
      expect(Scheduler).toFlushAndYieldThrough(['Child: b-0']);
=======
    await act(async () => {
      React.startTransition(() => {
        renderer.update(<Parent observed={observableB} />);
      });
      await waitFor(['Child: b-0']);
>>>>>>> remotes/upstream/main
      expect(log).toEqual([]);

      // Emit some updates from the old subscribable
      observableA.next('a-1');
      observableA.next('a-2');

      // Update again
<<<<<<< HEAD
      renderer.update(<Parent observed={observableA} />);

      // Flush everything and ensure that the correct subscribable is used
      expect(Scheduler).toFlushAndYield([
=======
      if (gate(flags => flags.enableUnifiedSyncLane)) {
        React.startTransition(() => {
          renderer.update(<Parent observed={observableA} />);
        });
      } else {
        renderer.update(<Parent observed={observableA} />);
      }

      // Flush everything and ensure that the correct subscribable is used
      await waitForAll([
>>>>>>> remotes/upstream/main
        'Child: a-2',
        'Grandchild: a-2',
        'Child: a-2',
        'Grandchild: a-2',
      ]);
      expect(log).toEqual(['Parent.componentDidUpdate:a-2']);
    });

    // Updates from the new subscribable should be ignored.
    log.splice(0);
<<<<<<< HEAD
    act(() => observableB.next('b-1'));
    expect(Scheduler).toFlushAndYield([]);
    expect(log).toEqual([]);
  });

  it('should guard against updates that happen after unmounting', () => {
    function Child({value = 'default'}) {
      Scheduler.unstable_yieldValue(value);
=======
    await act(() => observableB.next('b-1'));
    await waitForAll([]);
    expect(log).toEqual([]);
  });

  it('should guard against updates that happen after unmounting', async () => {
    function Child({value = 'default'}) {
      Scheduler.log(value);
>>>>>>> remotes/upstream/main
      return null;
    }

    function Subscription({source}) {
      const value = useSubscription(
        React.useMemo(
          () => ({
            getCurrentValue: () => source.getValue(),
            subscribe: callback => {
              return source.subscribe(callback);
            },
          }),
          [source],
        ),
      );
      return <Child value={value} />;
    }

    const eventHandler = {
      _callbacks: [],
      _value: true,
      change(value) {
        eventHandler._value = value;
        const _callbacks = eventHandler._callbacks.slice(0);
        _callbacks.forEach(callback => callback(value));
      },
      getValue() {
        return eventHandler._value;
      },
      subscribe(callback) {
        eventHandler._callbacks.push(callback);
        return () => {
          eventHandler._callbacks.splice(
            eventHandler._callbacks.indexOf(callback),
            1,
          );
        };
      },
    };

<<<<<<< HEAD
    eventHandler.subscribe(value => {
      if (value === false) {
        renderer.unmount();
        expect(Scheduler).toFlushAndYield([]);
=======
    eventHandler.subscribe(async value => {
      if (value === false) {
        renderer.unmount();
>>>>>>> remotes/upstream/main
      }
    });

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(
        <Subscription source={eventHandler} />,
        {unstable_isConcurrent: true},
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([true]);
=======
    assertLog([true]);
>>>>>>> remotes/upstream/main

    // This event should unmount
    eventHandler.change(false);
  });

<<<<<<< HEAD
  it('does not return a value from the previous subscription if the source is updated', () => {
=======
  it('does not return a value from the previous subscription if the source is updated', async () => {
>>>>>>> remotes/upstream/main
    const subscription1 = {
      getCurrentValue: () => 'one',
      subscribe: () => () => {},
    };

    const subscription2 = {
      getCurrentValue: () => 'two',
      subscribe: () => () => {},
    };

    function Subscription({subscription}) {
      const value = useSubscription(subscription);
      if (value !== subscription.getCurrentValue()) {
        throw Error(
          `expected value "${subscription.getCurrentValue()}" but got value "${value}"`,
        );
      }
      return null;
    }

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(
        <Subscription subscription={subscription1} />,
        {unstable_isConcurrent: true},
      );
    });
<<<<<<< HEAD
    Scheduler.unstable_flushAll();

    act(() => renderer.update(<Subscription subscription={subscription2} />));
    Scheduler.unstable_flushAll();
  });

  it('should not tear if a mutation occurs during a concurrent update', () => {
=======
    await waitForAll([]);

    await act(() =>
      renderer.update(<Subscription subscription={subscription2} />),
    );
    await waitForAll([]);
  });

  it('should not tear if a mutation occurs during a concurrent update', async () => {
>>>>>>> remotes/upstream/main
    const input = document.createElement('input');

    const mutate = value => {
      input.value = value;
      input.dispatchEvent(new Event('change'));
    };

    const subscription = {
      getCurrentValue: () => input.value,
      subscribe: callback => {
        input.addEventListener('change', callback);
        return () => input.removeEventListener('change', callback);
      },
    };

    const Subscriber = ({id}) => {
      const value = useSubscription(subscription);
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(`render:${id}:${value}`);
      return value;
    };

    act(() => {
=======
      Scheduler.log(`render:${id}:${value}`);
      return value;
    };

    await act(async () => {
>>>>>>> remotes/upstream/main
      // Initial render of "A"
      mutate('A');
      ReactTestRenderer.create(
        <React.Fragment>
          <Subscriber id="first" />
          <Subscriber id="second" />
        </React.Fragment>,
        {unstable_isConcurrent: true},
      );
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['render:first:A', 'render:second:A']);
=======
      await waitForAll(['render:first:A', 'render:second:A']);
>>>>>>> remotes/upstream/main

      // Update state "A" -> "B"
      // This update will be eagerly evaluated,
      // so the tearing case this test is guarding against would not happen.
      mutate('B');
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['render:first:B', 'render:second:B']);
=======
      await waitForAll(['render:first:B', 'render:second:B']);
>>>>>>> remotes/upstream/main

      // No more pending updates
      jest.runAllTimers();

      // Partial update "B" -> "C"
      // Interrupt with a second mutation "C" -> "D".
      // This update will not be eagerly evaluated,
      // but useSubscription() should eagerly close over the updated value to avoid tearing.
<<<<<<< HEAD
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          mutate('C');
        });
      } else {
        mutate('C');
      }
      expect(Scheduler).toFlushAndYieldThrough([
        'render:first:C',
        'render:second:C',
      ]);
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          mutate('D');
        });
      } else {
        mutate('D');
      }
      expect(Scheduler).toFlushAndYield(['render:first:D', 'render:second:D']);
=======
      React.startTransition(() => {
        mutate('C');
      });
      await waitFor(['render:first:C', 'render:second:C']);
      React.startTransition(() => {
        mutate('D');
      });
      await waitForAll(['render:first:D', 'render:second:D']);
>>>>>>> remotes/upstream/main

      // No more pending updates
      jest.runAllTimers();
    });
  });
});
