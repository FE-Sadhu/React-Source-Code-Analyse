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

let React;
let ReactDOM;
let ReactDOMClient;
<<<<<<< HEAD
let ReactFeatureFlags;
let Scheduler;
let act;
=======
let Scheduler;
let act;
let waitForAll;
let waitForDiscrete;
let assertLog;
>>>>>>> remotes/upstream/main

const setUntrackedChecked = Object.getOwnPropertyDescriptor(
  HTMLInputElement.prototype,
  'checked',
).set;

const setUntrackedValue = Object.getOwnPropertyDescriptor(
  HTMLInputElement.prototype,
  'value',
).set;

const setUntrackedTextareaValue = Object.getOwnPropertyDescriptor(
  HTMLTextAreaElement.prototype,
  'value',
).set;

describe('ChangeEventPlugin', () => {
  let container;

  beforeEach(() => {
    jest.resetModules();
<<<<<<< HEAD
    ReactFeatureFlags = require('shared/ReactFeatureFlags');
=======
>>>>>>> remotes/upstream/main
    // TODO pull this into helper method, reduce repetition.
    // mock the browser APIs which are used in schedule:
    // - calling 'window.postMessage' should actually fire postmessage handlers
    const originalAddEventListener = global.addEventListener;
    let postMessageCallback;
<<<<<<< HEAD
    global.addEventListener = function(eventName, callback, useCapture) {
=======
    global.addEventListener = function (eventName, callback, useCapture) {
>>>>>>> remotes/upstream/main
      if (eventName === 'message') {
        postMessageCallback = callback;
      } else {
        originalAddEventListener(eventName, callback, useCapture);
      }
    };
<<<<<<< HEAD
    global.postMessage = function(messageKey, targetOrigin) {
=======
    global.postMessage = function (messageKey, targetOrigin) {
>>>>>>> remotes/upstream/main
      const postMessageEvent = {source: window, data: messageKey};
      if (postMessageCallback) {
        postMessageCallback(postMessageEvent);
      }
    };
    React = require('react');
    ReactDOM = require('react-dom');
    ReactDOMClient = require('react-dom/client');
<<<<<<< HEAD
    act = require('jest-react').act;
    Scheduler = require('scheduler');
=======
    act = require('internal-test-utils').act;
    Scheduler = require('scheduler');

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitForDiscrete = InternalTestUtils.waitForDiscrete;
    assertLog = InternalTestUtils.assertLog;

>>>>>>> remotes/upstream/main
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  // We try to avoid firing "duplicate" React change events.
  // However, to tell which events are "duplicates" and should be ignored,
  // we are tracking the "current" input value, and only respect events
  // that occur after it changes. In most of these tests, we verify that we
  // keep track of the "current" value and only fire events when it changes.
  // See https://github.com/facebook/react/pull/5746.

  it('should consider initial text value to be current', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const node = ReactDOM.render(
      <input type="text" onChange={cb} defaultValue="foo" />,
      container,
    );
    node.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    node.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}));

<<<<<<< HEAD
    if (ReactFeatureFlags.disableInputAttributeSyncing) {
      // TODO: figure out why. This might be a bug.
      expect(called).toBe(1);
    } else {
      // There should be no React change events because the value stayed the same.
      expect(called).toBe(0);
    }
=======
    // There should be no React change events because the value stayed the same.
    expect(called).toBe(0);
>>>>>>> remotes/upstream/main
  });

  it('should consider initial text value to be current (capture)', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const node = ReactDOM.render(
      <input type="text" onChangeCapture={cb} defaultValue="foo" />,
      container,
    );
    node.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    node.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}));

<<<<<<< HEAD
    if (ReactFeatureFlags.disableInputAttributeSyncing) {
      // TODO: figure out why. This might be a bug.
      expect(called).toBe(1);
    } else {
      // There should be no React change events because the value stayed the same.
      expect(called).toBe(0);
    }
=======
    // There should be no React change events because the value stayed the same.
    expect(called).toBe(0);
  });

  it('should not invoke a change event for textarea same value', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const node = ReactDOM.render(
      <textarea onChange={cb} defaultValue="initial" />,
      container,
    );
    node.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    node.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}));
    // There should be no React change events because the value stayed the same.
    expect(called).toBe(0);
  });

  it('should not invoke a change event for textarea same value (capture)', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const node = ReactDOM.render(
      <textarea onChangeCapture={cb} defaultValue="initial" />,
      container,
    );
    node.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    node.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}));
    // There should be no React change events because the value stayed the same.
    expect(called).toBe(0);
>>>>>>> remotes/upstream/main
  });

  it('should consider initial checkbox checked=true to be current', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const node = ReactDOM.render(
      <input type="checkbox" onChange={cb} defaultChecked={true} />,
      container,
    );

    // Secretly, set `checked` to false, so that dispatching the `click` will
    // make it `true` again. Thus, at the time of the event, React should not
    // consider it a change from the initial `true` value.
    setUntrackedChecked.call(node, false);
    node.dispatchEvent(
      new MouseEvent('click', {bubbles: true, cancelable: true}),
    );
    // There should be no React change events because the value stayed the same.
    expect(called).toBe(0);
  });

  it('should consider initial checkbox checked=false to be current', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const node = ReactDOM.render(
      <input type="checkbox" onChange={cb} defaultChecked={false} />,
      container,
    );

    // Secretly, set `checked` to true, so that dispatching the `click` will
    // make it `false` again. Thus, at the time of the event, React should not
    // consider it a change from the initial `false` value.
    setUntrackedChecked.call(node, true);
    node.dispatchEvent(
      new MouseEvent('click', {bubbles: true, cancelable: true}),
    );
    // There should be no React change events because the value stayed the same.
    expect(called).toBe(0);
  });

  it('should fire change for checkbox input', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const node = ReactDOM.render(
      <input type="checkbox" onChange={cb} />,
      container,
    );

    expect(node.checked).toBe(false);
    node.dispatchEvent(
      new MouseEvent('click', {bubbles: true, cancelable: true}),
    );
    // Note: unlike with text input events, dispatching `click` actually
    // toggles the checkbox and updates its `checked` value.
    expect(node.checked).toBe(true);
    expect(called).toBe(1);

    expect(node.checked).toBe(true);
    node.dispatchEvent(
      new MouseEvent('click', {bubbles: true, cancelable: true}),
    );
    expect(node.checked).toBe(false);
    expect(called).toBe(2);
  });

  it('should not fire change setting the value programmatically', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const input = ReactDOM.render(
      <input type="text" defaultValue="foo" onChange={cb} />,
      container,
    );

    // Set it programmatically.
    input.value = 'bar';
    // Even if a DOM input event fires, React sees that the real input value now
    // ('bar') is the same as the "current" one we already recorded.
    input.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    expect(input.value).toBe('bar');
    // In this case we don't expect to get a React event.
    expect(called).toBe(0);

    // However, we can simulate user typing by calling the underlying setter.
    setUntrackedValue.call(input, 'foo');
    // Now, when the event fires, the real input value ('foo') differs from the
    // "current" one we previously recorded ('bar').
    input.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    expect(input.value).toBe('foo');
    // In this case React should fire an event for it.
    expect(called).toBe(1);

    // Verify again that extra events without real changes are ignored.
    input.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    expect(called).toBe(1);
  });

  it('should not distinguish equal string and number values', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const input = ReactDOM.render(
      <input type="text" defaultValue="42" onChange={cb} />,
      container,
    );

    // When we set `value` as a property, React updates the "current" value
    // that it tracks internally. The "current" value is later used to determine
    // whether a change event is a duplicate or not.
    // Even though we set value to a number, we still shouldn't get a change
    // event because as a string, it's equal to the initial value ('42').
    input.value = 42;
    input.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    expect(input.value).toBe('42');
    expect(called).toBe(0);
  });

  // See a similar input test above for a detailed description of why.
  it('should not fire change when setting checked programmatically', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const input = ReactDOM.render(
      <input type="checkbox" onChange={cb} defaultChecked={false} />,
      container,
    );

    // Set the value, updating the "current" value that React tracks to true.
    input.checked = true;
    // Under the hood, uncheck the box so that the click will "check" it again.
    setUntrackedChecked.call(input, false);
    input.click();
    expect(input.checked).toBe(true);
    // We don't expect a React event because at the time of the click, the real
    // checked value (true) was the same as the last recorded "current" value
    // (also true).
    expect(called).toBe(0);

    // However, simulating a normal click should fire a React event because the
    // real value (false) would have changed from the last tracked value (true).
    input.click();
    expect(called).toBe(1);
  });

  it('should unmount', () => {
    const input = ReactDOM.render(<input />, container);

    ReactDOM.unmountComponentAtNode(container);
  });

  it('should only fire change for checked radio button once', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const input = ReactDOM.render(
      <input type="radio" onChange={cb} />,
      container,
    );

    setUntrackedChecked.call(input, true);
    input.dispatchEvent(new Event('click', {bubbles: true, cancelable: true}));
    input.dispatchEvent(new Event('click', {bubbles: true, cancelable: true}));
    expect(called).toBe(1);
  });

  it('should track radio button cousins in a group', () => {
    let called1 = 0;
    let called2 = 0;

    function cb1(e) {
      called1++;
      expect(e.type).toBe('change');
    }

    function cb2(e) {
      called2++;
      expect(e.type).toBe('change');
    }

    const div = ReactDOM.render(
      <div>
        <input type="radio" name="group" onChange={cb1} />
        <input type="radio" name="group" onChange={cb2} />
      </div>,
      container,
    );
    const option1 = div.childNodes[0];
    const option2 = div.childNodes[1];

    // Select first option.
    option1.click();
    expect(called1).toBe(1);
    expect(called2).toBe(0);

    // Select second option.
    option2.click();
    expect(called1).toBe(1);
    expect(called2).toBe(1);

    // Select the first option.
    // It should receive the React change event again.
    option1.click();
    expect(called1).toBe(2);
    expect(called2).toBe(1);
  });

  it('should deduplicate input value change events', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    let input;
    ['text', 'number', 'range'].forEach(type => {
      called = 0;
      input = ReactDOM.render(<input type={type} onChange={cb} />, container);
      // Should be ignored (no change):
      input.dispatchEvent(
        new Event('change', {bubbles: true, cancelable: true}),
      );
      setUntrackedValue.call(input, '42');
      input.dispatchEvent(
        new Event('change', {bubbles: true, cancelable: true}),
      );
      // Should be ignored (no change):
      input.dispatchEvent(
        new Event('change', {bubbles: true, cancelable: true}),
      );
      expect(called).toBe(1);
      ReactDOM.unmountComponentAtNode(container);

      called = 0;
      input = ReactDOM.render(<input type={type} onChange={cb} />, container);
      // Should be ignored (no change):
      input.dispatchEvent(
        new Event('input', {bubbles: true, cancelable: true}),
      );
      setUntrackedValue.call(input, '42');
      input.dispatchEvent(
        new Event('input', {bubbles: true, cancelable: true}),
      );
      // Should be ignored (no change):
      input.dispatchEvent(
        new Event('input', {bubbles: true, cancelable: true}),
      );
      expect(called).toBe(1);
      ReactDOM.unmountComponentAtNode(container);

      called = 0;
      input = ReactDOM.render(<input type={type} onChange={cb} />, container);
      // Should be ignored (no change):
      input.dispatchEvent(
        new Event('change', {bubbles: true, cancelable: true}),
      );
      setUntrackedValue.call(input, '42');
      input.dispatchEvent(
        new Event('input', {bubbles: true, cancelable: true}),
      );
      // Should be ignored (no change):
      input.dispatchEvent(
        new Event('change', {bubbles: true, cancelable: true}),
      );
      expect(called).toBe(1);
      ReactDOM.unmountComponentAtNode(container);
    });
  });

  it('should listen for both change and input events when supported', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const input = ReactDOM.render(
      <input type="range" onChange={cb} />,
      container,
    );

    setUntrackedValue.call(input, 10);
    input.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));

    setUntrackedValue.call(input, 20);
    input.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}));

    expect(called).toBe(2);
  });

  it('should only fire events when the value changes for range inputs', () => {
    let called = 0;

    function cb(e) {
      called++;
      expect(e.type).toBe('change');
    }

    const input = ReactDOM.render(
      <input type="range" onChange={cb} />,
      container,
    );
    setUntrackedValue.call(input, '40');
    input.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    input.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}));

    setUntrackedValue.call(input, 'foo');
    input.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
    input.dispatchEvent(new Event('change', {bubbles: true, cancelable: true}));

    expect(called).toBe(2);
  });

  it('does not crash for nodes with custom value property', () => {
    let originalCreateElement;
    // https://github.com/facebook/react/issues/10196
    try {
      originalCreateElement = document.createElement;
<<<<<<< HEAD
      document.createElement = function() {
=======
      document.createElement = function () {
>>>>>>> remotes/upstream/main
        const node = originalCreateElement.apply(this, arguments);
        Object.defineProperty(node, 'value', {
          get() {},
          set() {},
        });
        return node;
      };
      const div = document.createElement('div');
      // Mount
      const node = ReactDOM.render(<input type="text" />, div);
      // Update
      ReactDOM.render(<input type="text" />, div);
      // Change
      node.dispatchEvent(
        new Event('change', {bubbles: true, cancelable: true}),
      );
      // Unmount
      ReactDOM.unmountComponentAtNode(div);
    } finally {
      document.createElement = originalCreateElement;
    }
  });

  describe('concurrent mode', () => {
<<<<<<< HEAD
    it('text input', () => {
=======
    it('text input', async () => {
>>>>>>> remotes/upstream/main
      const root = ReactDOMClient.createRoot(container);
      let input;

      class ControlledInput extends React.Component {
        state = {value: 'initial'};
        onChange = event => this.setState({value: event.target.value});
        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`render: ${this.state.value}`);
=======
          Scheduler.log(`render: ${this.state.value}`);
>>>>>>> remotes/upstream/main
          const controlledValue =
            this.state.value === 'changed' ? 'changed [!]' : this.state.value;
          return (
            <input
              ref={el => (input = el)}
              type="text"
              value={controlledValue}
              onChange={this.onChange}
            />
          );
        }
      }

      // Initial mount. Test that this is async.
      root.render(<ControlledInput />);
      // Should not have flushed yet.
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([]);
      expect(input).toBe(undefined);
      // Flush callbacks.
      expect(Scheduler).toFlushAndYield(['render: initial']);
=======
      assertLog([]);
      expect(input).toBe(undefined);
      // Flush callbacks.
      await waitForAll(['render: initial']);
>>>>>>> remotes/upstream/main
      expect(input.value).toBe('initial');

      // Trigger a change event.
      setUntrackedValue.call(input, 'changed');
      input.dispatchEvent(
        new Event('input', {bubbles: true, cancelable: true}),
      );
      // Change should synchronously flush
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['render: changed']);
=======
      assertLog(['render: changed']);
>>>>>>> remotes/upstream/main
      // Value should be the controlled value, not the original one
      expect(input.value).toBe('changed [!]');
    });

<<<<<<< HEAD
    it('checkbox input', () => {
=======
    it('checkbox input', async () => {
>>>>>>> remotes/upstream/main
      const root = ReactDOMClient.createRoot(container);
      let input;

      class ControlledInput extends React.Component {
        state = {checked: false};
        onChange = event => {
          this.setState({checked: event.target.checked});
        };
        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`render: ${this.state.checked}`);
=======
          Scheduler.log(`render: ${this.state.checked}`);
>>>>>>> remotes/upstream/main
          const controlledValue = this.props.reverse
            ? !this.state.checked
            : this.state.checked;
          return (
            <input
              ref={el => (input = el)}
              type="checkbox"
              checked={controlledValue}
              onChange={this.onChange}
            />
          );
        }
      }

      // Initial mount. Test that this is async.
      root.render(<ControlledInput reverse={false} />);
      // Should not have flushed yet.
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([]);
      expect(input).toBe(undefined);
      // Flush callbacks.
      expect(Scheduler).toFlushAndYield(['render: false']);
=======
      assertLog([]);
      expect(input).toBe(undefined);
      // Flush callbacks.
      await waitForAll(['render: false']);
>>>>>>> remotes/upstream/main
      expect(input.checked).toBe(false);

      // Trigger a change event.
      input.dispatchEvent(
        new MouseEvent('click', {bubbles: true, cancelable: true}),
      );
      // Change should synchronously flush
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['render: true']);
=======
      assertLog(['render: true']);
>>>>>>> remotes/upstream/main
      expect(input.checked).toBe(true);

      // Now let's make sure we're using the controlled value.
      root.render(<ControlledInput reverse={true} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['render: true']);
=======
      await waitForAll(['render: true']);
>>>>>>> remotes/upstream/main

      // Trigger another change event.
      input.dispatchEvent(
        new MouseEvent('click', {bubbles: true, cancelable: true}),
      );
      // Change should synchronously flush
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['render: true']);
      expect(input.checked).toBe(false);
    });

    it('textarea', () => {
=======
      assertLog(['render: true']);
      expect(input.checked).toBe(false);
    });

    it('textarea', async () => {
>>>>>>> remotes/upstream/main
      const root = ReactDOMClient.createRoot(container);
      let textarea;

      class ControlledTextarea extends React.Component {
        state = {value: 'initial'};
        onChange = event => this.setState({value: event.target.value});
        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`render: ${this.state.value}`);
=======
          Scheduler.log(`render: ${this.state.value}`);
>>>>>>> remotes/upstream/main
          const controlledValue =
            this.state.value === 'changed' ? 'changed [!]' : this.state.value;
          return (
            <textarea
              ref={el => (textarea = el)}
              type="text"
              value={controlledValue}
              onChange={this.onChange}
            />
          );
        }
      }

      // Initial mount. Test that this is async.
      root.render(<ControlledTextarea />);
      // Should not have flushed yet.
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([]);
      expect(textarea).toBe(undefined);
      // Flush callbacks.
      expect(Scheduler).toFlushAndYield(['render: initial']);
=======
      assertLog([]);
      expect(textarea).toBe(undefined);
      // Flush callbacks.
      await waitForAll(['render: initial']);
>>>>>>> remotes/upstream/main
      expect(textarea.value).toBe('initial');

      // Trigger a change event.
      setUntrackedTextareaValue.call(textarea, 'changed');
      textarea.dispatchEvent(
        new Event('input', {bubbles: true, cancelable: true}),
      );
      // Change should synchronously flush
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['render: changed']);
=======
      assertLog(['render: changed']);
>>>>>>> remotes/upstream/main
      // Value should be the controlled value, not the original one
      expect(textarea.value).toBe('changed [!]');
    });

<<<<<<< HEAD
    it('parent of input', () => {
=======
    it('parent of input', async () => {
>>>>>>> remotes/upstream/main
      const root = ReactDOMClient.createRoot(container);
      let input;

      class ControlledInput extends React.Component {
        state = {value: 'initial'};
        onChange = event => this.setState({value: event.target.value});
        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`render: ${this.state.value}`);
=======
          Scheduler.log(`render: ${this.state.value}`);
>>>>>>> remotes/upstream/main
          const controlledValue =
            this.state.value === 'changed' ? 'changed [!]' : this.state.value;
          return (
            <div onChange={this.onChange}>
              <input
                ref={el => (input = el)}
                type="text"
                value={controlledValue}
                onChange={() => {
                  // Does nothing. Parent handler is responsible for updating.
                }}
              />
            </div>
          );
        }
      }

      // Initial mount. Test that this is async.
      root.render(<ControlledInput />);
      // Should not have flushed yet.
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([]);
      expect(input).toBe(undefined);
      // Flush callbacks.
      expect(Scheduler).toFlushAndYield(['render: initial']);
=======
      assertLog([]);
      expect(input).toBe(undefined);
      // Flush callbacks.
      await waitForAll(['render: initial']);
>>>>>>> remotes/upstream/main
      expect(input.value).toBe('initial');

      // Trigger a change event.
      setUntrackedValue.call(input, 'changed');
      input.dispatchEvent(
        new Event('input', {bubbles: true, cancelable: true}),
      );
      // Change should synchronously flush
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded(['render: changed']);
=======
      assertLog(['render: changed']);
>>>>>>> remotes/upstream/main
      // Value should be the controlled value, not the original one
      expect(input.value).toBe('changed [!]');
    });

    it('is sync for non-input events', async () => {
      const root = ReactDOMClient.createRoot(container);
      let input;

      class ControlledInput extends React.Component {
        state = {value: 'initial'};
        onChange = event => this.setState({value: event.target.value});
        reset = () => {
          this.setState({value: ''});
        };
        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`render: ${this.state.value}`);
=======
          Scheduler.log(`render: ${this.state.value}`);
>>>>>>> remotes/upstream/main
          const controlledValue =
            this.state.value === 'changed' ? 'changed [!]' : this.state.value;
          return (
            <input
              ref={el => (input = el)}
              type="text"
              value={controlledValue}
              onChange={this.onChange}
              onClick={this.reset}
            />
          );
        }
      }

      // Initial mount. Test that this is async.
      root.render(<ControlledInput />);
      // Should not have flushed yet.
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([]);
      expect(input).toBe(undefined);
      // Flush callbacks.
      expect(Scheduler).toFlushAndYield(['render: initial']);
=======
      assertLog([]);
      expect(input).toBe(undefined);
      // Flush callbacks.
      await waitForAll(['render: initial']);
>>>>>>> remotes/upstream/main
      expect(input.value).toBe('initial');

      // Trigger a click event
      input.dispatchEvent(
        new Event('click', {bubbles: true, cancelable: true}),
      );

      // Flush microtask queue.
<<<<<<< HEAD
      await null;
      expect(Scheduler).toHaveYielded(['render: ']);
=======
      await waitForDiscrete(['render: ']);
>>>>>>> remotes/upstream/main
      expect(input.value).toBe('');
    });

    it('mouse enter/leave should be user-blocking but not discrete', async () => {
      const {useState} = React;

      const root = ReactDOMClient.createRoot(container);

      const target = React.createRef(null);
      function Foo() {
        const [isHover, setHover] = useState(false);
        return (
          <div
            ref={target}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            {isHover ? 'hovered' : 'not hovered'}
          </div>
        );
      }

<<<<<<< HEAD
      await act(async () => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        root.render(<Foo />);
      });
      expect(container.textContent).toEqual('not hovered');

<<<<<<< HEAD
      await act(async () => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        const mouseOverEvent = document.createEvent('MouseEvents');
        mouseOverEvent.initEvent('mouseover', true, true);
        target.current.dispatchEvent(mouseOverEvent);

        // Flush discrete updates
        ReactDOM.flushSync();
        // Since mouse enter/leave is not discrete, should not have updated yet
        expect(container.textContent).toEqual('not hovered');
      });
      expect(container.textContent).toEqual('hovered');
    });
  });
});
