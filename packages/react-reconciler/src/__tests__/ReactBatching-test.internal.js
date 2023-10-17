let React;
let ReactFeatureFlags;
let ReactNoop;
let Scheduler;
<<<<<<< HEAD
let ReactCache;
let Suspense;
let TextResource;
=======
let waitForAll;
let assertLog;
let ReactCache;
let Suspense;
let TextResource;
let act;
>>>>>>> remotes/upstream/main

describe('ReactBlockingMode', () => {
  beforeEach(() => {
    jest.resetModules();
    ReactFeatureFlags = require('shared/ReactFeatureFlags');

    ReactFeatureFlags.replayFailedUnitOfWorkWithInvokeGuardedCallback = false;
    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
    ReactCache = require('react-cache');
    Suspense = React.Suspense;

<<<<<<< HEAD
=======
    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    assertLog = InternalTestUtils.assertLog;
    act = InternalTestUtils.act;

>>>>>>> remotes/upstream/main
    TextResource = ReactCache.unstable_createResource(
      ([text, ms = 0]) => {
        return new Promise((resolve, reject) =>
          setTimeout(() => {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue(`Promise resolved [${text}]`);
=======
            Scheduler.log(`Promise resolved [${text}]`);
>>>>>>> remotes/upstream/main
            resolve(text);
          }, ms),
        );
      },
      ([text, ms]) => text,
    );
  });

  function Text(props) {
<<<<<<< HEAD
    Scheduler.unstable_yieldValue(props.text);
=======
    Scheduler.log(props.text);
>>>>>>> remotes/upstream/main
    return props.text;
  }

  function AsyncText(props) {
    const text = props.text;
    try {
      TextResource.read([props.text, props.ms]);
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
      return props.text;
    } catch (promise) {
      if (typeof promise.then === 'function') {
        Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
      } else {
        Scheduler.unstable_yieldValue(`Error! [${text}]`);
=======
      Scheduler.log(text);
      return props.text;
    } catch (promise) {
      if (typeof promise.then === 'function') {
        Scheduler.log(`Suspend! [${text}]`);
      } else {
        Scheduler.log(`Error! [${text}]`);
>>>>>>> remotes/upstream/main
      }
      throw promise;
    }
  }

<<<<<<< HEAD
  it('updates flush without yielding in the next event', () => {
=======
  it('updates flush without yielding in the next event', async () => {
>>>>>>> remotes/upstream/main
    const root = ReactNoop.createRoot();

    root.render(
      <>
        <Text text="A" />
        <Text text="B" />
        <Text text="C" />
      </>,
    );

    // Nothing should have rendered yet
    expect(root).toMatchRenderedOutput(null);

<<<<<<< HEAD
    // Everything should render immediately in the next event
    expect(Scheduler).toFlushAndYield(['A', 'B', 'C']);
    expect(root).toMatchRenderedOutput('ABC');
  });

  it('layout updates flush synchronously in same event', () => {
=======
    await waitForAll(['A', 'B', 'C']);
    expect(root).toMatchRenderedOutput('ABC');
  });

  it('layout updates flush synchronously in same event', async () => {
>>>>>>> remotes/upstream/main
    const {useLayoutEffect} = React;

    function App() {
      useLayoutEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Layout effect');
=======
        Scheduler.log('Layout effect');
>>>>>>> remotes/upstream/main
      });
      return <Text text="Hi" />;
    }

    const root = ReactNoop.createRoot();
    root.render(<App />);
    expect(root).toMatchRenderedOutput(null);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);

    expect(Scheduler).toFlushAndYield(['Hi', 'Layout effect']);
=======
    assertLog([]);

    await waitForAll(['Hi', 'Layout effect']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Hi');
  });

  it('uses proper Suspense semantics, not legacy ones', async () => {
    const root = ReactNoop.createRoot();
    root.render(
      <Suspense fallback={<Text text="Loading..." />}>
        <span>
          <Text text="A" />
        </span>
        <span>
          <AsyncText text="B" />
        </span>
        <span>
          <Text text="C" />
        </span>
      </Suspense>,
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['A', 'Suspend! [B]', 'C', 'Loading...']);
=======
    await waitForAll(['A', 'Suspend! [B]', 'Loading...']);
>>>>>>> remotes/upstream/main
    // In Legacy Mode, A and B would mount in a hidden primary tree. In
    // Concurrent Mode, nothing in the primary tree should mount. But the
    // fallback should mount immediately.
    expect(root).toMatchRenderedOutput('Loading...');

<<<<<<< HEAD
    await jest.advanceTimersByTime(1000);
    expect(Scheduler).toHaveYielded(['Promise resolved [B]']);
    expect(Scheduler).toFlushAndYield(['A', 'B', 'C']);
=======
    await act(() => jest.advanceTimersByTime(1000));
    assertLog(['Promise resolved [B]', 'A', 'B', 'C']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        <span>A</span>
        <span>B</span>
        <span>C</span>
      </>,
    );
  });

<<<<<<< HEAD
  it('flushSync does not flush batched work', () => {
=======
  it('flushSync does not flush batched work', async () => {
>>>>>>> remotes/upstream/main
    const {useState, forwardRef, useImperativeHandle} = React;
    const root = ReactNoop.createRoot();

    const Foo = forwardRef(({label}, ref) => {
      const [step, setStep] = useState(0);
      useImperativeHandle(ref, () => ({setStep}));
      return <Text text={label + step} />;
    });

    const foo1 = React.createRef(null);
    const foo2 = React.createRef(null);
    root.render(
      <>
        <Foo label="A" ref={foo1} />
        <Foo label="B" ref={foo2} />
      </>,
    );

<<<<<<< HEAD
    // Mount
    expect(Scheduler).toFlushAndYield(['A0', 'B0']);
=======
    await waitForAll(['A0', 'B0']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('A0B0');

    // Schedule a batched update to the first sibling
    ReactNoop.batchedUpdates(() => foo1.current.setStep(1));

    // Before it flushes, update the second sibling inside flushSync
    ReactNoop.batchedUpdates(() =>
      ReactNoop.flushSync(() => {
        foo2.current.setStep(1);
      }),
    );

<<<<<<< HEAD
    // Only the second update should have flushed synchronously
    expect(Scheduler).toHaveYielded(['B1']);
    expect(root).toMatchRenderedOutput('A0B1');

    // Now flush the first update
    expect(Scheduler).toFlushAndYield(['A1']);
    expect(root).toMatchRenderedOutput('A1B1');
=======
    // Now flush the first update
    if (gate(flags => flags.enableUnifiedSyncLane)) {
      assertLog(['A1', 'B1']);
      expect(root).toMatchRenderedOutput('A1B1');
    } else {
      // Only the second update should have flushed synchronously
      assertLog(['B1']);
      expect(root).toMatchRenderedOutput('A0B1');

      // Now flush the first update
      await waitForAll(['A1']);
      expect(root).toMatchRenderedOutput('A1B1');
    }
>>>>>>> remotes/upstream/main
  });
});
