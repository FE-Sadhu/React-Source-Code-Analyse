let React;
let ReactTestRenderer;
let ReactFeatureFlags;
let Scheduler;
<<<<<<< HEAD
let ReactCache;
let Suspense;
let act;

let TextResource;
let textResourceShouldFail;
=======
let Suspense;
let act;
let textCache;

let assertLog;
let waitForPaint;
let waitForAll;
let waitFor;
>>>>>>> remotes/upstream/main

describe('ReactSuspense', () => {
  beforeEach(() => {
    jest.resetModules();
    ReactFeatureFlags = require('shared/ReactFeatureFlags');

    ReactFeatureFlags.replayFailedUnitOfWorkWithInvokeGuardedCallback = false;
    React = require('react');
    ReactTestRenderer = require('react-test-renderer');
<<<<<<< HEAD
    act = require('jest-react').act;
    Scheduler = require('scheduler');
    ReactCache = require('react-cache');

    Suspense = React.Suspense;

    TextResource = ReactCache.unstable_createResource(
      ([text, ms = 0]) => {
        let listeners = null;
        let status = 'pending';
        let value = null;
        return {
          then(resolve, reject) {
            switch (status) {
              case 'pending': {
                if (listeners === null) {
                  listeners = [{resolve, reject}];
                  setTimeout(() => {
                    if (textResourceShouldFail) {
                      Scheduler.unstable_yieldValue(
                        `Promise rejected [${text}]`,
                      );
                      status = 'rejected';
                      value = new Error('Failed to load: ' + text);
                      listeners.forEach(listener => listener.reject(value));
                    } else {
                      Scheduler.unstable_yieldValue(
                        `Promise resolved [${text}]`,
                      );
                      status = 'resolved';
                      value = text;
                      listeners.forEach(listener => listener.resolve(value));
                    }
                  }, ms);
                } else {
                  listeners.push({resolve, reject});
                }
                break;
              }
              case 'resolved': {
                resolve(value);
                break;
              }
              case 'rejected': {
                reject(value);
                break;
              }
            }
          },
        };
      },
      ([text, ms]) => text,
    );
    textResourceShouldFail = false;
  });

  function Text(props) {
    Scheduler.unstable_yieldValue(props.text);
    return props.text;
  }

  function AsyncText(props) {
    const text = props.text;
    try {
      TextResource.read([props.text, props.ms]);
      Scheduler.unstable_yieldValue(text);
      return text;
    } catch (promise) {
      if (typeof promise.then === 'function') {
        Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
      } else {
        Scheduler.unstable_yieldValue(`Error! [${text}]`);
      }
      throw promise;
    }
  }

  it('suspends rendering and continues later', () => {
    function Bar(props) {
      Scheduler.unstable_yieldValue('Bar');
=======
    act = require('internal-test-utils').act;
    Scheduler = require('scheduler');

    Suspense = React.Suspense;

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitForPaint = InternalTestUtils.waitForPaint;
    assertLog = InternalTestUtils.assertLog;
    waitFor = InternalTestUtils.waitFor;

    textCache = new Map();
  });

  function resolveText(text) {
    const record = textCache.get(text);
    if (record === undefined) {
      const newRecord = {
        status: 'resolved',
        value: text,
      };
      textCache.set(text, newRecord);
    } else if (record.status === 'pending') {
      const thenable = record.value;
      record.status = 'resolved';
      record.value = text;
      thenable.pings.forEach(t => t());
    }
  }

  function readText(text) {
    const record = textCache.get(text);
    if (record !== undefined) {
      switch (record.status) {
        case 'pending':
          Scheduler.log(`Suspend! [${text}]`);
          throw record.value;
        case 'rejected':
          throw record.value;
        case 'resolved':
          return record.value;
      }
    } else {
      Scheduler.log(`Suspend! [${text}]`);
      const thenable = {
        pings: [],
        then(resolve) {
          if (newRecord.status === 'pending') {
            thenable.pings.push(resolve);
          } else {
            Promise.resolve().then(() => resolve(newRecord.value));
          }
        },
      };

      const newRecord = {
        status: 'pending',
        value: thenable,
      };
      textCache.set(text, newRecord);

      throw thenable;
    }
  }

  function Text({text}) {
    Scheduler.log(text);
    return text;
  }

  function AsyncText({text}) {
    readText(text);
    Scheduler.log(text);
    return text;
  }

  it('suspends rendering and continues later', async () => {
    function Bar(props) {
      Scheduler.log('Bar');
>>>>>>> remotes/upstream/main
      return props.children;
    }

    function Foo({renderBar}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          {renderBar ? (
            <Bar>
              <AsyncText text="A" ms={100} />
              <Text text="B" />
            </Bar>
          ) : null}
        </Suspense>
      );
    }

    // Render an empty shell
    const root = ReactTestRenderer.create(<Foo />, {
      unstable_isConcurrent: true,
    });

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Foo']);
=======
    await waitForAll(['Foo']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(null);

    // Navigate the shell to now render the child content.
    // This should suspend.
<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        root.update(<Foo renderBar={true} />);
      });
    } else {
      root.update(<Foo renderBar={true} />);
    }

    expect(Scheduler).toFlushAndYield([
=======
    React.startTransition(() => {
      root.update(<Foo renderBar={true} />);
    });

    await waitForAll([
>>>>>>> remotes/upstream/main
      'Foo',
      'Bar',
      // A suspends
      'Suspend! [A]',
<<<<<<< HEAD
      // But we keep rendering the siblings
      'B',
=======
>>>>>>> remotes/upstream/main
      'Loading...',
    ]);
    expect(root).toMatchRenderedOutput(null);

<<<<<<< HEAD
    // Flush some of the time
    jest.advanceTimersByTime(50);
    // Still nothing...
    expect(Scheduler).toFlushWithoutYielding();
    expect(root).toMatchRenderedOutput(null);

    // Flush the promise completely
    jest.advanceTimersByTime(50);
    // Renders successfully
    expect(Scheduler).toHaveYielded(['Promise resolved [A]']);
    expect(Scheduler).toFlushAndYield(['Foo', 'Bar', 'A', 'B']);
    expect(root).toMatchRenderedOutput('AB');
  });

  it('suspends siblings and later recovers each independently', () => {
=======
    await waitForAll([]);
    expect(root).toMatchRenderedOutput(null);

    await resolveText('A');
    await waitForAll(['Foo', 'Bar', 'A', 'B']);
    expect(root).toMatchRenderedOutput('AB');
  });

  it('suspends siblings and later recovers each independently', async () => {
>>>>>>> remotes/upstream/main
    // Render two sibling Suspense components
    const root = ReactTestRenderer.create(
      <>
        <Suspense fallback={<Text text="Loading A..." />}>
          <AsyncText text="A" ms={5000} />
        </Suspense>
        <Suspense fallback={<Text text="Loading B..." />}>
          <AsyncText text="B" ms={6000} />
        </Suspense>
      </>,
      {
        unstable_isConcurrent: true,
      },
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'Suspend! [A]',
      'Loading A...',
      'Suspend! [B]',
      'Loading B...',
    ]);
    expect(root).toMatchRenderedOutput('Loading A...Loading B...');

<<<<<<< HEAD
    // Advance time by enough that the first Suspense's promise resolves and
    // switches back to the normal view. The second Suspense should still
    // show the placeholder
    jest.advanceTimersByTime(5000);
    // TODO: Should we throw if you forget to call toHaveYielded?
    expect(Scheduler).toHaveYielded(['Promise resolved [A]']);
    expect(Scheduler).toFlushAndYield(['A']);
    expect(root).toMatchRenderedOutput('ALoading B...');

    // Advance time by enough that the second Suspense's promise resolves
    // and switches back to the normal view
    jest.advanceTimersByTime(1000);
    expect(Scheduler).toHaveYielded(['Promise resolved [B]']);
    expect(Scheduler).toFlushAndYield(['B']);
    expect(root).toMatchRenderedOutput('AB');
  });

  it('interrupts current render if promise resolves before current render phase', () => {
=======
    // Resolve first Suspense's promise and switch back to the normal view. The
    // second Suspense should still show the placeholder
    await act(() => resolveText('A'));
    assertLog(['A']);
    expect(root).toMatchRenderedOutput('ALoading B...');

    // Resolve the second Suspense's promise resolves and switche back to the
    // normal view
    await act(() => resolveText('B'));
    assertLog(['B']);
    expect(root).toMatchRenderedOutput('AB');
  });

  it('interrupts current render if promise resolves before current render phase', async () => {
>>>>>>> remotes/upstream/main
    let didResolve = false;
    const listeners = [];

    const thenable = {
      then(resolve) {
        if (!didResolve) {
          listeners.push(resolve);
        } else {
          resolve();
        }
      },
    };

    function resolveThenable() {
      didResolve = true;
      listeners.forEach(l => l());
    }

    function Async() {
      if (!didResolve) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Suspend!');
        throw thenable;
      }
      Scheduler.unstable_yieldValue('Async');
=======
        Scheduler.log('Suspend!');
        throw thenable;
      }
      Scheduler.log('Async');
>>>>>>> remotes/upstream/main
      return 'Async';
    }

    const root = ReactTestRenderer.create(
      <>
        <Suspense fallback={<Text text="Loading..." />} />
        <Text text="Initial" />
      </>,
      {
        unstable_isConcurrent: true,
      },
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Initial']);
    expect(root).toMatchRenderedOutput('Initial');

    // The update will suspend.
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        root.update(
          <>
            <Suspense fallback={<Text text="Loading..." />}>
              <Async />
            </Suspense>
            <Text text="After Suspense" />
            <Text text="Sibling" />
          </>,
        );
      });
    } else {
=======
    await waitForAll(['Initial']);
    expect(root).toMatchRenderedOutput('Initial');

    // The update will suspend.
    React.startTransition(() => {
>>>>>>> remotes/upstream/main
      root.update(
        <>
          <Suspense fallback={<Text text="Loading..." />}>
            <Async />
          </Suspense>
          <Text text="After Suspense" />
          <Text text="Sibling" />
        </>,
      );
<<<<<<< HEAD
    }

    // Yield past the Suspense boundary but don't complete the last sibling.
    expect(Scheduler).toFlushAndYieldThrough([
      'Suspend!',
      'Loading...',
      'After Suspense',
    ]);

    // The promise resolves before the current render phase has completed
    resolveThenable();
    expect(Scheduler).toHaveYielded([]);
    expect(root).toMatchRenderedOutput('Initial');

    // Start over from the root, instead of continuing.
    expect(Scheduler).toFlushAndYield([
=======
    });

    // Yield past the Suspense boundary but don't complete the last sibling.
    await waitFor(['Suspend!', 'Loading...', 'After Suspense']);

    // The promise resolves before the current render phase has completed
    resolveThenable();
    assertLog([]);
    expect(root).toMatchRenderedOutput('Initial');

    // Start over from the root, instead of continuing.
    await waitForAll([
>>>>>>> remotes/upstream/main
      // Async renders again *before* Sibling
      'Async',
      'After Suspense',
      'Sibling',
    ]);
    expect(root).toMatchRenderedOutput('AsyncAfter SuspenseSibling');
  });

<<<<<<< HEAD
  it('throttles fallback committing globally', () => {
    function Foo() {
      Scheduler.unstable_yieldValue('Foo');
=======
  it('throttles fallback committing globally', async () => {
    function Foo() {
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <AsyncText text="A" ms={200} />
          <Suspense fallback={<Text text="Loading more..." />}>
            <AsyncText text="B" ms={300} />
          </Suspense>
        </Suspense>
      );
    }

<<<<<<< HEAD
    // Committing fallbacks should be throttled.
    // First, advance some time to skip the first threshold.
    jest.advanceTimersByTime(600);
    Scheduler.unstable_advanceTime(600);

=======
>>>>>>> remotes/upstream/main
    const root = ReactTestRenderer.create(<Foo />, {
      unstable_isConcurrent: true,
    });

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'Foo',
      'Suspend! [A]',
      'Suspend! [B]',
      'Loading more...',
      'Loading...',
    ]);
    expect(root).toMatchRenderedOutput('Loading...');

    // Resolve A.
    jest.advanceTimersByTime(200);
    Scheduler.unstable_advanceTime(200);
    expect(Scheduler).toHaveYielded(['Promise resolved [A]']);
    expect(Scheduler).toFlushAndYield(['A', 'Suspend! [B]', 'Loading more...']);
=======
    await waitForAll(['Foo', 'Suspend! [A]', 'Loading...']);
    expect(root).toMatchRenderedOutput('Loading...');

    await resolveText('A');
    await waitForAll(['A', 'Suspend! [B]', 'Loading more...']);
>>>>>>> remotes/upstream/main

    // By this point, we have enough info to show "A" and "Loading more..."
    // However, we've just shown the outer fallback. So we'll delay
    // showing the inner fallback hoping that B will resolve soon enough.
    expect(root).toMatchRenderedOutput('Loading...');

<<<<<<< HEAD
    // Resolve B.
    jest.advanceTimersByTime(100);
    Scheduler.unstable_advanceTime(100);
    expect(Scheduler).toHaveYielded(['Promise resolved [B]']);

    // By this point, B has resolved.
    // We're still showing the outer fallback.
    expect(root).toMatchRenderedOutput('Loading...');
    expect(Scheduler).toFlushAndYield(['A', 'B']);
    // Then contents of both should pop in together.
    expect(root).toMatchRenderedOutput('AB');
  });

  it('does not throttle fallback committing for too long', () => {
    function Foo() {
      Scheduler.unstable_yieldValue('Foo');
=======
    await act(() => resolveText('B'));
    // By this point, B has resolved.
    // The contents of both should pop in together.
    assertLog(['A', 'B']);
    expect(root).toMatchRenderedOutput('AB');
  });

  it('does not throttle fallback committing for too long', async () => {
    function Foo() {
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <AsyncText text="A" ms={200} />
          <Suspense fallback={<Text text="Loading more..." />}>
            <AsyncText text="B" ms={1200} />
          </Suspense>
        </Suspense>
      );
    }

<<<<<<< HEAD
    // Committing fallbacks should be throttled.
    // First, advance some time to skip the first threshold.
    jest.advanceTimersByTime(600);
    Scheduler.unstable_advanceTime(600);

=======
>>>>>>> remotes/upstream/main
    const root = ReactTestRenderer.create(<Foo />, {
      unstable_isConcurrent: true,
    });

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'Foo',
      'Suspend! [A]',
      'Suspend! [B]',
      'Loading more...',
      'Loading...',
    ]);
    expect(root).toMatchRenderedOutput('Loading...');

    // Resolve A.
    jest.advanceTimersByTime(200);
    Scheduler.unstable_advanceTime(200);
    expect(Scheduler).toHaveYielded(['Promise resolved [A]']);
    expect(Scheduler).toFlushAndYield(['A', 'Suspend! [B]', 'Loading more...']);
=======
    await waitForAll(['Foo', 'Suspend! [A]', 'Loading...']);
    expect(root).toMatchRenderedOutput('Loading...');

    await resolveText('A');
    await waitForAll(['A', 'Suspend! [B]', 'Loading more...']);
>>>>>>> remotes/upstream/main

    // By this point, we have enough info to show "A" and "Loading more..."
    // However, we've just shown the outer fallback. So we'll delay
    // showing the inner fallback hoping that B will resolve soon enough.
    expect(root).toMatchRenderedOutput('Loading...');
<<<<<<< HEAD

    // Wait some more. B is still not resolving.
    jest.advanceTimersByTime(500);
    Scheduler.unstable_advanceTime(500);
    // Give up and render A with a spinner for B.
    expect(root).toMatchRenderedOutput('ALoading more...');

    // Resolve B.
    jest.advanceTimersByTime(500);
    Scheduler.unstable_advanceTime(500);
    expect(Scheduler).toHaveYielded(['Promise resolved [B]']);
    expect(Scheduler).toFlushAndYield(['B']);
    expect(root).toMatchRenderedOutput('AB');
  });

  // @gate !enableSyncDefaultUpdates
=======
    // But if we wait a bit longer, eventually we'll give up and show a
    // fallback. The exact value here isn't important. It's a JND ("Just
    // Noticeable Difference").
    jest.advanceTimersByTime(500);
    expect(root).toMatchRenderedOutput('ALoading more...');

    await act(() => resolveText('B'));
    assertLog(['B']);
    expect(root).toMatchRenderedOutput('AB');
  });

  // @gate forceConcurrentByDefaultForTesting
>>>>>>> remotes/upstream/main
  it(
    'interrupts current render when something suspends with a ' +
      "delay and we've already skipped over a lower priority update in " +
      'a parent',
<<<<<<< HEAD
    () => {
=======
    async () => {
>>>>>>> remotes/upstream/main
      function interrupt() {
        // React has a heuristic to batch all updates that occur within the same
        // event. This is a trick to circumvent that heuristic.
        ReactTestRenderer.create('whatever');
      }

      function App({shouldSuspend, step}) {
        return (
          <>
            <Text text={`A${step}`} />
            <Suspense fallback={<Text text="Loading..." />}>
              {shouldSuspend ? <AsyncText text="Async" ms={2000} /> : null}
            </Suspense>
            <Text text={`B${step}`} />
            <Text text={`C${step}`} />
          </>
        );
      }

      const root = ReactTestRenderer.create(null, {
        unstable_isConcurrent: true,
      });

      root.update(<App shouldSuspend={false} step={0} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['A0', 'B0', 'C0']);
=======
      await waitForAll(['A0', 'B0', 'C0']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput('A0B0C0');

      // This update will suspend.
      root.update(<App shouldSuspend={true} step={1} />);

      // Do a bit of work
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYieldThrough(['A1']);
=======
      await waitFor(['A1']);
>>>>>>> remotes/upstream/main

      // Schedule another update. This will have lower priority because it's
      // a transition.
      React.startTransition(() => {
        root.update(<App shouldSuspend={false} step={2} />);
      });

      // Interrupt to trigger a restart.
      interrupt();

<<<<<<< HEAD
      expect(Scheduler).toFlushAndYieldThrough([
=======
      await waitFor([
>>>>>>> remotes/upstream/main
        // Should have restarted the first update, because of the interruption
        'A1',
        'Suspend! [Async]',
        'Loading...',
        'B1',
      ]);

      // Should not have committed loading state
      expect(root).toMatchRenderedOutput('A0B0C0');

      // After suspending, should abort the first update and switch to the
      // second update. So, C1 should not appear in the log.
      // TODO: This should work even if React does not yield to the main
      // thread. Should use same mechanism as selective hydration to interrupt
      // the render before the end of the current slice of work.
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['A2', 'B2', 'C2']);
=======
      await waitForAll(['A2', 'B2', 'C2']);
>>>>>>> remotes/upstream/main

      expect(root).toMatchRenderedOutput('A2B2C2');
    },
  );

  it('mounts a lazy class component in non-concurrent mode', async () => {
    class Class extends React.Component {
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

    async function fakeImport(result) {
      return {default: result};
    }

    const LazyClass = React.lazy(() => fakeImport(Class));

    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyClass label="Hi" />
      </Suspense>,
    );

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Loading...']);
=======
    assertLog(['Loading...']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Loading...');

    await LazyClass;

<<<<<<< HEAD
    expect(Scheduler).toFlushUntilNextPaint(['Hi', 'Did mount: Hi']);
    expect(root).toMatchRenderedOutput('Hi');
  });

  it('updates memoized child of suspense component when context updates (simple memo)', () => {
=======
    await waitForPaint(['Hi', 'Did mount: Hi']);
    expect(root).toMatchRenderedOutput('Hi');
  });

  it('updates memoized child of suspense component when context updates (simple memo)', async () => {
>>>>>>> remotes/upstream/main
    const {useContext, createContext, useState, memo} = React;

    const ValueContext = createContext(null);

    const MemoizedChild = memo(function MemoizedChild() {
      const text = useContext(ValueContext);
<<<<<<< HEAD
      try {
        TextResource.read([text, 1000]);
        Scheduler.unstable_yieldValue(text);
        return text;
      } catch (promise) {
        if (typeof promise.then === 'function') {
          Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
        } else {
          Scheduler.unstable_yieldValue(`Error! [${text}]`);
        }
        throw promise;
      }
=======
      return <Text text={readText(text)} />;
>>>>>>> remotes/upstream/main
    });

    let setValue;
    function App() {
      const [value, _setValue] = useState('default');
      setValue = _setValue;

      return (
        <ValueContext.Provider value={value}>
          <Suspense fallback={<Text text="Loading..." />}>
            <MemoizedChild />
          </Suspense>
        </ValueContext.Provider>
      );
    }

    const root = ReactTestRenderer.create(<App />, {
      unstable_isConcurrent: true,
    });
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Suspend! [default]', 'Loading...']);
    jest.advanceTimersByTime(1000);

    expect(Scheduler).toHaveYielded(['Promise resolved [default]']);
    expect(Scheduler).toFlushAndYield(['default']);
    expect(root).toMatchRenderedOutput('default');

    act(() => setValue('new value'));
    expect(Scheduler).toHaveYielded(['Suspend! [new value]', 'Loading...']);
    jest.advanceTimersByTime(1000);

    expect(Scheduler).toHaveYielded(['Promise resolved [new value]']);
    expect(Scheduler).toFlushAndYield(['new value']);
    expect(root).toMatchRenderedOutput('new value');
  });

  it('updates memoized child of suspense component when context updates (manual memo)', () => {
=======
    await waitForAll(['Suspend! [default]', 'Loading...']);

    await act(() => resolveText('default'));
    assertLog(['default']);
    expect(root).toMatchRenderedOutput('default');

    await act(() => setValue('new value'));
    assertLog(['Suspend! [new value]', 'Loading...']);

    await act(() => resolveText('new value'));
    assertLog(['new value']);
    expect(root).toMatchRenderedOutput('new value');
  });

  it('updates memoized child of suspense component when context updates (manual memo)', async () => {
>>>>>>> remotes/upstream/main
    const {useContext, createContext, useState, memo} = React;

    const ValueContext = createContext(null);

    const MemoizedChild = memo(
      function MemoizedChild() {
        const text = useContext(ValueContext);
<<<<<<< HEAD
        try {
          TextResource.read([text, 1000]);
          Scheduler.unstable_yieldValue(text);
          return text;
        } catch (promise) {
          if (typeof promise.then === 'function') {
            Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
          } else {
            Scheduler.unstable_yieldValue(`Error! [${text}]`);
          }
          throw promise;
        }
=======
        return <Text text={readText(text)} />;
>>>>>>> remotes/upstream/main
      },
      function areEqual(prevProps, nextProps) {
        return true;
      },
    );

    let setValue;
    function App() {
      const [value, _setValue] = useState('default');
      setValue = _setValue;

      return (
        <ValueContext.Provider value={value}>
          <Suspense fallback={<Text text="Loading..." />}>
            <MemoizedChild />
          </Suspense>
        </ValueContext.Provider>
      );
    }

    const root = ReactTestRenderer.create(<App />, {
      unstable_isConcurrent: true,
    });
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Suspend! [default]', 'Loading...']);
    jest.advanceTimersByTime(1000);

    expect(Scheduler).toHaveYielded(['Promise resolved [default]']);
    expect(Scheduler).toFlushAndYield(['default']);
    expect(root).toMatchRenderedOutput('default');

    act(() => setValue('new value'));
    expect(Scheduler).toHaveYielded(['Suspend! [new value]', 'Loading...']);
    jest.advanceTimersByTime(1000);

    expect(Scheduler).toHaveYielded(['Promise resolved [new value]']);
    expect(Scheduler).toFlushAndYield(['new value']);
    expect(root).toMatchRenderedOutput('new value');
  });

  it('updates memoized child of suspense component when context updates (function)', () => {
=======
    await waitForAll(['Suspend! [default]', 'Loading...']);

    await act(() => resolveText('default'));
    assertLog(['default']);
    expect(root).toMatchRenderedOutput('default');

    await act(() => setValue('new value'));
    assertLog(['Suspend! [new value]', 'Loading...']);

    await act(() => resolveText('new value'));
    assertLog(['new value']);
    expect(root).toMatchRenderedOutput('new value');
  });

  it('updates memoized child of suspense component when context updates (function)', async () => {
>>>>>>> remotes/upstream/main
    const {useContext, createContext, useState} = React;

    const ValueContext = createContext(null);

    function MemoizedChild() {
      const text = useContext(ValueContext);
<<<<<<< HEAD
      try {
        TextResource.read([text, 1000]);
        Scheduler.unstable_yieldValue(text);
        return text;
      } catch (promise) {
        if (typeof promise.then === 'function') {
          Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
        } else {
          Scheduler.unstable_yieldValue(`Error! [${text}]`);
        }
        throw promise;
      }
=======
      return <Text text={readText(text)} />;
>>>>>>> remotes/upstream/main
    }

    let setValue;
    function App({children}) {
      const [value, _setValue] = useState('default');
      setValue = _setValue;

      return (
        <ValueContext.Provider value={value}>{children}</ValueContext.Provider>
      );
    }

    const root = ReactTestRenderer.create(
      <App>
        <Suspense fallback={<Text text="Loading..." />}>
          <MemoizedChild />
        </Suspense>
      </App>,
      {
        unstable_isConcurrent: true,
      },
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Suspend! [default]', 'Loading...']);
    jest.advanceTimersByTime(1000);

    expect(Scheduler).toHaveYielded(['Promise resolved [default]']);
    expect(Scheduler).toFlushAndYield(['default']);
    expect(root).toMatchRenderedOutput('default');

    act(() => setValue('new value'));
    expect(Scheduler).toHaveYielded(['Suspend! [new value]', 'Loading...']);
    jest.advanceTimersByTime(1000);

    expect(Scheduler).toHaveYielded(['Promise resolved [new value]']);
    expect(Scheduler).toFlushAndYield(['new value']);
    expect(root).toMatchRenderedOutput('new value');
  });

  it('updates memoized child of suspense component when context updates (forwardRef)', () => {
=======
    await waitForAll(['Suspend! [default]', 'Loading...']);

    await act(() => resolveText('default'));
    assertLog(['default']);
    expect(root).toMatchRenderedOutput('default');

    await act(() => setValue('new value'));
    assertLog(['Suspend! [new value]', 'Loading...']);

    await act(() => resolveText('new value'));
    assertLog(['new value']);
    expect(root).toMatchRenderedOutput('new value');
  });

  it('updates memoized child of suspense component when context updates (forwardRef)', async () => {
>>>>>>> remotes/upstream/main
    const {forwardRef, useContext, createContext, useState} = React;

    const ValueContext = createContext(null);

    const MemoizedChild = forwardRef(() => {
      const text = useContext(ValueContext);
<<<<<<< HEAD
      try {
        TextResource.read([text, 1000]);
        Scheduler.unstable_yieldValue(text);
        return text;
      } catch (promise) {
        if (typeof promise.then === 'function') {
          Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
        } else {
          Scheduler.unstable_yieldValue(`Error! [${text}]`);
        }
        throw promise;
      }
=======
      return <Text text={readText(text)} />;
>>>>>>> remotes/upstream/main
    });

    let setValue;
    function App({children}) {
      const [value, _setValue] = useState('default');
      setValue = _setValue;

      return (
        <ValueContext.Provider value={value}>{children}</ValueContext.Provider>
      );
    }

    const root = ReactTestRenderer.create(
      <App>
        <Suspense fallback={<Text text="Loading..." />}>
          <MemoizedChild />
        </Suspense>
      </App>,
      {
        unstable_isConcurrent: true,
      },
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Suspend! [default]', 'Loading...']);
    jest.advanceTimersByTime(1000);

    expect(Scheduler).toHaveYielded(['Promise resolved [default]']);
    expect(Scheduler).toFlushAndYield(['default']);
    expect(root).toMatchRenderedOutput('default');

    act(() => setValue('new value'));
    expect(Scheduler).toHaveYielded(['Suspend! [new value]', 'Loading...']);
    jest.advanceTimersByTime(1000);

    expect(Scheduler).toHaveYielded(['Promise resolved [new value]']);
    expect(Scheduler).toFlushAndYield(['new value']);
    expect(root).toMatchRenderedOutput('new value');
  });

  it('re-fires layout effects when re-showing Suspense', () => {
    function TextWithLayout(props) {
      Scheduler.unstable_yieldValue(props.text);
      React.useLayoutEffect(() => {
        Scheduler.unstable_yieldValue('create layout');
        return () => {
          Scheduler.unstable_yieldValue('destroy layout');
=======
    await waitForAll(['Suspend! [default]', 'Loading...']);

    await act(() => resolveText('default'));
    assertLog(['default']);
    expect(root).toMatchRenderedOutput('default');

    await act(() => setValue('new value'));
    assertLog(['Suspend! [new value]', 'Loading...']);

    await act(() => resolveText('new value'));
    assertLog(['new value']);
    expect(root).toMatchRenderedOutput('new value');
  });

  it('re-fires layout effects when re-showing Suspense', async () => {
    function TextWithLayout(props) {
      Scheduler.log(props.text);
      React.useLayoutEffect(() => {
        Scheduler.log('create layout');
        return () => {
          Scheduler.log('destroy layout');
>>>>>>> remotes/upstream/main
        };
      }, []);
      return props.text;
    }

    let _setShow;
    function App(props) {
      const [show, setShow] = React.useState(false);
      _setShow = setShow;
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <TextWithLayout text="Child 1" />
          {show && <AsyncText ms={1000} text="Child 2" />}
        </Suspense>
      );
    }

    const root = ReactTestRenderer.create(<App />, {
      unstable_isConcurrent: true,
    });

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Child 1', 'create layout']);
    expect(root).toMatchRenderedOutput('Child 1');

    act(() => {
      _setShow(true);
    });
    expect(Scheduler).toHaveYielded([
      'Child 1',
      'Suspend! [Child 2]',
      'Loading...',
    ]);
    jest.advanceTimersByTime(1000);
    expect(Scheduler).toHaveYielded([
      'destroy layout',
      'Promise resolved [Child 2]',
    ]);
    expect(Scheduler).toFlushAndYield(['Child 1', 'Child 2', 'create layout']);
=======
    await waitForAll(['Child 1', 'create layout']);
    expect(root).toMatchRenderedOutput('Child 1');

    await act(() => {
      _setShow(true);
    });
    assertLog([
      'Child 1',
      'Suspend! [Child 2]',
      'Loading...',
      'destroy layout',
    ]);

    await act(() => resolveText('Child 2'));
    assertLog(['Child 1', 'Child 2', 'create layout']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(['Child 1', 'Child 2'].join(''));
  });

  describe('outside concurrent mode', () => {
<<<<<<< HEAD
    it('a mounted class component can suspend without losing state', () => {
      class TextWithLifecycle extends React.Component {
        componentDidMount() {
          Scheduler.unstable_yieldValue(`Mount [${this.props.text}]`);
        }
        componentDidUpdate() {
          Scheduler.unstable_yieldValue(`Update [${this.props.text}]`);
        }
        componentWillUnmount() {
          Scheduler.unstable_yieldValue(`Unmount [${this.props.text}]`);
=======
    it('a mounted class component can suspend without losing state', async () => {
      class TextWithLifecycle extends React.Component {
        componentDidMount() {
          Scheduler.log(`Mount [${this.props.text}]`);
        }
        componentDidUpdate() {
          Scheduler.log(`Update [${this.props.text}]`);
        }
        componentWillUnmount() {
          Scheduler.log(`Unmount [${this.props.text}]`);
>>>>>>> remotes/upstream/main
        }
        render() {
          return <Text {...this.props} />;
        }
      }

      let instance;
      class AsyncTextWithLifecycle extends React.Component {
        state = {step: 1};
        componentDidMount() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
            `Mount [${this.props.text}:${this.state.step}]`,
          );
        }
        componentDidUpdate() {
          Scheduler.unstable_yieldValue(
            `Update [${this.props.text}:${this.state.step}]`,
          );
        }
        componentWillUnmount() {
          Scheduler.unstable_yieldValue(
            `Unmount [${this.props.text}:${this.state.step}]`,
          );
        }
        render() {
          instance = this;
          const text = `${this.props.text}:${this.state.step}`;
          const ms = this.props.ms;
          try {
            TextResource.read([text, ms]);
            Scheduler.unstable_yieldValue(text);
            return text;
          } catch (promise) {
            if (typeof promise.then === 'function') {
              Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
            } else {
              Scheduler.unstable_yieldValue(`Error! [${text}]`);
            }
            throw promise;
          }
=======
          Scheduler.log(`Mount [${this.props.text}:${this.state.step}]`);
        }
        componentDidUpdate() {
          Scheduler.log(`Update [${this.props.text}:${this.state.step}]`);
        }
        componentWillUnmount() {
          Scheduler.log(`Unmount [${this.props.text}:${this.state.step}]`);
        }
        render() {
          instance = this;
          const text = readText(`${this.props.text}:${this.state.step}`);
          return <Text text={text} />;
>>>>>>> remotes/upstream/main
        }
      }

      function App() {
        return (
          <Suspense fallback={<TextWithLifecycle text="Loading..." />}>
            <TextWithLifecycle text="A" />
            <AsyncTextWithLifecycle ms={100} text="B" ref={instance} />
            <TextWithLifecycle text="C" />
          </Suspense>
        );
      }

      const root = ReactTestRenderer.create(<App />);

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'A',
        'Suspend! [B:1]',
        'C',
        'Loading...',

        'Mount [A]',
        // B's lifecycle should not fire because it suspended
        // 'Mount [B]',
        'Mount [C]',
        'Mount [Loading...]',
      ]);
      expect(root).toMatchRenderedOutput('Loading...');

<<<<<<< HEAD
      jest.advanceTimersByTime(100);

      expect(Scheduler).toHaveYielded(['Promise resolved [B:1]']);
      expect(Scheduler).toFlushUntilNextPaint([
=======
      await resolveText('B:1');
      await waitForPaint([
>>>>>>> remotes/upstream/main
        'B:1',
        'Unmount [Loading...]',
        // Should be a mount, not an update
        'Mount [B:1]',
      ]);
      expect(root).toMatchRenderedOutput('AB:1C');

      instance.setState({step: 2});
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Suspend! [B:2]',
        'Loading...',
        'Mount [Loading...]',
      ]);
      expect(root).toMatchRenderedOutput('Loading...');

      jest.advanceTimersByTime(100);

      expect(Scheduler).toHaveYielded(['Promise resolved [B:2]']);
      expect(Scheduler).toFlushUntilNextPaint([
        'B:2',
        'Unmount [Loading...]',
        'Update [B:2]',
      ]);
      expect(root).toMatchRenderedOutput('AB:2C');
    });

    it('bails out on timed-out primary children even if they receive an update', () => {
=======
      assertLog(['Suspend! [B:2]', 'Loading...', 'Mount [Loading...]']);
      expect(root).toMatchRenderedOutput('Loading...');

      await resolveText('B:2');
      await waitForPaint(['B:2', 'Unmount [Loading...]', 'Update [B:2]']);
      expect(root).toMatchRenderedOutput('AB:2C');
    });

    it('bails out on timed-out primary children even if they receive an update', async () => {
>>>>>>> remotes/upstream/main
      let instance;
      class Stateful extends React.Component {
        state = {step: 1};
        render() {
          instance = this;
          return <Text text={`Stateful: ${this.state.step}`} />;
        }
      }

      function App(props) {
        return (
          <Suspense fallback={<Text text="Loading..." />}>
            <Stateful />
            <AsyncText ms={1000} text={props.text} />
          </Suspense>
        );
      }

      const root = ReactTestRenderer.create(<App text="A" />);

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Stateful: 1',
        'Suspend! [A]',
        'Loading...',
      ]);

      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [A]']);
      expect(Scheduler).toFlushUntilNextPaint(['A']);
      expect(root).toMatchRenderedOutput('Stateful: 1A');

      root.update(<App text="B" />);
      expect(Scheduler).toHaveYielded([
        'Stateful: 1',
        'Suspend! [B]',
        'Loading...',
      ]);
      expect(root).toMatchRenderedOutput('Loading...');

      instance.setState({step: 2});
      expect(Scheduler).toHaveYielded(['Stateful: 2', 'Suspend! [B]']);
      expect(root).toMatchRenderedOutput('Loading...');

      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [B]']);
      expect(Scheduler).toFlushUntilNextPaint(['B']);
      expect(root).toMatchRenderedOutput('Stateful: 2B');
    });

    it('when updating a timed-out tree, always retries the suspended component', () => {
=======
      assertLog(['Stateful: 1', 'Suspend! [A]', 'Loading...']);

      await resolveText('A');
      await waitForPaint(['A']);
      expect(root).toMatchRenderedOutput('Stateful: 1A');

      root.update(<App text="B" />);
      assertLog(['Stateful: 1', 'Suspend! [B]', 'Loading...']);
      expect(root).toMatchRenderedOutput('Loading...');

      instance.setState({step: 2});
      assertLog(['Stateful: 2', 'Suspend! [B]']);
      expect(root).toMatchRenderedOutput('Loading...');

      await resolveText('B');
      await waitForPaint(['B']);
      expect(root).toMatchRenderedOutput('Stateful: 2B');
    });

    it('when updating a timed-out tree, always retries the suspended component', async () => {
>>>>>>> remotes/upstream/main
      let instance;
      class Stateful extends React.Component {
        state = {step: 1};
        render() {
          instance = this;
          return <Text text={`Stateful: ${this.state.step}`} />;
        }
      }

      const Indirection = React.Fragment;

      function App(props) {
        return (
          <Suspense fallback={<Text text="Loading..." />}>
            <Stateful />
            <Indirection>
              <Indirection>
                <Indirection>
                  <AsyncText ms={1000} text={props.text} />
                </Indirection>
              </Indirection>
            </Indirection>
          </Suspense>
        );
      }

      const root = ReactTestRenderer.create(<App text="A" />);

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Stateful: 1',
        'Suspend! [A]',
        'Loading...',
      ]);

      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [A]']);
      expect(Scheduler).toFlushUntilNextPaint(['A']);
      expect(root).toMatchRenderedOutput('Stateful: 1A');

      root.update(<App text="B" />);
      expect(Scheduler).toHaveYielded([
        'Stateful: 1',
        'Suspend! [B]',
        'Loading...',
      ]);
      expect(root).toMatchRenderedOutput('Loading...');

      instance.setState({step: 2});
      expect(Scheduler).toHaveYielded([
=======
      assertLog(['Stateful: 1', 'Suspend! [A]', 'Loading...']);

      await resolveText('A');
      await waitForPaint(['A']);
      expect(root).toMatchRenderedOutput('Stateful: 1A');

      root.update(<App text="B" />);
      assertLog(['Stateful: 1', 'Suspend! [B]', 'Loading...']);
      expect(root).toMatchRenderedOutput('Loading...');

      instance.setState({step: 2});
      assertLog([
>>>>>>> remotes/upstream/main
        'Stateful: 2',

        // The suspended component should suspend again. If it doesn't, the
        // likely mistake is that the suspended fiber wasn't marked with
        // pending work, so it was improperly treated as complete.
        'Suspend! [B]',
      ]);
      expect(root).toMatchRenderedOutput('Loading...');

<<<<<<< HEAD
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [B]']);
      expect(Scheduler).toFlushUntilNextPaint(['B']);
=======
      await resolveText('B');
      await waitForPaint(['B']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput('Stateful: 2B');
    });

    it('suspends in a class that has componentWillUnmount and is then deleted', () => {
      class AsyncTextWithUnmount extends React.Component {
        componentWillUnmount() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('will unmount');
        }
        render() {
          const text = this.props.text;
          const ms = this.props.ms;
          try {
            TextResource.read([text, ms]);
            Scheduler.unstable_yieldValue(text);
            return text;
          } catch (promise) {
            if (typeof promise.then === 'function') {
              Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
            } else {
              Scheduler.unstable_yieldValue(`Error! [${text}]`);
            }
            throw promise;
          }
=======
          Scheduler.log('will unmount');
        }
        render() {
          return <Text text={readText(this.props.text)} />;
>>>>>>> remotes/upstream/main
        }
      }

      function App({text}) {
        return (
          <Suspense fallback={<Text text="Loading..." />}>
            <AsyncTextWithUnmount text={text} ms={100} />
          </Suspense>
        );
      }

      const root = ReactTestRenderer.create(<App text="A" />);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [A]', 'Loading...']);
      root.update(<Text text="B" />);
      // Should not fire componentWillUnmount
      expect(Scheduler).toHaveYielded(['B']);
      expect(root).toMatchRenderedOutput('B');
    });

    it('suspends in a component that also contains useEffect', () => {
=======
      assertLog(['Suspend! [A]', 'Loading...']);
      root.update(<Text text="B" />);
      // Should not fire componentWillUnmount
      assertLog(['B']);
      expect(root).toMatchRenderedOutput('B');
    });

    it('suspends in a component that also contains useEffect', async () => {
>>>>>>> remotes/upstream/main
      const {useLayoutEffect} = React;

      function AsyncTextWithEffect(props) {
        const text = props.text;

        useLayoutEffect(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Did commit: ' + text);
        }, [text]);

        try {
          TextResource.read([props.text, props.ms]);
          Scheduler.unstable_yieldValue(text);
          return text;
        } catch (promise) {
          if (typeof promise.then === 'function') {
            Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
          } else {
            Scheduler.unstable_yieldValue(`Error! [${text}]`);
          }
          throw promise;
        }
=======
          Scheduler.log('Did commit: ' + text);
        }, [text]);

        return <Text text={readText(text)} />;
>>>>>>> remotes/upstream/main
      }

      function App({text}) {
        return (
          <Suspense fallback={<Text text="Loading..." />}>
            <AsyncTextWithEffect text={text} ms={100} />
          </Suspense>
        );
      }

      ReactTestRenderer.create(<App text="A" />);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [A]', 'Loading...']);
      jest.advanceTimersByTime(500);

      expect(Scheduler).toHaveYielded(['Promise resolved [A]']);
      expect(Scheduler).toFlushUntilNextPaint(['A', 'Did commit: A']);
    });

    it('retries when an update is scheduled on a timed out tree', () => {
=======
      assertLog(['Suspend! [A]', 'Loading...']);
      await resolveText('A');
      await waitForPaint(['A', 'Did commit: A']);
    });

    it('retries when an update is scheduled on a timed out tree', async () => {
>>>>>>> remotes/upstream/main
      let instance;
      class Stateful extends React.Component {
        state = {step: 1};
        render() {
          instance = this;
          return <AsyncText ms={1000} text={`Step: ${this.state.step}`} />;
        }
      }

      function App(props) {
        return (
          <Suspense fallback={<Text text="Loading..." />}>
            <Stateful />
          </Suspense>
        );
      }

      const root = ReactTestRenderer.create(<App />, {
        unstable_isConcurrent: true,
      });

      // Initial render
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Suspend! [Step: 1]', 'Loading...']);
      jest.advanceTimersByTime(1000);
      expect(Scheduler).toHaveYielded(['Promise resolved [Step: 1]']);
      expect(Scheduler).toFlushAndYield(['Step: 1']);
      expect(root).toMatchRenderedOutput('Step: 1');

      // Update that suspends
      instance.setState({step: 2});
      expect(Scheduler).toFlushAndYield(['Suspend! [Step: 2]', 'Loading...']);
      jest.advanceTimersByTime(500);
=======
      await waitForAll(['Suspend! [Step: 1]', 'Loading...']);

      await act(() => resolveText('Step: 1'));
      assertLog(['Step: 1']);
      expect(root).toMatchRenderedOutput('Step: 1');

      // Update that suspends
      await act(() => {
        instance.setState({step: 2});
      });
      assertLog(['Suspend! [Step: 2]', 'Loading...']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput('Loading...');

      // Update while still suspended
      instance.setState({step: 3});
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Suspend! [Step: 3]']);
      expect(root).toMatchRenderedOutput('Loading...');

      jest.advanceTimersByTime(1000);
      expect(Scheduler).toHaveYielded([
        'Promise resolved [Step: 2]',
        'Promise resolved [Step: 3]',
      ]);
      expect(Scheduler).toFlushAndYield(['Step: 3']);
      expect(root).toMatchRenderedOutput('Step: 3');
    });

    it('does not remount the fallback while suspended children resolve in legacy mode', () => {
=======
      await waitForAll(['Suspend! [Step: 3]']);
      expect(root).toMatchRenderedOutput('Loading...');

      await act(() => {
        resolveText('Step: 2');
        resolveText('Step: 3');
      });
      assertLog(['Step: 3']);
      expect(root).toMatchRenderedOutput('Step: 3');
    });

    it('does not remount the fallback while suspended children resolve in legacy mode', async () => {
>>>>>>> remotes/upstream/main
      let mounts = 0;
      class ShouldMountOnce extends React.Component {
        componentDidMount() {
          mounts++;
        }
        render() {
          return <Text text="Loading..." />;
        }
      }

      function App(props) {
        return (
          <Suspense fallback={<ShouldMountOnce />}>
            <AsyncText ms={1000} text="Child 1" />
            <AsyncText ms={2000} text="Child 2" />
            <AsyncText ms={3000} text="Child 3" />
          </Suspense>
        );
      }

      const root = ReactTestRenderer.create(<App />);

      // Initial render
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Suspend! [Child 1]',
        'Suspend! [Child 2]',
        'Suspend! [Child 3]',
        'Loading...',
      ]);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([]);

      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [Child 1]']);
      expect(Scheduler).toFlushUntilNextPaint([
=======
      await waitForAll([]);

      await resolveText('Child 1');
      await waitForPaint([
>>>>>>> remotes/upstream/main
        'Child 1',
        'Suspend! [Child 2]',
        'Suspend! [Child 3]',
      ]);

<<<<<<< HEAD
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [Child 2]']);
      expect(Scheduler).toFlushUntilNextPaint([
        'Child 2',
        'Suspend! [Child 3]',
      ]);

      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [Child 3]']);
      expect(Scheduler).toFlushUntilNextPaint(['Child 3']);
=======
      await resolveText('Child 2');
      await waitForPaint(['Child 2', 'Suspend! [Child 3]']);

      await resolveText('Child 3');
      await waitForPaint(['Child 3']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(
        ['Child 1', 'Child 2', 'Child 3'].join(''),
      );
      expect(mounts).toBe(1);
    });

<<<<<<< HEAD
    it('does not get stuck with fallback in concurrent mode for a large delay', () => {
      function App(props) {
        return (
          <Suspense fallback={<Text text="Loading..." />}>
            <AsyncText ms={1000} text="Child 1" />
            <AsyncText ms={7000} text="Child 2" />
=======
    it('does not get stuck with fallback in concurrent mode for a large delay', async () => {
      function App(props) {
        return (
          <Suspense fallback={<Text text="Loading..." />}>
            <AsyncText text="Child 1" />
            <AsyncText text="Child 2" />
>>>>>>> remotes/upstream/main
          </Suspense>
        );
      }

      const root = ReactTestRenderer.create(<App />, {
        unstable_isConcurrent: true,
      });

<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
        'Suspend! [Child 1]',
        'Suspend! [Child 2]',
        'Loading...',
      ]);
      jest.advanceTimersByTime(1000);
      expect(Scheduler).toHaveYielded(['Promise resolved [Child 1]']);
      expect(Scheduler).toFlushAndYield(['Child 1', 'Suspend! [Child 2]']);
      jest.advanceTimersByTime(6000);
      expect(Scheduler).toHaveYielded(['Promise resolved [Child 2]']);
      expect(Scheduler).toFlushAndYield(['Child 1', 'Child 2']);
      expect(root).toMatchRenderedOutput(['Child 1', 'Child 2'].join(''));
    });

    it('reuses effects, including deletions, from the suspended tree', () => {
=======
      await waitForAll(['Suspend! [Child 1]', 'Loading...']);
      await resolveText('Child 1');
      await waitForAll(['Child 1', 'Suspend! [Child 2]']);

      jest.advanceTimersByTime(6000);

      await act(() => resolveText('Child 2'));
      assertLog(['Child 1', 'Child 2']);
      expect(root).toMatchRenderedOutput(['Child 1', 'Child 2'].join(''));
    });

    it('reuses effects, including deletions, from the suspended tree', async () => {
>>>>>>> remotes/upstream/main
      const {useState} = React;

      let setTab;
      function App() {
        const [tab, _setTab] = useState(0);
        setTab = _setTab;

        return (
          <Suspense fallback={<Text text="Loading..." />}>
            <AsyncText key={tab} text={'Tab: ' + tab} ms={1000} />
            <Text key={tab + 'sibling'} text=" + sibling" />
          </Suspense>
        );
      }

      const root = ReactTestRenderer.create(<App />);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Suspend! [Tab: 0]',
        ' + sibling',
        'Loading...',
      ]);
      expect(root).toMatchRenderedOutput('Loading...');
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [Tab: 0]']);
      expect(Scheduler).toFlushUntilNextPaint(['Tab: 0']);
      expect(root).toMatchRenderedOutput('Tab: 0 + sibling');

      act(() => setTab(1));
      expect(Scheduler).toHaveYielded([
        'Suspend! [Tab: 1]',
        ' + sibling',
        'Loading...',
      ]);
      expect(root).toMatchRenderedOutput('Loading...');
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [Tab: 1]']);
      expect(Scheduler).toFlushUntilNextPaint(['Tab: 1']);
      expect(root).toMatchRenderedOutput('Tab: 1 + sibling');

      act(() => setTab(2));
      expect(Scheduler).toHaveYielded([
        'Suspend! [Tab: 2]',
        ' + sibling',
        'Loading...',
      ]);
      expect(root).toMatchRenderedOutput('Loading...');
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [Tab: 2]']);
      expect(Scheduler).toFlushUntilNextPaint(['Tab: 2']);
      expect(root).toMatchRenderedOutput('Tab: 2 + sibling');
    });

    it('does not warn if an mounted component is pinged', () => {
=======
      assertLog(['Suspend! [Tab: 0]', ' + sibling', 'Loading...']);
      expect(root).toMatchRenderedOutput('Loading...');

      await resolveText('Tab: 0');
      await waitForPaint(['Tab: 0']);
      expect(root).toMatchRenderedOutput('Tab: 0 + sibling');

      await act(() => setTab(1));
      assertLog(['Suspend! [Tab: 1]', ' + sibling', 'Loading...']);
      expect(root).toMatchRenderedOutput('Loading...');

      await resolveText('Tab: 1');
      await waitForPaint(['Tab: 1']);
      expect(root).toMatchRenderedOutput('Tab: 1 + sibling');

      await act(() => setTab(2));
      assertLog(['Suspend! [Tab: 2]', ' + sibling', 'Loading...']);
      expect(root).toMatchRenderedOutput('Loading...');

      await resolveText('Tab: 2');
      await waitForPaint(['Tab: 2']);
      expect(root).toMatchRenderedOutput('Tab: 2 + sibling');
    });

    it('does not warn if a mounted component is pinged', async () => {
>>>>>>> remotes/upstream/main
      const {useState} = React;

      const root = ReactTestRenderer.create(null);

      let setStep;
      function UpdatingText({text, ms}) {
        const [step, _setStep] = useState(0);
        setStep = _setStep;
        const fullText = `${text}:${step}`;
<<<<<<< HEAD
        try {
          TextResource.read([fullText, ms]);
          Scheduler.unstable_yieldValue(fullText);
          return fullText;
        } catch (promise) {
          if (typeof promise.then === 'function') {
            Scheduler.unstable_yieldValue(`Suspend! [${fullText}]`);
          } else {
            Scheduler.unstable_yieldValue(`Error! [${fullText}]`);
          }
          throw promise;
        }
=======
        return <Text text={readText(fullText)} />;
>>>>>>> remotes/upstream/main
      }

      root.update(
        <Suspense fallback={<Text text="Loading..." />}>
          <UpdatingText text="A" ms={1000} />
        </Suspense>,
      );

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [A:0]', 'Loading...']);
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [A:0]']);
      expect(Scheduler).toFlushUntilNextPaint(['A:0']);
      expect(root).toMatchRenderedOutput('A:0');

      act(() => setStep(1));
      expect(Scheduler).toHaveYielded(['Suspend! [A:1]', 'Loading...']);
      expect(root).toMatchRenderedOutput('Loading...');

      root.update(null);
      expect(Scheduler).toFlushWithoutYielding();
      jest.advanceTimersByTime(1000);
    });

    it('memoizes promise listeners per thread ID to prevent redundant renders', () => {
=======
      assertLog(['Suspend! [A:0]', 'Loading...']);

      await resolveText('A:0');
      await waitForPaint(['A:0']);
      expect(root).toMatchRenderedOutput('A:0');

      await act(() => setStep(1));
      assertLog(['Suspend! [A:1]', 'Loading...']);
      expect(root).toMatchRenderedOutput('Loading...');

      await act(() => {
        root.update(null);
      });
    });

    it('memoizes promise listeners per thread ID to prevent redundant renders', async () => {
>>>>>>> remotes/upstream/main
      function App() {
        return (
          <Suspense fallback={<Text text="Loading..." />}>
            <AsyncText text="A" ms={1000} />
            <AsyncText text="B" ms={2000} />
            <AsyncText text="C" ms={3000} />
          </Suspense>
        );
      }

      const root = ReactTestRenderer.create(null);

      root.update(<App />);

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Suspend! [A]',
        'Suspend! [B]',
        'Suspend! [C]',
        'Loading...',
      ]);

      // Resolve A
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [A]']);
      expect(Scheduler).toFlushUntilNextPaint([
=======
      assertLog(['Suspend! [A]', 'Suspend! [B]', 'Suspend! [C]', 'Loading...']);

      await resolveText('A');
      await waitForPaint([
>>>>>>> remotes/upstream/main
        'A',
        // The promises for B and C have now been thrown twice
        'Suspend! [B]',
        'Suspend! [C]',
      ]);

<<<<<<< HEAD
      // Resolve B
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [B]']);
      expect(Scheduler).toFlushUntilNextPaint([
=======
      await resolveText('B');
      await waitForPaint([
>>>>>>> remotes/upstream/main
        // Even though the promise for B was thrown twice, we should only
        // re-render once.
        'B',
        // The promise for C has now been thrown three times
        'Suspend! [C]',
      ]);

<<<<<<< HEAD
      // Resolve C
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [C]']);
      expect(Scheduler).toFlushUntilNextPaint([
=======
      await resolveText('C');
      await waitForPaint([
>>>>>>> remotes/upstream/main
        // Even though the promise for C was thrown three times, we should only
        // re-render once.
        'C',
      ]);
    });

<<<<<<< HEAD
    it('#14162', () => {
=======
    it('#14162', async () => {
>>>>>>> remotes/upstream/main
      const {lazy} = React;

      function Hello() {
        return <span>hello</span>;
      }

      async function fetchComponent() {
        return new Promise(r => {
          // simulating a delayed import() call
          setTimeout(r, 1000, {default: Hello});
        });
      }

      const LazyHello = lazy(fetchComponent);

      class App extends React.Component {
        state = {render: false};

        componentDidMount() {
          setTimeout(() => this.setState({render: true}));
        }

        render() {
          return (
            <Suspense fallback={<span>loading...</span>}>
              {this.state.render && <LazyHello />}
            </Suspense>
          );
        }
      }

      const root = ReactTestRenderer.create(null);

<<<<<<< HEAD
      root.update(<App name="world" />);
      jest.advanceTimersByTime(1000);
    });

    it('updates memoized child of suspense component when context updates (simple memo)', () => {
=======
      await act(() => {
        root.update(<App name="world" />);
      });
    });

    it('updates memoized child of suspense component when context updates (simple memo)', async () => {
>>>>>>> remotes/upstream/main
      const {useContext, createContext, useState, memo} = React;

      const ValueContext = createContext(null);

      const MemoizedChild = memo(function MemoizedChild() {
        const text = useContext(ValueContext);
<<<<<<< HEAD
        try {
          TextResource.read([text, 1000]);
          Scheduler.unstable_yieldValue(text);
          return text;
        } catch (promise) {
          if (typeof promise.then === 'function') {
            Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
          } else {
            Scheduler.unstable_yieldValue(`Error! [${text}]`);
          }
          throw promise;
        }
=======
        return <Text text={readText(text)} />;
>>>>>>> remotes/upstream/main
      });

      let setValue;
      function App() {
        const [value, _setValue] = useState('default');
        setValue = _setValue;

        return (
          <ValueContext.Provider value={value}>
            <Suspense fallback={<Text text="Loading..." />}>
              <MemoizedChild />
            </Suspense>
          </ValueContext.Provider>
        );
      }

      const root = ReactTestRenderer.create(<App />);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [default]', 'Loading...']);
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [default]']);
      expect(Scheduler).toFlushUntilNextPaint(['default']);
      expect(root).toMatchRenderedOutput('default');

      act(() => setValue('new value'));
      expect(Scheduler).toHaveYielded(['Suspend! [new value]', 'Loading...']);
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [new value]']);
      expect(Scheduler).toFlushUntilNextPaint(['new value']);
      expect(root).toMatchRenderedOutput('new value');
    });

    it('updates memoized child of suspense component when context updates (manual memo)', () => {
=======
      assertLog(['Suspend! [default]', 'Loading...']);

      await resolveText('default');
      await waitForPaint(['default']);
      expect(root).toMatchRenderedOutput('default');

      await act(() => setValue('new value'));
      assertLog(['Suspend! [new value]', 'Loading...']);

      await resolveText('new value');
      await waitForPaint(['new value']);
      expect(root).toMatchRenderedOutput('new value');
    });

    it('updates memoized child of suspense component when context updates (manual memo)', async () => {
>>>>>>> remotes/upstream/main
      const {useContext, createContext, useState, memo} = React;

      const ValueContext = createContext(null);

      const MemoizedChild = memo(
        function MemoizedChild() {
          const text = useContext(ValueContext);
<<<<<<< HEAD
          try {
            TextResource.read([text, 1000]);
            Scheduler.unstable_yieldValue(text);
            return text;
          } catch (promise) {
            if (typeof promise.then === 'function') {
              Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
            } else {
              Scheduler.unstable_yieldValue(`Error! [${text}]`);
            }
            throw promise;
          }
=======
          return <Text text={readText(text)} />;
>>>>>>> remotes/upstream/main
        },
        function areEqual(prevProps, nextProps) {
          return true;
        },
      );

      let setValue;
      function App() {
        const [value, _setValue] = useState('default');
        setValue = _setValue;

        return (
          <ValueContext.Provider value={value}>
            <Suspense fallback={<Text text="Loading..." />}>
              <MemoizedChild />
            </Suspense>
          </ValueContext.Provider>
        );
      }

      const root = ReactTestRenderer.create(<App />);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [default]', 'Loading...']);
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [default]']);
      expect(Scheduler).toFlushUntilNextPaint(['default']);
      expect(root).toMatchRenderedOutput('default');

      act(() => setValue('new value'));
      expect(Scheduler).toHaveYielded(['Suspend! [new value]', 'Loading...']);
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [new value]']);
      expect(Scheduler).toFlushUntilNextPaint(['new value']);
      expect(root).toMatchRenderedOutput('new value');
    });

    it('updates memoized child of suspense component when context updates (function)', () => {
=======
      assertLog(['Suspend! [default]', 'Loading...']);

      await resolveText('default');
      await waitForPaint(['default']);
      expect(root).toMatchRenderedOutput('default');

      await act(() => setValue('new value'));
      assertLog(['Suspend! [new value]', 'Loading...']);

      await resolveText('new value');
      await waitForPaint(['new value']);
      expect(root).toMatchRenderedOutput('new value');
    });

    it('updates memoized child of suspense component when context updates (function)', async () => {
>>>>>>> remotes/upstream/main
      const {useContext, createContext, useState} = React;

      const ValueContext = createContext(null);

      function MemoizedChild() {
        const text = useContext(ValueContext);
<<<<<<< HEAD
        try {
          TextResource.read([text, 1000]);
          Scheduler.unstable_yieldValue(text);
          return text;
        } catch (promise) {
          if (typeof promise.then === 'function') {
            Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
          } else {
            Scheduler.unstable_yieldValue(`Error! [${text}]`);
          }
          throw promise;
        }
=======
        return <Text text={readText(text)} />;
>>>>>>> remotes/upstream/main
      }

      let setValue;
      function App({children}) {
        const [value, _setValue] = useState('default');
        setValue = _setValue;

        return (
          <ValueContext.Provider value={value}>
            {children}
          </ValueContext.Provider>
        );
      }

      const root = ReactTestRenderer.create(
        <App>
          <Suspense fallback={<Text text="Loading..." />}>
            <MemoizedChild />
          </Suspense>
        </App>,
      );
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [default]', 'Loading...']);
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [default]']);
      expect(Scheduler).toFlushUntilNextPaint(['default']);
      expect(root).toMatchRenderedOutput('default');

      act(() => setValue('new value'));
      expect(Scheduler).toHaveYielded(['Suspend! [new value]', 'Loading...']);
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [new value]']);
      expect(Scheduler).toFlushUntilNextPaint(['new value']);
      expect(root).toMatchRenderedOutput('new value');
    });

    it('updates memoized child of suspense component when context updates (forwardRef)', () => {
=======
      assertLog(['Suspend! [default]', 'Loading...']);

      await resolveText('default');
      await waitForPaint(['default']);
      expect(root).toMatchRenderedOutput('default');

      await act(() => setValue('new value'));
      assertLog(['Suspend! [new value]', 'Loading...']);

      await resolveText('new value');
      await waitForPaint(['new value']);
      expect(root).toMatchRenderedOutput('new value');
    });

    it('updates memoized child of suspense component when context updates (forwardRef)', async () => {
>>>>>>> remotes/upstream/main
      const {forwardRef, useContext, createContext, useState} = React;

      const ValueContext = createContext(null);

      const MemoizedChild = forwardRef(function MemoizedChild() {
        const text = useContext(ValueContext);
<<<<<<< HEAD
        try {
          TextResource.read([text, 1000]);
          Scheduler.unstable_yieldValue(text);
          return text;
        } catch (promise) {
          if (typeof promise.then === 'function') {
            Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
          } else {
            Scheduler.unstable_yieldValue(`Error! [${text}]`);
          }
          throw promise;
        }
=======
        return <Text text={readText(text)} />;
>>>>>>> remotes/upstream/main
      });

      let setValue;
      function App() {
        const [value, _setValue] = useState('default');
        setValue = _setValue;

        return (
          <ValueContext.Provider value={value}>
            <Suspense fallback={<Text text="Loading..." />}>
              <MemoizedChild />
            </Suspense>
          </ValueContext.Provider>
        );
      }

      const root = ReactTestRenderer.create(<App />);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [default]', 'Loading...']);
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [default]']);
      expect(Scheduler).toFlushUntilNextPaint(['default']);
      expect(root).toMatchRenderedOutput('default');

      act(() => setValue('new value'));
      expect(Scheduler).toHaveYielded(['Suspend! [new value]', 'Loading...']);
      jest.advanceTimersByTime(1000);

      expect(Scheduler).toHaveYielded(['Promise resolved [new value]']);
      expect(Scheduler).toFlushUntilNextPaint(['new value']);
      expect(root).toMatchRenderedOutput('new value');
    });

    it('updates context consumer within child of suspended suspense component when context updates', () => {
=======
      assertLog(['Suspend! [default]', 'Loading...']);

      await resolveText('default');
      await waitForPaint(['default']);
      expect(root).toMatchRenderedOutput('default');

      await act(() => setValue('new value'));
      assertLog(['Suspend! [new value]', 'Loading...']);

      await resolveText('new value');
      await waitForPaint(['new value']);
      expect(root).toMatchRenderedOutput('new value');
    });

    it('updates context consumer within child of suspended suspense component when context updates', async () => {
>>>>>>> remotes/upstream/main
      const {createContext, useState} = React;

      const ValueContext = createContext(null);

      const promiseThatNeverResolves = new Promise(() => {});
      function Child() {
        return (
          <ValueContext.Consumer>
            {value => {
<<<<<<< HEAD
              Scheduler.unstable_yieldValue(
                `Received context value [${value}]`,
              );
=======
              Scheduler.log(`Received context value [${value}]`);
>>>>>>> remotes/upstream/main
              if (value === 'default') return <Text text="default" />;
              throw promiseThatNeverResolves;
            }}
          </ValueContext.Consumer>
        );
      }

      let setValue;
      function Wrapper({children}) {
        const [value, _setValue] = useState('default');
        setValue = _setValue;
        return (
          <ValueContext.Provider value={value}>
            {children}
          </ValueContext.Provider>
        );
      }

      function App() {
        return (
          <Wrapper>
            <Suspense fallback={<Text text="Loading..." />}>
              <Child />
            </Suspense>
          </Wrapper>
        );
      }

      const root = ReactTestRenderer.create(<App />);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Received context value [default]',
        'default',
      ]);
      expect(root).toMatchRenderedOutput('default');

      act(() => setValue('new value'));
      expect(Scheduler).toHaveYielded([
        'Received context value [new value]',
        'Loading...',
      ]);
      expect(root).toMatchRenderedOutput('Loading...');

      act(() => setValue('default'));
      expect(Scheduler).toHaveYielded([
        'Received context value [default]',
        'default',
      ]);
=======
      assertLog(['Received context value [default]', 'default']);
      expect(root).toMatchRenderedOutput('default');

      await act(() => setValue('new value'));
      assertLog(['Received context value [new value]', 'Loading...']);
      expect(root).toMatchRenderedOutput('Loading...');

      await act(() => setValue('default'));
      assertLog(['Received context value [default]', 'default']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput('default');
    });
  });
});
