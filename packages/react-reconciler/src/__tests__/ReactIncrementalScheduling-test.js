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
<<<<<<< HEAD
=======
let waitForAll;
let waitFor;
let assertLog;
let waitForPaint;
>>>>>>> remotes/upstream/main

describe('ReactIncrementalScheduling', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;
  });

  function span(prop) {
    return {type: 'span', children: [], prop, hidden: false};
  }

  it('schedules and flushes deferred work', () => {
    ReactNoop.render(<span prop="1" />);
    expect(ReactNoop.getChildren()).toEqual([]);

    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop).toMatchRenderedOutput(<span prop="1" />);
  });

  it('searches for work on other roots once the current root completes', () => {
=======
    act = require('internal-test-utils').act;

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitFor = InternalTestUtils.waitFor;
    assertLog = InternalTestUtils.assertLog;
    waitForPaint = InternalTestUtils.waitForPaint;
  });

  it('schedules and flushes deferred work', async () => {
    ReactNoop.render(<span prop="1" />);
    expect(ReactNoop).toMatchRenderedOutput(null);

    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput(<span prop="1" />);
  });

  it('searches for work on other roots once the current root completes', async () => {
>>>>>>> remotes/upstream/main
    ReactNoop.renderToRootWithID(<span prop="a:1" />, 'a');
    ReactNoop.renderToRootWithID(<span prop="b:1" />, 'b');
    ReactNoop.renderToRootWithID(<span prop="c:1" />, 'c');

<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    expect(ReactNoop.getChildren('a')).toEqual([span('a:1')]);
    expect(ReactNoop.getChildren('b')).toEqual([span('b:1')]);
    expect(ReactNoop.getChildren('c')).toEqual([span('c:1')]);
  });

  it('schedules top-level updates in order of priority', () => {
    // Initial render.
    ReactNoop.render(<span prop={1} />);
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);

    expect(ReactNoop.getChildrenAsJSX('a')).toEqual(<span prop="a:1" />);
    expect(ReactNoop.getChildrenAsJSX('b')).toEqual(<span prop="b:1" />);
    expect(ReactNoop.getChildrenAsJSX('c')).toEqual(<span prop="c:1" />);
  });

  it('schedules top-level updates in order of priority', async () => {
    // Initial render.
    ReactNoop.render(<span prop={1} />);
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(ReactNoop).toMatchRenderedOutput(<span prop={1} />);

    ReactNoop.batchedUpdates(() => {
      ReactNoop.render(<span prop={5} />);
      ReactNoop.flushSync(() => {
        ReactNoop.render(<span prop={2} />);
        ReactNoop.render(<span prop={3} />);
        ReactNoop.render(<span prop={4} />);
      });
    });
    // The sync updates flush first.
    expect(ReactNoop).toMatchRenderedOutput(<span prop={4} />);

    // The terminal value should be the last update that was scheduled,
    // regardless of priority. In this case, that's the last sync update.
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop).toMatchRenderedOutput(<span prop={4} />);
  });

  it('schedules top-level updates with same priority in order of insertion', () => {
    // Initial render.
    ReactNoop.render(<span prop={1} />);
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput(<span prop={4} />);
  });

  it('schedules top-level updates with same priority in order of insertion', async () => {
    // Initial render.
    ReactNoop.render(<span prop={1} />);
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(ReactNoop).toMatchRenderedOutput(<span prop={1} />);

    ReactNoop.render(<span prop={2} />);
    ReactNoop.render(<span prop={3} />);
    ReactNoop.render(<span prop={4} />);
    ReactNoop.render(<span prop={5} />);

<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop).toMatchRenderedOutput(<span prop={5} />);
  });

  it('works on deferred roots in the order they were scheduled', () => {
    const {useEffect} = React;
    function Text({text}) {
      useEffect(() => {
        Scheduler.unstable_yieldValue(text);
=======
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput(<span prop={5} />);
  });

  it('works on deferred roots in the order they were scheduled', async () => {
    const {useEffect} = React;
    function Text({text}) {
      useEffect(() => {
        Scheduler.log(text);
>>>>>>> remotes/upstream/main
      }, [text]);
      return text;
    }

<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.renderToRootWithID(<Text text="a:1" />, 'a');
      ReactNoop.renderToRootWithID(<Text text="b:1" />, 'b');
      ReactNoop.renderToRootWithID(<Text text="c:1" />, 'c');
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['a:1', 'b:1', 'c:1']);
=======
    assertLog(['a:1', 'b:1', 'c:1']);
>>>>>>> remotes/upstream/main

    expect(ReactNoop.getChildrenAsJSX('a')).toEqual('a:1');
    expect(ReactNoop.getChildrenAsJSX('b')).toEqual('b:1');
    expect(ReactNoop.getChildrenAsJSX('c')).toEqual('c:1');

    // Schedule deferred work in the reverse order
<<<<<<< HEAD
    act(() => {
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          ReactNoop.renderToRootWithID(<Text text="c:2" />, 'c');
          ReactNoop.renderToRootWithID(<Text text="b:2" />, 'b');
        });
      } else {
        ReactNoop.renderToRootWithID(<Text text="c:2" />, 'c');
        ReactNoop.renderToRootWithID(<Text text="b:2" />, 'b');
      }
      // Ensure it starts in the order it was scheduled
      expect(Scheduler).toFlushAndYieldThrough(['c:2']);
=======
    await act(async () => {
      React.startTransition(() => {
        ReactNoop.renderToRootWithID(<Text text="c:2" />, 'c');
        ReactNoop.renderToRootWithID(<Text text="b:2" />, 'b');
      });
      // Ensure it starts in the order it was scheduled
      await waitFor(['c:2']);
>>>>>>> remotes/upstream/main

      expect(ReactNoop.getChildrenAsJSX('a')).toEqual('a:1');
      expect(ReactNoop.getChildrenAsJSX('b')).toEqual('b:1');
      expect(ReactNoop.getChildrenAsJSX('c')).toEqual('c:2');
      // Schedule last bit of work, it will get processed the last

<<<<<<< HEAD
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          ReactNoop.renderToRootWithID(<Text text="a:2" />, 'a');
        });
      } else {
        ReactNoop.renderToRootWithID(<Text text="a:2" />, 'a');
      }

      // Keep performing work in the order it was scheduled
      expect(Scheduler).toFlushAndYieldThrough(['b:2']);
=======
      React.startTransition(() => {
        ReactNoop.renderToRootWithID(<Text text="a:2" />, 'a');
      });

      // Keep performing work in the order it was scheduled
      await waitFor(['b:2']);
>>>>>>> remotes/upstream/main
      expect(ReactNoop.getChildrenAsJSX('a')).toEqual('a:1');
      expect(ReactNoop.getChildrenAsJSX('b')).toEqual('b:2');
      expect(ReactNoop.getChildrenAsJSX('c')).toEqual('c:2');

<<<<<<< HEAD
      expect(Scheduler).toFlushAndYieldThrough(['a:2']);
=======
      await waitFor(['a:2']);
>>>>>>> remotes/upstream/main
      expect(ReactNoop.getChildrenAsJSX('a')).toEqual('a:2');
      expect(ReactNoop.getChildrenAsJSX('b')).toEqual('b:2');
      expect(ReactNoop.getChildrenAsJSX('c')).toEqual('c:2');
    });
  });

<<<<<<< HEAD
  it('schedules sync updates when inside componentDidMount/Update', () => {
=======
  it('schedules sync updates when inside componentDidMount/Update', async () => {
>>>>>>> remotes/upstream/main
    let instance;

    class Foo extends React.Component {
      state = {tick: 0};

      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
=======
        Scheduler.log(
>>>>>>> remotes/upstream/main
          'componentDidMount (before setState): ' + this.state.tick,
        );
        this.setState({tick: 1});
        // We're in a batch. Update hasn't flushed yet.
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'componentDidMount (after setState): ' + this.state.tick,
        );
      }

      componentDidUpdate() {
        Scheduler.unstable_yieldValue('componentDidUpdate: ' + this.state.tick);
        if (this.state.tick === 2) {
          Scheduler.unstable_yieldValue(
            'componentDidUpdate (before setState): ' + this.state.tick,
          );
          this.setState({tick: 3});
          Scheduler.unstable_yieldValue(
=======
        Scheduler.log('componentDidMount (after setState): ' + this.state.tick);
      }

      componentDidUpdate() {
        Scheduler.log('componentDidUpdate: ' + this.state.tick);
        if (this.state.tick === 2) {
          Scheduler.log(
            'componentDidUpdate (before setState): ' + this.state.tick,
          );
          this.setState({tick: 3});
          Scheduler.log(
>>>>>>> remotes/upstream/main
            'componentDidUpdate (after setState): ' + this.state.tick,
          );
          // We're in a batch. Update hasn't flushed yet.
        }
      }

      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('render: ' + this.state.tick);
=======
        Scheduler.log('render: ' + this.state.tick);
>>>>>>> remotes/upstream/main
        instance = this;
        return <span prop={this.state.tick} />;
      }
    }

<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Foo />);
      });
    } else {
      ReactNoop.render(<Foo />);
    }
    // Render without committing
    expect(Scheduler).toFlushAndYieldThrough(['render: 0']);
=======
    React.startTransition(() => {
      ReactNoop.render(<Foo />);
    });
    // Render without committing
    await waitFor(['render: 0']);
>>>>>>> remotes/upstream/main

    // Do one more unit of work to commit
    expect(ReactNoop.flushNextYield()).toEqual([
      'componentDidMount (before setState): 0',
      'componentDidMount (after setState): 0',
      // If the setState inside componentDidMount were deferred, there would be
      // no more ops. Because it has Task priority, we get these ops, too:
      'render: 1',
      'componentDidUpdate: 1',
    ]);

<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        instance.setState({tick: 2});
      });
    } else {
      instance.setState({tick: 2});
    }
    expect(Scheduler).toFlushAndYieldThrough(['render: 2']);
=======
    React.startTransition(() => {
      instance.setState({tick: 2});
    });
    await waitFor(['render: 2']);
>>>>>>> remotes/upstream/main
    expect(ReactNoop.flushNextYield()).toEqual([
      'componentDidUpdate: 2',
      'componentDidUpdate (before setState): 2',
      'componentDidUpdate (after setState): 2',
      // If the setState inside componentDidUpdate were deferred, there would be
      // no more ops. Because it has Task priority, we get these ops, too:
      'render: 3',
      'componentDidUpdate: 3',
    ]);
  });

<<<<<<< HEAD
  it('can opt-in to async scheduling inside componentDidMount/Update', () => {
=======
  it('can opt-in to async scheduling inside componentDidMount/Update', async () => {
>>>>>>> remotes/upstream/main
    let instance;
    class Foo extends React.Component {
      state = {tick: 0};

      componentDidMount() {
        React.startTransition(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
            'componentDidMount (before setState): ' + this.state.tick,
          );
          this.setState({tick: 1});
          Scheduler.unstable_yieldValue(
=======
          Scheduler.log(
            'componentDidMount (before setState): ' + this.state.tick,
          );
          this.setState({tick: 1});
          Scheduler.log(
>>>>>>> remotes/upstream/main
            'componentDidMount (after setState): ' + this.state.tick,
          );
        });
      }

      componentDidUpdate() {
        React.startTransition(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
            'componentDidUpdate: ' + this.state.tick,
          );
          if (this.state.tick === 2) {
            Scheduler.unstable_yieldValue(
              'componentDidUpdate (before setState): ' + this.state.tick,
            );
            this.setState({tick: 3});
            Scheduler.unstable_yieldValue(
=======
          Scheduler.log('componentDidUpdate: ' + this.state.tick);
          if (this.state.tick === 2) {
            Scheduler.log(
              'componentDidUpdate (before setState): ' + this.state.tick,
            );
            this.setState({tick: 3});
            Scheduler.log(
>>>>>>> remotes/upstream/main
              'componentDidUpdate (after setState): ' + this.state.tick,
            );
          }
        });
      }

      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('render: ' + this.state.tick);
=======
        Scheduler.log('render: ' + this.state.tick);
>>>>>>> remotes/upstream/main
        instance = this;
        return <span prop={this.state.tick} />;
      }
    }

    ReactNoop.flushSync(() => {
      ReactNoop.render(<Foo />);
    });
    // The cDM update should not have flushed yet because it has async priority.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'render: 0',
      'componentDidMount (before setState): 0',
      'componentDidMount (after setState): 0',
    ]);
    expect(ReactNoop).toMatchRenderedOutput(<span prop={0} />);

    // Now flush the cDM update.
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['render: 1', 'componentDidUpdate: 1']);
=======
    await waitForAll(['render: 1', 'componentDidUpdate: 1']);
>>>>>>> remotes/upstream/main
    expect(ReactNoop).toMatchRenderedOutput(<span prop={1} />);

    React.startTransition(() => {
      instance.setState({tick: 2});
    });

<<<<<<< HEAD
    expect(Scheduler).toFlushUntilNextPaint([
=======
    await waitForPaint([
>>>>>>> remotes/upstream/main
      'render: 2',
      'componentDidUpdate: 2',
      'componentDidUpdate (before setState): 2',
      'componentDidUpdate (after setState): 2',
    ]);
    expect(ReactNoop).toMatchRenderedOutput(<span prop={2} />);

    // Now flush the cDU update.
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['render: 3', 'componentDidUpdate: 3']);
    expect(ReactNoop).toMatchRenderedOutput(<span prop={3} />);
  });

  it('performs Task work even after time runs out', () => {
=======
    await waitForAll(['render: 3', 'componentDidUpdate: 3']);
    expect(ReactNoop).toMatchRenderedOutput(<span prop={3} />);
  });

  it('performs Task work even after time runs out', async () => {
>>>>>>> remotes/upstream/main
    class Foo extends React.Component {
      state = {step: 1};
      componentDidMount() {
        this.setState({step: 2}, () => {
          this.setState({step: 3}, () => {
            this.setState({step: 4}, () => {
              this.setState({step: 5});
            });
          });
        });
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Foo');
        return <span prop={this.state.step} />;
      }
    }
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Foo />);
      });
    } else {
      ReactNoop.render(<Foo />);
    }

    // This should be just enough to complete all the work, but not enough to
    // commit it.
    expect(Scheduler).toFlushAndYieldThrough(['Foo']);
=======
        Scheduler.log('Foo');
        return <span prop={this.state.step} />;
      }
    }
    React.startTransition(() => {
      ReactNoop.render(<Foo />);
    });

    // This should be just enough to complete all the work, but not enough to
    // commit it.
    await waitFor(['Foo']);
>>>>>>> remotes/upstream/main
    expect(ReactNoop).toMatchRenderedOutput(null);

    // Do one more unit of work.
    ReactNoop.flushNextYield();
    // The updates should all be flushed with Task priority
    expect(ReactNoop).toMatchRenderedOutput(<span prop={5} />);
  });
});
