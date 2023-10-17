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
let PropTypes;
<<<<<<< HEAD
=======
let waitForAll;
let waitFor;
let waitForThrow;
let assertLog;
>>>>>>> remotes/upstream/main

describe('ReactIncremental', () => {
  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
    PropTypes = require('prop-types');
<<<<<<< HEAD
=======

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitFor = InternalTestUtils.waitFor;
    waitForThrow = InternalTestUtils.waitForThrow;
    assertLog = InternalTestUtils.assertLog;
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

<<<<<<< HEAD
  it('should render a simple component', () => {
=======
  it('should render a simple component', async () => {
>>>>>>> remotes/upstream/main
    function Bar() {
      return <div>Hello World</div>;
    }

    function Foo() {
      return <Bar isBar={true} />;
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
  });

  it('should render a simple component, in steps if needed', () => {
    function Bar() {
      Scheduler.unstable_yieldValue('Bar');
=======
    await waitForAll([]);
  });

  it('should render a simple component, in steps if needed', async () => {
    function Bar() {
      Scheduler.log('Bar');
>>>>>>> remotes/upstream/main
      return (
        <span>
          <div>Hello World</div>
        </span>
      );
    }

    function Foo() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
      return [<Bar key="a" isBar={true} />, <Bar key="b" isBar={true} />];
    }

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Foo />, () =>
          Scheduler.unstable_yieldValue('callback'),
        );
      });
    } else {
      ReactNoop.render(<Foo />, () =>
        Scheduler.unstable_yieldValue('callback'),
      );
    }
    // Do one step of work.
    expect(ReactNoop.flushNextYield()).toEqual(['Foo']);

    // Do the rest of the work.
    expect(Scheduler).toFlushAndYield(['Bar', 'Bar', 'callback']);
  });

  it('updates a previous render', () => {
    function Header() {
      Scheduler.unstable_yieldValue('Header');
=======
      Scheduler.log('Foo');
      return [<Bar key="a" isBar={true} />, <Bar key="b" isBar={true} />];
    }

    React.startTransition(() => {
      ReactNoop.render(<Foo />, () => Scheduler.log('callback'));
    });
    // Do one step of work.
    await waitFor(['Foo']);

    // Do the rest of the work.
    await waitForAll(['Bar', 'Bar', 'callback']);
  });

  it('updates a previous render', async () => {
    function Header() {
      Scheduler.log('Header');
>>>>>>> remotes/upstream/main
      return <h1>Hi</h1>;
    }

    function Content(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Content');
=======
      Scheduler.log('Content');
>>>>>>> remotes/upstream/main
      return <div>{props.children}</div>;
    }

    function Footer() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Footer');
=======
      Scheduler.log('Footer');
>>>>>>> remotes/upstream/main
      return <footer>Bye</footer>;
    }

    const header = <Header />;
    const footer = <Footer />;

    function Foo(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <div>
          {header}
          <Content>{props.text}</Content>
          {footer}
        </div>
      );
    }

    ReactNoop.render(<Foo text="foo" />, () =>
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('renderCallbackCalled'),
    );
    expect(Scheduler).toFlushAndYield([
=======
      Scheduler.log('renderCallbackCalled'),
    );
    await waitForAll([
>>>>>>> remotes/upstream/main
      'Foo',
      'Header',
      'Content',
      'Footer',
      'renderCallbackCalled',
    ]);

    ReactNoop.render(<Foo text="bar" />, () =>
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('firstRenderCallbackCalled'),
    );
    ReactNoop.render(<Foo text="bar" />, () =>
      Scheduler.unstable_yieldValue('secondRenderCallbackCalled'),
=======
      Scheduler.log('firstRenderCallbackCalled'),
    );
    ReactNoop.render(<Foo text="bar" />, () =>
      Scheduler.log('secondRenderCallbackCalled'),
>>>>>>> remotes/upstream/main
    );
    // TODO: Test bail out of host components. This is currently unobservable.

    // Since this is an update, it should bail out and reuse the work from
    // Header and Content.
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'Foo',
      'Content',
      'firstRenderCallbackCalled',
      'secondRenderCallbackCalled',
    ]);
  });

<<<<<<< HEAD
  it('can cancel partially rendered work and restart', () => {
    function Bar(props) {
      Scheduler.unstable_yieldValue('Bar');
=======
  it('can cancel partially rendered work and restart', async () => {
    function Bar(props) {
      Scheduler.log('Bar');
>>>>>>> remotes/upstream/main
      return <div>{props.children}</div>;
    }

    function Foo(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Bar>{props.text}</Bar>
          <Bar>{props.text}</Bar>
        </div>
      );
    }

    // Init
    ReactNoop.render(<Foo text="foo" />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Foo', 'Bar', 'Bar']);

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Foo text="bar" />);
      });
    } else {
      ReactNoop.render(<Foo text="bar" />);
    }
    // Flush part of the work
    expect(Scheduler).toFlushAndYieldThrough(['Foo', 'Bar']);
=======
    await waitForAll(['Foo', 'Bar', 'Bar']);

    React.startTransition(() => {
      ReactNoop.render(<Foo text="bar" />);
    });
    // Flush part of the work
    await waitFor(['Foo', 'Bar']);
>>>>>>> remotes/upstream/main

    // This will abort the previous work and restart
    ReactNoop.flushSync(() => ReactNoop.render(null));

<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Foo text="baz" />);
      });
    } else {
      ReactNoop.render(<Foo text="baz" />);
    }

    // Flush part of the new work
    expect(Scheduler).toFlushAndYieldThrough(['Foo', 'Bar']);

    // Flush the rest of the work which now includes the low priority
    expect(Scheduler).toFlushAndYield(['Bar']);
  });

  it('should call callbacks even if updates are aborted', () => {
=======
    React.startTransition(() => {
      ReactNoop.render(<Foo text="baz" />);
    });

    // Flush part of the new work
    await waitFor(['Foo', 'Bar']);

    // Flush the rest of the work which now includes the low priority
    await waitForAll(['Bar']);
  });

  it('should call callbacks even if updates are aborted', async () => {
>>>>>>> remotes/upstream/main
    let inst;

    class Foo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          text: 'foo',
          text2: 'foo',
        };
        inst = this;
      }
      render() {
        return (
          <div>
            <div>{this.state.text}</div>
            <div>{this.state.text2}</div>
          </div>
        );
      }
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        inst.setState(
          () => {
            Scheduler.unstable_yieldValue('setState1');
            return {text: 'bar'};
          },
          () => Scheduler.unstable_yieldValue('callback1'),
        );
      });
    } else {
      inst.setState(
        () => {
          Scheduler.unstable_yieldValue('setState1');
          return {text: 'bar'};
        },
        () => Scheduler.unstable_yieldValue('callback1'),
      );
    }

    // Flush part of the work
    expect(Scheduler).toFlushAndYieldThrough(['setState1']);

    // This will abort the previous work and restart
    ReactNoop.flushSync(() => ReactNoop.render(<Foo />));
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        inst.setState(
          () => {
            Scheduler.unstable_yieldValue('setState2');
            return {text2: 'baz'};
          },
          () => Scheduler.unstable_yieldValue('callback2'),
        );
      });
    } else {
      inst.setState(
        () => {
          Scheduler.unstable_yieldValue('setState2');
          return {text2: 'baz'};
        },
        () => Scheduler.unstable_yieldValue('callback2'),
      );
    }

    // Flush the rest of the work which now includes the low priority
    expect(Scheduler).toFlushAndYield([
      'setState1',
      'setState2',
      'callback1',
      'callback2',
    ]);
=======
    await waitForAll([]);

    React.startTransition(() => {
      inst.setState(
        () => {
          Scheduler.log('setState1');
          return {text: 'bar'};
        },
        () => Scheduler.log('callback1'),
      );
    });

    // Flush part of the work
    await waitFor(['setState1']);

    // This will abort the previous work and restart
    ReactNoop.flushSync(() => ReactNoop.render(<Foo />));
    React.startTransition(() => {
      inst.setState(
        () => {
          Scheduler.log('setState2');
          return {text2: 'baz'};
        },
        () => Scheduler.log('callback2'),
      );
    });

    // Flush the rest of the work which now includes the low priority
    await waitForAll(['setState1', 'setState2', 'callback1', 'callback2']);
>>>>>>> remotes/upstream/main
    expect(inst.state).toEqual({text: 'bar', text2: 'baz'});
  });

  // @gate www
<<<<<<< HEAD
  it('can deprioritize unfinished work and resume it later', () => {
    function Bar(props) {
      Scheduler.unstable_yieldValue('Bar');
=======
  it('can deprioritize unfinished work and resume it later', async () => {
    function Bar(props) {
      Scheduler.log('Bar');
>>>>>>> remotes/upstream/main
      return <div>{props.children}</div>;
    }

    function Middle(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Middle');
=======
      Scheduler.log('Middle');
>>>>>>> remotes/upstream/main
      return <span>{props.children}</span>;
    }

    function Foo(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Bar>{props.text}</Bar>
          <LegacyHiddenDiv mode="hidden">
            <Middle>{props.text}</Middle>
          </LegacyHiddenDiv>
          <Bar>{props.text}</Bar>
          <LegacyHiddenDiv mode="hidden">
            <Middle>Footer</Middle>
          </LegacyHiddenDiv>
        </div>
      );
    }

    // Init
    ReactNoop.render(<Foo text="foo" />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'Foo',
      'Bar',
      'Bar',
      'Middle',
      'Middle',
    ]);
=======
    await waitForAll(['Foo', 'Bar', 'Bar', 'Middle', 'Middle']);
>>>>>>> remotes/upstream/main

    // Render part of the work. This should be enough to flush everything except
    // the middle which has lower priority.
    ReactNoop.render(<Foo text="bar" />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough(['Foo', 'Bar', 'Bar']);
    // Flush only the remaining work
    expect(Scheduler).toFlushAndYield(['Middle', 'Middle']);
  });

  // @gate www
  it('can deprioritize a tree from without dropping work', () => {
    function Bar(props) {
      Scheduler.unstable_yieldValue('Bar');
=======
    await waitFor(['Foo', 'Bar', 'Bar']);
    // Flush only the remaining work
    await waitForAll(['Middle', 'Middle']);
  });

  // @gate www
  it('can deprioritize a tree from without dropping work', async () => {
    function Bar(props) {
      Scheduler.log('Bar');
>>>>>>> remotes/upstream/main
      return <div>{props.children}</div>;
    }

    function Middle(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Middle');
=======
      Scheduler.log('Middle');
>>>>>>> remotes/upstream/main
      return <span>{props.children}</span>;
    }

    function Foo(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Bar>{props.text}</Bar>
          <LegacyHiddenDiv mode="hidden">
            <Middle>{props.text}</Middle>
          </LegacyHiddenDiv>
          <Bar>{props.text}</Bar>
          <LegacyHiddenDiv mode="hidden">
            <Middle>Footer</Middle>
          </LegacyHiddenDiv>
        </div>
      );
    }

    // Init
    ReactNoop.flushSync(() => {
      ReactNoop.render(<Foo text="foo" />);
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar', 'Bar']);
    expect(Scheduler).toFlushAndYield(['Middle', 'Middle']);
=======
    assertLog(['Foo', 'Bar', 'Bar']);
    await waitForAll(['Middle', 'Middle']);
>>>>>>> remotes/upstream/main

    // Render the high priority work (everything except the hidden trees).
    ReactNoop.flushSync(() => {
      ReactNoop.render(<Foo text="foo" />);
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar', 'Bar']);

    // The hidden content was deprioritized from high to low priority. A low
    // priority callback should have been scheduled. Flush it now.
    expect(Scheduler).toFlushAndYield(['Middle', 'Middle']);
  });

  xit('can resume work in a subtree even when a parent bails out', () => {
    function Bar(props) {
      Scheduler.unstable_yieldValue('Bar');
=======
    assertLog(['Foo', 'Bar', 'Bar']);

    // The hidden content was deprioritized from high to low priority. A low
    // priority callback should have been scheduled. Flush it now.
    await waitForAll(['Middle', 'Middle']);
  });

  xit('can resume work in a subtree even when a parent bails out', async () => {
    function Bar(props) {
      Scheduler.log('Bar');
>>>>>>> remotes/upstream/main
      return <div>{props.children}</div>;
    }

    function Tester() {
      // This component is just here to ensure that the bail out is
      // in fact in effect in the expected place for this test.
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Tester');
=======
      Scheduler.log('Tester');
>>>>>>> remotes/upstream/main
      return <div />;
    }

    function Middle(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Middle');
=======
      Scheduler.log('Middle');
>>>>>>> remotes/upstream/main
      return <span>{props.children}</span>;
    }

    const middleContent = (
      <aaa>
        <Tester />
        <bbb hidden={true}>
          <ccc>
            <Middle>Hi</Middle>
          </ccc>
        </bbb>
      </aaa>
    );

    function Foo(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Bar>{props.text}</Bar>
          {middleContent}
          <Bar>{props.text}</Bar>
        </div>
      );
    }

    // Init
    ReactNoop.render(<Foo text="foo" />);
    ReactNoop.flushDeferredPri(52);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar', 'Tester', 'Bar']);
=======
    assertLog(['Foo', 'Bar', 'Tester', 'Bar']);
>>>>>>> remotes/upstream/main

    // We're now rendering an update that will bail out on updating middle.
    ReactNoop.render(<Foo text="bar" />);
    ReactNoop.flushDeferredPri(45 + 5);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar', 'Bar']);

    // Flush the rest to make sure that the bailout didn't block this work.
    expect(Scheduler).toFlushAndYield(['Middle']);
  });

  xit('can resume work in a bailed subtree within one pass', () => {
    function Bar(props) {
      Scheduler.unstable_yieldValue('Bar');
=======
    assertLog(['Foo', 'Bar', 'Bar']);

    // Flush the rest to make sure that the bailout didn't block this work.
    await waitForAll(['Middle']);
  });

  xit('can resume work in a bailed subtree within one pass', async () => {
    function Bar(props) {
      Scheduler.log('Bar');
>>>>>>> remotes/upstream/main
      return <div>{props.children}</div>;
    }

    class Tester extends React.Component {
      shouldComponentUpdate() {
        return false;
      }
      render() {
        // This component is just here to ensure that the bail out is
        // in fact in effect in the expected place for this test.
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Tester');
=======
        Scheduler.log('Tester');
>>>>>>> remotes/upstream/main
        return <div />;
      }
    }

    function Middle(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Middle');
=======
      Scheduler.log('Middle');
>>>>>>> remotes/upstream/main
      return <span>{props.children}</span>;
    }

    // Should content not just bail out on current, not workInProgress?

    class Content extends React.Component {
      shouldComponentUpdate() {
        return false;
      }
      render() {
        return [
          <Tester key="a" unused={this.props.unused} />,
          <bbb key="b" hidden={true}>
            <ccc>
              <Middle>Hi</Middle>
            </ccc>
          </bbb>,
        ];
      }
    }

    function Foo(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <div hidden={props.text === 'bar'}>
          <Bar>{props.text}</Bar>
          <Content unused={props.text} />
          <Bar>{props.text}</Bar>
        </div>
      );
    }

    // Init
    ReactNoop.render(<Foo text="foo" />);
    ReactNoop.flushDeferredPri(52 + 5);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar', 'Tester', 'Bar']);
=======
    assertLog(['Foo', 'Bar', 'Tester', 'Bar']);
>>>>>>> remotes/upstream/main

    // Make a quick update which will create a low pri tree on top of the
    // already low pri tree.
    ReactNoop.render(<Foo text="bar" />);
    ReactNoop.flushDeferredPri(15);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo']);
=======
    assertLog(['Foo']);
>>>>>>> remotes/upstream/main

    // At this point, middle will bail out but it has not yet fully rendered.
    // Since that is the same priority as its parent tree. This should render
    // as a single batch. Therefore, it is correct that Middle should be in the
    // middle. If it occurs after the two "Bar" components then it was flushed
    // after them which is not correct.
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Bar', 'Middle', 'Bar']);
=======
    await waitForAll(['Bar', 'Middle', 'Bar']);
>>>>>>> remotes/upstream/main

    // Let us try this again without fully finishing the first time. This will
    // create a hanging subtree that is reconciling at the normal priority.
    ReactNoop.render(<Foo text="foo" />);
    ReactNoop.flushDeferredPri(40);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar']);
=======
    assertLog(['Foo', 'Bar']);
>>>>>>> remotes/upstream/main

    // This update will create a tree that aborts that work and down-prioritizes
    // it. If the priority levels aren't down-prioritized correctly this may
    // abort rendering of the down-prioritized content.
    ReactNoop.render(<Foo text="bar" />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Foo', 'Bar', 'Bar']);
  });

  xit('can resume mounting a class component', () => {
=======
    await waitForAll(['Foo', 'Bar', 'Bar']);
  });

  xit('can resume mounting a class component', async () => {
>>>>>>> remotes/upstream/main
    let foo;
    class Parent extends React.Component {
      shouldComponentUpdate() {
        return false;
      }
      render() {
        return <Foo prop={this.props.prop} />;
      }
    }

    class Foo extends React.Component {
      constructor(props) {
        super(props);
        // Test based on a www bug where props was null on resume
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Foo constructor: ' + props.prop);
      }
      render() {
        foo = this;
        Scheduler.unstable_yieldValue('Foo');
=======
        Scheduler.log('Foo constructor: ' + props.prop);
      }
      render() {
        foo = this;
        Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
        return <Bar />;
      }
    }

    function Bar() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Bar');
=======
      Scheduler.log('Bar');
>>>>>>> remotes/upstream/main
      return <div />;
    }

    ReactNoop.render(<Parent prop="foo" />);
    ReactNoop.flushDeferredPri(20);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo constructor: foo', 'Foo']);

    foo.setState({value: 'bar'});

    expect(Scheduler).toFlushAndYield(['Foo', 'Bar']);
  });

  xit('reuses the same instance when resuming a class instance', () => {
=======
    assertLog(['Foo constructor: foo', 'Foo']);

    foo.setState({value: 'bar'});

    await waitForAll(['Foo', 'Bar']);
  });

  xit('reuses the same instance when resuming a class instance', async () => {
>>>>>>> remotes/upstream/main
    let foo;
    class Parent extends React.Component {
      shouldComponentUpdate() {
        return false;
      }
      render() {
        return <Foo prop={this.props.prop} />;
      }
    }

    let constructorCount = 0;
    class Foo extends React.Component {
      constructor(props) {
        super(props);
        // Test based on a www bug where props was null on resume
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('constructor: ' + props.prop);
        constructorCount++;
      }
      UNSAFE_componentWillMount() {
        Scheduler.unstable_yieldValue('componentWillMount: ' + this.props.prop);
      }
      UNSAFE_componentWillReceiveProps() {
        Scheduler.unstable_yieldValue(
          'componentWillReceiveProps: ' + this.props.prop,
        );
      }
      componentDidMount() {
        Scheduler.unstable_yieldValue('componentDidMount: ' + this.props.prop);
      }
      UNSAFE_componentWillUpdate() {
        Scheduler.unstable_yieldValue(
          'componentWillUpdate: ' + this.props.prop,
        );
      }
      componentDidUpdate() {
        Scheduler.unstable_yieldValue('componentDidUpdate: ' + this.props.prop);
      }
      render() {
        foo = this;
        Scheduler.unstable_yieldValue('render: ' + this.props.prop);
=======
        Scheduler.log('constructor: ' + props.prop);
        constructorCount++;
      }
      UNSAFE_componentWillMount() {
        Scheduler.log('componentWillMount: ' + this.props.prop);
      }
      UNSAFE_componentWillReceiveProps() {
        Scheduler.log('componentWillReceiveProps: ' + this.props.prop);
      }
      componentDidMount() {
        Scheduler.log('componentDidMount: ' + this.props.prop);
      }
      UNSAFE_componentWillUpdate() {
        Scheduler.log('componentWillUpdate: ' + this.props.prop);
      }
      componentDidUpdate() {
        Scheduler.log('componentDidUpdate: ' + this.props.prop);
      }
      render() {
        foo = this;
        Scheduler.log('render: ' + this.props.prop);
>>>>>>> remotes/upstream/main
        return <Bar />;
      }
    }

    function Bar() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo did complete');
=======
      Scheduler.log('Foo did complete');
>>>>>>> remotes/upstream/main
      return <div />;
    }

    ReactNoop.render(<Parent prop="foo" />);
    ReactNoop.flushDeferredPri(25);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'constructor: foo',
      'componentWillMount: foo',
      'render: foo',
      'Foo did complete',
    ]);

    foo.setState({value: 'bar'});

<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(constructorCount).toEqual(1);
    expect(Scheduler).toHaveYielded([
=======
    await waitForAll([]);
    expect(constructorCount).toEqual(1);
    assertLog([
>>>>>>> remotes/upstream/main
      'componentWillMount: foo',
      'render: foo',
      'Foo did complete',
      'componentDidMount: foo',
    ]);
  });

<<<<<<< HEAD
  xit('can reuse work done after being preempted', () => {
    function Bar(props) {
      Scheduler.unstable_yieldValue('Bar');
=======
  xit('can reuse work done after being preempted', async () => {
    function Bar(props) {
      Scheduler.log('Bar');
>>>>>>> remotes/upstream/main
      return <div>{props.children}</div>;
    }

    function Middle(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Middle');
=======
      Scheduler.log('Middle');
>>>>>>> remotes/upstream/main
      return <span>{props.children}</span>;
    }

    const middleContent = (
      <div>
        <Middle>Hello</Middle>
        <Bar>-</Bar>
        <Middle>World</Middle>
      </div>
    );

    const step0 = (
      <div>
        <Middle>Hi</Middle>
        <Bar>{'Foo'}</Bar>
        <Middle>There</Middle>
      </div>
    );

    function Foo(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Bar>{props.text2}</Bar>
          <div hidden={true}>{props.step === 0 ? step0 : middleContent}</div>
        </div>
      );
    }

    // Init
    ReactNoop.render(<Foo text="foo" text2="foo" step={0} />);
    ReactNoop.flushDeferredPri(55 + 25 + 5 + 5);

    // We only finish the higher priority work. So the low pri content
    // has not yet finished mounting.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar', 'Middle', 'Bar']);
=======
    assertLog(['Foo', 'Bar', 'Middle', 'Bar']);
>>>>>>> remotes/upstream/main

    // Interrupt the rendering with a quick update. This should not touch the
    // middle content.
    ReactNoop.render(<Foo text="foo" text2="bar" step={0} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    // We've now rendered the entire tree but we didn't have to redo the work
    // done by the first Middle and Bar already.
    expect(Scheduler).toHaveYielded(['Foo', 'Bar', 'Middle']);
=======
    await waitForAll([]);

    // We've now rendered the entire tree but we didn't have to redo the work
    // done by the first Middle and Bar already.
    assertLog(['Foo', 'Bar', 'Middle']);
>>>>>>> remotes/upstream/main

    // Make a quick update which will schedule low priority work to
    // update the middle content.
    ReactNoop.render(<Foo text="bar" text2="bar" step={1} />);
    ReactNoop.flushDeferredPri(30 + 25 + 5);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar']);

    // The middle content is now pending rendering...
    ReactNoop.flushDeferredPri(30 + 5);
    expect(Scheduler).toHaveYielded(['Middle', 'Bar']);
=======
    assertLog(['Foo', 'Bar']);

    // The middle content is now pending rendering...
    ReactNoop.flushDeferredPri(30 + 5);
    assertLog(['Middle', 'Bar']);
>>>>>>> remotes/upstream/main

    // but we'll interrupt it to render some higher priority work.
    // The middle content will bailout so it remains untouched.
    ReactNoop.render(<Foo text="foo" text2="bar" step={1} />);
    ReactNoop.flushDeferredPri(30);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar']);
=======
    assertLog(['Foo', 'Bar']);
>>>>>>> remotes/upstream/main

    // Since we did nothing to the middle subtree during the interruption,
    // we should be able to reuse the reconciliation work that we already did
    // without restarting.
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Middle']);
  });

  xit('can reuse work that began but did not complete, after being preempted', () => {
=======
    await waitForAll(['Middle']);
  });

  xit('can reuse work that began but did not complete, after being preempted', async () => {
>>>>>>> remotes/upstream/main
    let child;
    let sibling;

    function GreatGrandchild() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('GreatGrandchild');
=======
      Scheduler.log('GreatGrandchild');
>>>>>>> remotes/upstream/main
      return <div />;
    }

    function Grandchild() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Grandchild');
=======
      Scheduler.log('Grandchild');
>>>>>>> remotes/upstream/main
      return <GreatGrandchild />;
    }

    class Child extends React.Component {
      state = {step: 0};
      render() {
        child = this;
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Child');
=======
        Scheduler.log('Child');
>>>>>>> remotes/upstream/main
        return <Grandchild />;
      }
    }

    class Sibling extends React.Component {
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Sibling');
=======
        Scheduler.log('Sibling');
>>>>>>> remotes/upstream/main
        sibling = this;
        return <div />;
      }
    }

    function Parent() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Parent');
=======
      Scheduler.log('Parent');
>>>>>>> remotes/upstream/main
      return [
        // The extra div is necessary because when Parent bails out during the
        // high priority update, its progressedPriority is set to high.
        // So its direct children cannot be reused when we resume at
        // low priority. I think this would be fixed by changing
        // pendingWorkPriority and progressedPriority to be the priority of
        // the children only, not including the fiber itself.
        <div key="a">
          <Child />
        </div>,
        <Sibling key="b" />,
      ];
    }

    ReactNoop.render(<Parent />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    // Begin working on a low priority update to Child, but stop before
    // GreatGrandchild. Child and Grandchild begin but don't complete.
    child.setState({step: 1});
    ReactNoop.flushDeferredPri(30);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Child', 'Grandchild']);
=======
    assertLog(['Child', 'Grandchild']);
>>>>>>> remotes/upstream/main

    // Interrupt the current low pri work with a high pri update elsewhere in
    // the tree.

    ReactNoop.flushSync(() => {
      sibling.setState({});
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Sibling']);
=======
    assertLog(['Sibling']);
>>>>>>> remotes/upstream/main

    // Continue the low pri work. The work on Child and GrandChild was memoized
    // so they should not be worked on again.

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      // No Child
      // No Grandchild
      'GreatGrandchild',
    ]);
  });

<<<<<<< HEAD
  xit('can reuse work if shouldComponentUpdate is false, after being preempted', () => {
    function Bar(props) {
      Scheduler.unstable_yieldValue('Bar');
=======
  xit('can reuse work if shouldComponentUpdate is false, after being preempted', async () => {
    function Bar(props) {
      Scheduler.log('Bar');
>>>>>>> remotes/upstream/main
      return <div>{props.children}</div>;
    }

    class Middle extends React.Component {
      shouldComponentUpdate(nextProps) {
        return this.props.children !== nextProps.children;
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Middle');
=======
        Scheduler.log('Middle');
>>>>>>> remotes/upstream/main
        return <span>{this.props.children}</span>;
      }
    }

    class Content extends React.Component {
      shouldComponentUpdate(nextProps) {
        return this.props.step !== nextProps.step;
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Content');
=======
        Scheduler.log('Content');
>>>>>>> remotes/upstream/main
        return (
          <div>
            <Middle>{this.props.step === 0 ? 'Hi' : 'Hello'}</Middle>
            <Bar>{this.props.step === 0 ? this.props.text : '-'}</Bar>
            <Middle>{this.props.step === 0 ? 'There' : 'World'}</Middle>
          </div>
        );
      }
    }

    function Foo(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Bar>{props.text}</Bar>
          <div hidden={true}>
            <Content step={props.step} text={props.text} />
          </div>
        </div>
      );
    }

    // Init
    ReactNoop.render(<Foo text="foo" step={0} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'Foo',
      'Bar',
      'Content',
      'Middle',
      'Bar',
      'Middle',
    ]);
=======
    await waitForAll(['Foo', 'Bar', 'Content', 'Middle', 'Bar', 'Middle']);
>>>>>>> remotes/upstream/main

    // Make a quick update which will schedule low priority work to
    // update the middle content.
    ReactNoop.render(<Foo text="bar" step={1} />);
    ReactNoop.flushDeferredPri(30 + 5);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar']);

    // The middle content is now pending rendering...
    ReactNoop.flushDeferredPri(30 + 25 + 5);
    expect(Scheduler).toHaveYielded(['Content', 'Middle', 'Bar']); // One more Middle left.
=======
    assertLog(['Foo', 'Bar']);

    // The middle content is now pending rendering...
    ReactNoop.flushDeferredPri(30 + 25 + 5);
    assertLog(['Content', 'Middle', 'Bar']); // One more Middle left.
>>>>>>> remotes/upstream/main

    // but we'll interrupt it to render some higher priority work.
    // The middle content will bailout so it remains untouched.
    ReactNoop.render(<Foo text="foo" step={1} />);
    ReactNoop.flushDeferredPri(30);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar']);
=======
    assertLog(['Foo', 'Bar']);
>>>>>>> remotes/upstream/main

    // Since we did nothing to the middle subtree during the interruption,
    // we should be able to reuse the reconciliation work that we already did
    // without restarting.
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Middle']);
  });

  it('memoizes work even if shouldComponentUpdate returns false', () => {
=======
    await waitForAll(['Middle']);
  });

  it('memoizes work even if shouldComponentUpdate returns false', async () => {
>>>>>>> remotes/upstream/main
    class Foo extends React.Component {
      shouldComponentUpdate(nextProps) {
        // this.props is the memoized props. So this should return true for
        // every update except the first one.
        const shouldUpdate = this.props.step !== 1;
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('shouldComponentUpdate: ' + shouldUpdate);
        return shouldUpdate;
      }
      render() {
        Scheduler.unstable_yieldValue('render');
=======
        Scheduler.log('shouldComponentUpdate: ' + shouldUpdate);
        return shouldUpdate;
      }
      render() {
        Scheduler.log('render');
>>>>>>> remotes/upstream/main
        return <div />;
      }
    }

    ReactNoop.render(<Foo step={1} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['render']);

    ReactNoop.render(<Foo step={2} />);
    expect(Scheduler).toFlushAndYield(['shouldComponentUpdate: false']);

    ReactNoop.render(<Foo step={3} />);
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll(['render']);

    ReactNoop.render(<Foo step={2} />);
    await waitForAll(['shouldComponentUpdate: false']);

    ReactNoop.render(<Foo step={3} />);
    await waitForAll([
>>>>>>> remotes/upstream/main
      // If the memoized props were not updated during last bail out, sCU will
      // keep returning false.
      'shouldComponentUpdate: true',
      'render',
    ]);
  });

<<<<<<< HEAD
  it('can update in the middle of a tree using setState', () => {
=======
  it('can update in the middle of a tree using setState', async () => {
>>>>>>> remotes/upstream/main
    let instance;
    class Bar extends React.Component {
      constructor() {
        super();
        this.state = {a: 'a'};
        instance = this;
      }
      render() {
        return <div>{this.props.children}</div>;
      }
    }

    function Foo() {
      return (
        <div>
          <Bar />
        </div>
      );
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(instance.state).toEqual({a: 'a'});
    instance.setState({b: 'b'});
    expect(Scheduler).toFlushWithoutYielding();
    expect(instance.state).toEqual({a: 'a', b: 'b'});
  });

  it('can queue multiple state updates', () => {
=======
    await waitForAll([]);
    expect(instance.state).toEqual({a: 'a'});
    instance.setState({b: 'b'});
    await waitForAll([]);
    expect(instance.state).toEqual({a: 'a', b: 'b'});
  });

  it('can queue multiple state updates', async () => {
>>>>>>> remotes/upstream/main
    let instance;
    class Bar extends React.Component {
      constructor() {
        super();
        this.state = {a: 'a'};
        instance = this;
      }
      render() {
        return <div>{this.props.children}</div>;
      }
    }

    function Foo() {
      return (
        <div>
          <Bar />
        </div>
      );
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    // Call setState multiple times before flushing
    instance.setState({b: 'b'});
    instance.setState({c: 'c'});
    instance.setState({d: 'd'});
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(instance.state).toEqual({a: 'a', b: 'b', c: 'c', d: 'd'});
  });

  it('can use updater form of setState', () => {
=======
    await waitForAll([]);
    expect(instance.state).toEqual({a: 'a', b: 'b', c: 'c', d: 'd'});
  });

  it('can use updater form of setState', async () => {
>>>>>>> remotes/upstream/main
    let instance;
    class Bar extends React.Component {
      constructor() {
        super();
        this.state = {num: 1};
        instance = this;
      }
      render() {
        return <div>{this.props.children}</div>;
      }
    }

    function Foo({multiplier}) {
      return (
        <div>
          <Bar multiplier={multiplier} />
        </div>
      );
    }

    function updater(state, props) {
      return {num: state.num * props.multiplier};
    }

    ReactNoop.render(<Foo multiplier={2} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(instance.state.num).toEqual(1);
    instance.setState(updater);
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
    expect(instance.state.num).toEqual(1);
    instance.setState(updater);
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(instance.state.num).toEqual(2);

    instance.setState(updater);
    ReactNoop.render(<Foo multiplier={3} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(instance.state.num).toEqual(6);
  });

  it('can call setState inside update callback', () => {
=======
    await waitForAll([]);
    expect(instance.state.num).toEqual(6);
  });

  it('can call setState inside update callback', async () => {
>>>>>>> remotes/upstream/main
    let instance;
    class Bar extends React.Component {
      constructor() {
        super();
        this.state = {num: 1};
        instance = this;
      }
      render() {
        return <div>{this.props.children}</div>;
      }
    }

    function Foo({multiplier}) {
      return (
        <div>
          <Bar multiplier={multiplier} />
        </div>
      );
    }

    function updater(state, props) {
      return {num: state.num * props.multiplier};
    }

    function callback() {
      this.setState({called: true});
    }

    ReactNoop.render(<Foo multiplier={2} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    instance.setState(updater);
    instance.setState(updater, callback);
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
    instance.setState(updater);
    instance.setState(updater, callback);
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(instance.state.num).toEqual(4);
    expect(instance.state.called).toEqual(true);
  });

<<<<<<< HEAD
  it('can replaceState', () => {
=======
  it('can replaceState', async () => {
>>>>>>> remotes/upstream/main
    let instance;
    class Bar extends React.Component {
      state = {a: 'a'};
      render() {
        instance = this;
        return <div>{this.props.children}</div>;
      }
    }

    function Foo() {
      return (
        <div>
          <Bar />
        </div>
      );
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    instance.setState({b: 'b'});
    instance.setState({c: 'c'});
    instance.updater.enqueueReplaceState(instance, {d: 'd'});
    expect(Scheduler).toFlushWithoutYielding();
    expect(instance.state).toEqual({d: 'd'});
  });

  it('can forceUpdate', () => {
    function Baz() {
      Scheduler.unstable_yieldValue('Baz');
=======
    await waitForAll([]);
    instance.setState({b: 'b'});
    instance.setState({c: 'c'});
    instance.updater.enqueueReplaceState(instance, {d: 'd'});
    await waitForAll([]);
    expect(instance.state).toEqual({d: 'd'});
  });

  it('can forceUpdate', async () => {
    function Baz() {
      Scheduler.log('Baz');
>>>>>>> remotes/upstream/main
      return <div />;
    }

    let instance;
    class Bar extends React.Component {
      constructor() {
        super();
        instance = this;
      }
      shouldComponentUpdate() {
        return false;
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Bar');
=======
        Scheduler.log('Bar');
>>>>>>> remotes/upstream/main
        return <Baz />;
      }
    }

    function Foo() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Bar />
        </div>
      );
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Foo', 'Bar', 'Baz']);
    instance.forceUpdate();
    expect(Scheduler).toFlushAndYield(['Bar', 'Baz']);
  });

  it('should clear forceUpdate after update is flushed', () => {
=======
    await waitForAll(['Foo', 'Bar', 'Baz']);
    instance.forceUpdate();
    await waitForAll(['Bar', 'Baz']);
  });

  it('should clear forceUpdate after update is flushed', async () => {
>>>>>>> remotes/upstream/main
    let a = 0;

    class Foo extends React.PureComponent {
      render() {
        const msg = `A: ${a}, B: ${this.props.b}`;
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(msg);
=======
        Scheduler.log(msg);
>>>>>>> remotes/upstream/main
        return msg;
      }
    }

    const foo = React.createRef(null);
    ReactNoop.render(<Foo ref={foo} b={0} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['A: 0, B: 0']);

    a = 1;
    foo.current.forceUpdate();
    expect(Scheduler).toFlushAndYield(['A: 1, B: 0']);

    ReactNoop.render(<Foo ref={foo} b={0} />);
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll(['A: 0, B: 0']);

    a = 1;
    foo.current.forceUpdate();
    await waitForAll(['A: 1, B: 0']);

    ReactNoop.render(<Foo ref={foo} b={0} />);
    await waitForAll([]);
>>>>>>> remotes/upstream/main
  });

  xit('can call sCU while resuming a partly mounted component', () => {
    const instances = new Set();

    class Bar extends React.Component {
      state = {y: 'A'};
      constructor() {
        super();
        instances.add(this);
      }
      shouldComponentUpdate(newProps, newState) {
        return this.props.x !== newProps.x || this.state.y !== newState.y;
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Bar:' + this.props.x);
=======
        Scheduler.log('Bar:' + this.props.x);
>>>>>>> remotes/upstream/main
        return <span prop={String(this.props.x === this.state.y)} />;
      }
    }

    function Foo(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return [
        <Bar key="a" x="A" />,
        <Bar key="b" x={props.step === 0 ? 'B' : 'B2'} />,
        <Bar key="c" x="C" />,
        <Bar key="d" x="D" />,
      ];
    }

    ReactNoop.render(<Foo step={0} />);
    ReactNoop.flushDeferredPri(40);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar:A', 'Bar:B', 'Bar:C']);
=======
    assertLog(['Foo', 'Bar:A', 'Bar:B', 'Bar:C']);
>>>>>>> remotes/upstream/main

    expect(instances.size).toBe(3);

    ReactNoop.render(<Foo step={1} />);
    ReactNoop.flushDeferredPri(50);
    // A was memoized and reused. B was memoized but couldn't be reused because
    // props differences. C was memoized and reused. D never even started so it
    // needed a new instance.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar:B2', 'Bar:D']);
=======
    assertLog(['Foo', 'Bar:B2', 'Bar:D']);
>>>>>>> remotes/upstream/main

    // We expect each rerender to correspond to a new instance.
    expect(instances.size).toBe(4);
  });

<<<<<<< HEAD
  xit('gets new props when setting state on a partly updated component', () => {
=======
  xit('gets new props when setting state on a partly updated component', async () => {
>>>>>>> remotes/upstream/main
    const instances = [];

    class Bar extends React.Component {
      state = {y: 'A'};
      constructor() {
        super();
        instances.push(this);
      }
      performAction() {
        this.setState({
          y: 'B',
        });
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'Bar:' + this.props.x + '-' + this.props.step,
        );
=======
        Scheduler.log('Bar:' + this.props.x + '-' + this.props.step);
>>>>>>> remotes/upstream/main
        return <span prop={String(this.props.x === this.state.y)} />;
      }
    }

    function Baz() {
      // This component is used as a sibling to Foo so that we can fully
      // complete Foo, without committing.
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Baz');
=======
      Scheduler.log('Baz');
>>>>>>> remotes/upstream/main
      return <div />;
    }

    function Foo(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Foo');
=======
      Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
      return [
        <Bar key="a" x="A" step={props.step} />,
        <Bar key="b" x="B" step={props.step} />,
      ];
    }

    ReactNoop.render(
      <div>
        <Foo step={0} />
        <Baz />
        <Baz />
      </div>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    // Flush part way through with new props, fully completing the first Bar.
    // However, it doesn't commit yet.
    ReactNoop.render(
      <div>
        <Foo step={1} />
        <Baz />
        <Baz />
      </div>,
    );
    ReactNoop.flushDeferredPri(45);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Foo', 'Bar:A-1', 'Bar:B-1', 'Baz']);
=======
    assertLog(['Foo', 'Bar:A-1', 'Bar:B-1', 'Baz']);
>>>>>>> remotes/upstream/main

    // Make an update to the same Bar.
    instances[0].performAction();

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Bar:A-1', 'Baz']);
  });

  xit('calls componentWillMount twice if the initial render is aborted', () => {
    class LifeCycle extends React.Component {
      state = {x: this.props.x};
      UNSAFE_componentWillReceiveProps(nextProps) {
        Scheduler.unstable_yieldValue(
=======
    await waitForAll(['Bar:A-1', 'Baz']);
  });

  xit('calls componentWillMount twice if the initial render is aborted', async () => {
    class LifeCycle extends React.Component {
      state = {x: this.props.x};
      UNSAFE_componentWillReceiveProps(nextProps) {
        Scheduler.log(
>>>>>>> remotes/upstream/main
          'componentWillReceiveProps:' + this.state.x + '-' + nextProps.x,
        );
        this.setState({x: nextProps.x});
      }
      UNSAFE_componentWillMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
=======
        Scheduler.log(
>>>>>>> remotes/upstream/main
          'componentWillMount:' + this.state.x + '-' + this.props.x,
        );
      }
      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'componentDidMount:' + this.state.x + '-' + this.props.x,
        );
=======
        Scheduler.log('componentDidMount:' + this.state.x + '-' + this.props.x);
>>>>>>> remotes/upstream/main
      }
      render() {
        return <span />;
      }
    }

    function Trail() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Trail');
=======
      Scheduler.log('Trail');
>>>>>>> remotes/upstream/main
      return null;
    }

    function App(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <LifeCycle x={props.x} />
          <Trail />
        </div>
      );
    }

    ReactNoop.render(<App x={0} />);
    ReactNoop.flushDeferredPri(30);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'componentWillMount:0-0']);

    ReactNoop.render(<App x={1} />);
    expect(Scheduler).toFlushAndYield([
=======
    assertLog(['App', 'componentWillMount:0-0']);

    ReactNoop.render(<App x={1} />);
    await waitForAll([
>>>>>>> remotes/upstream/main
      'App',
      'componentWillReceiveProps:0-1',
      'componentWillMount:1-1',
      'Trail',
      'componentDidMount:1-1',
    ]);
  });

<<<<<<< HEAD
  xit('uses state set in componentWillMount even if initial render was aborted', () => {
=======
  xit('uses state set in componentWillMount even if initial render was aborted', async () => {
>>>>>>> remotes/upstream/main
    class LifeCycle extends React.Component {
      constructor(props) {
        super(props);
        this.state = {x: this.props.x + '(ctor)'};
      }
      UNSAFE_componentWillMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('componentWillMount:' + this.state.x);
        this.setState({x: this.props.x + '(willMount)'});
      }
      componentDidMount() {
        Scheduler.unstable_yieldValue('componentDidMount:' + this.state.x);
      }
      render() {
        Scheduler.unstable_yieldValue('render:' + this.state.x);
=======
        Scheduler.log('componentWillMount:' + this.state.x);
        this.setState({x: this.props.x + '(willMount)'});
      }
      componentDidMount() {
        Scheduler.log('componentDidMount:' + this.state.x);
      }
      render() {
        Scheduler.log('render:' + this.state.x);
>>>>>>> remotes/upstream/main
        return <span />;
      }
    }

    function App(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return <LifeCycle x={props.x} />;
    }

    ReactNoop.render(<App x={0} />);
    ReactNoop.flushDeferredPri(20);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      'App',
      'componentWillMount:0(ctor)',
      'render:0(willMount)',
    ]);

    ReactNoop.render(<App x={1} />);
    expect(Scheduler).toFlushAndYield([
=======
    assertLog(['App', 'componentWillMount:0(ctor)', 'render:0(willMount)']);

    ReactNoop.render(<App x={1} />);
    await waitForAll([
>>>>>>> remotes/upstream/main
      'App',
      'componentWillMount:0(willMount)',
      'render:1(willMount)',
      'componentDidMount:1(willMount)',
    ]);
  });

<<<<<<< HEAD
  xit('calls componentWill* twice if an update render is aborted', () => {
    class LifeCycle extends React.Component {
      UNSAFE_componentWillMount() {
        Scheduler.unstable_yieldValue('componentWillMount:' + this.props.x);
      }
      componentDidMount() {
        Scheduler.unstable_yieldValue('componentDidMount:' + this.props.x);
      }
      UNSAFE_componentWillReceiveProps(nextProps) {
        Scheduler.unstable_yieldValue(
=======
  xit('calls componentWill* twice if an update render is aborted', async () => {
    class LifeCycle extends React.Component {
      UNSAFE_componentWillMount() {
        Scheduler.log('componentWillMount:' + this.props.x);
      }
      componentDidMount() {
        Scheduler.log('componentDidMount:' + this.props.x);
      }
      UNSAFE_componentWillReceiveProps(nextProps) {
        Scheduler.log(
>>>>>>> remotes/upstream/main
          'componentWillReceiveProps:' + this.props.x + '-' + nextProps.x,
        );
      }
      shouldComponentUpdate(nextProps) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
=======
        Scheduler.log(
>>>>>>> remotes/upstream/main
          'shouldComponentUpdate:' + this.props.x + '-' + nextProps.x,
        );
        return true;
      }
      UNSAFE_componentWillUpdate(nextProps) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
=======
        Scheduler.log(
>>>>>>> remotes/upstream/main
          'componentWillUpdate:' + this.props.x + '-' + nextProps.x,
        );
      }
      componentDidUpdate(prevProps) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'componentDidUpdate:' + this.props.x + '-' + prevProps.x,
        );
      }
      render() {
        Scheduler.unstable_yieldValue('render:' + this.props.x);
=======
        Scheduler.log('componentDidUpdate:' + this.props.x + '-' + prevProps.x);
      }
      render() {
        Scheduler.log('render:' + this.props.x);
>>>>>>> remotes/upstream/main
        return <span />;
      }
    }

    function Sibling() {
      // The sibling is used to confirm that we've completed the first child,
      // but not yet flushed.
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Sibling');
=======
      Scheduler.log('Sibling');
>>>>>>> remotes/upstream/main
      return <span />;
    }

    function App(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main

      return [<LifeCycle key="a" x={props.x} />, <Sibling key="b" />];
    }

    ReactNoop.render(<App x={0} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'App',
      'componentWillMount:0',
      'render:0',
      'Sibling',
      'componentDidMount:0',
    ]);

    ReactNoop.render(<App x={1} />);
    ReactNoop.flushDeferredPri(30);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'App',
      'componentWillReceiveProps:0-1',
      'shouldComponentUpdate:0-1',
      'componentWillUpdate:0-1',
      'render:1',
      'Sibling',
      // no componentDidUpdate
    ]);

    ReactNoop.render(<App x={2} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'App',
      'componentWillReceiveProps:1-2',
      'shouldComponentUpdate:1-2',
      'componentWillUpdate:1-2',
      'render:2',
      'Sibling',
      // When componentDidUpdate finally gets called, it covers both updates.
      'componentDidUpdate:2-0',
    ]);
  });

<<<<<<< HEAD
  it('calls getDerivedStateFromProps even for state-only updates', () => {
=======
  it('calls getDerivedStateFromProps even for state-only updates', async () => {
>>>>>>> remotes/upstream/main
    let instance;

    class LifeCycle extends React.Component {
      state = {};
      static getDerivedStateFromProps(props, prevState) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('getDerivedStateFromProps');
=======
        Scheduler.log('getDerivedStateFromProps');
>>>>>>> remotes/upstream/main
        return {foo: 'foo'};
      }
      changeState() {
        this.setState({foo: 'bar'});
      }
      componentDidUpdate() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('componentDidUpdate');
      }
      render() {
        Scheduler.unstable_yieldValue('render');
=======
        Scheduler.log('componentDidUpdate');
      }
      render() {
        Scheduler.log('render');
>>>>>>> remotes/upstream/main
        instance = this;
        return null;
      }
    }

    ReactNoop.render(<LifeCycle />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['getDerivedStateFromProps', 'render']);
    expect(instance.state).toEqual({foo: 'foo'});

    instance.changeState();
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll(['getDerivedStateFromProps', 'render']);
    expect(instance.state).toEqual({foo: 'foo'});

    instance.changeState();
    await waitForAll([
>>>>>>> remotes/upstream/main
      'getDerivedStateFromProps',
      'render',
      'componentDidUpdate',
    ]);
    expect(instance.state).toEqual({foo: 'foo'});
  });

<<<<<<< HEAD
  it('does not call getDerivedStateFromProps if neither state nor props have changed', () => {
    class Parent extends React.Component {
      state = {parentRenders: 0};
      static getDerivedStateFromProps(props, prevState) {
        Scheduler.unstable_yieldValue('getDerivedStateFromProps');
        return prevState.parentRenders + 1;
      }
      render() {
        Scheduler.unstable_yieldValue('Parent');
=======
  it('does not call getDerivedStateFromProps if neither state nor props have changed', async () => {
    class Parent extends React.Component {
      state = {parentRenders: 0};
      static getDerivedStateFromProps(props, prevState) {
        Scheduler.log('getDerivedStateFromProps');
        return prevState.parentRenders + 1;
      }
      render() {
        Scheduler.log('Parent');
>>>>>>> remotes/upstream/main
        return <Child parentRenders={this.state.parentRenders} ref={child} />;
      }
    }

    class Child extends React.Component {
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Child');
=======
        Scheduler.log('Child');
>>>>>>> remotes/upstream/main
        return this.props.parentRenders;
      }
    }

    const child = React.createRef(null);
    ReactNoop.render(<Parent />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
      'getDerivedStateFromProps',
      'Parent',
      'Child',
    ]);

    // Schedule an update on the child. The parent should not re-render.
    child.current.setState({});
    expect(Scheduler).toFlushAndYield(['Child']);
  });

  xit('does not call componentWillReceiveProps for state-only updates', () => {
=======
    await waitForAll(['getDerivedStateFromProps', 'Parent', 'Child']);

    // Schedule an update on the child. The parent should not re-render.
    child.current.setState({});
    await waitForAll(['Child']);
  });

  xit('does not call componentWillReceiveProps for state-only updates', async () => {
>>>>>>> remotes/upstream/main
    const instances = [];

    class LifeCycle extends React.Component {
      state = {x: 0};
      tick() {
        this.setState({
          x: this.state.x + 1,
        });
      }
      UNSAFE_componentWillMount() {
        instances.push(this);
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('componentWillMount:' + this.state.x);
      }
      componentDidMount() {
        Scheduler.unstable_yieldValue('componentDidMount:' + this.state.x);
      }
      UNSAFE_componentWillReceiveProps(nextProps) {
        Scheduler.unstable_yieldValue('componentWillReceiveProps');
      }
      shouldComponentUpdate(nextProps, nextState) {
        Scheduler.unstable_yieldValue(
=======
        Scheduler.log('componentWillMount:' + this.state.x);
      }
      componentDidMount() {
        Scheduler.log('componentDidMount:' + this.state.x);
      }
      UNSAFE_componentWillReceiveProps(nextProps) {
        Scheduler.log('componentWillReceiveProps');
      }
      shouldComponentUpdate(nextProps, nextState) {
        Scheduler.log(
>>>>>>> remotes/upstream/main
          'shouldComponentUpdate:' + this.state.x + '-' + nextState.x,
        );
        return true;
      }
      UNSAFE_componentWillUpdate(nextProps, nextState) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
=======
        Scheduler.log(
>>>>>>> remotes/upstream/main
          'componentWillUpdate:' + this.state.x + '-' + nextState.x,
        );
      }
      componentDidUpdate(prevProps, prevState) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'componentDidUpdate:' + this.state.x + '-' + prevState.x,
        );
      }
      render() {
        Scheduler.unstable_yieldValue('render:' + this.state.x);
=======
        Scheduler.log('componentDidUpdate:' + this.state.x + '-' + prevState.x);
      }
      render() {
        Scheduler.log('render:' + this.state.x);
>>>>>>> remotes/upstream/main
        return <span />;
      }
    }

    // This wrap is a bit contrived because we can't pause a completed root and
    // there is currently an issue where a component can't reuse its render
    // output unless it fully completed.
    class Wrap extends React.Component {
      state = {y: 0};
      UNSAFE_componentWillMount() {
        instances.push(this);
      }
      tick() {
        this.setState({
          y: this.state.y + 1,
        });
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Wrap');
=======
        Scheduler.log('Wrap');
>>>>>>> remotes/upstream/main
        return <LifeCycle y={this.state.y} />;
      }
    }

    function Sibling() {
      // The sibling is used to confirm that we've completed the first child,
      // but not yet flushed.
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Sibling');
=======
      Scheduler.log('Sibling');
>>>>>>> remotes/upstream/main
      return <span />;
    }

    function App(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return [<Wrap key="a" />, <Sibling key="b" />];
    }

    ReactNoop.render(<App y={0} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'App',
      'Wrap',
      'componentWillMount:0',
      'render:0',
      'Sibling',
      'componentDidMount:0',
    ]);

    // LifeCycle
    instances[1].tick();

    ReactNoop.flushDeferredPri(25);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      // no componentWillReceiveProps
      'shouldComponentUpdate:0-1',
      'componentWillUpdate:0-1',
      'render:1',
      // no componentDidUpdate
    ]);

    // LifeCycle
    instances[1].tick();

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      // no componentWillReceiveProps
      'shouldComponentUpdate:1-2',
      'componentWillUpdate:1-2',
      'render:2',
      // When componentDidUpdate finally gets called, it covers both updates.
      'componentDidUpdate:2-0',
    ]);

    // Next we will update props of LifeCycle by updating its parent.

    instances[0].tick();

    ReactNoop.flushDeferredPri(30);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'Wrap',
      'componentWillReceiveProps',
      'shouldComponentUpdate:2-2',
      'componentWillUpdate:2-2',
      'render:2',
      // no componentDidUpdate
    ]);

    // Next we will update LifeCycle directly but not with new props.
    instances[1].tick();

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      // This should not trigger another componentWillReceiveProps because
      // we never got new props.
      'shouldComponentUpdate:2-3',
      'componentWillUpdate:2-3',
      'render:3',
      'componentDidUpdate:3-2',
    ]);

    // TODO: Test that we get the expected values for the same scenario with
    // incomplete parents.
  });

<<<<<<< HEAD
  xit('skips will/DidUpdate when bailing unless an update was already in progress', () => {
    class LifeCycle extends React.Component {
      UNSAFE_componentWillMount() {
        Scheduler.unstable_yieldValue('componentWillMount');
      }
      componentDidMount() {
        Scheduler.unstable_yieldValue('componentDidMount');
      }
      UNSAFE_componentWillReceiveProps(nextProps) {
        Scheduler.unstable_yieldValue('componentWillReceiveProps');
      }
      shouldComponentUpdate(nextProps) {
        Scheduler.unstable_yieldValue('shouldComponentUpdate');
=======
  xit('skips will/DidUpdate when bailing unless an update was already in progress', async () => {
    class LifeCycle extends React.Component {
      UNSAFE_componentWillMount() {
        Scheduler.log('componentWillMount');
      }
      componentDidMount() {
        Scheduler.log('componentDidMount');
      }
      UNSAFE_componentWillReceiveProps(nextProps) {
        Scheduler.log('componentWillReceiveProps');
      }
      shouldComponentUpdate(nextProps) {
        Scheduler.log('shouldComponentUpdate');
>>>>>>> remotes/upstream/main
        // Bail
        return this.props.x !== nextProps.x;
      }
      UNSAFE_componentWillUpdate(nextProps) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('componentWillUpdate');
      }
      componentDidUpdate(prevProps) {
        Scheduler.unstable_yieldValue('componentDidUpdate');
      }
      render() {
        Scheduler.unstable_yieldValue('render');
=======
        Scheduler.log('componentWillUpdate');
      }
      componentDidUpdate(prevProps) {
        Scheduler.log('componentDidUpdate');
      }
      render() {
        Scheduler.log('render');
>>>>>>> remotes/upstream/main
        return <span />;
      }
    }

    function Sibling() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('render sibling');
=======
      Scheduler.log('render sibling');
>>>>>>> remotes/upstream/main
      return <span />;
    }

    function App(props) {
      return [<LifeCycle key="a" x={props.x} />, <Sibling key="b" />];
    }

    ReactNoop.render(<App x={0} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'componentWillMount',
      'render',
      'render sibling',
      'componentDidMount',
    ]);

    // Update to same props
    ReactNoop.render(<App x={0} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'componentWillReceiveProps',
      'shouldComponentUpdate',
      // no componentWillUpdate
      // no render
      'render sibling',
      // no componentDidUpdate
    ]);

    // Begin updating to new props...
    ReactNoop.render(<App x={1} />);
    ReactNoop.flushDeferredPri(30);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'componentWillReceiveProps',
      'shouldComponentUpdate',
      'componentWillUpdate',
      'render',
      'render sibling',
      // no componentDidUpdate yet
    ]);

    // ...but we'll interrupt it to rerender the same props.
    ReactNoop.render(<App x={1} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    // We can bail out this time, but we must call componentDidUpdate.
    expect(Scheduler).toHaveYielded([
=======
    await waitForAll([]);

    // We can bail out this time, but we must call componentDidUpdate.
    assertLog([
>>>>>>> remotes/upstream/main
      'componentWillReceiveProps',
      'shouldComponentUpdate',
      // no componentWillUpdate
      // no render
      'render sibling',
      'componentDidUpdate',
    ]);
  });

<<<<<<< HEAD
  it('can nest batchedUpdates', () => {
=======
  it('can nest batchedUpdates', async () => {
>>>>>>> remotes/upstream/main
    let instance;

    class Foo extends React.Component {
      state = {n: 0};
      render() {
        instance = this;
        return <div />;
      }
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    ReactNoop.flushSync(() => {
      ReactNoop.batchedUpdates(() => {
        instance.setState({n: 1}, () =>
          Scheduler.unstable_yieldValue('setState 1'),
        );
        instance.setState({n: 2}, () =>
          Scheduler.unstable_yieldValue('setState 2'),
        );
        ReactNoop.batchedUpdates(() => {
          instance.setState({n: 3}, () =>
            Scheduler.unstable_yieldValue('setState 3'),
          );
          instance.setState({n: 4}, () =>
            Scheduler.unstable_yieldValue('setState 4'),
          );
          Scheduler.unstable_yieldValue('end inner batchedUpdates');
        });
        Scheduler.unstable_yieldValue('end outer batchedUpdates');
=======
    await waitForAll([]);

    ReactNoop.flushSync(() => {
      ReactNoop.batchedUpdates(() => {
        instance.setState({n: 1}, () => Scheduler.log('setState 1'));
        instance.setState({n: 2}, () => Scheduler.log('setState 2'));
        ReactNoop.batchedUpdates(() => {
          instance.setState({n: 3}, () => Scheduler.log('setState 3'));
          instance.setState({n: 4}, () => Scheduler.log('setState 4'));
          Scheduler.log('end inner batchedUpdates');
        });
        Scheduler.log('end outer batchedUpdates');
>>>>>>> remotes/upstream/main
      });
    });

    // ReactNoop.flush() not needed because updates are synchronous

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'end inner batchedUpdates',
      'end outer batchedUpdates',
      'setState 1',
      'setState 2',
      'setState 3',
      'setState 4',
    ]);
    expect(instance.state.n).toEqual(4);
  });

<<<<<<< HEAD
  it('can handle if setState callback throws', () => {
=======
  it('can handle if setState callback throws', async () => {
>>>>>>> remotes/upstream/main
    let instance;

    class Foo extends React.Component {
      state = {n: 0};
      render() {
        instance = this;
        return <div />;
      }
    }

    ReactNoop.render(<Foo />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    function updater({n}) {
      return {n: n + 1};
    }

<<<<<<< HEAD
    instance.setState(updater, () =>
      Scheduler.unstable_yieldValue('first callback'),
    );
    instance.setState(updater, () => {
      Scheduler.unstable_yieldValue('second callback');
      throw new Error('callback error');
    });
    instance.setState(updater, () =>
      Scheduler.unstable_yieldValue('third callback'),
    );

    expect(() => {
      expect(Scheduler).toFlushWithoutYielding();
    }).toThrow('callback error');

    // The third callback isn't called because the second one throws
    expect(Scheduler).toHaveYielded(['first callback', 'second callback']);
    expect(instance.state.n).toEqual(3);
  });

  it('merges and masks context', () => {
=======
    instance.setState(updater, () => Scheduler.log('first callback'));
    instance.setState(updater, () => {
      Scheduler.log('second callback');
      throw new Error('callback error');
    });
    instance.setState(updater, () => Scheduler.log('third callback'));

    await waitForThrow('callback error');

    // The third callback isn't called because the second one throws
    assertLog(['first callback', 'second callback']);
    expect(instance.state.n).toEqual(3);
  });

  // @gate !disableLegacyContext
  it('merges and masks context', async () => {
>>>>>>> remotes/upstream/main
    class Intl extends React.Component {
      static childContextTypes = {
        locale: PropTypes.string,
      };
      getChildContext() {
        return {
          locale: this.props.locale,
        };
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Intl ' + JSON.stringify(this.context));
=======
        Scheduler.log('Intl ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    class Router extends React.Component {
      static childContextTypes = {
        route: PropTypes.string,
      };
      getChildContext() {
        return {
          route: this.props.route,
        };
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Router ' + JSON.stringify(this.context));
=======
        Scheduler.log('Router ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    class ShowLocale extends React.Component {
      static contextTypes = {
        locale: PropTypes.string,
      };
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'ShowLocale ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('ShowLocale ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.context.locale;
      }
    }

    class ShowRoute extends React.Component {
      static contextTypes = {
        route: PropTypes.string,
      };
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'ShowRoute ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('ShowRoute ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.context.route;
      }
    }

    function ShowBoth(props, context) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('ShowBoth ' + JSON.stringify(context));
=======
      Scheduler.log('ShowBoth ' + JSON.stringify(context));
>>>>>>> remotes/upstream/main
      return `${context.route} in ${context.locale}`;
    }
    ShowBoth.contextTypes = {
      locale: PropTypes.string,
      route: PropTypes.string,
    };

    class ShowNeither extends React.Component {
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'ShowNeither ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('ShowNeither ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return null;
      }
    }

    class Indirection extends React.Component {
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'Indirection ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('Indirection ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return [
          <ShowLocale key="a" />,
          <ShowRoute key="b" />,
          <ShowNeither key="c" />,
          <Intl key="d" locale="ru">
            <ShowBoth />
          </Intl>,
          <ShowBoth key="e" />,
        ];
      }
    }

    ReactNoop.render(
      <Intl locale="fr">
        <ShowLocale />
        <div>
          <ShowBoth />
        </div>
      </Intl>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'Intl {}',
      'ShowLocale {"locale":"fr"}',
      'ShowBoth {"locale":"fr"}',
    ]);

    ReactNoop.render(
      <Intl locale="de">
        <ShowLocale />
        <div>
          <ShowBoth />
        </div>
      </Intl>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'Intl {}',
      'ShowLocale {"locale":"de"}',
      'ShowBoth {"locale":"de"}',
    ]);
<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(
          <Intl locale="sv">
            <ShowLocale />
            <div>
              <ShowBoth />
            </div>
          </Intl>,
        );
      });
    } else {
=======
    React.startTransition(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.render(
        <Intl locale="sv">
          <ShowLocale />
          <div>
            <ShowBoth />
          </div>
        </Intl>,
      );
<<<<<<< HEAD
    }
    expect(Scheduler).toFlushAndYieldThrough(['Intl {}']);
=======
    });
    await waitFor(['Intl {}']);
>>>>>>> remotes/upstream/main

    ReactNoop.render(
      <Intl locale="en">
        <ShowLocale />
        <Router route="/about">
          <Indirection />
        </Router>
        <ShowBoth />
      </Intl>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'ShowLocale {"locale":"sv"}',
      'ShowBoth {"locale":"sv"}',
      'Intl {}',
      'ShowLocale {"locale":"en"}',
      'Router {}',
      'Indirection {}',
      'ShowLocale {"locale":"en"}',
      'ShowRoute {"route":"/about"}',
      'ShowNeither {}',
      'Intl {}',
      'ShowBoth {"locale":"ru","route":"/about"}',
      'ShowBoth {"locale":"en","route":"/about"}',
      'ShowBoth {"locale":"en"}',
    ]);
  });

<<<<<<< HEAD
  it('does not leak own context into context provider', () => {
=======
  // @gate !disableLegacyContext
  it('does not leak own context into context provider', async () => {
    if (gate(flags => flags.disableLegacyContext)) {
      throw new Error('This test infinite loops when context is disabled.');
    }
>>>>>>> remotes/upstream/main
    class Recurse extends React.Component {
      static contextTypes = {
        n: PropTypes.number,
      };
      static childContextTypes = {
        n: PropTypes.number,
      };
      getChildContext() {
        return {n: (this.context.n || 3) - 1};
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'Recurse ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('Recurse ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        if (this.context.n === 0) {
          return null;
        }
        return <Recurse />;
      }
    }

    ReactNoop.render(<Recurse />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'Recurse {}',
      'Recurse {"n":2}',
      'Recurse {"n":1}',
      'Recurse {"n":0}',
    ]);
  });

<<<<<<< HEAD
  if (!require('shared/ReactFeatureFlags').disableModulePatternComponents) {
    it('does not leak own context into context provider (factory components)', () => {
      function Recurse(props, context) {
        return {
          getChildContext() {
            return {n: (context.n || 3) - 1};
          },
          render() {
            Scheduler.unstable_yieldValue('Recurse ' + JSON.stringify(context));
            if (context.n === 0) {
              return null;
            }
            return <Recurse />;
          },
        };
      }
      Recurse.contextTypes = {
        n: PropTypes.number,
      };
      Recurse.childContextTypes = {
        n: PropTypes.number,
      };

      ReactNoop.render(<Recurse />);
      expect(() =>
        expect(Scheduler).toFlushAndYield([
=======
  // @gate !disableModulePatternComponents
  // @gate !disableLegacyContext
  it('does not leak own context into context provider (factory components)', async () => {
    function Recurse(props, context) {
      return {
        getChildContext() {
          return {n: (context.n || 3) - 1};
        },
        render() {
          Scheduler.log('Recurse ' + JSON.stringify(context));
          if (context.n === 0) {
            return null;
          }
          return <Recurse />;
        },
      };
    }
    Recurse.contextTypes = {
      n: PropTypes.number,
    };
    Recurse.childContextTypes = {
      n: PropTypes.number,
    };

    ReactNoop.render(<Recurse />);
    await expect(
      async () =>
        await waitForAll([
>>>>>>> remotes/upstream/main
          'Recurse {}',
          'Recurse {"n":2}',
          'Recurse {"n":1}',
          'Recurse {"n":0}',
        ]),
<<<<<<< HEAD
      ).toErrorDev([
        'Warning: The <Recurse /> component appears to be a function component that returns a class instance. ' +
          'Change Recurse to a class that extends React.Component instead. ' +
          "If you can't use a class try assigning the prototype on the function as a workaround. " +
          '`Recurse.prototype = React.Component.prototype`. ' +
          "Don't use an arrow function since it cannot be called with `new` by React.",
      ]);
    });
  }

  // @gate www
  it('provides context when reusing work', () => {
=======
    ).toErrorDev([
      'Warning: The <Recurse /> component appears to be a function component that returns a class instance. ' +
        'Change Recurse to a class that extends React.Component instead. ' +
        "If you can't use a class try assigning the prototype on the function as a workaround. " +
        '`Recurse.prototype = React.Component.prototype`. ' +
        "Don't use an arrow function since it cannot be called with `new` by React.",
    ]);
  });

  // @gate www
  // @gate !disableLegacyContext
  it('provides context when reusing work', async () => {
>>>>>>> remotes/upstream/main
    class Intl extends React.Component {
      static childContextTypes = {
        locale: PropTypes.string,
      };
      getChildContext() {
        return {
          locale: this.props.locale,
        };
      }
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Intl ' + JSON.stringify(this.context));
=======
        Scheduler.log('Intl ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    class ShowLocale extends React.Component {
      static contextTypes = {
        locale: PropTypes.string,
      };
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'ShowLocale ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('ShowLocale ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.context.locale;
      }
    }

<<<<<<< HEAD
    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(
          <Intl locale="fr">
            <ShowLocale />
            <LegacyHiddenDiv mode="hidden">
              <ShowLocale />
              <Intl locale="ru">
                <ShowLocale />
              </Intl>
            </LegacyHiddenDiv>
            <ShowLocale />
          </Intl>,
        );
      });
    } else {
=======
    React.startTransition(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.render(
        <Intl locale="fr">
          <ShowLocale />
          <LegacyHiddenDiv mode="hidden">
            <ShowLocale />
            <Intl locale="ru">
              <ShowLocale />
            </Intl>
          </LegacyHiddenDiv>
          <ShowLocale />
        </Intl>,
      );
<<<<<<< HEAD
    }
    expect(Scheduler).toFlushAndYieldThrough([
=======
    });

    await waitFor([
>>>>>>> remotes/upstream/main
      'Intl {}',
      'ShowLocale {"locale":"fr"}',
      'ShowLocale {"locale":"fr"}',
    ]);

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'ShowLocale {"locale":"fr"}',
      'Intl {}',
      'ShowLocale {"locale":"ru"}',
    ]);
  });

<<<<<<< HEAD
  it('reads context when setState is below the provider', () => {
=======
  // @gate !disableLegacyContext
  it('reads context when setState is below the provider', async () => {
>>>>>>> remotes/upstream/main
    let statefulInst;

    class Intl extends React.Component {
      static childContextTypes = {
        locale: PropTypes.string,
      };
      getChildContext() {
        const childContext = {
          locale: this.props.locale,
        };
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'Intl:provide ' + JSON.stringify(childContext),
        );
        return childContext;
      }
      render() {
        Scheduler.unstable_yieldValue(
          'Intl:read ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('Intl:provide ' + JSON.stringify(childContext));
        return childContext;
      }
      render() {
        Scheduler.log('Intl:read ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    class ShowLocaleClass extends React.Component {
      static contextTypes = {
        locale: PropTypes.string,
      };
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'ShowLocaleClass:read ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('ShowLocaleClass:read ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.context.locale;
      }
    }

    function ShowLocaleFn(props, context) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(
        'ShowLocaleFn:read ' + JSON.stringify(context),
      );
=======
      Scheduler.log('ShowLocaleFn:read ' + JSON.stringify(context));
>>>>>>> remotes/upstream/main
      return context.locale;
    }
    ShowLocaleFn.contextTypes = {
      locale: PropTypes.string,
    };

    class Stateful extends React.Component {
      state = {x: 0};
      render() {
        statefulInst = this;
        return this.props.children;
      }
    }

    function IndirectionFn(props, context) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('IndirectionFn ' + JSON.stringify(context));
=======
      Scheduler.log('IndirectionFn ' + JSON.stringify(context));
>>>>>>> remotes/upstream/main
      return props.children;
    }

    class IndirectionClass extends React.Component {
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'IndirectionClass ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('IndirectionClass ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    ReactNoop.render(
      <Intl locale="fr">
        <IndirectionFn>
          <IndirectionClass>
            <Stateful>
              <ShowLocaleClass />
              <ShowLocaleFn />
            </Stateful>
          </IndirectionClass>
        </IndirectionFn>
      </Intl>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'Intl:read {}',
      'Intl:provide {"locale":"fr"}',
      'IndirectionFn {}',
      'IndirectionClass {}',
      'ShowLocaleClass:read {"locale":"fr"}',
      'ShowLocaleFn:read {"locale":"fr"}',
    ]);

    statefulInst.setState({x: 1});
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    // All work has been memoized because setState()
    // happened below the context and could not have affected it.
    expect(Scheduler).toHaveYielded([]);
  });

  it('reads context when setState is above the provider', () => {
=======
    await waitForAll([]);
    // All work has been memoized because setState()
    // happened below the context and could not have affected it.
    assertLog([]);
  });

  // @gate !disableLegacyContext
  it('reads context when setState is above the provider', async () => {
>>>>>>> remotes/upstream/main
    let statefulInst;

    class Intl extends React.Component {
      static childContextTypes = {
        locale: PropTypes.string,
      };
      getChildContext() {
        const childContext = {
          locale: this.props.locale,
        };
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'Intl:provide ' + JSON.stringify(childContext),
        );
        return childContext;
      }
      render() {
        Scheduler.unstable_yieldValue(
          'Intl:read ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('Intl:provide ' + JSON.stringify(childContext));
        return childContext;
      }
      render() {
        Scheduler.log('Intl:read ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    class ShowLocaleClass extends React.Component {
      static contextTypes = {
        locale: PropTypes.string,
      };
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'ShowLocaleClass:read ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('ShowLocaleClass:read ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.context.locale;
      }
    }

    function ShowLocaleFn(props, context) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(
        'ShowLocaleFn:read ' + JSON.stringify(context),
      );
=======
      Scheduler.log('ShowLocaleFn:read ' + JSON.stringify(context));
>>>>>>> remotes/upstream/main
      return context.locale;
    }
    ShowLocaleFn.contextTypes = {
      locale: PropTypes.string,
    };

    function IndirectionFn(props, context) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('IndirectionFn ' + JSON.stringify(context));
=======
      Scheduler.log('IndirectionFn ' + JSON.stringify(context));
>>>>>>> remotes/upstream/main
      return props.children;
    }

    class IndirectionClass extends React.Component {
      render() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'IndirectionClass ' + JSON.stringify(this.context),
        );
=======
        Scheduler.log('IndirectionClass ' + JSON.stringify(this.context));
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    }

    class Stateful extends React.Component {
      state = {locale: 'fr'};
      render() {
        statefulInst = this;
        return <Intl locale={this.state.locale}>{this.props.children}</Intl>;
      }
    }

    ReactNoop.render(
      <Stateful>
        <IndirectionFn>
          <IndirectionClass>
            <ShowLocaleClass />
            <ShowLocaleFn />
          </IndirectionClass>
        </IndirectionFn>
      </Stateful>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'Intl:read {}',
      'Intl:provide {"locale":"fr"}',
      'IndirectionFn {}',
      'IndirectionClass {}',
      'ShowLocaleClass:read {"locale":"fr"}',
      'ShowLocaleFn:read {"locale":"fr"}',
    ]);

    statefulInst.setState({locale: 'gr'});
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      // Intl is below setState() so it might have been
      // affected by it. Therefore we re-render and recompute
      // its child context.
      'Intl:read {}',
      'Intl:provide {"locale":"gr"}',
      // TODO: it's unfortunate that we can't reuse work on
      // these components even though they don't depend on context.
      'IndirectionFn {}',
      'IndirectionClass {}',
      // These components depend on context:
      'ShowLocaleClass:read {"locale":"gr"}',
      'ShowLocaleFn:read {"locale":"gr"}',
    ]);
  });

<<<<<<< HEAD
  it('maintains the correct context when providers bail out due to low priority', () => {
=======
  // @gate !disableLegacyContext || !__DEV__
  it('maintains the correct context when providers bail out due to low priority', async () => {
>>>>>>> remotes/upstream/main
    class Root extends React.Component {
      render() {
        return <Middle {...this.props} />;
      }
    }

    let instance;

    class Middle extends React.Component {
      constructor(props, context) {
        super(props, context);
        instance = this;
      }
      shouldComponentUpdate() {
        // Return false so that our child will get a NoWork priority (and get bailed out)
        return false;
      }
      render() {
        return <Child />;
      }
    }

    // Child must be a context provider to trigger the bug
    class Child extends React.Component {
      static childContextTypes = {};
      getChildContext() {
        return {};
      }
      render() {
        return <div />;
      }
    }

    // Init
    ReactNoop.render(<Root />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();

    // Trigger an update in the middle of the tree
    instance.setState({});
    expect(Scheduler).toFlushWithoutYielding();
  });

  it('maintains the correct context when unwinding due to an error in render', () => {
=======
    await waitForAll([]);

    // Trigger an update in the middle of the tree
    instance.setState({});
    await waitForAll([]);
  });

  // @gate !disableLegacyContext || !__DEV__
  it('maintains the correct context when unwinding due to an error in render', async () => {
>>>>>>> remotes/upstream/main
    class Root extends React.Component {
      componentDidCatch(error) {
        // If context is pushed/popped correctly,
        // This method will be used to handle the intentionally-thrown Error.
      }
      render() {
        return <ContextProvider depth={1} />;
      }
    }

    let instance;

    class ContextProvider extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.state = {};
        if (props.depth === 1) {
          instance = this;
        }
      }
      static childContextTypes = {};
      getChildContext() {
        return {};
      }
      render() {
        if (this.state.throwError) {
          throw Error();
        }
        return this.props.depth < 4 ? (
          <ContextProvider depth={this.props.depth + 1} />
        ) : (
          <div />
        );
      }
    }

    // Init
    ReactNoop.render(<Root />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    // Trigger an update in the middle of the tree
    // This is necessary to reproduce the error as it currently exists.
    instance.setState({
      throwError: true,
    });
<<<<<<< HEAD
    expect(() => expect(Scheduler).toFlushWithoutYielding()).toErrorDev(
=======
    await expect(async () => await waitForAll([])).toErrorDev(
>>>>>>> remotes/upstream/main
      'Error boundaries should implement getDerivedStateFromError()',
    );
  });

<<<<<<< HEAD
  it('should not recreate masked context unless inputs have changed', () => {
=======
  // @gate !disableLegacyContext || !__DEV__
  it('should not recreate masked context unless inputs have changed', async () => {
>>>>>>> remotes/upstream/main
    let scuCounter = 0;

    class MyComponent extends React.Component {
      static contextTypes = {};
      componentDidMount(prevProps, prevState) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('componentDidMount');
        this.setState({setStateInCDU: true});
      }
      componentDidUpdate(prevProps, prevState) {
        Scheduler.unstable_yieldValue('componentDidUpdate');
=======
        Scheduler.log('componentDidMount');
        this.setState({setStateInCDU: true});
      }
      componentDidUpdate(prevProps, prevState) {
        Scheduler.log('componentDidUpdate');
>>>>>>> remotes/upstream/main
        if (this.state.setStateInCDU) {
          this.setState({setStateInCDU: false});
        }
      }
      UNSAFE_componentWillReceiveProps(nextProps) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('componentWillReceiveProps');
        this.setState({setStateInCDU: true});
      }
      render() {
        Scheduler.unstable_yieldValue('render');
        return null;
      }
      shouldComponentUpdate(nextProps, nextState) {
        Scheduler.unstable_yieldValue('shouldComponentUpdate');
=======
        Scheduler.log('componentWillReceiveProps');
        this.setState({setStateInCDU: true});
      }
      render() {
        Scheduler.log('render');
        return null;
      }
      shouldComponentUpdate(nextProps, nextState) {
        Scheduler.log('shouldComponentUpdate');
>>>>>>> remotes/upstream/main
        return scuCounter++ < 5; // Don't let test hang
      }
    }

    ReactNoop.render(<MyComponent />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([
=======
    await waitForAll([
>>>>>>> remotes/upstream/main
      'render',
      'componentDidMount',
      'shouldComponentUpdate',
      'render',
      'componentDidUpdate',
      'shouldComponentUpdate',
      'render',
      'componentDidUpdate',
    ]);
  });

<<<<<<< HEAD
  xit('should reuse memoized work if pointers are updated before calling lifecycles', () => {
=======
  xit('should reuse memoized work if pointers are updated before calling lifecycles', async () => {
>>>>>>> remotes/upstream/main
    const cduNextProps = [];
    const cduPrevProps = [];
    const scuNextProps = [];
    const scuPrevProps = [];
    let renderCounter = 0;

    function SecondChild(props) {
      return <span>{props.children}</span>;
    }

    class FirstChild extends React.Component {
      componentDidUpdate(prevProps, prevState) {
        cduNextProps.push(this.props);
        cduPrevProps.push(prevProps);
      }
      shouldComponentUpdate(nextProps, nextState) {
        scuNextProps.push(nextProps);
        scuPrevProps.push(this.props);
        return this.props.children !== nextProps.children;
      }
      render() {
        renderCounter++;
        return <span>{this.props.children}</span>;
      }
    }

    class Middle extends React.Component {
      render() {
        return (
          <div>
            <FirstChild>{this.props.children}</FirstChild>
            <SecondChild>{this.props.children}</SecondChild>
          </div>
        );
      }
    }

    function Root(props) {
      return (
        <div hidden={true}>
          <Middle {...props} />
        </div>
      );
    }

    // Initial render of the entire tree.
    // Renders: Root, Middle, FirstChild, SecondChild
    ReactNoop.render(<Root>A</Root>);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(renderCounter).toBe(1);

    // Schedule low priority work to update children.
    // Give it enough time to partially render.
    // Renders: Root, Middle, FirstChild
    ReactNoop.render(<Root>B</Root>);
    ReactNoop.flushDeferredPri(20 + 30 + 5);

    // At this point our FirstChild component has rendered a second time,
    // But since the render is not completed cDU should not be called yet.
    expect(renderCounter).toBe(2);
    expect(scuPrevProps).toEqual([{children: 'A'}]);
    expect(scuNextProps).toEqual([{children: 'B'}]);
    expect(cduPrevProps).toEqual([]);
    expect(cduNextProps).toEqual([]);

    // Next interrupt the partial render with higher priority work.
    // The in-progress child content will bailout.
    // Renders: Root, Middle, FirstChild, SecondChild
    ReactNoop.render(<Root>B</Root>);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    // At this point the higher priority render has completed.
    // Since FirstChild props didn't change, sCU returned false.
    // The previous memoized copy should be used.
    expect(renderCounter).toBe(2);
    expect(scuPrevProps).toEqual([{children: 'A'}, {children: 'B'}]);
    expect(scuNextProps).toEqual([{children: 'B'}, {children: 'B'}]);
    expect(cduPrevProps).toEqual([{children: 'A'}]);
    expect(cduNextProps).toEqual([{children: 'B'}]);
  });

<<<<<<< HEAD
  it('updates descendants with new context values', () => {
=======
  // @gate !disableLegacyContext
  it('updates descendants with new context values', async () => {
>>>>>>> remotes/upstream/main
    let instance;

    class TopContextProvider extends React.Component {
      static childContextTypes = {
        count: PropTypes.number,
      };
      constructor() {
        super();
        this.state = {count: 0};
        instance = this;
      }
      getChildContext = () => ({
        count: this.state.count,
      });
      render = () => this.props.children;
      updateCount = () =>
        this.setState(state => ({
          count: state.count + 1,
        }));
    }

    class Middle extends React.Component {
      render = () => this.props.children;
    }

    class Child extends React.Component {
      static contextTypes = {
        count: PropTypes.number,
      };
      render = () => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`count:${this.context.count}`);
=======
        Scheduler.log(`count:${this.context.count}`);
>>>>>>> remotes/upstream/main
        return null;
      };
    }

    ReactNoop.render(
      <TopContextProvider>
        <Middle>
          <Child />
        </Middle>
      </TopContextProvider>,
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['count:0']);
    instance.updateCount();
    expect(Scheduler).toFlushAndYield(['count:1']);
  });

  it('updates descendants with multiple context-providing ancestors with new context values', () => {
=======
    await waitForAll(['count:0']);
    instance.updateCount();
    await waitForAll(['count:1']);
  });

  // @gate !disableLegacyContext
  it('updates descendants with multiple context-providing ancestors with new context values', async () => {
>>>>>>> remotes/upstream/main
    let instance;

    class TopContextProvider extends React.Component {
      static childContextTypes = {
        count: PropTypes.number,
      };
      constructor() {
        super();
        this.state = {count: 0};
        instance = this;
      }
      getChildContext = () => ({
        count: this.state.count,
      });
      render = () => this.props.children;
      updateCount = () =>
        this.setState(state => ({
          count: state.count + 1,
        }));
    }

    class MiddleContextProvider extends React.Component {
      static childContextTypes = {
        name: PropTypes.string,
      };
      getChildContext = () => ({
        name: 'brian',
      });
      render = () => this.props.children;
    }

    class Child extends React.Component {
      static contextTypes = {
        count: PropTypes.number,
      };
      render = () => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`count:${this.context.count}`);
=======
        Scheduler.log(`count:${this.context.count}`);
>>>>>>> remotes/upstream/main
        return null;
      };
    }

    ReactNoop.render(
      <TopContextProvider>
        <MiddleContextProvider>
          <Child />
        </MiddleContextProvider>
      </TopContextProvider>,
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['count:0']);
    instance.updateCount();
    expect(Scheduler).toFlushAndYield(['count:1']);
  });

  it('should not update descendants with new context values if shouldComponentUpdate returns false', () => {
=======
    await waitForAll(['count:0']);
    instance.updateCount();
    await waitForAll(['count:1']);
  });

  // @gate !disableLegacyContext
  it('should not update descendants with new context values if shouldComponentUpdate returns false', async () => {
>>>>>>> remotes/upstream/main
    let instance;

    class TopContextProvider extends React.Component {
      static childContextTypes = {
        count: PropTypes.number,
      };
      constructor() {
        super();
        this.state = {count: 0};
        instance = this;
      }
      getChildContext = () => ({
        count: this.state.count,
      });
      render = () => this.props.children;
      updateCount = () =>
        this.setState(state => ({
          count: state.count + 1,
        }));
    }

    class MiddleScu extends React.Component {
      shouldComponentUpdate() {
        return false;
      }
      render = () => this.props.children;
    }

    class MiddleContextProvider extends React.Component {
      static childContextTypes = {
        name: PropTypes.string,
      };
      getChildContext = () => ({
        name: 'brian',
      });
      render = () => this.props.children;
    }

    class Child extends React.Component {
      static contextTypes = {
        count: PropTypes.number,
      };
      render = () => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`count:${this.context.count}`);
=======
        Scheduler.log(`count:${this.context.count}`);
>>>>>>> remotes/upstream/main
        return null;
      };
    }

    ReactNoop.render(
      <TopContextProvider>
        <MiddleScu>
          <MiddleContextProvider>
            <Child />
          </MiddleContextProvider>
        </MiddleScu>
      </TopContextProvider>,
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['count:0']);
    instance.updateCount();
    expect(Scheduler).toFlushWithoutYielding();
  });

  it('should update descendants with new context values if setState() is called in the middle of the tree', () => {
=======
    await waitForAll(['count:0']);
    instance.updateCount();
    await waitForAll([]);
  });

  // @gate !disableLegacyContext
  it('should update descendants with new context values if setState() is called in the middle of the tree', async () => {
>>>>>>> remotes/upstream/main
    let middleInstance;
    let topInstance;

    class TopContextProvider extends React.Component {
      static childContextTypes = {
        count: PropTypes.number,
      };
      constructor() {
        super();
        this.state = {count: 0};
        topInstance = this;
      }
      getChildContext = () => ({
        count: this.state.count,
      });
      render = () => this.props.children;
      updateCount = () =>
        this.setState(state => ({
          count: state.count + 1,
        }));
    }

    class MiddleScu extends React.Component {
      shouldComponentUpdate() {
        return false;
      }
      render = () => this.props.children;
    }

    class MiddleContextProvider extends React.Component {
      static childContextTypes = {
        name: PropTypes.string,
      };
      constructor() {
        super();
        this.state = {name: 'brian'};
        middleInstance = this;
      }
      getChildContext = () => ({
        name: this.state.name,
      });
      updateName = name => {
        this.setState({name});
      };
      render = () => this.props.children;
    }

    class Child extends React.Component {
      static contextTypes = {
        count: PropTypes.number,
        name: PropTypes.string,
      };
      render = () => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          `count:${this.context.count}, name:${this.context.name}`,
        );
=======
        Scheduler.log(`count:${this.context.count}, name:${this.context.name}`);
>>>>>>> remotes/upstream/main
        return null;
      };
    }

    ReactNoop.render(
      <TopContextProvider>
        <MiddleScu>
          <MiddleContextProvider>
            <Child />
          </MiddleContextProvider>
        </MiddleScu>
      </TopContextProvider>,
    );

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['count:0, name:brian']);
    topInstance.updateCount();
    expect(Scheduler).toFlushWithoutYielding();
    middleInstance.updateName('not brian');
    expect(Scheduler).toFlushAndYield(['count:1, name:not brian']);
  });

  it('does not interrupt for update at same priority', () => {
    function Parent(props) {
      Scheduler.unstable_yieldValue('Parent: ' + props.step);
=======
    await waitForAll(['count:0, name:brian']);
    topInstance.updateCount();
    await waitForAll([]);
    middleInstance.updateName('not brian');
    await waitForAll(['count:1, name:not brian']);
  });

  it('does not interrupt for update at same priority', async () => {
    function Parent(props) {
      Scheduler.log('Parent: ' + props.step);
>>>>>>> remotes/upstream/main
      return <Child step={props.step} />;
    }

    function Child(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Child: ' + props.step);
      return null;
    }

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Parent step={1} />);
      });
    } else {
      ReactNoop.render(<Parent step={1} />);
    }
    expect(Scheduler).toFlushAndYieldThrough(['Parent: 1']);
=======
      Scheduler.log('Child: ' + props.step);
      return null;
    }

    React.startTransition(() => {
      ReactNoop.render(<Parent step={1} />);
    });
    await waitFor(['Parent: 1']);
>>>>>>> remotes/upstream/main

    // Interrupt at same priority
    ReactNoop.render(<Parent step={2} />);

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Child: 1', 'Parent: 2', 'Child: 2']);
  });

  it('does not interrupt for update at lower priority', () => {
    function Parent(props) {
      Scheduler.unstable_yieldValue('Parent: ' + props.step);
=======
    await waitForAll(['Child: 1', 'Parent: 2', 'Child: 2']);
  });

  it('does not interrupt for update at lower priority', async () => {
    function Parent(props) {
      Scheduler.log('Parent: ' + props.step);
>>>>>>> remotes/upstream/main
      return <Child step={props.step} />;
    }

    function Child(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Child: ' + props.step);
      return null;
    }

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Parent step={1} />);
      });
    } else {
      ReactNoop.render(<Parent step={1} />);
    }
    expect(Scheduler).toFlushAndYieldThrough(['Parent: 1']);
=======
      Scheduler.log('Child: ' + props.step);
      return null;
    }

    React.startTransition(() => {
      ReactNoop.render(<Parent step={1} />);
    });
    await waitFor(['Parent: 1']);
>>>>>>> remotes/upstream/main

    // Interrupt at lower priority
    ReactNoop.expire(2000);
    ReactNoop.render(<Parent step={2} />);

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Child: 1', 'Parent: 2', 'Child: 2']);
  });

  it('does interrupt for update at higher priority', () => {
    function Parent(props) {
      Scheduler.unstable_yieldValue('Parent: ' + props.step);
=======
    await waitForAll(['Child: 1', 'Parent: 2', 'Child: 2']);
  });

  it('does interrupt for update at higher priority', async () => {
    function Parent(props) {
      Scheduler.log('Parent: ' + props.step);
>>>>>>> remotes/upstream/main
      return <Child step={props.step} />;
    }

    function Child(props) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Child: ' + props.step);
      return null;
    }

    if (gate(flags => flags.enableSyncDefaultUpdates)) {
      React.startTransition(() => {
        ReactNoop.render(<Parent step={1} />);
      });
    } else {
      ReactNoop.render(<Parent step={1} />);
    }
    expect(Scheduler).toFlushAndYieldThrough(['Parent: 1']);

    // Interrupt at higher priority
    ReactNoop.flushSync(() => ReactNoop.render(<Parent step={2} />));
    expect(Scheduler).toHaveYielded(['Parent: 2', 'Child: 2']);

    expect(Scheduler).toFlushAndYield([]);
  });

  // We sometimes use Maps with Fibers as keys.
  it('does not break with a bad Map polyfill', () => {
    const realMapSet = Map.prototype.set;

    function triggerCodePathThatUsesFibersAsMapKeys() {
=======
      Scheduler.log('Child: ' + props.step);
      return null;
    }

    React.startTransition(() => {
      ReactNoop.render(<Parent step={1} />);
    });
    await waitFor(['Parent: 1']);

    // Interrupt at higher priority
    ReactNoop.flushSync(() => ReactNoop.render(<Parent step={2} />));
    assertLog(['Parent: 2', 'Child: 2']);

    await waitForAll([]);
  });

  // We sometimes use Maps with Fibers as keys.
  // @gate !disableLegacyContext || !__DEV__
  it('does not break with a bad Map polyfill', async () => {
    const realMapSet = Map.prototype.set;

    async function triggerCodePathThatUsesFibersAsMapKeys() {
>>>>>>> remotes/upstream/main
      function Thing() {
        throw new Error('No.');
      }
      // This class uses legacy context, which triggers warnings,
      // the procedures for which use a Map to store fibers.
      class Boundary extends React.Component {
        state = {didError: false};
        componentDidCatch() {
          this.setState({didError: true});
        }
        static contextTypes = {
          color: () => null,
        };
        render() {
          return this.state.didError ? null : <Thing />;
        }
      }
      ReactNoop.render(
        <React.StrictMode>
          <Boundary />
        </React.StrictMode>,
      );
<<<<<<< HEAD
      expect(() => {
        expect(Scheduler).toFlushWithoutYielding();
=======
      await expect(async () => {
        await waitForAll([]);
>>>>>>> remotes/upstream/main
      }).toErrorDev([
        'Legacy context API has been detected within a strict-mode tree',
      ]);
    }

    // First, verify that this code path normally receives Fibers as keys,
    // and that they're not extensible.
    jest.resetModules();
    let receivedNonExtensibleObjects;
    // eslint-disable-next-line no-extend-native
<<<<<<< HEAD
    Map.prototype.set = function(key) {
=======
    Map.prototype.set = function (key) {
>>>>>>> remotes/upstream/main
      if (typeof key === 'object' && key !== null) {
        if (!Object.isExtensible(key)) {
          receivedNonExtensibleObjects = true;
        }
      }
      return realMapSet.apply(this, arguments);
    };
    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    try {
      receivedNonExtensibleObjects = false;
      triggerCodePathThatUsesFibersAsMapKeys();
=======
    let InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitFor = InternalTestUtils.waitFor;
    waitForThrow = InternalTestUtils.waitForThrow;
    assertLog = InternalTestUtils.assertLog;

    try {
      receivedNonExtensibleObjects = false;
      await triggerCodePathThatUsesFibersAsMapKeys();
>>>>>>> remotes/upstream/main
    } finally {
      // eslint-disable-next-line no-extend-native
      Map.prototype.set = realMapSet;
    }
    // If this fails, find another code path in Fiber
    // that passes Fibers as keys to Maps.
    // Note that we only expect them to be non-extensible
    // in development.
    expect(receivedNonExtensibleObjects).toBe(__DEV__);

    // Next, verify that a Map polyfill that "writes" to keys
    // doesn't cause a failure.
    jest.resetModules();
    // eslint-disable-next-line no-extend-native
<<<<<<< HEAD
    Map.prototype.set = function(key, value) {
=======
    Map.prototype.set = function (key, value) {
>>>>>>> remotes/upstream/main
      if (typeof key === 'object' && key !== null) {
        // A polyfill could do something like this.
        // It would throw if an object is not extensible.
        key.__internalValueSlot = value;
      }
      return realMapSet.apply(this, arguments);
    };
    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    try {
      triggerCodePathThatUsesFibersAsMapKeys();
=======
    InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitFor = InternalTestUtils.waitFor;
    waitForThrow = InternalTestUtils.waitForThrow;
    assertLog = InternalTestUtils.assertLog;

    try {
      await triggerCodePathThatUsesFibersAsMapKeys();
>>>>>>> remotes/upstream/main
    } finally {
      // eslint-disable-next-line no-extend-native
      Map.prototype.set = realMapSet;
    }
    // If we got this far, our feature detection worked.
    // We knew that Map#set() throws for non-extensible objects,
    // so we didn't set them as non-extensible for that reason.
  });
});
