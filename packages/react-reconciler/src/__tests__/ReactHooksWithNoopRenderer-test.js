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
let textCache;
let readText;
let resolveText;
let ReactNoop;
let Scheduler;
let Suspense;
let useState;
let useReducer;
let useEffect;
let useInsertionEffect;
let useLayoutEffect;
let useCallback;
let useMemo;
let useRef;
let useImperativeHandle;
let useTransition;
let useDeferredValue;
let forwardRef;
let memo;
let act;
let ContinuousEventPriority;
let SuspenseList;
<<<<<<< HEAD
=======
let waitForAll;
let waitFor;
let waitForThrow;
let waitForPaint;
let assertLog;
>>>>>>> remotes/upstream/main

describe('ReactHooksWithNoopRenderer', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;
=======
    act = require('internal-test-utils').act;
>>>>>>> remotes/upstream/main
    useState = React.useState;
    useReducer = React.useReducer;
    useEffect = React.useEffect;
    useInsertionEffect = React.useInsertionEffect;
    useLayoutEffect = React.useLayoutEffect;
    useCallback = React.useCallback;
    useMemo = React.useMemo;
    useRef = React.useRef;
    useImperativeHandle = React.useImperativeHandle;
    forwardRef = React.forwardRef;
    memo = React.memo;
    useTransition = React.useTransition;
    useDeferredValue = React.useDeferredValue;
    Suspense = React.Suspense;
<<<<<<< HEAD
    ContinuousEventPriority = require('react-reconciler/constants')
      .ContinuousEventPriority;
    if (gate(flags => flags.enableSuspenseList)) {
      SuspenseList = React.SuspenseList;
    }

=======
    ContinuousEventPriority =
      require('react-reconciler/constants').ContinuousEventPriority;
    if (gate(flags => flags.enableSuspenseList)) {
      SuspenseList = React.unstable_SuspenseList;
    }

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitFor = InternalTestUtils.waitFor;
    waitForThrow = InternalTestUtils.waitForThrow;
    waitForPaint = InternalTestUtils.waitForPaint;
    assertLog = InternalTestUtils.assertLog;

>>>>>>> remotes/upstream/main
    textCache = new Map();

    readText = text => {
      const record = textCache.get(text);
      if (record !== undefined) {
        switch (record.status) {
          case 'pending':
            throw record.promise;
          case 'rejected':
            throw Error('Failed to load: ' + text);
          case 'resolved':
            return text;
        }
      } else {
        let ping;
        const promise = new Promise(resolve => (ping = resolve));
        const newRecord = {
          status: 'pending',
          ping: ping,
          promise,
        };
        textCache.set(text, newRecord);
        throw promise;
      }
    };

    resolveText = text => {
      const record = textCache.get(text);
      if (record !== undefined) {
        if (record.status === 'pending') {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`Promise resolved [${text}]`);
=======
          Scheduler.log(`Promise resolved [${text}]`);
>>>>>>> remotes/upstream/main
          record.ping();
          record.ping = null;
          record.status = 'resolved';
          clearTimeout(record.promise._timer);
          record.promise = null;
        }
      } else {
        const newRecord = {
          ping: null,
          status: 'resolved',
          promise: null,
        };
        textCache.set(text, newRecord);
      }
    };
  });

<<<<<<< HEAD
  function span(prop) {
    return {type: 'span', hidden: false, children: [], prop};
  }

  function Text(props) {
    Scheduler.unstable_yieldValue(props.text);
=======
  function Text(props) {
    Scheduler.log(props.text);
>>>>>>> remotes/upstream/main
    return <span prop={props.text} />;
  }

  function AsyncText(props) {
    const text = props.text;
    try {
      readText(text);
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
      return <span prop={text} />;
    } catch (promise) {
      if (typeof promise.then === 'function') {
        Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
=======
      Scheduler.log(text);
      return <span prop={text} />;
    } catch (promise) {
      if (typeof promise.then === 'function') {
        Scheduler.log(`Suspend! [${text}]`);
>>>>>>> remotes/upstream/main
        if (typeof props.ms === 'number' && promise._timer === undefined) {
          promise._timer = setTimeout(() => {
            resolveText(text);
          }, props.ms);
        }
      } else {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`Error! [${text}]`);
=======
        Scheduler.log(`Error! [${text}]`);
>>>>>>> remotes/upstream/main
      }
      throw promise;
    }
  }

  function advanceTimers(ms) {
    // Note: This advances Jest's virtual time but not React's. Use
    // ReactNoop.expire for that.
    if (typeof ms !== 'number') {
      throw new Error('Must specify ms');
    }
    jest.advanceTimersByTime(ms);
    // Wait until the end of the current tick
    // We cannot use a timer since we're faking them
    return Promise.resolve().then(() => {});
  }

<<<<<<< HEAD
  it('resumes after an interruption', () => {
=======
  it('resumes after an interruption', async () => {
>>>>>>> remotes/upstream/main
    function Counter(props, ref) {
      const [count, updateCount] = useState(0);
      useImperativeHandle(ref, () => ({updateCount}));
      return <Text text={props.label + ': ' + count} />;
    }
    Counter = forwardRef(Counter);

    // Initial mount
    const counter = React.createRef(null);
    ReactNoop.render(<Counter label="Count" ref={counter} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Count: 0']);
    expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);

    // Schedule some updates
    act(() => {
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          counter.current.updateCount(1);
          counter.current.updateCount(count => count + 10);
        });
      } else {
        counter.current.updateCount(1);
        counter.current.updateCount(count => count + 10);
      }

      // Partially flush without committing
      expect(Scheduler).toFlushAndYieldThrough(['Count: 11']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
=======
    await waitForAll(['Count: 0']);
    expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);

    // Schedule some updates
    await act(async () => {
      React.startTransition(() => {
        counter.current.updateCount(1);
        counter.current.updateCount(count => count + 10);
      });

      // Partially flush without committing
      await waitFor(['Count: 11']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
>>>>>>> remotes/upstream/main

      // Interrupt with a high priority update
      ReactNoop.flushSync(() => {
        ReactNoop.render(<Counter label="Total" />);
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Total: 0']);

      // Resume rendering
      expect(Scheduler).toFlushAndYield(['Total: 11']);
      expect(ReactNoop.getChildren()).toEqual([span('Total: 11')]);
    });
  });

  it('throws inside class components', () => {
=======
      assertLog(['Total: 0']);

      // Resume rendering
      await waitForAll(['Total: 11']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Total: 11" />);
    });
  });

  it('throws inside class components', async () => {
>>>>>>> remotes/upstream/main
    class BadCounter extends React.Component {
      render() {
        const [count] = useState(0);
        return <Text text={this.props.label + ': ' + count} />;
      }
    }
    ReactNoop.render(<BadCounter />);

<<<<<<< HEAD
    expect(Scheduler).toFlushAndThrow(
=======
    await waitForThrow(
>>>>>>> remotes/upstream/main
      'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' +
        ' one of the following reasons:\n' +
        '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
        '2. You might be breaking the Rules of Hooks\n' +
        '3. You might have more than one copy of React in the same app\n' +
        'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.',
    );

    // Confirm that a subsequent hook works properly.
    function GoodCounter(props, ref) {
      const [count] = useState(props.initialCount);
      return <Text text={count} />;
    }
    ReactNoop.render(<GoodCounter initialCount={10} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([10]);
  });

  if (!require('shared/ReactFeatureFlags').disableModulePatternComponents) {
    it('throws inside module-style components', () => {
      function Counter() {
        return {
          render() {
            const [count] = useState(0);
            return <Text text={this.props.label + ': ' + count} />;
          },
        };
      }
      ReactNoop.render(<Counter />);
      expect(() =>
        expect(Scheduler).toFlushAndThrow(
=======
    await waitForAll([10]);
  });

  // @gate !disableModulePatternComponents
  it('throws inside module-style components', async () => {
    function Counter() {
      return {
        render() {
          const [count] = useState(0);
          return <Text text={this.props.label + ': ' + count} />;
        },
      };
    }
    ReactNoop.render(<Counter />);
    await expect(
      async () =>
        await waitForThrow(
>>>>>>> remotes/upstream/main
          'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen ' +
            'for one of the following reasons:\n' +
            '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
            '2. You might be breaking the Rules of Hooks\n' +
            '3. You might have more than one copy of React in the same app\n' +
            'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.',
        ),
<<<<<<< HEAD
      ).toErrorDev(
        'Warning: The <Counter /> component appears to be a function component that returns a class instance. ' +
          'Change Counter to a class that extends React.Component instead. ' +
          "If you can't use a class try assigning the prototype on the function as a workaround. " +
          '`Counter.prototype = React.Component.prototype`. ' +
          "Don't use an arrow function since it cannot be called with `new` by React.",
      );

      // Confirm that a subsequent hook works properly.
      function GoodCounter(props) {
        const [count] = useState(props.initialCount);
        return <Text text={count} />;
      }
      ReactNoop.render(<GoodCounter initialCount={10} />);
      expect(Scheduler).toFlushAndYield([10]);
    });
  }

  it('throws when called outside the render phase', () => {
=======
    ).toErrorDev(
      'Warning: The <Counter /> component appears to be a function component that returns a class instance. ' +
        'Change Counter to a class that extends React.Component instead. ' +
        "If you can't use a class try assigning the prototype on the function as a workaround. " +
        '`Counter.prototype = React.Component.prototype`. ' +
        "Don't use an arrow function since it cannot be called with `new` by React.",
    );

    // Confirm that a subsequent hook works properly.
    function GoodCounter(props) {
      const [count] = useState(props.initialCount);
      return <Text text={count} />;
    }
    ReactNoop.render(<GoodCounter initialCount={10} />);
    await waitForAll([10]);
  });

  it('throws when called outside the render phase', async () => {
>>>>>>> remotes/upstream/main
    expect(() => {
      expect(() => useState(0)).toThrow(
        "Cannot read property 'useState' of null",
      );
    }).toErrorDev(
      'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' +
        ' one of the following reasons:\n' +
        '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
        '2. You might be breaking the Rules of Hooks\n' +
        '3. You might have more than one copy of React in the same app\n' +
        'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.',
      {withoutStack: true},
    );
  });

  describe('useState', () => {
<<<<<<< HEAD
    it('simple mount and update', () => {
=======
    it('simple mount and update', async () => {
>>>>>>> remotes/upstream/main
      function Counter(props, ref) {
        const [count, updateCount] = useState(0);
        useImperativeHandle(ref, () => ({updateCount}));
        return <Text text={'Count: ' + count} />;
      }
      Counter = forwardRef(Counter);
      const counter = React.createRef(null);
      ReactNoop.render(<Counter ref={counter} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Count: 0']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);

      act(() => counter.current.updateCount(1));
      expect(Scheduler).toHaveYielded(['Count: 1']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);

      act(() => counter.current.updateCount(count => count + 10));
      expect(Scheduler).toHaveYielded(['Count: 11']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 11')]);
    });

    it('lazy state initializer', () => {
      function Counter(props, ref) {
        const [count, updateCount] = useState(() => {
          Scheduler.unstable_yieldValue('getInitialState');
=======
      await waitForAll(['Count: 0']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);

      await act(() => counter.current.updateCount(1));
      assertLog(['Count: 1']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);

      await act(() => counter.current.updateCount(count => count + 10));
      assertLog(['Count: 11']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 11" />);
    });

    it('lazy state initializer', async () => {
      function Counter(props, ref) {
        const [count, updateCount] = useState(() => {
          Scheduler.log('getInitialState');
>>>>>>> remotes/upstream/main
          return props.initialState;
        });
        useImperativeHandle(ref, () => ({updateCount}));
        return <Text text={'Count: ' + count} />;
      }
      Counter = forwardRef(Counter);
      const counter = React.createRef(null);
      ReactNoop.render(<Counter initialState={42} ref={counter} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['getInitialState', 'Count: 42']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 42')]);

      act(() => counter.current.updateCount(7));
      expect(Scheduler).toHaveYielded(['Count: 7']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 7')]);
    });

    it('multiple states', () => {
=======
      await waitForAll(['getInitialState', 'Count: 42']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 42" />);

      await act(() => counter.current.updateCount(7));
      assertLog(['Count: 7']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 7" />);
    });

    it('multiple states', async () => {
>>>>>>> remotes/upstream/main
      function Counter(props, ref) {
        const [count, updateCount] = useState(0);
        const [label, updateLabel] = useState('Count');
        useImperativeHandle(ref, () => ({updateCount, updateLabel}));
        return <Text text={label + ': ' + count} />;
      }
      Counter = forwardRef(Counter);
      const counter = React.createRef(null);
      ReactNoop.render(<Counter ref={counter} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Count: 0']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);

      act(() => counter.current.updateCount(7));
      expect(Scheduler).toHaveYielded(['Count: 7']);

      act(() => counter.current.updateLabel('Total'));
      expect(Scheduler).toHaveYielded(['Total: 7']);
    });

    it('returns the same updater function every time', () => {
=======
      await waitForAll(['Count: 0']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);

      await act(() => counter.current.updateCount(7));
      assertLog(['Count: 7']);

      await act(() => counter.current.updateLabel('Total'));
      assertLog(['Total: 7']);
    });

    it('returns the same updater function every time', async () => {
>>>>>>> remotes/upstream/main
      let updater = null;
      function Counter() {
        const [count, updateCount] = useState(0);
        updater = updateCount;
        return <Text text={'Count: ' + count} />;
      }
      ReactNoop.render(<Counter />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Count: 0']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);

      const firstUpdater = updater;

      act(() => firstUpdater(1));
      expect(Scheduler).toHaveYielded(['Count: 1']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);

      const secondUpdater = updater;

      act(() => firstUpdater(count => count + 10));
      expect(Scheduler).toHaveYielded(['Count: 11']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 11')]);
=======
      await waitForAll(['Count: 0']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);

      const firstUpdater = updater;

      await act(() => firstUpdater(1));
      assertLog(['Count: 1']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);

      const secondUpdater = updater;

      await act(() => firstUpdater(count => count + 10));
      assertLog(['Count: 11']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 11" />);
>>>>>>> remotes/upstream/main

      expect(firstUpdater).toBe(secondUpdater);
    });

<<<<<<< HEAD
    it('does not warn on set after unmount', () => {
=======
    it('does not warn on set after unmount', async () => {
>>>>>>> remotes/upstream/main
      let _updateCount;
      function Counter(props, ref) {
        const [, updateCount] = useState(0);
        _updateCount = updateCount;
        return null;
      }

      ReactNoop.render(<Counter />);
<<<<<<< HEAD
      expect(Scheduler).toFlushWithoutYielding();
      ReactNoop.render(null);
      expect(Scheduler).toFlushWithoutYielding();
      act(() => _updateCount(1));
    });

    it('works with memo', () => {
=======
      await waitForAll([]);
      ReactNoop.render(null);
      await waitForAll([]);
      await act(() => _updateCount(1));
    });

    it('works with memo', async () => {
>>>>>>> remotes/upstream/main
      let _updateCount;
      function Counter(props) {
        const [count, updateCount] = useState(0);
        _updateCount = updateCount;
        return <Text text={'Count: ' + count} />;
      }
      Counter = memo(Counter);

      ReactNoop.render(<Counter />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Count: 0']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);

      ReactNoop.render(<Counter />);
      expect(Scheduler).toFlushAndYield([]);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);

      act(() => _updateCount(1));
      expect(Scheduler).toHaveYielded(['Count: 1']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
=======
      await waitForAll(['Count: 0']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);

      ReactNoop.render(<Counter />);
      await waitForAll([]);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);

      await act(() => _updateCount(1));
      assertLog(['Count: 1']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
>>>>>>> remotes/upstream/main
    });
  });

  describe('updates during the render phase', () => {
<<<<<<< HEAD
    it('restarts the render function and applies the new updates on top', () => {
=======
    it('restarts the render function and applies the new updates on top', async () => {
>>>>>>> remotes/upstream/main
      function ScrollView({row: newRow}) {
        const [isScrollingDown, setIsScrollingDown] = useState(false);
        const [row, setRow] = useState(null);

        if (row !== newRow) {
          // Row changed since last render. Update isScrollingDown.
          setIsScrollingDown(row !== null && newRow > row);
          setRow(newRow);
        }

        return <Text text={`Scrolling down: ${isScrollingDown}`} />;
      }

      ReactNoop.render(<ScrollView row={1} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Scrolling down: false']);
      expect(ReactNoop.getChildren()).toEqual([span('Scrolling down: false')]);

      ReactNoop.render(<ScrollView row={5} />);
      expect(Scheduler).toFlushAndYield(['Scrolling down: true']);
      expect(ReactNoop.getChildren()).toEqual([span('Scrolling down: true')]);

      ReactNoop.render(<ScrollView row={5} />);
      expect(Scheduler).toFlushAndYield(['Scrolling down: true']);
      expect(ReactNoop.getChildren()).toEqual([span('Scrolling down: true')]);

      ReactNoop.render(<ScrollView row={10} />);
      expect(Scheduler).toFlushAndYield(['Scrolling down: true']);
      expect(ReactNoop.getChildren()).toEqual([span('Scrolling down: true')]);

      ReactNoop.render(<ScrollView row={2} />);
      expect(Scheduler).toFlushAndYield(['Scrolling down: false']);
      expect(ReactNoop.getChildren()).toEqual([span('Scrolling down: false')]);

      ReactNoop.render(<ScrollView row={2} />);
      expect(Scheduler).toFlushAndYield(['Scrolling down: false']);
      expect(ReactNoop.getChildren()).toEqual([span('Scrolling down: false')]);
=======
      await waitForAll(['Scrolling down: false']);
      expect(ReactNoop).toMatchRenderedOutput(
        <span prop="Scrolling down: false" />,
      );

      ReactNoop.render(<ScrollView row={5} />);
      await waitForAll(['Scrolling down: true']);
      expect(ReactNoop).toMatchRenderedOutput(
        <span prop="Scrolling down: true" />,
      );

      ReactNoop.render(<ScrollView row={5} />);
      await waitForAll(['Scrolling down: true']);
      expect(ReactNoop).toMatchRenderedOutput(
        <span prop="Scrolling down: true" />,
      );

      ReactNoop.render(<ScrollView row={10} />);
      await waitForAll(['Scrolling down: true']);
      expect(ReactNoop).toMatchRenderedOutput(
        <span prop="Scrolling down: true" />,
      );

      ReactNoop.render(<ScrollView row={2} />);
      await waitForAll(['Scrolling down: false']);
      expect(ReactNoop).toMatchRenderedOutput(
        <span prop="Scrolling down: false" />,
      );

      ReactNoop.render(<ScrollView row={2} />);
      await waitForAll(['Scrolling down: false']);
      expect(ReactNoop).toMatchRenderedOutput(
        <span prop="Scrolling down: false" />,
      );
>>>>>>> remotes/upstream/main
    });

    it('warns about render phase update on a different component', async () => {
      let setStep;
      function Foo() {
        const [step, _setStep] = useState(0);
        setStep = _setStep;
        return <Text text={`Foo [${step}]`} />;
      }

      function Bar({triggerUpdate}) {
        if (triggerUpdate) {
          setStep(x => x + 1);
        }
        return <Text text="Bar" />;
      }

      const root = ReactNoop.createRoot();

<<<<<<< HEAD
      await act(async () => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        root.render(
          <>
            <Foo />
            <Bar />
          </>,
        );
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Foo [0]', 'Bar']);

      // Bar will update Foo during its render phase. React should warn.
      await act(async () => {
        root.render(
          <>
            <Foo />
            <Bar triggerUpdate={true} />
          </>,
        );
        expect(() =>
          expect(Scheduler).toFlushAndYield(['Foo [0]', 'Bar', 'Foo [1]']),
        ).toErrorDev([
          'Cannot update a component (`Foo`) while rendering a ' +
            'different component (`Bar`). To locate the bad setState() call inside `Bar`',
        ]);
      });
=======
      assertLog(['Foo [0]', 'Bar']);

      // Bar will update Foo during its render phase. React should warn.
      root.render(
        <>
          <Foo />
          <Bar triggerUpdate={true} />
        </>,
      );
      await expect(
        async () => await waitForAll(['Foo [0]', 'Bar', 'Foo [1]']),
      ).toErrorDev([
        'Cannot update a component (`Foo`) while rendering a ' +
          'different component (`Bar`). To locate the bad setState() call inside `Bar`',
      ]);
>>>>>>> remotes/upstream/main

      // It should not warn again (deduplication).
      await act(async () => {
        root.render(
          <>
            <Foo />
            <Bar triggerUpdate={true} />
          </>,
        );
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield(['Foo [1]', 'Bar', 'Foo [2]']);
      });
    });

    it('keeps restarting until there are no more new updates', () => {
=======
        await waitForAll(['Foo [1]', 'Bar', 'Foo [2]']);
      });
    });

    it('keeps restarting until there are no more new updates', async () => {
>>>>>>> remotes/upstream/main
      function Counter({row: newRow}) {
        const [count, setCount] = useState(0);
        if (count < 3) {
          setCount(count + 1);
        }
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Render: ' + count);
=======
        Scheduler.log('Render: ' + count);
>>>>>>> remotes/upstream/main
        return <Text text={count} />;
      }

      ReactNoop.render(<Counter />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
        'Render: 0',
        'Render: 1',
        'Render: 2',
        'Render: 3',
        3,
      ]);
      expect(ReactNoop.getChildren()).toEqual([span(3)]);
    });

    it('updates multiple times within same render function', () => {
=======
      await waitForAll(['Render: 0', 'Render: 1', 'Render: 2', 'Render: 3', 3]);
      expect(ReactNoop).toMatchRenderedOutput(<span prop={3} />);
    });

    it('updates multiple times within same render function', async () => {
>>>>>>> remotes/upstream/main
      function Counter({row: newRow}) {
        const [count, setCount] = useState(0);
        if (count < 12) {
          setCount(c => c + 1);
          setCount(c => c + 1);
          setCount(c => c + 1);
        }
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Render: ' + count);
=======
        Scheduler.log('Render: ' + count);
>>>>>>> remotes/upstream/main
        return <Text text={count} />;
      }

      ReactNoop.render(<Counter />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        // Should increase by three each time
        'Render: 0',
        'Render: 3',
        'Render: 6',
        'Render: 9',
        'Render: 12',
        12,
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span(12)]);
    });

    it('throws after too many iterations', () => {
      function Counter({row: newRow}) {
        const [count, setCount] = useState(0);
        setCount(count + 1);
        Scheduler.unstable_yieldValue('Render: ' + count);
        return <Text text={count} />;
      }
      ReactNoop.render(<Counter />);
      expect(Scheduler).toFlushAndThrow(
=======
      expect(ReactNoop).toMatchRenderedOutput(<span prop={12} />);
    });

    it('throws after too many iterations', async () => {
      function Counter({row: newRow}) {
        const [count, setCount] = useState(0);
        setCount(count + 1);
        Scheduler.log('Render: ' + count);
        return <Text text={count} />;
      }
      ReactNoop.render(<Counter />);
      await waitForThrow(
>>>>>>> remotes/upstream/main
        'Too many re-renders. React limits the number of renders to prevent ' +
          'an infinite loop.',
      );
    });

<<<<<<< HEAD
    it('works with useReducer', () => {
=======
    it('works with useReducer', async () => {
>>>>>>> remotes/upstream/main
      function reducer(state, action) {
        return action === 'increment' ? state + 1 : state;
      }
      function Counter({row: newRow}) {
        const [count, dispatch] = useReducer(reducer, 0);
        if (count < 3) {
          dispatch('increment');
        }
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Render: ' + count);
=======
        Scheduler.log('Render: ' + count);
>>>>>>> remotes/upstream/main
        return <Text text={count} />;
      }

      ReactNoop.render(<Counter />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
        'Render: 0',
        'Render: 1',
        'Render: 2',
        'Render: 3',
        3,
      ]);
      expect(ReactNoop.getChildren()).toEqual([span(3)]);
    });

    it('uses reducer passed at time of render, not time of dispatch', () => {
=======
      await waitForAll(['Render: 0', 'Render: 1', 'Render: 2', 'Render: 3', 3]);
      expect(ReactNoop).toMatchRenderedOutput(<span prop={3} />);
    });

    it('uses reducer passed at time of render, not time of dispatch', async () => {
>>>>>>> remotes/upstream/main
      // This test is a bit contrived but it demonstrates a subtle edge case.

      // Reducer A increments by 1. Reducer B increments by 10.
      function reducerA(state, action) {
        switch (action) {
          case 'increment':
            return state + 1;
          case 'reset':
            return 0;
        }
      }
      function reducerB(state, action) {
        switch (action) {
          case 'increment':
            return state + 10;
          case 'reset':
            return 0;
        }
      }

      function Counter({row: newRow}, ref) {
        const [reducer, setReducer] = useState(() => reducerA);
        const [count, dispatch] = useReducer(reducer, 0);
        useImperativeHandle(ref, () => ({dispatch}));
        if (count < 20) {
          dispatch('increment');
          // Swap reducers each time we increment
          if (reducer === reducerA) {
            setReducer(() => reducerB);
          } else {
            setReducer(() => reducerA);
          }
        }
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Render: ' + count);
=======
        Scheduler.log('Render: ' + count);
>>>>>>> remotes/upstream/main
        return <Text text={count} />;
      }
      Counter = forwardRef(Counter);
      const counter = React.createRef(null);
      ReactNoop.render(<Counter ref={counter} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        // The count should increase by alternating amounts of 10 and 1
        // until we reach 21.
        'Render: 0',
        'Render: 10',
        'Render: 11',
        'Render: 21',
        21,
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span(21)]);

      // Test that it works on update, too. This time the log is a bit different
      // because we started with reducerB instead of reducerA.
      act(() => {
        counter.current.dispatch('reset');
      });
      ReactNoop.render(<Counter ref={counter} />);
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(<span prop={21} />);

      // Test that it works on update, too. This time the log is a bit different
      // because we started with reducerB instead of reducerA.
      await act(() => {
        counter.current.dispatch('reset');
      });
      ReactNoop.render(<Counter ref={counter} />);
      assertLog([
>>>>>>> remotes/upstream/main
        'Render: 0',
        'Render: 1',
        'Render: 11',
        'Render: 12',
        'Render: 22',
        22,
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span(22)]);
=======
      expect(ReactNoop).toMatchRenderedOutput(<span prop={22} />);
>>>>>>> remotes/upstream/main
    });

    it('discards render phase updates if something suspends', async () => {
      const thenable = {then() {}};
      function Foo({signal}) {
        return (
          <Suspense fallback="Loading...">
            <Bar signal={signal} />
          </Suspense>
        );
      }

      function Bar({signal: newSignal}) {
        const [counter, setCounter] = useState(0);
        const [signal, setSignal] = useState(true);

        // Increment a counter every time the signal changes
        if (signal !== newSignal) {
          setCounter(c => c + 1);
          setSignal(newSignal);
          if (counter === 0) {
            // We're suspending during a render that includes render phase
            // updates. Those updates should not persist to the next render.
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Suspend!');
=======
            Scheduler.log('Suspend!');
>>>>>>> remotes/upstream/main
            throw thenable;
          }
        }

        return <Text text={counter} />;
      }

      const root = ReactNoop.createRoot();
      root.render(<Foo signal={true} />);

<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([0]);
      expect(root).toMatchRenderedOutput(<span prop={0} />);

      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          root.render(<Foo signal={false} />);
        });
      } else {
        root.render(<Foo signal={false} />);
      }
      expect(Scheduler).toFlushAndYield(['Suspend!']);
      expect(root).toMatchRenderedOutput(<span prop={0} />);

      // Rendering again should suspend again.
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          root.render(<Foo signal={false} />);
        });
      } else {
        root.render(<Foo signal={false} />);
      }
      expect(Scheduler).toFlushAndYield(['Suspend!']);
=======
      await waitForAll([0]);
      expect(root).toMatchRenderedOutput(<span prop={0} />);

      React.startTransition(() => {
        root.render(<Foo signal={false} />);
      });
      await waitForAll(['Suspend!']);
      expect(root).toMatchRenderedOutput(<span prop={0} />);

      // Rendering again should suspend again.
      React.startTransition(() => {
        root.render(<Foo signal={false} />);
      });
      await waitForAll(['Suspend!']);
>>>>>>> remotes/upstream/main
    });

    it('discards render phase updates if something suspends, but not other updates in the same component', async () => {
      const thenable = {then() {}};
      function Foo({signal}) {
        return (
          <Suspense fallback="Loading...">
            <Bar signal={signal} />
          </Suspense>
        );
      }

      let setLabel;
      function Bar({signal: newSignal}) {
        const [counter, setCounter] = useState(0);

        if (counter === 1) {
          // We're suspending during a render that includes render phase
          // updates. Those updates should not persist to the next render.
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Suspend!');
=======
          Scheduler.log('Suspend!');
>>>>>>> remotes/upstream/main
          throw thenable;
        }

        const [signal, setSignal] = useState(true);

        // Increment a counter every time the signal changes
        if (signal !== newSignal) {
          setCounter(c => c + 1);
          setSignal(newSignal);
        }

        const [label, _setLabel] = useState('A');
        setLabel = _setLabel;

        return <Text text={`${label}:${counter}`} />;
      }

      const root = ReactNoop.createRoot();
      root.render(<Foo signal={true} />);

<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['A:0']);
      expect(root).toMatchRenderedOutput(<span prop="A:0" />);

      await act(async () => {
        if (gate(flags => flags.enableSyncDefaultUpdates)) {
          React.startTransition(() => {
            root.render(<Foo signal={false} />);
            setLabel('B');
          });
        } else {
          root.render(<Foo signal={false} />);
          setLabel('B');
        }

        expect(Scheduler).toFlushAndYield(['Suspend!']);
        expect(root).toMatchRenderedOutput(<span prop="A:0" />);

        // Rendering again should suspend again.
        if (gate(flags => flags.enableSyncDefaultUpdates)) {
          React.startTransition(() => {
            root.render(<Foo signal={false} />);
          });
        } else {
          root.render(<Foo signal={false} />);
        }
        expect(Scheduler).toFlushAndYield(['Suspend!']);

        // Flip the signal back to "cancel" the update. However, the update to
        // label should still proceed. It shouldn't have been dropped.
        if (gate(flags => flags.enableSyncDefaultUpdates)) {
          React.startTransition(() => {
            root.render(<Foo signal={true} />);
          });
        } else {
          root.render(<Foo signal={true} />);
        }
        expect(Scheduler).toFlushAndYield(['B:0']);
=======
      await waitForAll(['A:0']);
      expect(root).toMatchRenderedOutput(<span prop="A:0" />);

      await act(async () => {
        React.startTransition(() => {
          root.render(<Foo signal={false} />);
          setLabel('B');
        });

        await waitForAll(['Suspend!']);
        expect(root).toMatchRenderedOutput(<span prop="A:0" />);

        // Rendering again should suspend again.
        React.startTransition(() => {
          root.render(<Foo signal={false} />);
        });
        await waitForAll(['Suspend!']);

        // Flip the signal back to "cancel" the update. However, the update to
        // label should still proceed. It shouldn't have been dropped.
        React.startTransition(() => {
          root.render(<Foo signal={true} />);
        });
        await waitForAll(['B:0']);
>>>>>>> remotes/upstream/main
        expect(root).toMatchRenderedOutput(<span prop="B:0" />);
      });
    });

    it('regression: render phase updates cause lower pri work to be dropped', async () => {
      let setRow;
      function ScrollView() {
        const [row, _setRow] = useState(10);
        setRow = _setRow;

        const [scrollDirection, setScrollDirection] = useState('Up');
        const [prevRow, setPrevRow] = useState(null);

        if (prevRow !== row) {
          setScrollDirection(prevRow !== null && row > prevRow ? 'Down' : 'Up');
          setPrevRow(row);
        }

        return <Text text={scrollDirection} />;
      }

      const root = ReactNoop.createRoot();

<<<<<<< HEAD
      await act(async () => {
        root.render(<ScrollView row={10} />);
      });
      expect(Scheduler).toHaveYielded(['Up']);
      expect(root).toMatchRenderedOutput(<span prop="Up" />);

      await act(async () => {
        ReactNoop.discreteUpdates(() => {
          setRow(5);
        });
        setRow(20);
      });
      expect(Scheduler).toHaveYielded(['Up', 'Down']);
=======
      await act(() => {
        root.render(<ScrollView row={10} />);
      });
      assertLog(['Up']);
      expect(root).toMatchRenderedOutput(<span prop="Up" />);

      await act(() => {
        ReactNoop.discreteUpdates(() => {
          setRow(5);
        });
        React.startTransition(() => {
          setRow(20);
        });
      });
      assertLog(['Up', 'Down']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(<span prop="Down" />);
    });

    // TODO: This should probably warn
    it('calling startTransition inside render phase', async () => {
      function App() {
        const [counter, setCounter] = useState(0);

        if (counter === 0) {
          React.startTransition(() => {
            setCounter(c => c + 1);
          });
        }

        return <Text text={counter} />;
      }

      const root = ReactNoop.createRoot();
      root.render(<App />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([1]);
=======
      await waitForAll([1]);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(<span prop={1} />);
    });
  });

  describe('useReducer', () => {
<<<<<<< HEAD
    it('simple mount and update', () => {
=======
    it('simple mount and update', async () => {
>>>>>>> remotes/upstream/main
      const INCREMENT = 'INCREMENT';
      const DECREMENT = 'DECREMENT';

      function reducer(state, action) {
        switch (action) {
          case 'INCREMENT':
            return state + 1;
          case 'DECREMENT':
            return state - 1;
          default:
            return state;
        }
      }

      function Counter(props, ref) {
        const [count, dispatch] = useReducer(reducer, 0);
        useImperativeHandle(ref, () => ({dispatch}));
        return <Text text={'Count: ' + count} />;
      }
      Counter = forwardRef(Counter);
      const counter = React.createRef(null);
      ReactNoop.render(<Counter ref={counter} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Count: 0']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);

      act(() => counter.current.dispatch(INCREMENT));
      expect(Scheduler).toHaveYielded(['Count: 1']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
      act(() => {
=======
      await waitForAll(['Count: 0']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);

      await act(() => counter.current.dispatch(INCREMENT));
      assertLog(['Count: 1']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
      await act(() => {
>>>>>>> remotes/upstream/main
        counter.current.dispatch(DECREMENT);
        counter.current.dispatch(DECREMENT);
        counter.current.dispatch(DECREMENT);
      });

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Count: -2']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: -2')]);
    });

    it('lazy init', () => {
=======
      assertLog(['Count: -2']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: -2" />);
    });

    it('lazy init', async () => {
>>>>>>> remotes/upstream/main
      const INCREMENT = 'INCREMENT';
      const DECREMENT = 'DECREMENT';

      function reducer(state, action) {
        switch (action) {
          case 'INCREMENT':
            return state + 1;
          case 'DECREMENT':
            return state - 1;
          default:
            return state;
        }
      }

      function Counter(props, ref) {
        const [count, dispatch] = useReducer(reducer, props, p => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Init');
=======
          Scheduler.log('Init');
>>>>>>> remotes/upstream/main
          return p.initialCount;
        });
        useImperativeHandle(ref, () => ({dispatch}));
        return <Text text={'Count: ' + count} />;
      }
      Counter = forwardRef(Counter);
      const counter = React.createRef(null);
      ReactNoop.render(<Counter initialCount={10} ref={counter} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Init', 'Count: 10']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 10')]);

      act(() => counter.current.dispatch(INCREMENT));
      expect(Scheduler).toHaveYielded(['Count: 11']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 11')]);

      act(() => {
=======
      await waitForAll(['Init', 'Count: 10']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 10" />);

      await act(() => counter.current.dispatch(INCREMENT));
      assertLog(['Count: 11']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 11" />);

      await act(() => {
>>>>>>> remotes/upstream/main
        counter.current.dispatch(DECREMENT);
        counter.current.dispatch(DECREMENT);
        counter.current.dispatch(DECREMENT);
      });

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Count: 8']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 8')]);
    });

    // Regression test for https://github.com/facebook/react/issues/14360
    it('handles dispatches with mixed priorities', () => {
=======
      assertLog(['Count: 8']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 8" />);
    });

    // Regression test for https://github.com/facebook/react/issues/14360
    it('handles dispatches with mixed priorities', async () => {
>>>>>>> remotes/upstream/main
      const INCREMENT = 'INCREMENT';

      function reducer(state, action) {
        return action === INCREMENT ? state + 1 : state;
      }

      function Counter(props, ref) {
        const [count, dispatch] = useReducer(reducer, 0);
        useImperativeHandle(ref, () => ({dispatch}));
        return <Text text={'Count: ' + count} />;
      }

      Counter = forwardRef(Counter);
      const counter = React.createRef(null);
      ReactNoop.render(<Counter ref={counter} />);

<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Count: 0']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
=======
      await waitForAll(['Count: 0']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
>>>>>>> remotes/upstream/main

      ReactNoop.batchedUpdates(() => {
        counter.current.dispatch(INCREMENT);
        counter.current.dispatch(INCREMENT);
        counter.current.dispatch(INCREMENT);
      });

      ReactNoop.flushSync(() => {
        counter.current.dispatch(INCREMENT);
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Count: 1']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);

      expect(Scheduler).toFlushAndYield(['Count: 4']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 4')]);
=======
      if (gate(flags => flags.enableUnifiedSyncLane)) {
        assertLog(['Count: 4']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 4" />);
      } else {
        assertLog(['Count: 1']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
        await waitForAll(['Count: 4']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 4" />);
      }
>>>>>>> remotes/upstream/main
    });
  });

  describe('useEffect', () => {
<<<<<<< HEAD
    it('simple mount and update', () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Passive effect [${props.count}]`);
        });
        return <Text text={'Count: ' + props.count} />;
      }
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
        // Effects are deferred until after the commit
        expect(Scheduler).toFlushAndYield(['Passive effect [0]']);
      });

      act(() => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 1', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
        // Effects are deferred until after the commit
        expect(Scheduler).toFlushAndYield(['Passive effect [1]']);
      });
    });

    it('flushes passive effects even with sibling deletions', () => {
      function LayoutEffect(props) {
        useLayoutEffect(() => {
          Scheduler.unstable_yieldValue(`Layout effect`);
=======
    it('simple mount and update', async () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.log(`Passive effect [${props.count}]`);
        });
        return <Text text={'Count: ' + props.count} />;
      }
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
        // Effects are deferred until after the commit
        await waitForAll(['Passive effect [0]']);
      });

      await act(async () => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 1', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
        // Effects are deferred until after the commit
        await waitForAll(['Passive effect [1]']);
      });
    });

    it('flushes passive effects even with sibling deletions', async () => {
      function LayoutEffect(props) {
        useLayoutEffect(() => {
          Scheduler.log(`Layout effect`);
>>>>>>> remotes/upstream/main
        });
        return <Text text="Layout" />;
      }
      function PassiveEffect(props) {
        useEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`Passive effect`);
=======
          Scheduler.log(`Passive effect`);
>>>>>>> remotes/upstream/main
        }, []);
        return <Text text="Passive" />;
      }
      const passive = <PassiveEffect key="p" />;
<<<<<<< HEAD
      act(() => {
        ReactNoop.render([<LayoutEffect key="l" />, passive]);
        expect(Scheduler).toFlushAndYieldThrough([
          'Layout',
          'Passive',
          'Layout effect',
        ]);
        expect(ReactNoop.getChildren()).toEqual([
          span('Layout'),
          span('Passive'),
        ]);
        // Destroying the first child shouldn't prevent the passive effect from
        // being executed
        ReactNoop.render([passive]);
        expect(Scheduler).toFlushAndYield(['Passive effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Passive')]);
      });
      // exiting act calls flushPassiveEffects(), but there are none left to flush.
      expect(Scheduler).toHaveYielded([]);
    });

    it('flushes passive effects even if siblings schedule an update', () => {
      function PassiveEffect(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue('Passive effect');
=======
      await act(async () => {
        ReactNoop.render([<LayoutEffect key="l" />, passive]);
        await waitFor(['Layout', 'Passive', 'Layout effect']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Layout" />
            <span prop="Passive" />
          </>,
        );
        // Destroying the first child shouldn't prevent the passive effect from
        // being executed
        ReactNoop.render([passive]);
        await waitForAll(['Passive effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Passive" />);
      });
      // exiting act calls flushPassiveEffects(), but there are none left to flush.
      assertLog([]);
    });

    it('flushes passive effects even if siblings schedule an update', async () => {
      function PassiveEffect(props) {
        useEffect(() => {
          Scheduler.log('Passive effect');
>>>>>>> remotes/upstream/main
        });
        return <Text text="Passive" />;
      }
      function LayoutEffect(props) {
        const [count, setCount] = useState(0);
        useLayoutEffect(() => {
          // Scheduling work shouldn't interfere with the queued passive effect
          if (count === 0) {
            setCount(1);
          }
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Layout effect ' + count);
=======
          Scheduler.log('Layout effect ' + count);
>>>>>>> remotes/upstream/main
        });
        return <Text text="Layout" />;
      }

      ReactNoop.render([<PassiveEffect key="p" />, <LayoutEffect key="l" />]);

<<<<<<< HEAD
      act(() => {
        expect(Scheduler).toFlushAndYield([
=======
      await act(async () => {
        await waitForAll([
>>>>>>> remotes/upstream/main
          'Passive',
          'Layout',
          'Layout effect 0',
          'Passive effect',
          'Layout',
          'Layout effect 1',
        ]);
      });

<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Passive'),
        span('Layout'),
      ]);
    });

    it('flushes passive effects even if siblings schedule a new root', () => {
      function PassiveEffect(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue('Passive effect');
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Passive" />
          <span prop="Layout" />
        </>,
      );
    });

    it('flushes passive effects even if siblings schedule a new root', async () => {
      function PassiveEffect(props) {
        useEffect(() => {
          Scheduler.log('Passive effect');
>>>>>>> remotes/upstream/main
        }, []);
        return <Text text="Passive" />;
      }
      function LayoutEffect(props) {
        useLayoutEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Layout effect');
=======
          Scheduler.log('Layout effect');
>>>>>>> remotes/upstream/main
          // Scheduling work shouldn't interfere with the queued passive effect
          ReactNoop.renderToRootWithID(<Text text="New Root" />, 'root2');
        });
        return <Text text="Layout" />;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render([<PassiveEffect key="p" />, <LayoutEffect key="l" />]);
        expect(Scheduler).toFlushAndYield([
=======
      await act(async () => {
        ReactNoop.render([<PassiveEffect key="p" />, <LayoutEffect key="l" />]);
        await waitForAll([
>>>>>>> remotes/upstream/main
          'Passive',
          'Layout',
          'Layout effect',
          'Passive effect',
          'New Root',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          span('Passive'),
          span('Layout'),
        ]);
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Passive" />
            <span prop="Layout" />
          </>,
        );
>>>>>>> remotes/upstream/main
      });
    });

    it(
      'flushes effects serially by flushing old effects before flushing ' +
        "new ones, if they haven't already fired",
<<<<<<< HEAD
      () => {
        function getCommittedText() {
          const children = ReactNoop.getChildren();
          if (children === null) {
            return null;
          }
          return children[0].prop;
=======
      async () => {
        function getCommittedText() {
          const children = ReactNoop.getChildrenAsJSX();
          if (children === null) {
            return null;
          }
          return children.props.prop;
>>>>>>> remotes/upstream/main
        }

        function Counter(props) {
          useEffect(() => {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue(
=======
            Scheduler.log(
>>>>>>> remotes/upstream/main
              `Committed state when effect was fired: ${getCommittedText()}`,
            );
          });
          return <Text text={props.count} />;
        }
<<<<<<< HEAD
        act(() => {
          ReactNoop.render(<Counter count={0} />, () =>
            Scheduler.unstable_yieldValue('Sync effect'),
          );
          expect(Scheduler).toFlushAndYieldThrough([0, 'Sync effect']);
          expect(ReactNoop.getChildren()).toEqual([span(0)]);
          // Before the effects have a chance to flush, schedule another update
          ReactNoop.render(<Counter count={1} />, () =>
            Scheduler.unstable_yieldValue('Sync effect'),
          );
          expect(Scheduler).toFlushAndYieldThrough([
=======
        await act(async () => {
          ReactNoop.render(<Counter count={0} />, () =>
            Scheduler.log('Sync effect'),
          );
          await waitFor([0, 'Sync effect']);
          expect(ReactNoop).toMatchRenderedOutput(<span prop={0} />);
          // Before the effects have a chance to flush, schedule another update
          ReactNoop.render(<Counter count={1} />, () =>
            Scheduler.log('Sync effect'),
          );
          await waitFor([
>>>>>>> remotes/upstream/main
            // The previous effect flushes before the reconciliation
            'Committed state when effect was fired: 0',
            1,
            'Sync effect',
          ]);
<<<<<<< HEAD
          expect(ReactNoop.getChildren()).toEqual([span(1)]);
        });

        expect(Scheduler).toHaveYielded([
          'Committed state when effect was fired: 1',
        ]);
      },
    );

    it('defers passive effect destroy functions during unmount', () => {
      function Child({bar, foo}) {
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('passive bar create');
          return () => {
            Scheduler.unstable_yieldValue('passive bar destroy');
          };
        }, [bar]);
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('layout bar create');
          return () => {
            Scheduler.unstable_yieldValue('layout bar destroy');
          };
        }, [bar]);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('passive foo create');
          return () => {
            Scheduler.unstable_yieldValue('passive foo destroy');
          };
        }, [foo]);
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('layout foo create');
          return () => {
            Scheduler.unstable_yieldValue('layout foo destroy');
          };
        }, [foo]);
        Scheduler.unstable_yieldValue('render');
        return null;
      }

      act(() => {
        ReactNoop.render(<Child bar={1} foo={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough([
=======
          expect(ReactNoop).toMatchRenderedOutput(<span prop={1} />);
        });

        assertLog(['Committed state when effect was fired: 1']);
      },
    );

    it('defers passive effect destroy functions during unmount', async () => {
      function Child({bar, foo}) {
        React.useEffect(() => {
          Scheduler.log('passive bar create');
          return () => {
            Scheduler.log('passive bar destroy');
          };
        }, [bar]);
        React.useLayoutEffect(() => {
          Scheduler.log('layout bar create');
          return () => {
            Scheduler.log('layout bar destroy');
          };
        }, [bar]);
        React.useEffect(() => {
          Scheduler.log('passive foo create');
          return () => {
            Scheduler.log('passive foo destroy');
          };
        }, [foo]);
        React.useLayoutEffect(() => {
          Scheduler.log('layout foo create');
          return () => {
            Scheduler.log('layout foo destroy');
          };
        }, [foo]);
        Scheduler.log('render');
        return null;
      }

      await act(async () => {
        ReactNoop.render(<Child bar={1} foo={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor([
>>>>>>> remotes/upstream/main
          'render',
          'layout bar create',
          'layout foo create',
          'Sync effect',
        ]);
        // Effects are deferred until after the commit
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
          'passive bar create',
          'passive foo create',
        ]);
=======
        await waitForAll(['passive bar create', 'passive foo create']);
>>>>>>> remotes/upstream/main
      });

      // This update exists to test an internal implementation detail:
      // Effects without updating dependencies lose their layout/passive tag during an update.
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Child bar={1} foo={2} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough([
=======
      await act(async () => {
        ReactNoop.render(<Child bar={1} foo={2} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor([
>>>>>>> remotes/upstream/main
          'render',
          'layout foo destroy',
          'layout foo create',
          'Sync effect',
        ]);
        // Effects are deferred until after the commit
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
          'passive foo destroy',
          'passive foo create',
        ]);
      });

      // Unmount the component and verify that passive destroy functions are deferred until post-commit.
      act(() => {
        ReactNoop.render(null, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough([
=======
        await waitForAll(['passive foo destroy', 'passive foo create']);
      });

      // Unmount the component and verify that passive destroy functions are deferred until post-commit.
      await act(async () => {
        ReactNoop.render(null, () => Scheduler.log('Sync effect'));
        await waitFor([
>>>>>>> remotes/upstream/main
          'layout bar destroy',
          'layout foo destroy',
          'Sync effect',
        ]);
        // Effects are deferred until after the commit
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
          'passive bar destroy',
          'passive foo destroy',
        ]);
      });
    });

    it('does not warn about state updates for unmounted components with pending passive unmounts', () => {
      let completePendingRequest = null;
      function Component() {
        Scheduler.unstable_yieldValue('Component');
        const [didLoad, setDidLoad] = React.useState(false);
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('layout create');
          return () => {
            Scheduler.unstable_yieldValue('layout destroy');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('passive create');
          // Mimic an XHR request with a complete handler that updates state.
          completePendingRequest = () => setDidLoad(true);
          return () => {
            Scheduler.unstable_yieldValue('passive destroy');
=======
        await waitForAll(['passive bar destroy', 'passive foo destroy']);
      });
    });

    it('does not warn about state updates for unmounted components with pending passive unmounts', async () => {
      let completePendingRequest = null;
      function Component() {
        Scheduler.log('Component');
        const [didLoad, setDidLoad] = React.useState(false);
        React.useLayoutEffect(() => {
          Scheduler.log('layout create');
          return () => {
            Scheduler.log('layout destroy');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.log('passive create');
          // Mimic an XHR request with a complete handler that updates state.
          completePendingRequest = () => setDidLoad(true);
          return () => {
            Scheduler.log('passive destroy');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return didLoad;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.renderToRootWithID(<Component />, 'root', () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough([
          'Component',
          'layout create',
          'Sync effect',
        ]);
        ReactNoop.flushPassiveEffects();
        expect(Scheduler).toHaveYielded(['passive create']);

        // Unmount but don't process pending passive destroy function
        ReactNoop.unmountRootWithID('root');
        expect(Scheduler).toFlushAndYieldThrough(['layout destroy']);
=======
      await act(async () => {
        ReactNoop.renderToRootWithID(<Component />, 'root', () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Component', 'layout create', 'Sync effect']);
        ReactNoop.flushPassiveEffects();
        assertLog(['passive create']);

        // Unmount but don't process pending passive destroy function
        ReactNoop.unmountRootWithID('root');
        await waitFor(['layout destroy']);
>>>>>>> remotes/upstream/main

        // Simulate an XHR completing, which will cause a state update-
        // but should not log a warning.
        completePendingRequest();

        ReactNoop.flushPassiveEffects();
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded(['passive destroy']);
      });
    });

    it('does not warn about state updates for unmounted components with pending passive unmounts for alternates', () => {
=======
        assertLog(['passive destroy']);
      });
    });

    it('does not warn about state updates for unmounted components with pending passive unmounts for alternates', async () => {
>>>>>>> remotes/upstream/main
      let setParentState = null;
      const setChildStates = [];

      function Parent() {
        const [state, setState] = useState(true);
        setParentState = setState;
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`Parent ${state} render`);
        useLayoutEffect(() => {
          Scheduler.unstable_yieldValue(`Parent ${state} commit`);
=======
        Scheduler.log(`Parent ${state} render`);
        useLayoutEffect(() => {
          Scheduler.log(`Parent ${state} commit`);
>>>>>>> remotes/upstream/main
        });
        if (state) {
          return (
            <>
              <Child label="one" />
              <Child label="two" />
            </>
          );
        } else {
          return null;
        }
      }

      function Child({label}) {
        const [state, setState] = useState(0);
        useLayoutEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`Child ${label} commit`);
        });
        useEffect(() => {
          setChildStates.push(setState);
          Scheduler.unstable_yieldValue(`Child ${label} passive create`);
          return () => {
            Scheduler.unstable_yieldValue(`Child ${label} passive destroy`);
          };
        }, []);
        Scheduler.unstable_yieldValue(`Child ${label} render`);
=======
          Scheduler.log(`Child ${label} commit`);
        });
        useEffect(() => {
          setChildStates.push(setState);
          Scheduler.log(`Child ${label} passive create`);
          return () => {
            Scheduler.log(`Child ${label} passive destroy`);
          };
        }, []);
        Scheduler.log(`Child ${label} render`);
>>>>>>> remotes/upstream/main
        return state;
      }

      // Schedule debounced state update for child (prob a no-op for this test)
      // later tick: schedule unmount for parent
      // start process unmount (but don't flush passive effectS)
      // State update on child
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Parent />);
        expect(Scheduler).toFlushAndYieldThrough([
=======
      await act(async () => {
        ReactNoop.render(<Parent />);
        await waitFor([
>>>>>>> remotes/upstream/main
          'Parent true render',
          'Child one render',
          'Child two render',
          'Child one commit',
          'Child two commit',
          'Parent true commit',
          'Child one passive create',
          'Child two passive create',
        ]);

        // Update children.
        setChildStates.forEach(setChildState => setChildState(1));
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYieldThrough([
=======
        await waitFor([
>>>>>>> remotes/upstream/main
          'Child one render',
          'Child two render',
          'Child one commit',
          'Child two commit',
        ]);

        // Schedule another update for children, and partially process it.
<<<<<<< HEAD
        if (gate(flags => flags.enableSyncDefaultUpdates)) {
          React.startTransition(() => {
            setChildStates.forEach(setChildState => setChildState(2));
          });
        } else {
          setChildStates.forEach(setChildState => setChildState(2));
        }
        expect(Scheduler).toFlushAndYieldThrough(['Child one render']);
=======
        React.startTransition(() => {
          setChildStates.forEach(setChildState => setChildState(2));
        });
        await waitFor(['Child one render']);
>>>>>>> remotes/upstream/main

        // Schedule unmount for the parent that unmounts children with pending update.
        ReactNoop.unstable_runWithPriority(ContinuousEventPriority, () => {
          setParentState(false);
        });
<<<<<<< HEAD
        expect(Scheduler).toFlushUntilNextPaint([
          'Parent false render',
          'Parent false commit',
        ]);

        // Schedule updates for children too (which should be ignored)
        setChildStates.forEach(setChildState => setChildState(2));
        expect(Scheduler).toFlushAndYield([
=======
        await waitForPaint(['Parent false render', 'Parent false commit']);

        // Schedule updates for children too (which should be ignored)
        setChildStates.forEach(setChildState => setChildState(2));
        await waitForAll([
>>>>>>> remotes/upstream/main
          'Child one passive destroy',
          'Child two passive destroy',
        ]);
      });
    });

<<<<<<< HEAD
    it('does not warn about state updates for unmounted components with no pending passive unmounts', () => {
      let completePendingRequest = null;
      function Component() {
        Scheduler.unstable_yieldValue('Component');
        const [didLoad, setDidLoad] = React.useState(false);
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('layout create');
          // Mimic an XHR request with a complete handler that updates state.
          completePendingRequest = () => setDidLoad(true);
          return () => {
            Scheduler.unstable_yieldValue('layout destroy');
=======
    it('does not warn about state updates for unmounted components with no pending passive unmounts', async () => {
      let completePendingRequest = null;
      function Component() {
        Scheduler.log('Component');
        const [didLoad, setDidLoad] = React.useState(false);
        React.useLayoutEffect(() => {
          Scheduler.log('layout create');
          // Mimic an XHR request with a complete handler that updates state.
          completePendingRequest = () => setDidLoad(true);
          return () => {
            Scheduler.log('layout destroy');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return didLoad;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.renderToRootWithID(<Component />, 'root', () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough([
          'Component',
          'layout create',
          'Sync effect',
        ]);

        // Unmount but don't process pending passive destroy function
        ReactNoop.unmountRootWithID('root');
        expect(Scheduler).toFlushAndYieldThrough(['layout destroy']);
=======
      await act(async () => {
        ReactNoop.renderToRootWithID(<Component />, 'root', () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Component', 'layout create', 'Sync effect']);

        // Unmount but don't process pending passive destroy function
        ReactNoop.unmountRootWithID('root');
        await waitFor(['layout destroy']);
>>>>>>> remotes/upstream/main

        // Simulate an XHR completing.
        completePendingRequest();
      });
    });

<<<<<<< HEAD
    it('does not warn if there are pending passive unmount effects but not for the current fiber', () => {
      let completePendingRequest = null;
      function ComponentWithXHR() {
        Scheduler.unstable_yieldValue('Component');
        const [didLoad, setDidLoad] = React.useState(false);
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('a:layout create');
          return () => {
            Scheduler.unstable_yieldValue('a:layout destroy');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('a:passive create');
=======
    it('does not warn if there are pending passive unmount effects but not for the current fiber', async () => {
      let completePendingRequest = null;
      function ComponentWithXHR() {
        Scheduler.log('Component');
        const [didLoad, setDidLoad] = React.useState(false);
        React.useLayoutEffect(() => {
          Scheduler.log('a:layout create');
          return () => {
            Scheduler.log('a:layout destroy');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.log('a:passive create');
>>>>>>> remotes/upstream/main
          // Mimic an XHR request with a complete handler that updates state.
          completePendingRequest = () => setDidLoad(true);
        }, []);
        return didLoad;
      }

      function ComponentWithPendingPassiveUnmount() {
        React.useEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('b:passive create');
          return () => {
            Scheduler.unstable_yieldValue('b:passive destroy');
=======
          Scheduler.log('b:passive create');
          return () => {
            Scheduler.log('b:passive destroy');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return null;
      }

<<<<<<< HEAD
      act(() => {
=======
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.renderToRootWithID(
          <>
            <ComponentWithXHR />
            <ComponentWithPendingPassiveUnmount />
          </>,
          'root',
<<<<<<< HEAD
          () => Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough([
          'Component',
          'a:layout create',
          'Sync effect',
        ]);
        ReactNoop.flushPassiveEffects();
        expect(Scheduler).toHaveYielded([
          'a:passive create',
          'b:passive create',
        ]);

        // Unmount but don't process pending passive destroy function
        ReactNoop.unmountRootWithID('root');
        expect(Scheduler).toFlushAndYieldThrough(['a:layout destroy']);
=======
          () => Scheduler.log('Sync effect'),
        );
        await waitFor(['Component', 'a:layout create', 'Sync effect']);
        ReactNoop.flushPassiveEffects();
        assertLog(['a:passive create', 'b:passive create']);

        // Unmount but don't process pending passive destroy function
        ReactNoop.unmountRootWithID('root');
        await waitFor(['a:layout destroy']);
>>>>>>> remotes/upstream/main

        // Simulate an XHR completing in the component without a pending passive effect..
        completePendingRequest();
      });
    });

<<<<<<< HEAD
    it('does not warn if there are updates after pending passive unmount effects have been flushed', () => {
      let updaterFunction;

      function Component() {
        Scheduler.unstable_yieldValue('Component');
        const [state, setState] = React.useState(false);
        updaterFunction = setState;
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('passive create');
          return () => {
            Scheduler.unstable_yieldValue('passive destroy');
=======
    it('does not warn if there are updates after pending passive unmount effects have been flushed', async () => {
      let updaterFunction;

      function Component() {
        Scheduler.log('Component');
        const [state, setState] = React.useState(false);
        updaterFunction = setState;
        React.useEffect(() => {
          Scheduler.log('passive create');
          return () => {
            Scheduler.log('passive destroy');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return state;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.renderToRootWithID(<Component />, 'root', () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
      });
      expect(Scheduler).toHaveYielded([
        'Component',
        'Sync effect',
        'passive create',
      ]);

      ReactNoop.unmountRootWithID('root');
      expect(Scheduler).toFlushAndYield(['passive destroy']);

      act(() => {
=======
      await act(() => {
        ReactNoop.renderToRootWithID(<Component />, 'root', () =>
          Scheduler.log('Sync effect'),
        );
      });
      assertLog(['Component', 'Sync effect', 'passive create']);

      ReactNoop.unmountRootWithID('root');
      await waitForAll(['passive destroy']);

      await act(() => {
>>>>>>> remotes/upstream/main
        updaterFunction(true);
      });
    });

<<<<<<< HEAD
    it('does not show a warning when a component updates its own state from within passive unmount function', () => {
      function Component() {
        Scheduler.unstable_yieldValue('Component');
        const [didLoad, setDidLoad] = React.useState(false);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('passive create');
          return () => {
            setDidLoad(true);
            Scheduler.unstable_yieldValue('passive destroy');
=======
    it('does not show a warning when a component updates its own state from within passive unmount function', async () => {
      function Component() {
        Scheduler.log('Component');
        const [didLoad, setDidLoad] = React.useState(false);
        React.useEffect(() => {
          Scheduler.log('passive create');
          return () => {
            setDidLoad(true);
            Scheduler.log('passive destroy');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return didLoad;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.renderToRootWithID(<Component />, 'root', () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough([
          'Component',
          'Sync effect',
          'passive create',
        ]);

        // Unmount but don't process pending passive destroy function
        ReactNoop.unmountRootWithID('root');
        expect(Scheduler).toFlushAndYield(['passive destroy']);
      });
    });

    it('does not show a warning when a component updates a child state from within passive unmount function', () => {
      function Parent() {
        Scheduler.unstable_yieldValue('Parent');
        const updaterRef = useRef(null);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('Parent passive create');
          return () => {
            updaterRef.current(true);
            Scheduler.unstable_yieldValue('Parent passive destroy');
=======
      await act(async () => {
        ReactNoop.renderToRootWithID(<Component />, 'root', () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Component', 'Sync effect', 'passive create']);

        // Unmount but don't process pending passive destroy function
        ReactNoop.unmountRootWithID('root');
        await waitForAll(['passive destroy']);
      });
    });

    it('does not show a warning when a component updates a child state from within passive unmount function', async () => {
      function Parent() {
        Scheduler.log('Parent');
        const updaterRef = useRef(null);
        React.useEffect(() => {
          Scheduler.log('Parent passive create');
          return () => {
            updaterRef.current(true);
            Scheduler.log('Parent passive destroy');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return <Child updaterRef={updaterRef} />;
      }

      function Child({updaterRef}) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Child');
        const [state, setState] = React.useState(false);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('Child passive create');
=======
        Scheduler.log('Child');
        const [state, setState] = React.useState(false);
        React.useEffect(() => {
          Scheduler.log('Child passive create');
>>>>>>> remotes/upstream/main
          updaterRef.current = setState;
        }, []);
        return state;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.renderToRootWithID(<Parent />, 'root');
        expect(Scheduler).toFlushAndYieldThrough([
=======
      await act(async () => {
        ReactNoop.renderToRootWithID(<Parent />, 'root');
        await waitFor([
>>>>>>> remotes/upstream/main
          'Parent',
          'Child',
          'Child passive create',
          'Parent passive create',
        ]);

        // Unmount but don't process pending passive destroy function
        ReactNoop.unmountRootWithID('root');
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield(['Parent passive destroy']);
      });
    });

    it('does not show a warning when a component updates a parents state from within passive unmount function', () => {
      function Parent() {
        const [state, setState] = React.useState(false);
        Scheduler.unstable_yieldValue('Parent');
=======
        await waitForAll(['Parent passive destroy']);
      });
    });

    it('does not show a warning when a component updates a parents state from within passive unmount function', async () => {
      function Parent() {
        const [state, setState] = React.useState(false);
        Scheduler.log('Parent');
>>>>>>> remotes/upstream/main
        return <Child setState={setState} state={state} />;
      }

      function Child({setState, state}) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Child');
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('Child passive create');
          return () => {
            Scheduler.unstable_yieldValue('Child passive destroy');
=======
        Scheduler.log('Child');
        React.useEffect(() => {
          Scheduler.log('Child passive create');
          return () => {
            Scheduler.log('Child passive destroy');
>>>>>>> remotes/upstream/main
            setState(true);
          };
        }, []);
        return state;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.renderToRootWithID(<Parent />, 'root');
        expect(Scheduler).toFlushAndYieldThrough([
          'Parent',
          'Child',
          'Child passive create',
        ]);

        // Unmount but don't process pending passive destroy function
        ReactNoop.unmountRootWithID('root');
        expect(Scheduler).toFlushAndYield(['Child passive destroy']);
      });
    });

    it('updates have async priority', () => {
      function Counter(props) {
        const [count, updateCount] = useState('(empty)');
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Schedule update [${props.count}]`);
=======
      await act(async () => {
        ReactNoop.renderToRootWithID(<Parent />, 'root');
        await waitFor(['Parent', 'Child', 'Child passive create']);

        // Unmount but don't process pending passive destroy function
        ReactNoop.unmountRootWithID('root');
        await waitForAll(['Child passive destroy']);
      });
    });

    it('updates have async priority', async () => {
      function Counter(props) {
        const [count, updateCount] = useState('(empty)');
        useEffect(() => {
          Scheduler.log(`Schedule update [${props.count}]`);
>>>>>>> remotes/upstream/main
          updateCount(props.count);
        }, [props.count]);
        return <Text text={'Count: ' + count} />;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough([
          'Count: (empty)',
          'Sync effect',
        ]);
        expect(ReactNoop.getChildren()).toEqual([span('Count: (empty)')]);
        ReactNoop.flushPassiveEffects();
        expect(Scheduler).toHaveYielded(['Schedule update [0]']);
        expect(Scheduler).toFlushAndYield(['Count: 0']);
      });

      act(() => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
        ReactNoop.flushPassiveEffects();
        expect(Scheduler).toHaveYielded(['Schedule update [1]']);
        expect(Scheduler).toFlushAndYield(['Count: 1']);
      });
    });

    it('updates have async priority even if effects are flushed early', () => {
      function Counter(props) {
        const [count, updateCount] = useState('(empty)');
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Schedule update [${props.count}]`);
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: (empty)', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: (empty)" />);
        ReactNoop.flushPassiveEffects();
        assertLog(['Schedule update [0]']);
        await waitForAll(['Count: 0']);
      });

      await act(async () => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
        ReactNoop.flushPassiveEffects();
        assertLog(['Schedule update [1]']);
        await waitForAll(['Count: 1']);
      });
    });

    it('updates have async priority even if effects are flushed early', async () => {
      function Counter(props) {
        const [count, updateCount] = useState('(empty)');
        useEffect(() => {
          Scheduler.log(`Schedule update [${props.count}]`);
>>>>>>> remotes/upstream/main
          updateCount(props.count);
        }, [props.count]);
        return <Text text={'Count: ' + count} />;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough([
          'Count: (empty)',
          'Sync effect',
        ]);
        expect(ReactNoop.getChildren()).toEqual([span('Count: (empty)')]);

        // Rendering again should flush the previous commit's effects
        if (gate(flags => flags.enableSyncDefaultUpdates)) {
          React.startTransition(() => {
            ReactNoop.render(<Counter count={1} />, () =>
              Scheduler.unstable_yieldValue('Sync effect'),
            );
          });
        } else {
          ReactNoop.render(<Counter count={1} />, () =>
            Scheduler.unstable_yieldValue('Sync effect'),
          );
        }

        expect(Scheduler).toFlushAndYieldThrough([
          'Schedule update [0]',
          'Count: 0',
        ]);

        if (gate(flags => flags.enableSyncDefaultUpdates)) {
          expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
          expect(Scheduler).toFlushAndYieldThrough([
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: (empty)', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: (empty)" />);

        // Rendering again should flush the previous commit's effects
        if (gate(flags => flags.forceConcurrentByDefaultForTesting)) {
          ReactNoop.render(<Counter count={1} />, () =>
            Scheduler.log('Sync effect'),
          );
        } else {
          React.startTransition(() => {
            ReactNoop.render(<Counter count={1} />, () =>
              Scheduler.log('Sync effect'),
            );
          });
        }

        await waitFor(['Schedule update [0]', 'Count: 0']);

        if (gate(flags => flags.forceConcurrentByDefaultForTesting)) {
          expect(ReactNoop).toMatchRenderedOutput(
            <span prop="Count: (empty)" />,
          );
          await waitFor(['Sync effect']);
          expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);

          ReactNoop.flushPassiveEffects();
          assertLog(['Schedule update [1]']);
          await waitForAll(['Count: 1']);
        } else {
          expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
          await waitFor([
>>>>>>> remotes/upstream/main
            'Count: 0',
            'Sync effect',
            'Schedule update [1]',
            'Count: 1',
          ]);
<<<<<<< HEAD
        } else {
          expect(ReactNoop.getChildren()).toEqual([span('Count: (empty)')]);
          expect(Scheduler).toFlushAndYieldThrough(['Sync effect']);
          expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);

          ReactNoop.flushPassiveEffects();
          expect(Scheduler).toHaveYielded(['Schedule update [1]']);
          expect(Scheduler).toFlushAndYield(['Count: 1']);
        }

        expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
      });
    });

    it('does not flush non-discrete passive effects when flushing sync', () => {
=======
        }

        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
      });
    });

    it('does not flush non-discrete passive effects when flushing sync', async () => {
>>>>>>> remotes/upstream/main
      let _updateCount;
      function Counter(props) {
        const [count, updateCount] = useState(0);
        _updateCount = updateCount;
        useEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`Will set count to 1`);
=======
          Scheduler.log(`Will set count to 1`);
>>>>>>> remotes/upstream/main
          updateCount(1);
        }, []);
        return <Text text={'Count: ' + count} />;
      }

      ReactNoop.render(<Counter count={0} />, () =>
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Sync effect'),
      );
      expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
      // A flush sync doesn't cause the passive effects to fire.
      // So we haven't added the other update yet.
      act(() => {
=======
        Scheduler.log('Sync effect'),
      );
      await waitFor(['Count: 0', 'Sync effect']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
      // A flush sync doesn't cause the passive effects to fire.
      // So we haven't added the other update yet.
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.flushSync(() => {
          _updateCount(2);
        });
      });

      // As a result we, somewhat surprisingly, commit them in the opposite order.
      // This should be fine because any non-discrete set of work doesn't guarantee order
      // and easily could've happened slightly later too.
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Will set count to 1',
        'Count: 2',
        'Count: 1',
      ]);

      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
=======
      if (gate(flags => flags.enableUnifiedSyncLane)) {
        assertLog(['Will set count to 1', 'Count: 1']);
      } else {
        assertLog(['Will set count to 1', 'Count: 2', 'Count: 1']);
      }

      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
>>>>>>> remotes/upstream/main
    });

    it(
      'in legacy mode, useEffect is deferred and updates finish synchronously ' +
        '(in a single batch)',
      async () => {
        function Counter(props) {
          const [count, updateCount] = useState('(empty)');
          useEffect(() => {
            // Update multiple times. These should all be batched together in
            // a single render.
            updateCount(props.count);
            updateCount(props.count);
            updateCount(props.count);
            updateCount(props.count);
            updateCount(props.count);
            updateCount(props.count);
          }, [props.count]);
          return <Text text={'Count: ' + count} />;
        }
<<<<<<< HEAD
        await act(async () => {
=======
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.flushSync(() => {
            ReactNoop.renderLegacySyncRoot(<Counter count={0} />);
          });

          // Even in legacy mode, effects are deferred until after paint
<<<<<<< HEAD
          expect(Scheduler).toHaveYielded(['Count: (empty)']);
          expect(ReactNoop.getChildren()).toEqual([span('Count: (empty)')]);
=======
          assertLog(['Count: (empty)']);
          expect(ReactNoop).toMatchRenderedOutput(
            <span prop="Count: (empty)" />,
          );
>>>>>>> remotes/upstream/main
        });

        // effects get forced on exiting act()
        // There were multiple updates, but there should only be a
        // single render
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded(['Count: 0']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
      },
    );

    it('flushSync is not allowed', () => {
      function Counter(props) {
        const [count, updateCount] = useState('(empty)');
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Schedule update [${props.count}]`);
          ReactNoop.flushSync(() => {
            updateCount(props.count);
          });
          // This shouldn't flush synchronously.
          expect(ReactNoop.getChildren()).not.toEqual([
            span('Count: ' + props.count),
          ]);
        }, [props.count]);
        return <Text text={'Count: ' + count} />;
      }
      expect(() =>
        act(() => {
          ReactNoop.render(<Counter count={0} />, () =>
            Scheduler.unstable_yieldValue('Sync effect'),
          );
          expect(Scheduler).toFlushAndYieldThrough([
            'Count: (empty)',
            'Sync effect',
          ]);
          expect(ReactNoop.getChildren()).toEqual([span('Count: (empty)')]);
        }),
      ).toErrorDev('flushSync was called from inside a lifecycle method');
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
    });

    it('unmounts previous effect', () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Did create [${props.count}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Did destroy [${props.count}]`);
=======
        assertLog(['Count: 0']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
      },
    );

    it('flushSync is not allowed', async () => {
      function Counter(props) {
        const [count, updateCount] = useState('(empty)');
        useEffect(() => {
          Scheduler.log(`Schedule update [${props.count}]`);
          ReactNoop.flushSync(() => {
            updateCount(props.count);
          });
          assertLog([`Schedule update [${props.count}]`]);
          // This shouldn't flush synchronously.
          expect(ReactNoop).not.toMatchRenderedOutput(
            <span prop={`Count: ${props.count}`} />,
          );
        }, [props.count]);
        return <Text text={'Count: ' + count} />;
      }
      await expect(async () => {
        await act(async () => {
          ReactNoop.render(<Counter count={0} />, () =>
            Scheduler.log('Sync effect'),
          );
          await waitFor(['Count: (empty)', 'Sync effect']);
          expect(ReactNoop).toMatchRenderedOutput(
            <span prop="Count: (empty)" />,
          );
        });
      }).toErrorDev('flushSync was called from inside a lifecycle method');
      assertLog([`Count: 0`]);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
    });

    it('unmounts previous effect', async () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.log(`Did create [${props.count}]`);
          return () => {
            Scheduler.log(`Did destroy [${props.count}]`);
>>>>>>> remotes/upstream/main
          };
        });
        return <Text text={'Count: ' + props.count} />;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
      });

      expect(Scheduler).toHaveYielded(['Did create [0]']);

      act(() => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 1', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
      });

      expect(Scheduler).toHaveYielded(['Did destroy [0]', 'Did create [1]']);
    });

    it('unmounts on deletion', () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Did create [${props.count}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Did destroy [${props.count}]`);
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
      });

      assertLog(['Did create [0]']);

      await act(async () => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 1', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
      });

      assertLog(['Did destroy [0]', 'Did create [1]']);
    });

    it('unmounts on deletion', async () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.log(`Did create [${props.count}]`);
          return () => {
            Scheduler.log(`Did destroy [${props.count}]`);
>>>>>>> remotes/upstream/main
          };
        });
        return <Text text={'Count: ' + props.count} />;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
      });

      expect(Scheduler).toHaveYielded(['Did create [0]']);

      ReactNoop.render(null);
      expect(Scheduler).toFlushAndYield(['Did destroy [0]']);
      expect(ReactNoop.getChildren()).toEqual([]);
    });

    it('unmounts on deletion after skipped effect', () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Did create [${props.count}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Did destroy [${props.count}]`);
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
      });

      assertLog(['Did create [0]']);

      ReactNoop.render(null);
      await waitForAll(['Did destroy [0]']);
      expect(ReactNoop).toMatchRenderedOutput(null);
    });

    it('unmounts on deletion after skipped effect', async () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.log(`Did create [${props.count}]`);
          return () => {
            Scheduler.log(`Did destroy [${props.count}]`);
>>>>>>> remotes/upstream/main
          };
        }, []);
        return <Text text={'Count: ' + props.count} />;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
      });

      expect(Scheduler).toHaveYielded(['Did create [0]']);

      act(() => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 1', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
      });

      expect(Scheduler).toHaveYielded([]);

      ReactNoop.render(null);
      expect(Scheduler).toFlushAndYield(['Did destroy [0]']);
      expect(ReactNoop.getChildren()).toEqual([]);
    });

    it('always fires effects if no dependencies are provided', () => {
      function effect() {
        Scheduler.unstable_yieldValue(`Did create`);
        return () => {
          Scheduler.unstable_yieldValue(`Did destroy`);
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
      });

      assertLog(['Did create [0]']);

      await act(async () => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 1', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
      });

      assertLog([]);

      ReactNoop.render(null);
      await waitForAll(['Did destroy [0]']);
      expect(ReactNoop).toMatchRenderedOutput(null);
    });

    it('always fires effects if no dependencies are provided', async () => {
      function effect() {
        Scheduler.log(`Did create`);
        return () => {
          Scheduler.log(`Did destroy`);
>>>>>>> remotes/upstream/main
        };
      }
      function Counter(props) {
        useEffect(effect);
        return <Text text={'Count: ' + props.count} />;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
      });

      expect(Scheduler).toHaveYielded(['Did create']);

      act(() => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 1', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
      });

      expect(Scheduler).toHaveYielded(['Did destroy', 'Did create']);

      ReactNoop.render(null);
      expect(Scheduler).toFlushAndYield(['Did destroy']);
      expect(ReactNoop.getChildren()).toEqual([]);
    });

    it('skips effect if inputs have not changed', () => {
      function Counter(props) {
        const text = `${props.label}: ${props.count}`;
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Did create [${text}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Did destroy [${text}]`);
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
      });

      assertLog(['Did create']);

      await act(async () => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 1', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
      });

      assertLog(['Did destroy', 'Did create']);

      ReactNoop.render(null);
      await waitForAll(['Did destroy']);
      expect(ReactNoop).toMatchRenderedOutput(null);
    });

    it('skips effect if inputs have not changed', async () => {
      function Counter(props) {
        const text = `${props.label}: ${props.count}`;
        useEffect(() => {
          Scheduler.log(`Did create [${text}]`);
          return () => {
            Scheduler.log(`Did destroy [${text}]`);
>>>>>>> remotes/upstream/main
          };
        }, [props.label, props.count]);
        return <Text text={text} />;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter label="Count" count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
      });

      expect(Scheduler).toHaveYielded(['Did create [Count: 0]']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);

      act(() => {
        ReactNoop.render(<Counter label="Count" count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        // Count changed
        expect(Scheduler).toFlushAndYieldThrough(['Count: 1', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
      });

      expect(Scheduler).toHaveYielded([
        'Did destroy [Count: 0]',
        'Did create [Count: 1]',
      ]);

      act(() => {
        ReactNoop.render(<Counter label="Count" count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        // Nothing changed, so no effect should have fired
        expect(Scheduler).toFlushAndYieldThrough(['Count: 1', 'Sync effect']);
      });

      expect(Scheduler).toHaveYielded([]);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);

      act(() => {
        ReactNoop.render(<Counter label="Total" count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        // Label changed
        expect(Scheduler).toFlushAndYieldThrough(['Total: 1', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Total: 1')]);
      });

      expect(Scheduler).toHaveYielded([
        'Did destroy [Count: 1]',
        'Did create [Total: 1]',
      ]);
    });

    it('multiple effects', () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Did commit 1 [${props.count}]`);
        });
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Did commit 2 [${props.count}]`);
        });
        return <Text text={'Count: ' + props.count} />;
      }
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
      });

      expect(Scheduler).toHaveYielded(['Did commit 1 [0]', 'Did commit 2 [0]']);

      act(() => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 1', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
      });
      expect(Scheduler).toHaveYielded(['Did commit 1 [1]', 'Did commit 2 [1]']);
    });

    it('unmounts all previous effects before creating any new ones', () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Mount A [${props.count}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Unmount A [${props.count}]`);
          };
        });
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Mount B [${props.count}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Unmount B [${props.count}]`);
=======
      await act(async () => {
        ReactNoop.render(<Counter label="Count" count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
      });

      assertLog(['Did create [Count: 0]']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);

      await act(async () => {
        ReactNoop.render(<Counter label="Count" count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        // Count changed
        await waitFor(['Count: 1', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
      });

      assertLog(['Did destroy [Count: 0]', 'Did create [Count: 1]']);

      await act(async () => {
        ReactNoop.render(<Counter label="Count" count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        // Nothing changed, so no effect should have fired
        await waitFor(['Count: 1', 'Sync effect']);
      });

      assertLog([]);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);

      await act(async () => {
        ReactNoop.render(<Counter label="Total" count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        // Label changed
        await waitFor(['Total: 1', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Total: 1" />);
      });

      assertLog(['Did destroy [Count: 1]', 'Did create [Total: 1]']);
    });

    it('multiple effects', async () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.log(`Did commit 1 [${props.count}]`);
        });
        useEffect(() => {
          Scheduler.log(`Did commit 2 [${props.count}]`);
        });
        return <Text text={'Count: ' + props.count} />;
      }
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
      });

      assertLog(['Did commit 1 [0]', 'Did commit 2 [0]']);

      await act(async () => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 1', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
      });
      assertLog(['Did commit 1 [1]', 'Did commit 2 [1]']);
    });

    it('unmounts all previous effects before creating any new ones', async () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.log(`Mount A [${props.count}]`);
          return () => {
            Scheduler.log(`Unmount A [${props.count}]`);
          };
        });
        useEffect(() => {
          Scheduler.log(`Mount B [${props.count}]`);
          return () => {
            Scheduler.log(`Unmount B [${props.count}]`);
>>>>>>> remotes/upstream/main
          };
        });
        return <Text text={'Count: ' + props.count} />;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
      });

      expect(Scheduler).toHaveYielded(['Mount A [0]', 'Mount B [0]']);

      act(() => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 1', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
      });

      assertLog(['Mount A [0]', 'Mount B [0]']);

      await act(async () => {
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 1', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Unmount A [0]',
        'Unmount B [0]',
        'Mount A [1]',
        'Mount B [1]',
      ]);
    });

<<<<<<< HEAD
    it('unmounts all previous effects between siblings before creating any new ones', () => {
      function Counter({count, label}) {
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Mount ${label} [${count}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Unmount ${label} [${count}]`);
=======
    it('unmounts all previous effects between siblings before creating any new ones', async () => {
      function Counter({count, label}) {
        useEffect(() => {
          Scheduler.log(`Mount ${label} [${count}]`);
          return () => {
            Scheduler.log(`Unmount ${label} [${count}]`);
>>>>>>> remotes/upstream/main
          };
        });
        return <Text text={`${label} ${count}`} />;
      }
<<<<<<< HEAD
      act(() => {
=======
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <>
            <Counter label="A" count={0} />
            <Counter label="B" count={0} />
          </>,
<<<<<<< HEAD
          () => Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['A 0', 'B 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('A 0'), span('B 0')]);
      });

      expect(Scheduler).toHaveYielded(['Mount A [0]', 'Mount B [0]']);

      act(() => {
=======
          () => Scheduler.log('Sync effect'),
        );
        await waitFor(['A 0', 'B 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="A 0" />
            <span prop="B 0" />
          </>,
        );
      });

      assertLog(['Mount A [0]', 'Mount B [0]']);

      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <>
            <Counter label="A" count={1} />
            <Counter label="B" count={1} />
          </>,
<<<<<<< HEAD
          () => Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['A 1', 'B 1', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('A 1'), span('B 1')]);
      });
      expect(Scheduler).toHaveYielded([
=======
          () => Scheduler.log('Sync effect'),
        );
        await waitFor(['A 1', 'B 1', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="A 1" />
            <span prop="B 1" />
          </>,
        );
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Unmount A [0]',
        'Unmount B [0]',
        'Mount A [1]',
        'Mount B [1]',
      ]);

<<<<<<< HEAD
      act(() => {
=======
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <>
            <Counter label="B" count={2} />
            <Counter label="C" count={0} />
          </>,
<<<<<<< HEAD
          () => Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['B 2', 'C 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('B 2'), span('C 0')]);
      });
      expect(Scheduler).toHaveYielded([
=======
          () => Scheduler.log('Sync effect'),
        );
        await waitFor(['B 2', 'C 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="B 2" />
            <span prop="C 0" />
          </>,
        );
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Unmount A [1]',
        'Unmount B [1]',
        'Mount B [2]',
        'Mount C [0]',
      ]);
    });

<<<<<<< HEAD
    it('handles errors in create on mount', () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Mount A [${props.count}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Unmount A [${props.count}]`);
          };
        });
        useEffect(() => {
          Scheduler.unstable_yieldValue('Oops!');
          throw new Error('Oops!');
          // eslint-disable-next-line no-unreachable
          Scheduler.unstable_yieldValue(`Mount B [${props.count}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Unmount B [${props.count}]`);
=======
    it('handles errors in create on mount', async () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.log(`Mount A [${props.count}]`);
          return () => {
            Scheduler.log(`Unmount A [${props.count}]`);
          };
        });
        useEffect(() => {
          Scheduler.log('Oops!');
          throw new Error('Oops!');
          // eslint-disable-next-line no-unreachable
          Scheduler.log(`Mount B [${props.count}]`);
          return () => {
            Scheduler.log(`Unmount B [${props.count}]`);
>>>>>>> remotes/upstream/main
          };
        });
        return <Text text={'Count: ' + props.count} />;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
        expect(() => ReactNoop.flushPassiveEffects()).toThrow('Oops');
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
        expect(() => ReactNoop.flushPassiveEffects()).toThrow('Oops');
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'Mount A [0]',
        'Oops!',
        // Clean up effect A. There's no effect B to clean-up, because it
        // never mounted.
        'Unmount A [0]',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);
    });

    it('handles errors in create on update', () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Mount A [${props.count}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Unmount A [${props.count}]`);
=======
      expect(ReactNoop).toMatchRenderedOutput(null);
    });

    it('handles errors in create on update', async () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.log(`Mount A [${props.count}]`);
          return () => {
            Scheduler.log(`Unmount A [${props.count}]`);
>>>>>>> remotes/upstream/main
          };
        });
        useEffect(() => {
          if (props.count === 1) {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Oops!');
            throw new Error('Oops!');
          }
          Scheduler.unstable_yieldValue(`Mount B [${props.count}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Unmount B [${props.count}]`);
=======
            Scheduler.log('Oops!');
            throw new Error('Oops!');
          }
          Scheduler.log(`Mount B [${props.count}]`);
          return () => {
            Scheduler.log(`Unmount B [${props.count}]`);
>>>>>>> remotes/upstream/main
          };
        });
        return <Text text={'Count: ' + props.count} />;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
        ReactNoop.flushPassiveEffects();
        expect(Scheduler).toHaveYielded(['Mount A [0]', 'Mount B [0]']);
      });

      act(() => {
        // This update will trigger an error
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 1', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
        expect(() => ReactNoop.flushPassiveEffects()).toThrow('Oops');
        expect(Scheduler).toHaveYielded([
          'Unmount A [0]',
          'Unmount B [0]',
          'Mount A [1]',
          'Oops!',
        ]);
        expect(ReactNoop.getChildren()).toEqual([]);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
        ReactNoop.flushPassiveEffects();
        assertLog(['Mount A [0]', 'Mount B [0]']);
      });

      await act(async () => {
        // This update will trigger an error
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 1', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
        expect(() => ReactNoop.flushPassiveEffects()).toThrow('Oops');
        assertLog(['Unmount A [0]', 'Unmount B [0]', 'Mount A [1]', 'Oops!']);
        expect(ReactNoop).toMatchRenderedOutput(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        // Clean up effect A runs passively on unmount.
        // There's no effect B to clean-up, because it never mounted.
        'Unmount A [1]',
      ]);
    });

<<<<<<< HEAD
    it('handles errors in destroy on update', () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue(`Mount A [${props.count}]`);
          return () => {
            Scheduler.unstable_yieldValue('Oops!');
=======
    it('handles errors in destroy on update', async () => {
      function Counter(props) {
        useEffect(() => {
          Scheduler.log(`Mount A [${props.count}]`);
          return () => {
            Scheduler.log('Oops!');
>>>>>>> remotes/upstream/main
            if (props.count === 0) {
              throw new Error('Oops!');
            }
          };
        });
        useEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`Mount B [${props.count}]`);
          return () => {
            Scheduler.unstable_yieldValue(`Unmount B [${props.count}]`);
=======
          Scheduler.log(`Mount B [${props.count}]`);
          return () => {
            Scheduler.log(`Unmount B [${props.count}]`);
>>>>>>> remotes/upstream/main
          };
        });
        return <Text text={'Count: ' + props.count} />;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 0', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
        ReactNoop.flushPassiveEffects();
        expect(Scheduler).toHaveYielded(['Mount A [0]', 'Mount B [0]']);
      });

      act(() => {
        // This update will trigger an error during passive effect unmount
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Count: 1', 'Sync effect']);
        expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 0', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
        ReactNoop.flushPassiveEffects();
        assertLog(['Mount A [0]', 'Mount B [0]']);
      });

      await act(async () => {
        // This update will trigger an error during passive effect unmount
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Count: 1', 'Sync effect']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
>>>>>>> remotes/upstream/main
        expect(() => ReactNoop.flushPassiveEffects()).toThrow('Oops');

        // This branch enables a feature flag that flushes all passive destroys in a
        // separate pass before flushing any passive creates.
        // A result of this two-pass flush is that an error thrown from unmount does
        // not block the subsequent create functions from being run.
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
          'Oops!',
          'Unmount B [0]',
          'Mount A [1]',
          'Mount B [1]',
        ]);
=======
        assertLog(['Oops!', 'Unmount B [0]', 'Mount A [1]', 'Mount B [1]']);
>>>>>>> remotes/upstream/main
      });

      // <Counter> gets unmounted because an error is thrown above.
      // The remaining destroy functions are run later on unmount, since they're passive.
      // In this case, one of them throws again (because of how the test is written).
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Oops!', 'Unmount B [1]']);
      expect(ReactNoop.getChildren()).toEqual([]);
    });

    it('works with memo', () => {
      function Counter({count}) {
        useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('Mount: ' + count);
          return () => Scheduler.unstable_yieldValue('Unmount: ' + count);
=======
      assertLog(['Oops!', 'Unmount B [1]']);
      expect(ReactNoop).toMatchRenderedOutput(null);
    });

    it('works with memo', async () => {
      function Counter({count}) {
        useLayoutEffect(() => {
          Scheduler.log('Mount: ' + count);
          return () => Scheduler.log('Unmount: ' + count);
>>>>>>> remotes/upstream/main
        });
        return <Text text={'Count: ' + count} />;
      }
      Counter = memo(Counter);

      ReactNoop.render(<Counter count={0} />, () =>
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Sync effect'),
      );
      expect(Scheduler).toFlushAndYieldThrough([
        'Count: 0',
        'Mount: 0',
        'Sync effect',
      ]);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);

      ReactNoop.render(<Counter count={1} />, () =>
        Scheduler.unstable_yieldValue('Sync effect'),
      );
      expect(Scheduler).toFlushAndYieldThrough([
        'Count: 1',
        'Unmount: 0',
        'Mount: 1',
        'Sync effect',
      ]);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);

      ReactNoop.render(null);
      expect(Scheduler).toFlushAndYieldThrough(['Unmount: 1']);
      expect(ReactNoop.getChildren()).toEqual([]);
=======
        Scheduler.log('Sync effect'),
      );
      await waitFor(['Count: 0', 'Mount: 0', 'Sync effect']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);

      ReactNoop.render(<Counter count={1} />, () =>
        Scheduler.log('Sync effect'),
      );
      await waitFor(['Count: 1', 'Unmount: 0', 'Mount: 1', 'Sync effect']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);

      ReactNoop.render(null);
      await waitFor(['Unmount: 1']);
      expect(ReactNoop).toMatchRenderedOutput(null);
>>>>>>> remotes/upstream/main
    });

    describe('errors thrown in passive destroy function within unmounted trees', () => {
      let BrokenUseEffectCleanup;
      let ErrorBoundary;
      let LogOnlyErrorBoundary;

      beforeEach(() => {
<<<<<<< HEAD
        BrokenUseEffectCleanup = function() {
          useEffect(() => {
            Scheduler.unstable_yieldValue('BrokenUseEffectCleanup useEffect');
            return () => {
              Scheduler.unstable_yieldValue(
                'BrokenUseEffectCleanup useEffect destroy',
              );
=======
        BrokenUseEffectCleanup = function () {
          useEffect(() => {
            Scheduler.log('BrokenUseEffectCleanup useEffect');
            return () => {
              Scheduler.log('BrokenUseEffectCleanup useEffect destroy');
>>>>>>> remotes/upstream/main
              throw new Error('Expected error');
            };
          }, []);

          return 'inner child';
        };

        ErrorBoundary = class extends React.Component {
          state = {error: null};
          static getDerivedStateFromError(error) {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue(
              `ErrorBoundary static getDerivedStateFromError`,
            );
            return {error};
          }
          componentDidCatch(error, info) {
            Scheduler.unstable_yieldValue(`ErrorBoundary componentDidCatch`);
          }
          render() {
            if (this.state.error) {
              Scheduler.unstable_yieldValue('ErrorBoundary render error');
              return <span prop="ErrorBoundary fallback" />;
            }
            Scheduler.unstable_yieldValue('ErrorBoundary render success');
=======
            Scheduler.log(`ErrorBoundary static getDerivedStateFromError`);
            return {error};
          }
          componentDidCatch(error, info) {
            Scheduler.log(`ErrorBoundary componentDidCatch`);
          }
          render() {
            if (this.state.error) {
              Scheduler.log('ErrorBoundary render error');
              return <span prop="ErrorBoundary fallback" />;
            }
            Scheduler.log('ErrorBoundary render success');
>>>>>>> remotes/upstream/main
            return this.props.children || null;
          }
        };

        LogOnlyErrorBoundary = class extends React.Component {
          componentDidCatch(error, info) {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue(
              `LogOnlyErrorBoundary componentDidCatch`,
            );
          }
          render() {
            Scheduler.unstable_yieldValue(`LogOnlyErrorBoundary render`);
=======
            Scheduler.log(`LogOnlyErrorBoundary componentDidCatch`);
          }
          render() {
            Scheduler.log(`LogOnlyErrorBoundary render`);
>>>>>>> remotes/upstream/main
            return this.props.children || null;
          }
        };
      });

<<<<<<< HEAD
      // @gate skipUnmountedBoundaries
      it('should use the nearest still-mounted boundary if there are no unmounted boundaries', () => {
        act(() => {
=======
      it('should use the nearest still-mounted boundary if there are no unmounted boundaries', async () => {
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <LogOnlyErrorBoundary>
              <BrokenUseEffectCleanup />
            </LogOnlyErrorBoundary>,
          );
        });

<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'LogOnlyErrorBoundary render',
          'BrokenUseEffectCleanup useEffect',
        ]);

<<<<<<< HEAD
        act(() => {
          ReactNoop.render(<LogOnlyErrorBoundary />);
        });

        expect(Scheduler).toHaveYielded([
=======
        await act(() => {
          ReactNoop.render(<LogOnlyErrorBoundary />);
        });

        assertLog([
>>>>>>> remotes/upstream/main
          'LogOnlyErrorBoundary render',
          'BrokenUseEffectCleanup useEffect destroy',
          'LogOnlyErrorBoundary componentDidCatch',
        ]);
      });

<<<<<<< HEAD
      // @gate skipUnmountedBoundaries
      it('should skip unmounted boundaries and use the nearest still-mounted boundary', () => {
=======
      it('should skip unmounted boundaries and use the nearest still-mounted boundary', async () => {
>>>>>>> remotes/upstream/main
        function Conditional({showChildren}) {
          if (showChildren) {
            return (
              <ErrorBoundary>
                <BrokenUseEffectCleanup />
              </ErrorBoundary>
            );
          } else {
            return null;
          }
        }

<<<<<<< HEAD
        act(() => {
=======
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <LogOnlyErrorBoundary>
              <Conditional showChildren={true} />
            </LogOnlyErrorBoundary>,
          );
        });

<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'LogOnlyErrorBoundary render',
          'ErrorBoundary render success',
          'BrokenUseEffectCleanup useEffect',
        ]);

<<<<<<< HEAD
        act(() => {
=======
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <LogOnlyErrorBoundary>
              <Conditional showChildren={false} />
            </LogOnlyErrorBoundary>,
          );
        });

<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'LogOnlyErrorBoundary render',
          'BrokenUseEffectCleanup useEffect destroy',
          'LogOnlyErrorBoundary componentDidCatch',
        ]);
      });

<<<<<<< HEAD
      // @gate skipUnmountedBoundaries
      it('should call getDerivedStateFromError in the nearest still-mounted boundary', () => {
=======
      it('should call getDerivedStateFromError in the nearest still-mounted boundary', async () => {
>>>>>>> remotes/upstream/main
        function Conditional({showChildren}) {
          if (showChildren) {
            return <BrokenUseEffectCleanup />;
          } else {
            return null;
          }
        }

<<<<<<< HEAD
        act(() => {
=======
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary>
              <Conditional showChildren={true} />
            </ErrorBoundary>,
          );
        });

<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'ErrorBoundary render success',
          'BrokenUseEffectCleanup useEffect',
        ]);

<<<<<<< HEAD
        act(() => {
=======
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary>
              <Conditional showChildren={false} />
            </ErrorBoundary>,
          );
        });

<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'ErrorBoundary render success',
          'BrokenUseEffectCleanup useEffect destroy',
          'ErrorBoundary static getDerivedStateFromError',
          'ErrorBoundary render error',
          'ErrorBoundary componentDidCatch',
        ]);

<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          span('ErrorBoundary fallback'),
        ]);
      });

      // @gate skipUnmountedBoundaries
      it('should rethrow error if there are no still-mounted boundaries', () => {
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <span prop="ErrorBoundary fallback" />,
        );
      });

      it('should rethrow error if there are no still-mounted boundaries', async () => {
>>>>>>> remotes/upstream/main
        function Conditional({showChildren}) {
          if (showChildren) {
            return (
              <ErrorBoundary>
                <BrokenUseEffectCleanup />
              </ErrorBoundary>
            );
          } else {
            return null;
          }
        }

<<<<<<< HEAD
        act(() => {
          ReactNoop.render(<Conditional showChildren={true} />);
        });

        expect(Scheduler).toHaveYielded([
=======
        await act(() => {
          ReactNoop.render(<Conditional showChildren={true} />);
        });

        assertLog([
>>>>>>> remotes/upstream/main
          'ErrorBoundary render success',
          'BrokenUseEffectCleanup useEffect',
        ]);

<<<<<<< HEAD
        expect(() => {
          act(() => {
            ReactNoop.render(<Conditional showChildren={false} />);
          });
        }).toThrow('Expected error');

        expect(Scheduler).toHaveYielded([
          'BrokenUseEffectCleanup useEffect destroy',
        ]);

        expect(ReactNoop.getChildren()).toEqual([]);
      });
    });

    it('calls passive effect destroy functions for memoized components', () => {
      const Wrapper = ({children}) => children;
      function Child() {
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('passive create');
          return () => {
            Scheduler.unstable_yieldValue('passive destroy');
          };
        }, []);
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('layout create');
          return () => {
            Scheduler.unstable_yieldValue('layout destroy');
          };
        }, []);
        Scheduler.unstable_yieldValue('render');
=======
        await act(async () => {
          ReactNoop.render(<Conditional showChildren={false} />);
          await waitForThrow('Expected error');
        });

        assertLog(['BrokenUseEffectCleanup useEffect destroy']);

        expect(ReactNoop).toMatchRenderedOutput(null);
      });
    });

    it('calls passive effect destroy functions for memoized components', async () => {
      const Wrapper = ({children}) => children;
      function Child() {
        React.useEffect(() => {
          Scheduler.log('passive create');
          return () => {
            Scheduler.log('passive destroy');
          };
        }, []);
        React.useLayoutEffect(() => {
          Scheduler.log('layout create');
          return () => {
            Scheduler.log('layout destroy');
          };
        }, []);
        Scheduler.log('render');
>>>>>>> remotes/upstream/main
        return null;
      }

      const isEqual = (prevProps, nextProps) =>
        prevProps.prop === nextProps.prop;
      const MemoizedChild = React.memo(Child, isEqual);

<<<<<<< HEAD
      act(() => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <Wrapper>
            <MemoizedChild key={1} />
          </Wrapper>,
        );
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'render',
        'layout create',
        'passive create',
      ]);

      // Include at least one no-op (memoized) update to trigger original bug.
      act(() => {
=======
      assertLog(['render', 'layout create', 'passive create']);

      // Include at least one no-op (memoized) update to trigger original bug.
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <Wrapper>
            <MemoizedChild key={1} />
          </Wrapper>,
        );
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([]);

      act(() => {
=======
      assertLog([]);

      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <Wrapper>
            <MemoizedChild key={2} />
          </Wrapper>,
        );
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'render',
        'layout destroy',
        'layout create',
        'passive destroy',
        'passive create',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded(['layout destroy', 'passive destroy']);
    });

    it('calls passive effect destroy functions for descendants of memoized components', () => {
=======
      await act(() => {
        ReactNoop.render(null);
      });
      assertLog(['layout destroy', 'passive destroy']);
    });

    it('calls passive effect destroy functions for descendants of memoized components', async () => {
>>>>>>> remotes/upstream/main
      const Wrapper = ({children}) => children;
      function Child() {
        return <Grandchild />;
      }

      function Grandchild() {
        React.useEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('passive create');
          return () => {
            Scheduler.unstable_yieldValue('passive destroy');
          };
        }, []);
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('layout create');
          return () => {
            Scheduler.unstable_yieldValue('layout destroy');
          };
        }, []);
        Scheduler.unstable_yieldValue('render');
=======
          Scheduler.log('passive create');
          return () => {
            Scheduler.log('passive destroy');
          };
        }, []);
        React.useLayoutEffect(() => {
          Scheduler.log('layout create');
          return () => {
            Scheduler.log('layout destroy');
          };
        }, []);
        Scheduler.log('render');
>>>>>>> remotes/upstream/main
        return null;
      }

      const isEqual = (prevProps, nextProps) =>
        prevProps.prop === nextProps.prop;
      const MemoizedChild = React.memo(Child, isEqual);

<<<<<<< HEAD
      act(() => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <Wrapper>
            <MemoizedChild key={1} />
          </Wrapper>,
        );
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'render',
        'layout create',
        'passive create',
      ]);

      // Include at least one no-op (memoized) update to trigger original bug.
      act(() => {
=======
      assertLog(['render', 'layout create', 'passive create']);

      // Include at least one no-op (memoized) update to trigger original bug.
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <Wrapper>
            <MemoizedChild key={1} />
          </Wrapper>,
        );
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([]);

      act(() => {
=======
      assertLog([]);

      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <Wrapper>
            <MemoizedChild key={2} />
          </Wrapper>,
        );
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'render',
        'layout destroy',
        'layout create',
        'passive destroy',
        'passive create',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded(['layout destroy', 'passive destroy']);
    });

    it('assumes passive effect destroy function is either a function or undefined', () => {
=======
      await act(() => {
        ReactNoop.render(null);
      });
      assertLog(['layout destroy', 'passive destroy']);
    });

    it('assumes passive effect destroy function is either a function or undefined', async () => {
>>>>>>> remotes/upstream/main
      function App(props) {
        useEffect(() => {
          return props.return;
        });
        return null;
      }

      const root1 = ReactNoop.createRoot();
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root1.render(<App return={17} />);
        }),
      ).toErrorDev([
=======
      await expect(async () => {
        await act(() => {
          root1.render(<App return={17} />);
        });
      }).toErrorDev([
>>>>>>> remotes/upstream/main
        'Warning: useEffect must not return anything besides a ' +
          'function, which is used for clean-up. You returned: 17',
      ]);

      const root2 = ReactNoop.createRoot();
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root2.render(<App return={null} />);
        }),
      ).toErrorDev([
=======
      await expect(async () => {
        await act(() => {
          root2.render(<App return={null} />);
        });
      }).toErrorDev([
>>>>>>> remotes/upstream/main
        'Warning: useEffect must not return anything besides a ' +
          'function, which is used for clean-up. You returned null. If your ' +
          'effect does not require clean up, return undefined (or nothing).',
      ]);

      const root3 = ReactNoop.createRoot();
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root3.render(<App return={Promise.resolve()} />);
        }),
      ).toErrorDev([
=======
      await expect(async () => {
        await act(() => {
          root3.render(<App return={Promise.resolve()} />);
        });
      }).toErrorDev([
>>>>>>> remotes/upstream/main
        'Warning: useEffect must not return anything besides a ' +
          'function, which is used for clean-up.\n\n' +
          'It looks like you wrote useEffect(async () => ...) or returned a Promise.',
      ]);

      // Error on unmount because React assumes the value is a function
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root3.unmount();
        }),
      ).toThrow('is not a function');
=======
      await act(async () => {
        root3.render(null);
        await waitForThrow('is not a function');
      });
>>>>>>> remotes/upstream/main
    });
  });

  describe('useInsertionEffect', () => {
<<<<<<< HEAD
    it('fires insertion effects after snapshots on update', () => {
      function CounterA(props) {
        useInsertionEffect(() => {
          Scheduler.unstable_yieldValue(`Create insertion`);
          return () => {
            Scheduler.unstable_yieldValue(`Destroy insertion`);
=======
    it('fires insertion effects after snapshots on update', async () => {
      function CounterA(props) {
        useInsertionEffect(() => {
          Scheduler.log(`Create insertion`);
          return () => {
            Scheduler.log(`Destroy insertion`);
>>>>>>> remotes/upstream/main
          };
        });
        return null;
      }

      class CounterB extends React.Component {
        getSnapshotBeforeUpdate(prevProps, prevState) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`Get Snapshot`);
=======
          Scheduler.log(`Get Snapshot`);
>>>>>>> remotes/upstream/main
          return null;
        }

        componentDidUpdate() {}

        render() {
          return null;
        }
      }

<<<<<<< HEAD
      act(() => {
=======
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <>
            <CounterA />
            <CounterB />
          </>,
        );

<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield(['Create insertion']);
      });

      // Update
      act(() => {
=======
        await waitForAll(['Create insertion']);
      });

      // Update
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <>
            <CounterA />
            <CounterB />
          </>,
        );

<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
=======
        await waitForAll([
>>>>>>> remotes/upstream/main
          'Get Snapshot',
          'Destroy insertion',
          'Create insertion',
        ]);
      });

      // Unmount everything
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(null);

        expect(Scheduler).toFlushAndYield(['Destroy insertion']);
      });
    });

    it('fires insertion effects before layout effects', () => {
=======
      await act(async () => {
        ReactNoop.render(null);

        await waitForAll(['Destroy insertion']);
      });
    });

    it('fires insertion effects before layout effects', async () => {
>>>>>>> remotes/upstream/main
      let committedText = '(empty)';

      function Counter(props) {
        useInsertionEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
            `Create insertion [current: ${committedText}]`,
          );
          committedText = String(props.count);
          return () => {
            Scheduler.unstable_yieldValue(
              `Destroy insertion [current: ${committedText}]`,
            );
          };
        });
        useLayoutEffect(() => {
          Scheduler.unstable_yieldValue(
            `Create layout [current: ${committedText}]`,
          );
          return () => {
            Scheduler.unstable_yieldValue(
              `Destroy layout [current: ${committedText}]`,
            );
          };
        });
        useEffect(() => {
          Scheduler.unstable_yieldValue(
            `Create passive [current: ${committedText}]`,
          );
          return () => {
            Scheduler.unstable_yieldValue(
              `Destroy passive [current: ${committedText}]`,
            );
=======
          Scheduler.log(`Create insertion [current: ${committedText}]`);
          committedText = String(props.count);
          return () => {
            Scheduler.log(`Destroy insertion [current: ${committedText}]`);
          };
        });
        useLayoutEffect(() => {
          Scheduler.log(`Create layout [current: ${committedText}]`);
          return () => {
            Scheduler.log(`Destroy layout [current: ${committedText}]`);
          };
        });
        useEffect(() => {
          Scheduler.log(`Create passive [current: ${committedText}]`);
          return () => {
            Scheduler.log(`Destroy passive [current: ${committedText}]`);
>>>>>>> remotes/upstream/main
          };
        });
        return null;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />);

        expect(Scheduler).toFlushUntilNextPaint([
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />);

        await waitForPaint([
>>>>>>> remotes/upstream/main
          'Create insertion [current: (empty)]',
          'Create layout [current: 0]',
        ]);
        expect(committedText).toEqual('0');
      });

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Create passive [current: 0]']);

      // Unmount everything
      act(() => {
        ReactNoop.render(null);

        expect(Scheduler).toFlushUntilNextPaint([
=======
      assertLog(['Create passive [current: 0]']);

      // Unmount everything
      await act(async () => {
        ReactNoop.render(null);

        await waitForPaint([
>>>>>>> remotes/upstream/main
          'Destroy insertion [current: 0]',
          'Destroy layout [current: 0]',
        ]);
      });

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Destroy passive [current: 0]']);
    });

    it('force flushes passive effects before firing new insertion effects', () => {
=======
      assertLog(['Destroy passive [current: 0]']);
    });

    it('force flushes passive effects before firing new insertion effects', async () => {
>>>>>>> remotes/upstream/main
      let committedText = '(empty)';

      function Counter(props) {
        useInsertionEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
            `Create insertion [current: ${committedText}]`,
          );
          committedText = String(props.count);
          return () => {
            Scheduler.unstable_yieldValue(
              `Destroy insertion [current: ${committedText}]`,
            );
          };
        });
        useLayoutEffect(() => {
          Scheduler.unstable_yieldValue(
            `Create layout [current: ${committedText}]`,
          );
          committedText = String(props.count);
          return () => {
            Scheduler.unstable_yieldValue(
              `Destroy layout [current: ${committedText}]`,
            );
          };
        });
        useEffect(() => {
          Scheduler.unstable_yieldValue(
            `Create passive [current: ${committedText}]`,
          );
          return () => {
            Scheduler.unstable_yieldValue(
              `Destroy passive [current: ${committedText}]`,
            );
=======
          Scheduler.log(`Create insertion [current: ${committedText}]`);
          committedText = String(props.count);
          return () => {
            Scheduler.log(`Destroy insertion [current: ${committedText}]`);
          };
        });
        useLayoutEffect(() => {
          Scheduler.log(`Create layout [current: ${committedText}]`);
          committedText = String(props.count);
          return () => {
            Scheduler.log(`Destroy layout [current: ${committedText}]`);
          };
        });
        useEffect(() => {
          Scheduler.log(`Create passive [current: ${committedText}]`);
          return () => {
            Scheduler.log(`Destroy passive [current: ${committedText}]`);
>>>>>>> remotes/upstream/main
          };
        });
        return null;
      }

<<<<<<< HEAD
      act(() => {
        React.startTransition(() => {
          ReactNoop.render(<Counter count={0} />);
        });
        expect(Scheduler).toFlushUntilNextPaint([
=======
      await act(async () => {
        React.startTransition(() => {
          ReactNoop.render(<Counter count={0} />);
        });
        await waitForPaint([
>>>>>>> remotes/upstream/main
          'Create insertion [current: (empty)]',
          'Create layout [current: 0]',
        ]);
        expect(committedText).toEqual('0');

        React.startTransition(() => {
          ReactNoop.render(<Counter count={1} />);
        });
<<<<<<< HEAD
        expect(Scheduler).toFlushUntilNextPaint([
=======
        await waitForPaint([
>>>>>>> remotes/upstream/main
          'Create passive [current: 0]',
          'Destroy insertion [current: 0]',
          'Create insertion [current: 0]',
          'Destroy layout [current: 1]',
          'Create layout [current: 1]',
        ]);
        expect(committedText).toEqual('1');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Destroy passive [current: 1]',
        'Create passive [current: 1]',
      ]);
    });

<<<<<<< HEAD
    it('fires all insertion effects (interleaved) before firing any layout effects', () => {
=======
    it('fires all insertion effects (interleaved) before firing any layout effects', async () => {
>>>>>>> remotes/upstream/main
      let committedA = '(empty)';
      let committedB = '(empty)';

      function CounterA(props) {
        useInsertionEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
=======
          Scheduler.log(
>>>>>>> remotes/upstream/main
            `Create Insertion 1 for Component A [A: ${committedA}, B: ${committedB}]`,
          );
          committedA = String(props.count);
          return () => {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue(
=======
            Scheduler.log(
>>>>>>> remotes/upstream/main
              `Destroy Insertion 1 for Component A [A: ${committedA}, B: ${committedB}]`,
            );
          };
        });
        useInsertionEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
=======
          Scheduler.log(
>>>>>>> remotes/upstream/main
            `Create Insertion 2 for Component A [A: ${committedA}, B: ${committedB}]`,
          );
          committedA = String(props.count);
          return () => {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue(
=======
            Scheduler.log(
>>>>>>> remotes/upstream/main
              `Destroy Insertion 2 for Component A [A: ${committedA}, B: ${committedB}]`,
            );
          };
        });

        useLayoutEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
            `Create Layout 1 for Component A [A: ${committedA}, B: ${committedB}]`,
          );
          return () => {
            Scheduler.unstable_yieldValue(
=======
          Scheduler.log(
            `Create Layout 1 for Component A [A: ${committedA}, B: ${committedB}]`,
          );
          return () => {
            Scheduler.log(
>>>>>>> remotes/upstream/main
              `Destroy Layout 1 for Component A [A: ${committedA}, B: ${committedB}]`,
            );
          };
        });

        useLayoutEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
            `Create Layout 2 for Component A [A: ${committedA}, B: ${committedB}]`,
          );
          return () => {
            Scheduler.unstable_yieldValue(
=======
          Scheduler.log(
            `Create Layout 2 for Component A [A: ${committedA}, B: ${committedB}]`,
          );
          return () => {
            Scheduler.log(
>>>>>>> remotes/upstream/main
              `Destroy Layout 2 for Component A [A: ${committedA}, B: ${committedB}]`,
            );
          };
        });
        return null;
      }

      function CounterB(props) {
        useInsertionEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
=======
          Scheduler.log(
>>>>>>> remotes/upstream/main
            `Create Insertion 1 for Component B [A: ${committedA}, B: ${committedB}]`,
          );
          committedB = String(props.count);
          return () => {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue(
=======
            Scheduler.log(
>>>>>>> remotes/upstream/main
              `Destroy Insertion 1 for Component B [A: ${committedA}, B: ${committedB}]`,
            );
          };
        });
        useInsertionEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
=======
          Scheduler.log(
>>>>>>> remotes/upstream/main
            `Create Insertion 2 for Component B [A: ${committedA}, B: ${committedB}]`,
          );
          committedB = String(props.count);
          return () => {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue(
=======
            Scheduler.log(
>>>>>>> remotes/upstream/main
              `Destroy Insertion 2 for Component B [A: ${committedA}, B: ${committedB}]`,
            );
          };
        });

        useLayoutEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
            `Create Layout 1 for Component B [A: ${committedA}, B: ${committedB}]`,
          );
          return () => {
            Scheduler.unstable_yieldValue(
=======
          Scheduler.log(
            `Create Layout 1 for Component B [A: ${committedA}, B: ${committedB}]`,
          );
          return () => {
            Scheduler.log(
>>>>>>> remotes/upstream/main
              `Destroy Layout 1 for Component B [A: ${committedA}, B: ${committedB}]`,
            );
          };
        });

        useLayoutEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
            `Create Layout 2 for Component B [A: ${committedA}, B: ${committedB}]`,
          );
          return () => {
            Scheduler.unstable_yieldValue(
=======
          Scheduler.log(
            `Create Layout 2 for Component B [A: ${committedA}, B: ${committedB}]`,
          );
          return () => {
            Scheduler.log(
>>>>>>> remotes/upstream/main
              `Destroy Layout 2 for Component B [A: ${committedA}, B: ${committedB}]`,
            );
          };
        });
        return null;
      }

<<<<<<< HEAD
      act(() => {
=======
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <React.Fragment>
            <CounterA count={0} />
            <CounterB count={0} />
          </React.Fragment>,
        );
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
=======
        await waitForAll([
>>>>>>> remotes/upstream/main
          // All insertion effects fire before all layout effects
          'Create Insertion 1 for Component A [A: (empty), B: (empty)]',
          'Create Insertion 2 for Component A [A: 0, B: (empty)]',
          'Create Insertion 1 for Component B [A: 0, B: (empty)]',
          'Create Insertion 2 for Component B [A: 0, B: 0]',
          'Create Layout 1 for Component A [A: 0, B: 0]',
          'Create Layout 2 for Component A [A: 0, B: 0]',
          'Create Layout 1 for Component B [A: 0, B: 0]',
          'Create Layout 2 for Component B [A: 0, B: 0]',
        ]);
        expect([committedA, committedB]).toEqual(['0', '0']);
      });

<<<<<<< HEAD
      act(() => {
=======
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <React.Fragment>
            <CounterA count={1} />
            <CounterB count={1} />
          </React.Fragment>,
        );
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
=======
        await waitForAll([
>>>>>>> remotes/upstream/main
          'Destroy Insertion 1 for Component A [A: 0, B: 0]',
          'Destroy Insertion 2 for Component A [A: 0, B: 0]',
          'Create Insertion 1 for Component A [A: 0, B: 0]',
          'Create Insertion 2 for Component A [A: 1, B: 0]',
          'Destroy Layout 1 for Component A [A: 1, B: 0]',
          'Destroy Layout 2 for Component A [A: 1, B: 0]',
          'Destroy Insertion 1 for Component B [A: 1, B: 0]',
          'Destroy Insertion 2 for Component B [A: 1, B: 0]',
          'Create Insertion 1 for Component B [A: 1, B: 0]',
          'Create Insertion 2 for Component B [A: 1, B: 1]',
          'Destroy Layout 1 for Component B [A: 1, B: 1]',
          'Destroy Layout 2 for Component B [A: 1, B: 1]',
          'Create Layout 1 for Component A [A: 1, B: 1]',
          'Create Layout 2 for Component A [A: 1, B: 1]',
          'Create Layout 1 for Component B [A: 1, B: 1]',
          'Create Layout 2 for Component B [A: 1, B: 1]',
        ]);
        expect([committedA, committedB]).toEqual(['1', '1']);

        // Unmount everything
<<<<<<< HEAD
        act(() => {
          ReactNoop.render(null);

          expect(Scheduler).toFlushAndYield([
=======
        await act(async () => {
          ReactNoop.render(null);

          await waitForAll([
>>>>>>> remotes/upstream/main
            'Destroy Insertion 1 for Component A [A: 1, B: 1]',
            'Destroy Insertion 2 for Component A [A: 1, B: 1]',
            'Destroy Layout 1 for Component A [A: 1, B: 1]',
            'Destroy Layout 2 for Component A [A: 1, B: 1]',
            'Destroy Insertion 1 for Component B [A: 1, B: 1]',
            'Destroy Insertion 2 for Component B [A: 1, B: 1]',
            'Destroy Layout 1 for Component B [A: 1, B: 1]',
            'Destroy Layout 2 for Component B [A: 1, B: 1]',
          ]);
        });
      });
    });

<<<<<<< HEAD
    it('assumes insertion effect destroy function is either a function or undefined', () => {
=======
    it('assumes insertion effect destroy function is either a function or undefined', async () => {
>>>>>>> remotes/upstream/main
      function App(props) {
        useInsertionEffect(() => {
          return props.return;
        });
        return null;
      }

      const root1 = ReactNoop.createRoot();
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root1.render(<App return={17} />);
        }),
      ).toErrorDev([
=======
      await expect(async () => {
        await act(() => {
          root1.render(<App return={17} />);
        });
      }).toErrorDev([
>>>>>>> remotes/upstream/main
        'Warning: useInsertionEffect must not return anything besides a ' +
          'function, which is used for clean-up. You returned: 17',
      ]);

      const root2 = ReactNoop.createRoot();
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root2.render(<App return={null} />);
        }),
      ).toErrorDev([
=======
      await expect(async () => {
        await act(() => {
          root2.render(<App return={null} />);
        });
      }).toErrorDev([
>>>>>>> remotes/upstream/main
        'Warning: useInsertionEffect must not return anything besides a ' +
          'function, which is used for clean-up. You returned null. If your ' +
          'effect does not require clean up, return undefined (or nothing).',
      ]);

      const root3 = ReactNoop.createRoot();
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root3.render(<App return={Promise.resolve()} />);
        }),
      ).toErrorDev([
=======
      await expect(async () => {
        await act(() => {
          root3.render(<App return={Promise.resolve()} />);
        });
      }).toErrorDev([
>>>>>>> remotes/upstream/main
        'Warning: useInsertionEffect must not return anything besides a ' +
          'function, which is used for clean-up.\n\n' +
          'It looks like you wrote useInsertionEffect(async () => ...) or returned a Promise.',
      ]);

      // Error on unmount because React assumes the value is a function
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root3.unmount();
        }),
      ).toThrow('is not a function');
    });

    it('warns when setState is called from insertion effect setup', () => {
=======
      await act(async () => {
        root3.render(null);
        await waitForThrow('is not a function');
      });
    });

    it('warns when setState is called from insertion effect setup', async () => {
>>>>>>> remotes/upstream/main
      function App(props) {
        const [, setX] = useState(0);
        useInsertionEffect(() => {
          setX(1);
          if (props.throw) {
            throw Error('No');
          }
        }, [props.throw]);
        return null;
      }

      const root = ReactNoop.createRoot();
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root.render(<App />);
        }),
      ).toErrorDev(['Warning: useInsertionEffect must not schedule updates.']);

      expect(() => {
        act(() => {
          root.render(<App throw={true} />);
        });
      }).toThrow('No');
=======
      await expect(async () => {
        await act(() => {
          root.render(<App />);
        });
      }).toErrorDev(['Warning: useInsertionEffect must not schedule updates.']);

      await act(async () => {
        root.render(<App throw={true} />);
        await waitForThrow('No');
      });
>>>>>>> remotes/upstream/main

      // Should not warn for regular effects after throw.
      function NotInsertion() {
        const [, setX] = useState(0);
        useEffect(() => {
          setX(1);
        }, []);
        return null;
      }
<<<<<<< HEAD
      act(() => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        root.render(<NotInsertion />);
      });
    });

<<<<<<< HEAD
    it('warns when setState is called from insertion effect cleanup', () => {
=======
    it('warns when setState is called from insertion effect cleanup', async () => {
>>>>>>> remotes/upstream/main
      function App(props) {
        const [, setX] = useState(0);
        useInsertionEffect(() => {
          if (props.throw) {
            throw Error('No');
          }
          return () => {
            setX(1);
          };
        }, [props.throw, props.foo]);
        return null;
      }

      const root = ReactNoop.createRoot();
<<<<<<< HEAD
      act(() => {
        root.render(<App foo="hello" />);
      });
      expect(() => {
        act(() => {
=======
      await act(() => {
        root.render(<App foo="hello" />);
      });
      await expect(async () => {
        await act(() => {
>>>>>>> remotes/upstream/main
          root.render(<App foo="goodbye" />);
        });
      }).toErrorDev(['Warning: useInsertionEffect must not schedule updates.']);

<<<<<<< HEAD
      expect(() => {
        act(() => {
          root.render(<App throw={true} />);
        });
      }).toThrow('No');
=======
      await act(async () => {
        root.render(<App throw={true} />);
        await waitForThrow('No');
      });
>>>>>>> remotes/upstream/main

      // Should not warn for regular effects after throw.
      function NotInsertion() {
        const [, setX] = useState(0);
        useEffect(() => {
          setX(1);
        }, []);
        return null;
      }
<<<<<<< HEAD
      act(() => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        root.render(<NotInsertion />);
      });
    });
  });

  describe('useLayoutEffect', () => {
<<<<<<< HEAD
    it('fires layout effects after the host has been mutated', () => {
      function getCommittedText() {
        const yields = Scheduler.unstable_clearYields();
        const children = ReactNoop.getChildren();
        Scheduler.unstable_yieldValue(yields);
        if (children === null) {
          return null;
        }
        return children[0].prop;
=======
    it('fires layout effects after the host has been mutated', async () => {
      function getCommittedText() {
        const yields = Scheduler.unstable_clearLog();
        const children = ReactNoop.getChildrenAsJSX();
        Scheduler.log(yields);
        if (children === null) {
          return null;
        }
        return children.props.prop;
>>>>>>> remotes/upstream/main
      }

      function Counter(props) {
        useLayoutEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`Current: ${getCommittedText()}`);
=======
          Scheduler.log(`Current: ${getCommittedText()}`);
>>>>>>> remotes/upstream/main
        });
        return <Text text={props.count} />;
      }

      ReactNoop.render(<Counter count={0} />, () =>
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Sync effect'),
      );
      expect(Scheduler).toFlushAndYieldThrough([
        [0],
        'Current: 0',
        'Sync effect',
      ]);
      expect(ReactNoop.getChildren()).toEqual([span(0)]);

      ReactNoop.render(<Counter count={1} />, () =>
        Scheduler.unstable_yieldValue('Sync effect'),
      );
      expect(Scheduler).toFlushAndYieldThrough([
        [1],
        'Current: 1',
        'Sync effect',
      ]);
      expect(ReactNoop.getChildren()).toEqual([span(1)]);
    });

    it('force flushes passive effects before firing new layout effects', () => {
=======
        Scheduler.log('Sync effect'),
      );
      await waitFor([[0], 'Current: 0', 'Sync effect']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop={0} />);

      ReactNoop.render(<Counter count={1} />, () =>
        Scheduler.log('Sync effect'),
      );
      await waitFor([[1], 'Current: 1', 'Sync effect']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop={1} />);
    });

    it('force flushes passive effects before firing new layout effects', async () => {
>>>>>>> remotes/upstream/main
      let committedText = '(empty)';

      function Counter(props) {
        useLayoutEffect(() => {
          // Normally this would go in a mutation effect, but this test
          // intentionally omits a mutation effect.
          committedText = String(props.count);

<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
            `Mount layout [current: ${committedText}]`,
          );
          return () => {
            Scheduler.unstable_yieldValue(
              `Unmount layout [current: ${committedText}]`,
            );
          };
        });
        useEffect(() => {
          Scheduler.unstable_yieldValue(
            `Mount normal [current: ${committedText}]`,
          );
          return () => {
            Scheduler.unstable_yieldValue(
              `Unmount normal [current: ${committedText}]`,
            );
=======
          Scheduler.log(`Mount layout [current: ${committedText}]`);
          return () => {
            Scheduler.log(`Unmount layout [current: ${committedText}]`);
          };
        });
        useEffect(() => {
          Scheduler.log(`Mount normal [current: ${committedText}]`);
          return () => {
            Scheduler.log(`Unmount normal [current: ${committedText}]`);
>>>>>>> remotes/upstream/main
          };
        });
        return null;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough([
          'Mount layout [current: 0]',
          'Sync effect',
        ]);
        expect(committedText).toEqual('0');
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough([
=======
      await act(async () => {
        ReactNoop.render(<Counter count={0} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Mount layout [current: 0]', 'Sync effect']);
        expect(committedText).toEqual('0');
        ReactNoop.render(<Counter count={1} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor([
>>>>>>> remotes/upstream/main
          'Mount normal [current: 0]',
          'Unmount layout [current: 0]',
          'Mount layout [current: 1]',
          'Sync effect',
        ]);
        expect(committedText).toEqual('1');
      });

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Unmount normal [current: 1]',
        'Mount normal [current: 1]',
      ]);
    });

    // @gate skipUnmountedBoundaries
    it('catches errors thrown in useLayoutEffect', () => {
      class ErrorBoundary extends React.Component {
        state = {error: null};
        static getDerivedStateFromError(error) {
          Scheduler.unstable_yieldValue(
            `ErrorBoundary static getDerivedStateFromError`,
          );
=======
      assertLog(['Unmount normal [current: 1]', 'Mount normal [current: 1]']);
    });

    it('catches errors thrown in useLayoutEffect', async () => {
      class ErrorBoundary extends React.Component {
        state = {error: null};
        static getDerivedStateFromError(error) {
          Scheduler.log(`ErrorBoundary static getDerivedStateFromError`);
>>>>>>> remotes/upstream/main
          return {error};
        }
        render() {
          const {children, id, fallbackID} = this.props;
          const {error} = this.state;
          if (error) {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue(`${id} render error`);
            return <Component id={fallbackID} />;
          }
          Scheduler.unstable_yieldValue(`${id} render success`);
=======
            Scheduler.log(`${id} render error`);
            return <Component id={fallbackID} />;
          }
          Scheduler.log(`${id} render success`);
>>>>>>> remotes/upstream/main
          return children || null;
        }
      }

      function Component({id}) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Component render ' + id);
=======
        Scheduler.log('Component render ' + id);
>>>>>>> remotes/upstream/main
        return <span prop={id} />;
      }

      function BrokenLayoutEffectDestroy() {
        useLayoutEffect(() => {
          return () => {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue(
              'BrokenLayoutEffectDestroy useLayoutEffect destroy',
            );
=======
            Scheduler.log('BrokenLayoutEffectDestroy useLayoutEffect destroy');
>>>>>>> remotes/upstream/main
            throw Error('Expected');
          };
        }, []);

<<<<<<< HEAD
        Scheduler.unstable_yieldValue('BrokenLayoutEffectDestroy render');
=======
        Scheduler.log('BrokenLayoutEffectDestroy render');
>>>>>>> remotes/upstream/main
        return <span prop="broken" />;
      }

      ReactNoop.render(
        <ErrorBoundary id="OuterBoundary" fallbackID="OuterFallback">
          <Component id="sibling" />
          <ErrorBoundary id="InnerBoundary" fallbackID="InnerFallback">
            <BrokenLayoutEffectDestroy />
          </ErrorBoundary>
        </ErrorBoundary>,
      );

<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        'OuterBoundary render success',
        'Component render sibling',
        'InnerBoundary render success',
        'BrokenLayoutEffectDestroy render',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('sibling'),
        span('broken'),
      ]);
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="sibling" />
          <span prop="broken" />
        </>,
      );
>>>>>>> remotes/upstream/main

      ReactNoop.render(
        <ErrorBoundary id="OuterBoundary" fallbackID="OuterFallback">
          <Component id="sibling" />
        </ErrorBoundary>,
      );

      // React should skip over the unmounting boundary and find the nearest still-mounted boundary.
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        'OuterBoundary render success',
        'Component render sibling',
        'BrokenLayoutEffectDestroy useLayoutEffect destroy',
        'ErrorBoundary static getDerivedStateFromError',
        'OuterBoundary render error',
        'Component render OuterFallback',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span('OuterFallback')]);
    });

    it('assumes layout effect destroy function is either a function or undefined', () => {
=======
      expect(ReactNoop).toMatchRenderedOutput(<span prop="OuterFallback" />);
    });

    it('assumes layout effect destroy function is either a function or undefined', async () => {
>>>>>>> remotes/upstream/main
      function App(props) {
        useLayoutEffect(() => {
          return props.return;
        });
        return null;
      }

      const root1 = ReactNoop.createRoot();
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root1.render(<App return={17} />);
        }),
      ).toErrorDev([
=======
      await expect(async () => {
        await act(() => {
          root1.render(<App return={17} />);
        });
      }).toErrorDev([
>>>>>>> remotes/upstream/main
        'Warning: useLayoutEffect must not return anything besides a ' +
          'function, which is used for clean-up. You returned: 17',
      ]);

      const root2 = ReactNoop.createRoot();
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root2.render(<App return={null} />);
        }),
      ).toErrorDev([
=======
      await expect(async () => {
        await act(() => {
          root2.render(<App return={null} />);
        });
      }).toErrorDev([
>>>>>>> remotes/upstream/main
        'Warning: useLayoutEffect must not return anything besides a ' +
          'function, which is used for clean-up. You returned null. If your ' +
          'effect does not require clean up, return undefined (or nothing).',
      ]);

      const root3 = ReactNoop.createRoot();
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root3.render(<App return={Promise.resolve()} />);
        }),
      ).toErrorDev([
=======
      await expect(async () => {
        await act(() => {
          root3.render(<App return={Promise.resolve()} />);
        });
      }).toErrorDev([
>>>>>>> remotes/upstream/main
        'Warning: useLayoutEffect must not return anything besides a ' +
          'function, which is used for clean-up.\n\n' +
          'It looks like you wrote useLayoutEffect(async () => ...) or returned a Promise.',
      ]);

      // Error on unmount because React assumes the value is a function
<<<<<<< HEAD
      expect(() =>
        act(() => {
          root3.unmount();
        }),
      ).toThrow('is not a function');
=======
      await act(async () => {
        root3.render(null);
        await waitForThrow('is not a function');
      });
>>>>>>> remotes/upstream/main
    });
  });

  describe('useCallback', () => {
<<<<<<< HEAD
    it('memoizes callback by comparing inputs', () => {
=======
    it('memoizes callback by comparing inputs', async () => {
>>>>>>> remotes/upstream/main
      class IncrementButton extends React.PureComponent {
        increment = () => {
          this.props.increment();
        };
        render() {
          return <Text text="Increment" />;
        }
      }

      function Counter({incrementBy}) {
        const [count, updateCount] = useState(0);
<<<<<<< HEAD
        const increment = useCallback(() => updateCount(c => c + incrementBy), [
          incrementBy,
        ]);
=======
        const increment = useCallback(
          () => updateCount(c => c + incrementBy),
          [incrementBy],
        );
>>>>>>> remotes/upstream/main
        return (
          <>
            <IncrementButton increment={increment} ref={button} />
            <Text text={'Count: ' + count} />
          </>
        );
      }

      const button = React.createRef(null);
      ReactNoop.render(<Counter incrementBy={1} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Increment', 'Count: 0']);
      expect(ReactNoop.getChildren()).toEqual([
        span('Increment'),
        span('Count: 0'),
      ]);

      act(button.current.increment);
      expect(Scheduler).toHaveYielded([
=======
      await waitForAll(['Increment', 'Count: 0']);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Increment" />
          <span prop="Count: 0" />
        </>,
      );

      await act(() => button.current.increment());
      assertLog([
>>>>>>> remotes/upstream/main
        // Button should not re-render, because its props haven't changed
        // 'Increment',
        'Count: 1',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Increment'),
        span('Count: 1'),
      ]);

      // Increase the increment amount
      ReactNoop.render(<Counter incrementBy={10} />);
      expect(Scheduler).toFlushAndYield([
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Increment" />
          <span prop="Count: 1" />
        </>,
      );

      // Increase the increment amount
      ReactNoop.render(<Counter incrementBy={10} />);
      await waitForAll([
>>>>>>> remotes/upstream/main
        // Inputs did change this time
        'Increment',
        'Count: 1',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Increment'),
        span('Count: 1'),
      ]);

      // Callback should have updated
      act(button.current.increment);
      expect(Scheduler).toHaveYielded(['Count: 11']);
      expect(ReactNoop.getChildren()).toEqual([
        span('Increment'),
        span('Count: 11'),
      ]);
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Increment" />
          <span prop="Count: 1" />
        </>,
      );

      // Callback should have updated
      await act(() => button.current.increment());
      assertLog(['Count: 11']);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Increment" />
          <span prop="Count: 11" />
        </>,
      );
>>>>>>> remotes/upstream/main
    });
  });

  describe('useMemo', () => {
<<<<<<< HEAD
    it('memoizes value by comparing to previous inputs', () => {
      function CapitalizedText(props) {
        const text = props.text;
        const capitalizedText = useMemo(() => {
          Scheduler.unstable_yieldValue(`Capitalize '${text}'`);
=======
    it('memoizes value by comparing to previous inputs', async () => {
      function CapitalizedText(props) {
        const text = props.text;
        const capitalizedText = useMemo(() => {
          Scheduler.log(`Capitalize '${text}'`);
>>>>>>> remotes/upstream/main
          return text.toUpperCase();
        }, [text]);
        return <Text text={capitalizedText} />;
      }

      ReactNoop.render(<CapitalizedText text="hello" />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(["Capitalize 'hello'", 'HELLO']);
      expect(ReactNoop.getChildren()).toEqual([span('HELLO')]);

      ReactNoop.render(<CapitalizedText text="hi" />);
      expect(Scheduler).toFlushAndYield(["Capitalize 'hi'", 'HI']);
      expect(ReactNoop.getChildren()).toEqual([span('HI')]);

      ReactNoop.render(<CapitalizedText text="hi" />);
      expect(Scheduler).toFlushAndYield(['HI']);
      expect(ReactNoop.getChildren()).toEqual([span('HI')]);

      ReactNoop.render(<CapitalizedText text="goodbye" />);
      expect(Scheduler).toFlushAndYield(["Capitalize 'goodbye'", 'GOODBYE']);
      expect(ReactNoop.getChildren()).toEqual([span('GOODBYE')]);
    });

    it('always re-computes if no inputs are provided', () => {
=======
      await waitForAll(["Capitalize 'hello'", 'HELLO']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="HELLO" />);

      ReactNoop.render(<CapitalizedText text="hi" />);
      await waitForAll(["Capitalize 'hi'", 'HI']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="HI" />);

      ReactNoop.render(<CapitalizedText text="hi" />);
      await waitForAll(['HI']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="HI" />);

      ReactNoop.render(<CapitalizedText text="goodbye" />);
      await waitForAll(["Capitalize 'goodbye'", 'GOODBYE']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="GOODBYE" />);
    });

    it('always re-computes if no inputs are provided', async () => {
>>>>>>> remotes/upstream/main
      function LazyCompute(props) {
        const computed = useMemo(props.compute);
        return <Text text={computed} />;
      }

      function computeA() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('compute A');
=======
        Scheduler.log('compute A');
>>>>>>> remotes/upstream/main
        return 'A';
      }

      function computeB() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('compute B');
=======
        Scheduler.log('compute B');
>>>>>>> remotes/upstream/main
        return 'B';
      }

      ReactNoop.render(<LazyCompute compute={computeA} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['compute A', 'A']);

      ReactNoop.render(<LazyCompute compute={computeA} />);
      expect(Scheduler).toFlushAndYield(['compute A', 'A']);

      ReactNoop.render(<LazyCompute compute={computeA} />);
      expect(Scheduler).toFlushAndYield(['compute A', 'A']);

      ReactNoop.render(<LazyCompute compute={computeB} />);
      expect(Scheduler).toFlushAndYield(['compute B', 'B']);
    });

    it('should not invoke memoized function during re-renders unless inputs change', () => {
      function LazyCompute(props) {
        const computed = useMemo(() => props.compute(props.input), [
          props.input,
        ]);
=======
      await waitForAll(['compute A', 'A']);

      ReactNoop.render(<LazyCompute compute={computeA} />);
      await waitForAll(['compute A', 'A']);

      ReactNoop.render(<LazyCompute compute={computeA} />);
      await waitForAll(['compute A', 'A']);

      ReactNoop.render(<LazyCompute compute={computeB} />);
      await waitForAll(['compute B', 'B']);
    });

    it('should not invoke memoized function during re-renders unless inputs change', async () => {
      function LazyCompute(props) {
        const computed = useMemo(
          () => props.compute(props.input),
          [props.input],
        );
>>>>>>> remotes/upstream/main
        const [count, setCount] = useState(0);
        if (count < 3) {
          setCount(count + 1);
        }
        return <Text text={computed} />;
      }

      function compute(val) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('compute ' + val);
=======
        Scheduler.log('compute ' + val);
>>>>>>> remotes/upstream/main
        return val;
      }

      ReactNoop.render(<LazyCompute compute={compute} input="A" />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['compute A', 'A']);

      ReactNoop.render(<LazyCompute compute={compute} input="A" />);
      expect(Scheduler).toFlushAndYield(['A']);

      ReactNoop.render(<LazyCompute compute={compute} input="B" />);
      expect(Scheduler).toFlushAndYield(['compute B', 'B']);
=======
      await waitForAll(['compute A', 'A']);

      ReactNoop.render(<LazyCompute compute={compute} input="A" />);
      await waitForAll(['A']);

      ReactNoop.render(<LazyCompute compute={compute} input="B" />);
      await waitForAll(['compute B', 'B']);
>>>>>>> remotes/upstream/main
    });
  });

  describe('useImperativeHandle', () => {
<<<<<<< HEAD
    it('does not update when deps are the same', () => {
=======
    it('does not update when deps are the same', async () => {
>>>>>>> remotes/upstream/main
      const INCREMENT = 'INCREMENT';

      function reducer(state, action) {
        return action === INCREMENT ? state + 1 : state;
      }

      function Counter(props, ref) {
        const [count, dispatch] = useReducer(reducer, 0);
        useImperativeHandle(ref, () => ({count, dispatch}), []);
        return <Text text={'Count: ' + count} />;
      }

      Counter = forwardRef(Counter);
      const counter = React.createRef(null);
      ReactNoop.render(<Counter ref={counter} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Count: 0']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
      expect(counter.current.count).toBe(0);

      act(() => {
        counter.current.dispatch(INCREMENT);
      });
      expect(Scheduler).toHaveYielded(['Count: 1']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
=======
      await waitForAll(['Count: 0']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
      expect(counter.current.count).toBe(0);

      await act(() => {
        counter.current.dispatch(INCREMENT);
      });
      assertLog(['Count: 1']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
>>>>>>> remotes/upstream/main
      // Intentionally not updated because of [] deps:
      expect(counter.current.count).toBe(0);
    });

    // Regression test for https://github.com/facebook/react/issues/14782
<<<<<<< HEAD
    it('automatically updates when deps are not specified', () => {
=======
    it('automatically updates when deps are not specified', async () => {
>>>>>>> remotes/upstream/main
      const INCREMENT = 'INCREMENT';

      function reducer(state, action) {
        return action === INCREMENT ? state + 1 : state;
      }

      function Counter(props, ref) {
        const [count, dispatch] = useReducer(reducer, 0);
        useImperativeHandle(ref, () => ({count, dispatch}));
        return <Text text={'Count: ' + count} />;
      }

      Counter = forwardRef(Counter);
      const counter = React.createRef(null);
      ReactNoop.render(<Counter ref={counter} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Count: 0']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
      expect(counter.current.count).toBe(0);

      act(() => {
        counter.current.dispatch(INCREMENT);
      });
      expect(Scheduler).toHaveYielded(['Count: 1']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
      expect(counter.current.count).toBe(1);
    });

    it('updates when deps are different', () => {
=======
      await waitForAll(['Count: 0']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
      expect(counter.current.count).toBe(0);

      await act(() => {
        counter.current.dispatch(INCREMENT);
      });
      assertLog(['Count: 1']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
      expect(counter.current.count).toBe(1);
    });

    it('updates when deps are different', async () => {
>>>>>>> remotes/upstream/main
      const INCREMENT = 'INCREMENT';

      function reducer(state, action) {
        return action === INCREMENT ? state + 1 : state;
      }

      let totalRefUpdates = 0;
      function Counter(props, ref) {
        const [count, dispatch] = useReducer(reducer, 0);
        useImperativeHandle(
          ref,
          () => {
            totalRefUpdates++;
            return {count, dispatch};
          },
          [count],
        );
        return <Text text={'Count: ' + count} />;
      }

      Counter = forwardRef(Counter);
      const counter = React.createRef(null);
      ReactNoop.render(<Counter ref={counter} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Count: 0']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 0')]);
      expect(counter.current.count).toBe(0);
      expect(totalRefUpdates).toBe(1);

      act(() => {
        counter.current.dispatch(INCREMENT);
      });
      expect(Scheduler).toHaveYielded(['Count: 1']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
=======
      await waitForAll(['Count: 0']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 0" />);
      expect(counter.current.count).toBe(0);
      expect(totalRefUpdates).toBe(1);

      await act(() => {
        counter.current.dispatch(INCREMENT);
      });
      assertLog(['Count: 1']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
>>>>>>> remotes/upstream/main
      expect(counter.current.count).toBe(1);
      expect(totalRefUpdates).toBe(2);

      // Update that doesn't change the ref dependencies
      ReactNoop.render(<Counter ref={counter} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Count: 1']);
      expect(ReactNoop.getChildren()).toEqual([span('Count: 1')]);
=======
      await waitForAll(['Count: 1']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Count: 1" />);
>>>>>>> remotes/upstream/main
      expect(counter.current.count).toBe(1);
      expect(totalRefUpdates).toBe(2); // Should not increase since last time
    });
  });

  describe('useTransition', () => {
    it('delays showing loading state until after timeout', async () => {
      let transition;
      function App() {
        const [show, setShow] = useState(false);
        const [isPending, startTransition] = useTransition();
        transition = () => {
          startTransition(() => {
            setShow(true);
          });
        };
        return (
          <Suspense
            fallback={<Text text={`Loading... Pending: ${isPending}`} />}>
            {show ? (
              <AsyncText text={`After... Pending: ${isPending}`} />
            ) : (
              <Text text={`Before... Pending: ${isPending}`} />
            )}
          </Suspense>
        );
      }
      ReactNoop.render(<App />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Before... Pending: false']);
      expect(ReactNoop.getChildren()).toEqual([
        span('Before... Pending: false'),
      ]);
=======
      await waitForAll(['Before... Pending: false']);
      expect(ReactNoop).toMatchRenderedOutput(
        <span prop="Before... Pending: false" />,
      );
>>>>>>> remotes/upstream/main

      await act(async () => {
        transition();

<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
=======
        await waitForAll([
>>>>>>> remotes/upstream/main
          'Before... Pending: true',
          'Suspend! [After... Pending: false]',
          'Loading... Pending: false',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          span('Before... Pending: true'),
        ]);
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <span prop="Before... Pending: true" />,
        );
>>>>>>> remotes/upstream/main
        Scheduler.unstable_advanceTime(500);
        await advanceTimers(500);

        // Even after a long amount of time, we still don't show a placeholder.
        Scheduler.unstable_advanceTime(100000);
        await advanceTimers(100000);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          span('Before... Pending: true'),
        ]);

        await resolveText('After... Pending: false');
        expect(Scheduler).toHaveYielded([
          'Promise resolved [After... Pending: false]',
        ]);
        expect(Scheduler).toFlushAndYield(['After... Pending: false']);
        expect(ReactNoop.getChildren()).toEqual([
          span('After... Pending: false'),
        ]);
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <span prop="Before... Pending: true" />,
        );

        await resolveText('After... Pending: false');
        assertLog(['Promise resolved [After... Pending: false]']);
        await waitForAll(['After... Pending: false']);
        expect(ReactNoop).toMatchRenderedOutput(
          <span prop="After... Pending: false" />,
        );
>>>>>>> remotes/upstream/main
      });
    });
  });

  describe('useDeferredValue', () => {
    it('defers text value', async () => {
      function TextBox({text}) {
        return <AsyncText text={text} />;
      }

      let _setText;
      function App() {
        const [text, setText] = useState('A');
<<<<<<< HEAD
        const deferredText = useDeferredValue(text, {
          timeoutMs: 500,
        });
=======
        const deferredText = useDeferredValue(text);
>>>>>>> remotes/upstream/main
        _setText = setText;
        return (
          <>
            <Text text={text} />
            <Suspense fallback={<Text text={'Loading'} />}>
              <TextBox text={deferredText} />
            </Suspense>
          </>
        );
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App />);
      });

      expect(Scheduler).toHaveYielded(['A', 'Suspend! [A]', 'Loading']);
      expect(ReactNoop.getChildren()).toEqual([span('A'), span('Loading')]);

      await resolveText('A');
      expect(Scheduler).toHaveYielded(['Promise resolved [A]']);
      expect(Scheduler).toFlushAndYield(['A']);
      expect(ReactNoop.getChildren()).toEqual([span('A'), span('A')]);

      await act(async () => {
        _setText('B');
        expect(Scheduler).toFlushAndYield([
          'B',
          'A',
          'B',
          'Suspend! [B]',
          'Loading',
        ]);
        expect(Scheduler).toFlushAndYield([]);
        expect(ReactNoop.getChildren()).toEqual([span('B'), span('A')]);
=======
      await act(() => {
        ReactNoop.render(<App />);
      });

      assertLog(['A', 'Suspend! [A]', 'Loading']);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="A" />
          <span prop="Loading" />
        </>,
      );

      await act(() => resolveText('A'));
      assertLog(['Promise resolved [A]', 'A']);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="A" />
          <span prop="A" />
        </>,
      );

      await act(async () => {
        _setText('B');
        await waitForAll(['B', 'A', 'B', 'Suspend! [B]', 'Loading']);
        await waitForAll([]);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="B" />
            <span prop="A" />
          </>,
        );
>>>>>>> remotes/upstream/main
      });

      await act(async () => {
        Scheduler.unstable_advanceTime(250);
        await advanceTimers(250);
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([]);
      expect(ReactNoop.getChildren()).toEqual([span('B'), span('A')]);
=======
      assertLog([]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="B" />
          <span prop="A" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Even after a long amount of time, we don't show a fallback
      Scheduler.unstable_advanceTime(100000);
      await advanceTimers(100000);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([]);
      expect(ReactNoop.getChildren()).toEqual([span('B'), span('A')]);
=======
      await waitForAll([]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="B" />
          <span prop="A" />
        </>,
      );
>>>>>>> remotes/upstream/main

      await act(async () => {
        await resolveText('B');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Promise resolved [B]', 'B', 'B']);
      expect(ReactNoop.getChildren()).toEqual([span('B'), span('B')]);
=======
      assertLog(['Promise resolved [B]', 'B', 'B']);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="B" />
          <span prop="B" />
        </>,
      );
>>>>>>> remotes/upstream/main
    });
  });

  describe('progressive enhancement (not supported)', () => {
<<<<<<< HEAD
    it('mount additional state', () => {
=======
    it('mount additional state', async () => {
>>>>>>> remotes/upstream/main
      let updateA;
      let updateB;
      // let updateC;

      function App(props) {
        const [A, _updateA] = useState(0);
        const [B, _updateB] = useState(0);
        updateA = _updateA;
        updateB = _updateB;

        let C;
        if (props.loadC) {
          useState(0);
        } else {
          C = '[not loaded]';
        }

        return <Text text={`A: ${A}, B: ${B}, C: ${C}`} />;
      }

      ReactNoop.render(<App loadC={false} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['A: 0, B: 0, C: [not loaded]']);
      expect(ReactNoop.getChildren()).toEqual([
        span('A: 0, B: 0, C: [not loaded]'),
      ]);

      act(() => {
=======
      await waitForAll(['A: 0, B: 0, C: [not loaded]']);
      expect(ReactNoop).toMatchRenderedOutput(
        <span prop="A: 0, B: 0, C: [not loaded]" />,
      );

      await act(() => {
>>>>>>> remotes/upstream/main
        updateA(2);
        updateB(3);
      });

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['A: 2, B: 3, C: [not loaded]']);
      expect(ReactNoop.getChildren()).toEqual([
        span('A: 2, B: 3, C: [not loaded]'),
      ]);

      ReactNoop.render(<App loadC={true} />);
      expect(() => {
        expect(() => {
          expect(Scheduler).toFlushAndYield(['A: 2, B: 3, C: 0']);
        }).toThrow('Rendered more hooks than during the previous render');
=======
      assertLog(['A: 2, B: 3, C: [not loaded]']);
      expect(ReactNoop).toMatchRenderedOutput(
        <span prop="A: 2, B: 3, C: [not loaded]" />,
      );

      ReactNoop.render(<App loadC={true} />);
      await expect(async () => {
        await waitForThrow(
          'Rendered more hooks than during the previous render.',
        );
        assertLog([]);
>>>>>>> remotes/upstream/main
      }).toErrorDev([
        'Warning: React has detected a change in the order of Hooks called by App. ' +
          'This will lead to bugs and errors if not fixed. For more information, ' +
          'read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks\n\n' +
          '   Previous render            Next render\n' +
          '   ------------------------------------------------------\n' +
          '1. useState                   useState\n' +
          '2. useState                   useState\n' +
          '3. undefined                  useState\n' +
          '   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\n',
      ]);

      // Uncomment if/when we support this again
<<<<<<< HEAD
      // expect(ReactNoop.getChildren()).toEqual([span('A: 2, B: 3, C: 0')]);

      // updateC(4);
      // expect(Scheduler).toFlushAndYield(['A: 2, B: 3, C: 4']);
      // expect(ReactNoop.getChildren()).toEqual([span('A: 2, B: 3, C: 4')]);
    });

    it('unmount state', () => {
=======
      // expect(ReactNoop).toMatchRenderedOutput(<span prop="A: 2, B: 3, C: 0" />]);

      // updateC(4);
      // expect(Scheduler).toFlushAndYield(['A: 2, B: 3, C: 4']);
      // expect(ReactNoop).toMatchRenderedOutput(<span prop="A: 2, B: 3, C: 4" />]);
    });

    it('unmount state', async () => {
>>>>>>> remotes/upstream/main
      let updateA;
      let updateB;
      let updateC;

      function App(props) {
        const [A, _updateA] = useState(0);
        const [B, _updateB] = useState(0);
        updateA = _updateA;
        updateB = _updateB;

        let C;
        if (props.loadC) {
          const [_C, _updateC] = useState(0);
          C = _C;
          updateC = _updateC;
        } else {
          C = '[not loaded]';
        }

        return <Text text={`A: ${A}, B: ${B}, C: ${C}`} />;
      }

      ReactNoop.render(<App loadC={true} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['A: 0, B: 0, C: 0']);
      expect(ReactNoop.getChildren()).toEqual([span('A: 0, B: 0, C: 0')]);
      act(() => {
=======
      await waitForAll(['A: 0, B: 0, C: 0']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="A: 0, B: 0, C: 0" />);
      await act(() => {
>>>>>>> remotes/upstream/main
        updateA(2);
        updateB(3);
        updateC(4);
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['A: 2, B: 3, C: 4']);
      expect(ReactNoop.getChildren()).toEqual([span('A: 2, B: 3, C: 4')]);
      ReactNoop.render(<App loadC={false} />);
      expect(Scheduler).toFlushAndThrow(
=======
      assertLog(['A: 2, B: 3, C: 4']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="A: 2, B: 3, C: 4" />);
      ReactNoop.render(<App loadC={false} />);
      await waitForThrow(
>>>>>>> remotes/upstream/main
        'Rendered fewer hooks than expected. This may be caused by an ' +
          'accidental early return statement.',
      );
    });

<<<<<<< HEAD
    it('unmount effects', () => {
      function App(props) {
        useEffect(() => {
          Scheduler.unstable_yieldValue('Mount A');
          return () => {
            Scheduler.unstable_yieldValue('Unmount A');
=======
    it('unmount effects', async () => {
      function App(props) {
        useEffect(() => {
          Scheduler.log('Mount A');
          return () => {
            Scheduler.log('Unmount A');
>>>>>>> remotes/upstream/main
          };
        }, []);

        if (props.showMore) {
          useEffect(() => {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Mount B');
            return () => {
              Scheduler.unstable_yieldValue('Unmount B');
=======
            Scheduler.log('Mount B');
            return () => {
              Scheduler.log('Unmount B');
>>>>>>> remotes/upstream/main
            };
          }, []);
        }

        return null;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App showMore={false} />, () =>
          Scheduler.unstable_yieldValue('Sync effect'),
        );
        expect(Scheduler).toFlushAndYieldThrough(['Sync effect']);
      });

      expect(Scheduler).toHaveYielded(['Mount A']);

      act(() => {
        ReactNoop.render(<App showMore={true} />);
        expect(() => {
          expect(() => {
            expect(Scheduler).toFlushAndYield([]);
          }).toThrow('Rendered more hooks than during the previous render');
=======
      await act(async () => {
        ReactNoop.render(<App showMore={false} />, () =>
          Scheduler.log('Sync effect'),
        );
        await waitFor(['Sync effect']);
      });

      assertLog(['Mount A']);

      await act(async () => {
        ReactNoop.render(<App showMore={true} />);
        await expect(async () => {
          await waitForThrow(
            'Rendered more hooks than during the previous render.',
          );
          assertLog([]);
>>>>>>> remotes/upstream/main
        }).toErrorDev([
          'Warning: React has detected a change in the order of Hooks called by App. ' +
            'This will lead to bugs and errors if not fixed. For more information, ' +
            'read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks\n\n' +
            '   Previous render            Next render\n' +
            '   ------------------------------------------------------\n' +
            '1. useEffect                  useEffect\n' +
            '2. undefined                  useEffect\n' +
            '   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\n',
        ]);
      });

      // Uncomment if/when we support this again
      // ReactNoop.flushPassiveEffects();
      // expect(Scheduler).toHaveYielded(['Mount B']);

      // ReactNoop.render(<App showMore={false} />);
      // expect(Scheduler).toFlushAndThrow(
      //   'Rendered fewer hooks than expected. This may be caused by an ' +
      //     'accidental early return statement.',
      // );
    });
  });

<<<<<<< HEAD
  it('useReducer does not eagerly bail out of state updates', () => {
=======
  it('useReducer does not eagerly bail out of state updates', async () => {
>>>>>>> remotes/upstream/main
    // Edge case based on a bug report
    let setCounter;
    function App() {
      const [counter, _setCounter] = useState(1);
      setCounter = _setCounter;
      return <Component count={counter} />;
    }

    function Component({count}) {
      const [state, dispatch] = useReducer(() => {
        // This reducer closes over a value from props. If the reducer is not
        // properly updated, the eager reducer will compare to an old value
        // and bail out incorrectly.
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Reducer: ' + count);
        return count;
      }, -1);
      useEffect(() => {
        Scheduler.unstable_yieldValue('Effect: ' + count);
        dispatch();
      }, [count]);
      Scheduler.unstable_yieldValue('Render: ' + state);
      return count;
    }

    act(() => {
      ReactNoop.render(<App />);
      expect(Scheduler).toFlushAndYield([
        'Render: -1',
        'Effect: 1',
        'Reducer: 1',
        'Render: 1',
      ]);
      expect(ReactNoop).toMatchRenderedOutput('1');
    });

    act(() => {
      setCounter(2);
    });
    expect(Scheduler).toHaveYielded([
      'Render: 1',
      'Effect: 2',
      'Reducer: 2',
      'Render: 2',
    ]);
    expect(ReactNoop).toMatchRenderedOutput('2');
  });

  it('useReducer does not replay previous no-op actions when other state changes', () => {
=======
        Scheduler.log('Reducer: ' + count);
        return count;
      }, -1);
      useEffect(() => {
        Scheduler.log('Effect: ' + count);
        dispatch();
      }, [count]);
      Scheduler.log('Render: ' + state);
      return count;
    }

    await act(async () => {
      ReactNoop.render(<App />);
      await waitForAll(['Render: -1', 'Effect: 1', 'Reducer: 1', 'Render: 1']);
      expect(ReactNoop).toMatchRenderedOutput('1');
    });

    await act(() => {
      setCounter(2);
    });
    assertLog(['Render: 1', 'Effect: 2', 'Reducer: 2', 'Render: 2']);
    expect(ReactNoop).toMatchRenderedOutput('2');
  });

  it('useReducer does not replay previous no-op actions when other state changes', async () => {
>>>>>>> remotes/upstream/main
    let increment;
    let setDisabled;

    function Counter() {
      const [disabled, _setDisabled] = useState(true);
      const [count, dispatch] = useReducer((state, action) => {
        if (disabled) {
          return state;
        }
        if (action.type === 'increment') {
          return state + 1;
        }
        return state;
      }, 0);

      increment = () => dispatch({type: 'increment'});
      setDisabled = _setDisabled;

<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Render disabled: ' + disabled);
      Scheduler.unstable_yieldValue('Render count: ' + count);
=======
      Scheduler.log('Render disabled: ' + disabled);
      Scheduler.log('Render count: ' + count);
>>>>>>> remotes/upstream/main
      return count;
    }

    ReactNoop.render(<Counter />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'Render disabled: true',
      'Render count: 0',
    ]);
    expect(ReactNoop).toMatchRenderedOutput('0');

    act(() => {
=======
    await waitForAll(['Render disabled: true', 'Render count: 0']);
    expect(ReactNoop).toMatchRenderedOutput('0');

    await act(() => {
>>>>>>> remotes/upstream/main
      // These increments should have no effect, since disabled=true
      increment();
      increment();
      increment();
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      'Render disabled: true',
      'Render count: 0',
    ]);
    expect(ReactNoop).toMatchRenderedOutput('0');

    act(() => {
      // Enabling the updater should *not* replay the previous increment() actions
      setDisabled(false);
    });
    expect(Scheduler).toHaveYielded([
      'Render disabled: false',
      'Render count: 0',
    ]);
    expect(ReactNoop).toMatchRenderedOutput('0');
  });

  it('useReducer does not replay previous no-op actions when props change', () => {
=======
    assertLog(['Render disabled: true', 'Render count: 0']);
    expect(ReactNoop).toMatchRenderedOutput('0');

    await act(() => {
      // Enabling the updater should *not* replay the previous increment() actions
      setDisabled(false);
    });
    assertLog(['Render disabled: false', 'Render count: 0']);
    expect(ReactNoop).toMatchRenderedOutput('0');
  });

  it('useReducer does not replay previous no-op actions when props change', async () => {
>>>>>>> remotes/upstream/main
    let setDisabled;
    let increment;

    function Counter({disabled}) {
      const [count, dispatch] = useReducer((state, action) => {
        if (disabled) {
          return state;
        }
        if (action.type === 'increment') {
          return state + 1;
        }
        return state;
      }, 0);

      increment = () => dispatch({type: 'increment'});

<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Render count: ' + count);
=======
      Scheduler.log('Render count: ' + count);
>>>>>>> remotes/upstream/main
      return count;
    }

    function App() {
      const [disabled, _setDisabled] = useState(true);
      setDisabled = _setDisabled;
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Render disabled: ' + disabled);
=======
      Scheduler.log('Render disabled: ' + disabled);
>>>>>>> remotes/upstream/main
      return <Counter disabled={disabled} />;
    }

    ReactNoop.render(<App />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'Render disabled: true',
      'Render count: 0',
    ]);
    expect(ReactNoop).toMatchRenderedOutput('0');

    act(() => {
=======
    await waitForAll(['Render disabled: true', 'Render count: 0']);
    expect(ReactNoop).toMatchRenderedOutput('0');

    await act(() => {
>>>>>>> remotes/upstream/main
      // These increments should have no effect, since disabled=true
      increment();
      increment();
      increment();
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Render count: 0']);
    expect(ReactNoop).toMatchRenderedOutput('0');

    act(() => {
      // Enabling the updater should *not* replay the previous increment() actions
      setDisabled(false);
    });
    expect(Scheduler).toHaveYielded([
      'Render disabled: false',
      'Render count: 0',
    ]);
    expect(ReactNoop).toMatchRenderedOutput('0');
  });

  it('useReducer applies potential no-op changes if made relevant by other updates in the batch', () => {
=======
    assertLog(['Render count: 0']);
    expect(ReactNoop).toMatchRenderedOutput('0');

    await act(() => {
      // Enabling the updater should *not* replay the previous increment() actions
      setDisabled(false);
    });
    assertLog(['Render disabled: false', 'Render count: 0']);
    expect(ReactNoop).toMatchRenderedOutput('0');
  });

  it('useReducer applies potential no-op changes if made relevant by other updates in the batch', async () => {
>>>>>>> remotes/upstream/main
    let setDisabled;
    let increment;

    function Counter({disabled}) {
      const [count, dispatch] = useReducer((state, action) => {
        if (disabled) {
          return state;
        }
        if (action.type === 'increment') {
          return state + 1;
        }
        return state;
      }, 0);

      increment = () => dispatch({type: 'increment'});

<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Render count: ' + count);
=======
      Scheduler.log('Render count: ' + count);
>>>>>>> remotes/upstream/main
      return count;
    }

    function App() {
      const [disabled, _setDisabled] = useState(true);
      setDisabled = _setDisabled;
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Render disabled: ' + disabled);
=======
      Scheduler.log('Render disabled: ' + disabled);
>>>>>>> remotes/upstream/main
      return <Counter disabled={disabled} />;
    }

    ReactNoop.render(<App />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'Render disabled: true',
      'Render count: 0',
    ]);
    expect(ReactNoop).toMatchRenderedOutput('0');

    act(() => {
=======
    await waitForAll(['Render disabled: true', 'Render count: 0']);
    expect(ReactNoop).toMatchRenderedOutput('0');

    await act(() => {
>>>>>>> remotes/upstream/main
      // Although the increment happens first (and would seem to do nothing since disabled=true),
      // because these calls are in a batch the parent updates first. This should cause the child
      // to re-render with disabled=false and *then* process the increment action, which now
      // increments the count and causes the component output to change.
      increment();
      setDisabled(false);
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      'Render disabled: false',
      'Render count: 1',
    ]);
=======
    assertLog(['Render disabled: false', 'Render count: 1']);
>>>>>>> remotes/upstream/main
    expect(ReactNoop).toMatchRenderedOutput('1');
  });

  // Regression test. Covers a case where an internal state variable
  // (`didReceiveUpdate`) is not reset properly.
  it('state bail out edge case (#16359)', async () => {
    let setCounterA;
    let setCounterB;

    function CounterA() {
      const [counter, setCounter] = useState(0);
      setCounterA = setCounter;
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Render A: ' + counter);
      useEffect(() => {
        Scheduler.unstable_yieldValue('Commit A: ' + counter);
=======
      Scheduler.log('Render A: ' + counter);
      useEffect(() => {
        Scheduler.log('Commit A: ' + counter);
>>>>>>> remotes/upstream/main
      });
      return counter;
    }

    function CounterB() {
      const [counter, setCounter] = useState(0);
      setCounterB = setCounter;
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Render B: ' + counter);
      useEffect(() => {
        Scheduler.unstable_yieldValue('Commit B: ' + counter);
=======
      Scheduler.log('Render B: ' + counter);
      useEffect(() => {
        Scheduler.log('Commit B: ' + counter);
>>>>>>> remotes/upstream/main
      });
      return counter;
    }

    const root = ReactNoop.createRoot(null);
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(
        <>
          <CounterA />
          <CounterB />
        </>,
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      'Render A: 0',
      'Render B: 0',
      'Commit A: 0',
      'Commit B: 0',
    ]);

    await act(async () => {
=======
    assertLog(['Render A: 0', 'Render B: 0', 'Commit A: 0', 'Commit B: 0']);

    await act(() => {
>>>>>>> remotes/upstream/main
      setCounterA(1);

      // In the same batch, update B twice. To trigger the condition we're
      // testing, the first update is necessary to bypass the early
      // bailout optimization.
      setCounterB(1);
      setCounterB(0);
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'Render A: 1',
      'Render B: 0',
      'Commit A: 1',
      // B should not fire an effect because the update bailed out
      // 'Commit B: 0',
    ]);
  });

<<<<<<< HEAD
  it('should update latest rendered reducer when a preceding state receives a render phase update', () => {
=======
  it('should update latest rendered reducer when a preceding state receives a render phase update', async () => {
>>>>>>> remotes/upstream/main
    // Similar to previous test, except using a preceding render phase update
    // instead of new props.
    let dispatch;
    function App() {
      const [step, setStep] = useState(0);
      const [shadow, _dispatch] = useReducer(() => step, step);
      dispatch = _dispatch;

      if (step < 5) {
        setStep(step + 1);
      }

<<<<<<< HEAD
      Scheduler.unstable_yieldValue(`Step: ${step}, Shadow: ${shadow}`);
=======
      Scheduler.log(`Step: ${step}, Shadow: ${shadow}`);
>>>>>>> remotes/upstream/main
      return shadow;
    }

    ReactNoop.render(<App />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'Step: 0, Shadow: 0',
      'Step: 1, Shadow: 0',
      'Step: 2, Shadow: 0',
      'Step: 3, Shadow: 0',
      'Step: 4, Shadow: 0',
      'Step: 5, Shadow: 0',
    ]);
    expect(ReactNoop).toMatchRenderedOutput('0');

<<<<<<< HEAD
    act(() => dispatch());
    expect(Scheduler).toHaveYielded(['Step: 5, Shadow: 5']);
    expect(ReactNoop).toMatchRenderedOutput('5');
  });

  it('should process the rest pending updates after a render phase update', () => {
=======
    await act(() => dispatch());
    assertLog(['Step: 5, Shadow: 5']);
    expect(ReactNoop).toMatchRenderedOutput('5');
  });

  it('should process the rest pending updates after a render phase update', async () => {
>>>>>>> remotes/upstream/main
    // Similar to previous test, except using a preceding render phase update
    // instead of new props.
    let updateA;
    let updateC;
    function App() {
      const [a, setA] = useState(false);
      const [b, setB] = useState(false);
      if (a !== b) {
        setB(a);
      }
      // Even though we called setB above,
      // we should still apply the changes to C,
      // during this render pass.
      const [c, setC] = useState(false);
      updateA = setA;
      updateC = setC;
      return `${a ? 'A' : 'a'}${b ? 'B' : 'b'}${c ? 'C' : 'c'}`;
    }

<<<<<<< HEAD
    act(() => ReactNoop.render(<App />));
    expect(ReactNoop).toMatchRenderedOutput('abc');

    act(() => {
=======
    await act(() => ReactNoop.render(<App />));
    expect(ReactNoop).toMatchRenderedOutput('abc');

    await act(() => {
>>>>>>> remotes/upstream/main
      updateA(true);
      // This update should not get dropped.
      updateC(true);
    });
    expect(ReactNoop).toMatchRenderedOutput('ABC');
  });

  it("regression test: don't unmount effects on siblings of deleted nodes", async () => {
    const root = ReactNoop.createRoot();

    function Child({label}) {
      useLayoutEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Mount layout ' + label);
        return () => {
          Scheduler.unstable_yieldValue('Unmount layout ' + label);
        };
      }, [label]);
      useEffect(() => {
        Scheduler.unstable_yieldValue('Mount passive ' + label);
        return () => {
          Scheduler.unstable_yieldValue('Unmount passive ' + label);
=======
        Scheduler.log('Mount layout ' + label);
        return () => {
          Scheduler.log('Unmount layout ' + label);
        };
      }, [label]);
      useEffect(() => {
        Scheduler.log('Mount passive ' + label);
        return () => {
          Scheduler.log('Unmount passive ' + label);
>>>>>>> remotes/upstream/main
        };
      }, [label]);
      return label;
    }

<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(
        <>
          <Child key="A" label="A" />
          <Child key="B" label="B" />
        </>,
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'Mount layout A',
      'Mount layout B',
      'Mount passive A',
      'Mount passive B',
    ]);

    // Delete A. This should only unmount the effect on A. In the regression,
    // B's effect would also unmount.
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(
        <>
          <Child key="B" label="B" />
        </>,
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Unmount layout A', 'Unmount passive A']);

    // Now delete and unmount B.
    await act(async () => {
      root.render(null);
    });
    expect(Scheduler).toHaveYielded(['Unmount layout B', 'Unmount passive B']);
=======
    assertLog(['Unmount layout A', 'Unmount passive A']);

    // Now delete and unmount B.
    await act(() => {
      root.render(null);
    });
    assertLog(['Unmount layout B', 'Unmount passive B']);
>>>>>>> remotes/upstream/main
  });

  it('regression: deleting a tree and unmounting its effects after a reorder', async () => {
    const root = ReactNoop.createRoot();

    function Child({label}) {
      useEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Mount ' + label);
        return () => {
          Scheduler.unstable_yieldValue('Unmount ' + label);
=======
        Scheduler.log('Mount ' + label);
        return () => {
          Scheduler.log('Unmount ' + label);
>>>>>>> remotes/upstream/main
        };
      }, [label]);
      return label;
    }

<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(
        <>
          <Child key="A" label="A" />
          <Child key="B" label="B" />
        </>,
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Mount A', 'Mount B']);

    await act(async () => {
=======
    assertLog(['Mount A', 'Mount B']);

    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(
        <>
          <Child key="B" label="B" />
          <Child key="A" label="A" />
        </>,
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);

    await act(async () => {
      root.render(null);
    });

    expect(Scheduler).toHaveYielded([
=======
    assertLog([]);

    await act(() => {
      root.render(null);
    });

    assertLog([
>>>>>>> remotes/upstream/main
      'Unmount B',
      // In the regression, the reorder would cause Child A to "forget" that it
      // contains passive effects. Then when we deleted the tree, A's unmount
      // effect would not fire.
      'Unmount A',
    ]);
  });

  // @gate enableSuspenseList
  it('regression: SuspenseList causes unmounts to be dropped on deletion', async () => {
    function Row({label}) {
      useEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Mount ' + label);
        return () => {
          Scheduler.unstable_yieldValue('Unmount ' + label);
=======
        Scheduler.log('Mount ' + label);
        return () => {
          Scheduler.log('Unmount ' + label);
>>>>>>> remotes/upstream/main
        };
      }, [label]);
      return (
        <Suspense fallback="Loading...">
          <AsyncText text={label} />
        </Suspense>
      );
    }

    function App() {
      return (
        <SuspenseList revealOrder="together">
          <Row label="A" />
          <Row label="B" />
        </SuspenseList>
      );
    }

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
      root.render(<App />);
    });
    expect(Scheduler).toHaveYielded([
      'Suspend! [A]',
      'Suspend! [B]',
      'Mount A',
      'Mount B',
    ]);
=======
    await act(() => {
      root.render(<App />);
    });
    assertLog(['Suspend! [A]', 'Suspend! [B]', 'Mount A', 'Mount B']);
>>>>>>> remotes/upstream/main

    await act(async () => {
      await resolveText('A');
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      'Promise resolved [A]',
      'A',
      'Suspend! [B]',
    ]);

    await act(async () => {
=======
    assertLog(['Promise resolved [A]', 'A', 'Suspend! [B]']);

    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(null);
    });
    // In the regression, SuspenseList would cause the children to "forget" that
    // it contains passive effects. Then when we deleted the tree, these unmount
    // effects would not fire.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Unmount A', 'Unmount B']);
  });

  it('effect dependencies are persisted after a render phase update', () => {
=======
    assertLog(['Unmount A', 'Unmount B']);
  });

  it('effect dependencies are persisted after a render phase update', async () => {
>>>>>>> remotes/upstream/main
    let handleClick;
    function Test() {
      const [count, setCount] = useState(0);

      useEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`Effect: ${count}`);
=======
        Scheduler.log(`Effect: ${count}`);
>>>>>>> remotes/upstream/main
      }, [count]);

      if (count > 0) {
        setCount(0);
      }

      handleClick = () => setCount(2);

      return <Text text={`Render: ${count}`} />;
    }

<<<<<<< HEAD
    act(() => {
      ReactNoop.render(<Test />);
    });

    expect(Scheduler).toHaveYielded(['Render: 0', 'Effect: 0']);

    act(() => {
      handleClick();
    });

    expect(Scheduler).toHaveYielded(['Render: 0']);

    act(() => {
      handleClick();
    });

    expect(Scheduler).toHaveYielded(['Render: 0']);

    act(() => {
      handleClick();
    });

    expect(Scheduler).toHaveYielded(['Render: 0']);
=======
    await act(() => {
      ReactNoop.render(<Test />);
    });

    assertLog(['Render: 0', 'Effect: 0']);

    await act(() => {
      handleClick();
    });

    assertLog(['Render: 0']);

    await act(() => {
      handleClick();
    });

    assertLog(['Render: 0']);

    await act(() => {
      handleClick();
    });

    assertLog(['Render: 0']);
>>>>>>> remotes/upstream/main
  });
});
