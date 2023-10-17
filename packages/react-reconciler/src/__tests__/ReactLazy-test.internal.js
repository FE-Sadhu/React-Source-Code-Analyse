let PropTypes;
let React;
let ReactTestRenderer;
let Scheduler;
let ReactFeatureFlags;
let Suspense;
let lazy;
<<<<<<< HEAD
=======
let waitFor;
let waitForAll;
let waitForThrow;
let assertLog;
let act;

let fakeModuleCache;
>>>>>>> remotes/upstream/main

function normalizeCodeLocInfo(str) {
  return (
    str &&
<<<<<<< HEAD
    str.replace(/\n +(?:at|in) ([\S]+)[^\n]*/g, function(m, name) {
=======
    str.replace(/\n +(?:at|in) ([\S]+)[^\n]*/g, function (m, name) {
>>>>>>> remotes/upstream/main
      return '\n    in ' + name + ' (at **)';
    })
  );
}

describe('ReactLazy', () => {
  beforeEach(() => {
    jest.resetModules();
    ReactFeatureFlags = require('shared/ReactFeatureFlags');

    ReactFeatureFlags.replayFailedUnitOfWorkWithInvokeGuardedCallback = false;
    PropTypes = require('prop-types');
    React = require('react');
    Suspense = React.Suspense;
    lazy = React.lazy;
    ReactTestRenderer = require('react-test-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
  });

  function Text(props) {
    Scheduler.unstable_yieldValue(props.text);
    return props.text;
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  async function fakeImport(result) {
    return {default: result};
=======

    const InternalTestUtils = require('internal-test-utils');
    waitFor = InternalTestUtils.waitFor;
    waitForAll = InternalTestUtils.waitForAll;
    waitForThrow = InternalTestUtils.waitForThrow;
    assertLog = InternalTestUtils.assertLog;
    act = InternalTestUtils.act;

    fakeModuleCache = new Map();
  });

  function Text(props) {
    Scheduler.log(props.text);
    return props.text;
  }

  async function fakeImport(Component) {
    const record = fakeModuleCache.get(Component);
    if (record === undefined) {
      const newRecord = {
        status: 'pending',
        value: {default: Component},
        pings: [],
        then(ping) {
          switch (newRecord.status) {
            case 'pending': {
              newRecord.pings.push(ping);
              return;
            }
            case 'resolved': {
              ping(newRecord.value);
              return;
            }
            case 'rejected': {
              throw newRecord.value;
            }
          }
        },
      };
      fakeModuleCache.set(Component, newRecord);
      return newRecord;
    }
    return record;
  }

  function resolveFakeImport(moduleName) {
    const record = fakeModuleCache.get(moduleName);
    if (record === undefined) {
      throw new Error('Module not found');
    }
    if (record.status !== 'pending') {
      throw new Error('Module already resolved');
    }
    record.status = 'resolved';
    record.pings.forEach(ping => ping(record.value));
>>>>>>> remotes/upstream/main
  }

  it('suspends until module has loaded', async () => {
    const LazyText = lazy(() => fakeImport(Text));

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText text="Hi" />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hi');

    await Promise.resolve();

    expect(Scheduler).toFlushAndYield(['Hi']);
=======
    await waitForAll(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hi');

    await act(() => resolveFakeImport(Text));
    assertLog(['Hi']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Hi');

    // Should not suspend on update
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText text="Hi again" />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Hi again']);
=======
    await waitForAll(['Hi again']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Hi again');
  });

  it('can resolve synchronously without suspending', async () => {
    const LazyText = lazy(() => ({
      then(cb) {
        cb({default: Text});
      },
    }));

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText text="Hi" />
      </Suspense>,
    );

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Hi']);
=======
    assertLog(['Hi']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Hi');
  });

  it('can reject synchronously without suspending', async () => {
    const LazyText = lazy(() => ({
      then(resolve, reject) {
        reject(new Error('oh no'));
      },
    }));

    class ErrorBoundary extends React.Component {
      state = {};
      static getDerivedStateFromError(error) {
        return {message: error.message};
      }
      render() {
        return this.state.message
          ? `Error: ${this.state.message}`
          : this.props.children;
      }
    }

    const root = ReactTestRenderer.create(
      <ErrorBoundary>
        <Suspense fallback={<Text text="Loading..." />}>
          <LazyText text="Hi" />
        </Suspense>
      </ErrorBoundary>,
    );
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Error: oh no');
  });

  it('multiple lazy components', async () => {
    function Foo() {
      return <Text text="Foo" />;
    }

    function Bar() {
      return <Text text="Bar" />;
    }

<<<<<<< HEAD
    const promiseForFoo = delay(100).then(() => fakeImport(Foo));
    const promiseForBar = delay(500).then(() => fakeImport(Bar));

    const LazyFoo = lazy(() => promiseForFoo);
    const LazyBar = lazy(() => promiseForBar);
=======
    const LazyFoo = lazy(() => fakeImport(Foo));
    const LazyBar = lazy(() => fakeImport(Bar));
>>>>>>> remotes/upstream/main

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyFoo />
        <LazyBar />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('FooBar');

    jest.advanceTimersByTime(100);
    await promiseForFoo;

    expect(Scheduler).toFlushAndYield(['Foo']);
    expect(root).not.toMatchRenderedOutput('FooBar');

    jest.advanceTimersByTime(500);
    await promiseForBar;

    expect(Scheduler).toFlushAndYield(['Foo', 'Bar']);
=======
    await waitForAll(['Loading...']);
    expect(root).not.toMatchRenderedOutput('FooBar');

    await resolveFakeImport(Foo);

    await waitForAll(['Foo']);
    expect(root).not.toMatchRenderedOutput('FooBar');

    await act(() => resolveFakeImport(Bar));
    assertLog(['Foo', 'Bar']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('FooBar');
  });

  it('does not support arbitrary promises, only module objects', async () => {
<<<<<<< HEAD
    spyOnDev(console, 'error');

    const LazyText = lazy(async () => Text);

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText text="Hi" />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hi');

    await Promise.resolve();

    expect(Scheduler).toFlushAndThrow('Element type is invalid');
    if (__DEV__) {
      expect(console.error).toHaveBeenCalledTimes(3);
      expect(console.error.calls.argsFor(0)[0]).toContain(
=======
    spyOnDev(console, 'error').mockImplementation(() => {});

    const LazyText = lazy(async () => Text);

    const root = ReactTestRenderer.create(null, {
      unstable_isConcurrent: true,
    });

    let error;
    try {
      await act(() => {
        root.update(
          <Suspense fallback={<Text text="Loading..." />}>
            <LazyText text="Hi" />
          </Suspense>,
        );
      });
    } catch (e) {
      error = e;
    }

    expect(error.message).toMatch('Element type is invalid');
    assertLog(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hi');
    if (__DEV__) {
      expect(console.error).toHaveBeenCalledTimes(3);
      expect(console.error.mock.calls[0][0]).toContain(
>>>>>>> remotes/upstream/main
        'Expected the result of a dynamic import() call',
      );
    }
  });

  it('throws if promise rejects', async () => {
<<<<<<< HEAD
    const LazyText = lazy(async () => {
      throw new Error('Bad network');
    });

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText text="Hi" />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hi');

    try {
      await Promise.resolve();
    } catch (e) {}

    expect(Scheduler).toFlushAndThrow('Bad network');
=======
    const networkError = new Error('Bad network');
    const LazyText = lazy(async () => {
      throw networkError;
    });

    const root = ReactTestRenderer.create(null, {
      unstable_isConcurrent: true,
    });

    let error;
    try {
      await act(() => {
        root.update(
          <Suspense fallback={<Text text="Loading..." />}>
            <LazyText text="Hi" />
          </Suspense>,
        );
      });
    } catch (e) {
      error = e;
    }

    expect(error).toBe(networkError);
    assertLog(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hi');
>>>>>>> remotes/upstream/main
  });

  it('mount and reorder', async () => {
    class Child extends React.Component {
      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Did mount: ' + this.props.label);
      }
      componentDidUpdate() {
        Scheduler.unstable_yieldValue('Did update: ' + this.props.label);
=======
        Scheduler.log('Did mount: ' + this.props.label);
      }
      componentDidUpdate() {
        Scheduler.log('Did update: ' + this.props.label);
>>>>>>> remotes/upstream/main
      }
      render() {
        return <Text text={this.props.label} />;
      }
    }

<<<<<<< HEAD
    const LazyChildA = lazy(() => fakeImport(Child));
    const LazyChildB = lazy(() => fakeImport(Child));
=======
    const LazyChildA = lazy(() => {
      Scheduler.log('Suspend! [LazyChildA]');
      return fakeImport(Child);
    });
    const LazyChildB = lazy(() => {
      Scheduler.log('Suspend! [LazyChildB]');
      return fakeImport(Child);
    });
>>>>>>> remotes/upstream/main

    function Parent({swap}) {
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          {swap
            ? [
                <LazyChildB key="B" label="B" />,
                <LazyChildA key="A" label="A" />,
              ]
            : [
                <LazyChildA key="A" label="A" />,
                <LazyChildB key="B" label="B" />,
              ]}
        </Suspense>
      );
    }

    const root = ReactTestRenderer.create(<Parent swap={false} />, {
      unstable_isConcurrent: true,
    });

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('AB');

    await LazyChildA;
    await LazyChildB;

    expect(Scheduler).toFlushAndYield([
      'A',
      'B',
      'Did mount: A',
      'Did mount: B',
    ]);
=======
    await waitForAll(['Suspend! [LazyChildA]', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('AB');

    await act(async () => {
      await resolveFakeImport(Child);

      // B suspends even though it happens to share the same import as A.
      // TODO: React.lazy should implement the `status` and `value` fields, so
      // we can unwrap the result synchronously if it already loaded. Like `use`.
      await waitFor(['A', 'Suspend! [LazyChildB]']);
    });
    assertLog(['A', 'B', 'Did mount: A', 'Did mount: B']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('AB');

    // Swap the position of A and B
    root.update(<Parent swap={true} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'B',
      'A',
      'Did update: B',
      'Did update: A',
    ]);
=======
    await waitForAll(['B', 'A', 'Did update: B', 'Did update: A']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('BA');
  });

  it('resolves defaultProps, on mount and update', async () => {
    function T(props) {
      return <Text {...props} />;
    }
    T.defaultProps = {text: 'Hi'};
    const LazyText = lazy(() => fakeImport(T));

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hi');

    await Promise.resolve();

    expect(Scheduler).toFlushAndYield(['Hi']);
=======
    await waitForAll(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hi');

    await expect(async () => {
      await act(() => resolveFakeImport(T));
      assertLog(['Hi']);
    }).toErrorDev(
      'Warning: T: Support for defaultProps ' +
        'will be removed from function components in a future major ' +
        'release. Use JavaScript default parameters instead.',
    );

>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Hi');

    T.defaultProps = {text: 'Hi again'};
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Hi again']);
=======
    await waitForAll(['Hi again']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Hi again');
  });

  it('resolves defaultProps without breaking memoization', async () => {
    function LazyImpl(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Lazy');
=======
      Scheduler.log('Lazy');
>>>>>>> remotes/upstream/main
      return (
        <>
          <Text text={props.siblingText} />
          {props.children}
        </>
      );
    }
    LazyImpl.defaultProps = {siblingText: 'Sibling'};
    const Lazy = lazy(() => fakeImport(LazyImpl));

    class Stateful extends React.Component {
      state = {text: 'A'};
      render() {
        return <Text text={this.state.text} />;
      }
    }

    const stateful = React.createRef(null);

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <Lazy>
          <Stateful ref={stateful} />
        </Lazy>
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('SiblingA');

    await Promise.resolve();

    expect(Scheduler).toFlushAndYield(['Lazy', 'Sibling', 'A']);
=======
    await waitForAll(['Loading...']);
    expect(root).not.toMatchRenderedOutput('SiblingA');

    await expect(async () => {
      await act(() => resolveFakeImport(LazyImpl));
      assertLog(['Lazy', 'Sibling', 'A']);
    }).toErrorDev(
      'Warning: LazyImpl: Support for defaultProps ' +
        'will be removed from function components in a future major ' +
        'release. Use JavaScript default parameters instead.',
    );

>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('SiblingA');

    // Lazy should not re-render
    stateful.current.setState({text: 'B'});
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['B']);
=======
    await waitForAll(['B']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('SiblingB');
  });

  it('resolves defaultProps without breaking bailout due to unchanged props and state, #17151', async () => {
    class LazyImpl extends React.Component {
      static defaultProps = {value: 0};

      render() {
        const text = `${this.props.label}: ${this.props.value}`;
        return <Text text={text} />;
      }
    }

    const Lazy = lazy(() => fakeImport(LazyImpl));

    const instance1 = React.createRef(null);
    const instance2 = React.createRef(null);

    const root = ReactTestRenderer.create(
      <>
        <LazyImpl ref={instance1} label="Not lazy" />
        <Suspense fallback={<Text text="Loading..." />}>
          <Lazy ref={instance2} label="Lazy" />
        </Suspense>
      </>,
      {
        unstable_isConcurrent: true,
      },
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Not lazy: 0', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('Not lazy: 0Lazy: 0');

    await Promise.resolve();

    expect(Scheduler).toFlushAndYield(['Lazy: 0']);
=======
    await waitForAll(['Not lazy: 0', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('Not lazy: 0Lazy: 0');

    await act(() => resolveFakeImport(LazyImpl));
    assertLog(['Lazy: 0']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Not lazy: 0Lazy: 0');

    // Should bailout due to unchanged props and state
    instance1.current.setState(null);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Not lazy: 0Lazy: 0');

    // Should bailout due to unchanged props and state
    instance2.current.setState(null);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Not lazy: 0Lazy: 0');
  });

  it('resolves defaultProps without breaking bailout in PureComponent, #17151', async () => {
    class LazyImpl extends React.PureComponent {
      static defaultProps = {value: 0};
      state = {};

      render() {
        const text = `${this.props.label}: ${this.props.value}`;
        return <Text text={text} />;
      }
    }

    const Lazy = lazy(() => fakeImport(LazyImpl));

    const instance1 = React.createRef(null);
    const instance2 = React.createRef(null);

    const root = ReactTestRenderer.create(
      <>
        <LazyImpl ref={instance1} label="Not lazy" />
        <Suspense fallback={<Text text="Loading..." />}>
          <Lazy ref={instance2} label="Lazy" />
        </Suspense>
      </>,
      {
        unstable_isConcurrent: true,
      },
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Not lazy: 0', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('Not lazy: 0Lazy: 0');

    await Promise.resolve();

    expect(Scheduler).toFlushAndYield(['Lazy: 0']);
=======
    await waitForAll(['Not lazy: 0', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('Not lazy: 0Lazy: 0');

    await act(() => resolveFakeImport(LazyImpl));
    assertLog(['Lazy: 0']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Not lazy: 0Lazy: 0');

    // Should bailout due to shallow equal props and state
    instance1.current.setState({});
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Not lazy: 0Lazy: 0');

    // Should bailout due to shallow equal props and state
    instance2.current.setState({});
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Not lazy: 0Lazy: 0');
  });

  it('sets defaultProps for modern lifecycles', async () => {
    class C extends React.Component {
      static defaultProps = {text: 'A'};
      state = {};

      static getDerivedStateFromProps(props) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          `getDerivedStateFromProps: ${props.text}`,
        );
=======
        Scheduler.log(`getDerivedStateFromProps: ${props.text}`);
>>>>>>> remotes/upstream/main
        return null;
      }

      constructor(props) {
        super(props);
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`constructor: ${this.props.text}`);
      }

      componentDidMount() {
        Scheduler.unstable_yieldValue(`componentDidMount: ${this.props.text}`);
      }

      componentDidUpdate(prevProps) {
        Scheduler.unstable_yieldValue(
=======
        Scheduler.log(`constructor: ${this.props.text}`);
      }

      componentDidMount() {
        Scheduler.log(`componentDidMount: ${this.props.text}`);
      }

      componentDidUpdate(prevProps) {
        Scheduler.log(
>>>>>>> remotes/upstream/main
          `componentDidUpdate: ${prevProps.text} -> ${this.props.text}`,
        );
      }

      componentWillUnmount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          `componentWillUnmount: ${this.props.text}`,
        );
      }

      shouldComponentUpdate(nextProps) {
        Scheduler.unstable_yieldValue(
=======
        Scheduler.log(`componentWillUnmount: ${this.props.text}`);
      }

      shouldComponentUpdate(nextProps) {
        Scheduler.log(
>>>>>>> remotes/upstream/main
          `shouldComponentUpdate: ${this.props.text} -> ${nextProps.text}`,
        );
        return true;
      }

      getSnapshotBeforeUpdate(prevProps) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
=======
        Scheduler.log(
>>>>>>> remotes/upstream/main
          `getSnapshotBeforeUpdate: ${prevProps.text} -> ${this.props.text}`,
        );
        return null;
      }

      render() {
        return <Text text={this.props.text + this.props.num} />;
      }
    }

    const LazyClass = lazy(() => fakeImport(C));

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyClass num={1} />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('A1');

    await Promise.resolve();

    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll(['Loading...']);
    expect(root).not.toMatchRenderedOutput('A1');

    await act(() => resolveFakeImport(C));
    assertLog([
>>>>>>> remotes/upstream/main
      'constructor: A',
      'getDerivedStateFromProps: A',
      'A1',
      'componentDidMount: A',
    ]);

    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyClass num={2} />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'getDerivedStateFromProps: A',
      'shouldComponentUpdate: A -> A',
      'A2',
      'getSnapshotBeforeUpdate: A -> A',
      'componentDidUpdate: A -> A',
    ]);
    expect(root).toMatchRenderedOutput('A2');

    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyClass num={3} />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'getDerivedStateFromProps: A',
      'shouldComponentUpdate: A -> A',
      'A3',
      'getSnapshotBeforeUpdate: A -> A',
      'componentDidUpdate: A -> A',
    ]);
    expect(root).toMatchRenderedOutput('A3');
  });

  it('sets defaultProps for legacy lifecycles', async () => {
    class C extends React.Component {
      static defaultProps = {text: 'A'};
      state = {};

      UNSAFE_componentWillMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          `UNSAFE_componentWillMount: ${this.props.text}`,
        );
      }

      UNSAFE_componentWillUpdate(nextProps) {
        Scheduler.unstable_yieldValue(
=======
        Scheduler.log(`UNSAFE_componentWillMount: ${this.props.text}`);
      }

      UNSAFE_componentWillUpdate(nextProps) {
        Scheduler.log(
>>>>>>> remotes/upstream/main
          `UNSAFE_componentWillUpdate: ${this.props.text} -> ${nextProps.text}`,
        );
      }

      UNSAFE_componentWillReceiveProps(nextProps) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
=======
        Scheduler.log(
>>>>>>> remotes/upstream/main
          `UNSAFE_componentWillReceiveProps: ${this.props.text} -> ${nextProps.text}`,
        );
      }

      render() {
        return <Text text={this.props.text + this.props.num} />;
      }
    }

    const LazyClass = lazy(() => fakeImport(C));

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyClass num={1} />
      </Suspense>,
    );

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Loading...']);
    expect(Scheduler).toFlushAndYield([]);
    expect(root).toMatchRenderedOutput('Loading...');

    await Promise.resolve();

    expect(Scheduler).toHaveYielded([]);
=======
    assertLog(['Loading...']);
    await waitForAll([]);
    expect(root).toMatchRenderedOutput('Loading...');

    await resolveFakeImport(C);

    assertLog([]);
>>>>>>> remotes/upstream/main

    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyClass num={2} />
      </Suspense>,
    );

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['UNSAFE_componentWillMount: A', 'A2']);
=======
    assertLog(['UNSAFE_componentWillMount: A', 'A2']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('A2');

    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyClass num={3} />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'UNSAFE_componentWillReceiveProps: A -> A',
      'UNSAFE_componentWillUpdate: A -> A',
      'A3',
    ]);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('A3');
  });

  it('resolves defaultProps on the outer wrapper but warns', async () => {
    function T(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(props.inner + ' ' + props.outer);
=======
      Scheduler.log(props.inner + ' ' + props.outer);
>>>>>>> remotes/upstream/main
      return props.inner + ' ' + props.outer;
    }
    T.defaultProps = {inner: 'Hi'};
    const LazyText = lazy(() => fakeImport(T));
    expect(() => {
      LazyText.defaultProps = {outer: 'Bye'};
    }).toErrorDev(
      'React.lazy(...): It is not supported to assign `defaultProps` to ' +
        'a lazy component import. Either specify them where the component ' +
        'is defined, or create a wrapping component around it.',
      {withoutStack: true},
    );

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hi Bye');

    await Promise.resolve();
    expect(Scheduler).toFlushAndYield(['Hi Bye']);
=======
    await waitForAll(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hi Bye');

    await expect(async () => {
      await act(() => resolveFakeImport(T));
      assertLog(['Hi Bye']);
    }).toErrorDev(
      'Warning: T: Support for defaultProps ' +
        'will be removed from function components in a future major ' +
        'release. Use JavaScript default parameters instead.',
    );

>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Hi Bye');

    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText outer="World" />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Hi World']);
=======
    await waitForAll(['Hi World']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Hi World');

    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText inner="Friends" />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Friends Bye']);
=======
    await waitForAll(['Friends Bye']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Friends Bye');
  });

  it('throws with a useful error when wrapping invalid type with lazy()', async () => {
    const BadLazy = lazy(() => fakeImport(42));

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <BadLazy />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);

    await Promise.resolve();
=======
    await waitForAll(['Loading...']);

    await resolveFakeImport(42);
>>>>>>> remotes/upstream/main
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <BadLazy />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndThrow(
=======
    await waitForThrow(
>>>>>>> remotes/upstream/main
      'Element type is invalid. Received a promise that resolves to: 42. ' +
        'Lazy element type must resolve to a class or function.',
    );
  });

  it('throws with a useful error when wrapping lazy() multiple times', async () => {
    const Lazy1 = lazy(() => fakeImport(Text));
    const Lazy2 = lazy(() => fakeImport(Lazy1));

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <Lazy2 text="Hello" />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hello');

    await Promise.resolve();
=======
    await waitForAll(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Hello');

    await resolveFakeImport(Lazy1);
>>>>>>> remotes/upstream/main
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <Lazy2 text="Hello" />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndThrow(
=======
    await waitForThrow(
>>>>>>> remotes/upstream/main
      'Element type is invalid. Received a promise that resolves to: [object Object]. ' +
        'Lazy element type must resolve to a class or function.' +
        (__DEV__
          ? ' Did you wrap a component in React.lazy() more than once?'
          : ''),
    );
  });

  it('warns about defining propTypes on the outer wrapper', () => {
    const LazyText = lazy(() => fakeImport(Text));
    expect(() => {
      LazyText.propTypes = {hello: () => {}};
    }).toErrorDev(
      'React.lazy(...): It is not supported to assign `propTypes` to ' +
        'a lazy component import. Either specify them where the component ' +
        'is defined, or create a wrapping component around it.',
      {withoutStack: true},
    );
  });

<<<<<<< HEAD
  async function verifyInnerPropTypesAreChecked(Add) {
=======
  async function verifyInnerPropTypesAreChecked(
    Add,
    shouldWarnAboutFunctionDefaultProps,
    shouldWarnAboutMemoDefaultProps,
  ) {
>>>>>>> remotes/upstream/main
    const LazyAdd = lazy(() => fakeImport(Add));
    expect(() => {
      LazyAdd.propTypes = {};
    }).toErrorDev(
      'React.lazy(...): It is not supported to assign `propTypes` to ' +
        'a lazy component import. Either specify them where the component ' +
        'is defined, or create a wrapping component around it.',
      {withoutStack: true},
    );

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyAdd inner="2" outer="2" />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('22');

    // Mount
    await Promise.resolve();
    expect(() => {
      Scheduler.unstable_flushAll();
    }).toErrorDev([
      'Invalid prop `inner` of type `string` supplied to `Add`, expected `number`.',
    ]);
    expect(root).toMatchRenderedOutput('22');

    // Update
    expect(() => {
=======
    await waitForAll(['Loading...']);

    expect(root).not.toMatchRenderedOutput('22');

    // Mount
    await expect(async () => {
      await act(() => resolveFakeImport(Add));
    }).toErrorDev(
      shouldWarnAboutFunctionDefaultProps
        ? [
            'Add: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
            'Invalid prop `inner` of type `string` supplied to `Add`, expected `number`.',
          ]
        : shouldWarnAboutMemoDefaultProps
        ? [
            'Add: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
            'Invalid prop `inner` of type `string` supplied to `Add`, expected `number`.',
          ]
        : [
            'Invalid prop `inner` of type `string` supplied to `Add`, expected `number`.',
          ],
    );
    expect(root).toMatchRenderedOutput('22');

    // Update
    await expect(async () => {
>>>>>>> remotes/upstream/main
      root.update(
        <Suspense fallback={<Text text="Loading..." />}>
          <LazyAdd inner={false} outer={false} />
        </Suspense>,
      );
<<<<<<< HEAD
      expect(Scheduler).toFlushWithoutYielding();
=======
      await waitForAll([]);
>>>>>>> remotes/upstream/main
    }).toErrorDev(
      'Invalid prop `inner` of type `boolean` supplied to `Add`, expected `number`.',
    );
    expect(root).toMatchRenderedOutput('0');
  }

  // Note: all "with defaultProps" tests below also verify defaultProps works as expected.
  // If we ever delete or move propTypes-related tests, make sure not to delete these.
  it('respects propTypes on function component with defaultProps', async () => {
    function Add(props) {
      expect(props.innerWithDefault).toBe(42);
      return props.inner + props.outer;
    }
    Add.propTypes = {
      inner: PropTypes.number.isRequired,
      innerWithDefault: PropTypes.number.isRequired,
    };
    Add.defaultProps = {
      innerWithDefault: 42,
    };
<<<<<<< HEAD
    await verifyInnerPropTypesAreChecked(Add);
=======
    await verifyInnerPropTypesAreChecked(Add, true);
>>>>>>> remotes/upstream/main
  });

  it('respects propTypes on function component without defaultProps', async () => {
    function Add(props) {
      return props.inner + props.outer;
    }
    Add.propTypes = {
      inner: PropTypes.number.isRequired,
    };
    await verifyInnerPropTypesAreChecked(Add);
  });

  it('respects propTypes on class component with defaultProps', async () => {
    class Add extends React.Component {
      render() {
        expect(this.props.innerWithDefault).toBe(42);
        return this.props.inner + this.props.outer;
      }
    }
    Add.propTypes = {
      inner: PropTypes.number.isRequired,
      innerWithDefault: PropTypes.number.isRequired,
    };
    Add.defaultProps = {
      innerWithDefault: 42,
    };
    await verifyInnerPropTypesAreChecked(Add);
  });

  it('respects propTypes on class component without defaultProps', async () => {
    class Add extends React.Component {
      render() {
        return this.props.inner + this.props.outer;
      }
    }
    Add.propTypes = {
      inner: PropTypes.number.isRequired,
    };
    await verifyInnerPropTypesAreChecked(Add);
  });

  it('respects propTypes on forwardRef component with defaultProps', async () => {
    const Add = React.forwardRef((props, ref) => {
      expect(props.innerWithDefault).toBe(42);
      return props.inner + props.outer;
    });
    Add.displayName = 'Add';
    Add.propTypes = {
      inner: PropTypes.number.isRequired,
      innerWithDefault: PropTypes.number.isRequired,
    };
    Add.defaultProps = {
      innerWithDefault: 42,
    };
    await verifyInnerPropTypesAreChecked(Add);
  });

  it('respects propTypes on forwardRef component without defaultProps', async () => {
    const Add = React.forwardRef((props, ref) => {
      return props.inner + props.outer;
    });
    Add.displayName = 'Add';
    Add.propTypes = {
      inner: PropTypes.number.isRequired,
    };
    await verifyInnerPropTypesAreChecked(Add);
  });

  it('respects propTypes on outer memo component with defaultProps', async () => {
    let Add = props => {
      expect(props.innerWithDefault).toBe(42);
      return props.inner + props.outer;
    };
    Add = React.memo(Add);
    Add.propTypes = {
      inner: PropTypes.number.isRequired,
      innerWithDefault: PropTypes.number.isRequired,
    };
    Add.defaultProps = {
      innerWithDefault: 42,
    };
<<<<<<< HEAD
    await verifyInnerPropTypesAreChecked(Add);
=======
    await verifyInnerPropTypesAreChecked(Add, false, true);
>>>>>>> remotes/upstream/main
  });

  it('respects propTypes on outer memo component without defaultProps', async () => {
    let Add = props => {
      return props.inner + props.outer;
    };
    Add = React.memo(Add);
    Add.propTypes = {
      inner: PropTypes.number.isRequired,
    };
    await verifyInnerPropTypesAreChecked(Add);
  });

  it('respects propTypes on inner memo component with defaultProps', async () => {
    const Add = props => {
      expect(props.innerWithDefault).toBe(42);
      return props.inner + props.outer;
    };
    Add.displayName = 'Add';
    Add.propTypes = {
      inner: PropTypes.number.isRequired,
      innerWithDefault: PropTypes.number.isRequired,
    };
    Add.defaultProps = {
      innerWithDefault: 42,
    };
<<<<<<< HEAD
    await verifyInnerPropTypesAreChecked(React.memo(Add));
=======
    await verifyInnerPropTypesAreChecked(React.memo(Add), true);
>>>>>>> remotes/upstream/main
  });

  it('respects propTypes on inner memo component without defaultProps', async () => {
    const Add = props => {
      return props.inner + props.outer;
    };
    Add.displayName = 'Add';
    Add.propTypes = {
      inner: PropTypes.number.isRequired,
    };
    await verifyInnerPropTypesAreChecked(React.memo(Add));
  });

  it('uses outer resolved props for validating propTypes on memo', async () => {
    let T = props => {
      return <Text text={props.text} />;
    };
    T.defaultProps = {
      text: 'Inner default text',
    };
    T = React.memo(T);
    T.propTypes = {
      // Should not be satisfied by the *inner* defaultProps.
      text: PropTypes.string.isRequired,
    };
    const LazyText = lazy(() => fakeImport(T));
    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Inner default text');

    // Mount
    await Promise.resolve();
    expect(() => {
      expect(Scheduler).toFlushAndYield(['Inner default text']);
    }).toErrorDev(
      'The prop `text` is marked as required in `T`, but its value is `undefined`',
    );
    expect(root).toMatchRenderedOutput('Inner default text');

    // Update
    expect(() => {
=======
    await waitForAll(['Loading...']);
    expect(root).not.toMatchRenderedOutput('Inner default text');

    // Mount
    await expect(async () => {
      await act(() => resolveFakeImport(T));
      assertLog(['Inner default text']);
    }).toErrorDev([
      'T: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
      'The prop `text` is marked as required in `T`, but its value is `undefined`',
    ]);
    expect(root).toMatchRenderedOutput('Inner default text');

    // Update
    await expect(async () => {
>>>>>>> remotes/upstream/main
      root.update(
        <Suspense fallback={<Text text="Loading..." />}>
          <LazyText text={null} />
        </Suspense>,
      );
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([null]);
=======
      await waitForAll([null]);
>>>>>>> remotes/upstream/main
    }).toErrorDev(
      'The prop `text` is marked as required in `T`, but its value is `null`',
    );
    expect(root).toMatchRenderedOutput(null);
  });

  it('includes lazy-loaded component in warning stack', async () => {
<<<<<<< HEAD
    const LazyFoo = lazy(() => {
      Scheduler.unstable_yieldValue('Started loading');
      const Foo = props => <div>{[<Text text="A" />, <Text text="B" />]}</div>;
=======
    const Foo = props => <div>{[<Text text="A" />, <Text text="B" />]}</div>;
    const LazyFoo = lazy(() => {
      Scheduler.log('Started loading');
>>>>>>> remotes/upstream/main
      return fakeImport(Foo);
    });

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyFoo />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Started loading', 'Loading...']);
    expect(root).not.toMatchRenderedOutput(<div>AB</div>);

    await Promise.resolve();

    expect(() => {
      expect(Scheduler).toFlushAndYield(['A', 'B']);
=======
    await waitForAll(['Started loading', 'Loading...']);
    expect(root).not.toMatchRenderedOutput(<div>AB</div>);

    await expect(async () => {
      await act(() => resolveFakeImport(Foo));
      assertLog(['A', 'B']);
>>>>>>> remotes/upstream/main
    }).toErrorDev('    in Text (at **)\n' + '    in Foo (at **)');
    expect(root).toMatchRenderedOutput(<div>AB</div>);
  });

  it('supports class and forwardRef components', async () => {
<<<<<<< HEAD
    const LazyClass = lazy(() => {
      class Foo extends React.Component {
        render() {
          return <Text text="Foo" />;
        }
      }
      return fakeImport(Foo);
    });

    const LazyForwardRef = lazy(() => {
      class Bar extends React.Component {
        render() {
          return <Text text="Bar" />;
        }
      }
      return fakeImport(
        React.forwardRef((props, ref) => {
          Scheduler.unstable_yieldValue('forwardRef');
          return <Bar ref={ref} />;
        }),
      );
=======
    class Foo extends React.Component {
      render() {
        return <Text text="Foo" />;
      }
    }
    const LazyClass = lazy(() => {
      return fakeImport(Foo);
    });

    class Bar extends React.Component {
      render() {
        return <Text text="Bar" />;
      }
    }
    const ForwardRefBar = React.forwardRef((props, ref) => {
      Scheduler.log('forwardRef');
      return <Bar ref={ref} />;
    });

    const LazyForwardRef = lazy(() => {
      return fakeImport(ForwardRefBar);
>>>>>>> remotes/upstream/main
    });

    const ref = React.createRef();
    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyClass />
        <LazyForwardRef ref={ref} />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('FooBar');
    expect(ref.current).toBe(null);

    await Promise.resolve();

    expect(Scheduler).toFlushAndYield(['Foo', 'forwardRef', 'Bar']);
=======
    await waitForAll(['Loading...']);
    expect(root).not.toMatchRenderedOutput('FooBar');
    expect(ref.current).toBe(null);

    await act(() => resolveFakeImport(Foo));
    assertLog(['Foo']);

    await act(() => resolveFakeImport(ForwardRefBar));
    assertLog(['Foo', 'forwardRef', 'Bar']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('FooBar');
    expect(ref.current).not.toBe(null);
  });

  // Regression test for #14310
  it('supports defaultProps defined on the memo() return value', async () => {
    const Add = React.memo(props => {
      return props.inner + props.outer;
    });
    Add.defaultProps = {
      inner: 2,
    };
    const LazyAdd = lazy(() => fakeImport(Add));
    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyAdd outer={2} />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('4');

    // Mount
    await Promise.resolve();
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll(['Loading...']);
    expect(root).not.toMatchRenderedOutput('4');

    // Mount
    await expect(async () => {
      await act(() => resolveFakeImport(Add));
    }).toErrorDev(
      'Unknown: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
    );
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('4');

    // Update (shallowly equal)
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyAdd outer={2} />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('4');

    // Update
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyAdd outer={3} />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('5');

    // Update (shallowly equal)
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyAdd outer={3} />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('5');

    // Update (explicit props)
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyAdd outer={1} inner={1} />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('2');

    // Update (explicit props, shallowly equal)
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyAdd outer={1} inner={1} />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('2');

    // Update
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyAdd outer={1} />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('3');
  });

  it('merges defaultProps in the correct order', async () => {
    let Add = React.memo(props => {
      return props.inner + props.outer;
    });
    Add.defaultProps = {
      inner: 100,
    };
    Add = React.memo(Add);
    Add.defaultProps = {
      inner: 2,
      outer: 0,
    };
    const LazyAdd = lazy(() => fakeImport(Add));
    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyAdd outer={2} />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    expect(root).not.toMatchRenderedOutput('4');

    // Mount
    await Promise.resolve();
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll(['Loading...']);
    expect(root).not.toMatchRenderedOutput('4');

    // Mount
    await expect(async () => {
      await act(() => resolveFakeImport(Add));
    }).toErrorDev([
      'Memo: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
      'Unknown: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.',
    ]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('4');

    // Update
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyAdd outer={3} />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('5');

    // Update
    root.update(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyAdd />
      </Suspense>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('2');
  });

  it('warns about ref on functions for lazy-loaded components', async () => {
<<<<<<< HEAD
    const LazyFoo = lazy(() => {
      const Foo = props => <div />;
=======
    const Foo = props => <div />;
    const LazyFoo = lazy(() => {
>>>>>>> remotes/upstream/main
      return fakeImport(Foo);
    });

    const ref = React.createRef();
    ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyFoo ref={ref} />
      </Suspense>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);
    await Promise.resolve();
    expect(() => {
      expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll(['Loading...']);
    await resolveFakeImport(Foo);
    await expect(async () => {
      await waitForAll([]);
>>>>>>> remotes/upstream/main
    }).toErrorDev('Function components cannot be given refs');
  });

  it('should error with a component stack naming the resolved component', async () => {
    let componentStackMessage;

<<<<<<< HEAD
    const LazyText = lazy(() =>
      fakeImport(function ResolvedText() {
        throw new Error('oh no');
      }),
    );
=======
    function ResolvedText() {
      throw new Error('oh no');
    }
    const LazyText = lazy(() => fakeImport(ResolvedText));
>>>>>>> remotes/upstream/main

    class ErrorBoundary extends React.Component {
      state = {error: null};

      componentDidCatch(error, errMessage) {
        componentStackMessage = normalizeCodeLocInfo(errMessage.componentStack);
        this.setState({
          error,
        });
      }

      render() {
        return this.state.error ? null : this.props.children;
      }
    }

    ReactTestRenderer.create(
      <ErrorBoundary>
        <Suspense fallback={<Text text="Loading..." />}>
          <LazyText text="Hi" />
        </Suspense>
      </ErrorBoundary>,
      {unstable_isConcurrent: true},
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Loading...']);

    try {
      await Promise.resolve();
    } catch (e) {}

    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll(['Loading...']);

    await act(() => resolveFakeImport(ResolvedText));
    assertLog([]);
>>>>>>> remotes/upstream/main

    expect(componentStackMessage).toContain('in ResolvedText');
  });

  it('should error with a component stack containing Lazy if unresolved', () => {
    let componentStackMessage;

    const LazyText = lazy(() => ({
      then(resolve, reject) {
        reject(new Error('oh no'));
      },
    }));

    class ErrorBoundary extends React.Component {
      state = {error: null};

      componentDidCatch(error, errMessage) {
        componentStackMessage = normalizeCodeLocInfo(errMessage.componentStack);
        this.setState({
          error,
        });
      }

      render() {
        return this.state.error ? null : this.props.children;
      }
    }

    ReactTestRenderer.create(
      <ErrorBoundary>
        <Suspense fallback={<Text text="Loading..." />}>
          <LazyText text="Hi" />
        </Suspense>
      </ErrorBoundary>,
    );

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    expect(componentStackMessage).toContain('in Lazy');
  });

  it('mount and reorder lazy types', async () => {
    class Child extends React.Component {
      componentWillUnmount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Did unmount: ' + this.props.label);
      }
      componentDidMount() {
        Scheduler.unstable_yieldValue('Did mount: ' + this.props.label);
      }
      componentDidUpdate() {
        Scheduler.unstable_yieldValue('Did update: ' + this.props.label);
=======
        Scheduler.log('Did unmount: ' + this.props.label);
      }
      componentDidMount() {
        Scheduler.log('Did mount: ' + this.props.label);
      }
      componentDidUpdate() {
        Scheduler.log('Did update: ' + this.props.label);
>>>>>>> remotes/upstream/main
      }
      render() {
        return <Text text={this.props.label} />;
      }
    }

    function ChildA({lowerCase}) {
      return <Child label={lowerCase ? 'a' : 'A'} />;
    }

    function ChildB({lowerCase}) {
      return <Child label={lowerCase ? 'b' : 'B'} />;
    }

    const LazyChildA = lazy(() => {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Init A');
      return fakeImport(ChildA);
    });
    const LazyChildB = lazy(() => {
      Scheduler.unstable_yieldValue('Init B');
      return fakeImport(ChildB);
    });
    const LazyChildA2 = lazy(() => {
      Scheduler.unstable_yieldValue('Init A2');
=======
      Scheduler.log('Init A');
      return fakeImport(ChildA);
    });
    const LazyChildB = lazy(() => {
      Scheduler.log('Init B');
      return fakeImport(ChildB);
    });
    const LazyChildA2 = lazy(() => {
      Scheduler.log('Init A2');
>>>>>>> remotes/upstream/main
      return fakeImport(ChildA);
    });
    let resolveB2;
    const LazyChildB2 = lazy(() => {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Init B2');
=======
      Scheduler.log('Init B2');
>>>>>>> remotes/upstream/main
      return new Promise(r => {
        resolveB2 = r;
      });
    });

    function Parent({swap}) {
      return (
        <Suspense fallback={<Text text="Outer..." />}>
          <Suspense fallback={<Text text="Loading..." />}>
            {swap
              ? [
                  <LazyChildB2 key="B" lowerCase={true} />,
                  <LazyChildA2 key="A" lowerCase={true} />,
                ]
              : [<LazyChildA key="A" />, <LazyChildB key="B" />]}
          </Suspense>
        </Suspense>
      );
    }

    const root = ReactTestRenderer.create(<Parent swap={false} />, {
      unstable_isConcurrent: true,
    });

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Init A', 'Init B', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('AB');

    await LazyChildA;
    await LazyChildB;

    expect(Scheduler).toFlushAndYield([
      'A',
      'B',
      'Did mount: A',
      'Did mount: B',
    ]);
=======
    await waitForAll(['Init A', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('AB');

    await act(() => resolveFakeImport(ChildA));
    assertLog(['A', 'Init B']);

    await act(() => resolveFakeImport(ChildB));
    assertLog(['A', 'B', 'Did mount: A', 'Did mount: B']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('AB');

    // Swap the position of A and B
    root.update(<Parent swap={true} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Init B2', 'Loading...']);
    jest.runAllTimers();

    expect(Scheduler).toHaveYielded(['Did unmount: A', 'Did unmount: B']);

    // The suspense boundary should've triggered now.
    expect(root).toMatchRenderedOutput('Loading...');
    await resolveB2({default: ChildB});

    // We need to flush to trigger the second one to load.
    expect(Scheduler).toFlushAndYield(['Init A2']);
    await LazyChildA2;

    expect(Scheduler).toFlushAndYield([
      'b',
      'a',
      'Did mount: b',
      'Did mount: a',
    ]);
=======
    await waitForAll([
      'Init B2',
      'Loading...',
      'Did unmount: A',
      'Did unmount: B',
    ]);

    // The suspense boundary should've triggered now.
    expect(root).toMatchRenderedOutput('Loading...');
    await act(() => resolveB2({default: ChildB}));

    // We need to flush to trigger the second one to load.
    assertLog(['Init A2', 'b', 'a', 'Did mount: b', 'Did mount: a']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('ba');
  });

  it('mount and reorder lazy types (legacy mode)', async () => {
    class Child extends React.Component {
      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Did mount: ' + this.props.label);
      }
      componentDidUpdate() {
        Scheduler.unstable_yieldValue('Did update: ' + this.props.label);
=======
        Scheduler.log('Did mount: ' + this.props.label);
      }
      componentDidUpdate() {
        Scheduler.log('Did update: ' + this.props.label);
>>>>>>> remotes/upstream/main
      }
      render() {
        return <Text text={this.props.label} />;
      }
    }

    function ChildA({lowerCase}) {
      return <Child label={lowerCase ? 'a' : 'A'} />;
    }

    function ChildB({lowerCase}) {
      return <Child label={lowerCase ? 'b' : 'B'} />;
    }

    const LazyChildA = lazy(() => {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Init A');
      return fakeImport(ChildA);
    });
    const LazyChildB = lazy(() => {
      Scheduler.unstable_yieldValue('Init B');
      return fakeImport(ChildB);
    });
    const LazyChildA2 = lazy(() => {
      Scheduler.unstable_yieldValue('Init A2');
      return fakeImport(ChildA);
    });
    const LazyChildB2 = lazy(() => {
      Scheduler.unstable_yieldValue('Init B2');
=======
      Scheduler.log('Init A');
      return fakeImport(ChildA);
    });
    const LazyChildB = lazy(() => {
      Scheduler.log('Init B');
      return fakeImport(ChildB);
    });
    const LazyChildA2 = lazy(() => {
      Scheduler.log('Init A2');
      return fakeImport(ChildA);
    });
    const LazyChildB2 = lazy(() => {
      Scheduler.log('Init B2');
>>>>>>> remotes/upstream/main
      return fakeImport(ChildB);
    });

    function Parent({swap}) {
      return (
        <Suspense fallback={<Text text="Outer..." />}>
          <Suspense fallback={<Text text="Loading..." />}>
            {swap
              ? [
                  <LazyChildB2 key="B" lowerCase={true} />,
                  <LazyChildA2 key="A" lowerCase={true} />,
                ]
              : [<LazyChildA key="A" />, <LazyChildB key="B" />]}
          </Suspense>
        </Suspense>
      );
    }

    const root = ReactTestRenderer.create(<Parent swap={false} />, {
      unstable_isConcurrent: false,
    });

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Init A', 'Init B', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('AB');

    await LazyChildA;
    await LazyChildB;

    expect(Scheduler).toFlushAndYield([
      'A',
      'B',
      'Did mount: A',
      'Did mount: B',
    ]);
=======
    assertLog(['Init A', 'Init B', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('AB');

    await resolveFakeImport(ChildA);
    await resolveFakeImport(ChildB);

    await waitForAll(['A', 'B', 'Did mount: A', 'Did mount: B']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('AB');

    // Swap the position of A and B
    root.update(<Parent swap={true} />);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Init B2', 'Loading...']);
    await LazyChildB2;
    // We need to flush to trigger the second one to load.
    expect(Scheduler).toFlushAndYield(['Init A2']);
    await LazyChildA2;

    expect(Scheduler).toFlushAndYield([
      'b',
      'a',
      'Did update: b',
      'Did update: a',
    ]);
=======
    assertLog(['Init B2', 'Loading...']);
    await waitForAll(['Init A2', 'b', 'a', 'Did update: b', 'Did update: a']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('ba');
  });

  it('mount and reorder lazy elements', async () => {
    class Child extends React.Component {
      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Did mount: ' + this.props.label);
      }
      componentDidUpdate() {
        Scheduler.unstable_yieldValue('Did update: ' + this.props.label);
=======
        Scheduler.log('Did mount: ' + this.props.label);
      }
      componentDidUpdate() {
        Scheduler.log('Did update: ' + this.props.label);
>>>>>>> remotes/upstream/main
      }
      render() {
        return <Text text={this.props.label} />;
      }
    }

<<<<<<< HEAD
    const lazyChildA = lazy(() => {
      Scheduler.unstable_yieldValue('Init A');
      return fakeImport(<Child key="A" label="A" />);
    });
    const lazyChildB = lazy(() => {
      Scheduler.unstable_yieldValue('Init B');
      return fakeImport(<Child key="B" label="B" />);
    });
    const lazyChildA2 = lazy(() => {
      Scheduler.unstable_yieldValue('Init A2');
      return fakeImport(<Child key="A" label="a" />);
    });
    const lazyChildB2 = lazy(() => {
      Scheduler.unstable_yieldValue('Init B2');
      return fakeImport(<Child key="B" label="b" />);
=======
    const ChildA = <Child key="A" label="A" />;
    const lazyChildA = lazy(() => {
      Scheduler.log('Init A');
      return fakeImport(ChildA);
    });
    const ChildB = <Child key="B" label="B" />;
    const lazyChildB = lazy(() => {
      Scheduler.log('Init B');
      return fakeImport(ChildB);
    });
    const ChildA2 = <Child key="A" label="a" />;
    const lazyChildA2 = lazy(() => {
      Scheduler.log('Init A2');
      return fakeImport(ChildA2);
    });
    const ChildB2 = <Child key="B" label="b" />;
    const lazyChildB2 = lazy(() => {
      Scheduler.log('Init B2');
      return fakeImport(ChildB2);
>>>>>>> remotes/upstream/main
    });

    function Parent({swap}) {
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          {swap ? [lazyChildB2, lazyChildA2] : [lazyChildA, lazyChildB]}
        </Suspense>
      );
    }

    const root = ReactTestRenderer.create(<Parent swap={false} />, {
      unstable_isConcurrent: true,
    });

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Init A', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('AB');

    await lazyChildA;
    // We need to flush to trigger the B to load.
    expect(Scheduler).toFlushAndYield(['Init B']);
    await lazyChildB;

    expect(Scheduler).toFlushAndYield([
      'A',
      'B',
      'Did mount: A',
      'Did mount: B',
    ]);
    expect(root).toMatchRenderedOutput('AB');

    // Swap the position of A and B
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        root.update(<Parent swap={true} />);
      });
    } else {
      root.update(<Parent swap={true} />);
    }
    expect(Scheduler).toFlushAndYield(['Init B2', 'Loading...']);
    await lazyChildB2;
    // We need to flush to trigger the second one to load.
    expect(Scheduler).toFlushAndYield(['Init A2', 'Loading...']);
    await lazyChildA2;

    expect(Scheduler).toFlushAndYield([
      'b',
      'a',
      'Did update: b',
      'Did update: a',
    ]);
=======
    await waitForAll(['Init A', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('AB');

    await act(() => resolveFakeImport(ChildA));
    // We need to flush to trigger the B to load.
    await assertLog(['Init B']);
    await act(() => resolveFakeImport(ChildB));
    assertLog(['A', 'B', 'Did mount: A', 'Did mount: B']);
    expect(root).toMatchRenderedOutput('AB');

    // Swap the position of A and B
    React.startTransition(() => {
      root.update(<Parent swap={true} />);
    });
    await waitForAll(['Init B2', 'Loading...']);
    await act(() => resolveFakeImport(ChildB2));
    // We need to flush to trigger the second one to load.
    assertLog(['Init A2', 'Loading...']);
    await act(() => resolveFakeImport(ChildA2));
    assertLog(['b', 'a', 'Did update: b', 'Did update: a']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('ba');
  });

  it('mount and reorder lazy elements (legacy mode)', async () => {
    class Child extends React.Component {
      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Did mount: ' + this.props.label);
      }
      componentDidUpdate() {
        Scheduler.unstable_yieldValue('Did update: ' + this.props.label);
=======
        Scheduler.log('Did mount: ' + this.props.label);
      }
      componentDidUpdate() {
        Scheduler.log('Did update: ' + this.props.label);
>>>>>>> remotes/upstream/main
      }
      render() {
        return <Text text={this.props.label} />;
      }
    }

<<<<<<< HEAD
    const lazyChildA = lazy(() => {
      Scheduler.unstable_yieldValue('Init A');
      return fakeImport(<Child key="A" label="A" />);
    });
    const lazyChildB = lazy(() => {
      Scheduler.unstable_yieldValue('Init B');
      return fakeImport(<Child key="B" label="B" />);
    });
    const lazyChildA2 = lazy(() => {
      Scheduler.unstable_yieldValue('Init A2');
      return fakeImport(<Child key="A" label="a" />);
    });
    const lazyChildB2 = lazy(() => {
      Scheduler.unstable_yieldValue('Init B2');
      return fakeImport(<Child key="B" label="b" />);
=======
    const ChildA = <Child key="A" label="A" />;
    const lazyChildA = lazy(() => {
      Scheduler.log('Init A');
      return fakeImport(ChildA);
    });
    const ChildB = <Child key="B" label="B" />;
    const lazyChildB = lazy(() => {
      Scheduler.log('Init B');
      return fakeImport(ChildB);
    });
    const ChildA2 = <Child key="A" label="a" />;
    const lazyChildA2 = lazy(() => {
      Scheduler.log('Init A2');
      return fakeImport(ChildA2);
    });
    const ChildB2 = <Child key="B" label="b" />;
    const lazyChildB2 = lazy(() => {
      Scheduler.log('Init B2');
      return fakeImport(ChildB2);
>>>>>>> remotes/upstream/main
    });

    function Parent({swap}) {
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          {swap ? [lazyChildB2, lazyChildA2] : [lazyChildA, lazyChildB]}
        </Suspense>
      );
    }

    const root = ReactTestRenderer.create(<Parent swap={false} />, {
      unstable_isConcurrent: false,
    });

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Init A', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('AB');

    await lazyChildA;
    // We need to flush to trigger the B to load.
    expect(Scheduler).toFlushAndYield(['Init B']);
    await lazyChildB;

    expect(Scheduler).toFlushAndYield([
      'A',
      'B',
      'Did mount: A',
      'Did mount: B',
    ]);
=======
    assertLog(['Init A', 'Loading...']);
    expect(root).not.toMatchRenderedOutput('AB');

    await resolveFakeImport(ChildA);
    // We need to flush to trigger the B to load.
    await waitForAll(['Init B']);
    await resolveFakeImport(ChildB);

    await waitForAll(['A', 'B', 'Did mount: A', 'Did mount: B']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('AB');

    // Swap the position of A and B
    root.update(<Parent swap={true} />);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Init B2', 'Loading...']);
    await lazyChildB2;
    // We need to flush to trigger the second one to load.
    expect(Scheduler).toFlushAndYield(['Init A2']);
    await lazyChildA2;

    expect(Scheduler).toFlushAndYield([
      'b',
      'a',
      'Did update: b',
      'Did update: a',
    ]);
=======
    assertLog(['Init B2', 'Loading...']);
    await resolveFakeImport(ChildB2);
    // We need to flush to trigger the second one to load.
    await waitForAll(['Init A2']);
    await resolveFakeImport(ChildA2);

    await waitForAll(['b', 'a', 'Did update: b', 'Did update: a']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('ba');
  });
});
