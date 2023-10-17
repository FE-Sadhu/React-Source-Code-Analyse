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

'use strict';

let React;
let ReactNoop;
let Scheduler;
let act;
let NormalPriority;
let IdlePriority;
let runWithPriority;
let startTransition;
<<<<<<< HEAD
=======
let waitForAll;
let waitForPaint;
let assertLog;
let waitFor;
>>>>>>> remotes/upstream/main

describe('ReactSchedulerIntegration', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;
=======
    act = require('internal-test-utils').act;
>>>>>>> remotes/upstream/main
    NormalPriority = Scheduler.unstable_NormalPriority;
    IdlePriority = Scheduler.unstable_IdlePriority;
    runWithPriority = Scheduler.unstable_runWithPriority;
    startTransition = React.startTransition;
<<<<<<< HEAD
=======

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitForPaint = InternalTestUtils.waitForPaint;
    assertLog = InternalTestUtils.assertLog;
    waitFor = InternalTestUtils.waitFor;
>>>>>>> remotes/upstream/main
  });

  // Note: This is based on a similar component we use in www. We can delete
  // once the extra div wrapper is no longer necessary.
  function LegacyHiddenDiv({children, mode}) {
    return (
      <div hidden={mode === 'hidden'}>
        <React.unstable_LegacyHidden
          mode={mode === 'hidden' ? 'unstable-defer-without-hiding' : mode}>
          {children}
        </React.unstable_LegacyHidden>
      </div>
    );
  }

  it('passive effects are called before Normal-pri scheduled in layout effects', async () => {
    const {useEffect, useLayoutEffect} = React;
    function Effects({step}) {
      useLayoutEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Layout Effect');
        Scheduler.unstable_scheduleCallback(NormalPriority, () =>
          Scheduler.unstable_yieldValue(
            'Scheduled Normal Callback from Layout Effect',
          ),
        );
      });
      useEffect(() => {
        Scheduler.unstable_yieldValue('Passive Effect');
=======
        Scheduler.log('Layout Effect');
        Scheduler.unstable_scheduleCallback(NormalPriority, () =>
          Scheduler.log('Scheduled Normal Callback from Layout Effect'),
        );
      });
      useEffect(() => {
        Scheduler.log('Passive Effect');
>>>>>>> remotes/upstream/main
      });
      return null;
    }
    function CleanupEffect() {
      useLayoutEffect(() => () => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Cleanup Layout Effect');
        Scheduler.unstable_scheduleCallback(NormalPriority, () =>
          Scheduler.unstable_yieldValue(
            'Scheduled Normal Callback from Cleanup Layout Effect',
          ),
=======
        Scheduler.log('Cleanup Layout Effect');
        Scheduler.unstable_scheduleCallback(NormalPriority, () =>
          Scheduler.log('Scheduled Normal Callback from Cleanup Layout Effect'),
>>>>>>> remotes/upstream/main
        );
      });
      return null;
    }
<<<<<<< HEAD
    await act(async () => {
      ReactNoop.render(<CleanupEffect />);
    });
    expect(Scheduler).toHaveYielded([]);
    await act(async () => {
      ReactNoop.render(<Effects />);
    });
    expect(Scheduler).toHaveYielded([
=======
    await act(() => {
      ReactNoop.render(<CleanupEffect />);
    });
    assertLog([]);
    await act(() => {
      ReactNoop.render(<Effects />);
    });
    assertLog([
>>>>>>> remotes/upstream/main
      'Cleanup Layout Effect',
      'Layout Effect',
      'Passive Effect',
      // These callbacks should be scheduled after the passive effects.
      'Scheduled Normal Callback from Cleanup Layout Effect',
      'Scheduled Normal Callback from Layout Effect',
    ]);
  });

<<<<<<< HEAD
  it('requests a paint after committing', () => {
=======
  it('requests a paint after committing', async () => {
>>>>>>> remotes/upstream/main
    const scheduleCallback = Scheduler.unstable_scheduleCallback;

    const root = ReactNoop.createRoot();
    root.render('Initial');
<<<<<<< HEAD
    Scheduler.unstable_flushAll();

    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('A'));
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('B'));
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('C'));

    // Schedule a React render. React will request a paint after committing it.
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        root.render('Update');
      });
    } else {
      root.render('Update');
    }

    // Advance time just to be sure the next tasks have lower priority
    Scheduler.unstable_advanceTime(2000);

    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('D'));
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('E'));

    // Flush everything up to the next paint. Should yield after the
    // React commit.
    Scheduler.unstable_flushUntilNextPaint();
    expect(Scheduler).toHaveYielded(['A', 'B', 'C']);
=======
    await waitForAll([]);
    expect(root).toMatchRenderedOutput('Initial');

    scheduleCallback(NormalPriority, () => Scheduler.log('A'));
    scheduleCallback(NormalPriority, () => Scheduler.log('B'));
    scheduleCallback(NormalPriority, () => Scheduler.log('C'));

    // Schedule a React render. React will request a paint after committing it.
    React.startTransition(() => {
      root.render('Update');
    });

    // Perform just a little bit of work. By now, the React task will have
    // already been scheduled, behind A, B, and C.
    await waitFor(['A']);

    // Schedule some additional tasks. These won't fire until after the React
    // update has finished.
    scheduleCallback(NormalPriority, () => Scheduler.log('D'));
    scheduleCallback(NormalPriority, () => Scheduler.log('E'));

    // Flush everything up to the next paint. Should yield after the
    // React commit.
    await waitForPaint(['B', 'C']);
    expect(root).toMatchRenderedOutput('Update');

    // Now flush the rest of the work.
    await waitForAll(['D', 'E']);
>>>>>>> remotes/upstream/main
  });

  // @gate www
  it('idle updates are not blocked by offscreen work', async () => {
    function Text({text}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
=======
      Scheduler.log(text);
>>>>>>> remotes/upstream/main
      return text;
    }

    function App({label}) {
      return (
        <>
          <Text text={`Visible: ` + label} />
          <LegacyHiddenDiv mode="hidden">
            <Text text={`Hidden: ` + label} />
          </LegacyHiddenDiv>
        </>
      );
    }

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App label="A" />);

      // Commit the visible content
<<<<<<< HEAD
      expect(Scheduler).toFlushUntilNextPaint(['Visible: A']);
=======
      await waitForPaint(['Visible: A']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(
        <>
          Visible: A
          <div hidden={true} />
        </>,
      );

      // Before the hidden content has a chance to render, schedule an
      // idle update
      runWithPriority(IdlePriority, () => {
        root.render(<App label="B" />);
      });

      // The next commit should only include the visible content
<<<<<<< HEAD
      expect(Scheduler).toFlushUntilNextPaint(['Visible: B']);
=======
      await waitForPaint(['Visible: B']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(
        <>
          Visible: B
          <div hidden={true} />
        </>,
      );
    });

    // The hidden content commits later
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Hidden: B']);
=======
    assertLog(['Hidden: B']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        Visible: B<div hidden={true}>Hidden: B</div>
      </>,
    );
  });
});

describe(
  'regression test: does not infinite loop if `shouldYield` returns ' +
    'true after a partial tree expires',
  () => {
    let logDuringShouldYield = false;

    beforeEach(() => {
      jest.resetModules();

      jest.mock('scheduler', () => {
        const actual = jest.requireActual('scheduler/unstable_mock');
        return {
          ...actual,
          unstable_shouldYield() {
            if (logDuringShouldYield) {
<<<<<<< HEAD
              actual.unstable_yieldValue('shouldYield');
=======
              actual.log('shouldYield');
>>>>>>> remotes/upstream/main
            }
            return actual.unstable_shouldYield();
          },
        };
      });

      React = require('react');
      ReactNoop = require('react-noop-renderer');
      Scheduler = require('scheduler');
      startTransition = React.startTransition;
<<<<<<< HEAD
=======

      const InternalTestUtils = require('internal-test-utils');
      waitForAll = InternalTestUtils.waitForAll;
      waitForPaint = InternalTestUtils.waitForPaint;
      assertLog = InternalTestUtils.assertLog;
      waitFor = InternalTestUtils.waitFor;
      act = InternalTestUtils.act;
>>>>>>> remotes/upstream/main
    });

    afterEach(() => {
      jest.mock('scheduler', () =>
        jest.requireActual('scheduler/unstable_mock'),
      );
    });

    it('using public APIs to trigger real world scenario', async () => {
      // This test reproduces a case where React's Scheduler task timed out but
      // the `shouldYield` method returned true. The bug was that React fell
      // into an infinite loop, because it would enter the work loop then
      // immediately yield back to Scheduler.
      //
      // (The next test in this suite covers the same case. The difference is
      // that this test only uses public APIs, whereas the next test mocks
      // `shouldYield` to check when it is called.)
      function Text({text}) {
        return text;
      }

      function App({step}) {
        return (
          <>
            <Text text="A" />
            <TriggerErstwhileSchedulerBug />
            <Text text="B" />
            <TriggerErstwhileSchedulerBug />
            <Text text="C" />
          </>
        );
      }

      function TriggerErstwhileSchedulerBug() {
        // This triggers a once-upon-a-time bug in Scheduler that caused
        // `shouldYield` to return true even though the current task expired.
        Scheduler.unstable_advanceTime(10000);
        Scheduler.unstable_requestPaint();
        return null;
      }

      await act(async () => {
        ReactNoop.render(<App />);
<<<<<<< HEAD
        expect(Scheduler).toFlushUntilNextPaint([]);
        expect(Scheduler).toFlushUntilNextPaint([]);
=======
        await waitForPaint([]);
        await waitForPaint([]);
>>>>>>> remotes/upstream/main
      });
    });

    it('mock Scheduler module to check if `shouldYield` is called', async () => {
      // This test reproduces a bug where React's Scheduler task timed out but
      // the `shouldYield` method returned true. Usually we try not to mock
      // internal methods, but I've made an exception here since the point is
      // specifically to test that React is resilient to the behavior of a
      // Scheduler API. That being said, feel free to rewrite or delete this
      // test if/when the API changes.
      function Text({text}) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(text);
=======
        Scheduler.log(text);
>>>>>>> remotes/upstream/main
        return text;
      }

      function App({step}) {
        return (
          <>
            <Text text="A" />
            <Text text="B" />
            <Text text="C" />
          </>
        );
      }

      await act(async () => {
        // Partially render the tree, then yield
        startTransition(() => {
          ReactNoop.render(<App />);
        });
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYieldThrough(['A']);
=======
        await waitFor(['A']);
>>>>>>> remotes/upstream/main

        // Start logging whenever shouldYield is called
        logDuringShouldYield = true;
        // Let's call it once to confirm the mock actually works
<<<<<<< HEAD
        Scheduler.unstable_shouldYield();
        expect(Scheduler).toHaveYielded(['shouldYield']);
=======
        await waitFor(['shouldYield']);
>>>>>>> remotes/upstream/main

        // Expire the task
        Scheduler.unstable_advanceTime(10000);
        // Scheduling a new update is a trick to force the expiration to kick
        // in. We don't check if a update has been starved at the beginning of
        // working on it, since there's no point — we're already working on it.
        // We only check before yielding to the main thread (to avoid starvation
        // by other main thread work) or when receiving an update (to avoid
        // starvation by incoming updates).
        startTransition(() => {
          ReactNoop.render(<App />);
        });
<<<<<<< HEAD

        // Because the render expired, React should finish the tree without
        // consulting `shouldYield` again
        Scheduler.unstable_flushNumberOfYields(1);
        expect(Scheduler).toHaveYielded(['B', 'C']);
=======
        // Because the render expired, React should finish the tree without
        // consulting `shouldYield` again
        await waitFor(['B', 'C']);
>>>>>>> remotes/upstream/main
      });
    });
  },
);
<<<<<<< HEAD
=======

describe('`act` bypasses Scheduler methods completely,', () => {
  let infiniteLoopGuard;

  beforeEach(() => {
    jest.resetModules();

    infiniteLoopGuard = 0;

    jest.mock('scheduler', () => {
      const actual = jest.requireActual('scheduler/unstable_mock');
      return {
        ...actual,
        unstable_shouldYield() {
          // This simulates a bug report where `shouldYield` returns true in a
          // unit testing environment. Because `act` will keep working until
          // there's no more work left, it would fall into an infinite loop.
          // The fix is that when performing work inside `act`, we should bypass
          // `shouldYield` completely, because we can't trust it to be correct.
          if (infiniteLoopGuard++ > 100) {
            throw new Error('Detected an infinite loop');
          }
          return true;
        },
      };
    });

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    startTransition = React.startTransition;
  });

  afterEach(() => {
    jest.mock('scheduler', () => jest.requireActual('scheduler/unstable_mock'));
  });

  // @gate __DEV__
  it('inside `act`, does not call `shouldYield`, even during a concurrent render', async () => {
    function App() {
      return (
        <>
          <div>A</div>
          <div>B</div>
          <div>C</div>
        </>
      );
    }

    const root = ReactNoop.createRoot();
    const publicAct = React.unstable_act;
    const prevIsReactActEnvironment = global.IS_REACT_ACT_ENVIRONMENT;
    try {
      global.IS_REACT_ACT_ENVIRONMENT = true;
      await publicAct(async () => {
        startTransition(() => root.render(<App />));
      });
    } finally {
      global.IS_REACT_ACT_ENVIRONMENT = prevIsReactActEnvironment;
    }
    expect(root).toMatchRenderedOutput(
      <>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </>,
    );
  });
});
>>>>>>> remotes/upstream/main
