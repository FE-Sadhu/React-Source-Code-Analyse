let React;
let ReactNoop;
let Scheduler;
let ContinuousEventPriority;
let startTransition;
let useState;
let useEffect;
let act;
<<<<<<< HEAD
=======
let waitFor;
let waitForPaint;
let assertLog;
>>>>>>> remotes/upstream/main

describe('ReactUpdatePriority', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;
    ContinuousEventPriority = require('react-reconciler/constants')
      .ContinuousEventPriority;
    startTransition = React.startTransition;
    useState = React.useState;
    useEffect = React.useEffect;
  });

  function Text({text}) {
    Scheduler.unstable_yieldValue(text);
=======
    act = require('internal-test-utils').act;
    ContinuousEventPriority =
      require('react-reconciler/constants').ContinuousEventPriority;
    startTransition = React.startTransition;
    useState = React.useState;
    useEffect = React.useEffect;

    const InternalTestUtils = require('internal-test-utils');
    waitFor = InternalTestUtils.waitFor;
    waitForPaint = InternalTestUtils.waitForPaint;
    assertLog = InternalTestUtils.assertLog;
  });

  function Text({text}) {
    Scheduler.log(text);
>>>>>>> remotes/upstream/main
    return text;
  }

  test('setState inside passive effect triggered by sync update should have default priority', async () => {
    const root = ReactNoop.createRoot();

    function App() {
      const [state, setState] = useState(1);
      useEffect(() => {
        setState(2);
      }, []);
      return <Text text={state} />;
    }

<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.flushSync(() => {
        root.render(<App />);
      });
      // Should not have flushed the effect update yet
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([1]);
    });
    expect(Scheduler).toHaveYielded([2]);
=======
      assertLog([1]);
    });
    assertLog([2]);
>>>>>>> remotes/upstream/main
  });

  test('setState inside passive effect triggered by idle update should have idle priority', async () => {
    const root = ReactNoop.createRoot();

    let setDefaultState;
    function App() {
      const [idleState, setIdleState] = useState(1);
      const [defaultState, _setDefaultState] = useState(1);
      setDefaultState = _setDefaultState;
      useEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Idle update');
=======
        Scheduler.log('Idle update');
>>>>>>> remotes/upstream/main
        setIdleState(2);
      }, []);
      return <Text text={`Idle: ${idleState}, Default: ${defaultState}`} />;
    }

    await act(async () => {
      ReactNoop.idleUpdates(() => {
        root.render(<App />);
      });
      // Should not have flushed the effect update yet
<<<<<<< HEAD
      expect(Scheduler).toFlushUntilNextPaint(['Idle: 1, Default: 1']);
=======
      await waitForPaint(['Idle: 1, Default: 1']);
>>>>>>> remotes/upstream/main

      // Schedule another update at default priority
      setDefaultState(2);

      // The default update flushes first, because
<<<<<<< HEAD
      expect(Scheduler).toFlushUntilNextPaint([
=======
      await waitForPaint([
>>>>>>> remotes/upstream/main
        // Idle update is scheduled
        'Idle update',

        // The default update flushes first, without including the idle update
        'Idle: 1, Default: 2',
      ]);
    });
    // Now the idle update has flushed
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Idle: 2, Default: 2']);
=======
    assertLog(['Idle: 2, Default: 2']);
>>>>>>> remotes/upstream/main
  });

  test('continuous updates should interrupt transitions', async () => {
    const root = ReactNoop.createRoot();

    let setCounter;
    let setIsHidden;
    function App() {
      const [counter, _setCounter] = useState(1);
      const [isHidden, _setIsHidden] = useState(false);
      setCounter = _setCounter;
      setIsHidden = _setIsHidden;
      if (isHidden) {
        return <Text text={'(hidden)'} />;
      }
      return (
        <>
          <Text text={'A' + counter} />
          <Text text={'B' + counter} />
          <Text text={'C' + counter} />
        </>
      );
    }

<<<<<<< HEAD
    await act(async () => {
      root.render(<App />);
    });
    expect(Scheduler).toHaveYielded(['A1', 'B1', 'C1']);
=======
    await act(() => {
      root.render(<App />);
    });
    assertLog(['A1', 'B1', 'C1']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('A1B1C1');

    await act(async () => {
      startTransition(() => {
        setCounter(2);
      });
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYieldThrough(['A2']);
=======
      await waitFor(['A2']);
>>>>>>> remotes/upstream/main
      ReactNoop.unstable_runWithPriority(ContinuousEventPriority, () => {
        setIsHidden(true);
      });
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      // Because the hide update has continuous priority, it should interrupt the
      // in-progress transition
      '(hidden)',
      // When the transition resumes, it's a no-op because the children are
      // now hidden.
      '(hidden)',
    ]);
    expect(root).toMatchRenderedOutput('(hidden)');
  });
});
