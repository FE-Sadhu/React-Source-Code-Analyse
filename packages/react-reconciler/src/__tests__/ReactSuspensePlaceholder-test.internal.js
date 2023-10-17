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

let Profiler;
let React;
let ReactNoop;
let Scheduler;
let ReactFeatureFlags;
let ReactCache;
let Suspense;
let TextResource;
let textResourceShouldFail;
<<<<<<< HEAD
=======
let waitForAll;
let assertLog;
let act;
>>>>>>> remotes/upstream/main

describe('ReactSuspensePlaceholder', () => {
  beforeEach(() => {
    jest.resetModules();

    ReactFeatureFlags = require('shared/ReactFeatureFlags');

    ReactFeatureFlags.enableProfilerTimer = true;
    ReactFeatureFlags.replayFailedUnitOfWorkWithInvokeGuardedCallback = false;
    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
    ReactCache = require('react-cache');

    Profiler = React.Profiler;
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
<<<<<<< HEAD
                      Scheduler.unstable_yieldValue(
                        `Promise rejected [${text}]`,
                      );
=======
                      Scheduler.log(`Promise rejected [${text}]`);
>>>>>>> remotes/upstream/main
                      status = 'rejected';
                      value = new Error('Failed to load: ' + text);
                      listeners.forEach(listener => listener.reject(value));
                    } else {
<<<<<<< HEAD
                      Scheduler.unstable_yieldValue(
                        `Promise resolved [${text}]`,
                      );
=======
                      Scheduler.log(`Promise resolved [${text}]`);
>>>>>>> remotes/upstream/main
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

  function Text({fakeRenderDuration = 0, text = 'Text'}) {
    Scheduler.unstable_advanceTime(fakeRenderDuration);
<<<<<<< HEAD
    Scheduler.unstable_yieldValue(text);
=======
    Scheduler.log(text);
>>>>>>> remotes/upstream/main
    return text;
  }

  function AsyncText({fakeRenderDuration = 0, ms, text}) {
    Scheduler.unstable_advanceTime(fakeRenderDuration);
    try {
      TextResource.read([text, ms]);
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
      return text;
    } catch (promise) {
      if (typeof promise.then === 'function') {
        Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
      } else {
        Scheduler.unstable_yieldValue(`Error! [${text}]`);
=======
      Scheduler.log(text);
      return text;
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
  it('times out children that are already hidden', () => {
    class HiddenText extends React.PureComponent {
      render() {
        const text = this.props.text;
        Scheduler.unstable_yieldValue(text);
=======
  it('times out children that are already hidden', async () => {
    class HiddenText extends React.PureComponent {
      render() {
        const text = this.props.text;
        Scheduler.log(text);
>>>>>>> remotes/upstream/main
        return <span hidden={true}>{text}</span>;
      }
    }

    function App(props) {
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <HiddenText text="A" />
          <span>
            <AsyncText ms={1000} text={props.middleText} />
          </span>
          <span>
            <Text text="C" />
          </span>
        </Suspense>
      );
    }

    // Initial mount
    ReactNoop.render(<App middleText="B" />);

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['A', 'Suspend! [B]', 'C', 'Loading...']);
    expect(ReactNoop).toMatchRenderedOutput('Loading...');

    jest.advanceTimersByTime(1000);
    expect(Scheduler).toHaveYielded(['Promise resolved [B]']);

    expect(Scheduler).toFlushAndYield(['A', 'B', 'C']);
=======
    await waitForAll(['A', 'Suspend! [B]', 'Loading...']);
    expect(ReactNoop).toMatchRenderedOutput('Loading...');

    await act(() => jest.advanceTimersByTime(1000));
    assertLog(['Promise resolved [B]', 'A', 'B', 'C']);
>>>>>>> remotes/upstream/main

    expect(ReactNoop).toMatchRenderedOutput(
      <>
        <span hidden={true}>A</span>
        <span>B</span>
        <span>C</span>
      </>,
    );

    // Update
    ReactNoop.render(<App middleText="B2" />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Suspend! [B2]', 'C', 'Loading...']);

    // Time out the update
    jest.advanceTimersByTime(750);
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll(['Suspend! [B2]', 'Loading...']);

    // Time out the update
    jest.advanceTimersByTime(750);
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(ReactNoop).toMatchRenderedOutput(
      <>
        <span hidden={true}>A</span>
        <span hidden={true}>B</span>
        <span hidden={true}>C</span>
        Loading...
      </>,
    );

    // Resolve the promise
<<<<<<< HEAD
    jest.advanceTimersByTime(1000);
    expect(Scheduler).toHaveYielded(['Promise resolved [B2]']);
    expect(Scheduler).toFlushAndYield(['B2', 'C']);
=======
    await act(() => jest.advanceTimersByTime(1000));
    assertLog(['Promise resolved [B2]', 'B2', 'C']);
>>>>>>> remotes/upstream/main

    // Render the final update. A should still be hidden, because it was
    // given a `hidden` prop.
    expect(ReactNoop).toMatchRenderedOutput(
      <>
        <span hidden={true}>A</span>
        <span>B2</span>
        <span>C</span>
      </>,
    );
  });

  it('times out text nodes', async () => {
    function App(props) {
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <Text text="A" />
          <AsyncText ms={1000} text={props.middleText} />
          <Text text="C" />
        </Suspense>
      );
    }

    // Initial mount
    ReactNoop.render(<App middleText="B" />);

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['A', 'Suspend! [B]', 'C', 'Loading...']);

    expect(ReactNoop).not.toMatchRenderedOutput('ABC');

    jest.advanceTimersByTime(1000);
    expect(Scheduler).toHaveYielded(['Promise resolved [B]']);
    expect(Scheduler).toFlushAndYield(['A', 'B', 'C']);
=======
    await waitForAll(['A', 'Suspend! [B]', 'Loading...']);

    expect(ReactNoop).not.toMatchRenderedOutput('ABC');

    await act(() => jest.advanceTimersByTime(1000));
    assertLog(['Promise resolved [B]', 'A', 'B', 'C']);
>>>>>>> remotes/upstream/main
    expect(ReactNoop).toMatchRenderedOutput('ABC');

    // Update
    ReactNoop.render(<App middleText="B2" />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'A',
      'Suspend! [B2]',
      'C',
      'Loading...',
    ]);
    // Time out the update
    jest.advanceTimersByTime(750);
    expect(Scheduler).toFlushAndYield([]);
    expect(ReactNoop).toMatchRenderedOutput('Loading...');

    // Resolve the promise
    jest.advanceTimersByTime(1000);
    expect(Scheduler).toHaveYielded(['Promise resolved [B2]']);
    expect(Scheduler).toFlushAndYield(['A', 'B2', 'C']);
=======
    await waitForAll(['A', 'Suspend! [B2]', 'Loading...']);
    // Time out the update
    jest.advanceTimersByTime(750);
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput('Loading...');

    // Resolve the promise
    await act(() => jest.advanceTimersByTime(1000));
    assertLog(['Promise resolved [B2]', 'A', 'B2', 'C']);
>>>>>>> remotes/upstream/main

    // Render the final update. A should still be hidden, because it was
    // given a `hidden` prop.
    expect(ReactNoop).toMatchRenderedOutput('AB2C');
  });

<<<<<<< HEAD
  it('preserves host context for text nodes', () => {
=======
  it('preserves host context for text nodes', async () => {
>>>>>>> remotes/upstream/main
    function App(props) {
      return (
        // uppercase is a special type that causes React Noop to render child
        // text nodes as uppercase.
        <uppercase>
          <Suspense fallback={<Text text="Loading..." />}>
            <Text text="a" />
            <AsyncText ms={1000} text={props.middleText} />
            <Text text="c" />
          </Suspense>
        </uppercase>
      );
    }

    // Initial mount
    ReactNoop.render(<App middleText="b" />);

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['a', 'Suspend! [b]', 'c', 'Loading...']);

    expect(ReactNoop).toMatchRenderedOutput(<uppercase>LOADING...</uppercase>);

    jest.advanceTimersByTime(1000);
    expect(Scheduler).toHaveYielded(['Promise resolved [b]']);
    expect(Scheduler).toFlushAndYield(['a', 'b', 'c']);
=======
    await waitForAll(['a', 'Suspend! [b]', 'Loading...']);

    expect(ReactNoop).toMatchRenderedOutput(<uppercase>LOADING...</uppercase>);

    await act(() => jest.advanceTimersByTime(1000));
    assertLog(['Promise resolved [b]', 'a', 'b', 'c']);
>>>>>>> remotes/upstream/main
    expect(ReactNoop).toMatchRenderedOutput(<uppercase>ABC</uppercase>);

    // Update
    ReactNoop.render(<App middleText="b2" />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'a',
      'Suspend! [b2]',
      'c',
      'Loading...',
    ]);
    // Time out the update
    jest.advanceTimersByTime(750);
    expect(Scheduler).toFlushAndYield([]);
    expect(ReactNoop).toMatchRenderedOutput(<uppercase>LOADING...</uppercase>);

    // Resolve the promise
    jest.advanceTimersByTime(1000);
    expect(Scheduler).toHaveYielded(['Promise resolved [b2]']);
    expect(Scheduler).toFlushAndYield(['a', 'b2', 'c']);
=======
    await waitForAll(['a', 'Suspend! [b2]', 'Loading...']);
    // Time out the update
    jest.advanceTimersByTime(750);
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput(<uppercase>LOADING...</uppercase>);

    // Resolve the promise
    await act(() => jest.advanceTimersByTime(1000));
    assertLog(['Promise resolved [b2]', 'a', 'b2', 'c']);
>>>>>>> remotes/upstream/main

    // Render the final update. A should still be hidden, because it was
    // given a `hidden` prop.
    expect(ReactNoop).toMatchRenderedOutput(<uppercase>AB2C</uppercase>);
  });

  describe('profiler durations', () => {
    let App;
    let onRender;

    beforeEach(() => {
      // Order of parameters: id, phase, actualDuration, treeBaseDuration
      onRender = jest.fn();

      const Fallback = () => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Fallback');
=======
        Scheduler.log('Fallback');
>>>>>>> remotes/upstream/main
        Scheduler.unstable_advanceTime(10);
        return 'Loading...';
      };

      const Suspending = () => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Suspending');
=======
        Scheduler.log('Suspending');
>>>>>>> remotes/upstream/main
        Scheduler.unstable_advanceTime(2);
        return <AsyncText ms={1000} text="Loaded" fakeRenderDuration={1} />;
      };

      App = ({shouldSuspend, text = 'Text', textRenderDuration = 5}) => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('App');
=======
        Scheduler.log('App');
>>>>>>> remotes/upstream/main
        return (
          <Profiler id="root" onRender={onRender}>
            <Suspense fallback={<Fallback />}>
              {shouldSuspend && <Suspending />}
              <Text fakeRenderDuration={textRenderDuration} text={text} />
            </Suspense>
          </Profiler>
        );
      };
    });

    describe('when suspending during mount', () => {
      it('properly accounts for base durations when a suspended times out in a legacy tree', async () => {
        ReactNoop.renderLegacySyncRoot(<App shouldSuspend={true} />);
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'App',
          'Suspending',
          'Suspend! [Loaded]',
          'Text',
          'Fallback',
        ]);
        expect(ReactNoop).toMatchRenderedOutput('Loading...');
        expect(onRender).toHaveBeenCalledTimes(1);

        // Initial mount only shows the "Loading..." Fallback.
        // The treeBaseDuration then should be 10ms spent rendering Fallback,
        // but the actualDuration should also include the 8ms spent rendering the hidden tree.
        expect(onRender.mock.calls[0][2]).toBe(18);
        expect(onRender.mock.calls[0][3]).toBe(10);

        jest.advanceTimersByTime(1000);

<<<<<<< HEAD
        expect(Scheduler).toHaveYielded(['Promise resolved [Loaded]']);

        ReactNoop.flushSync();

        expect(Scheduler).toHaveYielded(['Loaded']);
=======
        assertLog(['Promise resolved [Loaded]']);

        ReactNoop.flushSync();

        assertLog(['Loaded']);
>>>>>>> remotes/upstream/main
        expect(ReactNoop).toMatchRenderedOutput('LoadedText');
        expect(onRender).toHaveBeenCalledTimes(2);

        // When the suspending data is resolved and our final UI is rendered,
        // the baseDuration should only include the 1ms re-rendering AsyncText,
        // but the treeBaseDuration should include the full 8ms spent in the tree.
        expect(onRender.mock.calls[1][2]).toBe(1);
        expect(onRender.mock.calls[1][3]).toBe(8);
      });

<<<<<<< HEAD
      it('properly accounts for base durations when a suspended times out in a concurrent tree', () => {
        ReactNoop.render(<App shouldSuspend={true} />);

        expect(Scheduler).toFlushAndYield([
          'App',
          'Suspending',
          'Suspend! [Loaded]',
          'Text',
=======
      it('properly accounts for base durations when a suspended times out in a concurrent tree', async () => {
        ReactNoop.render(<App shouldSuspend={true} />);

        await waitForAll([
          'App',
          'Suspending',
          'Suspend! [Loaded]',
>>>>>>> remotes/upstream/main
          'Fallback',
        ]);
        // Since this is initial render we immediately commit the fallback. Another test below
        // deals with the update case where this suspends.
        expect(ReactNoop).toMatchRenderedOutput('Loading...');
        expect(onRender).toHaveBeenCalledTimes(1);

        // Initial mount only shows the "Loading..." Fallback.
        // The treeBaseDuration then should be 10ms spent rendering Fallback,
<<<<<<< HEAD
        // but the actualDuration should also include the 8ms spent rendering the hidden tree.
        expect(onRender.mock.calls[0][2]).toBe(18);
        expect(onRender.mock.calls[0][3]).toBe(10);

        // Resolve the pending promise.
        jest.advanceTimersByTime(1000);
        expect(Scheduler).toHaveYielded(['Promise resolved [Loaded]']);
        expect(Scheduler).toFlushAndYield(['Suspending', 'Loaded', 'Text']);
=======
        // but the actualDuration should also include the 3ms spent rendering the hidden tree.
        expect(onRender.mock.calls[0][2]).toBe(13);
        expect(onRender.mock.calls[0][3]).toBe(10);

        // Resolve the pending promise.
        await act(() => jest.advanceTimersByTime(1000));
        assertLog([
          'Promise resolved [Loaded]',
          'Suspending',
          'Loaded',
          'Text',
        ]);
>>>>>>> remotes/upstream/main
        expect(ReactNoop).toMatchRenderedOutput('LoadedText');
        expect(onRender).toHaveBeenCalledTimes(2);

        // When the suspending data is resolved and our final UI is rendered,
        // both times should include the 8ms re-rendering Suspending and AsyncText.
        expect(onRender.mock.calls[1][2]).toBe(8);
        expect(onRender.mock.calls[1][3]).toBe(8);
      });
    });

    describe('when suspending during update', () => {
      it('properly accounts for base durations when a suspended times out in a legacy tree', async () => {
        ReactNoop.renderLegacySyncRoot(
          <App shouldSuspend={false} textRenderDuration={5} />,
        );
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded(['App', 'Text']);
=======
        assertLog(['App', 'Text']);
>>>>>>> remotes/upstream/main
        expect(ReactNoop).toMatchRenderedOutput('Text');
        expect(onRender).toHaveBeenCalledTimes(1);

        // Initial mount only shows the "Text" text.
        // It should take 5ms to render.
        expect(onRender.mock.calls[0][2]).toBe(5);
        expect(onRender.mock.calls[0][3]).toBe(5);

        ReactNoop.render(<App shouldSuspend={true} textRenderDuration={5} />);
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'App',
          'Suspending',
          'Suspend! [Loaded]',
          'Text',
          'Fallback',
        ]);
        expect(ReactNoop).toMatchRenderedOutput('Loading...');
        expect(onRender).toHaveBeenCalledTimes(2);

        // The suspense update should only show the "Loading..." Fallback.
        // The actual duration should include 10ms spent rendering Fallback,
        // plus the 8ms render all of the hidden, suspended subtree.
        // But the tree base duration should only include 10ms spent rendering Fallback,
        expect(onRender.mock.calls[1][2]).toBe(18);
        expect(onRender.mock.calls[1][3]).toBe(10);

        ReactNoop.renderLegacySyncRoot(
          <App shouldSuspend={true} text="New" textRenderDuration={6} />,
        );
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'App',
          'Suspending',
          'Suspend! [Loaded]',
          'New',
          'Fallback',
        ]);
        expect(ReactNoop).toMatchRenderedOutput('Loading...');
        expect(onRender).toHaveBeenCalledTimes(3);

        expect(onRender.mock.calls[1][2]).toBe(18);
        expect(onRender.mock.calls[1][3]).toBe(10);
        jest.advanceTimersByTime(1000);

<<<<<<< HEAD
        expect(Scheduler).toHaveYielded(['Promise resolved [Loaded]']);

        ReactNoop.flushSync();

        expect(Scheduler).toHaveYielded(['Loaded']);
=======
        assertLog(['Promise resolved [Loaded]']);

        ReactNoop.flushSync();

        assertLog(['Loaded']);
>>>>>>> remotes/upstream/main
        expect(ReactNoop).toMatchRenderedOutput('LoadedNew');
        expect(onRender).toHaveBeenCalledTimes(4);

        // When the suspending data is resolved and our final UI is rendered,
        // the baseDuration should only include the 1ms re-rendering AsyncText,
        // but the treeBaseDuration should include the full 9ms spent in the tree.
        expect(onRender.mock.calls[3][2]).toBe(1);
        expect(onRender.mock.calls[3][3]).toBe(9);
      });

<<<<<<< HEAD
      it('properly accounts for base durations when a suspended times out in a concurrent tree', () => {
=======
      it('properly accounts for base durations when a suspended times out in a concurrent tree', async () => {
        const Fallback = () => {
          Scheduler.log('Fallback');
          Scheduler.unstable_advanceTime(10);
          return 'Loading...';
        };

        const Suspending = () => {
          Scheduler.log('Suspending');
          Scheduler.unstable_advanceTime(2);
          return <AsyncText ms={1000} text="Loaded" fakeRenderDuration={1} />;
        };

        App = ({shouldSuspend, text = 'Text', textRenderDuration = 5}) => {
          Scheduler.log('App');
          return (
            <Profiler id="root" onRender={onRender}>
              <Suspense fallback={<Fallback />}>
                {shouldSuspend && <Suspending />}
                <Text fakeRenderDuration={textRenderDuration} text={text} />
              </Suspense>
            </Profiler>
          );
        };

>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <>
            <App shouldSuspend={false} textRenderDuration={5} />
            <Suspense fallback={null} />
          </>,
        );

<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield(['App', 'Text']);
=======
        await waitForAll(['App', 'Text']);
>>>>>>> remotes/upstream/main
        expect(ReactNoop).toMatchRenderedOutput('Text');
        expect(onRender).toHaveBeenCalledTimes(1);

        // Initial mount only shows the "Text" text.
        // It should take 5ms to render.
        expect(onRender.mock.calls[0][2]).toBe(5);
        expect(onRender.mock.calls[0][3]).toBe(5);

        ReactNoop.render(
          <>
            <App shouldSuspend={true} textRenderDuration={5} />
            <Suspense fallback={null} />
          </>,
        );
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
          'App',
          'Suspending',
          'Suspend! [Loaded]',
          'Text',
          'Fallback',
        ]);
        expect(ReactNoop).toMatchRenderedOutput('Text');

        // Show the fallback UI.
        jest.advanceTimersByTime(900);
        expect(ReactNoop).toMatchRenderedOutput('Loading...');
        expect(onRender).toHaveBeenCalledTimes(2);

        // The suspense update should only show the "Loading..." Fallback.
        // The actual duration should include 10ms spent rendering Fallback,
        // plus the 8ms render all of the hidden, suspended subtree.
        // But the tree base duration should only include 10ms spent rendering Fallback.
        expect(onRender.mock.calls[1][2]).toBe(18);
=======
        await waitForAll([
          'App',
          'Suspending',
          'Suspend! [Loaded]',
          'Fallback',
        ]);
        // Show the fallback UI.
        expect(ReactNoop).toMatchRenderedOutput('Loading...');
        expect(onRender).toHaveBeenCalledTimes(2);

        jest.advanceTimersByTime(900);

        // The suspense update should only show the "Loading..." Fallback.
        // The actual duration should include 10ms spent rendering Fallback,
        // plus the 3ms render all of the partially rendered suspended subtree.
        // But the tree base duration should only include 10ms spent rendering Fallback.
        expect(onRender.mock.calls[1][2]).toBe(13);
>>>>>>> remotes/upstream/main
        expect(onRender.mock.calls[1][3]).toBe(10);

        // Update again while timed out.
        // Since this test was originally written we added an optimization to avoid
        // suspending in the case that we already timed out. To simulate the old
        // behavior, we add a different suspending boundary as a sibling.
        ReactNoop.render(
          <>
            <App shouldSuspend={true} text="New" textRenderDuration={6} />
            <Suspense fallback={null}>
              <AsyncText ms={100} text="Sibling" fakeRenderDuration={1} />
            </Suspense>
          </>,
        );

        // TODO: This is here only to shift us into the next JND bucket. A
        // consequence of AsyncText relying on the same timer queue as React's
        // internal Suspense timer. We should decouple our AsyncText helpers
        // from timers.
<<<<<<< HEAD
        Scheduler.unstable_advanceTime(100);

        expect(Scheduler).toFlushAndYield([
          'App',
          'Suspending',
          'Suspend! [Loaded]',
          'New',
=======
        Scheduler.unstable_advanceTime(200);

        await waitForAll([
          'App',
          'Suspending',
          'Suspend! [Loaded]',
>>>>>>> remotes/upstream/main
          'Fallback',
          'Suspend! [Sibling]',
        ]);
        expect(ReactNoop).toMatchRenderedOutput('Loading...');
<<<<<<< HEAD
        expect(onRender).toHaveBeenCalledTimes(2);

        // Resolve the pending promise.
        jest.advanceTimersByTime(100);
        expect(Scheduler).toHaveYielded([
          'Promise resolved [Loaded]',
          'Promise resolved [Sibling]',
        ]);
        expect(Scheduler).toFlushAndYield([
          'App',
          'Suspending',
          'Loaded',
          'New',
          'Sibling',
        ]);
        expect(onRender).toHaveBeenCalledTimes(3);
=======
        expect(onRender).toHaveBeenCalledTimes(3);

        // Resolve the pending promise.
        await act(async () => {
          jest.advanceTimersByTime(100);
          assertLog([
            'Promise resolved [Loaded]',
            'Promise resolved [Sibling]',
          ]);
          await waitForAll(['Suspending', 'Loaded', 'New', 'Sibling']);
        });
        expect(onRender).toHaveBeenCalledTimes(4);
>>>>>>> remotes/upstream/main

        // When the suspending data is resolved and our final UI is rendered,
        // both times should include the 6ms rendering Text,
        // the 2ms rendering Suspending, and the 1ms rendering AsyncText.
<<<<<<< HEAD
        expect(onRender.mock.calls[2][2]).toBe(9);
        expect(onRender.mock.calls[2][3]).toBe(9);
=======
        expect(onRender.mock.calls[3][2]).toBe(9);
        expect(onRender.mock.calls[3][3]).toBe(9);
>>>>>>> remotes/upstream/main
      });
    });
  });
});
