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

import {createEventTarget, setPointerEvent} from 'dom-event-testing-library';

let React;
let ReactFeatureFlags;
let ReactDOM;
let ReactDOMClient;
let useFocusWithin;
let act;
<<<<<<< HEAD
let Scheduler;
=======
>>>>>>> remotes/upstream/main

function initializeModules(hasPointerEvents) {
  setPointerEvent(hasPointerEvents);
  jest.resetModules();
  ReactFeatureFlags = require('shared/ReactFeatureFlags');
  ReactFeatureFlags.enableScopeAPI = true;
  ReactFeatureFlags.enableCreateEventHandleAPI = true;
  React = require('react');
  ReactDOM = require('react-dom');
  ReactDOMClient = require('react-dom/client');
<<<<<<< HEAD
  Scheduler = require('scheduler');
  act = require('jest-react').act;
=======
  act = require('internal-test-utils').act;
>>>>>>> remotes/upstream/main

  // TODO: This import throws outside of experimental mode. Figure out better
  // strategy for gated imports.
  if (__EXPERIMENTAL__ || global.__WWW__) {
    useFocusWithin = require('react-interactions/events/focus').useFocusWithin;
  }
}

const forcePointerEvents = true;
const table = [[forcePointerEvents], [!forcePointerEvents]];

describe.each(table)(`useFocus`, hasPointerEvents => {
  let container;
  let container2;

  beforeEach(() => {
    initializeModules(hasPointerEvents);
    container = document.createElement('div');
    document.body.appendChild(container);
    container2 = document.createElement('div');
    document.body.appendChild(container2);
  });

  afterEach(() => {
    ReactDOM.render(null, container);
    document.body.removeChild(container);
    document.body.removeChild(container2);
    container = null;
    container2 = null;
  });

  describe('disabled', () => {
    let onFocusWithinChange, onFocusWithinVisibleChange, ref;

<<<<<<< HEAD
    const componentInit = () => {
=======
    const componentInit = async () => {
>>>>>>> remotes/upstream/main
      onFocusWithinChange = jest.fn();
      onFocusWithinVisibleChange = jest.fn();
      ref = React.createRef();
      const Component = () => {
        const focusWithinRef = useFocusWithin(ref, {
          disabled: true,
          onFocusWithinChange,
          onFocusWithinVisibleChange,
        });
        return <div ref={focusWithinRef} />;
      };
<<<<<<< HEAD
      ReactDOM.render(<Component />, container);
      Scheduler.unstable_flushAll();
    };

    // @gate www
    it('prevents custom events being dispatched', () => {
      componentInit();
=======
      await act(() => {
        ReactDOM.render(<Component />, container);
      });
    };

    // @gate www
    it('prevents custom events being dispatched', async () => {
      await componentInit();
>>>>>>> remotes/upstream/main
      const target = createEventTarget(ref.current);
      target.focus();
      target.blur();
      expect(onFocusWithinChange).not.toBeCalled();
      expect(onFocusWithinVisibleChange).not.toBeCalled();
    });
  });

  describe('onFocusWithinChange', () => {
    let onFocusWithinChange, ref, innerRef, innerRef2;

    const Component = ({show}) => {
      const focusWithinRef = useFocusWithin(ref, {
        onFocusWithinChange,
      });
      return (
        <div ref={focusWithinRef}>
          {show && <input ref={innerRef} />}
          <div ref={innerRef2} />
        </div>
      );
    };

<<<<<<< HEAD
    const componentInit = () => {
=======
    const componentInit = async () => {
>>>>>>> remotes/upstream/main
      onFocusWithinChange = jest.fn();
      ref = React.createRef();
      innerRef = React.createRef();
      innerRef2 = React.createRef();
<<<<<<< HEAD
      ReactDOM.render(<Component show={true} />, container);
      Scheduler.unstable_flushAll();
    };

    // @gate www
    it('is called after "blur" and "focus" events on focus target', () => {
      componentInit();
=======
      await act(() => {
        ReactDOM.render(<Component show={true} />, container);
      });
    };

    // @gate www
    it('is called after "blur" and "focus" events on focus target', async () => {
      await componentInit();
>>>>>>> remotes/upstream/main
      const target = createEventTarget(ref.current);
      target.focus();
      expect(onFocusWithinChange).toHaveBeenCalledTimes(1);
      expect(onFocusWithinChange).toHaveBeenCalledWith(true);
      target.blur({relatedTarget: container});
      expect(onFocusWithinChange).toHaveBeenCalledTimes(2);
      expect(onFocusWithinChange).toHaveBeenCalledWith(false);
    });

    // @gate www
<<<<<<< HEAD
    it('is called after "blur" and "focus" events on descendants', () => {
      componentInit();
=======
    it('is called after "blur" and "focus" events on descendants', async () => {
      await componentInit();
>>>>>>> remotes/upstream/main
      const target = createEventTarget(innerRef.current);
      target.focus();
      expect(onFocusWithinChange).toHaveBeenCalledTimes(1);
      expect(onFocusWithinChange).toHaveBeenCalledWith(true);
      target.blur({relatedTarget: container});
      expect(onFocusWithinChange).toHaveBeenCalledTimes(2);
      expect(onFocusWithinChange).toHaveBeenCalledWith(false);
    });

    // @gate www
<<<<<<< HEAD
    it('is only called once when focus moves within and outside the subtree', () => {
      componentInit();
=======
    it('is only called once when focus moves within and outside the subtree', async () => {
      await componentInit();
>>>>>>> remotes/upstream/main
      const node = ref.current;
      const innerNode1 = innerRef.current;
      const innerNode2 = innerRef.current;
      const target = createEventTarget(node);
      const innerTarget1 = createEventTarget(innerNode1);
      const innerTarget2 = createEventTarget(innerNode2);

      // focus shifts into subtree
      innerTarget1.focus();
      expect(onFocusWithinChange).toHaveBeenCalledTimes(1);
      expect(onFocusWithinChange).toHaveBeenCalledWith(true);
      // focus moves around subtree
      innerTarget1.blur({relatedTarget: innerNode2});
      innerTarget2.focus();
      innerTarget2.blur({relatedTarget: node});
      target.focus();
      target.blur({relatedTarget: innerNode1});
      expect(onFocusWithinChange).toHaveBeenCalledTimes(1);
      // focus shifts outside subtree
      innerTarget1.blur({relatedTarget: container});
      expect(onFocusWithinChange).toHaveBeenCalledTimes(2);
      expect(onFocusWithinChange).toHaveBeenCalledWith(false);
    });
  });

  describe('onFocusWithinVisibleChange', () => {
    let onFocusWithinVisibleChange, ref, innerRef, innerRef2;

    const Component = ({show}) => {
      const focusWithinRef = useFocusWithin(ref, {
        onFocusWithinVisibleChange,
      });
      return (
        <div ref={focusWithinRef}>
          {show && <input ref={innerRef} />}
          <div ref={innerRef2} />
        </div>
      );
    };

<<<<<<< HEAD
    const componentInit = () => {
=======
    const componentInit = async () => {
>>>>>>> remotes/upstream/main
      onFocusWithinVisibleChange = jest.fn();
      ref = React.createRef();
      innerRef = React.createRef();
      innerRef2 = React.createRef();
<<<<<<< HEAD
      ReactDOM.render(<Component show={true} />, container);
      Scheduler.unstable_flushAll();
    };

    // @gate www
    it('is called after "focus" and "blur" on focus target if keyboard was used', () => {
      componentInit();
=======
      await act(() => {
        ReactDOM.render(<Component show={true} />, container);
      });
    };

    // @gate www
    it('is called after "focus" and "blur" on focus target if keyboard was used', async () => {
      await componentInit();
>>>>>>> remotes/upstream/main
      const target = createEventTarget(ref.current);
      const containerTarget = createEventTarget(container);
      // use keyboard first
      containerTarget.keydown({key: 'Tab'});
      target.focus();
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(1);
      expect(onFocusWithinVisibleChange).toHaveBeenCalledWith(true);
      target.blur({relatedTarget: container});
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(2);
      expect(onFocusWithinVisibleChange).toHaveBeenCalledWith(false);
    });

    // @gate www
<<<<<<< HEAD
    it('is called after "focus" and "blur" on descendants if keyboard was used', () => {
      componentInit();
=======
    it('is called after "focus" and "blur" on descendants if keyboard was used', async () => {
      await componentInit();
>>>>>>> remotes/upstream/main
      const innerTarget = createEventTarget(innerRef.current);
      const containerTarget = createEventTarget(container);
      // use keyboard first
      containerTarget.keydown({key: 'Tab'});
      innerTarget.focus();
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(1);
      expect(onFocusWithinVisibleChange).toHaveBeenCalledWith(true);
      innerTarget.blur({relatedTarget: container});
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(2);
      expect(onFocusWithinVisibleChange).toHaveBeenCalledWith(false);
    });

    // @gate www
<<<<<<< HEAD
    it('is called if non-keyboard event is dispatched on target previously focused with keyboard', () => {
      componentInit();
=======
    it('is called if non-keyboard event is dispatched on target previously focused with keyboard', async () => {
      await componentInit();
>>>>>>> remotes/upstream/main
      const node = ref.current;
      const innerNode1 = innerRef.current;
      const innerNode2 = innerRef2.current;

      const target = createEventTarget(node);
      const innerTarget1 = createEventTarget(innerNode1);
      const innerTarget2 = createEventTarget(innerNode2);
      // use keyboard first
      target.focus();
      target.keydown({key: 'Tab'});
      target.blur({relatedTarget: innerNode1});
      innerTarget1.focus();
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(1);
      expect(onFocusWithinVisibleChange).toHaveBeenCalledWith(true);
      // then use pointer on the next target, focus should no longer be visible
      innerTarget2.pointerdown();
      innerTarget1.blur({relatedTarget: innerNode2});
      innerTarget2.focus();
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(2);
      expect(onFocusWithinVisibleChange).toHaveBeenCalledWith(false);
      // then use keyboard again
      innerTarget2.keydown({key: 'Tab', shiftKey: true});
      innerTarget2.blur({relatedTarget: innerNode1});
      innerTarget1.focus();
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(3);
      expect(onFocusWithinVisibleChange).toHaveBeenCalledWith(true);
      // then use pointer on the target, focus should no longer be visible
      innerTarget1.pointerdown();
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(4);
      expect(onFocusWithinVisibleChange).toHaveBeenCalledWith(false);
      // onFocusVisibleChange should not be called again
      innerTarget1.blur({relatedTarget: container});
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(4);
    });

    // @gate www
<<<<<<< HEAD
    it('is not called after "focus" and "blur" events without keyboard', () => {
      componentInit();
=======
    it('is not called after "focus" and "blur" events without keyboard', async () => {
      await componentInit();
>>>>>>> remotes/upstream/main
      const innerTarget = createEventTarget(innerRef.current);
      innerTarget.pointerdown();
      innerTarget.pointerup();
      innerTarget.blur({relatedTarget: container});
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(0);
    });

    // @gate www
<<<<<<< HEAD
    it('is only called once when focus moves within and outside the subtree', () => {
      componentInit();
=======
    it('is only called once when focus moves within and outside the subtree', async () => {
      await componentInit();
>>>>>>> remotes/upstream/main
      const node = ref.current;
      const innerNode1 = innerRef.current;
      const innerNode2 = innerRef2.current;
      const target = createEventTarget(node);
      const innerTarget1 = createEventTarget(innerNode1);
      const innerTarget2 = createEventTarget(innerNode2);

      // focus shifts into subtree
      innerTarget1.focus();
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(1);
      expect(onFocusWithinVisibleChange).toHaveBeenCalledWith(true);
      // focus moves around subtree
      innerTarget1.blur({relatedTarget: innerNode2});
      innerTarget2.focus();
      innerTarget2.blur({relatedTarget: node});
      target.focus();
      target.blur({relatedTarget: innerNode1});
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(1);
      // focus shifts outside subtree
      innerTarget1.blur({relatedTarget: container});
      expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(2);
      expect(onFocusWithinVisibleChange).toHaveBeenCalledWith(false);
    });
  });

  // @gate www
<<<<<<< HEAD
  it('should correctly handle focus visibility when typing into an input', () => {
=======
  it('should correctly handle focus visibility when typing into an input', async () => {
>>>>>>> remotes/upstream/main
    const onFocusWithinVisibleChange = jest.fn();
    const ref = React.createRef();
    const inputRef = React.createRef();
    const Component = () => {
      const focusWithinRef = useFocusWithin(ref, {
        onFocusWithinVisibleChange,
      });
      return (
        <div ref={focusWithinRef}>
          <input ref={inputRef} type="text" />
        </div>
      );
    };
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactDOM.render(<Component />, container);
    });

    const target = createEventTarget(inputRef.current);
    // focus the target
    target.pointerdown();
    target.focus();
    target.keydown({key: 'a'});
    expect(onFocusWithinVisibleChange).toHaveBeenCalledTimes(0);
  });

  describe('onBeforeBlurWithin', () => {
    let onBeforeBlurWithin, onAfterBlurWithin, ref, innerRef, innerRef2;

    beforeEach(() => {
      onBeforeBlurWithin = jest.fn();
      onAfterBlurWithin = jest.fn(e => {
        e.persist();
      });
      ref = React.createRef();
      innerRef = React.createRef();
      innerRef2 = React.createRef();
    });

    // @gate www
<<<<<<< HEAD
    it('is called after a focused element is unmounted', () => {
=======
    it('is called after a focused element is unmounted', async () => {
>>>>>>> remotes/upstream/main
      const Component = ({show}) => {
        const focusWithinRef = useFocusWithin(ref, {
          onBeforeBlurWithin,
          onAfterBlurWithin,
        });
        return (
          <div ref={focusWithinRef}>
            {show && <input ref={innerRef} />}
            <div ref={innerRef2} />
          </div>
        );
      };

<<<<<<< HEAD
      ReactDOM.render(<Component show={true} />, container);
      Scheduler.unstable_flushAll();
=======
      await act(() => {
        ReactDOM.render(<Component show={true} />, container);
      });
>>>>>>> remotes/upstream/main

      const inner = innerRef.current;
      const target = createEventTarget(inner);
      target.keydown({key: 'Tab'});
      target.focus();
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(0);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(0);
      ReactDOM.render(<Component show={false} />, container);
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(1);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(1);
      expect(onAfterBlurWithin).toHaveBeenCalledWith(
        expect.objectContaining({relatedTarget: inner}),
      );
    });

    // @gate www
<<<<<<< HEAD
    it('is called after a nested focused element is unmounted', () => {
=======
    it('is called after a nested focused element is unmounted', async () => {
>>>>>>> remotes/upstream/main
      const Component = ({show}) => {
        const focusWithinRef = useFocusWithin(ref, {
          onBeforeBlurWithin,
          onAfterBlurWithin,
        });
        return (
          <div ref={focusWithinRef}>
            {show && (
              <div>
                <input ref={innerRef} />
              </div>
            )}
            <div ref={innerRef2} />
          </div>
        );
      };

<<<<<<< HEAD
      ReactDOM.render(<Component show={true} />, container);
      Scheduler.unstable_flushAll();
=======
      await act(() => {
        ReactDOM.render(<Component show={true} />, container);
      });
>>>>>>> remotes/upstream/main

      const inner = innerRef.current;
      const target = createEventTarget(inner);
      target.keydown({key: 'Tab'});
      target.focus();
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(0);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(0);
      ReactDOM.render(<Component show={false} />, container);
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(1);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(1);
      expect(onAfterBlurWithin).toHaveBeenCalledWith(
        expect.objectContaining({relatedTarget: inner}),
      );
    });

    // @gate www
<<<<<<< HEAD
    it('is called after many elements are unmounted', () => {
=======
    it('is called after many elements are unmounted', async () => {
>>>>>>> remotes/upstream/main
      const buttonRef = React.createRef();
      const inputRef = React.createRef();

      const Component = ({show}) => {
        const focusWithinRef = useFocusWithin(ref, {
          onBeforeBlurWithin,
          onAfterBlurWithin,
        });
        return (
          <div ref={focusWithinRef}>
            {show && <button>Press me!</button>}
            {show && <button>Press me!</button>}
            {show && <input ref={inputRef} />}
            {show && <button>Press me!</button>}
            {!show && <button ref={buttonRef}>Press me!</button>}
            {show && <button>Press me!</button>}
            <button>Press me!</button>
            <button>Press me!</button>
          </div>
        );
      };

<<<<<<< HEAD
      ReactDOM.render(<Component show={true} />, container);
      Scheduler.unstable_flushAll();
=======
      await act(() => {
        ReactDOM.render(<Component show={true} />, container);
      });
>>>>>>> remotes/upstream/main

      inputRef.current.focus();
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(0);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(0);
      ReactDOM.render(<Component show={false} />, container);
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(1);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(1);
    });

    // @gate www
<<<<<<< HEAD
    it('is called after a nested focused element is unmounted (with scope query)', () => {
=======
    it('is called after a nested focused element is unmounted (with scope query)', async () => {
>>>>>>> remotes/upstream/main
      const TestScope = React.unstable_Scope;
      const testScopeQuery = (type, props) => true;
      let targetNodes;
      let targetNode;

      const Component = ({show}) => {
        const scopeRef = React.useRef(null);
        const focusWithinRef = useFocusWithin(scopeRef, {
          onBeforeBlurWithin(event) {
            const scope = scopeRef.current;
            targetNode = innerRef.current;
            targetNodes = scope.DO_NOT_USE_queryAllNodes(testScopeQuery);
          },
        });

        return (
          <TestScope ref={focusWithinRef}>
            {show && <input ref={innerRef} />}
          </TestScope>
        );
      };

<<<<<<< HEAD
      ReactDOM.render(<Component show={true} />, container);
      Scheduler.unstable_flushAll();
=======
      await act(() => {
        ReactDOM.render(<Component show={true} />, container);
      });
>>>>>>> remotes/upstream/main

      const inner = innerRef.current;
      const target = createEventTarget(inner);
      target.keydown({key: 'Tab'});
      target.focus();
<<<<<<< HEAD
      ReactDOM.render(<Component show={false} />, container);
      Scheduler.unstable_flushAll();
=======
      await act(() => {
        ReactDOM.render(<Component show={false} />, container);
      });
>>>>>>> remotes/upstream/main
      expect(targetNodes).toEqual([targetNode]);
    });

    // @gate www
<<<<<<< HEAD
    it('is called after a focused suspended element is hidden', () => {
=======
    it('is called after a focused suspended element is hidden', async () => {
>>>>>>> remotes/upstream/main
      const Suspense = React.Suspense;
      let suspend = false;
      let resolve;
      const promise = new Promise(resolvePromise => (resolve = resolvePromise));

      function Child() {
        if (suspend) {
          throw promise;
        } else {
          return <input ref={innerRef} />;
        }
      }

      const Component = ({show}) => {
        const focusWithinRef = useFocusWithin(ref, {
          onBeforeBlurWithin,
          onAfterBlurWithin,
        });

        return (
          <div ref={focusWithinRef}>
            <Suspense fallback="Loading...">
              <Child />
            </Suspense>
          </div>
        );
      };

      const root = ReactDOMClient.createRoot(container2);

<<<<<<< HEAD
      act(() => {
        root.render(<Component />);
      });
      jest.runAllTimers();
=======
      await act(() => {
        root.render(<Component />);
      });
>>>>>>> remotes/upstream/main
      expect(container2.innerHTML).toBe('<div><input></div>');

      const inner = innerRef.current;
      const target = createEventTarget(inner);
      target.keydown({key: 'Tab'});
      target.focus();
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(0);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(0);

      suspend = true;
<<<<<<< HEAD
      act(() => {
        root.render(<Component />);
      });
      jest.runAllTimers();
=======
      await act(() => {
        root.render(<Component />);
      });
>>>>>>> remotes/upstream/main
      expect(container2.innerHTML).toBe(
        '<div><input style="display: none;">Loading...</div>',
      );
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(1);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(1);
      resolve();
    });

    // @gate www
<<<<<<< HEAD
    it('is called after a focused suspended element is hidden then shown', () => {
=======
    it('is called after a focused suspended element is hidden then shown', async () => {
>>>>>>> remotes/upstream/main
      const Suspense = React.Suspense;
      let suspend = false;
      let resolve;
      const promise = new Promise(resolvePromise => (resolve = resolvePromise));
      const buttonRef = React.createRef();

      function Child() {
        if (suspend) {
          throw promise;
        } else {
          return <input ref={innerRef} />;
        }
      }

      const Component = ({show}) => {
        const focusWithinRef = useFocusWithin(ref, {
          onBeforeBlurWithin,
          onAfterBlurWithin,
        });

        return (
          <div ref={focusWithinRef}>
            <Suspense fallback={<button ref={buttonRef}>Loading...</button>}>
              <Child />
            </Suspense>
          </div>
        );
      };

      const root = ReactDOMClient.createRoot(container2);

<<<<<<< HEAD
      act(() => {
        root.render(<Component />);
      });
      jest.runAllTimers();
=======
      await act(() => {
        root.render(<Component />);
      });
>>>>>>> remotes/upstream/main

      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(0);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(0);

      suspend = true;
<<<<<<< HEAD
      act(() => {
        root.render(<Component />);
      });
      jest.runAllTimers();
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(0);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(0);

      act(() => {
        root.render(<Component />);
      });
      jest.runAllTimers();
=======
      await act(() => {
        root.render(<Component />);
      });
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(0);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(0);

      await act(() => {
        root.render(<Component />);
      });
>>>>>>> remotes/upstream/main
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(0);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(0);

      buttonRef.current.focus();
      suspend = false;
<<<<<<< HEAD
      act(() => {
        root.render(<Component />);
      });
      jest.runAllTimers();
=======
      await act(() => {
        root.render(<Component />);
      });
>>>>>>> remotes/upstream/main
      expect(onBeforeBlurWithin).toHaveBeenCalledTimes(1);
      expect(onAfterBlurWithin).toHaveBeenCalledTimes(1);

      resolve();
    });
  });
});
