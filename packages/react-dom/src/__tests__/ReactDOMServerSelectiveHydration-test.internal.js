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

import {createEventTarget} from 'dom-event-testing-library';

let React;
let ReactDOM;
let ReactDOMClient;
let ReactDOMServer;
let ReactFeatureFlags;
let Scheduler;
let Suspense;
let act;
<<<<<<< HEAD

let IdleEventPriority;
=======
let assertLog;
let waitForAll;
let waitFor;
let waitForPaint;

let IdleEventPriority;
let ContinuousEventPriority;
>>>>>>> remotes/upstream/main

function dispatchMouseHoverEvent(to, from) {
  if (!to) {
    to = null;
  }
  if (!from) {
    from = null;
  }
  if (from) {
    const mouseOutEvent = document.createEvent('MouseEvents');
    mouseOutEvent.initMouseEvent(
      'mouseout',
      true,
      true,
      window,
      0,
      50,
      50,
      50,
      50,
      false,
      false,
      false,
      false,
      0,
      to,
    );
    from.dispatchEvent(mouseOutEvent);
  }
  if (to) {
    const mouseOverEvent = document.createEvent('MouseEvents');
    mouseOverEvent.initMouseEvent(
      'mouseover',
      true,
      true,
      window,
      0,
      50,
      50,
      50,
      50,
      false,
      false,
      false,
      false,
      0,
      from,
    );
    to.dispatchEvent(mouseOverEvent);
  }
}

function dispatchClickEvent(target) {
  const mouseOutEvent = document.createEvent('MouseEvents');
  mouseOutEvent.initMouseEvent(
    'click',
    true,
    true,
    window,
    0,
    50,
    50,
    50,
    50,
    false,
    false,
    false,
    false,
    0,
    target,
  );
  return target.dispatchEvent(mouseOutEvent);
}

// TODO: There's currently no React DOM API to opt into Idle priority updates,
// and there's no native DOM event that maps to idle priority, so this is a
// temporary workaround. Need something like ReactDOM.unstable_IdleUpdates.
function TODO_scheduleIdleDOMSchedulerTask(fn) {
  ReactDOM.unstable_runWithPriority(IdleEventPriority, () => {
    const prevEvent = window.event;
    window.event = {type: 'message'};
    try {
      fn();
    } finally {
      window.event = prevEvent;
    }
  });
}

<<<<<<< HEAD
describe('ReactDOMServerSelectiveHydration', () => {
  beforeEach(() => {
    jest.resetModuleRegistry();
=======
function TODO_scheduleContinuousSchedulerTask(fn) {
  ReactDOM.unstable_runWithPriority(ContinuousEventPriority, () => {
    const prevEvent = window.event;
    window.event = {type: 'message'};
    try {
      fn();
    } finally {
      window.event = prevEvent;
    }
  });
}

describe('ReactDOMServerSelectiveHydration', () => {
  beforeEach(() => {
    jest.resetModules();
>>>>>>> remotes/upstream/main

    ReactFeatureFlags = require('shared/ReactFeatureFlags');
    ReactFeatureFlags.enableCreateEventHandleAPI = true;
    React = require('react');
    ReactDOM = require('react-dom');
    ReactDOMClient = require('react-dom/client');
    ReactDOMServer = require('react-dom/server');
<<<<<<< HEAD
    act = require('jest-react').act;
    Scheduler = require('scheduler');
    Suspense = React.Suspense;

    IdleEventPriority = require('react-reconciler/constants').IdleEventPriority;
=======
    act = require('internal-test-utils').act;
    Scheduler = require('scheduler');
    Suspense = React.Suspense;

    const InternalTestUtils = require('internal-test-utils');
    assertLog = InternalTestUtils.assertLog;
    waitForAll = InternalTestUtils.waitForAll;
    waitFor = InternalTestUtils.waitFor;
    waitForPaint = InternalTestUtils.waitForPaint;

    IdleEventPriority = require('react-reconciler/constants').IdleEventPriority;
    ContinuousEventPriority =
      require('react-reconciler/constants').ContinuousEventPriority;
>>>>>>> remotes/upstream/main
  });

  it('hydrates the target boundary synchronously during a click', async () => {
    function Child({text}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
=======
      Scheduler.log(text);
>>>>>>> remotes/upstream/main
      return (
        <span
          onClick={e => {
            e.preventDefault();
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Clicked ' + text);
=======
            Scheduler.log('Clicked ' + text);
>>>>>>> remotes/upstream/main
          }}>
          {text}
        </span>
      );
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child text="A" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="B" />
          </Suspense>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'A', 'B']);
=======
    assertLog(['App', 'A', 'B']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[1];

    ReactDOMClient.hydrateRoot(container, <App />);

    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    // This should synchronously hydrate the root App and the second suspense
    // boundary.
    const result = dispatchClickEvent(span);

    // The event should have been canceled because we called preventDefault.
    expect(result).toBe(false);

    // We rendered App, B and then invoked the event without rendering A.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'B', 'Clicked B']);

    // After continuing the scheduler, we finally hydrate A.
    expect(Scheduler).toFlushAndYield(['A']);
=======
    assertLog(['App', 'B', 'Clicked B']);

    // After continuing the scheduler, we finally hydrate A.
    await waitForAll(['A']);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  it('hydrates at higher pri if sync did not work first time', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    function Child({text}) {
      if ((text === 'A' || text === 'D') && suspend) {
        throw promise;
      }
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
=======
      Scheduler.log(text);
>>>>>>> remotes/upstream/main
      return (
        <span
          onClick={e => {
            e.preventDefault();
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Clicked ' + text);
=======
            Scheduler.log('Clicked ' + text);
>>>>>>> remotes/upstream/main
          }}>
          {text}
        </span>
      );
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child text="A" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="B" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="C" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="D" />
          </Suspense>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'A', 'B', 'C', 'D']);
=======
    assertLog(['App', 'A', 'B', 'C', 'D']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    container.innerHTML = finalHTML;

    const spanD = container.getElementsByTagName('span')[3];

    suspend = true;

    // A and D will be suspended. We'll click on D which should take
    // priority, after we unsuspend.
    ReactDOMClient.hydrateRoot(container, <App />);

    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);

    // This click target cannot be hydrated yet because it's suspended.
    await act(async () => {
      const result = dispatchClickEvent(spanD);
      expect(result).toBe(true);
    });
    expect(Scheduler).toHaveYielded([
=======
    assertLog([]);

    // This click target cannot be hydrated yet because it's suspended.
    await act(() => {
      const result = dispatchClickEvent(spanD);
      expect(result).toBe(true);
    });
    assertLog([
>>>>>>> remotes/upstream/main
      'App',
      // Continuing rendering will render B next.
      'B',
      'C',
    ]);

    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });

<<<<<<< HEAD
    if (
      gate(
        flags =>
          flags.enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay,
      )
    ) {
      expect(Scheduler).toHaveYielded(['D', 'A']);
    } else {
      // After the click, we should prioritize D and the Click first,
      // and only after that render A and C.
      expect(Scheduler).toHaveYielded(['D', 'Clicked D', 'A']);
    }
=======
    assertLog(['D', 'A']);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  it('hydrates at higher pri for secondary discrete events', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    function Child({text}) {
      if ((text === 'A' || text === 'D') && suspend) {
        throw promise;
      }
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
=======
      Scheduler.log(text);
>>>>>>> remotes/upstream/main
      return (
        <span
          onClick={e => {
            e.preventDefault();
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Clicked ' + text);
=======
            Scheduler.log('Clicked ' + text);
>>>>>>> remotes/upstream/main
          }}>
          {text}
        </span>
      );
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child text="A" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="B" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="C" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="D" />
          </Suspense>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'A', 'B', 'C', 'D']);
=======
    assertLog(['App', 'A', 'B', 'C', 'D']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    container.innerHTML = finalHTML;

    const spanA = container.getElementsByTagName('span')[0];
    const spanC = container.getElementsByTagName('span')[2];
    const spanD = container.getElementsByTagName('span')[3];

    suspend = true;

    // A and D will be suspended. We'll click on D which should take
    // priority, after we unsuspend.
    ReactDOMClient.hydrateRoot(container, <App />);

    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    // This click target cannot be hydrated yet because the first is Suspended.
    dispatchClickEvent(spanA);
    dispatchClickEvent(spanC);
    dispatchClickEvent(spanD);

<<<<<<< HEAD
    if (
      gate(
        flags =>
          flags.enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay,
      )
    ) {
      expect(Scheduler).toHaveYielded(['App', 'C', 'Clicked C']);
    } else {
      expect(Scheduler).toHaveYielded(['App']);
    }
=======
    assertLog(['App', 'C', 'Clicked C']);
>>>>>>> remotes/upstream/main

    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });

<<<<<<< HEAD
    if (
      ReactFeatureFlags.enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
    ) {
      expect(Scheduler).toHaveYielded([
        'A',
        'D',
        // B should render last since it wasn't clicked.
        'B',
      ]);
    } else {
      // We should prioritize hydrating A, C and D first since we clicked in
      // them. Only after they're done will we hydrate B.
      expect(Scheduler).toHaveYielded([
        'A',
        'Clicked A',
        'C',
        'Clicked C',
        'D',
        'Clicked D',
        // B should render last since it wasn't clicked.
        'B',
      ]);
    }
=======
    assertLog([
      'A',
      'D',
      // B should render last since it wasn't clicked.
      'B',
    ]);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  // @gate www
  it('hydrates the target boundary synchronously during a click (createEventHandle)', async () => {
    const setClick = ReactDOM.unstable_createEventHandle('click');
    let isServerRendering = true;

    function Child({text}) {
      const ref = React.useRef(null);
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
      if (!isServerRendering) {
        React.useLayoutEffect(() => {
          return setClick(ref.current, () => {
            Scheduler.unstable_yieldValue('Clicked ' + text);
=======
      Scheduler.log(text);
      if (!isServerRendering) {
        React.useLayoutEffect(() => {
          return setClick(ref.current, () => {
            Scheduler.log('Clicked ' + text);
>>>>>>> remotes/upstream/main
          });
        });
      }

      return <span ref={ref}>{text}</span>;
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child text="A" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="B" />
          </Suspense>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'A', 'B']);
=======
    assertLog(['App', 'A', 'B']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    container.innerHTML = finalHTML;

    isServerRendering = false;

    ReactDOMClient.hydrateRoot(container, <App />);

    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    const span = container.getElementsByTagName('span')[1];

    const target = createEventTarget(span);

    // This should synchronously hydrate the root App and the second suspense
    // boundary.
    target.virtualclick();

    // We rendered App, B and then invoked the event without rendering A.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'B', 'Clicked B']);

    // After continuing the scheduler, we finally hydrate A.
    expect(Scheduler).toFlushAndYield(['A']);
=======
    assertLog(['App', 'B', 'Clicked B']);

    // After continuing the scheduler, we finally hydrate A.
    await waitForAll(['A']);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  // @gate www
  it('hydrates at higher pri if sync did not work first time (createEventHandle)', async () => {
    let suspend = false;
    let isServerRendering = true;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const setClick = ReactDOM.unstable_createEventHandle('click');

    function Child({text}) {
      const ref = React.useRef(null);
      if ((text === 'A' || text === 'D') && suspend) {
        throw promise;
      }
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
=======
      Scheduler.log(text);
>>>>>>> remotes/upstream/main

      if (!isServerRendering) {
        React.useLayoutEffect(() => {
          return setClick(ref.current, () => {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Clicked ' + text);
=======
            Scheduler.log('Clicked ' + text);
>>>>>>> remotes/upstream/main
          });
        });
      }

      return <span ref={ref}>{text}</span>;
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child text="A" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="B" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="C" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="D" />
          </Suspense>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'A', 'B', 'C', 'D']);
=======
    assertLog(['App', 'A', 'B', 'C', 'D']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    container.innerHTML = finalHTML;

    const spanD = container.getElementsByTagName('span')[3];

    suspend = true;
    isServerRendering = false;

    // A and D will be suspended. We'll click on D which should take
    // priority, after we unsuspend.
    ReactDOMClient.hydrateRoot(container, <App />);

    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);

    // Continuing rendering will render B next.
    await act(async () => {
      const target = createEventTarget(spanD);
      target.virtualclick();
    });
    expect(Scheduler).toHaveYielded(['App', 'B', 'C']);
=======
    assertLog([]);

    // Continuing rendering will render B next.
    await act(() => {
      const target = createEventTarget(spanD);
      target.virtualclick();
    });
    assertLog(['App', 'B', 'C']);
>>>>>>> remotes/upstream/main

    // After the click, we should prioritize D and the Click first,
    // and only after that render A and C.
    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });
<<<<<<< HEAD
    if (
      gate(
        flags =>
          flags.enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay,
      )
    ) {
      // no replay
      expect(Scheduler).toHaveYielded(['D', 'A']);
    } else {
      expect(Scheduler).toHaveYielded(['D', 'Clicked D', 'A']);
    }
=======

    // no replay
    assertLog(['D', 'A']);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  // @gate www
  it('hydrates at higher pri for secondary discrete events (createEventHandle)', async () => {
    const setClick = ReactDOM.unstable_createEventHandle('click');
    let suspend = false;
    let isServerRendering = true;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    function Child({text}) {
      const ref = React.useRef(null);
      if ((text === 'A' || text === 'D') && suspend) {
        throw promise;
      }
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
=======
      Scheduler.log(text);
>>>>>>> remotes/upstream/main

      if (!isServerRendering) {
        React.useLayoutEffect(() => {
          return setClick(ref.current, () => {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Clicked ' + text);
=======
            Scheduler.log('Clicked ' + text);
>>>>>>> remotes/upstream/main
          });
        });
      }
      return <span ref={ref}>{text}</span>;
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child text="A" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="B" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="C" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="D" />
          </Suspense>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'A', 'B', 'C', 'D']);
=======
    assertLog(['App', 'A', 'B', 'C', 'D']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    container.innerHTML = finalHTML;

    const spanA = container.getElementsByTagName('span')[0];
    const spanC = container.getElementsByTagName('span')[2];
    const spanD = container.getElementsByTagName('span')[3];

    suspend = true;
    isServerRendering = false;

    // A and D will be suspended. We'll click on D which should take
    // priority, after we unsuspend.
    ReactDOMClient.hydrateRoot(container, <App />);

    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    // This click target cannot be hydrated yet because the first is Suspended.
    createEventTarget(spanA).virtualclick();
    createEventTarget(spanC).virtualclick();
    createEventTarget(spanD).virtualclick();

<<<<<<< HEAD
    if (
      ReactFeatureFlags.enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
    ) {
      expect(Scheduler).toHaveYielded(['App', 'C', 'Clicked C']);
    } else {
      expect(Scheduler).toHaveYielded(['App']);
    }
=======
    assertLog(['App', 'C', 'Clicked C']);

>>>>>>> remotes/upstream/main
    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });

<<<<<<< HEAD
    if (
      ReactFeatureFlags.enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
    ) {
      expect(Scheduler).toHaveYielded([
        'A',
        'D',
        // B should render last since it wasn't clicked.
        'B',
      ]);
    } else {
      // We should prioritize hydrating A, C and D first since we clicked in
      // them. Only after they're done will we hydrate B.
      expect(Scheduler).toHaveYielded([
        'A',
        'Clicked A',
        'C',
        'Clicked C',
        'D',
        'Clicked D',
        // B should render last since it wasn't clicked.
        'B',
      ]);
    }
=======
    assertLog([
      'A',
      'D',
      // B should render last since it wasn't clicked.
      'B',
    ]);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  it('hydrates the hovered targets as higher priority for continuous events', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    function Child({text}) {
      if ((text === 'A' || text === 'D') && suspend) {
        throw promise;
      }
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
=======
      Scheduler.log(text);
>>>>>>> remotes/upstream/main
      return (
        <span
          onClick={e => {
            e.preventDefault();
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Clicked ' + text);
          }}
          onMouseEnter={e => {
            e.preventDefault();
            Scheduler.unstable_yieldValue('Hover ' + text);
=======
            Scheduler.log('Clicked ' + text);
          }}
          onMouseEnter={e => {
            e.preventDefault();
            Scheduler.log('Hover ' + text);
>>>>>>> remotes/upstream/main
          }}>
          {text}
        </span>
      );
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child text="A" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="B" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="C" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="D" />
          </Suspense>
        </div>
      );
    }
    const finalHTML = ReactDOMServer.renderToString(<App />);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'A', 'B', 'C', 'D']);
=======
    assertLog(['App', 'A', 'B', 'C', 'D']);
>>>>>>> remotes/upstream/main
    const container = document.createElement('div');
    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    container.innerHTML = finalHTML;

    const spanB = container.getElementsByTagName('span')[1];
    const spanC = container.getElementsByTagName('span')[2];
    const spanD = container.getElementsByTagName('span')[3];

    suspend = true;

    // A and D will be suspended. We'll click on D which should take
    // priority, after we unsuspend.
    ReactDOMClient.hydrateRoot(container, <App />);

    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
    // Click D
    dispatchMouseHoverEvent(spanD, null);
    dispatchClickEvent(spanD);
    // Hover over B and then C.
    dispatchMouseHoverEvent(spanB, spanD);
    dispatchMouseHoverEvent(spanC, spanB);
    expect(Scheduler).toHaveYielded(['App']);
    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });
    if (
      gate(
        flags =>
          flags.enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay,
      )
    ) {
      // We should prioritize hydrating D first because we clicked it.
      // but event isnt replayed
      expect(Scheduler).toHaveYielded([
        'D',
        'B', // Ideally this should be later.
        'C',
        'Hover C',
        'A',
      ]);
    } else {
      // We should prioritize hydrating D first because we clicked it.
      // Next we should hydrate C since that's the current hover target.
      // To simplify implementation details we hydrate both B and C at
      // the same time since B was already scheduled.
      // This is ok because it will at least not continue for nested
      // boundary. See the next test below.
      expect(Scheduler).toHaveYielded([
        'D',
        'Clicked D',
        'B', // Ideally this should be later.
        'C',
        'Hover C',
        'A',
      ]);
    }
=======
    assertLog([]);

    await act(() => {
      // Click D
      dispatchMouseHoverEvent(spanD, null);
      dispatchClickEvent(spanD);

      // Hover over B and then C.
      dispatchMouseHoverEvent(spanB, spanD);
      dispatchMouseHoverEvent(spanC, spanB);

      assertLog(['App']);

      suspend = false;
      resolve();
    });

    // We should prioritize hydrating D first because we clicked it.
    // but event isnt replayed
    assertLog([
      'D',
      'B', // Ideally this should be later.
      'C',
      'Hover C',
      'A',
    ]);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  it('replays capture phase for continuous events and respects stopPropagation', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    function Child({text}) {
      if ((text === 'A' || text === 'D') && suspend) {
        throw promise;
      }
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
=======
      Scheduler.log(text);
>>>>>>> remotes/upstream/main
      return (
        <span
          id={text}
          onClickCapture={e => {
            e.preventDefault();
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Capture Clicked ' + text);
          }}
          onClick={e => {
            e.preventDefault();
            Scheduler.unstable_yieldValue('Clicked ' + text);
          }}
          onMouseEnter={e => {
            e.preventDefault();
            Scheduler.unstable_yieldValue('Mouse Enter ' + text);
          }}
          onMouseOut={e => {
            e.preventDefault();
            Scheduler.unstable_yieldValue('Mouse Out ' + text);
=======
            Scheduler.log('Capture Clicked ' + text);
          }}
          onClick={e => {
            e.preventDefault();
            Scheduler.log('Clicked ' + text);
          }}
          onMouseEnter={e => {
            e.preventDefault();
            Scheduler.log('Mouse Enter ' + text);
          }}
          onMouseOut={e => {
            e.preventDefault();
            Scheduler.log('Mouse Out ' + text);
>>>>>>> remotes/upstream/main
          }}
          onMouseOutCapture={e => {
            e.preventDefault();
            e.stopPropagation();
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Mouse Out Capture ' + text);
=======
            Scheduler.log('Mouse Out Capture ' + text);
>>>>>>> remotes/upstream/main
          }}
          onMouseOverCapture={e => {
            e.preventDefault();
            e.stopPropagation();
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Mouse Over Capture ' + text);
          }}
          onMouseOver={e => {
            e.preventDefault();
            Scheduler.unstable_yieldValue('Mouse Over ' + text);
=======
            Scheduler.log('Mouse Over Capture ' + text);
          }}
          onMouseOver={e => {
            e.preventDefault();
            Scheduler.log('Mouse Over ' + text);
>>>>>>> remotes/upstream/main
          }}>
          <div
            onMouseOverCapture={e => {
              e.preventDefault();
<<<<<<< HEAD
              Scheduler.unstable_yieldValue('Mouse Over Capture Inner ' + text);
=======
              Scheduler.log('Mouse Over Capture Inner ' + text);
>>>>>>> remotes/upstream/main
            }}>
            {text}
          </div>
        </span>
      );
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div
          onClickCapture={e => {
            e.preventDefault();
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Capture Clicked Parent');
          }}
          onMouseOverCapture={e => {
            Scheduler.unstable_yieldValue('Mouse Over Capture Parent');
=======
            Scheduler.log('Capture Clicked Parent');
          }}
          onMouseOverCapture={e => {
            Scheduler.log('Mouse Over Capture Parent');
>>>>>>> remotes/upstream/main
          }}>
          <Suspense fallback="Loading...">
            <Child text="A" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="B" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="C" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="D" />
          </Suspense>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'A', 'B', 'C', 'D']);
=======
    assertLog(['App', 'A', 'B', 'C', 'D']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    container.innerHTML = finalHTML;

    const spanB = document.getElementById('B').firstChild;
    const spanC = document.getElementById('C').firstChild;
    const spanD = document.getElementById('D').firstChild;

    suspend = true;

    // A and D will be suspended. We'll click on D which should take
    // priority, after we unsuspend.
    ReactDOMClient.hydrateRoot(container, <App />);

    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);

    // Click D
    dispatchMouseHoverEvent(spanD, null);
    dispatchClickEvent(spanD);
    // Hover over B and then C.
    dispatchMouseHoverEvent(spanB, spanD);
    dispatchMouseHoverEvent(spanC, spanB);

    expect(Scheduler).toHaveYielded(['App']);

    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });

    if (
      gate(
        flags =>
          flags.enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay,
      )
    ) {
      // We should prioritize hydrating D first because we clicked it.
      // but event isnt replayed
      expect(Scheduler).toHaveYielded([
        'D',
        'B', // Ideally this should be later.
        'C',
        // Mouse out events aren't replayed
        // 'Mouse Out Capture B',
        // 'Mouse Out B',
        'Mouse Over Capture Parent',
        'Mouse Over Capture C',
        // Stop propagation stops these
        // 'Mouse Over Capture Inner C',
        // 'Mouse Over C',
        'A',
      ]);
    } else {
      // We should prioritize hydrating D first because we clicked it.
      // Next we should hydrate C since that's the current hover target.
      // To simplify implementation details we hydrate both B and C at
      // the same time since B was already scheduled.
      // This is ok because it will at least not continue for nested
      // boundary. See the next test below.
      expect(Scheduler).toHaveYielded([
        'D',
        'Clicked D',
        'B', // Ideally this should be later.
        'C',
        // Capture phase isn't replayed
        // Mouseout isn't replayed
        'Mouse Over C',
        'Mouse Enter C',
        'A',
      ]);
    }
=======
    assertLog([]);

    await act(async () => {
      // Click D
      dispatchMouseHoverEvent(spanD, null);
      dispatchClickEvent(spanD);
      // Hover over B and then C.
      dispatchMouseHoverEvent(spanB, spanD);
      dispatchMouseHoverEvent(spanC, spanB);

      assertLog(['App']);

      suspend = false;
      resolve();
    });

    // We should prioritize hydrating D first because we clicked it.
    // but event isnt replayed
    assertLog([
      'D',
      'B', // Ideally this should be later.
      'C',
      // Mouse out events aren't replayed
      // 'Mouse Out Capture B',
      // 'Mouse Out B',
      'Mouse Over Capture Parent',
      'Mouse Over Capture C',
      // Stop propagation stops these
      // 'Mouse Over Capture Inner C',
      // 'Mouse Over C',
      'A',
    ]);
>>>>>>> remotes/upstream/main

    // This test shows existing quirk where stopPropagation on mouseout
    // prevents mouseEnter from firing
    dispatchMouseHoverEvent(spanC, spanB);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'Mouse Out Capture B',
      // stopPropagation stops these
      // 'Mouse Out B',
      // 'Mouse Enter C',
      'Mouse Over Capture Parent',
      'Mouse Over Capture C',
      // Stop propagation stops these
      // 'Mouse Over Capture Inner C',
      // 'Mouse Over C',
    ]);

    document.body.removeChild(container);
  });

  describe('can handle replaying events as part of multiple instances of React', () => {
    let resolveInner;
    let resolveOuter;
    let innerPromise;
    let outerPromise;
    let OuterScheduler;
    let InnerScheduler;
    let innerDiv;

<<<<<<< HEAD
    beforeEach(async () => {
      document.body.innerHTML = '';
      jest.resetModuleRegistry();
      let OuterReactDOMClient;
      let InnerReactDOMClient;
      jest.isolateModules(() => {
        OuterReactDOMClient = require('react-dom/client');
        OuterScheduler = require('scheduler');
=======
    let OuterTestUtils;
    let InnerTestUtils;

    beforeEach(async () => {
      document.body.innerHTML = '';
      jest.resetModules();
      let OuterReactDOMClient;
      let InnerReactDOMClient;

      jest.isolateModules(() => {
        OuterReactDOMClient = require('react-dom/client');
        OuterScheduler = require('scheduler');
        OuterTestUtils = require('internal-test-utils');
>>>>>>> remotes/upstream/main
      });
      jest.isolateModules(() => {
        InnerReactDOMClient = require('react-dom/client');
        InnerScheduler = require('scheduler');
<<<<<<< HEAD
=======
        InnerTestUtils = require('internal-test-utils');
>>>>>>> remotes/upstream/main
      });

      expect(OuterReactDOMClient).not.toBe(InnerReactDOMClient);
      expect(OuterScheduler).not.toBe(InnerScheduler);

      const outerContainer = document.createElement('div');
      const innerContainer = document.createElement('div');

      let suspendOuter = false;
      outerPromise = new Promise(res => {
        resolveOuter = () => {
          suspendOuter = false;
          res();
        };
      });

      function Outer() {
        if (suspendOuter) {
<<<<<<< HEAD
          OuterScheduler.unstable_yieldValue('Suspend Outer');
          throw outerPromise;
        }
        OuterScheduler.unstable_yieldValue('Outer');
=======
          OuterScheduler.log('Suspend Outer');
          throw outerPromise;
        }
        OuterScheduler.log('Outer');
>>>>>>> remotes/upstream/main
        const innerRoot = outerContainer.querySelector('#inner-root');
        return (
          <div
            id="inner-root"
            onMouseEnter={() => {
<<<<<<< HEAD
              Scheduler.unstable_yieldValue('Outer Mouse Enter');
=======
              Scheduler.log('Outer Mouse Enter');
>>>>>>> remotes/upstream/main
            }}
            dangerouslySetInnerHTML={{
              __html: innerRoot ? innerRoot.innerHTML : '',
            }}
          />
        );
      }
      const OuterApp = () => {
        return (
          <Suspense fallback={<div>Loading</div>}>
            <Outer />
          </Suspense>
        );
      };

      let suspendInner = false;
      innerPromise = new Promise(res => {
        resolveInner = () => {
          suspendInner = false;
          res();
        };
      });
      function Inner() {
        if (suspendInner) {
<<<<<<< HEAD
          InnerScheduler.unstable_yieldValue('Suspend Inner');
          throw innerPromise;
        }
        InnerScheduler.unstable_yieldValue('Inner');
=======
          InnerScheduler.log('Suspend Inner');
          throw innerPromise;
        }
        InnerScheduler.log('Inner');
>>>>>>> remotes/upstream/main
        return (
          <div
            id="inner"
            onMouseEnter={() => {
<<<<<<< HEAD
              Scheduler.unstable_yieldValue('Inner Mouse Enter');
=======
              Scheduler.log('Inner Mouse Enter');
>>>>>>> remotes/upstream/main
            }}
          />
        );
      }
      const InnerApp = () => {
        return (
          <Suspense fallback={<div>Loading</div>}>
            <Inner />
          </Suspense>
        );
      };

      document.body.appendChild(outerContainer);
      const outerHTML = ReactDOMServer.renderToString(<OuterApp />);
      outerContainer.innerHTML = outerHTML;

      const innerWrapper = document.querySelector('#inner-root');
      innerWrapper.appendChild(innerContainer);
      const innerHTML = ReactDOMServer.renderToString(<InnerApp />);
      innerContainer.innerHTML = innerHTML;

<<<<<<< HEAD
      expect(OuterScheduler).toHaveYielded(['Outer']);
      expect(InnerScheduler).toHaveYielded(['Inner']);
=======
      OuterTestUtils.assertLog(['Outer']);
      InnerTestUtils.assertLog(['Inner']);
>>>>>>> remotes/upstream/main

      suspendOuter = true;
      suspendInner = true;

<<<<<<< HEAD
      OuterReactDOMClient.hydrateRoot(outerContainer, <OuterApp />);
      InnerReactDOMClient.hydrateRoot(innerContainer, <InnerApp />);

      expect(OuterScheduler).toFlushAndYield(['Suspend Outer']);
      expect(InnerScheduler).toFlushAndYield(['Suspend Inner']);
=======
      await OuterTestUtils.act(() =>
        OuterReactDOMClient.hydrateRoot(outerContainer, <OuterApp />),
      );
      await InnerTestUtils.act(() =>
        InnerReactDOMClient.hydrateRoot(innerContainer, <InnerApp />),
      );

      OuterTestUtils.assertLog(['Suspend Outer']);
      InnerTestUtils.assertLog(['Suspend Inner']);
>>>>>>> remotes/upstream/main

      innerDiv = document.querySelector('#inner');

      dispatchClickEvent(innerDiv);

<<<<<<< HEAD
      await act(async () => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        jest.runAllTimers();
        Scheduler.unstable_flushAllWithoutAsserting();
        OuterScheduler.unstable_flushAllWithoutAsserting();
        InnerScheduler.unstable_flushAllWithoutAsserting();
      });

<<<<<<< HEAD
      expect(OuterScheduler).toHaveYielded(['Suspend Outer']);
      if (
        gate(
          flags =>
            flags.enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay,
        )
      ) {
        // InnerApp doesn't see the event because OuterApp calls stopPropagation in
        // capture phase since the event is blocked on suspended component
        expect(InnerScheduler).toHaveYielded([]);
      } else {
        // no stopPropagation
        expect(InnerScheduler).toHaveYielded(['Suspend Inner']);
      }

      expect(Scheduler).toHaveYielded([]);
=======
      OuterTestUtils.assertLog(['Suspend Outer']);

      // InnerApp doesn't see the event because OuterApp calls stopPropagation in
      // capture phase since the event is blocked on suspended component
      InnerTestUtils.assertLog([]);

      assertLog([]);
>>>>>>> remotes/upstream/main
    });
    afterEach(async () => {
      document.body.innerHTML = '';
    });

<<<<<<< HEAD
    // @gate enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
    it('Inner hydrates first then Outer', async () => {
      dispatchMouseHoverEvent(innerDiv);

      await act(async () => {
        resolveInner();
        await innerPromise;
        jest.runAllTimers();
        Scheduler.unstable_flushAllWithoutAsserting();
        OuterScheduler.unstable_flushAllWithoutAsserting();
        InnerScheduler.unstable_flushAllWithoutAsserting();
      });

      expect(OuterScheduler).toHaveYielded(['Suspend Outer']);
      // Inner App renders because it is unblocked
      expect(InnerScheduler).toHaveYielded(['Inner']);
      // No event is replayed yet
      expect(Scheduler).toHaveYielded([]);

      dispatchMouseHoverEvent(innerDiv);
      expect(OuterScheduler).toHaveYielded([]);
      expect(InnerScheduler).toHaveYielded([]);
      // No event is replayed yet
      expect(Scheduler).toHaveYielded([]);

      await act(async () => {
        resolveOuter();
        await outerPromise;
        jest.runAllTimers();
        Scheduler.unstable_flushAllWithoutAsserting();
        OuterScheduler.unstable_flushAllWithoutAsserting();
        InnerScheduler.unstable_flushAllWithoutAsserting();
      });

      // Nothing happens to inner app yet.
      // Its blocked on the outer app replaying the event
      expect(InnerScheduler).toHaveYielded([]);
      // Outer hydrates and schedules Replay
      expect(OuterScheduler).toHaveYielded(['Outer']);
      // No event is replayed yet
      expect(Scheduler).toHaveYielded([]);

      // fire scheduled Replay
      await act(async () => {
        jest.runAllTimers();
        Scheduler.unstable_flushAllWithoutAsserting();
        OuterScheduler.unstable_flushAllWithoutAsserting();
        InnerScheduler.unstable_flushAllWithoutAsserting();
      });

      // First Inner Mouse Enter fires then Outer Mouse Enter
      expect(Scheduler).toHaveYielded([
        'Inner Mouse Enter',
        'Outer Mouse Enter',
      ]);
    });

    // @gate enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
=======
    it('Inner hydrates first then Outer', async () => {
      dispatchMouseHoverEvent(innerDiv);

      await InnerTestUtils.act(async () => {
        await OuterTestUtils.act(() => {
          resolveInner();
        });
      });

      OuterTestUtils.assertLog(['Suspend Outer']);
      // Inner App renders because it is unblocked
      InnerTestUtils.assertLog(['Inner']);
      // No event is replayed yet
      assertLog([]);

      dispatchMouseHoverEvent(innerDiv);
      OuterTestUtils.assertLog([]);
      InnerTestUtils.assertLog([]);
      // No event is replayed yet
      assertLog([]);

      await InnerTestUtils.act(async () => {
        await OuterTestUtils.act(() => {
          resolveOuter();

          // Nothing happens to inner app yet.
          // Its blocked on the outer app replaying the event
          InnerTestUtils.assertLog([]);
          // Outer hydrates and schedules Replay
          OuterTestUtils.waitFor(['Outer']);
          // No event is replayed yet
          assertLog([]);
        });
      });

      // fire scheduled Replay

      // First Inner Mouse Enter fires then Outer Mouse Enter
      assertLog(['Inner Mouse Enter', 'Outer Mouse Enter']);
    });

>>>>>>> remotes/upstream/main
    it('Outer hydrates first then Inner', async () => {
      dispatchMouseHoverEvent(innerDiv);

      await act(async () => {
        resolveOuter();
        await outerPromise;
        Scheduler.unstable_flushAllWithoutAsserting();
        OuterScheduler.unstable_flushAllWithoutAsserting();
        InnerScheduler.unstable_flushAllWithoutAsserting();
      });

      // Outer resolves and scheduled replay
<<<<<<< HEAD
      expect(OuterScheduler).toHaveYielded(['Outer']);
      // Inner App is still blocked
      expect(InnerScheduler).toHaveYielded([]);

      // Replay outer event
      await act(async () => {
=======
      OuterTestUtils.assertLog(['Outer']);
      // Inner App is still blocked
      InnerTestUtils.assertLog([]);

      // Replay outer event
      await act(() => {
>>>>>>> remotes/upstream/main
        Scheduler.unstable_flushAllWithoutAsserting();
        OuterScheduler.unstable_flushAllWithoutAsserting();
        InnerScheduler.unstable_flushAllWithoutAsserting();
      });

      // Inner is still blocked so when Outer replays the event in capture phase
      // inner ends up caling stopPropagation
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([]);
      expect(OuterScheduler).toHaveYielded([]);
      expect(InnerScheduler).toHaveYielded(['Suspend Inner']);

      dispatchMouseHoverEvent(innerDiv);
      expect(OuterScheduler).toHaveYielded([]);
      expect(InnerScheduler).toHaveYielded([]);
      expect(Scheduler).toHaveYielded([]);
=======
      assertLog([]);
      OuterTestUtils.assertLog([]);
      InnerTestUtils.assertLog(['Suspend Inner']);

      dispatchMouseHoverEvent(innerDiv);
      OuterTestUtils.assertLog([]);
      InnerTestUtils.assertLog([]);
      assertLog([]);
>>>>>>> remotes/upstream/main

      await act(async () => {
        resolveInner();
        await innerPromise;
        Scheduler.unstable_flushAllWithoutAsserting();
        OuterScheduler.unstable_flushAllWithoutAsserting();
        InnerScheduler.unstable_flushAllWithoutAsserting();
      });

      // Inner hydrates
<<<<<<< HEAD
      expect(InnerScheduler).toHaveYielded(['Inner']);
      // Outer was hydrated earlier
      expect(OuterScheduler).toHaveYielded([]);

      await act(async () => {
=======
      InnerTestUtils.assertLog(['Inner']);
      // Outer was hydrated earlier
      OuterTestUtils.assertLog([]);

      await act(() => {
>>>>>>> remotes/upstream/main
        Scheduler.unstable_flushAllWithoutAsserting();
        OuterScheduler.unstable_flushAllWithoutAsserting();
        InnerScheduler.unstable_flushAllWithoutAsserting();
      });

      // First Inner Mouse Enter fires then Outer Mouse Enter
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Inner Mouse Enter',
        'Outer Mouse Enter',
      ]);
    });
  });

  // @gate enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
=======
      assertLog(['Inner Mouse Enter', 'Outer Mouse Enter']);
    });
  });

>>>>>>> remotes/upstream/main
  it('replays event with null target when tree is dismounted', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => {
      resolve = () => {
        suspend = false;
        resolvePromise();
      };
    });

    function Child() {
      if (suspend) {
        throw promise;
      }
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Child');
      return (
        <div
          onMouseOver={() => {
            Scheduler.unstable_yieldValue('on mouse over');
=======
      Scheduler.log('Child');
      return (
        <div
          onMouseOver={() => {
            Scheduler.log('on mouse over');
>>>>>>> remotes/upstream/main
          }}>
          Child
        </div>
      );
    }

    function App() {
      return (
        <Suspense>
          <Child />
        </Suspense>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Child']);
=======
    assertLog(['Child']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');

    document.body.appendChild(container);
    container.innerHTML = finalHTML;
    suspend = true;

    ReactDOMClient.hydrateRoot(container, <App />);

    const childDiv = container.firstElementChild;
<<<<<<< HEAD
    dispatchMouseHoverEvent(childDiv);

    // Not hydrated so event is saved for replay and stopPropagation is called
    expect(Scheduler).toHaveYielded([]);

    resolve();
    Scheduler.unstable_flushNumberOfYields(1);
    expect(Scheduler).toHaveYielded(['Child']);

    Scheduler.unstable_scheduleCallback(
      Scheduler.unstable_ImmediatePriority,
      () => {
=======

    await act(async () => {
      dispatchMouseHoverEvent(childDiv);

      // Not hydrated so event is saved for replay and stopPropagation is called
      assertLog([]);

      resolve();
      await waitFor(['Child']);

      ReactDOM.flushSync(() => {
>>>>>>> remotes/upstream/main
        container.removeChild(childDiv);

        const container2 = document.createElement('div');
        container2.addEventListener('mouseover', () => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('container2 mouse over');
        });
        container2.appendChild(childDiv);
      },
    );
    Scheduler.unstable_flushAllWithoutAsserting();

    // Even though the tree is remove the event is still dispatched with native event handler
    // on the container firing.
    expect(Scheduler).toHaveYielded(['container2 mouse over']);
=======
          Scheduler.log('container2 mouse over');
        });
        container2.appendChild(childDiv);
      });
    });

    // Even though the tree is remove the event is still dispatched with native event handler
    // on the container firing.
    assertLog(['container2 mouse over']);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  it('hydrates the last target path first for continuous events', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    function Child({text}) {
      if ((text === 'A' || text === 'D') && suspend) {
        throw promise;
      }
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
=======
      Scheduler.log(text);
>>>>>>> remotes/upstream/main
      return (
        <span
          onMouseEnter={e => {
            e.preventDefault();
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Hover ' + text);
=======
            Scheduler.log('Hover ' + text);
>>>>>>> remotes/upstream/main
          }}>
          {text}
        </span>
      );
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child text="A" />
          </Suspense>
          <Suspense fallback="Loading...">
            <div>
              <Suspense fallback="Loading...">
                <Child text="B" />
              </Suspense>
            </div>
            <Child text="C" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="D" />
          </Suspense>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'A', 'B', 'C', 'D']);
=======
    assertLog(['App', 'A', 'B', 'C', 'D']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    container.innerHTML = finalHTML;

    const spanB = container.getElementsByTagName('span')[1];
    const spanC = container.getElementsByTagName('span')[2];
    const spanD = container.getElementsByTagName('span')[3];

    suspend = true;

    // A and D will be suspended. We'll click on D which should take
    // priority, after we unsuspend.
    ReactDOMClient.hydrateRoot(container, <App />);

    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    // Hover over B and then C.
    dispatchMouseHoverEvent(spanB, spanD);
    dispatchMouseHoverEvent(spanC, spanB);

    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });

    // We should prioritize hydrating D first because we clicked it.
    // Next we should hydrate C since that's the current hover target.
    // Next it doesn't matter if we hydrate A or B first but as an
    // implementation detail we're currently hydrating B first since
    // we at one point hovered over it and we never deprioritized it.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'C', 'Hover C', 'A', 'B', 'D']);
=======
    assertLog(['App', 'C', 'Hover C', 'A', 'B', 'D']);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  it('hydrates the last explicitly hydrated target at higher priority', async () => {
    function Child({text}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
=======
      Scheduler.log(text);
>>>>>>> remotes/upstream/main
      return <span>{text}</span>;
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child text="A" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="B" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="C" />
          </Suspense>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'A', 'B', 'C']);
=======
    assertLog(['App', 'A', 'B', 'C']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const spanB = container.getElementsByTagName('span')[1];
    const spanC = container.getElementsByTagName('span')[2];

    const root = ReactDOMClient.hydrateRoot(container, <App />);

    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    // Increase priority of B and then C.
    root.unstable_scheduleHydration(spanB);
    root.unstable_scheduleHydration(spanC);

    // We should prioritize hydrating C first because the last added
    // gets highest priority followed by the next added.
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['App', 'C', 'B', 'A']);
=======
    await waitForAll(['App', 'C', 'B', 'A']);
>>>>>>> remotes/upstream/main
  });

  // @gate experimental || www
  it('hydrates before an update even if hydration moves away from it', async () => {
    function Child({text}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
      return <span>{text}</span>;
    }
    const ChildWithBoundary = React.memo(function({text}) {
=======
      Scheduler.log(text);
      return <span>{text}</span>;
    }
    const ChildWithBoundary = React.memo(function ({text}) {
>>>>>>> remotes/upstream/main
      return (
        <Suspense fallback="Loading...">
          <Child text={text} />
          <Child text={text.toLowerCase()} />
        </Suspense>
      );
    });

    function App({a}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
      React.useEffect(() => {
        Scheduler.unstable_yieldValue('Commit');
=======
      Scheduler.log('App');
      React.useEffect(() => {
        Scheduler.log('Commit');
>>>>>>> remotes/upstream/main
      });
      return (
        <div>
          <ChildWithBoundary text={a} />
          <ChildWithBoundary text="B" />
          <ChildWithBoundary text="C" />
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App a="A" />);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'A', 'a', 'B', 'b', 'C', 'c']);
=======
    assertLog(['App', 'A', 'a', 'B', 'b', 'C', 'c']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    const spanA = container.getElementsByTagName('span')[0];
    const spanB = container.getElementsByTagName('span')[2];
    const spanC = container.getElementsByTagName('span')[4];

<<<<<<< HEAD
    act(() => {
      const root = ReactDOMClient.hydrateRoot(container, <App a="A" />);
      // Hydrate the shell.
      expect(Scheduler).toFlushAndYieldThrough(['App', 'Commit']);
=======
    await act(async () => {
      const root = ReactDOMClient.hydrateRoot(container, <App a="A" />);
      // Hydrate the shell.
      await waitFor(['App', 'Commit']);
>>>>>>> remotes/upstream/main

      // Render an update at Idle priority that needs to update A.

      TODO_scheduleIdleDOMSchedulerTask(() => {
        root.render(<App a="AA" />);
      });

      // Start rendering. This will force the first boundary to hydrate
      // by scheduling it at one higher pri than Idle.
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYieldThrough([
        // An update was scheduled to force hydrate the boundary, but React will
        // continue rendering at Idle until the next time React yields. This is
        // fine though because it will switch to the hydration level when it
        // re-enters the work loop.
        'App',
        'AA',
=======
      await waitFor([
        'App',

        // Start hydrating A
        'A',
>>>>>>> remotes/upstream/main
      ]);

      // Hover over A which (could) schedule at one higher pri than Idle.
      dispatchMouseHoverEvent(spanA, null);

      // Before, we're done we now switch to hover over B.
      // This is meant to test that this doesn't cause us to forget that
      // we still have to hydrate A. The first boundary.
      // This also tests that we don't do the -1 down-prioritization of
      // continuous hover events because that would decrease its priority
      // to Idle.
      dispatchMouseHoverEvent(spanB, spanA);

      // Also click C to prioritize that even higher which resets the
      // priority levels.
      dispatchClickEvent(spanC);

<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        // Hydrate C first since we clicked it.
        'C',
        'c',
      ]);

<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        // Finish hydration of A since we forced it to hydrate.
        'A',
        'a',
        // Also, hydrate B since we hovered over it.
        // It's not important which one comes first. A or B.
        // As long as they both happen before the Idle update.
        'B',
        'b',
        // Begin the Idle update again.
        'App',
        'AA',
        'aa',
        'Commit',
      ]);
    });

    const spanA2 = container.getElementsByTagName('span')[0];
    // This is supposed to have been hydrated, not replaced.
    expect(spanA).toBe(spanA2);

    document.body.removeChild(container);
  });

<<<<<<< HEAD
  // @gate enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
  it('fires capture event handlers and native events if content is hydratable during discrete event', async () => {
    spyOnDev(console, 'error');
    function Child({text}) {
      Scheduler.unstable_yieldValue(text);
=======
  it('fires capture event handlers and native events if content is hydratable during discrete event', async () => {
    spyOnDev(console, 'error');
    function Child({text}) {
      Scheduler.log(text);
>>>>>>> remotes/upstream/main
      const ref = React.useRef();
      React.useLayoutEffect(() => {
        if (!ref.current) {
          return;
        }
        ref.current.onclick = () => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Native Click ' + text);
=======
          Scheduler.log('Native Click ' + text);
>>>>>>> remotes/upstream/main
        };
      }, [text]);
      return (
        <span
          ref={ref}
          onClickCapture={() => {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Capture Clicked ' + text);
          }}
          onClick={e => {
            Scheduler.unstable_yieldValue('Clicked ' + text);
=======
            Scheduler.log('Capture Clicked ' + text);
          }}
          onClick={e => {
            Scheduler.log('Clicked ' + text);
>>>>>>> remotes/upstream/main
          }}>
          {text}
        </span>
      );
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child text="A" />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child text="B" />
          </Suspense>
        </div>
      );
    }

<<<<<<< HEAD
    let finalHTML;
    expect(() => {
      finalHTML = ReactDOMServer.renderToString(<App />);
    }).toErrorDev([
      'useLayoutEffect does nothing on the server',
      'useLayoutEffect does nothing on the server',
    ]);

    expect(Scheduler).toHaveYielded(['App', 'A', 'B']);
=======
    const finalHTML = ReactDOMServer.renderToString(<App />);

    assertLog(['App', 'A', 'B']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[1];

    ReactDOMClient.hydrateRoot(container, <App />);

    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    // This should synchronously hydrate the root App and the second suspense
    // boundary.
    dispatchClickEvent(span);

    // We rendered App, B and then invoked the event without rendering A.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      'App',
      'B',
      'Capture Clicked B',
      'Native Click B',
      'Clicked B',
    ]);

    // After continuing the scheduler, we finally hydrate A.
    expect(Scheduler).toFlushAndYield(['A']);
=======
    assertLog(['App', 'B', 'Capture Clicked B', 'Native Click B', 'Clicked B']);

    // After continuing the scheduler, we finally hydrate A.
    await waitForAll(['A']);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

<<<<<<< HEAD
  // @gate enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
=======
>>>>>>> remotes/upstream/main
  it('does not propagate discrete event if it cannot be synchronously hydrated', async () => {
    let triggeredParent = false;
    let triggeredChild = false;
    let suspend = false;
    const promise = new Promise(() => {});
    function Child() {
      if (suspend) {
        throw promise;
      }
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Child');
=======
      Scheduler.log('Child');
>>>>>>> remotes/upstream/main
      return (
        <span
          onClickCapture={e => {
            e.stopPropagation();
            triggeredChild = true;
          }}>
          Click me
        </span>
      );
    }
    function App() {
      const onClick = () => {
        triggeredParent = true;
      };
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <div
          ref={n => {
            if (n) n.onclick = onClick;
          }}
          onClick={onClick}>
          <Suspense fallback={null}>
            <Child />
          </Suspense>
        </div>
      );
    }
    const finalHTML = ReactDOMServer.renderToString(<App />);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App', 'Child']);
=======
    assertLog(['App', 'Child']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    document.body.appendChild(container);
    container.innerHTML = finalHTML;

    suspend = true;

    ReactDOMClient.hydrateRoot(container, <App />);
    // Nothing has been hydrated so far.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    const span = container.getElementsByTagName('span')[0];
    dispatchClickEvent(span);

<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App']);
=======
    assertLog(['App']);
>>>>>>> remotes/upstream/main

    dispatchClickEvent(span);

    expect(triggeredParent).toBe(false);
    expect(triggeredChild).toBe(false);
  });
<<<<<<< HEAD
=======

  it('can attempt sync hydration if suspended root is still concurrently rendering', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    function Child({text}) {
      if (suspend) {
        throw promise;
      }
      Scheduler.log(text);
      return (
        <span
          onClick={e => {
            e.preventDefault();
            Scheduler.log('Clicked ' + text);
          }}>
          {text}
        </span>
      );
    }

    function App() {
      Scheduler.log('App');
      return (
        <div>
          <Child text="A" />
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

    assertLog(['App', 'A']);

    const container = document.createElement('div');
    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];

    // We suspend on the client.
    suspend = true;

    React.startTransition(() => {
      ReactDOMClient.hydrateRoot(container, <App />);
    });
    await waitFor(['App']);

    // This should attempt to synchronously hydrate the root, then pause
    // because it still suspended
    const result = dispatchClickEvent(span);
    assertLog(['App']);
    // The event should not have been cancelled because we didn't hydrate.
    expect(result).toBe(true);

    // Finish loading the data
    await act(async () => {
      suspend = false;
      await resolve();
    });

    // The app should have successfully hydrated and rendered
    assertLog(['App', 'A']);

    document.body.removeChild(container);
  });

  it('can force hydration in response to sync update', async () => {
    function Child({text}) {
      Scheduler.log(`Child ${text}`);
      return <span ref={ref => (spanRef = ref)}>{text}</span>;
    }
    function App({text}) {
      Scheduler.log(`App ${text}`);
      return (
        <div>
          <Suspense fallback={null}>
            <Child text={text} />
          </Suspense>
        </div>
      );
    }

    let spanRef;
    const finalHTML = ReactDOMServer.renderToString(<App text="A" />);
    assertLog(['App A', 'Child A']);
    const container = document.createElement('div');
    document.body.appendChild(container);
    container.innerHTML = finalHTML;
    const initialSpan = container.getElementsByTagName('span')[0];
    const root = ReactDOMClient.hydrateRoot(container, <App text="A" />);
    await waitForPaint(['App A']);

    await act(() => {
      ReactDOM.flushSync(() => {
        root.render(<App text="B" />);
      });
    });
    assertLog(['App B', 'Child A', 'App B', 'Child B']);
    expect(initialSpan).toBe(spanRef);
  });

  // @gate experimental || www
  it('can force hydration in response to continuous update', async () => {
    function Child({text}) {
      Scheduler.log(`Child ${text}`);
      return <span ref={ref => (spanRef = ref)}>{text}</span>;
    }
    function App({text}) {
      Scheduler.log(`App ${text}`);
      return (
        <div>
          <Suspense fallback={null}>
            <Child text={text} />
          </Suspense>
        </div>
      );
    }

    let spanRef;
    const finalHTML = ReactDOMServer.renderToString(<App text="A" />);
    assertLog(['App A', 'Child A']);
    const container = document.createElement('div');
    document.body.appendChild(container);
    container.innerHTML = finalHTML;
    const initialSpan = container.getElementsByTagName('span')[0];
    const root = ReactDOMClient.hydrateRoot(container, <App text="A" />);
    await waitForPaint(['App A']);

    await act(() => {
      TODO_scheduleContinuousSchedulerTask(() => {
        root.render(<App text="B" />);
      });
    });

    assertLog(['App B', 'Child A', 'App B', 'Child B']);
    expect(initialSpan).toBe(spanRef);
  });

  it('can force hydration in response to default update', async () => {
    function Child({text}) {
      Scheduler.log(`Child ${text}`);
      return <span ref={ref => (spanRef = ref)}>{text}</span>;
    }
    function App({text}) {
      Scheduler.log(`App ${text}`);
      return (
        <div>
          <Suspense fallback={null}>
            <Child text={text} />
          </Suspense>
        </div>
      );
    }

    let spanRef;
    const finalHTML = ReactDOMServer.renderToString(<App text="A" />);
    assertLog(['App A', 'Child A']);
    const container = document.createElement('div');
    document.body.appendChild(container);
    container.innerHTML = finalHTML;
    const initialSpan = container.getElementsByTagName('span')[0];
    const root = ReactDOMClient.hydrateRoot(container, <App text="A" />);
    await waitForPaint(['App A']);
    await act(() => {
      root.render(<App text="B" />);
    });
    assertLog(['App B', 'Child A', 'App B', 'Child B']);
    expect(initialSpan).toBe(spanRef);
  });

  // @gate experimental || www
  it('regression test: can unwind context on selective hydration interruption', async () => {
    const Context = React.createContext('DefaultContext');

    function ContextReader(props) {
      const value = React.useContext(Context);
      Scheduler.log(value);
      return null;
    }

    function Child({text}) {
      Scheduler.log(text);
      return <span>{text}</span>;
    }
    const ChildWithBoundary = React.memo(function ({text}) {
      return (
        <Suspense fallback="Loading...">
          <Child text={text} />
        </Suspense>
      );
    });

    function App({a}) {
      Scheduler.log('App');
      React.useEffect(() => {
        Scheduler.log('Commit');
      });
      return (
        <>
          <Context.Provider value="SiblingContext">
            <ChildWithBoundary text={a} />
          </Context.Provider>
          <ContextReader />
        </>
      );
    }
    const finalHTML = ReactDOMServer.renderToString(<App a="A" />);
    assertLog(['App', 'A', 'DefaultContext']);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;
    document.body.appendChild(container);

    const spanA = container.getElementsByTagName('span')[0];

    await act(async () => {
      const root = ReactDOMClient.hydrateRoot(container, <App a="A" />);
      await waitFor(['App', 'DefaultContext', 'Commit']);

      TODO_scheduleIdleDOMSchedulerTask(() => {
        root.render(<App a="AA" />);
      });
      await waitFor(['App', 'A']);

      dispatchClickEvent(spanA);
      assertLog(['A']);
      await waitForAll(['App', 'AA', 'DefaultContext', 'Commit']);
    });
  });

  it('regression test: can unwind context on selective hydration interruption for sync updates', async () => {
    const Context = React.createContext('DefaultContext');

    function ContextReader(props) {
      const value = React.useContext(Context);
      Scheduler.log(value);
      return null;
    }

    function Child({text}) {
      Scheduler.log(text);
      return <span>{text}</span>;
    }
    const ChildWithBoundary = React.memo(function ({text}) {
      return (
        <Suspense fallback="Loading...">
          <Child text={text} />
        </Suspense>
      );
    });

    function App({a}) {
      Scheduler.log('App');
      React.useEffect(() => {
        Scheduler.log('Commit');
      });
      return (
        <>
          <Context.Provider value="SiblingContext">
            <ChildWithBoundary text={a} />
          </Context.Provider>
          <ContextReader />
        </>
      );
    }
    const finalHTML = ReactDOMServer.renderToString(<App a="A" />);
    assertLog(['App', 'A', 'DefaultContext']);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    await act(async () => {
      const root = ReactDOMClient.hydrateRoot(container, <App a="A" />);
      await waitFor(['App', 'DefaultContext', 'Commit']);

      ReactDOM.flushSync(() => {
        root.render(<App a="AA" />);
      });
      assertLog(['App', 'A', 'App', 'AA', 'DefaultContext', 'Commit']);
    });
  });

  it('regression: selective hydration does not contribute to "maximum update limit" count', async () => {
    const outsideRef = React.createRef(null);
    const insideRef = React.createRef(null);
    function Child() {
      return (
        <Suspense fallback="Loading...">
          <div ref={insideRef} />
        </Suspense>
      );
    }

    let setIsMounted = false;
    function App() {
      const [isMounted, setState] = React.useState(false);
      setIsMounted = setState;

      const children = [];
      for (let i = 0; i < 100; i++) {
        children.push(<Child key={i} isMounted={isMounted} />);
      }

      return <div ref={outsideRef}>{children}</div>;
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    await act(async () => {
      ReactDOMClient.hydrateRoot(container, <App />);

      // Commit just the shell
      await waitForPaint([]);

      // Assert that the shell has hydrated, but not the children
      expect(outsideRef.current).not.toBe(null);
      expect(insideRef.current).toBe(null);

      // Update the shell synchronously. The update will flow into the children,
      // which haven't hydrated yet. This will trigger a cascade of commits
      // caused by selective hydration. However, since there's really only one
      // update, it should not be treated as an update loop.
      // NOTE: It's unfortunate that every sibling boundary is separately
      // committed in this case. We should be able to commit everything in a
      // render phase, which we could do if we had resumable context stacks.
      ReactDOM.flushSync(() => {
        setIsMounted(true);
      });
    });

    // Should have successfully hydrated with no errors.
    expect(insideRef.current).not.toBe(null);
  });
>>>>>>> remotes/upstream/main
});
