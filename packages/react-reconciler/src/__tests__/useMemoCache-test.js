<<<<<<< HEAD
=======
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 * @jest-environment node
 */

>>>>>>> remotes/upstream/main
let React;
let ReactNoop;
let act;
let useState;
let useMemoCache;
<<<<<<< HEAD
=======
let MemoCacheSentinel;
>>>>>>> remotes/upstream/main
let ErrorBoundary;

describe('useMemoCache()', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    ReactNoop = require('react-noop-renderer');
<<<<<<< HEAD
    act = require('jest-react').act;
    useState = React.useState;
    useMemoCache = React.unstable_useMemoCache;
=======
    act = require('internal-test-utils').act;
    useState = React.useState;
    useMemoCache = React.unstable_useMemoCache;
    MemoCacheSentinel = Symbol.for('react.memo_cache_sentinel');
>>>>>>> remotes/upstream/main

    class _ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = {hasError: false};
      }

      static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
      }

      componentDidCatch(error, errorInfo) {}

      render() {
        if (this.state.hasError) {
          // You can render any custom fallback UI
          return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
      }
    }
    ErrorBoundary = _ErrorBoundary;
  });

  // @gate enableUseMemoCacheHook
  test('render component using cache', async () => {
    function Component(props) {
      const cache = useMemoCache(1);
      expect(Array.isArray(cache)).toBe(true);
      expect(cache.length).toBe(1);
<<<<<<< HEAD
      expect(cache[0]).toBe(undefined);
      return 'Ok';
    }
    const root = ReactNoop.createRoot();
    await act(async () => {
=======
      expect(cache[0]).toBe(MemoCacheSentinel);

      return 'Ok';
    }
    const root = ReactNoop.createRoot();
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<Component />);
    });
    expect(root).toMatchRenderedOutput('Ok');
  });

  // @gate enableUseMemoCacheHook
  test('update component using cache', async () => {
    let setX;
    let forceUpdate;
    function Component(props) {
<<<<<<< HEAD
      const cache = useMemoCache(4);
=======
      const cache = useMemoCache(5);
>>>>>>> remotes/upstream/main

      // x is used to produce a `data` object passed to the child
      const [x, _setX] = useState(0);
      setX = _setX;
<<<<<<< HEAD
      const c_x = x !== cache[0];
      cache[0] = x;
=======
>>>>>>> remotes/upstream/main

      // n is passed as-is to the child as a cache breaker
      const [n, setN] = useState(0);
      forceUpdate = () => setN(a => a + 1);
<<<<<<< HEAD
      const c_n = n !== cache[1];
      cache[1] = n;

      let data;
      if (c_x) {
        data = cache[2] = {text: `Count ${x}`};
      } else {
        data = cache[2];
      }
      if (c_x || c_n) {
        return (cache[3] = <Text data={data} n={n} />);
      } else {
        return cache[3];
      }
=======

      const c_0 = x !== cache[0];
      let data;
      if (c_0) {
        data = {text: `Count ${x}`};
        cache[0] = x;
        cache[1] = data;
      } else {
        data = cache[1];
      }
      const c_2 = x !== cache[2];
      const c_3 = n !== cache[3];
      let t0;
      if (c_2 || c_3) {
        t0 = <Text data={data} n={n} />;
        cache[2] = x;
        cache[3] = n;
        cache[4] = t0;
      } else {
        t0 = cache[4];
      }
      return t0;
>>>>>>> remotes/upstream/main
    }
    let data;
    const Text = jest.fn(function Text(props) {
      data = props.data;
      return data.text;
    });

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<Component />);
    });
    expect(root).toMatchRenderedOutput('Count 0');
    expect(Text).toBeCalledTimes(1);
    const data0 = data;

    // Changing x should reset the data object
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      setX(1);
    });
    expect(root).toMatchRenderedOutput('Count 1');
    expect(Text).toBeCalledTimes(2);
    expect(data).not.toBe(data0);
    const data1 = data;

    // Forcing an unrelated update shouldn't recreate the
    // data object.
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      forceUpdate();
    });
    expect(root).toMatchRenderedOutput('Count 1');
    expect(Text).toBeCalledTimes(3);
    expect(data).toBe(data1); // confirm that the cache persisted across renders
  });

  // @gate enableUseMemoCacheHook
  test('update component using cache with setstate during render', async () => {
<<<<<<< HEAD
    let setX;
    let setN;
    function Component(props) {
      const cache = useMemoCache(4);

      // x is used to produce a `data` object passed to the child
      const [x, _setX] = useState(0);
      setX = _setX;
      const c_x = x !== cache[0];
      cache[0] = x;
=======
    let setN;
    function Component(props) {
      const cache = useMemoCache(5);

      // x is used to produce a `data` object passed to the child
      const [x] = useState(0);

      const c_0 = x !== cache[0];
      let data;
      if (c_0) {
        data = {text: `Count ${x}`};
        cache[0] = x;
        cache[1] = data;
      } else {
        data = cache[1];
      }
>>>>>>> remotes/upstream/main

      // n is passed as-is to the child as a cache breaker
      const [n, _setN] = useState(0);
      setN = _setN;
<<<<<<< HEAD
      const c_n = n !== cache[1];
      cache[1] = n;

      // NOTE: setstate and early return here means that x will update
      // without the data value being updated. Subsequent renders could
      // therefore think that c_x = false (hasn't changed) and skip updating
      // data.
      // The memoizing compiler will have to handle this case, but the runtime
      // can help by falling back to resetting the cache if a setstate occurs
      // during render (this mirrors what we do for useMemo and friends)
=======

>>>>>>> remotes/upstream/main
      if (n === 1) {
        setN(2);
        return;
      }

<<<<<<< HEAD
      let data;
      if (c_x) {
        data = cache[2] = {text: `Count ${x}`};
      } else {
        data = cache[2];
      }
      if (c_x || c_n) {
        return (cache[3] = <Text data={data} n={n} />);
      } else {
        return cache[3];
      }
=======
      const c_2 = x !== cache[2];
      const c_3 = n !== cache[3];
      let t0;
      if (c_2 || c_3) {
        t0 = <Text data={data} n={n} />;
        cache[2] = x;
        cache[3] = n;
        cache[4] = t0;
      } else {
        t0 = cache[4];
      }
      return t0;
>>>>>>> remotes/upstream/main
    }
    let data;
    const Text = jest.fn(function Text(props) {
      data = props.data;
<<<<<<< HEAD
      return data.text;
    });

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<Component />);
    });
    expect(root).toMatchRenderedOutput('Count 0');
    expect(Text).toBeCalledTimes(1);
    const data0 = data;

    // Simultaneously trigger an update to x (should create a new data value)
    // and trigger the setState+early return. The runtime should reset the cache
    // to avoid an inconsistency
    await act(async () => {
      setX(1);
      setN(1);
    });
    expect(root).toMatchRenderedOutput('Count 1');
    expect(Text).toBeCalledTimes(2);
    expect(data).not.toBe(data0);
    const data1 = data;

    // Forcing an unrelated update shouldn't recreate the
    // data object.
    await act(async () => {
      setN(3);
    });
    expect(root).toMatchRenderedOutput('Count 1');
    expect(Text).toBeCalledTimes(3);
    expect(data).toBe(data1); // confirm that the cache persisted across renders
=======
      return `${data.text} (n=${props.n})`;
    });

    const root = ReactNoop.createRoot();
    await act(() => {
      root.render(<Component />);
    });
    expect(root).toMatchRenderedOutput('Count 0 (n=0)');
    expect(Text).toBeCalledTimes(1);
    const data0 = data;

    // Trigger an update that will cause a setState during render. The `data` prop
    // does not depend on `n`, and should remain cached.
    await act(() => {
      setN(1);
    });
    expect(root).toMatchRenderedOutput('Count 0 (n=2)');
    expect(Text).toBeCalledTimes(2);
    expect(data).toBe(data0);
>>>>>>> remotes/upstream/main
  });

  // @gate enableUseMemoCacheHook
  test('update component using cache with throw during render', async () => {
<<<<<<< HEAD
    let setX;
    let setN;
    let shouldFail = true;
    function Component(props) {
      const cache = useMemoCache(4);

      // x is used to produce a `data` object passed to the child
      const [x, _setX] = useState(0);
      setX = _setX;
      const c_x = x !== cache[0];
      cache[0] = x;
=======
    let setN;
    let shouldFail = true;
    function Component(props) {
      const cache = useMemoCache(5);

      // x is used to produce a `data` object passed to the child
      const [x] = useState(0);

      const c_0 = x !== cache[0];
      let data;
      if (c_0) {
        data = {text: `Count ${x}`};
        cache[0] = x;
        cache[1] = data;
      } else {
        data = cache[1];
      }
>>>>>>> remotes/upstream/main

      // n is passed as-is to the child as a cache breaker
      const [n, _setN] = useState(0);
      setN = _setN;
<<<<<<< HEAD
      const c_n = n !== cache[1];
      cache[1] = n;

      // NOTE the initial failure will trigger a re-render, after which the function
      // will early return. This validates that the runtime resets the cache on error:
      // if it doesn't the cache will be corrupt, with the cached version of data
      // out of data from the cached version of x.
=======

>>>>>>> remotes/upstream/main
      if (n === 1) {
        if (shouldFail) {
          shouldFail = false;
          throw new Error('failed');
        }
<<<<<<< HEAD
        setN(2);
        return;
      }

      let data;
      if (c_x) {
        data = cache[2] = {text: `Count ${x}`};
      } else {
        data = cache[2];
      }
      if (c_x || c_n) {
        return (cache[3] = <Text data={data} n={n} />);
      } else {
        return cache[3];
      }
=======
      }

      const c_2 = x !== cache[2];
      const c_3 = n !== cache[3];
      let t0;
      if (c_2 || c_3) {
        t0 = <Text data={data} n={n} />;
        cache[2] = x;
        cache[3] = n;
        cache[4] = t0;
      } else {
        t0 = cache[4];
      }
      return t0;
>>>>>>> remotes/upstream/main
    }
    let data;
    const Text = jest.fn(function Text(props) {
      data = props.data;
<<<<<<< HEAD
      return data.text;
=======
      return `${data.text} (n=${props.n})`;
>>>>>>> remotes/upstream/main
    });

    spyOnDev(console, 'error');

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>,
      );
    });
<<<<<<< HEAD
    expect(root).toMatchRenderedOutput('Count 0');
    expect(Text).toBeCalledTimes(1);
    const data0 = data;

    // Simultaneously trigger an update to x (should create a new data value)
    // and trigger the setState+early return. The runtime should reset the cache
    // to avoid an inconsistency
    await act(async () => {
      // this update bumps the count
      setX(1);
      // this triggers a throw.
      setN(1);
    });
    expect(root).toMatchRenderedOutput('Count 1');
    expect(Text).toBeCalledTimes(2);
    expect(data).not.toBe(data0);
=======
    expect(root).toMatchRenderedOutput('Count 0 (n=0)');
    expect(Text).toBeCalledTimes(1);
    const data0 = data;

    await act(() => {
      // this triggers a throw.
      setN(1);
    });
    expect(root).toMatchRenderedOutput('Count 0 (n=1)');
    expect(Text).toBeCalledTimes(2);
    expect(data).toBe(data0);
>>>>>>> remotes/upstream/main
    const data1 = data;

    // Forcing an unrelated update shouldn't recreate the
    // data object.
<<<<<<< HEAD
    await act(async () => {
      setN(3);
    });
    expect(root).toMatchRenderedOutput('Count 1');
=======
    await act(() => {
      setN(2);
    });
    expect(root).toMatchRenderedOutput('Count 0 (n=2)');
>>>>>>> remotes/upstream/main
    expect(Text).toBeCalledTimes(3);
    expect(data).toBe(data1); // confirm that the cache persisted across renders
  });

  // @gate enableUseMemoCacheHook
  test('update component and custom hook with caches', async () => {
    let setX;
    let forceUpdate;
    function Component(props) {
      const cache = useMemoCache(4);

      // x is used to produce a `data` object passed to the child
      const [x, _setX] = useState(0);
      setX = _setX;
      const c_x = x !== cache[0];
      cache[0] = x;

      // n is passed as-is to the child as a cache breaker
      const [n, setN] = useState(0);
      forceUpdate = () => setN(a => a + 1);
      const c_n = n !== cache[1];
      cache[1] = n;

      let _data;
      if (c_x) {
        _data = cache[2] = {text: `Count ${x}`};
      } else {
        _data = cache[2];
      }
      const data = useData(_data);
      if (c_x || c_n) {
        return (cache[3] = <Text data={data} n={n} />);
      } else {
        return cache[3];
      }
    }
    function useData(data) {
      const cache = useMemoCache(2);
      const c_data = data !== cache[0];
      cache[0] = data;
      let nextData;
      if (c_data) {
        nextData = cache[1] = {text: data.text.toLowerCase()};
      } else {
        nextData = cache[1];
      }
      return nextData;
    }
    let data;
    const Text = jest.fn(function Text(props) {
      data = props.data;
      return data.text;
    });

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<Component />);
    });
    expect(root).toMatchRenderedOutput('count 0');
    expect(Text).toBeCalledTimes(1);
    const data0 = data;

    // Changing x should reset the data object
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      setX(1);
    });
    expect(root).toMatchRenderedOutput('count 1');
    expect(Text).toBeCalledTimes(2);
    expect(data).not.toBe(data0);
    const data1 = data;

    // Forcing an unrelated update shouldn't recreate the
    // data object.
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      forceUpdate();
    });
    expect(root).toMatchRenderedOutput('count 1');
    expect(Text).toBeCalledTimes(3);
    expect(data).toBe(data1); // confirm that the cache persisted across renders
  });
});
