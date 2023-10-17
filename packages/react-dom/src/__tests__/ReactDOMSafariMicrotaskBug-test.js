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

let ReactDOMClient;
let act;
<<<<<<< HEAD

describe('ReactDOMSafariMicrotaskBug-test', () => {
  let container;
  let flushMicrotasksPrematurely;
=======
let assertLog;
let Scheduler;

describe('ReactDOMSafariMicrotaskBug-test', () => {
  let container;
  let overrideQueueMicrotask;
  let flushFakeMicrotasks;
>>>>>>> remotes/upstream/main

  beforeEach(() => {
    // In Safari, microtasks don't always run on clean stack.
    // This setup crudely approximates it.
    // In reality, the sync flush happens when an iframe is added to the page.
    // https://github.com/facebook/react/issues/22459
<<<<<<< HEAD
    let queue = [];
    window.queueMicrotask = function(cb) {
      queue.push(cb);
    };
    flushMicrotasksPrematurely = function() {
      while (queue.length > 0) {
        const prevQueue = queue;
        queue = [];
        prevQueue.forEach(cb => cb());
=======
    const originalQueueMicrotask = queueMicrotask;
    overrideQueueMicrotask = false;
    const fakeMicrotaskQueue = [];
    global.queueMicrotask = cb => {
      if (overrideQueueMicrotask) {
        fakeMicrotaskQueue.push(cb);
      } else {
        originalQueueMicrotask(cb);
      }
    };
    flushFakeMicrotasks = () => {
      while (fakeMicrotaskQueue.length > 0) {
        const cb = fakeMicrotaskQueue.shift();
        cb();
>>>>>>> remotes/upstream/main
      }
    };

    jest.resetModules();
    container = document.createElement('div');
    React = require('react');
    ReactDOMClient = require('react-dom/client');
<<<<<<< HEAD
    act = require('jest-react').act;
=======
    act = require('internal-test-utils').act;
    assertLog = require('internal-test-utils').assertLog;
    Scheduler = require('scheduler');
>>>>>>> remotes/upstream/main

    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should deal with premature microtask in commit phase', async () => {
    let ran = false;
    function Foo() {
      const [state, setState] = React.useState(0);
      return (
        <div
          ref={() => {
<<<<<<< HEAD
            if (!ran) {
              ran = true;
              setState(1);
              flushMicrotasksPrematurely();
=======
            overrideQueueMicrotask = true;
            if (!ran) {
              ran = true;
              setState(1);
              flushFakeMicrotasks();
              Scheduler.log(
                'Content at end of ref callback: ' + container.textContent,
              );
>>>>>>> remotes/upstream/main
            }
          }}>
          {state}
        </div>
      );
    }
    const root = ReactDOMClient.createRoot(container);
<<<<<<< HEAD
    await act(async () => {
      root.render(<Foo />);
    });
=======
    await act(() => {
      root.render(<Foo />);
    });
    assertLog(['Content at end of ref callback: 0']);
>>>>>>> remotes/upstream/main
    expect(container.textContent).toBe('1');
  });

  it('should deal with premature microtask in event handler', async () => {
    function Foo() {
      const [state, setState] = React.useState(0);
      return (
        <button
          onClick={() => {
<<<<<<< HEAD
            setState(1);
            flushMicrotasksPrematurely();
=======
            overrideQueueMicrotask = true;
            setState(1);
            flushFakeMicrotasks();
            Scheduler.log(
              'Content at end of click handler: ' + container.textContent,
            );
>>>>>>> remotes/upstream/main
          }}>
          {state}
        </button>
      );
    }
    const root = ReactDOMClient.createRoot(container);
<<<<<<< HEAD
    await act(async () => {
      root.render(<Foo />);
    });
    expect(container.textContent).toBe('0');
    await act(async () => {
=======
    await act(() => {
      root.render(<Foo />);
    });
    expect(container.textContent).toBe('0');
    await act(() => {
>>>>>>> remotes/upstream/main
      container.firstChild.dispatchEvent(
        new MouseEvent('click', {bubbles: true}),
      );
    });
<<<<<<< HEAD
=======
    // This causes the update to flush earlier than usual. This isn't the ideal
    // behavior but we use this test to document it. The bug is Safari's, not
    // ours, so we just do our best to not crash even though the behavior isn't
    // completely correct.
    assertLog(['Content at end of click handler: 1']);
>>>>>>> remotes/upstream/main
    expect(container.textContent).toBe('1');
  });
});
