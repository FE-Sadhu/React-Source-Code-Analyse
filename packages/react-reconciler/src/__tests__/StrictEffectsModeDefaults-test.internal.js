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

let React;
let ReactNoop;
let Scheduler;
let act;
<<<<<<< HEAD
=======
let assertLog;
let waitFor;
let waitForAll;
let waitForPaint;
>>>>>>> remotes/upstream/main

describe('StrictEffectsMode defaults', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;

    const ReactFeatureFlags = require('shared/ReactFeatureFlags');
    ReactFeatureFlags.enableStrictEffects = __DEV__;
    ReactFeatureFlags.createRootStrictEffectsByDefault = __DEV__;
  });

  it('should not double invoke effects in legacy mode', () => {
    function App({text}) {
      React.useEffect(() => {
        Scheduler.unstable_yieldValue('useEffect mount');
        return () => Scheduler.unstable_yieldValue('useEffect unmount');
      });

      React.useLayoutEffect(() => {
        Scheduler.unstable_yieldValue('useLayoutEffect mount');
        return () => Scheduler.unstable_yieldValue('useLayoutEffect unmount');
=======
    act = require('internal-test-utils').act;

    const InternalTestUtils = require('internal-test-utils');
    waitFor = InternalTestUtils.waitFor;
    waitForAll = InternalTestUtils.waitForAll;
    waitForPaint = InternalTestUtils.waitForPaint;
    assertLog = InternalTestUtils.assertLog;

    const ReactFeatureFlags = require('shared/ReactFeatureFlags');
    ReactFeatureFlags.createRootStrictEffectsByDefault = __DEV__;
  });

  it('should not double invoke effects in legacy mode', async () => {
    function App({text}) {
      React.useEffect(() => {
        Scheduler.log('useEffect mount');
        return () => Scheduler.log('useEffect unmount');
      });

      React.useLayoutEffect(() => {
        Scheduler.log('useLayoutEffect mount');
        return () => Scheduler.log('useLayoutEffect unmount');
>>>>>>> remotes/upstream/main
      });

      return text;
    }

<<<<<<< HEAD
    act(() => {
      ReactNoop.renderLegacySyncRoot(<App text={'mount'} />);
    });

    expect(Scheduler).toHaveYielded([
      'useLayoutEffect mount',
      'useEffect mount',
    ]);
  });

  it('should not double invoke class lifecycles in legacy mode', () => {
    class App extends React.PureComponent {
      componentDidMount() {
        Scheduler.unstable_yieldValue('componentDidMount');
      }

      componentDidUpdate() {
        Scheduler.unstable_yieldValue('componentDidUpdate');
      }

      componentWillUnmount() {
        Scheduler.unstable_yieldValue('componentWillUnmount');
=======
    await act(() => {
      ReactNoop.renderLegacySyncRoot(<App text={'mount'} />);
    });

    assertLog(['useLayoutEffect mount', 'useEffect mount']);
  });

  it('should not double invoke class lifecycles in legacy mode', async () => {
    class App extends React.PureComponent {
      componentDidMount() {
        Scheduler.log('componentDidMount');
      }

      componentDidUpdate() {
        Scheduler.log('componentDidUpdate');
      }

      componentWillUnmount() {
        Scheduler.log('componentWillUnmount');
>>>>>>> remotes/upstream/main
      }

      render() {
        return this.props.text;
      }
    }

<<<<<<< HEAD
    act(() => {
      ReactNoop.renderLegacySyncRoot(<App text={'mount'} />);
    });

    expect(Scheduler).toHaveYielded(['componentDidMount']);
  });

  if (__DEV__) {
    it('should flush double-invoked effects within the same frame as layout effects if there are no passive effects', () => {
      function ComponentWithEffects({label}) {
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue(`useLayoutEffect mount "${label}"`);
          return () =>
            Scheduler.unstable_yieldValue(`useLayoutEffect unmount "${label}"`);
=======
    await act(() => {
      ReactNoop.renderLegacySyncRoot(<App text={'mount'} />);
    });

    assertLog(['componentDidMount']);
  });

  if (__DEV__) {
    it('should flush double-invoked effects within the same frame as layout effects if there are no passive effects', async () => {
      function ComponentWithEffects({label}) {
        React.useLayoutEffect(() => {
          Scheduler.log(`useLayoutEffect mount "${label}"`);
          return () => Scheduler.log(`useLayoutEffect unmount "${label}"`);
>>>>>>> remotes/upstream/main
        });

        return label;
      }

<<<<<<< HEAD
      act(() => {
=======
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <>
            <ComponentWithEffects label={'one'} />
          </>,
        );

<<<<<<< HEAD
        expect(Scheduler).toFlushUntilNextPaint([
=======
        await waitForPaint([
>>>>>>> remotes/upstream/main
          'useLayoutEffect mount "one"',
          'useLayoutEffect unmount "one"',
          'useLayoutEffect mount "one"',
        ]);
      });

<<<<<<< HEAD
      act(() => {
=======
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <>
            <ComponentWithEffects label={'one'} />
            <ComponentWithEffects label={'two'} />
          </>,
        );

<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([]);
        expect(Scheduler).toFlushUntilNextPaint([
=======
        assertLog([]);
        await waitForPaint([
>>>>>>> remotes/upstream/main
          // Cleanup and re-run "one" (and "two") since there is no dependencies array.
          'useLayoutEffect unmount "one"',
          'useLayoutEffect mount "one"',
          'useLayoutEffect mount "two"',

          // Since "two" is new, it should be double-invoked.
          'useLayoutEffect unmount "two"',
          'useLayoutEffect mount "two"',
        ]);
      });
    });

    // This test also verifies that double-invoked effects flush synchronously
    // within the same frame as passive effects.
<<<<<<< HEAD
    it('should double invoke effects only for newly mounted components', () => {
      function ComponentWithEffects({label}) {
        React.useEffect(() => {
          Scheduler.unstable_yieldValue(`useEffect mount "${label}"`);
          return () =>
            Scheduler.unstable_yieldValue(`useEffect unmount "${label}"`);
        });

        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue(`useLayoutEffect mount "${label}"`);
          return () =>
            Scheduler.unstable_yieldValue(`useLayoutEffect unmount "${label}"`);
=======
    it('should double invoke effects only for newly mounted components', async () => {
      function ComponentWithEffects({label}) {
        React.useEffect(() => {
          Scheduler.log(`useEffect mount "${label}"`);
          return () => Scheduler.log(`useEffect unmount "${label}"`);
        });

        React.useLayoutEffect(() => {
          Scheduler.log(`useLayoutEffect mount "${label}"`);
          return () => Scheduler.log(`useLayoutEffect unmount "${label}"`);
>>>>>>> remotes/upstream/main
        });

        return label;
      }

<<<<<<< HEAD
      act(() => {
=======
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <>
            <ComponentWithEffects label={'one'} />
          </>,
        );

<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
=======
        await waitForAll([
>>>>>>> remotes/upstream/main
          'useLayoutEffect mount "one"',
          'useEffect mount "one"',
          'useLayoutEffect unmount "one"',
          'useEffect unmount "one"',
          'useLayoutEffect mount "one"',
          'useEffect mount "one"',
        ]);
      });

<<<<<<< HEAD
      act(() => {
=======
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <>
            <ComponentWithEffects label={'one'} />
            <ComponentWithEffects label={'two'} />
          </>,
        );

<<<<<<< HEAD
        expect(Scheduler).toFlushAndYieldThrough([
=======
        await waitFor([
>>>>>>> remotes/upstream/main
          // Cleanup and re-run "one" (and "two") since there is no dependencies array.
          'useLayoutEffect unmount "one"',
          'useLayoutEffect mount "one"',
          'useLayoutEffect mount "two"',
        ]);
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
=======
        await waitForAll([
>>>>>>> remotes/upstream/main
          'useEffect unmount "one"',
          'useEffect mount "one"',
          'useEffect mount "two"',

          // Since "two" is new, it should be double-invoked.
          'useLayoutEffect unmount "two"',
          'useEffect unmount "two"',
          'useLayoutEffect mount "two"',
          'useEffect mount "two"',
        ]);
      });
    });

<<<<<<< HEAD
    it('double invoking for effects for modern roots', () => {
      function App({text}) {
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('useEffect mount');
          return () => Scheduler.unstable_yieldValue('useEffect unmount');
        });

        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('useLayoutEffect mount');
          return () => Scheduler.unstable_yieldValue('useLayoutEffect unmount');
=======
    it('double invoking for effects for modern roots', async () => {
      function App({text}) {
        React.useEffect(() => {
          Scheduler.log('useEffect mount');
          return () => Scheduler.log('useEffect unmount');
        });

        React.useLayoutEffect(() => {
          Scheduler.log('useLayoutEffect mount');
          return () => Scheduler.log('useLayoutEffect unmount');
>>>>>>> remotes/upstream/main
        });

        return text;
      }
<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'useLayoutEffect mount',
        'useEffect mount',
        'useLayoutEffect unmount',
        'useEffect unmount',
        'useLayoutEffect mount',
        'useEffect mount',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'update'} />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App text={'update'} />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'useLayoutEffect unmount',
        'useLayoutEffect mount',
        'useEffect unmount',
        'useEffect mount',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(null);
      });

      expect(Scheduler).toHaveYielded([
        'useLayoutEffect unmount',
        'useEffect unmount',
      ]);
    });

    it('multiple effects are double invoked in the right order (all mounted, all unmounted, all remounted)', () => {
      function App({text}) {
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('useEffect One mount');
          return () => Scheduler.unstable_yieldValue('useEffect One unmount');
        });

        React.useEffect(() => {
          Scheduler.unstable_yieldValue('useEffect Two mount');
          return () => Scheduler.unstable_yieldValue('useEffect Two unmount');
=======
      await act(() => {
        ReactNoop.render(null);
      });

      assertLog(['useLayoutEffect unmount', 'useEffect unmount']);
    });

    it('multiple effects are double invoked in the right order (all mounted, all unmounted, all remounted)', async () => {
      function App({text}) {
        React.useEffect(() => {
          Scheduler.log('useEffect One mount');
          return () => Scheduler.log('useEffect One unmount');
        });

        React.useEffect(() => {
          Scheduler.log('useEffect Two mount');
          return () => Scheduler.log('useEffect Two unmount');
>>>>>>> remotes/upstream/main
        });

        return text;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'useEffect One mount',
        'useEffect Two mount',
        'useEffect One unmount',
        'useEffect Two unmount',
        'useEffect One mount',
        'useEffect Two mount',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'update'} />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App text={'update'} />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'useEffect One unmount',
        'useEffect Two unmount',
        'useEffect One mount',
        'useEffect Two mount',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(null);
      });

      expect(Scheduler).toHaveYielded([
        'useEffect One unmount',
        'useEffect Two unmount',
      ]);
    });

    it('multiple layout effects are double invoked in the right order (all mounted, all unmounted, all remounted)', () => {
      function App({text}) {
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('useLayoutEffect One mount');
          return () =>
            Scheduler.unstable_yieldValue('useLayoutEffect One unmount');
        });

        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('useLayoutEffect Two mount');
          return () =>
            Scheduler.unstable_yieldValue('useLayoutEffect Two unmount');
=======
      await act(() => {
        ReactNoop.render(null);
      });

      assertLog(['useEffect One unmount', 'useEffect Two unmount']);
    });

    it('multiple layout effects are double invoked in the right order (all mounted, all unmounted, all remounted)', async () => {
      function App({text}) {
        React.useLayoutEffect(() => {
          Scheduler.log('useLayoutEffect One mount');
          return () => Scheduler.log('useLayoutEffect One unmount');
        });

        React.useLayoutEffect(() => {
          Scheduler.log('useLayoutEffect Two mount');
          return () => Scheduler.log('useLayoutEffect Two unmount');
>>>>>>> remotes/upstream/main
        });

        return text;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'useLayoutEffect One mount',
        'useLayoutEffect Two mount',
        'useLayoutEffect One unmount',
        'useLayoutEffect Two unmount',
        'useLayoutEffect One mount',
        'useLayoutEffect Two mount',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'update'} />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App text={'update'} />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'useLayoutEffect One unmount',
        'useLayoutEffect Two unmount',
        'useLayoutEffect One mount',
        'useLayoutEffect Two mount',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(null);
      });

      expect(Scheduler).toHaveYielded([
        'useLayoutEffect One unmount',
        'useLayoutEffect Two unmount',
      ]);
    });

    it('useEffect and useLayoutEffect is called twice when there is no unmount', () => {
      function App({text}) {
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('useEffect mount');
        });

        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('useLayoutEffect mount');
=======
      await act(() => {
        ReactNoop.render(null);
      });

      assertLog(['useLayoutEffect One unmount', 'useLayoutEffect Two unmount']);
    });

    it('useEffect and useLayoutEffect is called twice when there is no unmount', async () => {
      function App({text}) {
        React.useEffect(() => {
          Scheduler.log('useEffect mount');
        });

        React.useLayoutEffect(() => {
          Scheduler.log('useLayoutEffect mount');
>>>>>>> remotes/upstream/main
        });

        return text;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'useLayoutEffect mount',
        'useEffect mount',
        'useLayoutEffect mount',
        'useEffect mount',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'update'} />);
      });

      expect(Scheduler).toHaveYielded([
        'useLayoutEffect mount',
        'useEffect mount',
      ]);

      act(() => {
        ReactNoop.render(null);
      });

      expect(Scheduler).toHaveYielded([]);
    });

    it('disconnects refs during double invoking', () => {
=======
      await act(() => {
        ReactNoop.render(<App text={'update'} />);
      });

      assertLog(['useLayoutEffect mount', 'useEffect mount']);

      await act(() => {
        ReactNoop.render(null);
      });

      assertLog([]);
    });

    //@gate useModernStrictMode
    it('disconnects refs during double invoking', async () => {
>>>>>>> remotes/upstream/main
      const onRefMock = jest.fn();
      function App({text}) {
        return (
          <span
            ref={ref => {
              onRefMock(ref);
            }}>
            text
          </span>
        );
      }

<<<<<<< HEAD
      act(() => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(<App text={'mount'} />);
      });

      expect(onRefMock.mock.calls.length).toBe(3);
      expect(onRefMock.mock.calls[0][0]).not.toBeNull();
      expect(onRefMock.mock.calls[1][0]).toBe(null);
      expect(onRefMock.mock.calls[2][0]).not.toBeNull();
    });

<<<<<<< HEAD
    it('passes the right context to class component lifecycles', () => {
=======
    it('passes the right context to class component lifecycles', async () => {
>>>>>>> remotes/upstream/main
      class App extends React.PureComponent {
        test() {}

        componentDidMount() {
          this.test();
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('componentDidMount');
=======
          Scheduler.log('componentDidMount');
>>>>>>> remotes/upstream/main
        }

        componentDidUpdate() {
          this.test();
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('componentDidUpdate');
=======
          Scheduler.log('componentDidUpdate');
>>>>>>> remotes/upstream/main
        }

        componentWillUnmount() {
          this.test();
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('componentWillUnmount');
=======
          Scheduler.log('componentWillUnmount');
>>>>>>> remotes/upstream/main
        }

        render() {
          return null;
        }
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'componentDidMount',
        'componentWillUnmount',
        'componentDidMount',
      ]);
    });

<<<<<<< HEAD
    it('double invoking works for class components', () => {
      class App extends React.PureComponent {
        componentDidMount() {
          Scheduler.unstable_yieldValue('componentDidMount');
        }

        componentDidUpdate() {
          Scheduler.unstable_yieldValue('componentDidUpdate');
        }

        componentWillUnmount() {
          Scheduler.unstable_yieldValue('componentWillUnmount');
=======
    it('double invoking works for class components', async () => {
      class App extends React.PureComponent {
        componentDidMount() {
          Scheduler.log('componentDidMount');
        }

        componentDidUpdate() {
          Scheduler.log('componentDidUpdate');
        }

        componentWillUnmount() {
          Scheduler.log('componentWillUnmount');
>>>>>>> remotes/upstream/main
        }

        render() {
          return this.props.text;
        }
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'componentDidMount',
        'componentWillUnmount',
        'componentDidMount',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'update'} />);
      });

      expect(Scheduler).toHaveYielded(['componentDidUpdate']);

      act(() => {
        ReactNoop.render(null);
      });

      expect(Scheduler).toHaveYielded(['componentWillUnmount']);
    });

    it('double flushing passive effects only results in one double invoke', () => {
=======
      await act(() => {
        ReactNoop.render(<App text={'update'} />);
      });

      assertLog(['componentDidUpdate']);

      await act(() => {
        ReactNoop.render(null);
      });

      assertLog(['componentWillUnmount']);
    });

    it('double flushing passive effects only results in one double invoke', async () => {
>>>>>>> remotes/upstream/main
      function App({text}) {
        const [state, setState] = React.useState(0);
        React.useEffect(() => {
          if (state !== 1) {
            setState(1);
          }
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('useEffect mount');
          return () => Scheduler.unstable_yieldValue('useEffect unmount');
        });

        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('useLayoutEffect mount');
          return () => Scheduler.unstable_yieldValue('useLayoutEffect unmount');
        });

        Scheduler.unstable_yieldValue(text);
        return text;
      }

      act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      expect(Scheduler).toHaveYielded([
=======
          Scheduler.log('useEffect mount');
          return () => Scheduler.log('useEffect unmount');
        });

        React.useLayoutEffect(() => {
          Scheduler.log('useLayoutEffect mount');
          return () => Scheduler.log('useLayoutEffect unmount');
        });

        Scheduler.log(text);
        return text;
      }

      await act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'mount',
        'useLayoutEffect mount',
        'useEffect mount',
        'useLayoutEffect unmount',
        'useEffect unmount',
        'useLayoutEffect mount',
        'useEffect mount',
        'mount',
        'useLayoutEffect unmount',
        'useLayoutEffect mount',
        'useEffect unmount',
        'useEffect mount',
      ]);
    });

<<<<<<< HEAD
    it('newly mounted components after initial mount get double invoked', () => {
      let _setShowChild;
      function Child() {
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('Child useEffect mount');
          return () => Scheduler.unstable_yieldValue('Child useEffect unmount');
        });
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('Child useLayoutEffect mount');
          return () =>
            Scheduler.unstable_yieldValue('Child useLayoutEffect unmount');
=======
    it('newly mounted components after initial mount get double invoked', async () => {
      let _setShowChild;
      function Child() {
        React.useEffect(() => {
          Scheduler.log('Child useEffect mount');
          return () => Scheduler.log('Child useEffect unmount');
        });
        React.useLayoutEffect(() => {
          Scheduler.log('Child useLayoutEffect mount');
          return () => Scheduler.log('Child useLayoutEffect unmount');
>>>>>>> remotes/upstream/main
        });

        return null;
      }

      function App() {
        const [showChild, setShowChild] = React.useState(false);
        _setShowChild = setShowChild;
        React.useEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App useEffect mount');
          return () => Scheduler.unstable_yieldValue('App useEffect unmount');
        });
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('App useLayoutEffect mount');
          return () =>
            Scheduler.unstable_yieldValue('App useLayoutEffect unmount');
=======
          Scheduler.log('App useEffect mount');
          return () => Scheduler.log('App useEffect unmount');
        });
        React.useLayoutEffect(() => {
          Scheduler.log('App useLayoutEffect mount');
          return () => Scheduler.log('App useLayoutEffect unmount');
>>>>>>> remotes/upstream/main
        });

        return showChild && <Child />;
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'App useLayoutEffect mount',
        'App useEffect mount',
        'App useLayoutEffect unmount',
        'App useEffect unmount',
        'App useLayoutEffect mount',
        'App useEffect mount',
      ]);

<<<<<<< HEAD
      act(() => {
        _setShowChild(true);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        _setShowChild(true);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'App useLayoutEffect unmount',
        'Child useLayoutEffect mount',
        'App useLayoutEffect mount',
        'App useEffect unmount',
        'Child useEffect mount',
        'App useEffect mount',
        'Child useLayoutEffect unmount',
        'Child useEffect unmount',
        'Child useLayoutEffect mount',
        'Child useEffect mount',
      ]);
    });

<<<<<<< HEAD
    it('classes and functions are double invoked together correctly', () => {
      class ClassChild extends React.PureComponent {
        componentDidMount() {
          Scheduler.unstable_yieldValue('componentDidMount');
        }

        componentWillUnmount() {
          Scheduler.unstable_yieldValue('componentWillUnmount');
=======
    it('classes and functions are double invoked together correctly', async () => {
      class ClassChild extends React.PureComponent {
        componentDidMount() {
          Scheduler.log('componentDidMount');
        }

        componentWillUnmount() {
          Scheduler.log('componentWillUnmount');
>>>>>>> remotes/upstream/main
        }

        render() {
          return this.props.text;
        }
      }

      function FunctionChild({text}) {
        React.useEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('useEffect mount');
          return () => Scheduler.unstable_yieldValue('useEffect unmount');
        });
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('useLayoutEffect mount');
          return () => Scheduler.unstable_yieldValue('useLayoutEffect unmount');
=======
          Scheduler.log('useEffect mount');
          return () => Scheduler.log('useEffect unmount');
        });
        React.useLayoutEffect(() => {
          Scheduler.log('useLayoutEffect mount');
          return () => Scheduler.log('useLayoutEffect unmount');
>>>>>>> remotes/upstream/main
        });
        return text;
      }

      function App({text}) {
        return (
          <>
            <ClassChild text={text} />
            <FunctionChild text={text} />
          </>
        );
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'componentDidMount',
        'useLayoutEffect mount',
        'useEffect mount',
        'componentWillUnmount',
        'useLayoutEffect unmount',
        'useEffect unmount',
        'componentDidMount',
        'useLayoutEffect mount',
        'useEffect mount',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App text={'mount'} />);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'useLayoutEffect unmount',
        'useLayoutEffect mount',
        'useEffect unmount',
        'useEffect mount',
      ]);

<<<<<<< HEAD
      act(() => {
        ReactNoop.render(null);
      });

      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(null);
      });

      assertLog([
>>>>>>> remotes/upstream/main
        'componentWillUnmount',
        'useLayoutEffect unmount',
        'useEffect unmount',
      ]);
    });
  }
});
