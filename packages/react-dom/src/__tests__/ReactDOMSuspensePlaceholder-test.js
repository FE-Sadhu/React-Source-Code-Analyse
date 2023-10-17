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
let Suspense;
<<<<<<< HEAD
let ReactCache;
let Scheduler;
let TextResource;
let act;
=======
let Scheduler;
let act;
let textCache;
>>>>>>> remotes/upstream/main

describe('ReactDOMSuspensePlaceholder', () => {
  let container;

  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactDOM = require('react-dom');
<<<<<<< HEAD
    ReactCache = require('react-cache');
    Scheduler = require('scheduler');
    act = require('jest-react').act;
=======
    Scheduler = require('scheduler');
    act = require('internal-test-utils').act;
>>>>>>> remotes/upstream/main
    Suspense = React.Suspense;
    container = document.createElement('div');
    document.body.appendChild(container);

<<<<<<< HEAD
    TextResource = ReactCache.unstable_createResource(
      ([text, ms = 0]) => {
        return new Promise((resolve, reject) =>
          setTimeout(() => {
            resolve(text);
          }, ms),
        );
      },
      ([text, ms]) => text,
    );
=======
    textCache = new Map();
>>>>>>> remotes/upstream/main
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

<<<<<<< HEAD
  function advanceTimers(ms) {
    // Note: This advances Jest's virtual time but not React's. Use
    // ReactNoop.expire for that.
    if (typeof ms !== 'number') {
      throw new Error('Must specify ms');
    }
    jest.advanceTimersByTime(ms);
    // Wait until the end of the current tick
    // We cannot use a timer since we're faking them
    return Promise.resolve().then(() => {});
  }

  function Text(props) {
    return props.text;
  }

  function AsyncText(props) {
    const text = props.text;
    TextResource.read([props.text, props.ms]);
=======
  function resolveText(text) {
    const record = textCache.get(text);
    if (record === undefined) {
      const newRecord = {
        status: 'resolved',
        value: text,
      };
      textCache.set(text, newRecord);
    } else if (record.status === 'pending') {
      const thenable = record.value;
      record.status = 'resolved';
      record.value = text;
      thenable.pings.forEach(t => t());
    }
  }

  function readText(text) {
    const record = textCache.get(text);
    if (record !== undefined) {
      switch (record.status) {
        case 'pending':
          Scheduler.log(`Suspend! [${text}]`);
          throw record.value;
        case 'rejected':
          throw record.value;
        case 'resolved':
          return record.value;
      }
    } else {
      Scheduler.log(`Suspend! [${text}]`);
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
      textCache.set(text, newRecord);

      throw thenable;
    }
  }

  function Text({text}) {
    Scheduler.log(text);
    return text;
  }

  function AsyncText({text}) {
    readText(text);
    Scheduler.log(text);
>>>>>>> remotes/upstream/main
    return text;
  }

  it('hides and unhides timed out DOM elements', async () => {
    const divs = [
      React.createRef(null),
      React.createRef(null),
      React.createRef(null),
    ];
    function App() {
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <div ref={divs[0]}>
            <Text text="A" />
          </div>
          <div ref={divs[1]}>
<<<<<<< HEAD
            <AsyncText ms={500} text="B" />
=======
            <AsyncText text="B" />
>>>>>>> remotes/upstream/main
          </div>
          <div style={{display: 'inline'}} ref={divs[2]}>
            <Text text="C" />
          </div>
        </Suspense>
      );
    }
    ReactDOM.render(<App />, container);
    expect(window.getComputedStyle(divs[0].current).display).toEqual('none');
    expect(window.getComputedStyle(divs[1].current).display).toEqual('none');
    expect(window.getComputedStyle(divs[2].current).display).toEqual('none');

<<<<<<< HEAD
    await advanceTimers(500);

    Scheduler.unstable_flushAll();
=======
    await act(async () => {
      await resolveText('B');
    });
>>>>>>> remotes/upstream/main

    expect(window.getComputedStyle(divs[0].current).display).toEqual('block');
    expect(window.getComputedStyle(divs[1].current).display).toEqual('block');
    // This div's display was set with a prop.
    expect(window.getComputedStyle(divs[2].current).display).toEqual('inline');
  });

  it('hides and unhides timed out text nodes', async () => {
    function App() {
      return (
        <Suspense fallback={<Text text="Loading..." />}>
          <Text text="A" />
<<<<<<< HEAD
          <AsyncText ms={500} text="B" />
=======
          <AsyncText text="B" />
>>>>>>> remotes/upstream/main
          <Text text="C" />
        </Suspense>
      );
    }
    ReactDOM.render(<App />, container);
    expect(container.textContent).toEqual('Loading...');

<<<<<<< HEAD
    await advanceTimers(500);

    Scheduler.unstable_flushAll();
=======
    await act(async () => {
      await resolveText('B');
    });
>>>>>>> remotes/upstream/main

    expect(container.textContent).toEqual('ABC');
  });

  it(
    'outside concurrent mode, re-hides children if their display is updated ' +
      'but the boundary is still showing the fallback',
    async () => {
      const {useState} = React;

      let setIsVisible;
      function Sibling({children}) {
        const [isVisible, _setIsVisible] = useState(false);
        setIsVisible = _setIsVisible;
        return (
          <span style={{display: isVisible ? 'inline' : 'none'}}>
            {children}
          </span>
        );
      }

      function App() {
        return (
          <Suspense fallback={<Text text="Loading..." />}>
            <Sibling>Sibling</Sibling>
            <span>
<<<<<<< HEAD
              <AsyncText ms={500} text="Async" />
=======
              <AsyncText text="Async" />
>>>>>>> remotes/upstream/main
            </span>
          </Suspense>
        );
      }

<<<<<<< HEAD
      act(() => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactDOM.render(<App />, container);
      });
      expect(container.innerHTML).toEqual(
        '<span style="display: none;">Sibling</span><span style=' +
          '"display: none;"></span>Loading...',
      );

<<<<<<< HEAD
      act(() => setIsVisible(true));
=======
      // Update the inline display style. It will be overridden because it's
      // inside a hidden fallback.
      await act(() => setIsVisible(true));
>>>>>>> remotes/upstream/main
      expect(container.innerHTML).toEqual(
        '<span style="display: none;">Sibling</span><span style=' +
          '"display: none;"></span>Loading...',
      );

<<<<<<< HEAD
      await advanceTimers(500);

      Scheduler.unstable_flushAll();

=======
      // Unsuspend. The style should now match the inline prop.
      await act(() => resolveText('Async'));
>>>>>>> remotes/upstream/main
      expect(container.innerHTML).toEqual(
        '<span style="display: inline;">Sibling</span><span style="">Async</span>',
      );
    },
  );

  // Regression test for https://github.com/facebook/react/issues/14188
  it('can call findDOMNode() in a suspended component commit phase', async () => {
    const log = [];
    const Lazy = React.lazy(
      () =>
        new Promise(resolve =>
          resolve({
            default() {
              return 'lazy';
            },
          }),
        ),
    );

    class Child extends React.Component {
      componentDidMount() {
        log.push('cDM ' + this.props.id);
        ReactDOM.findDOMNode(this);
      }
      componentDidUpdate() {
        log.push('cDU ' + this.props.id);
        ReactDOM.findDOMNode(this);
      }
      render() {
        return 'child';
      }
    }

    const buttonRef = React.createRef();
    class App extends React.Component {
      state = {
        suspend: false,
      };
      handleClick = () => {
        this.setState({suspend: true});
      };
      render() {
        return (
          <React.Suspense fallback="Loading">
            <Child id="first" />
            <button ref={buttonRef} onClick={this.handleClick}>
              Suspend
            </button>
            <Child id="second" />
            {this.state.suspend && <Lazy />}
          </React.Suspense>
        );
      }
    }

    ReactDOM.render(<App />, container);

    expect(log).toEqual(['cDM first', 'cDM second']);
    log.length = 0;

    buttonRef.current.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    await Lazy;
    expect(log).toEqual(['cDU first', 'cDU second']);
  });

  // Regression test for https://github.com/facebook/react/issues/14188
  it('can call findDOMNode() in a suspended component commit phase (#2)', () => {
    let suspendOnce = Promise.resolve();
    function Suspend() {
      if (suspendOnce) {
        const promise = suspendOnce;
        suspendOnce = null;
        throw promise;
      }
      return null;
    }

    const log = [];
    class Child extends React.Component {
      componentDidMount() {
        log.push('cDM');
        ReactDOM.findDOMNode(this);
      }

      componentDidUpdate() {
        log.push('cDU');
        ReactDOM.findDOMNode(this);
      }

      render() {
        return null;
      }
    }

    function App() {
      return (
        <Suspense fallback="Loading">
          <Suspend />
          <Child />
        </Suspense>
      );
    }

    ReactDOM.render(<App />, container);
    expect(log).toEqual(['cDM']);
    ReactDOM.render(<App />, container);
    expect(log).toEqual(['cDM', 'cDU']);
  });
});
