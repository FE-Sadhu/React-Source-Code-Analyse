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
 */

'use strict';

<<<<<<< HEAD
describe('SimpleEventPlugin', function() {
=======
describe('SimpleEventPlugin', function () {
>>>>>>> remotes/upstream/main
  let React;
  let ReactDOM;
  let ReactDOMClient;
  let Scheduler;
  let act;

  let onClick;
  let container;
<<<<<<< HEAD
=======
  let assertLog;
  let waitForAll;
>>>>>>> remotes/upstream/main

  function expectClickThru(element) {
    element.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  }

  function expectNoClickThru(element) {
    element.click();
    expect(onClick).toHaveBeenCalledTimes(0);
  }

  function mounted(element) {
    container = document.createElement('div');
    document.body.appendChild(container);
    element = ReactDOM.render(element, container);
    return element;
  }

<<<<<<< HEAD
  beforeEach(function() {
=======
  beforeEach(function () {
>>>>>>> remotes/upstream/main
    jest.resetModules();
    React = require('react');
    ReactDOM = require('react-dom');
    ReactDOMClient = require('react-dom/client');
    Scheduler = require('scheduler');

<<<<<<< HEAD
=======
    const InternalTestUtils = require('internal-test-utils');
    assertLog = InternalTestUtils.assertLog;
    waitForAll = InternalTestUtils.waitForAll;

>>>>>>> remotes/upstream/main
    onClick = jest.fn();
  });

  afterEach(() => {
    if (container && document.body.contains(container)) {
      document.body.removeChild(container);
      container = null;
    }
  });

<<<<<<< HEAD
  it('A non-interactive tags click when disabled', function() {
=======
  it('A non-interactive tags click when disabled', function () {
>>>>>>> remotes/upstream/main
    const element = <div onClick={onClick} />;
    expectClickThru(mounted(element));
  });

<<<<<<< HEAD
  it('A non-interactive tags clicks bubble when disabled', function() {
=======
  it('A non-interactive tags clicks bubble when disabled', function () {
>>>>>>> remotes/upstream/main
    const element = mounted(
      <div onClick={onClick}>
        <div />
      </div>,
    );
    const child = element.firstChild;
    child.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

<<<<<<< HEAD
  it('does not register a click when clicking a child of a disabled element', function() {
=======
  it('does not register a click when clicking a child of a disabled element', function () {
>>>>>>> remotes/upstream/main
    const element = mounted(
      <button onClick={onClick} disabled={true}>
        <span />
      </button>,
    );
    const child = element.querySelector('span');

    child.click();
    expect(onClick).toHaveBeenCalledTimes(0);
  });

<<<<<<< HEAD
  it('triggers click events for children of disabled elements', function() {
=======
  it('triggers click events for children of disabled elements', function () {
>>>>>>> remotes/upstream/main
    const element = mounted(
      <button disabled={true}>
        <span onClick={onClick} />
      </button>,
    );
    const child = element.querySelector('span');

    child.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

<<<<<<< HEAD
  it('triggers parent captured click events when target is a child of a disabled elements', function() {
=======
  it('triggers parent captured click events when target is a child of a disabled elements', function () {
>>>>>>> remotes/upstream/main
    const element = mounted(
      <div onClickCapture={onClick}>
        <button disabled={true}>
          <span />
        </button>
      </div>,
    );
    const child = element.querySelector('span');

    child.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

<<<<<<< HEAD
  it('triggers captured click events for children of disabled elements', function() {
=======
  it('triggers captured click events for children of disabled elements', function () {
>>>>>>> remotes/upstream/main
    const element = mounted(
      <button disabled={true}>
        <span onClickCapture={onClick} />
      </button>,
    );
    const child = element.querySelector('span');

    child.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

<<<<<<< HEAD
  ['button', 'input', 'select', 'textarea'].forEach(function(tagName) {
    describe(tagName, function() {
=======
  ['button', 'input', 'select', 'textarea'].forEach(function (tagName) {
    describe(tagName, function () {
>>>>>>> remotes/upstream/main
      it('should forward clicks when it starts out not disabled', () => {
        const element = React.createElement(tagName, {
          onClick: onClick,
        });

        expectClickThru(mounted(element));
      });

      it('should not forward clicks when it starts out disabled', () => {
        const element = React.createElement(tagName, {
          onClick: onClick,
          disabled: true,
        });

        expectNoClickThru(mounted(element));
      });

      it('should forward clicks when it becomes not disabled', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        let element = ReactDOM.render(
          React.createElement(tagName, {onClick: onClick, disabled: true}),
          container,
        );
        element = ReactDOM.render(
          React.createElement(tagName, {onClick: onClick}),
          container,
        );
        expectClickThru(element);
      });

      it('should not forward clicks when it becomes disabled', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        let element = ReactDOM.render(
          React.createElement(tagName, {onClick: onClick}),
          container,
        );
        element = ReactDOM.render(
          React.createElement(tagName, {onClick: onClick, disabled: true}),
          container,
        );
        expectNoClickThru(element);
      });

      it('should work correctly if the listener is changed', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        let element = ReactDOM.render(
          React.createElement(tagName, {onClick: onClick, disabled: true}),
          container,
        );
        element = ReactDOM.render(
          React.createElement(tagName, {onClick: onClick, disabled: false}),
          container,
        );
        expectClickThru(element);
      });
    });
  });

  it('batches updates that occur as a result of a nested event dispatch', () => {
    container = document.createElement('div');
    document.body.appendChild(container);

    let button;
    class Button extends React.Component {
      state = {count: 0};
      increment = () =>
        this.setState(state => ({
          count: state.count + 1,
        }));
      componentDidUpdate() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`didUpdate - Count: ${this.state.count}`);
=======
        Scheduler.log(`didUpdate - Count: ${this.state.count}`);
>>>>>>> remotes/upstream/main
      }
      render() {
        return (
          <button
            ref={el => (button = el)}
            onFocus={this.increment}
            onClick={() => {
              // The focus call synchronously dispatches a nested event. All of
              // the updates in this handler should be batched together.
              this.increment();
              button.focus();
              this.increment();
            }}>
            Count: {this.state.count}
          </button>
        );
      }
    }

    function click() {
      button.dispatchEvent(
        new MouseEvent('click', {bubbles: true, cancelable: true}),
      );
    }

    ReactDOM.render(<Button />, container);
    expect(button.textContent).toEqual('Count: 0');
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    click();

    // There should be exactly one update.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['didUpdate - Count: 3']);
=======
    assertLog(['didUpdate - Count: 3']);
>>>>>>> remotes/upstream/main
    expect(button.textContent).toEqual('Count: 3');
  });

  describe('interactive events, in concurrent mode', () => {
    beforeEach(() => {
      jest.resetModules();

      React = require('react');
      ReactDOM = require('react-dom');
      ReactDOMClient = require('react-dom/client');
      Scheduler = require('scheduler');

<<<<<<< HEAD
      act = require('jest-react').act;
=======
      const InternalTestUtils = require('internal-test-utils');
      assertLog = InternalTestUtils.assertLog;
      waitForAll = InternalTestUtils.waitForAll;

      act = require('internal-test-utils').act;
>>>>>>> remotes/upstream/main
    });

    it('flushes pending interactive work before exiting event handler', async () => {
      container = document.createElement('div');
      const root = ReactDOMClient.createRoot(container);
      document.body.appendChild(container);

      let button;
      class Button extends React.Component {
        state = {disabled: false};
        onClick = () => {
          // Perform some side-effect
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Side-effect');
=======
          Scheduler.log('Side-effect');
>>>>>>> remotes/upstream/main
          // Disable the button
          this.setState({disabled: true});
        };
        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(
=======
          Scheduler.log(
>>>>>>> remotes/upstream/main
            `render button: ${this.state.disabled ? 'disabled' : 'enabled'}`,
          );
          return (
            <button
              ref={el => (button = el)}
              // Handler is removed after the first click
              onClick={this.state.disabled ? null : this.onClick}
            />
          );
        }
      }

      // Initial mount
      root.render(<Button />);
      // Should not have flushed yet because it's async
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([]);
      expect(button).toBe(undefined);
      // Flush async work
      expect(Scheduler).toFlushAndYield(['render button: enabled']);
=======
      assertLog([]);
      expect(button).toBe(undefined);
      // Flush async work
      await waitForAll(['render button: enabled']);
>>>>>>> remotes/upstream/main

      function click() {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        });
        Object.defineProperty(event, 'timeStamp', {
          value: 0,
        });
        button.dispatchEvent(event);
      }

      // Click the button to trigger the side-effect
<<<<<<< HEAD
      await act(async () => click());
      expect(Scheduler).toHaveYielded([
=======
      await act(() => click());
      assertLog([
>>>>>>> remotes/upstream/main
        // The handler fired
        'Side-effect',
        // The component re-rendered synchronously, even in concurrent mode.
        'render button: disabled',
      ]);

      // Click the button again
      click();
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        // The event handler was removed from the button, so there's no effect.
      ]);

      // The handler should not fire again no matter how many times we
      // click the handler.
      click();
      click();
      click();
      click();
      click();
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([]);
=======
      await waitForAll([]);
>>>>>>> remotes/upstream/main
    });

    // NOTE: This test was written for the old behavior of discrete updates,
    // where they would be async, but flushed early if another discrete update
    // was dispatched.
    it('end result of many interactive updates is deterministic', async () => {
      container = document.createElement('div');
      const root = ReactDOMClient.createRoot(container);
      document.body.appendChild(container);

      let button;
      class Button extends React.Component {
        state = {count: 0};
        render() {
          return (
            <button
              ref={el => (button = el)}
              onClick={() =>
                // Intentionally not using the updater form here
                this.setState({count: this.state.count + 1})
              }>
              Count: {this.state.count}
            </button>
          );
        }
      }

      // Initial mount
      root.render(<Button />);
      // Should not have flushed yet because it's async
      expect(button).toBe(undefined);
      // Flush async work
<<<<<<< HEAD
      Scheduler.unstable_flushAll();
=======
      await waitForAll([]);
>>>>>>> remotes/upstream/main
      expect(button.textContent).toEqual('Count: 0');

      function click() {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        });
        Object.defineProperty(event, 'timeStamp', {
          value: 0,
        });
        button.dispatchEvent(event);
      }

      // Click the button a single time
<<<<<<< HEAD
      await act(async () => click());
=======
      await act(() => click());
>>>>>>> remotes/upstream/main
      // The counter should update synchronously, even in concurrent mode.
      expect(button.textContent).toEqual('Count: 1');

      // Click the button many more times
<<<<<<< HEAD
      await act(async () => click());
      await act(async () => click());
      await act(async () => click());
      await act(async () => click());
      await act(async () => click());
      await act(async () => click());

      // Flush the remaining work
      Scheduler.unstable_flushAll();
=======
      await act(() => click());
      await act(() => click());
      await act(() => click());
      await act(() => click());
      await act(() => click());
      await act(() => click());

      // Flush the remaining work
      await waitForAll([]);
>>>>>>> remotes/upstream/main
      // The counter should equal the total number of clicks
      expect(button.textContent).toEqual('Count: 7');
    });
  });

<<<<<<< HEAD
  describe('iOS bubbling click fix', function() {
    // See http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html

    it('does not add a local click to interactive elements', function() {
=======
  describe('iOS bubbling click fix', function () {
    // See http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html

    it('does not add a local click to interactive elements', function () {
>>>>>>> remotes/upstream/main
      container = document.createElement('div');

      ReactDOM.render(<button onClick={onClick} />, container);

      const node = container.firstChild;

      node.dispatchEvent(new MouseEvent('click'));

      expect(onClick).toHaveBeenCalledTimes(0);
    });

<<<<<<< HEAD
    it('adds a local click listener to non-interactive elements', function() {
=======
    it('adds a local click listener to non-interactive elements', function () {
>>>>>>> remotes/upstream/main
      container = document.createElement('div');

      ReactDOM.render(<div onClick={onClick} />, container);

      const node = container.firstChild;

      node.dispatchEvent(new MouseEvent('click'));

      expect(onClick).toHaveBeenCalledTimes(0);
    });

    it('registers passive handlers for events affected by the intervention', () => {
      container = document.createElement('div');

      const passiveEvents = [];
      const nativeAddEventListener = container.addEventListener;
<<<<<<< HEAD
      container.addEventListener = function(type, fn, options) {
=======
      container.addEventListener = function (type, fn, options) {
>>>>>>> remotes/upstream/main
        if (options !== null && typeof options === 'object') {
          if (options.passive) {
            passiveEvents.push(type);
          }
        }
        return nativeAddEventListener.apply(this, arguments);
      };

      ReactDOM.render(<div />, container);

      expect(passiveEvents).toEqual([
        'touchstart',
        'touchstart',
        'touchmove',
        'touchmove',
        'wheel',
        'wheel',
      ]);
    });
  });
});
