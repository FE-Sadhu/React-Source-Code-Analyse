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
let Suspense;
let useState;
let useLayoutEffect;
let useTransition;
let startTransition;
let act;
let getCacheForType;
<<<<<<< HEAD
=======
let waitForAll;
let waitFor;
let waitForPaint;
let assertLog;
>>>>>>> remotes/upstream/main

let caches;
let seededCache;

describe('ReactTransition', () => {
  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
    useState = React.useState;
    useLayoutEffect = React.useLayoutEffect;
    useTransition = React.useTransition;
    Suspense = React.Suspense;
    startTransition = React.startTransition;
    getCacheForType = React.unstable_getCacheForType;
<<<<<<< HEAD
    act = require('jest-react').act;
=======
    act = require('internal-test-utils').act;

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitFor = InternalTestUtils.waitFor;
    waitForPaint = InternalTestUtils.waitForPaint;
    assertLog = InternalTestUtils.assertLog;
>>>>>>> remotes/upstream/main

    caches = [];
    seededCache = null;
  });

  function createTextCache() {
    if (seededCache !== null) {
      // Trick to seed a cache before it exists.
      // TODO: Need a built-in API to seed data before the initial render (i.e.
      // not a refresh because nothing has mounted yet).
      const cache = seededCache;
      seededCache = null;
      return cache;
    }

    const data = new Map();
    const version = caches.length + 1;
    const cache = {
      version,
      data,
      resolve(text) {
        const record = data.get(text);
        if (record === undefined) {
          const newRecord = {
            status: 'resolved',
            value: text,
          };
          data.set(text, newRecord);
        } else if (record.status === 'pending') {
          const thenable = record.value;
          record.status = 'resolved';
          record.value = text;
          thenable.pings.forEach(t => t());
        }
      },
      reject(text, error) {
        const record = data.get(text);
        if (record === undefined) {
          const newRecord = {
            status: 'rejected',
            value: error,
          };
          data.set(text, newRecord);
        } else if (record.status === 'pending') {
          const thenable = record.value;
          record.status = 'rejected';
          record.value = error;
          thenable.pings.forEach(t => t());
        }
      },
    };
    caches.push(cache);
    return cache;
  }

  function readText(text) {
    const textCache = getCacheForType(createTextCache);
    const record = textCache.data.get(text);
    if (record !== undefined) {
      switch (record.status) {
        case 'pending':
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
          throw record.value;
        case 'rejected':
          Scheduler.unstable_yieldValue(`Error! [${text}]`);
=======
          Scheduler.log(`Suspend! [${text}]`);
          throw record.value;
        case 'rejected':
          Scheduler.log(`Error! [${text}]`);
>>>>>>> remotes/upstream/main
          throw record.value;
        case 'resolved':
          return textCache.version;
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
      textCache.data.set(text, newRecord);

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

  function seedNextTextCache(text) {
    if (seededCache === null) {
      seededCache = createTextCache();
    }
    seededCache.resolve(text);
  }

  function resolveText(text) {
    if (caches.length === 0) {
      throw Error('Cache does not exist.');
    } else {
      // Resolve the most recently created cache. An older cache can by
      // resolved with `caches[index].resolve(text)`.
      caches[caches.length - 1].resolve(text);
    }
  }

<<<<<<< HEAD
  // @gate enableCache
=======
  // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
  test('isPending works even if called from outside an input event', async () => {
    let start;
    function App() {
      const [show, setShow] = useState(false);
      const [isPending, _start] = useTransition();
      start = () => _start(() => setShow(true));
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          {isPending ? <Text text="Pending..." /> : null}
          {show ? <AsyncText text="Async" /> : <Text text="(empty)" />}
        </Suspense>
      );
    }

    const root = ReactNoop.createRoot();

<<<<<<< HEAD
    await act(async () => {
      root.render(<App />);
    });
    expect(Scheduler).toHaveYielded(['(empty)']);
=======
    await act(() => {
      root.render(<App />);
    });
    assertLog(['(empty)']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('(empty)');

    await act(async () => {
      start();

<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        'Pending...',
        '(empty)',
        'Suspend! [Async]',
        'Loading...',
      ]);

      expect(root).toMatchRenderedOutput('Pending...(empty)');

      await resolveText('Async');
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Async']);
    expect(root).toMatchRenderedOutput('Async');
  });

  // @gate enableCache
=======
    assertLog(['Async']);
    expect(root).toMatchRenderedOutput('Async');
  });

  // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
  test(
    'when multiple transitions update the same queue, only the most recent ' +
      'one is allowed to finish (no intermediate states)',
    async () => {
      let update;
      function App() {
        const [isContentPending, startContentChange] = useTransition();
        const [label, setLabel] = useState('A');
        const [contents, setContents] = useState('A');
        update = value => {
          ReactNoop.discreteUpdates(() => {
            setLabel(value);
            startContentChange(() => {
              setContents(value);
            });
          });
        };
        return (
          <>
            <Text
              text={
                label + ' label' + (isContentPending ? ' (loading...)' : '')
              }
            />
            <div>
              <Suspense fallback={<Text text="Loading..." />}>
                <AsyncText text={contents + ' content'} />
              </Suspense>
            </div>
          </>
        );
      }

      // Initial render
      const root = ReactNoop.createRoot();
<<<<<<< HEAD
      await act(async () => {
        seedNextTextCache('A content');
        root.render(<App />);
      });
      expect(Scheduler).toHaveYielded(['A label', 'A content']);
=======
      await act(() => {
        seedNextTextCache('A content');
        root.render(<App />);
      });
      assertLog(['A label', 'A content']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(
        <>
          A label<div>A content</div>
        </>,
      );

      // Switch to B
<<<<<<< HEAD
      await act(async () => {
        update('B');
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        update('B');
      });
      assertLog([
>>>>>>> remotes/upstream/main
        // Commit pending state
        'B label (loading...)',
        'A content',

        // Attempt to render B, but it suspends
        'B label',
        'Suspend! [B content]',
        'Loading...',
      ]);
      // This is a refresh transition so it shouldn't show a fallback
      expect(root).toMatchRenderedOutput(
        <>
          B label (loading...)<div>A content</div>
        </>,
      );

      // Before B finishes loading, switch to C
<<<<<<< HEAD
      await act(async () => {
        update('C');
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        update('C');
      });
      assertLog([
>>>>>>> remotes/upstream/main
        // Commit pending state
        'C label (loading...)',
        'A content',

        // Attempt to render C, but it suspends
        'C label',
        'Suspend! [C content]',
        'Loading...',
      ]);
      expect(root).toMatchRenderedOutput(
        <>
          C label (loading...)<div>A content</div>
        </>,
      );

      // Finish loading B. But we're not allowed to render B because it's
      // entangled with C. So we're still pending.
<<<<<<< HEAD
      await act(async () => {
        resolveText('B content');
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        resolveText('B content');
      });
      assertLog([
>>>>>>> remotes/upstream/main
        // Attempt to render C, but it suspends
        'C label',
        'Suspend! [C content]',
        'Loading...',
      ]);
      expect(root).toMatchRenderedOutput(
        <>
          C label (loading...)<div>A content</div>
        </>,
      );

      // Now finish loading C. This is the terminal update, so it can finish.
<<<<<<< HEAD
      await act(async () => {
        resolveText('C content');
      });
      expect(Scheduler).toHaveYielded(['C label', 'C content']);
=======
      await act(() => {
        resolveText('C content');
      });
      assertLog(['C label', 'C content']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(
        <>
          C label<div>C content</div>
        </>,
      );
    },
  );

  // Same as previous test, but for class update queue.
<<<<<<< HEAD
  // @gate enableCache
=======
  // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
  test(
    'when multiple transitions update the same queue, only the most recent ' +
      'one is allowed to finish (no intermediate states) (classes)',
    async () => {
      let update;
      class App extends React.Component {
        state = {
          label: 'A',
          contents: 'A',
        };
        render() {
          update = value => {
            ReactNoop.discreteUpdates(() => {
              this.setState({label: value});
              startTransition(() => {
                this.setState({contents: value});
              });
            });
          };
          const label = this.state.label;
          const contents = this.state.contents;
          const isContentPending = label !== contents;
          return (
            <>
              <Text
                text={
                  label + ' label' + (isContentPending ? ' (loading...)' : '')
                }
              />
              <div>
                <Suspense fallback={<Text text="Loading..." />}>
                  <AsyncText text={contents + ' content'} />
                </Suspense>
              </div>
            </>
          );
        }
      }

      // Initial render
      const root = ReactNoop.createRoot();
<<<<<<< HEAD
      await act(async () => {
        seedNextTextCache('A content');
        root.render(<App />);
      });
      expect(Scheduler).toHaveYielded(['A label', 'A content']);
=======
      await act(() => {
        seedNextTextCache('A content');
        root.render(<App />);
      });
      assertLog(['A label', 'A content']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(
        <>
          A label<div>A content</div>
        </>,
      );

      // Switch to B
<<<<<<< HEAD
      await act(async () => {
        update('B');
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        update('B');
      });
      assertLog([
>>>>>>> remotes/upstream/main
        // Commit pending state
        'B label (loading...)',
        'A content',

        // Attempt to render B, but it suspends
        'B label',
        'Suspend! [B content]',
        'Loading...',
      ]);
      // This is a refresh transition so it shouldn't show a fallback
      expect(root).toMatchRenderedOutput(
        <>
          B label (loading...)<div>A content</div>
        </>,
      );

      // Before B finishes loading, switch to C
<<<<<<< HEAD
      await act(async () => {
        update('C');
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        update('C');
      });
      assertLog([
>>>>>>> remotes/upstream/main
        // Commit pending state
        'C label (loading...)',
        'A content',

        // Attempt to render C, but it suspends
        'C label',
        'Suspend! [C content]',
        'Loading...',
      ]);
      expect(root).toMatchRenderedOutput(
        <>
          C label (loading...)<div>A content</div>
        </>,
      );

      // Finish loading B. But we're not allowed to render B because it's
      // entangled with C. So we're still pending.
<<<<<<< HEAD
      await act(async () => {
        resolveText('B content');
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        resolveText('B content');
      });
      assertLog([
>>>>>>> remotes/upstream/main
        // Attempt to render C, but it suspends
        'C label',
        'Suspend! [C content]',
        'Loading...',
      ]);
      expect(root).toMatchRenderedOutput(
        <>
          C label (loading...)<div>A content</div>
        </>,
      );

      // Now finish loading C. This is the terminal update, so it can finish.
<<<<<<< HEAD
      await act(async () => {
        resolveText('C content');
      });
      expect(Scheduler).toHaveYielded(['C label', 'C content']);
=======
      await act(() => {
        resolveText('C content');
      });
      assertLog(['C label', 'C content']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(
        <>
          C label<div>C content</div>
        </>,
      );
    },
  );

<<<<<<< HEAD
  // @gate enableCache
=======
  // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
  test(
    'when multiple transitions update overlapping queues, all the transitions ' +
      'across all the queues are entangled',
    async () => {
      let setShowA;
      let setShowB;
      let setShowC;
      function App() {
        const [showA, _setShowA] = useState(false);
        const [showB, _setShowB] = useState(false);
        const [showC, _setShowC] = useState(false);
        setShowA = _setShowA;
        setShowB = _setShowB;
        setShowC = _setShowC;

        // Only one of these children should be visible at a time. Except
        // instead of being modeled as a single state, it's three separate
        // states that are updated simultaneously. This may seem a bit
        // contrived, but it's more common than you might think. Usually via
        // a framework or indirection. For example, consider a tooltip manager
        // that only shows a single tooltip at a time. Or a router that
        // highlights links to the active route.
        return (
          <>
            <Suspense fallback={<Text text="Loading..." />}>
              {showA ? <AsyncText text="A" /> : null}
              {showB ? <AsyncText text="B" /> : null}
              {showC ? <AsyncText text="C" /> : null}
            </Suspense>
          </>
        );
      }

      // Initial render. Start with all children hidden.
      const root = ReactNoop.createRoot();
<<<<<<< HEAD
      await act(async () => {
        root.render(<App />);
      });
      expect(Scheduler).toHaveYielded([]);
      expect(root).toMatchRenderedOutput(null);

      // Switch to A.
      await act(async () => {
=======
      await act(() => {
        root.render(<App />);
      });
      assertLog([]);
      expect(root).toMatchRenderedOutput(null);

      // Switch to A.
      await act(() => {
>>>>>>> remotes/upstream/main
        startTransition(() => {
          setShowA(true);
        });
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [A]', 'Loading...']);
      expect(root).toMatchRenderedOutput(null);

      // Before A loads, switch to B. This should entangle A with B.
      await act(async () => {
=======
      assertLog(['Suspend! [A]', 'Loading...']);
      expect(root).toMatchRenderedOutput(null);

      // Before A loads, switch to B. This should entangle A with B.
      await act(() => {
>>>>>>> remotes/upstream/main
        startTransition(() => {
          setShowA(false);
          setShowB(true);
        });
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [B]', 'Loading...']);
=======
      assertLog(['Suspend! [B]', 'Loading...']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(null);

      // Before A or B loads, switch to C. This should entangle C with B, and
      // transitively entangle C with A.
<<<<<<< HEAD
      await act(async () => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        startTransition(() => {
          setShowB(false);
          setShowC(true);
        });
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [C]', 'Loading...']);
=======
      assertLog(['Suspend! [C]', 'Loading...']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(null);

      // Now the data starts resolving out of order.

      // First resolve B. This will attempt to render C, since everything is
      // entangled.
<<<<<<< HEAD
      await act(async () => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        startTransition(() => {
          resolveText('B');
        });
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [C]', 'Loading...']);
=======
      assertLog(['Suspend! [C]', 'Loading...']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(null);

      // Now resolve A. Again, this will attempt to render C, since everything
      // is entangled.
<<<<<<< HEAD
      await act(async () => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        startTransition(() => {
          resolveText('A');
        });
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['Suspend! [C]', 'Loading...']);
      expect(root).toMatchRenderedOutput(null);

      // Finally, resolve C. This time we can finish.
      await act(async () => {
=======
      assertLog(['Suspend! [C]', 'Loading...']);
      expect(root).toMatchRenderedOutput(null);

      // Finally, resolve C. This time we can finish.
      await act(() => {
>>>>>>> remotes/upstream/main
        startTransition(() => {
          resolveText('C');
        });
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['C']);
=======
      assertLog(['C']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput('C');
    },
  );

<<<<<<< HEAD
  // @gate enableCache
  test('interrupt a refresh transition if a new transition is scheduled', async () => {
    const root = ReactNoop.createRoot();

    await act(async () => {
=======
  // @gate enableLegacyCache
  test('interrupt a refresh transition if a new transition is scheduled', async () => {
    const root = ReactNoop.createRoot();

    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(
        <>
          <Suspense fallback={<Text text="Loading..." />} />
          <Text text="Initial" />
        </>,
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Initial']);
=======
    assertLog(['Initial']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Initial');

    await act(async () => {
      // Start a refresh transition
      startTransition(() => {
        root.render(
          <>
            <Suspense fallback={<Text text="Loading..." />}>
              <AsyncText text="Async" />
            </Suspense>
            <Text text="After Suspense" />
            <Text text="Sibling" />
          </>,
        );
      });

      // Partially render it.
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYieldThrough([
=======
      await waitFor([
>>>>>>> remotes/upstream/main
        // Once we the update suspends, we know it's a refresh transition,
        // because the Suspense boundary has already mounted.
        'Suspend! [Async]',
        'Loading...',
        'After Suspense',
      ]);

      // Schedule a new transition
      startTransition(async () => {
        root.render(
          <>
            <Suspense fallback={<Text text="Loading..." />} />
            <Text text="Updated" />
          </>,
        );
      });
    });

    // Because the first one is going to suspend regardless, we should
    // immediately switch to rendering the new transition.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Updated']);
    expect(root).toMatchRenderedOutput('Updated');
  });

  // @gate enableCache
=======
    assertLog(['Updated']);
    expect(root).toMatchRenderedOutput('Updated');
  });

  // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
  test(
    "interrupt a refresh transition when something suspends and we've " +
      'already bailed out on another transition in a parent',
    async () => {
      let setShouldSuspend;

      function Parent({children}) {
        const [shouldHideInParent, _setShouldHideInParent] = useState(false);
        setShouldHideInParent = _setShouldHideInParent;
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'shouldHideInParent: ' + shouldHideInParent,
        );
=======
        Scheduler.log('shouldHideInParent: ' + shouldHideInParent);
>>>>>>> remotes/upstream/main
        if (shouldHideInParent) {
          return <Text text="(empty)" />;
        }
        return children;
      }

      let setShouldHideInParent;
      function App() {
        const [shouldSuspend, _setShouldSuspend] = useState(false);
        setShouldSuspend = _setShouldSuspend;
        return (
          <>
            <Text text="A" />
            <Parent>
              <Suspense fallback={<Text text="Loading..." />}>
                {shouldSuspend ? <AsyncText text="Async" /> : null}
              </Suspense>
            </Parent>
            <Text text="B" />
            <Text text="C" />
          </>
        );
      }

      const root = ReactNoop.createRoot();

      await act(async () => {
        root.render(<App />);
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
          'A',
          'shouldHideInParent: false',
          'B',
          'C',
        ]);
=======
        await waitForAll(['A', 'shouldHideInParent: false', 'B', 'C']);
>>>>>>> remotes/upstream/main
        expect(root).toMatchRenderedOutput('ABC');

        // Schedule an update
        startTransition(() => {
          setShouldSuspend(true);
        });

        // Now we need to trigger schedule another transition in a different
        // lane from the first one. At the time this was written, all transitions are worked on
        // simultaneously, unless a transition was already in progress when a
        // new one was scheduled. So, partially render the first transition.
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYieldThrough(['A']);
=======
        await waitFor(['A']);
>>>>>>> remotes/upstream/main

        // Now schedule a second transition. We won't interrupt the first one.
        React.startTransition(() => {
          setShouldHideInParent(true);
        });
        // Continue rendering the first transition.
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYieldThrough([
=======
        await waitFor([
>>>>>>> remotes/upstream/main
          'shouldHideInParent: false',
          'Suspend! [Async]',
          'Loading...',
          'B',
        ]);
        // Should not have committed loading state
        expect(root).toMatchRenderedOutput('ABC');

        // At this point, we've processed the parent update queue, so we know
        // that it has a pending update from the second transition, even though
        // we skipped it during this render. And we know this is a refresh
        // transition, because we had to render a loading state. So the next
        // time we re-enter the work loop (we don't interrupt immediately, we
        // just wait for the next time slice), we should throw out the
        // suspended first transition and try the second one.
<<<<<<< HEAD
        expect(Scheduler).toFlushUntilNextPaint([
          'shouldHideInParent: true',
          '(empty)',
        ]);
=======
        await waitForPaint(['shouldHideInParent: true', '(empty)']);
>>>>>>> remotes/upstream/main
        expect(root).toMatchRenderedOutput('A(empty)BC');

        // Since the two transitions are not entangled, we then later go back
        // and finish retry the first transition. Not really relevant to this
        // test but I'll assert the result anyway.
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
=======
        await waitForAll([
>>>>>>> remotes/upstream/main
          'A',
          'shouldHideInParent: true',
          '(empty)',
          'B',
          'C',
        ]);
        expect(root).toMatchRenderedOutput('A(empty)BC');
      });
    },
  );

<<<<<<< HEAD
  // @gate enableCache
=======
  // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
  test(
    'interrupt a refresh transition when something suspends and a parent ' +
      'component received an interleaved update after its queue was processed',
    async () => {
      // Title is confusing so I'll try to explain further: This is similar to
      // the previous test, except instead of skipped over a transition update
      // in a parent, the parent receives an interleaved update *after* its
      // begin phase has already finished.

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

      const root = ReactNoop.createRoot();

<<<<<<< HEAD
      await act(async () => {
        root.render(<App shouldSuspend={false} step={0} />);
      });
      expect(Scheduler).toHaveYielded(['A0', 'B0', 'C0']);
=======
      await act(() => {
        root.render(<App shouldSuspend={false} step={0} />);
      });
      assertLog(['A0', 'B0', 'C0']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput('A0B0C0');

      await act(async () => {
        // This update will suspend.
        startTransition(() => {
          root.render(<App shouldSuspend={true} step={1} />);
        });
        // Flush past the root, but stop before the async component.
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYieldThrough(['A1']);
=======
        await waitFor(['A1']);
>>>>>>> remotes/upstream/main

        // Schedule another transition on the root, which already completed.
        startTransition(() => {
          root.render(<App shouldSuspend={false} step={2} />);
        });
        // We'll keep working on the first update.
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYieldThrough([
=======
        await waitFor([
>>>>>>> remotes/upstream/main
          // Now the async component suspends
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
      });
    },
  );

  it('should render normal pri updates scheduled after transitions before transitions', async () => {
    let updateTransitionPri;
    let updateNormalPri;
    function App() {
      const [normalPri, setNormalPri] = useState(0);
      const [transitionPri, setTransitionPri] = useState(0);
      updateTransitionPri = () =>
        startTransition(() => setTransitionPri(n => n + 1));
      updateNormalPri = () => setNormalPri(n => n + 1);

      useLayoutEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Commit');
=======
        Scheduler.log('Commit');
>>>>>>> remotes/upstream/main
      });

      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <Text text={'Transition pri: ' + transitionPri} />
          {', '}
          <Text text={'Normal pri: ' + normalPri} />
        </Suspense>
      );
    }

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<App />);
    });

    // Initial render.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      'Transition pri: 0',
      'Normal pri: 0',
      'Commit',
    ]);
    expect(root).toMatchRenderedOutput('Transition pri: 0, Normal pri: 0');

    await act(async () => {
=======
    assertLog(['Transition pri: 0', 'Normal pri: 0', 'Commit']);
    expect(root).toMatchRenderedOutput('Transition pri: 0, Normal pri: 0');

    await act(() => {
>>>>>>> remotes/upstream/main
      updateTransitionPri();
      updateNormalPri();
    });

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      // Normal update first.
      'Transition pri: 0',
      'Normal pri: 1',
      'Commit',

      // Then transition update.
      'Transition pri: 1',
      'Normal pri: 1',
      'Commit',
    ]);
    expect(root).toMatchRenderedOutput('Transition pri: 1, Normal pri: 1');
  });

<<<<<<< HEAD
  // @gate enableCache
=======
  // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
  it('should render normal pri updates before transition suspense retries', async () => {
    let updateTransitionPri;
    let updateNormalPri;
    function App() {
      const [transitionPri, setTransitionPri] = useState(false);
      const [normalPri, setNormalPri] = useState(0);

      updateTransitionPri = () => startTransition(() => setTransitionPri(true));
      updateNormalPri = () => setNormalPri(n => n + 1);

      useLayoutEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Commit');
=======
        Scheduler.log('Commit');
>>>>>>> remotes/upstream/main
      });

      return (
        <Suspense fallback={<Text text="Loading..." />}>
          {transitionPri ? <AsyncText text="Async" /> : <Text text="(empty)" />}
          {', '}
          <Text text={'Normal pri: ' + normalPri} />
        </Suspense>
      );
    }

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<App />);
    });

    // Initial render.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['(empty)', 'Normal pri: 0', 'Commit']);
    expect(root).toMatchRenderedOutput('(empty), Normal pri: 0');

    await act(async () => {
      updateTransitionPri();
    });

    expect(Scheduler).toHaveYielded([
      // Suspend.
      'Suspend! [Async]',
      'Normal pri: 0',
=======
    assertLog(['(empty)', 'Normal pri: 0', 'Commit']);
    expect(root).toMatchRenderedOutput('(empty), Normal pri: 0');

    await act(() => {
      updateTransitionPri();
    });

    assertLog([
      // Suspend.
      'Suspend! [Async]',
>>>>>>> remotes/upstream/main
      'Loading...',
    ]);
    expect(root).toMatchRenderedOutput('(empty), Normal pri: 0');

    await act(async () => {
      await resolveText('Async');
      updateNormalPri();
    });

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      // Normal pri update.
      '(empty)',
      'Normal pri: 1',
      'Commit',

      // Promise resolved, retry flushed.
      'Async',
      'Normal pri: 1',
      'Commit',
    ]);
    expect(root).toMatchRenderedOutput('Async, Normal pri: 1');
  });

  it('should not interrupt transitions with normal pri updates', async () => {
    let updateNormalPri;
    let updateTransitionPri;
    function App() {
      const [transitionPri, setTransitionPri] = useState(0);
      const [normalPri, setNormalPri] = useState(0);
      updateTransitionPri = () =>
        startTransition(() => setTransitionPri(n => n + 1));
      updateNormalPri = () => setNormalPri(n => n + 1);

      useLayoutEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Commit');
=======
        Scheduler.log('Commit');
>>>>>>> remotes/upstream/main
      });
      return (
        <>
          <Text text={'Transition pri: ' + transitionPri} />
          {', '}
          <Text text={'Normal pri: ' + normalPri} />
        </>
      );
    }

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
      root.render(<App />);
    });
    expect(Scheduler).toHaveYielded([
      'Transition pri: 0',
      'Normal pri: 0',
      'Commit',
    ]);
=======
    await act(() => {
      root.render(<App />);
    });
    assertLog(['Transition pri: 0', 'Normal pri: 0', 'Commit']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Transition pri: 0, Normal pri: 0');

    await act(async () => {
      updateTransitionPri();

<<<<<<< HEAD
      expect(Scheduler).toFlushAndYieldThrough([
=======
      await waitFor([
>>>>>>> remotes/upstream/main
        // Start transition update.
        'Transition pri: 1',
      ]);

      // Schedule normal pri update during transition update.
      // This should not interrupt.
      updateNormalPri();
    });

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      // Finish transition update.
      'Normal pri: 0',
      'Commit',

      // Normal pri update.
      'Transition pri: 1',
      'Normal pri: 1',
      'Commit',
    ]);

    expect(root).toMatchRenderedOutput('Transition pri: 1, Normal pri: 1');
  });
=======
    if (gate(flags => flags.enableUnifiedSyncLane)) {
      assertLog([
        'Normal pri: 0',
        'Commit',

        // Normal pri update.
        'Transition pri: 1',
        'Normal pri: 1',
        'Commit',
      ]);
    } else {
      assertLog([
        // Finish transition update.
        'Normal pri: 0',
        'Commit',

        // Normal pri update.
        'Transition pri: 1',
        'Normal pri: 1',
        'Commit',
      ]);
    }

    expect(root).toMatchRenderedOutput('Transition pri: 1, Normal pri: 1');
  });

  it('tracks two pending flags for nested startTransition (#26226)', async () => {
    let update;
    function App() {
      const [isPendingA, startTransitionA] = useTransition();
      const [isPendingB, startTransitionB] = useTransition();
      const [state, setState] = useState(0);

      update = function () {
        startTransitionA(() => {
          startTransitionB(() => {
            setState(1);
          });
        });
      };

      return (
        <>
          <Text text={state} />
          {', '}
          <Text text={'A ' + isPendingA} />
          {', '}
          <Text text={'B ' + isPendingB} />
        </>
      );
    }
    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App />);
    });
    assertLog([0, 'A false', 'B false']);
    expect(root).toMatchRenderedOutput('0, A false, B false');

    await act(async () => {
      update();
    });
    assertLog([0, 'A true', 'B true', 1, 'A false', 'B false']);
    expect(root).toMatchRenderedOutput('1, A false, B false');
  });
>>>>>>> remotes/upstream/main
});
