let React;
let Offscreen;
let ReactNoop;
let act;
let log;

describe('ReactOffscreenStrictMode', () => {
  beforeEach(() => {
    jest.resetModules();
    log = [];

    React = require('react');
    Offscreen = React.unstable_Offscreen;
    ReactNoop = require('react-noop-renderer');
<<<<<<< HEAD
    act = require('jest-react').act;
=======
    act = require('internal-test-utils').act;
>>>>>>> remotes/upstream/main
  });

  function Component({label}) {
    React.useEffect(() => {
      log.push(`${label}: useEffect mount`);
      return () => log.push(`${label}: useEffect unmount`);
    });

    React.useLayoutEffect(() => {
      log.push(`${label}: useLayoutEffect mount`);
      return () => log.push(`${label}: useLayoutEffect unmount`);
    });

    log.push(`${label}: render`);

    return <span>label</span>;
  }

<<<<<<< HEAD
  // @gate __DEV__ && enableStrictEffects && enableOffscreen
  it('should trigger strict effects when offscreen is visible', () => {
    act(() => {
=======
  // @gate __DEV__ && enableOffscreen
  it('should trigger strict effects when offscreen is visible', async () => {
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.render(
        <React.StrictMode>
          <Offscreen mode="visible">
            <Component label="A" />
          </Offscreen>
        </React.StrictMode>,
      );
    });

    expect(log).toEqual([
      'A: render',
      'A: render',
      'A: useLayoutEffect mount',
      'A: useEffect mount',
      'A: useLayoutEffect unmount',
      'A: useEffect unmount',
      'A: useLayoutEffect mount',
      'A: useEffect mount',
    ]);
  });

<<<<<<< HEAD
  // @gate __DEV__ && enableStrictEffects && enableOffscreen
  it('should not trigger strict effects when offscreen is hidden', () => {
    act(() => {
=======
  // @gate __DEV__ && enableOffscreen && enableDO_NOT_USE_disableStrictPassiveEffect
  it('does not trigger strict effects when disableStrictPassiveEffect is presented on StrictMode', async () => {
    await act(() => {
      ReactNoop.render(
        <React.StrictMode DO_NOT_USE_disableStrictPassiveEffect={true}>
          <Offscreen>
            <Component label="A" />
          </Offscreen>
        </React.StrictMode>,
      );
    });

    expect(log).toEqual([
      'A: render',
      'A: render',
      'A: useLayoutEffect mount',
      'A: useEffect mount',
      'A: useLayoutEffect unmount',
      'A: useLayoutEffect mount',
    ]);
  });

  // @gate __DEV__ && enableOffscreen && useModernStrictMode
  it('should not trigger strict effects when offscreen is hidden', async () => {
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.render(
        <React.StrictMode>
          <Offscreen mode="hidden">
            <Component label="A" />
          </Offscreen>
        </React.StrictMode>,
      );
    });

    expect(log).toEqual(['A: render', 'A: render']);

    log = [];

<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.render(
        <React.StrictMode>
          <Offscreen mode="hidden">
            <Component label="A" />
            <Component label="B" />
          </Offscreen>
        </React.StrictMode>,
      );
    });

    expect(log).toEqual(['A: render', 'A: render', 'B: render', 'B: render']);

    log = [];

<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.render(
        <React.StrictMode>
          <Offscreen mode="visible">
            <Component label="A" />
          </Offscreen>
        </React.StrictMode>,
      );
    });

    expect(log).toEqual([
      'A: render',
      'A: render',
      'A: useLayoutEffect mount',
      'A: useEffect mount',
      'A: useLayoutEffect unmount',
      'A: useEffect unmount',
      'A: useLayoutEffect mount',
      'A: useEffect mount',
    ]);

    log = [];

<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.render(
        <React.StrictMode>
          <Offscreen mode="hidden">
            <Component label="A" />
          </Offscreen>
        </React.StrictMode>,
      );
    });

    expect(log).toEqual([
      'A: useLayoutEffect unmount',
      'A: useEffect unmount',
      'A: render',
      'A: render',
    ]);
  });

<<<<<<< HEAD
  it('should not cause infinite render loop when StrictMode is used with Suspense and synchronous set states', () => {
=======
  it('should not cause infinite render loop when StrictMode is used with Suspense and synchronous set states', async () => {
>>>>>>> remotes/upstream/main
    // This is a regression test, see https://github.com/facebook/react/pull/25179 for more details.
    function App() {
      const [state, setState] = React.useState(false);

      React.useLayoutEffect(() => {
        setState(true);
      }, []);

      React.useEffect(() => {
        // Empty useEffect with empty dependency array is needed to trigger infinite render loop.
      }, []);

      return state;
    }

<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.render(
        <React.StrictMode>
          <React.Suspense>
            <App />
          </React.Suspense>
        </React.StrictMode>,
      );
    });
  });
<<<<<<< HEAD
=======

  // @gate __DEV__ && enableOffscreen
  it('should double invoke effects on unsuspended child', async () => {
    let shouldSuspend = true;
    let resolve;
    const suspensePromise = new Promise(_resolve => {
      resolve = _resolve;
    });

    function Parent() {
      log.push('Parent rendered');
      React.useEffect(() => {
        log.push('Parent mount');
        return () => {
          log.push('Parent unmount');
        };
      });

      return (
        <React.Suspense fallback="fallback">
          <Child />
        </React.Suspense>
      );
    }

    function Child() {
      log.push('Child rendered');
      React.useEffect(() => {
        log.push('Child mount');
        return () => {
          log.push('Child unmount');
        };
      });
      if (shouldSuspend) {
        log.push('Child suspended');
        throw suspensePromise;
      }
      return null;
    }

    await act(() => {
      ReactNoop.render(
        <React.StrictMode>
          <Offscreen mode="visible">
            <Parent />
          </Offscreen>
        </React.StrictMode>,
      );
    });

    log.push('------------------------------');

    await act(() => {
      resolve();
      shouldSuspend = false;
    });

    expect(log).toEqual([
      'Parent rendered',
      'Parent rendered',
      'Child rendered',
      'Child suspended',
      'Parent mount',
      'Parent unmount',
      'Parent mount',
      '------------------------------',
      'Child rendered',
      'Child rendered',
      'Child mount',
      'Child unmount',
      'Child mount',
    ]);
  });
>>>>>>> remotes/upstream/main
});
