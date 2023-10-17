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
<<<<<<< HEAD
=======
let waitFor;
let waitForAll;
>>>>>>> remotes/upstream/main

describe('ReactIncrementalReflection', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
=======

    const InternalTestUtils = require('internal-test-utils');
    waitFor = InternalTestUtils.waitFor;
    waitForAll = InternalTestUtils.waitForAll;
>>>>>>> remotes/upstream/main
  });

  function div(...children) {
    children = children.map(c =>
      typeof c === 'string' ? {text: c, hidden: false} : c,
    );
    return {type: 'div', children, prop: undefined, hidden: false};
  }

  function span(prop) {
    return {type: 'span', children: [], prop, hidden: false};
  }

<<<<<<< HEAD
  it('handles isMounted even when the initial render is deferred', () => {
=======
  it('handles isMounted even when the initial render is deferred', async () => {
>>>>>>> remotes/upstream/main
    const instances = [];

    class Component extends React.Component {
      _isMounted() {
        // No longer a public API, but we can test that it works internally by
        // reaching into the updater.
        return this.updater.isMounted(this);
      }
      UNSAFE_componentWillMount() {
        instances.push(this);
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'componentWillMount: ' + this._isMounted(),
        );
      }
      componentDidMount() {
        Scheduler.unstable_yieldValue(
          'componentDidMount: ' + this._isMounted(),
        );
=======
        Scheduler.log('componentWillMount: ' + this._isMounted());
      }
      componentDidMount() {
        Scheduler.log('componentDidMount: ' + this._isMounted());
>>>>>>> remotes/upstream/main
      }
      render() {
        return <span />;
      }
    }

    function Foo() {
      return <Component />;
    }

<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Foo />);
      });
    } else {
      ReactNoop.render(<Foo />);
    }

    // Render part way through but don't yet commit the updates.
    expect(Scheduler).toFlushAndYieldThrough(['componentWillMount: false']);
=======
    React.startTransition(() => {
      ReactNoop.render(<Foo />);
    });

    // Render part way through but don't yet commit the updates.
    await waitFor(['componentWillMount: false']);
>>>>>>> remotes/upstream/main

    expect(instances[0]._isMounted()).toBe(false);

    // Render the rest and commit the updates.
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['componentDidMount: true']);
=======
    await waitForAll(['componentDidMount: true']);
>>>>>>> remotes/upstream/main

    expect(instances[0]._isMounted()).toBe(true);
  });

<<<<<<< HEAD
  it('handles isMounted when an unmount is deferred', () => {
=======
  it('handles isMounted when an unmount is deferred', async () => {
>>>>>>> remotes/upstream/main
    const instances = [];

    class Component extends React.Component {
      _isMounted() {
        return this.updater.isMounted(this);
      }
      UNSAFE_componentWillMount() {
        instances.push(this);
      }
      componentWillUnmount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'componentWillUnmount: ' + this._isMounted(),
        );
      }
      render() {
        Scheduler.unstable_yieldValue('Component');
=======
        Scheduler.log('componentWillUnmount: ' + this._isMounted());
      }
      render() {
        Scheduler.log('Component');
>>>>>>> remotes/upstream/main
        return <span />;
      }
    }

    function Other() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Other');
=======
      Scheduler.log('Other');
>>>>>>> remotes/upstream/main
      return <span />;
    }

    function Foo(props) {
      return props.mount ? <Component /> : <Other />;
    }

    ReactNoop.render(<Foo mount={true} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Component']);

    expect(instances[0]._isMounted()).toBe(true);

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Foo mount={false} />);
      });
    } else {
      ReactNoop.render(<Foo mount={false} />);
    }
    // Render part way through but don't yet commit the updates so it is not
    // fully unmounted yet.
    expect(Scheduler).toFlushAndYieldThrough(['Other']);
=======
    await waitForAll(['Component']);

    expect(instances[0]._isMounted()).toBe(true);

    React.startTransition(() => {
      ReactNoop.render(<Foo mount={false} />);
    });
    // Render part way through but don't yet commit the updates so it is not
    // fully unmounted yet.
    await waitFor(['Other']);
>>>>>>> remotes/upstream/main

    expect(instances[0]._isMounted()).toBe(true);

    // Finish flushing the unmount.
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['componentWillUnmount: true']);
=======
    await waitForAll(['componentWillUnmount: true']);
>>>>>>> remotes/upstream/main

    expect(instances[0]._isMounted()).toBe(false);
  });

<<<<<<< HEAD
  it('finds no node before insertion and correct node before deletion', () => {
=======
  it('finds no node before insertion and correct node before deletion', async () => {
>>>>>>> remotes/upstream/main
    let classInstance = null;

    function findInstance(inst) {
      // We ignore warnings fired by findInstance because we are testing
      // that the actual behavior still works as expected even though it
      // is deprecated.
      const oldConsoleError = console.error;
      console.error = jest.fn();
      try {
        return ReactNoop.findInstance(inst);
      } finally {
        console.error = oldConsoleError;
      }
    }

    class Component extends React.Component {
      UNSAFE_componentWillMount() {
        classInstance = this;
<<<<<<< HEAD
        Scheduler.unstable_yieldValue([
          'componentWillMount',
          findInstance(this),
        ]);
      }
      componentDidMount() {
        Scheduler.unstable_yieldValue([
          'componentDidMount',
          findInstance(this),
        ]);
      }
      UNSAFE_componentWillUpdate() {
        Scheduler.unstable_yieldValue([
          'componentWillUpdate',
          findInstance(this),
        ]);
      }
      componentDidUpdate() {
        Scheduler.unstable_yieldValue([
          'componentDidUpdate',
          findInstance(this),
        ]);
      }
      componentWillUnmount() {
        Scheduler.unstable_yieldValue([
          'componentWillUnmount',
          findInstance(this),
        ]);
      }
      render() {
        Scheduler.unstable_yieldValue('render');
=======
        Scheduler.log(['componentWillMount', findInstance(this)]);
      }
      componentDidMount() {
        Scheduler.log(['componentDidMount', findInstance(this)]);
      }
      UNSAFE_componentWillUpdate() {
        Scheduler.log(['componentWillUpdate', findInstance(this)]);
      }
      componentDidUpdate() {
        Scheduler.log(['componentDidUpdate', findInstance(this)]);
      }
      componentWillUnmount() {
        Scheduler.log(['componentWillUnmount', findInstance(this)]);
      }
      render() {
        Scheduler.log('render');
>>>>>>> remotes/upstream/main
        return this.props.step < 2 ? (
          <span ref={ref => (this.span = ref)} />
        ) : this.props.step === 2 ? (
          <div ref={ref => (this.div = ref)} />
        ) : this.props.step === 3 ? null : this.props.step === 4 ? (
          <div ref={ref => (this.span = ref)} />
        ) : null;
      }
    }

    function Sibling() {
      // Sibling is used to assert that we've rendered past the first component.
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('render sibling');
=======
      Scheduler.log('render sibling');
>>>>>>> remotes/upstream/main
      return <span />;
    }

    function Foo(props) {
      return [<Component key="a" step={props.step} />, <Sibling key="b" />];
    }

<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Foo step={0} />);
      });
    } else {
      ReactNoop.render(<Foo step={0} />);
    }
    // Flush past Component but don't complete rendering everything yet.
    expect(Scheduler).toFlushAndYieldThrough([
      ['componentWillMount', null],
      'render',
      'render sibling',
    ]);
=======
    React.startTransition(() => {
      ReactNoop.render(<Foo step={0} />);
    });
    // Flush past Component but don't complete rendering everything yet.
    await waitFor([['componentWillMount', null], 'render', 'render sibling']);
>>>>>>> remotes/upstream/main

    expect(classInstance).toBeDefined();
    // The instance has been complete but is still not committed so it should
    // not find any host nodes in it.
    expect(findInstance(classInstance)).toBe(null);

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([['componentDidMount', span()]]);
=======
    await waitForAll([['componentDidMount', span()]]);
>>>>>>> remotes/upstream/main

    const hostSpan = classInstance.span;
    expect(hostSpan).toBeDefined();

    expect(findInstance(classInstance)).toBe(hostSpan);

    // Flush next step which will cause an update but not yet render a new host
    // node.
    ReactNoop.render(<Foo step={1} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      ['componentWillUpdate', hostSpan],
      'render',
      'render sibling',
      ['componentDidUpdate', hostSpan],
    ]);

    expect(ReactNoop.findInstance(classInstance)).toBe(hostSpan);

    // The next step will render a new host node but won't get committed yet.
    // We expect this to mutate the original Fiber.
<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Foo step={2} />);
      });
    } else {
      ReactNoop.render(<Foo step={2} />);
    }
    expect(Scheduler).toFlushAndYieldThrough([
=======
    React.startTransition(() => {
      ReactNoop.render(<Foo step={2} />);
    });
    await waitFor([
>>>>>>> remotes/upstream/main
      ['componentWillUpdate', hostSpan],
      'render',
      'render sibling',
    ]);

    // This should still be the host span.
    expect(ReactNoop.findInstance(classInstance)).toBe(hostSpan);

    // When we finally flush the tree it will get committed.
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([['componentDidUpdate', div()]]);
=======
    await waitForAll([['componentDidUpdate', div()]]);
>>>>>>> remotes/upstream/main

    const hostDiv = classInstance.div;
    expect(hostDiv).toBeDefined();
    expect(hostSpan).not.toBe(hostDiv);

    // We should now find the new host node.
    expect(ReactNoop.findInstance(classInstance)).toBe(hostDiv);

    // Render to null but don't commit it yet.
<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Foo step={3} />);
      });
    } else {
      ReactNoop.render(<Foo step={3} />);
    }
    expect(Scheduler).toFlushAndYieldThrough([
=======
    React.startTransition(() => {
      ReactNoop.render(<Foo step={3} />);
    });
    await waitFor([
>>>>>>> remotes/upstream/main
      ['componentWillUpdate', hostDiv],
      'render',
      'render sibling',
    ]);

    // This should still be the host div since the deletion is not committed.
    expect(ReactNoop.findInstance(classInstance)).toBe(hostDiv);

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([['componentDidUpdate', null]]);
=======
    await waitForAll([['componentDidUpdate', null]]);
>>>>>>> remotes/upstream/main

    // This should still be the host div since the deletion is not committed.
    expect(ReactNoop.findInstance(classInstance)).toBe(null);

    // Render a div again
    ReactNoop.render(<Foo step={4} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      ['componentWillUpdate', null],
      'render',
      'render sibling',
      ['componentDidUpdate', div()],
    ]);

    // Unmount the component.
    ReactNoop.render([]);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([['componentWillUnmount', hostDiv]]);
=======
    await waitForAll([['componentWillUnmount', hostDiv]]);
>>>>>>> remotes/upstream/main
  });
});
