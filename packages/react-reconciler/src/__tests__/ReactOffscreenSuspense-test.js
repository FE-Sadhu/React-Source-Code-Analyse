let React;
let ReactNoop;
let Scheduler;
let act;
let LegacyHidden;
let Offscreen;
let Suspense;
let useState;
let useEffect;
let startTransition;
let textCache;
<<<<<<< HEAD
=======
let waitFor;
let waitForPaint;
let assertLog;
>>>>>>> remotes/upstream/main

describe('ReactOffscreen', () => {
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
    LegacyHidden = React.unstable_LegacyHidden;
    Offscreen = React.unstable_Offscreen;
    Suspense = React.Suspense;
    useState = React.useState;
    useEffect = React.useEffect;
    startTransition = React.startTransition;

<<<<<<< HEAD
=======
    const InternalTestUtils = require('internal-test-utils');
    waitFor = InternalTestUtils.waitFor;
    waitForPaint = InternalTestUtils.waitForPaint;
    assertLog = InternalTestUtils.assertLog;

>>>>>>> remotes/upstream/main
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
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
=======
          Scheduler.log(`Suspend! [${text}]`);
>>>>>>> remotes/upstream/main
          throw record.value;
        case 'rejected':
          throw record.value;
        case 'resolved':
          return record.value;
      }
    } else {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
=======
      Scheduler.log(`Suspend! [${text}]`);
>>>>>>> remotes/upstream/main
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
<<<<<<< HEAD
    Scheduler.unstable_yieldValue(text);
=======
    Scheduler.log(text);
>>>>>>> remotes/upstream/main
    return text;
  }

  function AsyncText({text}) {
    readText(text);
<<<<<<< HEAD
    Scheduler.unstable_yieldValue(text);
=======
    Scheduler.log(text);
>>>>>>> remotes/upstream/main
    return text;
  }

  // @gate enableOffscreen
  test('basic example of suspending inside hidden tree', async () => {
    const root = ReactNoop.createRoot();

    function App() {
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <span>
            <Text text="Visible" />
          </span>
          <Offscreen mode="hidden">
            <span>
              <AsyncText text="Hidden" />
            </span>
          </Offscreen>
        </Suspense>
      );
    }

    // The hidden tree hasn't finished loading, but we should still be able to
    // show the surrounding contents. The outer Suspense boundary
    // isn't affected.
<<<<<<< HEAD
    await act(async () => {
      root.render(<App />);
    });
    expect(Scheduler).toHaveYielded(['Visible', 'Suspend! [Hidden]']);
=======
    await act(() => {
      root.render(<App />);
    });
    assertLog(['Visible', 'Suspend! [Hidden]']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(<span>Visible</span>);

    // When the data resolves, we should be able to finish prerendering
    // the hidden tree.
    await act(async () => {
      await resolveText('Hidden');
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Hidden']);
=======
    assertLog(['Hidden']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        <span>Visible</span>
        <span hidden={true}>Hidden</span>
      </>,
    );
  });

  // @gate www
  test('LegacyHidden does not handle suspense', async () => {
    const root = ReactNoop.createRoot();

    function App() {
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <span>
            <Text text="Visible" />
          </span>
          <LegacyHidden mode="hidden">
            <span>
              <AsyncText text="Hidden" />
            </span>
          </LegacyHidden>
        </Suspense>
      );
    }

    // Unlike Offscreen, LegacyHidden never captures if something suspends
<<<<<<< HEAD
    await act(async () => {
      root.render(<App />);
    });
    expect(Scheduler).toHaveYielded([
      'Visible',
      'Suspend! [Hidden]',
      'Loading...',
    ]);
=======
    await act(() => {
      root.render(<App />);
    });
    assertLog(['Visible', 'Suspend! [Hidden]', 'Loading...']);
>>>>>>> remotes/upstream/main
    // Nearest Suspense boundary switches to a fallback even though the
    // suspended content is hidden.
    expect(root).toMatchRenderedOutput(
      <>
        <span hidden={true}>Visible</span>
        Loading...
      </>,
    );
  });

  // @gate experimental || www
  test("suspending inside currently hidden tree that's switching to visible", async () => {
    const root = ReactNoop.createRoot();

    function Details({open, children}) {
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <span>
            <Text text={open ? 'Open' : 'Closed'} />
          </span>
          <Offscreen mode={open ? 'visible' : 'hidden'}>
            <span>{children}</span>
          </Offscreen>
        </Suspense>
      );
    }

    // The hidden tree hasn't finished loading, but we should still be able to
    // show the surrounding contents. It doesn't matter that there's no
    // Suspense boundary because the unfinished content isn't visible.
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(
        <Details open={false}>
          <AsyncText text="Async" />
        </Details>,
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Closed', 'Suspend! [Async]']);
=======
    assertLog(['Closed', 'Suspend! [Async]']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(<span>Closed</span>);

    // But when we switch the boundary from hidden to visible, it should
    // now bubble to the nearest Suspense boundary.
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      startTransition(() => {
        root.render(
          <Details open={true}>
            <AsyncText text="Async" />
          </Details>,
        );
      });
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Open', 'Suspend! [Async]', 'Loading...']);
=======
    assertLog(['Open', 'Suspend! [Async]', 'Loading...']);
>>>>>>> remotes/upstream/main
    // It should suspend with delay to prevent the already-visible Suspense
    // boundary from switching to a fallback
    expect(root).toMatchRenderedOutput(<span>Closed</span>);

    // Resolve the data and finish rendering
    await act(async () => {
      await resolveText('Async');
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Open', 'Async']);
=======
    assertLog(['Open', 'Async']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        <span>Open</span>
        <span>Async</span>
      </>,
    );
  });

  // @gate enableOffscreen
  test("suspending inside currently visible tree that's switching to hidden", async () => {
    const root = ReactNoop.createRoot();

    function Details({open, children}) {
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <span>
            <Text text={open ? 'Open' : 'Closed'} />
          </span>
          <Offscreen mode={open ? 'visible' : 'hidden'}>
            <span>{children}</span>
          </Offscreen>
        </Suspense>
      );
    }

    // Initial mount. Nothing suspends
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(
        <Details open={true}>
          <Text text="(empty)" />
        </Details>,
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Open', '(empty)']);
=======
    assertLog(['Open', '(empty)']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        <span>Open</span>
        <span>(empty)</span>
      </>,
    );

    // Update that suspends inside the currently visible tree
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      startTransition(() => {
        root.render(
          <Details open={true}>
            <AsyncText text="Async" />
          </Details>,
        );
      });
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Open', 'Suspend! [Async]', 'Loading...']);
=======
    assertLog(['Open', 'Suspend! [Async]', 'Loading...']);
>>>>>>> remotes/upstream/main
    // It should suspend with delay to prevent the already-visible Suspense
    // boundary from switching to a fallback
    expect(root).toMatchRenderedOutput(
      <>
        <span>Open</span>
        <span>(empty)</span>
      </>,
    );

    // Update that hides the suspended tree
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      startTransition(() => {
        root.render(
          <Details open={false}>
            <AsyncText text="Async" />
          </Details>,
        );
      });
    });
    // Now the visible part of the tree can commit without being blocked
    // by the suspended content, which is hidden.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Closed', 'Suspend! [Async]']);
=======
    assertLog(['Closed', 'Suspend! [Async]']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        <span>Closed</span>
        <span hidden={true}>(empty)</span>
      </>,
    );

    // Resolve the data and finish rendering
    await act(async () => {
      await resolveText('Async');
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Async']);
=======
    assertLog(['Async']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        <span>Closed</span>
        <span hidden={true}>Async</span>
      </>,
    );
  });

  // @gate experimental || www
  test('update that suspends inside hidden tree', async () => {
    let setText;
    function Child() {
      const [text, _setText] = useState('A');
      setText = _setText;
      return <AsyncText text={text} />;
    }

    function App({show}) {
      return (
        <Offscreen mode={show ? 'visible' : 'hidden'}>
          <span>
            <Child />
          </span>
        </Offscreen>
      );
    }

    const root = ReactNoop.createRoot();
    resolveText('A');
<<<<<<< HEAD
    await act(async () => {
      root.render(<App show={false} />);
    });
    expect(Scheduler).toHaveYielded(['A']);

    await act(async () => {
=======
    await act(() => {
      root.render(<App show={false} />);
    });
    assertLog(['A']);

    await act(() => {
>>>>>>> remotes/upstream/main
      startTransition(() => {
        setText('B');
      });
    });
  });

  // @gate experimental || www
  test('updates at multiple priorities that suspend inside hidden tree', async () => {
    let setText;
    let setStep;
    function Child() {
      const [text, _setText] = useState('A');
      setText = _setText;

      const [step, _setStep] = useState(0);
      setStep = _setStep;

      return <AsyncText text={text + step} />;
    }

    function App({show}) {
      return (
        <Offscreen mode={show ? 'visible' : 'hidden'}>
          <span>
            <Child />
          </span>
        </Offscreen>
      );
    }

    const root = ReactNoop.createRoot();
    resolveText('A0');
<<<<<<< HEAD
    await act(async () => {
      root.render(<App show={false} />);
    });
    expect(Scheduler).toHaveYielded(['A0']);
    expect(root).toMatchRenderedOutput(<span hidden={true}>A0</span>);

    await act(async () => {
      setStep(1);
=======
    await act(() => {
      root.render(<App show={false} />);
    });
    assertLog(['A0']);
    expect(root).toMatchRenderedOutput(<span hidden={true}>A0</span>);

    await act(() => {
      React.startTransition(() => {
        setStep(1);
      });
>>>>>>> remotes/upstream/main
      ReactNoop.flushSync(() => {
        setText('B');
      });
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      // The high priority render suspends again
      'Suspend! [B0]',
      // There's still pending work in another lane, so we should attempt
      // that, too.
      'Suspend! [B1]',
    ]);
    expect(root).toMatchRenderedOutput(<span hidden={true}>A0</span>);

    // Resolve the data and finish rendering
<<<<<<< HEAD
    await act(async () => {
      resolveText('B1');
    });
    expect(Scheduler).toHaveYielded(['B1']);
    expect(root).toMatchRenderedOutput(<span hidden={true}>B1</span>);
  });

  // Only works in new reconciler
=======
    await act(() => {
      resolveText('B1');
    });
    assertLog(['B1']);
    expect(root).toMatchRenderedOutput(<span hidden={true}>B1</span>);
  });

>>>>>>> remotes/upstream/main
  // @gate enableOffscreen
  test('detect updates to a hidden tree during a concurrent event', async () => {
    // This is a pretty complex test case. It relates to how we detect if an
    // update is made to a hidden tree: when scheduling the update, we walk up
    // the fiber return path to see if any of the parents is a hidden Offscreen
    // component. This doesn't work if there's already a render in progress,
    // because the tree might be about to flip to hidden. To avoid a data race,
    // queue updates atomically: wait to queue the update until after the
    // current render has finished.

    let setInner;
    function Child({outer}) {
      const [inner, _setInner] = useState(0);
      setInner = _setInner;

      useEffect(() => {
        // Inner and outer values are always updated simultaneously, so they
        // should always be consistent.
        if (inner !== outer) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
            'Tearing! Inner and outer are inconsistent!',
          );
        } else {
          Scheduler.unstable_yieldValue('Inner and outer are consistent');
=======
          Scheduler.log('Tearing! Inner and outer are inconsistent!');
        } else {
          Scheduler.log('Inner and outer are consistent');
>>>>>>> remotes/upstream/main
        }
      }, [inner, outer]);

      return <Text text={'Inner: ' + inner} />;
    }

    let setOuter;
    function App({show}) {
      const [outer, _setOuter] = useState(0);
      setOuter = _setOuter;
      return (
        <>
<<<<<<< HEAD
          <span>
            <Text text={'Outer: ' + outer} />
          </span>
=======
>>>>>>> remotes/upstream/main
          <Offscreen mode={show ? 'visible' : 'hidden'}>
            <span>
              <Child outer={outer} />
            </span>
          </Offscreen>
<<<<<<< HEAD
          <Suspense fallback={<Text text="Loading..." />}>
            <span>
              <AsyncText text={'Async: ' + outer} />
=======
          <span>
            <Text text={'Outer: ' + outer} />
          </span>
          <Suspense fallback={<Text text="Loading..." />}>
            <span>
              <Text text={'Sibling: ' + outer} />
>>>>>>> remotes/upstream/main
            </span>
          </Suspense>
        </>
      );
    }

    // Render a hidden tree
    const root = ReactNoop.createRoot();
    resolveText('Async: 0');
<<<<<<< HEAD
    await act(async () => {
      root.render(<App show={true} />);
    });
    expect(Scheduler).toHaveYielded([
      'Outer: 0',
      'Inner: 0',
      'Async: 0',
=======
    await act(() => {
      root.render(<App show={true} />);
    });
    assertLog([
      'Inner: 0',
      'Outer: 0',
      'Sibling: 0',
>>>>>>> remotes/upstream/main
      'Inner and outer are consistent',
    ]);
    expect(root).toMatchRenderedOutput(
      <>
<<<<<<< HEAD
        <span>Outer: 0</span>
        <span>Inner: 0</span>
        <span>Async: 0</span>
=======
        <span>Inner: 0</span>
        <span>Outer: 0</span>
        <span>Sibling: 0</span>
>>>>>>> remotes/upstream/main
      </>,
    );

    await act(async () => {
      // Update a value both inside and outside the hidden tree. These values
      // must always be consistent.
<<<<<<< HEAD
      setOuter(1);
      setInner(1);
      // In the same render, also hide the offscreen tree.
      root.render(<App show={false} />);

      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        expect(Scheduler).toFlushUntilNextPaint([
          // The outer update will commit, but the inner update is deferred until
          // a later render.
          'Outer: 1',

          // Something suspended. This means we won't commit immediately; there
          // will be an async gap between render and commit. In this test, we will
          // use this property to schedule a concurrent update. The fact that
          // we're using Suspense to schedule a concurrent update is not directly
          // relevant to the test — we could also use time slicing, but I've
          // chosen to use Suspense the because implementation details of time
          // slicing are more volatile.
          'Suspend! [Async: 1]',

          'Loading...',
        ]);
      } else {
        // When default updates are time sliced, React yields before preparing
        // the fallback.
        expect(Scheduler).toFlushUntilNextPaint([
          'Outer: 1',
          'Suspend! [Async: 1]',
        ]);
        expect(Scheduler).toFlushUntilNextPaint(['Loading...']);
      }
=======
      startTransition(() => {
        setOuter(1);
        setInner(1);
        // In the same render, also hide the offscreen tree.
        root.render(<App show={false} />);
      });

      await waitFor([
        // The outer update will commit, but the inner update is deferred until
        // a later render.
        'Outer: 1',
      ]);
>>>>>>> remotes/upstream/main

      // Assert that we haven't committed quite yet
      expect(root).toMatchRenderedOutput(
        <>
<<<<<<< HEAD
          <span>Outer: 0</span>
          <span>Inner: 0</span>
          <span>Async: 0</span>
=======
          <span>Inner: 0</span>
          <span>Outer: 0</span>
          <span>Sibling: 0</span>
>>>>>>> remotes/upstream/main
        </>,
      );

      // Before the tree commits, schedule a concurrent event. The inner update
      // is to a tree that's just about to be hidden.
<<<<<<< HEAD
      setOuter(2);
      setInner(2);

      // Commit the previous render.
      jest.runAllTimers();
      expect(root).toMatchRenderedOutput(
        <>
          <span>Outer: 1</span>
          <span hidden={true}>Inner: 0</span>
          <span hidden={true}>Async: 0</span>
          Loading...
=======
      startTransition(() => {
        setOuter(2);
        setInner(2);
      });

      // Finish rendering and commit the in-progress render.
      await waitForPaint(['Sibling: 1']);
      expect(root).toMatchRenderedOutput(
        <>
          <span hidden={true}>Inner: 0</span>
          <span>Outer: 1</span>
          <span>Sibling: 1</span>
>>>>>>> remotes/upstream/main
        </>,
      );

      // Now reveal the hidden tree at high priority.
      ReactNoop.flushSync(() => {
        root.render(<App show={true} />);
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Outer: 1',

=======
      assertLog([
>>>>>>> remotes/upstream/main
        // There are two pending updates on Inner, but only the first one
        // is processed, even though they share the same lane. If the second
        // update were erroneously processed, then Inner would be inconsistent
        // with Outer.
        'Inner: 1',
<<<<<<< HEAD

        'Suspend! [Async: 1]',
        'Loading...',
        'Inner and outer are consistent',
      ]);
    });
    expect(Scheduler).toHaveYielded([
      'Outer: 2',
      'Inner: 2',
      'Suspend! [Async: 2]',
      'Loading...',
=======
        'Outer: 1',
        'Sibling: 1',
        'Inner and outer are consistent',
      ]);
    });
    assertLog([
      'Inner: 2',
      'Outer: 2',
      'Sibling: 2',
>>>>>>> remotes/upstream/main
      'Inner and outer are consistent',
    ]);
    expect(root).toMatchRenderedOutput(
      <>
<<<<<<< HEAD
        <span>Outer: 2</span>
        <span>Inner: 2</span>
        <span hidden={true}>Async: 0</span>
        Loading...
=======
        <span>Inner: 2</span>
        <span>Outer: 2</span>
        <span>Sibling: 2</span>
>>>>>>> remotes/upstream/main
      </>,
    );
  });
});
