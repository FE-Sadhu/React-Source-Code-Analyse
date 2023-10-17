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

let ReactFeatureFlags = require('shared/ReactFeatureFlags');
let PropTypes;
let React;
let ReactNoop;
let Scheduler;
let act;
<<<<<<< HEAD
=======
let assertLog;
let waitForAll;
let waitFor;
let waitForThrow;
>>>>>>> remotes/upstream/main

describe('ReactIncrementalErrorHandling', () => {
  beforeEach(() => {
    jest.resetModules();
    ReactFeatureFlags = require('shared/ReactFeatureFlags');
    ReactFeatureFlags.replayFailedUnitOfWorkWithInvokeGuardedCallback = false;
    PropTypes = require('prop-types');
    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;
  });

  function div(...children) {
    children = children.map(c => (typeof c === 'string' ? {text: c} : c));
    return {type: 'div', children, prop: undefined, hidden: false};
  }

  function span(prop) {
    return {type: 'span', children: [], prop, hidden: false};
  }
=======
    act = require('internal-test-utils').act;

    const InternalTestUtils = require('internal-test-utils');
    assertLog = InternalTestUtils.assertLog;
    waitForAll = InternalTestUtils.waitForAll;
    waitFor = InternalTestUtils.waitFor;
    waitForThrow = InternalTestUtils.waitForThrow;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
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

<<<<<<< HEAD
  it('recovers from errors asynchronously', () => {
    class ErrorBoundary extends React.Component {
      state = {error: null};
      static getDerivedStateFromError(error) {
        Scheduler.unstable_yieldValue('getDerivedStateFromError');
=======
  it('recovers from errors asynchronously', async () => {
    class ErrorBoundary extends React.Component {
      state = {error: null};
      static getDerivedStateFromError(error) {
        Scheduler.log('getDerivedStateFromError');
>>>>>>> remotes/upstream/main
        return {error};
      }
      render() {
        if (this.state.error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ErrorBoundary (catch)');
          return <ErrorMessage error={this.state.error} />;
        }
        Scheduler.unstable_yieldValue('ErrorBoundary (try)');
=======
          Scheduler.log('ErrorBoundary (catch)');
          return <ErrorMessage error={this.state.error} />;
        }
        Scheduler.log('ErrorBoundary (try)');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    function ErrorMessage({error}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('ErrorMessage');
=======
      Scheduler.log('ErrorMessage');
>>>>>>> remotes/upstream/main
      return <span prop={`Caught an error: ${error.message}`} />;
    }

    function Indirection({children}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Indirection');
=======
      Scheduler.log('Indirection');
>>>>>>> remotes/upstream/main
      return children || null;
    }

    function BadRender({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('throw');
      throw new Error('oops!');
    }

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(
=======
      Scheduler.log('throw');
      throw new Error('oops!');
    }

    React.startTransition(() => {
      ReactNoop.render(
        <>
>>>>>>> remotes/upstream/main
          <ErrorBoundary>
            <Indirection>
              <Indirection>
                <Indirection>
                  <BadRender />
<<<<<<< HEAD
                  <Indirection />
                  <Indirection />
                </Indirection>
              </Indirection>
            </Indirection>
          </ErrorBoundary>,
        );
      });
    } else {
      ReactNoop.render(
        <ErrorBoundary>
          <Indirection>
            <Indirection>
              <Indirection>
                <BadRender />
                <Indirection />
                <Indirection />
              </Indirection>
            </Indirection>
          </Indirection>
        </ErrorBoundary>,
      );
    }

    // Start rendering asynchronously
    expect(Scheduler).toFlushAndYieldThrough([
=======
                </Indirection>
              </Indirection>
            </Indirection>
          </ErrorBoundary>
          <Indirection />
          <Indirection />
        </>,
      );
    });

    // Start rendering asynchronously
    await waitFor([
>>>>>>> remotes/upstream/main
      'ErrorBoundary (try)',
      'Indirection',
      'Indirection',
      'Indirection',
      // An error is thrown. React keeps rendering asynchronously.
      'throw',
<<<<<<< HEAD
    ]);

    // Still rendering async...
    expect(Scheduler).toFlushAndYieldThrough(['Indirection']);

    expect(Scheduler).toFlushAndYieldThrough([
      'Indirection',
=======
>>>>>>> remotes/upstream/main

      // Call getDerivedStateFromError and re-render the error boundary, this
      // time rendering an error message.
      'getDerivedStateFromError',
      'ErrorBoundary (catch)',
      'ErrorMessage',
    ]);
<<<<<<< HEAD

    // Since the error was thrown during an async render, React won't commit
    // the result yet.
    expect(ReactNoop.getChildren()).toEqual([]);

    // Instead, it will try rendering one more time, synchronously, in case that
    // happens to fix the error.
    expect(ReactNoop.flushNextYield()).toEqual([
=======
    expect(ReactNoop).toMatchRenderedOutput(null);

    // The work loop unwound to the nearest error boundary. Continue rendering
    // asynchronously.
    await waitFor(['Indirection']);

    // Since the error was thrown during an async render, React won't commit the
    // result yet. After render we render the last child, React will attempt to
    // render again, synchronously, just in case that happens to fix the error
    // (i.e. as in the case of a data race). Flush just one more unit of work to
    // demonstrate that this render is synchronous.
    expect(ReactNoop.flushNextYield()).toEqual([
      'Indirection',

>>>>>>> remotes/upstream/main
      'ErrorBoundary (try)',
      'Indirection',
      'Indirection',
      'Indirection',

      // The error was thrown again. This time, React will actually commit
      // the result.
      'throw',
<<<<<<< HEAD
      'Indirection',
      'Indirection',
      'getDerivedStateFromError',
      'ErrorBoundary (catch)',
      'ErrorMessage',
    ]);

    expect(ReactNoop.getChildren()).toEqual([span('Caught an error: oops!')]);
  });

  it('recovers from errors asynchronously (legacy, no getDerivedStateFromError)', () => {
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        Scheduler.unstable_yieldValue('componentDidCatch');
=======
      'getDerivedStateFromError',
      'ErrorBoundary (catch)',
      'ErrorMessage',
      'Indirection',
      'Indirection',
    ]);

    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Caught an error: oops!" />,
    );
  });

  it('recovers from errors asynchronously (legacy, no getDerivedStateFromError)', async () => {
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        Scheduler.log('componentDidCatch');
>>>>>>> remotes/upstream/main
        this.setState({error});
      }
      render() {
        if (this.state.error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ErrorBoundary (catch)');
          return <ErrorMessage error={this.state.error} />;
        }
        Scheduler.unstable_yieldValue('ErrorBoundary (try)');
=======
          Scheduler.log('ErrorBoundary (catch)');
          return <ErrorMessage error={this.state.error} />;
        }
        Scheduler.log('ErrorBoundary (try)');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    function ErrorMessage({error}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('ErrorMessage');
=======
      Scheduler.log('ErrorMessage');
>>>>>>> remotes/upstream/main
      return <span prop={`Caught an error: ${error.message}`} />;
    }

    function Indirection({children}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Indirection');
=======
      Scheduler.log('Indirection');
>>>>>>> remotes/upstream/main
      return children || null;
    }

    function BadRender({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('throw');
      throw new Error('oops!');
    }

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(
=======
      Scheduler.log('throw');
      throw new Error('oops!');
    }

    React.startTransition(() => {
      ReactNoop.render(
        <>
>>>>>>> remotes/upstream/main
          <ErrorBoundary>
            <Indirection>
              <Indirection>
                <Indirection>
                  <BadRender />
<<<<<<< HEAD
                  <Indirection />
                  <Indirection />
                </Indirection>
              </Indirection>
            </Indirection>
          </ErrorBoundary>,
        );
      });
    } else {
      ReactNoop.render(
        <ErrorBoundary>
          <Indirection>
            <Indirection>
              <Indirection>
                <BadRender />
                <Indirection />
                <Indirection />
              </Indirection>
            </Indirection>
          </Indirection>
        </ErrorBoundary>,
      );
    }

    // Start rendering asynchronously
    expect(Scheduler).toFlushAndYieldThrough([
=======
                </Indirection>
              </Indirection>
            </Indirection>
          </ErrorBoundary>
          <Indirection />
          <Indirection />
        </>,
      );
    });

    // Start rendering asynchronously
    await waitFor([
>>>>>>> remotes/upstream/main
      'ErrorBoundary (try)',
      'Indirection',
      'Indirection',
      'Indirection',
      // An error is thrown. React keeps rendering asynchronously.
      'throw',
    ]);

    // Still rendering async...
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough(['Indirection']);

    expect(Scheduler).toFlushAndYieldThrough([
=======
    await waitFor(['Indirection']);

    await waitFor([
>>>>>>> remotes/upstream/main
      'Indirection',
      // Now that the tree is complete, and there's no remaining work, React
      // reverts to legacy mode to retry one more time before handling the error.

      'ErrorBoundary (try)',
      'Indirection',
      'Indirection',
      'Indirection',

      // The error was thrown again. Now we can handle it.
      'throw',
      'Indirection',
      'Indirection',
      'componentDidCatch',
      'ErrorBoundary (catch)',
      'ErrorMessage',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('Caught an error: oops!')]);
=======
    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Caught an error: oops!" />,
    );
>>>>>>> remotes/upstream/main
  });

  it("retries at a lower priority if there's additional pending work", async () => {
    function App(props) {
      if (props.isBroken) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('error');
        throw new Error('Oops!');
      }
      Scheduler.unstable_yieldValue('success');
=======
        Scheduler.log('error');
        throw new Error('Oops!');
      }
      Scheduler.log('success');
>>>>>>> remotes/upstream/main
      return <span prop="Everything is fine." />;
    }

    function onCommit() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('commit');
=======
      Scheduler.log('commit');
>>>>>>> remotes/upstream/main
    }

    React.startTransition(() => {
      ReactNoop.render(<App isBroken={true} />, onCommit);
    });
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough(['error']);
=======
    await waitFor(['error']);
>>>>>>> remotes/upstream/main

    React.startTransition(() => {
      // This update is in a separate batch
      ReactNoop.render(<App isBroken={false} />, onCommit);
    });

    // React will try to recover by rendering all the pending updates in a
    // single batch, synchronously. This time it succeeds.
    //
    // This tells Scheduler to render a single unit of work. Because the render
    // to recover from the error is synchronous, this should be enough to
    // finish the rest of the work.
    Scheduler.unstable_flushNumberOfYields(1);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'success',
      // Nothing commits until the second update completes.
      'commit',
      'commit',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('Everything is fine.')]);
  });

  // @gate www
  it('does not include offscreen work when retrying after an error', () => {
    function App(props) {
      if (props.isBroken) {
        Scheduler.unstable_yieldValue('error');
        throw new Error('Oops!');
      }
      Scheduler.unstable_yieldValue('success');
=======
    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Everything is fine." />,
    );
  });

  // @gate www
  it('does not include offscreen work when retrying after an error', async () => {
    function App(props) {
      if (props.isBroken) {
        Scheduler.log('error');
        throw new Error('Oops!');
      }
      Scheduler.log('success');
>>>>>>> remotes/upstream/main
      return (
        <>
          Everything is fine
          <LegacyHiddenDiv mode="hidden">
            <div>Offscreen content</div>
          </LegacyHiddenDiv>
        </>
      );
    }

    function onCommit() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('commit');
=======
      Scheduler.log('commit');
>>>>>>> remotes/upstream/main
    }

    React.startTransition(() => {
      ReactNoop.render(<App isBroken={true} />, onCommit);
    });
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough(['error']);
=======
    await waitFor(['error']);
>>>>>>> remotes/upstream/main

    expect(ReactNoop).toMatchRenderedOutput(null);

    React.startTransition(() => {
      // This update is in a separate batch
      ReactNoop.render(<App isBroken={false} />, onCommit);
    });

    // React will try to recover by rendering all the pending updates in a
    // single batch, synchronously. This time it succeeds.
    //
    // This tells Scheduler to render a single unit of work. Because the render
    // to recover from the error is synchronous, this should be enough to
    // finish the rest of the work.
    Scheduler.unstable_flushNumberOfYields(1);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'success',
      // Nothing commits until the second update completes.
      'commit',
      'commit',
    ]);
    // This should not include the offscreen content
    expect(ReactNoop).toMatchRenderedOutput(
      <>
        Everything is fine
        <div hidden={true} />
      </>,
    );

    // The offscreen content finishes in a subsequent render
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(ReactNoop).toMatchRenderedOutput(
      <>
        Everything is fine
        <div hidden={true}>
          <div>Offscreen content</div>
        </div>
      </>,
    );
  });

<<<<<<< HEAD
  it('retries one more time before handling error', () => {
    function BadRender({unused}) {
      Scheduler.unstable_yieldValue('BadRender');
=======
  it('retries one more time before handling error', async () => {
    function BadRender({unused}) {
      Scheduler.log('BadRender');
>>>>>>> remotes/upstream/main
      throw new Error('oops');
    }

    function Sibling({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Sibling');
=======
      Scheduler.log('Sibling');
>>>>>>> remotes/upstream/main
      return <span prop="Sibling" />;
    }

    function Parent({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Parent');
=======
      Scheduler.log('Parent');
>>>>>>> remotes/upstream/main
      return (
        <>
          <BadRender />
          <Sibling />
        </>
      );
    }

<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Parent />, () =>
          Scheduler.unstable_yieldValue('commit'),
        );
      });
    } else {
      ReactNoop.render(<Parent />, () =>
        Scheduler.unstable_yieldValue('commit'),
      );
    }

    // Render the bad component asynchronously
    expect(Scheduler).toFlushAndYieldThrough(['Parent', 'BadRender']);

    // Finish the rest of the async work
    expect(Scheduler).toFlushAndYieldThrough(['Sibling']);

    // Old scheduler renders, commits, and throws synchronously
    expect(() => Scheduler.unstable_flushNumberOfYields(1)).toThrow('oops');
    expect(Scheduler).toHaveYielded([
      'Parent',
      'BadRender',
      'Sibling',
      'commit',
    ]);
    expect(ReactNoop.getChildren()).toEqual([]);
=======
    React.startTransition(() => {
      ReactNoop.render(<Parent />, () => Scheduler.log('commit'));
    });

    // Render the bad component asynchronously
    await waitFor(['Parent', 'BadRender']);

    // The work loop unwound to the nearest error boundary. React will try
    // to render one more time, synchronously. Flush just one unit of work to
    // demonstrate that this render is synchronous.
    expect(() => Scheduler.unstable_flushNumberOfYields(1)).toThrow('oops');
    assertLog(['Parent', 'BadRender', 'commit']);
    expect(ReactNoop).toMatchRenderedOutput(null);
>>>>>>> remotes/upstream/main
  });

  it('retries one more time if an error occurs during a render that expires midway through the tree', async () => {
    function Oops({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Oops');
=======
      Scheduler.log('Oops');
>>>>>>> remotes/upstream/main
      throw new Error('Oops');
    }

    function Text({text}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
=======
      Scheduler.log(text);
>>>>>>> remotes/upstream/main
      return text;
    }

    function App({unused}) {
      return (
        <>
          <Text text="A" />
          <Text text="B" />
          <Oops />
          <Text text="C" />
          <Text text="D" />
        </>
      );
    }

<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<App />);
      });
    } else {
      ReactNoop.render(<App />);
    }

    // Render part of the tree
    expect(Scheduler).toFlushAndYieldThrough(['A', 'B']);
=======
    React.startTransition(() => {
      ReactNoop.render(<App />);
    });

    // Render part of the tree
    await waitFor(['A', 'B']);
>>>>>>> remotes/upstream/main

    // Expire the render midway through
    Scheduler.unstable_advanceTime(10000);

    expect(() => {
      Scheduler.unstable_flushExpired();
      ReactNoop.flushSync();
    }).toThrow('Oops');

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      // The render expired, but we shouldn't throw out the partial work.
      // Finish the current level.
      'Oops',
      'C',
      'D',
=======
    assertLog([
      // The render expired, but we shouldn't throw out the partial work.
      // Finish the current level.
      'Oops',
>>>>>>> remotes/upstream/main

      // Since the error occurred during a partially concurrent render, we should
      // retry one more time, synchronously.
      'A',
      'B',
      'Oops',
<<<<<<< HEAD
      'C',
      'D',
    ]);
    expect(ReactNoop.getChildren()).toEqual([]);
  });

  it('calls componentDidCatch multiple times for multiple errors', () => {
=======
    ]);
    expect(ReactNoop).toMatchRenderedOutput(null);
  });

  it('calls componentDidCatch multiple times for multiple errors', async () => {
>>>>>>> remotes/upstream/main
    let id = 0;
    class BadMount extends React.Component {
      componentDidMount() {
        throw new Error(`Error ${++id}`);
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('BadMount');
=======
        Scheduler.log('BadMount');
>>>>>>> remotes/upstream/main
        return null;
      }
    }

    class ErrorBoundary extends React.Component {
      state = {errorCount: 0};
      componentDidCatch(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`componentDidCatch: ${error.message}`);
=======
        Scheduler.log(`componentDidCatch: ${error.message}`);
>>>>>>> remotes/upstream/main
        this.setState(state => ({errorCount: state.errorCount + 1}));
      }
      render() {
        if (this.state.errorCount > 0) {
          return <span prop={`Number of errors: ${this.state.errorCount}`} />;
        }
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('ErrorBoundary');
=======
        Scheduler.log('ErrorBoundary');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    ReactNoop.render(
      <ErrorBoundary>
        <BadMount />
        <BadMount />
        <BadMount />
      </ErrorBoundary>,
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'ErrorBoundary',
      'BadMount',
      'BadMount',
      'BadMount',
      'componentDidCatch: Error 1',
      'componentDidCatch: Error 2',
      'componentDidCatch: Error 3',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('Number of errors: 3')]);
  });

  it('catches render error in a boundary during full deferred mounting', () => {
=======
    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Number of errors: 3" />,
    );
  });

  it('catches render error in a boundary during full deferred mounting', async () => {
>>>>>>> remotes/upstream/main
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        this.setState({error});
      }
      render() {
        if (this.state.error) {
          return (
            <span prop={`Caught an error: ${this.state.error.message}.`} />
          );
        }
        return this.props.children;
      }
    }

    function BrokenRender(props) {
      throw new Error('Hello');
    }

    ReactNoop.render(
      <ErrorBoundary>
        <BrokenRender />
      </ErrorBoundary>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren()).toEqual([span('Caught an error: Hello.')]);
  });

  it('catches render error in a boundary during partial deferred mounting', () => {
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        Scheduler.unstable_yieldValue('ErrorBoundary componentDidCatch');
=======
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Caught an error: Hello." />,
    );
  });

  it('catches render error in a boundary during partial deferred mounting', async () => {
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        Scheduler.log('ErrorBoundary componentDidCatch');
>>>>>>> remotes/upstream/main
        this.setState({error});
      }
      render() {
        if (this.state.error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ErrorBoundary render error');
=======
          Scheduler.log('ErrorBoundary render error');
>>>>>>> remotes/upstream/main
          return (
            <span prop={`Caught an error: ${this.state.error.message}.`} />
          );
        }
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('ErrorBoundary render success');
=======
        Scheduler.log('ErrorBoundary render success');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    function BrokenRender({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('BrokenRender');
      throw new Error('Hello');
    }

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(
          <ErrorBoundary>
            <BrokenRender />
          </ErrorBoundary>,
        );
      });
    } else {
=======
      Scheduler.log('BrokenRender');
      throw new Error('Hello');
    }

    React.startTransition(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.render(
        <ErrorBoundary>
          <BrokenRender />
        </ErrorBoundary>,
      );
<<<<<<< HEAD
    }

    expect(Scheduler).toFlushAndYieldThrough(['ErrorBoundary render success']);
    expect(ReactNoop.getChildren()).toEqual([]);

    expect(Scheduler).toFlushAndYield([
=======
    });

    await waitFor(['ErrorBoundary render success']);
    expect(ReactNoop).toMatchRenderedOutput(null);

    await waitForAll([
>>>>>>> remotes/upstream/main
      'BrokenRender',
      // React retries one more time
      'ErrorBoundary render success',

      // Errored again on retry. Now handle it.
      'BrokenRender',
      'ErrorBoundary componentDidCatch',
      'ErrorBoundary render error',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('Caught an error: Hello.')]);
=======
    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Caught an error: Hello." />,
    );
>>>>>>> remotes/upstream/main
  });

  it('catches render error in a boundary during synchronous mounting', () => {
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('ErrorBoundary componentDidCatch');
=======
        Scheduler.log('ErrorBoundary componentDidCatch');
>>>>>>> remotes/upstream/main
        this.setState({error});
      }
      render() {
        if (this.state.error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ErrorBoundary render error');
=======
          Scheduler.log('ErrorBoundary render error');
>>>>>>> remotes/upstream/main
          return (
            <span prop={`Caught an error: ${this.state.error.message}.`} />
          );
        }
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('ErrorBoundary render success');
=======
        Scheduler.log('ErrorBoundary render success');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    function BrokenRender({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('BrokenRender');
=======
      Scheduler.log('BrokenRender');
>>>>>>> remotes/upstream/main
      throw new Error('Hello');
    }

    ReactNoop.flushSync(() => {
      ReactNoop.render(
        <ErrorBoundary>
          <BrokenRender />
        </ErrorBoundary>,
      );
    });

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'ErrorBoundary render success',
      'BrokenRender',

      // React retries one more time
      'ErrorBoundary render success',
      'BrokenRender',

      // Errored again on retry. Now handle it.
      'ErrorBoundary componentDidCatch',
      'ErrorBoundary render error',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('Caught an error: Hello.')]);
=======
    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Caught an error: Hello." />,
    );
>>>>>>> remotes/upstream/main
  });

  it('catches render error in a boundary during batched mounting', () => {
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('ErrorBoundary componentDidCatch');
=======
        Scheduler.log('ErrorBoundary componentDidCatch');
>>>>>>> remotes/upstream/main
        this.setState({error});
      }
      render() {
        if (this.state.error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ErrorBoundary render error');
=======
          Scheduler.log('ErrorBoundary render error');
>>>>>>> remotes/upstream/main
          return (
            <span prop={`Caught an error: ${this.state.error.message}.`} />
          );
        }
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('ErrorBoundary render success');
=======
        Scheduler.log('ErrorBoundary render success');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    function BrokenRender({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('BrokenRender');
=======
      Scheduler.log('BrokenRender');
>>>>>>> remotes/upstream/main
      throw new Error('Hello');
    }

    ReactNoop.flushSync(() => {
      ReactNoop.render(<ErrorBoundary>Before the storm.</ErrorBoundary>);
      ReactNoop.render(
        <ErrorBoundary>
          <BrokenRender />
        </ErrorBoundary>,
      );
    });

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'ErrorBoundary render success',
      'BrokenRender',

      // React retries one more time
      'ErrorBoundary render success',
      'BrokenRender',

      // Errored again on retry. Now handle it.
      'ErrorBoundary componentDidCatch',
      'ErrorBoundary render error',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('Caught an error: Hello.')]);
  });

  it('propagates an error from a noop error boundary during full deferred mounting', () => {
    class RethrowErrorBoundary extends React.Component {
      componentDidCatch(error) {
        Scheduler.unstable_yieldValue('RethrowErrorBoundary componentDidCatch');
        throw error;
      }
      render() {
        Scheduler.unstable_yieldValue('RethrowErrorBoundary render');
=======
    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Caught an error: Hello." />,
    );
  });

  it('propagates an error from a noop error boundary during full deferred mounting', async () => {
    class RethrowErrorBoundary extends React.Component {
      componentDidCatch(error) {
        Scheduler.log('RethrowErrorBoundary componentDidCatch');
        throw error;
      }
      render() {
        Scheduler.log('RethrowErrorBoundary render');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    function BrokenRender({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('BrokenRender');
=======
      Scheduler.log('BrokenRender');
>>>>>>> remotes/upstream/main
      throw new Error('Hello');
    }

    ReactNoop.render(
      <RethrowErrorBoundary>
        <BrokenRender />
      </RethrowErrorBoundary>,
    );

<<<<<<< HEAD
    expect(() => {
      expect(Scheduler).toFlushAndYield([
        'RethrowErrorBoundary render',
        'BrokenRender',

        // React retries one more time
        'RethrowErrorBoundary render',
        'BrokenRender',

        // Errored again on retry. Now handle it.
        'RethrowErrorBoundary componentDidCatch',
      ]);
    }).toThrow('Hello');
    expect(ReactNoop.getChildren()).toEqual([]);
  });

  it('propagates an error from a noop error boundary during partial deferred mounting', () => {
    class RethrowErrorBoundary extends React.Component {
      componentDidCatch(error) {
        Scheduler.unstable_yieldValue('RethrowErrorBoundary componentDidCatch');
        throw error;
      }
      render() {
        Scheduler.unstable_yieldValue('RethrowErrorBoundary render');
        return this.props.children;
      }
    }

    function BrokenRender({unused}) {
      Scheduler.unstable_yieldValue('BrokenRender');
      throw new Error('Hello');
    }

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(
          <RethrowErrorBoundary>
            <BrokenRender />
          </RethrowErrorBoundary>,
        );
      });
    } else {
      ReactNoop.render(
        <RethrowErrorBoundary>
          <BrokenRender />
        </RethrowErrorBoundary>,
      );
    }

    expect(Scheduler).toFlushAndYieldThrough(['RethrowErrorBoundary render']);

    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('Hello');
    expect(Scheduler).toHaveYielded([
=======
    await waitForThrow('Hello');
    assertLog([
      'RethrowErrorBoundary render',
>>>>>>> remotes/upstream/main
      'BrokenRender',

      // React retries one more time
      'RethrowErrorBoundary render',
      'BrokenRender',

      // Errored again on retry. Now handle it.
      'RethrowErrorBoundary componentDidCatch',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([]);
  });

  it('propagates an error from a noop error boundary during synchronous mounting', () => {
    class RethrowErrorBoundary extends React.Component {
      componentDidCatch(error) {
        Scheduler.unstable_yieldValue('RethrowErrorBoundary componentDidCatch');
        throw error;
      }
      render() {
        Scheduler.unstable_yieldValue('RethrowErrorBoundary render');
=======
    expect(ReactNoop.getChildrenAsJSX()).toEqual(null);
  });

  it('propagates an error from a noop error boundary during partial deferred mounting', async () => {
    class RethrowErrorBoundary extends React.Component {
      componentDidCatch(error) {
        Scheduler.log('RethrowErrorBoundary componentDidCatch');
        throw error;
      }
      render() {
        Scheduler.log('RethrowErrorBoundary render');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    function BrokenRender({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('BrokenRender');
=======
      Scheduler.log('BrokenRender');
      throw new Error('Hello');
    }

    React.startTransition(() => {
      ReactNoop.render(
        <RethrowErrorBoundary>
          <BrokenRender />
        </RethrowErrorBoundary>,
      );
    });

    await waitFor(['RethrowErrorBoundary render']);

    await waitForThrow('Hello');
    assertLog([
      'BrokenRender',

      // React retries one more time
      'RethrowErrorBoundary render',
      'BrokenRender',

      // Errored again on retry. Now handle it.
      'RethrowErrorBoundary componentDidCatch',
    ]);
    expect(ReactNoop).toMatchRenderedOutput(null);
  });

  it('propagates an error from a noop error boundary during synchronous mounting', () => {
    class RethrowErrorBoundary extends React.Component {
      componentDidCatch(error) {
        Scheduler.log('RethrowErrorBoundary componentDidCatch');
        throw error;
      }
      render() {
        Scheduler.log('RethrowErrorBoundary render');
        return this.props.children;
      }
    }

    function BrokenRender({unused}) {
      Scheduler.log('BrokenRender');
>>>>>>> remotes/upstream/main
      throw new Error('Hello');
    }

    expect(() => {
      ReactNoop.flushSync(() => {
        ReactNoop.render(
          <RethrowErrorBoundary>
            <BrokenRender />
          </RethrowErrorBoundary>,
        );
      });
    }).toThrow('Hello');
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'RethrowErrorBoundary render',
      'BrokenRender',

      // React retries one more time
      'RethrowErrorBoundary render',
      'BrokenRender',

      // Errored again on retry. Now handle it.
      'RethrowErrorBoundary componentDidCatch',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([]);
=======
    expect(ReactNoop).toMatchRenderedOutput(null);
>>>>>>> remotes/upstream/main
  });

  it('propagates an error from a noop error boundary during batched mounting', () => {
    class RethrowErrorBoundary extends React.Component {
      componentDidCatch(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('RethrowErrorBoundary componentDidCatch');
        throw error;
      }
      render() {
        Scheduler.unstable_yieldValue('RethrowErrorBoundary render');
=======
        Scheduler.log('RethrowErrorBoundary componentDidCatch');
        throw error;
      }
      render() {
        Scheduler.log('RethrowErrorBoundary render');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    function BrokenRender({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('BrokenRender');
=======
      Scheduler.log('BrokenRender');
>>>>>>> remotes/upstream/main
      throw new Error('Hello');
    }

    expect(() => {
      ReactNoop.flushSync(() => {
        ReactNoop.render(
          <RethrowErrorBoundary>Before the storm.</RethrowErrorBoundary>,
        );
        ReactNoop.render(
          <RethrowErrorBoundary>
            <BrokenRender />
          </RethrowErrorBoundary>,
        );
      });
    }).toThrow('Hello');
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'RethrowErrorBoundary render',
      'BrokenRender',

      // React retries one more time
      'RethrowErrorBoundary render',
      'BrokenRender',

      // Errored again on retry. Now handle it.
      'RethrowErrorBoundary componentDidCatch',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([]);
  });

  it('applies batched updates regardless despite errors in scheduling', () => {
=======
    expect(ReactNoop).toMatchRenderedOutput(null);
  });

  it('applies batched updates regardless despite errors in scheduling', async () => {
>>>>>>> remotes/upstream/main
    ReactNoop.render(<span prop="a:1" />);
    expect(() => {
      ReactNoop.batchedUpdates(() => {
        ReactNoop.render(<span prop="a:2" />);
        ReactNoop.render(<span prop="a:3" />);
        throw new Error('Hello');
      });
    }).toThrow('Hello');
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren()).toEqual([span('a:3')]);
  });

  it('applies nested batched updates despite errors in scheduling', () => {
=======
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput(<span prop="a:3" />);
  });

  it('applies nested batched updates despite errors in scheduling', async () => {
>>>>>>> remotes/upstream/main
    ReactNoop.render(<span prop="a:1" />);
    expect(() => {
      ReactNoop.batchedUpdates(() => {
        ReactNoop.render(<span prop="a:2" />);
        ReactNoop.render(<span prop="a:3" />);
        ReactNoop.batchedUpdates(() => {
          ReactNoop.render(<span prop="a:4" />);
          ReactNoop.render(<span prop="a:5" />);
          throw new Error('Hello');
        });
      });
    }).toThrow('Hello');
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren()).toEqual([span('a:5')]);
  });

  // TODO: Is this a breaking change?
  it('defers additional sync work to a separate event after an error', () => {
=======
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput(<span prop="a:5" />);
  });

  // TODO: Is this a breaking change?
  it('defers additional sync work to a separate event after an error', async () => {
>>>>>>> remotes/upstream/main
    ReactNoop.render(<span prop="a:1" />);
    expect(() => {
      ReactNoop.flushSync(() => {
        ReactNoop.batchedUpdates(() => {
          ReactNoop.render(<span prop="a:2" />);
          ReactNoop.render(<span prop="a:3" />);
          throw new Error('Hello');
        });
      });
    }).toThrow('Hello');
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    expect(ReactNoop.getChildren()).toEqual([span('a:3')]);
  });

  it('can schedule updates after uncaught error in render on mount', () => {
    function BrokenRender({unused}) {
      Scheduler.unstable_yieldValue('BrokenRender');
=======
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput(<span prop="a:3" />);
  });

  it('can schedule updates after uncaught error in render on mount', async () => {
    function BrokenRender({unused}) {
      Scheduler.log('BrokenRender');
>>>>>>> remotes/upstream/main
      throw new Error('Hello');
    }

    function Foo({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return null;
    }

    ReactNoop.render(<BrokenRender />);
<<<<<<< HEAD
    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('Hello');
    ReactNoop.render(<Foo />);
    expect(Scheduler).toHaveYielded([
=======
    await waitForThrow('Hello');
    ReactNoop.render(<Foo />);
    assertLog([
>>>>>>> remotes/upstream/main
      'BrokenRender',
      // React retries one more time
      'BrokenRender',
      // Errored again on retry
    ]);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Foo']);
  });

  it('can schedule updates after uncaught error in render on update', () => {
    function BrokenRender({shouldThrow}) {
      Scheduler.unstable_yieldValue('BrokenRender');
=======
    await waitForAll(['Foo']);
  });

  it('can schedule updates after uncaught error in render on update', async () => {
    function BrokenRender({shouldThrow}) {
      Scheduler.log('BrokenRender');
>>>>>>> remotes/upstream/main
      if (shouldThrow) {
        throw new Error('Hello');
      }
      return null;
    }

    function Foo({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return null;
    }

    ReactNoop.render(<BrokenRender shouldThrow={false} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['BrokenRender']);

    expect(() => {
      ReactNoop.render(<BrokenRender shouldThrow={true} />);
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('Hello');
    expect(Scheduler).toHaveYielded([
=======
    await waitForAll(['BrokenRender']);

    ReactNoop.render(<BrokenRender shouldThrow={true} />);
    await waitForThrow('Hello');
    assertLog([
>>>>>>> remotes/upstream/main
      'BrokenRender',
      // React retries one more time
      'BrokenRender',
      // Errored again on retry
    ]);

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Foo']);
  });

  it('can schedule updates after uncaught error during unmounting', () => {
=======
    await waitForAll(['Foo']);
  });

  it('can schedule updates after uncaught error during unmounting', async () => {
>>>>>>> remotes/upstream/main
    class BrokenComponentWillUnmount extends React.Component {
      render() {
        return <div />;
      }
      componentWillUnmount() {
        throw new Error('Hello');
      }
    }

    function Foo() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return null;
    }

    ReactNoop.render(<BrokenComponentWillUnmount />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    expect(() => {
      ReactNoop.render(<div />);
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('Hello');

    ReactNoop.render(<Foo />);
    expect(Scheduler).toFlushAndYield(['Foo']);
  });

  // @gate skipUnmountedBoundaries
  it('should not attempt to recover an unmounting error boundary', () => {
    class Parent extends React.Component {
      componentWillUnmount() {
        Scheduler.unstable_yieldValue('Parent componentWillUnmount');
=======
    await waitForAll([]);

    ReactNoop.render(<div />);
    await waitForThrow('Hello');

    ReactNoop.render(<Foo />);
    await waitForAll(['Foo']);
  });

  it('should not attempt to recover an unmounting error boundary', async () => {
    class Parent extends React.Component {
      componentWillUnmount() {
        Scheduler.log('Parent componentWillUnmount');
>>>>>>> remotes/upstream/main
      }
      render() {
        return <Boundary />;
      }
    }

    class Boundary extends React.Component {
      componentDidCatch(e) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`Caught error: ${e.message}`);
=======
        Scheduler.log(`Caught error: ${e.message}`);
>>>>>>> remotes/upstream/main
      }
      render() {
        return <ThrowsOnUnmount />;
      }
    }

    class ThrowsOnUnmount extends React.Component {
      componentWillUnmount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('ThrowsOnUnmount componentWillUnmount');
=======
        Scheduler.log('ThrowsOnUnmount componentWillUnmount');
>>>>>>> remotes/upstream/main
        throw new Error('unmount error');
      }
      render() {
        return null;
      }
    }

    ReactNoop.render(<Parent />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    // Because the error boundary is also unmounting,
    // an error in ThrowsOnUnmount should be rethrown.
    expect(() => {
      ReactNoop.render(null);
      expect(Scheduler).toFlushAndYield([
        'Parent componentWillUnmount',
        'ThrowsOnUnmount componentWillUnmount',
      ]);
    }).toThrow('unmount error');
=======
    await waitForAll([]);

    // Because the error boundary is also unmounting,
    // an error in ThrowsOnUnmount should be rethrown.
    ReactNoop.render(null);
    await waitForThrow('unmount error');
    await assertLog([
      'Parent componentWillUnmount',
      'ThrowsOnUnmount componentWillUnmount',
    ]);
>>>>>>> remotes/upstream/main

    ReactNoop.render(<Parent />);
  });

<<<<<<< HEAD
  it('can unmount an error boundary before it is handled', () => {
=======
  it('can unmount an error boundary before it is handled', async () => {
>>>>>>> remotes/upstream/main
    let parent;

    class Parent extends React.Component {
      state = {step: 0};
      render() {
        parent = this;
        return this.state.step === 0 ? <Boundary /> : null;
      }
    }

    class Boundary extends React.Component {
      componentDidCatch() {}
      render() {
        return <Child />;
      }
    }

    class Child extends React.Component {
      componentDidUpdate() {
        parent.setState({step: 1});
        throw new Error('update error');
      }
      render() {
        return null;
      }
    }

    ReactNoop.render(<Parent />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    ReactNoop.flushSync(() => {
      ReactNoop.render(<Parent />);
    });
  });

<<<<<<< HEAD
  it('continues work on other roots despite caught errors', () => {
=======
  it('continues work on other roots despite caught errors', async () => {
>>>>>>> remotes/upstream/main
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        this.setState({error});
      }
      render() {
        if (this.state.error) {
          return (
            <span prop={`Caught an error: ${this.state.error.message}.`} />
          );
        }
        return this.props.children;
      }
    }

    function BrokenRender(props) {
      throw new Error('Hello');
    }

    ReactNoop.renderToRootWithID(
      <ErrorBoundary>
        <BrokenRender />
      </ErrorBoundary>,
      'a',
    );
    ReactNoop.renderToRootWithID(<span prop="b:1" />, 'b');
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren('a')).toEqual([
      span('Caught an error: Hello.'),
    ]);
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren('b')).toEqual([span('b:1')]);
  });

  it('continues work on other roots despite uncaught errors', () => {
=======
    await waitForAll([]);
    expect(ReactNoop.getChildrenAsJSX('a')).toEqual(
      <span prop="Caught an error: Hello." />,
    );
    await waitForAll([]);
    expect(ReactNoop.getChildrenAsJSX('b')).toEqual(<span prop="b:1" />);
  });

  it('continues work on other roots despite uncaught errors', async () => {
>>>>>>> remotes/upstream/main
    function BrokenRender(props) {
      throw new Error(props.label);
    }

    ReactNoop.renderToRootWithID(<BrokenRender label="a" />, 'a');
<<<<<<< HEAD
    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('a');
    expect(ReactNoop.getChildren('a')).toEqual([]);

    ReactNoop.renderToRootWithID(<BrokenRender label="a" />, 'a');
    ReactNoop.renderToRootWithID(<span prop="b:2" />, 'b');
    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('a');

    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren('a')).toEqual([]);
    expect(ReactNoop.getChildren('b')).toEqual([span('b:2')]);

    ReactNoop.renderToRootWithID(<span prop="a:3" />, 'a');
    ReactNoop.renderToRootWithID(<BrokenRender label="b" />, 'b');
    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('b');
    expect(ReactNoop.getChildren('a')).toEqual([span('a:3')]);
    expect(ReactNoop.getChildren('b')).toEqual([]);
=======
    await waitForThrow('a');
    expect(ReactNoop.getChildrenAsJSX('a')).toEqual(null);

    ReactNoop.renderToRootWithID(<BrokenRender label="a" />, 'a');
    ReactNoop.renderToRootWithID(<span prop="b:2" />, 'b');
    await waitForThrow('a');

    await waitForAll([]);
    expect(ReactNoop.getChildrenAsJSX('a')).toEqual(null);
    expect(ReactNoop.getChildrenAsJSX('b')).toEqual(<span prop="b:2" />);

    ReactNoop.renderToRootWithID(<span prop="a:3" />, 'a');
    ReactNoop.renderToRootWithID(<BrokenRender label="b" />, 'b');
    await waitForThrow('b');
    expect(ReactNoop.getChildrenAsJSX('a')).toEqual(<span prop="a:3" />);
    expect(ReactNoop.getChildrenAsJSX('b')).toEqual(null);
>>>>>>> remotes/upstream/main

    ReactNoop.renderToRootWithID(<span prop="a:4" />, 'a');
    ReactNoop.renderToRootWithID(<BrokenRender label="b" />, 'b');
    ReactNoop.renderToRootWithID(<span prop="c:4" />, 'c');
<<<<<<< HEAD
    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('b');
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren('a')).toEqual([span('a:4')]);
    expect(ReactNoop.getChildren('b')).toEqual([]);
    expect(ReactNoop.getChildren('c')).toEqual([span('c:4')]);
=======
    await waitForThrow('b');
    await waitForAll([]);
    expect(ReactNoop.getChildrenAsJSX('a')).toEqual(<span prop="a:4" />);
    expect(ReactNoop.getChildrenAsJSX('b')).toEqual(null);
    expect(ReactNoop.getChildrenAsJSX('c')).toEqual(<span prop="c:4" />);
>>>>>>> remotes/upstream/main

    ReactNoop.renderToRootWithID(<span prop="a:5" />, 'a');
    ReactNoop.renderToRootWithID(<span prop="b:5" />, 'b');
    ReactNoop.renderToRootWithID(<span prop="c:5" />, 'c');
    ReactNoop.renderToRootWithID(<span prop="d:5" />, 'd');
    ReactNoop.renderToRootWithID(<BrokenRender label="e" />, 'e');
<<<<<<< HEAD
    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('e');
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren('a')).toEqual([span('a:5')]);
    expect(ReactNoop.getChildren('b')).toEqual([span('b:5')]);
    expect(ReactNoop.getChildren('c')).toEqual([span('c:5')]);
    expect(ReactNoop.getChildren('d')).toEqual([span('d:5')]);
    expect(ReactNoop.getChildren('e')).toEqual([]);
=======
    await waitForThrow('e');
    await waitForAll([]);
    expect(ReactNoop.getChildrenAsJSX('a')).toEqual(<span prop="a:5" />);
    expect(ReactNoop.getChildrenAsJSX('b')).toEqual(<span prop="b:5" />);
    expect(ReactNoop.getChildrenAsJSX('c')).toEqual(<span prop="c:5" />);
    expect(ReactNoop.getChildrenAsJSX('d')).toEqual(<span prop="d:5" />);
    expect(ReactNoop.getChildrenAsJSX('e')).toEqual(null);
>>>>>>> remotes/upstream/main

    ReactNoop.renderToRootWithID(<BrokenRender label="a" />, 'a');
    ReactNoop.renderToRootWithID(<span prop="b:6" />, 'b');
    ReactNoop.renderToRootWithID(<BrokenRender label="c" />, 'c');
    ReactNoop.renderToRootWithID(<span prop="d:6" />, 'd');
    ReactNoop.renderToRootWithID(<BrokenRender label="e" />, 'e');
    ReactNoop.renderToRootWithID(<span prop="f:6" />, 'f');

<<<<<<< HEAD
    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('a');
    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('c');
    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('e');

    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren('a')).toEqual([]);
    expect(ReactNoop.getChildren('b')).toEqual([span('b:6')]);
    expect(ReactNoop.getChildren('c')).toEqual([]);
    expect(ReactNoop.getChildren('d')).toEqual([span('d:6')]);
    expect(ReactNoop.getChildren('e')).toEqual([]);
    expect(ReactNoop.getChildren('f')).toEqual([span('f:6')]);
=======
    await waitForThrow('a');
    await waitForThrow('c');
    await waitForThrow('e');

    await waitForAll([]);
    expect(ReactNoop.getChildrenAsJSX('a')).toEqual(null);
    expect(ReactNoop.getChildrenAsJSX('b')).toEqual(<span prop="b:6" />);
    expect(ReactNoop.getChildrenAsJSX('c')).toEqual(null);
    expect(ReactNoop.getChildrenAsJSX('d')).toEqual(<span prop="d:6" />);
    expect(ReactNoop.getChildrenAsJSX('e')).toEqual(null);
    expect(ReactNoop.getChildrenAsJSX('f')).toEqual(<span prop="f:6" />);
>>>>>>> remotes/upstream/main

    ReactNoop.unmountRootWithID('a');
    ReactNoop.unmountRootWithID('b');
    ReactNoop.unmountRootWithID('c');
    ReactNoop.unmountRootWithID('d');
    ReactNoop.unmountRootWithID('e');
    ReactNoop.unmountRootWithID('f');
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren('a')).toEqual(null);
    expect(ReactNoop.getChildren('b')).toEqual(null);
    expect(ReactNoop.getChildren('c')).toEqual(null);
    expect(ReactNoop.getChildren('d')).toEqual(null);
    expect(ReactNoop.getChildren('e')).toEqual(null);
    expect(ReactNoop.getChildren('f')).toEqual(null);
  });

  it('unwinds the context stack correctly on error', () => {
=======
    await waitForAll([]);
    expect(ReactNoop.getChildrenAsJSX('a')).toEqual(null);
    expect(ReactNoop.getChildrenAsJSX('b')).toEqual(null);
    expect(ReactNoop.getChildrenAsJSX('c')).toEqual(null);
    expect(ReactNoop.getChildrenAsJSX('d')).toEqual(null);
    expect(ReactNoop.getChildrenAsJSX('e')).toEqual(null);
    expect(ReactNoop.getChildrenAsJSX('f')).toEqual(null);
  });

  // NOTE: When legacy context is removed, it's probably fine to just delete
  // this test. There's plenty of test coverage of stack unwinding in general
  // because it's used for new context, suspense, and many other features.
  // It has to be tested independently for each feature anyway. So although it
  // doesn't look like it, this test is specific to legacy context.
  // @gate !disableLegacyContext
  it('unwinds the context stack correctly on error', async () => {
>>>>>>> remotes/upstream/main
    class Provider extends React.Component {
      static childContextTypes = {message: PropTypes.string};
      static contextTypes = {message: PropTypes.string};
      getChildContext() {
        return {
          message: (this.context.message || '') + this.props.message,
        };
      }
      render() {
        return this.props.children;
      }
    }

    function Connector(props, context) {
      return <span prop={context.message} />;
    }

    Connector.contextTypes = {
      message: PropTypes.string,
    };

    function BadRender() {
      throw new Error('render error');
    }

    class Boundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        this.setState({error});
      }
      render() {
        return (
          <Provider message="b">
            <Provider message="c">
              <Provider message="d">
                <Provider message="e">
                  {!this.state.error && <BadRender />}
                </Provider>
              </Provider>
            </Provider>
          </Provider>
        );
      }
    }

    ReactNoop.render(
      <Provider message="a">
        <Boundary />
        <Connector />
      </Provider>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    // If the context stack does not unwind, span will get 'abcde'
    expect(ReactNoop.getChildren()).toEqual([span('a')]);
  });

  it('catches reconciler errors in a boundary during mounting', () => {
=======
    await waitForAll([]);

    // If the context stack does not unwind, span will get 'abcde'
    expect(ReactNoop).toMatchRenderedOutput(<span prop="a" />);
  });

  it('catches reconciler errors in a boundary during mounting', async () => {
>>>>>>> remotes/upstream/main
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        this.setState({error});
      }
      render() {
        if (this.state.error) {
          return <span prop={this.state.error.message} />;
        }
        return this.props.children;
      }
    }
    const InvalidType = undefined;
    function BrokenRender(props) {
      return <InvalidType />;
    }

    ReactNoop.render(
      <ErrorBoundary>
        <BrokenRender />
      </ErrorBoundary>,
    );
<<<<<<< HEAD
    expect(() => expect(Scheduler).toFlushWithoutYielding()).toErrorDev([
=======
    await expect(async () => await waitForAll([])).toErrorDev([
>>>>>>> remotes/upstream/main
      'Warning: React.createElement: type is invalid -- expected a string',
      // React retries once on error
      'Warning: React.createElement: type is invalid -- expected a string',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([
      span(
        'Element type is invalid: expected a string (for built-in components) or ' +
=======
    expect(ReactNoop).toMatchRenderedOutput(
      <span
        prop={
          'Element type is invalid: expected a string (for built-in components) or ' +
>>>>>>> remotes/upstream/main
          'a class/function (for composite components) but got: undefined.' +
          (__DEV__
            ? " You likely forgot to export your component from the file it's " +
              'defined in, or you might have mixed up default and named imports.' +
              '\n\nCheck the render method of `BrokenRender`.'
<<<<<<< HEAD
            : ''),
      ),
    ]);
  });

  it('catches reconciler errors in a boundary during update', () => {
=======
            : '')
        }
      />,
    );
  });

  it('catches reconciler errors in a boundary during update', async () => {
>>>>>>> remotes/upstream/main
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        this.setState({error});
      }
      render() {
        if (this.state.error) {
          return <span prop={this.state.error.message} />;
        }
        return this.props.children;
      }
    }

    const InvalidType = undefined;
    function BrokenRender(props) {
      return props.fail ? <InvalidType /> : <span />;
    }

    ReactNoop.render(
      <ErrorBoundary>
        <BrokenRender fail={false} />
      </ErrorBoundary>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    ReactNoop.render(
      <ErrorBoundary>
        <BrokenRender fail={true} />
      </ErrorBoundary>,
    );
<<<<<<< HEAD
    expect(() => expect(Scheduler).toFlushWithoutYielding()).toErrorDev([
=======
    await expect(async () => await waitForAll([])).toErrorDev([
>>>>>>> remotes/upstream/main
      'Warning: React.createElement: type is invalid -- expected a string',
      // React retries once on error
      'Warning: React.createElement: type is invalid -- expected a string',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([
      span(
        'Element type is invalid: expected a string (for built-in components) or ' +
=======
    expect(ReactNoop).toMatchRenderedOutput(
      <span
        prop={
          'Element type is invalid: expected a string (for built-in components) or ' +
>>>>>>> remotes/upstream/main
          'a class/function (for composite components) but got: undefined.' +
          (__DEV__
            ? " You likely forgot to export your component from the file it's " +
              'defined in, or you might have mixed up default and named imports.' +
              '\n\nCheck the render method of `BrokenRender`.'
<<<<<<< HEAD
            : ''),
      ),
    ]);
  });

  it('recovers from uncaught reconciler errors', () => {
    const InvalidType = undefined;
    expect(() =>
      ReactNoop.render(<InvalidType />),
    ).toErrorDev(
      'Warning: React.createElement: type is invalid -- expected a string',
      {withoutStack: true},
    );
    expect(Scheduler).toFlushAndThrow(
=======
            : '')
        }
      />,
    );
  });

  it('recovers from uncaught reconciler errors', async () => {
    const InvalidType = undefined;
    expect(() => ReactNoop.render(<InvalidType />)).toErrorDev(
      'Warning: React.createElement: type is invalid -- expected a string',
      {withoutStack: true},
    );
    await waitForThrow(
>>>>>>> remotes/upstream/main
      'Element type is invalid: expected a string (for built-in components) or ' +
        'a class/function (for composite components) but got: undefined.' +
        (__DEV__
          ? " You likely forgot to export your component from the file it's " +
            'defined in, or you might have mixed up default and named imports.'
          : ''),
    );

    ReactNoop.render(<span prop="hi" />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren()).toEqual([span('hi')]);
  });

  it('unmounts components with uncaught errors', () => {
=======
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput(<span prop="hi" />);
  });

  it('unmounts components with uncaught errors', async () => {
>>>>>>> remotes/upstream/main
    let inst;

    class BrokenRenderAndUnmount extends React.Component {
      state = {fail: false};
      componentWillUnmount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'BrokenRenderAndUnmount componentWillUnmount',
        );
=======
        Scheduler.log('BrokenRenderAndUnmount componentWillUnmount');
>>>>>>> remotes/upstream/main
      }
      render() {
        inst = this;
        if (this.state.fail) {
          throw new Error('Hello.');
        }
        return null;
      }
    }

    class Parent extends React.Component {
      componentWillUnmount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Parent componentWillUnmount [!]');
=======
        Scheduler.log('Parent componentWillUnmount [!]');
>>>>>>> remotes/upstream/main
        throw new Error('One does not simply unmount me.');
      }
      render() {
        return this.props.children;
      }
    }

    ReactNoop.render(
      <Parent>
        <Parent>
          <BrokenRenderAndUnmount />
        </Parent>
      </Parent>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    inst.setState({fail: true});
    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrowError('Hello.');

    expect(Scheduler).toHaveYielded([
=======
    await waitForAll([]);

    let aggregateError;
    try {
      ReactNoop.flushSync(() => {
        inst.setState({fail: true});
      });
    } catch (e) {
      aggregateError = e;
    }

    assertLog([
>>>>>>> remotes/upstream/main
      // Attempt to clean up.
      // Errors in parents shouldn't stop children from unmounting.
      'Parent componentWillUnmount [!]',
      'Parent componentWillUnmount [!]',
      'BrokenRenderAndUnmount componentWillUnmount',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([]);

    expect(() => {
      ReactNoop.flushSync();
    }).toThrow('One does not simply unmount me.');
  });

  it('does not interrupt unmounting if detaching a ref throws', () => {
    class Bar extends React.Component {
      componentWillUnmount() {
        Scheduler.unstable_yieldValue('Bar unmount');
=======
    expect(ReactNoop).toMatchRenderedOutput(null);

    // React threw both errors as a single AggregateError
    const errors = aggregateError.errors;
    expect(errors.length).toBe(2);
    expect(errors[0].message).toBe('Hello.');
    expect(errors[1].message).toBe('One does not simply unmount me.');
  });

  it('does not interrupt unmounting if detaching a ref throws', async () => {
    class Bar extends React.Component {
      componentWillUnmount() {
        Scheduler.log('Bar unmount');
>>>>>>> remotes/upstream/main
      }
      render() {
        return <span prop="Bar" />;
      }
    }

    function barRef(inst) {
      if (inst === null) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('barRef detach');
        throw new Error('Detach error');
      }
      Scheduler.unstable_yieldValue('barRef attach');
=======
        Scheduler.log('barRef detach');
        throw new Error('Detach error');
      }
      Scheduler.log('barRef attach');
>>>>>>> remotes/upstream/main
    }

    function Foo(props) {
      return <div>{props.hide ? null : <Bar ref={barRef} />}</div>;
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['barRef attach']);
    expect(ReactNoop.getChildren()).toEqual([div(span('Bar'))]);

    // Unmount
    ReactNoop.render(<Foo hide={true} />);
    expect(Scheduler).toFlushAndThrow('Detach error');
    expect(Scheduler).toHaveYielded([
=======
    await waitForAll(['barRef attach']);
    expect(ReactNoop).toMatchRenderedOutput(
      <div>
        <span prop="Bar" />
      </div>,
    );

    // Unmount
    ReactNoop.render(<Foo hide={true} />);
    await waitForThrow('Detach error');
    assertLog([
>>>>>>> remotes/upstream/main
      'barRef detach',
      // Bar should unmount even though its ref threw an error while detaching
      'Bar unmount',
    ]);
    // Because there was an error, entire tree should unmount
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([]);
  });

  it('handles error thrown by host config while working on failed root', () => {
    ReactNoop.render(<errorInBeginPhase />);
    expect(Scheduler).toFlushAndThrow('Error in host config.');
  });

  it('handles error thrown by top-level callback', () => {
    ReactNoop.render(<div />, () => {
      throw new Error('Error!');
    });
    expect(Scheduler).toFlushAndThrow('Error!');
  });

  it('error boundaries capture non-errors', () => {
    spyOnProd(console, 'error');
    spyOnDev(console, 'error');
=======
    expect(ReactNoop).toMatchRenderedOutput(null);
  });

  it('handles error thrown by host config while working on failed root', async () => {
    ReactNoop.render(<errorInBeginPhase />);
    await waitForThrow('Error in host config.');
  });

  it('handles error thrown by top-level callback', async () => {
    ReactNoop.render(<div />, () => {
      throw new Error('Error!');
    });
    await waitForThrow('Error!');
  });

  it('error boundaries capture non-errors', async () => {
    spyOnProd(console, 'error').mockImplementation(() => {});
    spyOnDev(console, 'error').mockImplementation(() => {});
>>>>>>> remotes/upstream/main

    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        // Should not be called
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('componentDidCatch');
=======
        Scheduler.log('componentDidCatch');
>>>>>>> remotes/upstream/main
        this.setState({error});
      }
      render() {
        if (this.state.error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ErrorBoundary (catch)');
=======
          Scheduler.log('ErrorBoundary (catch)');
>>>>>>> remotes/upstream/main
          return (
            <span
              prop={`Caught an error: ${this.state.error.nonStandardMessage}`}
            />
          );
        }
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('ErrorBoundary (try)');
=======
        Scheduler.log('ErrorBoundary (try)');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    function Indirection({children}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Indirection');
=======
      Scheduler.log('Indirection');
>>>>>>> remotes/upstream/main
      return children;
    }

    const notAnError = {nonStandardMessage: 'oops'};
    function BadRender({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('BadRender');
=======
      Scheduler.log('BadRender');
>>>>>>> remotes/upstream/main
      throw notAnError;
    }

    ReactNoop.render(
      <ErrorBoundary>
        <Indirection>
          <BadRender />
        </Indirection>
      </ErrorBoundary>,
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'ErrorBoundary (try)',
      'Indirection',
      'BadRender',

      // React retries one more time
      'ErrorBoundary (try)',
      'Indirection',
      'BadRender',

      // Errored again on retry. Now handle it.
      'componentDidCatch',
      'ErrorBoundary (catch)',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('Caught an error: oops')]);

    if (__DEV__) {
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error.calls.argsFor(0)[0]).toContain(
=======
    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Caught an error: oops" />,
    );

    if (__DEV__) {
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error.mock.calls[0][0]).toContain(
>>>>>>> remotes/upstream/main
        'The above error occurred in the <BadRender> component:',
      );
    } else {
      expect(console.error).toHaveBeenCalledTimes(1);
<<<<<<< HEAD
      expect(console.error.calls.argsFor(0)[0]).toBe(notAnError);
=======
      expect(console.error.mock.calls[0][0]).toBe(notAnError);
>>>>>>> remotes/upstream/main
    }
  });

  // TODO: Error boundary does not catch promises

<<<<<<< HEAD
  it('continues working on siblings of a component that throws', () => {
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        Scheduler.unstable_yieldValue('componentDidCatch');
=======
  it('continues working on siblings of a component that throws', async () => {
    class ErrorBoundary extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        Scheduler.log('componentDidCatch');
>>>>>>> remotes/upstream/main
        this.setState({error});
      }
      render() {
        if (this.state.error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ErrorBoundary (catch)');
          return <ErrorMessage error={this.state.error} />;
        }
        Scheduler.unstable_yieldValue('ErrorBoundary (try)');
=======
          Scheduler.log('ErrorBoundary (catch)');
          return <ErrorMessage error={this.state.error} />;
        }
        Scheduler.log('ErrorBoundary (try)');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    function ErrorMessage({error}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('ErrorMessage');
=======
      Scheduler.log('ErrorMessage');
>>>>>>> remotes/upstream/main
      return <span prop={`Caught an error: ${error.message}`} />;
    }

    function BadRenderSibling({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('BadRenderSibling');
=======
      Scheduler.log('BadRenderSibling');
>>>>>>> remotes/upstream/main
      return null;
    }

    function BadRender({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('throw');
=======
      Scheduler.log('throw');
>>>>>>> remotes/upstream/main
      throw new Error('oops!');
    }

    ReactNoop.render(
      <ErrorBoundary>
        <BadRender />
        <BadRenderSibling />
        <BadRenderSibling />
      </ErrorBoundary>,
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'ErrorBoundary (try)',
      'throw',
      // Continue rendering siblings after BadRender throws
      'BadRenderSibling',
      'BadRenderSibling',
=======
    await waitForAll([
      'ErrorBoundary (try)',
      'throw',
      // Continue rendering siblings after BadRender throws
>>>>>>> remotes/upstream/main

      // React retries one more time
      'ErrorBoundary (try)',
      'throw',
<<<<<<< HEAD
      'BadRenderSibling',
      'BadRenderSibling',
=======
>>>>>>> remotes/upstream/main

      // Errored again on retry. Now handle it.
      'componentDidCatch',
      'ErrorBoundary (catch)',
      'ErrorMessage',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('Caught an error: oops!')]);
  });

  it('calls the correct lifecycles on the error boundary after catching an error (mixed)', () => {
=======
    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Caught an error: oops!" />,
    );
  });

  it('calls the correct lifecycles on the error boundary after catching an error (mixed)', async () => {
>>>>>>> remotes/upstream/main
    // This test seems a bit contrived, but it's based on an actual regression
    // where we checked for the existence of didUpdate instead of didMount, and
    // didMount was not defined.
    function BadRender({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('throw');
=======
      Scheduler.log('throw');
>>>>>>> remotes/upstream/main
      throw new Error('oops!');
    }

    class Parent extends React.Component {
      state = {error: null, other: false};
      componentDidCatch(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('did catch');
        this.setState({error});
      }
      componentDidUpdate() {
        Scheduler.unstable_yieldValue('did update');
      }
      render() {
        if (this.state.error) {
          Scheduler.unstable_yieldValue('render error message');
          return <span prop={`Caught an error: ${this.state.error.message}`} />;
        }
        Scheduler.unstable_yieldValue('render');
=======
        Scheduler.log('did catch');
        this.setState({error});
      }
      componentDidUpdate() {
        Scheduler.log('did update');
      }
      render() {
        if (this.state.error) {
          Scheduler.log('render error message');
          return <span prop={`Caught an error: ${this.state.error.message}`} />;
        }
        Scheduler.log('render');
>>>>>>> remotes/upstream/main
        return <BadRender />;
      }
    }

    ReactNoop.render(<Parent step={1} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough([
=======
    await waitFor([
>>>>>>> remotes/upstream/main
      'render',
      'throw',
      'render',
      'throw',
      'did catch',
      'render error message',
      'did update',
    ]);
<<<<<<< HEAD
    expect(ReactNoop.getChildren()).toEqual([span('Caught an error: oops!')]);
  });

  it('provides component stack to the error boundary with componentDidCatch', () => {
=======
    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Caught an error: oops!" />,
    );
  });

  it('provides component stack to the error boundary with componentDidCatch', async () => {
>>>>>>> remotes/upstream/main
    class ErrorBoundary extends React.Component {
      state = {error: null, errorInfo: null};
      componentDidCatch(error, errorInfo) {
        this.setState({error, errorInfo});
      }
      render() {
        if (this.state.errorInfo) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('render error message');
=======
          Scheduler.log('render error message');
>>>>>>> remotes/upstream/main
          return (
            <span
              prop={`Caught an error:${normalizeCodeLocInfo(
                this.state.errorInfo.componentStack,
              )}.`}
            />
          );
        }
        return this.props.children;
      }
    }

    function BrokenRender(props) {
      throw new Error('Hello');
    }

    ReactNoop.render(
      <ErrorBoundary>
        <BrokenRender />
      </ErrorBoundary>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['render error message']);
    expect(ReactNoop.getChildren()).toEqual([
      span(
        'Caught an error:\n' +
          '    in BrokenRender (at **)\n' +
          '    in ErrorBoundary (at **).',
      ),
    ]);
  });

  it('does not provide component stack to the error boundary with getDerivedStateFromError', () => {
=======
    await waitForAll(['render error message']);
    expect(ReactNoop).toMatchRenderedOutput(
      <span
        prop={
          'Caught an error:\n' +
          '    in BrokenRender (at **)\n' +
          '    in ErrorBoundary (at **).'
        }
      />,
    );
  });

  it('does not provide component stack to the error boundary with getDerivedStateFromError', async () => {
>>>>>>> remotes/upstream/main
    class ErrorBoundary extends React.Component {
      state = {error: null};
      static getDerivedStateFromError(error, errorInfo) {
        expect(errorInfo).toBeUndefined();
        return {error};
      }
      render() {
        if (this.state.error) {
          return <span prop={`Caught an error: ${this.state.error.message}`} />;
        }
        return this.props.children;
      }
    }

    function BrokenRender(props) {
      throw new Error('Hello');
    }

    ReactNoop.render(
      <ErrorBoundary>
        <BrokenRender />
      </ErrorBoundary>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren()).toEqual([span('Caught an error: Hello')]);
  });

  it('provides component stack even if overriding prepareStackTrace', () => {
    Error.prepareStackTrace = function(error, callsites) {
=======
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput(
      <span prop="Caught an error: Hello" />,
    );
  });

  it('provides component stack even if overriding prepareStackTrace', async () => {
    Error.prepareStackTrace = function (error, callsites) {
>>>>>>> remotes/upstream/main
      const stack = ['An error occurred:', error.message];
      for (let i = 0; i < callsites.length; i++) {
        const callsite = callsites[i];
        stack.push(
          '\t' + callsite.getFunctionName(),
          '\t\tat ' + callsite.getFileName(),
          '\t\ton line ' + callsite.getLineNumber(),
        );
      }

      return stack.join('\n');
    };

    class ErrorBoundary extends React.Component {
      state = {error: null, errorInfo: null};
      componentDidCatch(error, errorInfo) {
        this.setState({error, errorInfo});
      }
      render() {
        if (this.state.errorInfo) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('render error message');
=======
          Scheduler.log('render error message');
>>>>>>> remotes/upstream/main
          return (
            <span
              prop={`Caught an error:${normalizeCodeLocInfo(
                this.state.errorInfo.componentStack,
              )}.`}
            />
          );
        }
        return this.props.children;
      }
    }

    function BrokenRender(props) {
      throw new Error('Hello');
    }

    ReactNoop.render(
      <ErrorBoundary>
        <BrokenRender />
      </ErrorBoundary>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['render error message']);
    Error.prepareStackTrace = undefined;

    expect(ReactNoop.getChildren()).toEqual([
      span(
        'Caught an error:\n' +
          '    in BrokenRender (at **)\n' +
          '    in ErrorBoundary (at **).',
      ),
    ]);
  });

  if (!ReactFeatureFlags.disableModulePatternComponents) {
    it('handles error thrown inside getDerivedStateFromProps of a module-style context provider', () => {
      function Provider() {
        return {
          getChildContext() {
            return {foo: 'bar'};
          },
          render() {
            return 'Hi';
          },
        };
      }
      Provider.childContextTypes = {
        x: () => {},
      };
      Provider.getDerivedStateFromProps = () => {
        throw new Error('Oops!');
      };

      ReactNoop.render(<Provider />);
      expect(() => {
        expect(Scheduler).toFlushAndThrow('Oops!');
      }).toErrorDev([
        'Warning: The <Provider /> component appears to be a function component that returns a class instance. ' +
          'Change Provider to a class that extends React.Component instead. ' +
          "If you can't use a class try assigning the prototype on the function as a workaround. " +
          '`Provider.prototype = React.Component.prototype`. ' +
          "Don't use an arrow function since it cannot be called with `new` by React.",
      ]);
    });
  }
=======
    await waitForAll(['render error message']);
    Error.prepareStackTrace = undefined;

    expect(ReactNoop).toMatchRenderedOutput(
      <span
        prop={
          'Caught an error:\n' +
          '    in BrokenRender (at **)\n' +
          '    in ErrorBoundary (at **).'
        }
      />,
    );
  });

  // @gate !disableModulePatternComponents
  it('handles error thrown inside getDerivedStateFromProps of a module-style context provider', async () => {
    function Provider() {
      return {
        getChildContext() {
          return {foo: 'bar'};
        },
        render() {
          return 'Hi';
        },
      };
    }
    Provider.childContextTypes = {
      x: () => {},
    };
    Provider.getDerivedStateFromProps = () => {
      throw new Error('Oops!');
    };

    ReactNoop.render(<Provider />);
    await expect(async () => {
      await waitForThrow('Oops!');
    }).toErrorDev([
      'Warning: The <Provider /> component appears to be a function component that returns a class instance. ' +
        'Change Provider to a class that extends React.Component instead. ' +
        "If you can't use a class try assigning the prototype on the function as a workaround. " +
        '`Provider.prototype = React.Component.prototype`. ' +
        "Don't use an arrow function since it cannot be called with `new` by React.",
    ]);
  });
>>>>>>> remotes/upstream/main

  it('uncaught errors should be discarded if the render is aborted', async () => {
    const root = ReactNoop.createRoot();

    function Oops({unused}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Oops');
=======
      Scheduler.log('Oops');
>>>>>>> remotes/upstream/main
      throw Error('Oops');
    }

    await act(async () => {
<<<<<<< HEAD
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          root.render(<Oops />);
        });
      } else {
        root.render(<Oops />);
      }

      // Render past the component that throws, then yield.
      expect(Scheduler).toFlushAndYieldThrough(['Oops']);
=======
      React.startTransition(() => {
        root.render(<Oops />);
      });

      // Render past the component that throws, then yield.
      await waitFor(['Oops']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(null);
      // Interleaved update. When the root completes, instead of throwing the
      // error, it should try rendering again. This update will cause it to
      // recover gracefully.
      React.startTransition(() => {
        root.render('Everything is fine.');
      });
    });

    // Should finish without throwing.
    expect(root).toMatchRenderedOutput('Everything is fine.');
  });

  it('uncaught errors are discarded if the render is aborted, case 2', async () => {
    const {useState} = React;
    const root = ReactNoop.createRoot();

    let setShouldThrow;
    function Oops() {
      const [shouldThrow, _setShouldThrow] = useState(false);
      setShouldThrow = _setShouldThrow;
      if (shouldThrow) {
        throw Error('Oops');
      }
      return null;
    }

    function AllGood() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Everything is fine.');
      return 'Everything is fine.';
    }

    await act(async () => {
=======
      Scheduler.log('Everything is fine.');
      return 'Everything is fine.';
    }

    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<Oops />);
    });

    await act(async () => {
      // Schedule a default pri and a low pri update on the root.
      root.render(<Oops />);
      React.startTransition(() => {
        root.render(<AllGood />);
      });

      // Render through just the default pri update. The low pri update remains on
      // the queue.
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYieldThrough(['Everything is fine.']);
=======
      await waitFor(['Everything is fine.']);
>>>>>>> remotes/upstream/main

      // Schedule a discrete update on a child that triggers an error.
      // The root should capture this error. But since there's still a pending
      // update on the root, the error should be suppressed.
      ReactNoop.discreteUpdates(() => {
        setShouldThrow(true);
      });
    });
    // Should render the final state without throwing the error.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Everything is fine.']);
=======
    assertLog(['Everything is fine.']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput('Everything is fine.');
  });

  it("does not infinite loop if there's a render phase update in the same render as an error", async () => {
    // Some React features may schedule a render phase update as an
    // implementation detail. When an error is accompanied by a render phase
    // update, we assume that it comes from React internals, because render
    // phase updates triggered from userspace are not allowed (we log a
    // warning). So we keep attempting to recover until no more opaque
    // identifiers need to be upgraded. However, we should give up after some
    // point to prevent an infinite loop in the case where there is (by
    // accident) a render phase triggered from userspace.

<<<<<<< HEAD
    spyOnDev(console, 'error');
=======
    spyOnDev(console, 'error').mockImplementation(() => {});
>>>>>>> remotes/upstream/main

    let numberOfThrows = 0;

    let setStateInRenderPhase;
    function Child() {
      const [, setState] = React.useState(0);
      setStateInRenderPhase = setState;
      return 'All good';
    }

    function App({shouldThrow}) {
      if (shouldThrow) {
        setStateInRenderPhase();
        numberOfThrows++;
        throw new Error('Oops!');
      }
      return <Child />;
    }

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<App shouldThrow={false} />);
    });
    expect(root).toMatchRenderedOutput('All good');

    let error;
    try {
<<<<<<< HEAD
      await act(async () => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        root.render(<App shouldThrow={true} />);
      });
    } catch (e) {
      error = e;
    }

    expect(error.message).toBe('Oops!');
    expect(numberOfThrows < 100).toBe(true);

    if (__DEV__) {
      expect(console.error).toHaveBeenCalledTimes(2);
<<<<<<< HEAD
      expect(console.error.calls.argsFor(0)[0]).toContain(
        'Cannot update a component (`%s`) while rendering a different component',
      );
      expect(console.error.calls.argsFor(1)[0]).toContain(
=======
      expect(console.error.mock.calls[0][0]).toContain(
        'Cannot update a component (`%s`) while rendering a different component',
      );
      expect(console.error.mock.calls[1][0]).toContain(
>>>>>>> remotes/upstream/main
        'The above error occurred in the <App> component',
      );
    }
  });

  if (global.__PERSISTENT__) {
<<<<<<< HEAD
    it('regression test: should fatal if error is thrown at the root', () => {
      const root = ReactNoop.createRoot();
      root.render('Error when completing root');
      expect(Scheduler).toFlushAndThrow('Error when completing root');
=======
    it('regression test: should fatal if error is thrown at the root', async () => {
      const root = ReactNoop.createRoot();
      root.render('Error when completing root');
      await waitForThrow('Error when completing root');
>>>>>>> remotes/upstream/main
    });
  }
});
