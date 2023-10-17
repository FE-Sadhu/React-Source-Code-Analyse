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
let ReactTestRenderer;
let Scheduler;
let act;
<<<<<<< HEAD
=======
let assertLog;
>>>>>>> remotes/upstream/main

describe('StrictEffectsMode', () => {
  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactTestRenderer = require('react-test-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;
=======
    act = require('internal-test-utils').act;

    const InternalTestUtils = require('internal-test-utils');
    assertLog = InternalTestUtils.assertLog;
>>>>>>> remotes/upstream/main
  });

  function supportsDoubleInvokeEffects() {
    return gate(
      flags =>
        flags.build === 'development' &&
<<<<<<< HEAD
        flags.enableStrictEffects &&
=======
>>>>>>> remotes/upstream/main
        flags.createRootStrictEffectsByDefault &&
        flags.dfsEffectsRefactor,
    );
  }

<<<<<<< HEAD
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
      ReactTestRenderer.create(<App text={'mount'} />);
    });

    expect(Scheduler).toHaveYielded([
      'useLayoutEffect mount',
      'useEffect mount',
    ]);
  });

  it('double invoking for effects works properly', () => {
    function App({text}) {
      React.useEffect(() => {
        Scheduler.unstable_yieldValue('useEffect mount');
        return () => Scheduler.unstable_yieldValue('useEffect unmount');
      });

      React.useLayoutEffect(() => {
        Scheduler.unstable_yieldValue('useLayoutEffect mount');
        return () => Scheduler.unstable_yieldValue('useLayoutEffect unmount');
=======
    await act(() => {
      ReactTestRenderer.create(<App text={'mount'} />);
    });

    assertLog(['useLayoutEffect mount', 'useEffect mount']);
  });

  it('double invoking for effects works properly', async () => {
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

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(<App text={'mount'} />, {
        unstable_isConcurrent: true,
      });
    });

    if (supportsDoubleInvokeEffects()) {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'useLayoutEffect mount',
        'useEffect mount',
        'useLayoutEffect unmount',
        'useEffect unmount',
        'useLayoutEffect mount',
        'useEffect mount',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'useLayoutEffect mount',
        'useEffect mount',
      ]);
    }

    act(() => {
      renderer.update(<App text={'update'} />);
    });

    expect(Scheduler).toHaveYielded([
=======
      assertLog(['useLayoutEffect mount', 'useEffect mount']);
    }

    await act(() => {
      renderer.update(<App text={'update'} />);
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
      renderer.unmount();
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
      renderer.unmount();
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

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(<App text={'mount'} />, {
        unstable_isConcurrent: true,
      });
    });

    if (supportsDoubleInvokeEffects()) {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'useEffect One mount',
        'useEffect Two mount',
        'useEffect One unmount',
        'useEffect Two unmount',
        'useEffect One mount',
        'useEffect Two mount',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'useEffect One mount',
        'useEffect Two mount',
      ]);
    }

    act(() => {
      renderer.update(<App text={'update'} />);
    });

    expect(Scheduler).toHaveYielded([
=======
      assertLog(['useEffect One mount', 'useEffect Two mount']);
    }

    await act(() => {
      renderer.update(<App text={'update'} />);
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
      renderer.unmount(null);
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
      renderer.unmount(null);
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

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(<App text={'mount'} />, {
        unstable_isConcurrent: true,
      });
    });

    if (supportsDoubleInvokeEffects()) {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'useLayoutEffect One mount',
        'useLayoutEffect Two mount',
        'useLayoutEffect One unmount',
        'useLayoutEffect Two unmount',
        'useLayoutEffect One mount',
        'useLayoutEffect Two mount',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'useLayoutEffect One mount',
        'useLayoutEffect Two mount',
      ]);
    }

    act(() => {
      renderer.update(<App text={'update'} />);
    });

    expect(Scheduler).toHaveYielded([
=======
      assertLog(['useLayoutEffect One mount', 'useLayoutEffect Two mount']);
    }

    await act(() => {
      renderer.update(<App text={'update'} />);
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
      renderer.unmount();
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
      renderer.unmount();
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

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(<App text={'mount'} />, {
        unstable_isConcurrent: true,
      });
    });

    if (supportsDoubleInvokeEffects()) {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'useLayoutEffect mount',
        'useEffect mount',
        'useLayoutEffect mount',
        'useEffect mount',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'useLayoutEffect mount',
        'useEffect mount',
      ]);
    }

    act(() => {
      renderer.update(<App text={'update'} />);
    });

    expect(Scheduler).toHaveYielded([
      'useLayoutEffect mount',
      'useEffect mount',
    ]);

    act(() => {
      renderer.unmount();
    });

    expect(Scheduler).toHaveYielded([]);
  });

  it('passes the right context to class component lifecycles', () => {
=======
      assertLog(['useLayoutEffect mount', 'useEffect mount']);
    }

    await act(() => {
      renderer.update(<App text={'update'} />);
    });

    assertLog(['useLayoutEffect mount', 'useEffect mount']);

    await act(() => {
      renderer.unmount();
    });

    assertLog([]);
  });

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
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactTestRenderer.create(<App />, {unstable_isConcurrent: true});
    });

    if (supportsDoubleInvokeEffects()) {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'componentDidMount',
        'componentWillUnmount',
        'componentDidMount',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['componentDidMount']);
    }
  });

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
      assertLog(['componentDidMount']);
    }
  });

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

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(<App text={'mount'} />, {
        unstable_isConcurrent: true,
      });
    });

    if (supportsDoubleInvokeEffects()) {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'componentDidMount',
        'componentWillUnmount',
        'componentDidMount',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['componentDidMount']);
    }

    act(() => {
      renderer.update(<App text={'update'} />);
    });

    expect(Scheduler).toHaveYielded(['componentDidUpdate']);

    act(() => {
      renderer.unmount();
    });

    expect(Scheduler).toHaveYielded(['componentWillUnmount']);
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
      assertLog(['componentDidMount']);
    }

    await act(() => {
      renderer.update(<App text={'update'} />);
    });

    assertLog(['componentDidUpdate']);

    await act(() => {
      renderer.unmount();
    });

    assertLog(['componentWillUnmount']);
  });

  it('invokes componentWillUnmount for class components without componentDidMount', async () => {
    class App extends React.PureComponent {
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
      ReactTestRenderer.create(<App text={'mount'} />);
    });

    expect(Scheduler).toHaveYielded(['componentDidMount']);
  });

  it('double flushing passive effects only results in one double invoke', () => {
=======
    let renderer;
    await act(() => {
      renderer = ReactTestRenderer.create(<App text={'mount'} />, {
        unstable_isConcurrent: true,
      });
    });

    if (supportsDoubleInvokeEffects()) {
      assertLog(['componentWillUnmount']);
    } else {
      assertLog([]);
    }

    await act(() => {
      renderer.update(<App text={'update'} />);
    });

    assertLog(['componentDidUpdate']);

    await act(() => {
      renderer.unmount();
    });

    assertLog(['componentWillUnmount']);
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
      }

      render() {
        return this.props.text;
      }
    }

    await act(() => {
      ReactTestRenderer.create(<App text={'mount'} />);
    });

    assertLog(['componentDidMount']);
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
>>>>>>> remotes/upstream/main
      ReactTestRenderer.create(<App text={'mount'} />, {
        unstable_isConcurrent: true,
      });
    });

    if (supportsDoubleInvokeEffects()) {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
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
    } else {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'mount',
        'useLayoutEffect mount',
        'useEffect mount',
        'mount',
        'useLayoutEffect unmount',
        'useLayoutEffect mount',
        'useEffect unmount',
        'useEffect mount',
      ]);
    }
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
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactTestRenderer.create(<App />, {unstable_isConcurrent: true});
    });

    if (supportsDoubleInvokeEffects()) {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'App useLayoutEffect mount',
        'App useEffect mount',
        'App useLayoutEffect unmount',
        'App useEffect unmount',
        'App useLayoutEffect mount',
        'App useEffect mount',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'App useLayoutEffect mount',
        'App useEffect mount',
      ]);
    }

    act(() => {
=======
      assertLog(['App useLayoutEffect mount', 'App useEffect mount']);
    }

    await act(() => {
>>>>>>> remotes/upstream/main
      _setShowChild(true);
    });

    if (supportsDoubleInvokeEffects()) {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
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
    } else {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'App useLayoutEffect unmount',
        'Child useLayoutEffect mount',
        'App useLayoutEffect mount',
        'App useEffect unmount',
        'Child useEffect mount',
        'App useEffect mount',
      ]);
    }
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

    let renderer;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      renderer = ReactTestRenderer.create(<App text={'mount'} />, {
        unstable_isConcurrent: true,
      });
    });

    if (supportsDoubleInvokeEffects()) {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
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
    } else {
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'componentDidMount',
        'useLayoutEffect mount',
        'useEffect mount',
      ]);
    }

<<<<<<< HEAD
    act(() => {
      renderer.update(<App text={'mount'} />);
    });

    expect(Scheduler).toHaveYielded([
=======
    await act(() => {
      renderer.update(<App text={'mount'} />);
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
      renderer.unmount();
    });

    expect(Scheduler).toHaveYielded([
=======
    await act(() => {
      renderer.unmount();
    });

    assertLog([
      'componentWillUnmount',
      'useLayoutEffect unmount',
      'useEffect unmount',
    ]);
  });

  it('classes without componentDidMount and functions are double invoked together correctly', async () => {
    class ClassChild extends React.PureComponent {
      componentWillUnmount() {
        Scheduler.log('componentWillUnmount');
      }

      render() {
        return this.props.text;
      }
    }

    function FunctionChild({text}) {
      React.useEffect(() => {
        Scheduler.log('useEffect mount');
        return () => Scheduler.log('useEffect unmount');
      });
      React.useLayoutEffect(() => {
        Scheduler.log('useLayoutEffect mount');
        return () => Scheduler.log('useLayoutEffect unmount');
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

    let renderer;
    await act(() => {
      renderer = ReactTestRenderer.create(<App text={'mount'} />, {
        unstable_isConcurrent: true,
      });
    });

    if (supportsDoubleInvokeEffects()) {
      assertLog([
        'useLayoutEffect mount',
        'useEffect mount',
        'componentWillUnmount',
        'useLayoutEffect unmount',
        'useEffect unmount',
        'useLayoutEffect mount',
        'useEffect mount',
      ]);
    } else {
      assertLog(['useLayoutEffect mount', 'useEffect mount']);
    }

    await act(() => {
      renderer.update(<App text={'mount'} />);
    });

    assertLog([
      'useLayoutEffect unmount',
      'useLayoutEffect mount',
      'useEffect unmount',
      'useEffect mount',
    ]);

    await act(() => {
      renderer.unmount();
    });

    assertLog([
>>>>>>> remotes/upstream/main
      'componentWillUnmount',
      'useLayoutEffect unmount',
      'useEffect unmount',
    ]);
  });
});
