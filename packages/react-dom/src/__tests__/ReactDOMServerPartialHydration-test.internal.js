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
<<<<<<< HEAD
=======
 * @jest-environment ./scripts/jest/ReactDOMServerIntegrationEnvironment
>>>>>>> remotes/upstream/main
 */

'use strict';

let React = require('react');
let ReactDOM;
let ReactDOMClient;
let ReactDOMServer;
let Scheduler;
let ReactFeatureFlags;
let Suspense;
let SuspenseList;
let Offscreen;
<<<<<<< HEAD
let act;
let IdleEventPriority;

function normalizeCodeLocInfo(strOrErr) {
  if (strOrErr && strOrErr.replace) {
    return strOrErr.replace(/\n +(?:at|in) ([\S]+)[^\n]*/g, function(m, name) {
=======
let useSyncExternalStore;
let act;
let IdleEventPriority;
let waitForAll;
let waitFor;
let waitForPaint;
let assertLog;

function normalizeCodeLocInfo(strOrErr) {
  if (strOrErr && strOrErr.replace) {
    return strOrErr.replace(/\n +(?:at|in) ([\S]+)[^\n]*/g, function (m, name) {
>>>>>>> remotes/upstream/main
      return '\n    in ' + name + ' (at **)';
    });
  }
  return strOrErr;
}

function dispatchMouseEvent(to, from) {
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

class TestAppClass extends React.Component {
  render() {
    return (
      <div>
        <>{''}</>
        <>{'Hello'}</>
      </div>
    );
  }
}

describe('ReactDOMServerPartialHydration', () => {
  beforeEach(() => {
<<<<<<< HEAD
    jest.resetModuleRegistry();
=======
    jest.resetModules();
>>>>>>> remotes/upstream/main

    ReactFeatureFlags = require('shared/ReactFeatureFlags');
    ReactFeatureFlags.enableSuspenseCallback = true;
    ReactFeatureFlags.enableCreateEventHandleAPI = true;

    React = require('react');
    ReactDOM = require('react-dom');
    ReactDOMClient = require('react-dom/client');
<<<<<<< HEAD
    act = require('jest-react').act;
=======
    act = require('internal-test-utils').act;
>>>>>>> remotes/upstream/main
    ReactDOMServer = require('react-dom/server');
    Scheduler = require('scheduler');
    Suspense = React.Suspense;
    Offscreen = React.unstable_Offscreen;
<<<<<<< HEAD
    if (gate(flags => flags.enableSuspenseList)) {
      SuspenseList = React.SuspenseList;
    }

=======
    useSyncExternalStore = React.useSyncExternalStore;
    if (gate(flags => flags.enableSuspenseList)) {
      SuspenseList = React.unstable_SuspenseList;
    }

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    assertLog = InternalTestUtils.assertLog;
    waitForPaint = InternalTestUtils.waitForPaint;
    waitFor = InternalTestUtils.waitFor;

>>>>>>> remotes/upstream/main
    IdleEventPriority = require('react-reconciler/constants').IdleEventPriority;
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

  it('hydrates a parent even if a child Suspense boundary is blocked', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();

    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    function App() {
      return (
        <div>
          <Suspense fallback="Loading...">
            <span ref={ref}>
              <Child />
            </span>
          </Suspense>
        </div>
      );
    }

    // First we render the final HTML. With the streaming renderer
    // this may have suspense points on the server but here we want
    // to test the completed HTML. Don't suspend on the server.
    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    ReactDOMClient.hydrateRoot(container, <App />);
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref.current).toBe(null);

    // Resolving the promise should continue hydration
    suspend = false;
    resolve();
    await promise;
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    // We should now have hydrated with a ref on the existing span.
    expect(ref.current).toBe(span);
  });

  it('can hydrate siblings of a suspended component without errors', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    function App() {
      return (
        <Suspense fallback="Loading...">
          <Child />
          <Suspense fallback="Loading...">
            <div>Hello</div>
          </Suspense>
        </Suspense>
      );
    }

    // First we render the final HTML. With the streaming renderer
    // this may have suspense points on the server but here we want
    // to test the completed HTML. Don't suspend on the server.
    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = finalHTML;
    expect(container.textContent).toBe('HelloHello');

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    ReactDOMClient.hydrateRoot(container, <App />, {
      onRecoverableError(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(error.message);
      },
    });
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
        Scheduler.log(error.message);
      },
    });
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    // Expect the server-generated HTML to stay intact.
    expect(container.textContent).toBe('HelloHello');

    // Resolving the promise should continue hydration
    suspend = false;
    resolve();
    await promise;
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    // Hydration should not change anything.
    expect(container.textContent).toBe('HelloHello');
  });

  it('falls back to client rendering boundary on mismatch', async () => {
    // We can't use the toErrorDev helper here because this is async.
    const originalConsoleError = console.error;
    const mockError = jest.fn();
    console.error = (...args) => {
      mockError(...args.map(normalizeCodeLocInfo));
    };
    let client = false;
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
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Suspend');
        throw promise;
      } else {
        Scheduler.unstable_yieldValue('Hello');
=======
        Scheduler.log('Suspend');
        throw promise;
      } else {
        Scheduler.log('Hello');
>>>>>>> remotes/upstream/main
        return 'Hello';
      }
    }
    function Component({shouldMismatch}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Component');
=======
      Scheduler.log('Component');
>>>>>>> remotes/upstream/main
      if (shouldMismatch && client) {
        return <article>Mismatch</article>;
      }
      return <div>Component</div>;
    }
    function App() {
      return (
        <Suspense fallback="Loading...">
          <Child />
          <Component />
          <Component />
          <Component />
          <Component shouldMismatch={true} />
        </Suspense>
      );
    }
    try {
      const finalHTML = ReactDOMServer.renderToString(<App />);
      const container = document.createElement('section');
      container.innerHTML = finalHTML;
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Hello',
        'Component',
        'Component',
        'Component',
        'Component',
      ]);
=======
      assertLog(['Hello', 'Component', 'Component', 'Component', 'Component']);
>>>>>>> remotes/upstream/main

      expect(container.innerHTML).toBe(
        '<!--$-->Hello<div>Component</div><div>Component</div><div>Component</div><div>Component</div><!--/$-->',
      );

      suspend = true;
      client = true;

      ReactDOMClient.hydrateRoot(container, <App />, {
        onRecoverableError(error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(error.message);
        },
      });
      expect(Scheduler).toFlushAndYield([
        'Suspend',
        'Component',
        'Component',
        'Component',
        'Component',
      ]);
=======
          Scheduler.log(error.message);
        },
      });
      await waitForAll(['Suspend']);
>>>>>>> remotes/upstream/main
      jest.runAllTimers();

      // Unchanged
      expect(container.innerHTML).toBe(
        '<!--$-->Hello<div>Component</div><div>Component</div><div>Component</div><div>Component</div><!--/$-->',
      );

      suspend = false;
      resolve();
      await promise;
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        // first pass, mismatches at end
        'Hello',
        'Component',
        'Component',
        'Component',
        'Component',

        // second pass as client render
        'Hello',
        'Component',
        'Component',
        'Component',
        'Component',

        // Hydration mismatch is logged
        'Hydration failed because the initial UI does not match what was rendered on the server.',
        'There was an error while hydrating this Suspense boundary. Switched to client rendering.',
      ]);

      // Client rendered - suspense comment nodes removed
      expect(container.innerHTML).toBe(
        'Hello<div>Component</div><div>Component</div><div>Component</div><article>Mismatch</article>',
      );

      if (__DEV__) {
        const secondToLastCall =
          mockError.mock.calls[mockError.mock.calls.length - 2];
        expect(secondToLastCall).toEqual([
          'Warning: Expected server HTML to contain a matching <%s> in <%s>.%s',
          'article',
          'section',
          '\n' +
            '    in article (at **)\n' +
            '    in Component (at **)\n' +
            '    in Suspense (at **)\n' +
            '    in App (at **)',
        ]);
      }
    } finally {
      console.error = originalConsoleError;
    }
  });

  it('calls the hydration callbacks after hydration or deletion', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    let suspend2 = false;
    const promise2 = new Promise(() => {});
    function Child2() {
      if (suspend2) {
        throw promise2;
      } else {
        return 'World';
      }
    }

    function App({value}) {
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child />
          </Suspense>
          <Suspense fallback="Loading...">
            <Child2 value={value} />
          </Suspense>
        </div>
      );
    }

    // First we render the final HTML. With the streaming renderer
    // this may have suspense points on the server but here we want
    // to test the completed HTML. Don't suspend on the server.
    suspend = false;
    suspend2 = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const hydrated = [];
    const deleted = [];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    suspend2 = true;
    const root = ReactDOMClient.hydrateRoot(container, <App />, {
      onHydrated(node) {
        hydrated.push(node);
      },
      onDeleted(node) {
        deleted.push(node);
      },
      onRecoverableError(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(error.message);
      },
    });
    expect(Scheduler).toFlushAndYield([]);
=======
        Scheduler.log(error.message);
      },
    });
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(hydrated.length).toBe(0);
    expect(deleted.length).toBe(0);

    await act(async () => {
      // Resolving the promise should continue hydration
      suspend = false;
      resolve();
      await promise;
    });

    expect(hydrated.length).toBe(1);
    expect(deleted.length).toBe(0);

    // Performing an update should force it to delete the boundary
<<<<<<< HEAD
    root.render(<App value={true} />);

    Scheduler.unstable_flushAll();
    jest.runAllTimers();
    expect(Scheduler).toHaveYielded([
      'This Suspense boundary received an update before it finished ' +
        'hydrating. This caused the boundary to switch to client rendering. ' +
        'The usual way to fix this is to wrap the original update ' +
        'in startTransition.',
    ]);
=======
    await act(() => {
      root.render(<App value={true} />);
    });
>>>>>>> remotes/upstream/main

    expect(hydrated.length).toBe(1);
    expect(deleted.length).toBe(1);
  });

  it('hydrates an empty suspense boundary', async () => {
    function App() {
      return (
        <div>
          <Suspense fallback="Loading..." />
          <div>Sibling</div>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    ReactDOMClient.hydrateRoot(container, <App />);
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(container.innerHTML).toContain('<div>Sibling</div>');
  });

  it('recovers with client render when server rendered additional nodes at suspense root', async () => {
<<<<<<< HEAD
=======
    function CheckIfHydrating({children}) {
      // This is a trick to check whether we're hydrating or not, since React
      // doesn't expose that information currently except
      // via useSyncExternalStore.
      let serverOrClient = '(unknown)';
      useSyncExternalStore(
        () => {},
        () => {
          serverOrClient = 'Client rendered';
          return null;
        },
        () => {
          serverOrClient = 'Server rendered';
          return null;
        },
      );
      Scheduler.log(serverOrClient);
      return null;
    }

>>>>>>> remotes/upstream/main
    const ref = React.createRef();
    function App({hasB}) {
      return (
        <div>
          <Suspense fallback="Loading...">
            <span ref={ref}>A</span>
            {hasB ? <span>B</span> : null}
<<<<<<< HEAD
=======
            <CheckIfHydrating />
>>>>>>> remotes/upstream/main
          </Suspense>
          <div>Sibling</div>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App hasB={true} />);
<<<<<<< HEAD
=======
    assertLog(['Server rendered']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];

    expect(container.innerHTML).toContain('<span>A</span>');
    expect(container.innerHTML).toContain('<span>B</span>');
    expect(ref.current).toBe(null);

<<<<<<< HEAD
    expect(() => {
      act(() => {
        ReactDOMClient.hydrateRoot(container, <App hasB={false} />, {
          onRecoverableError(error) {
            Scheduler.unstable_yieldValue(error.message);
=======
    await expect(async () => {
      await act(() => {
        ReactDOMClient.hydrateRoot(container, <App hasB={false} />, {
          onRecoverableError(error) {
            Scheduler.log(error.message);
>>>>>>> remotes/upstream/main
          },
        });
      });
    }).toErrorDev('Did not expect server HTML to contain a <span> in <div>');

<<<<<<< HEAD
    jest.runAllTimers();

    expect(container.innerHTML).toContain('<span>A</span>');
    expect(container.innerHTML).not.toContain('<span>B</span>');

    expect(Scheduler).toHaveYielded([
=======
    expect(container.innerHTML).toContain('<span>A</span>');
    expect(container.innerHTML).not.toContain('<span>B</span>');

    assertLog([
      'Server rendered',
      'Client rendered',
>>>>>>> remotes/upstream/main
      'There was an error while hydrating this Suspense boundary. ' +
        'Switched to client rendering.',
    ]);
    expect(ref.current).not.toBe(span);
  });

  it('recovers with client render when server rendered additional nodes at suspense root after unsuspending', async () => {
    // We can't use the toErrorDev helper here because this is async.
    const originalConsoleError = console.error;
    const mockError = jest.fn();
    console.error = (...args) => {
      mockError(...args.map(normalizeCodeLocInfo));
    };

    const ref = React.createRef();
    let shouldSuspend = false;
    let resolve;
    const promise = new Promise(res => {
      resolve = () => {
        shouldSuspend = false;
        res();
      };
    });
    function Suspender() {
      if (shouldSuspend) {
        throw promise;
      }
      return <></>;
    }
    function App({hasB}) {
      return (
        <div>
          <Suspense fallback="Loading...">
            <Suspender />
            <span ref={ref}>A</span>
            {hasB ? <span>B</span> : null}
          </Suspense>
          <div>Sibling</div>
        </div>
      );
    }
    try {
      const finalHTML = ReactDOMServer.renderToString(<App hasB={true} />);

      const container = document.createElement('div');
      container.innerHTML = finalHTML;

      const span = container.getElementsByTagName('span')[0];

      expect(container.innerHTML).toContain('<span>A</span>');
      expect(container.innerHTML).toContain('<span>B</span>');
      expect(ref.current).toBe(null);

      shouldSuspend = true;
<<<<<<< HEAD
      act(() => {
        ReactDOMClient.hydrateRoot(container, <App hasB={false} />);
      });

      resolve();
      await promise;
      Scheduler.unstable_flushAll();
      await null;
      jest.runAllTimers();
=======
      await act(() => {
        ReactDOMClient.hydrateRoot(container, <App hasB={false} />);
      });

      await act(() => {
        resolve();
      });
>>>>>>> remotes/upstream/main

      expect(container.innerHTML).toContain('<span>A</span>');
      expect(container.innerHTML).not.toContain('<span>B</span>');
      expect(ref.current).not.toBe(span);
      if (__DEV__) {
        expect(mockError).toHaveBeenCalledWith(
          'Warning: Did not expect server HTML to contain a <%s> in <%s>.%s',
          'span',
          'div',
          '\n' +
            '    in Suspense (at **)\n' +
            '    in div (at **)\n' +
            '    in App (at **)',
        );
      }
    } finally {
      console.error = originalConsoleError;
    }
  });

  it('recovers with client render when server rendered additional nodes deep inside suspense root', async () => {
    const ref = React.createRef();
    function App({hasB}) {
      return (
        <div>
          <Suspense fallback="Loading...">
            <div>
              <span ref={ref}>A</span>
              {hasB ? <span>B</span> : null}
            </div>
          </Suspense>
          <div>Sibling</div>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App hasB={true} />);

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];

    expect(container.innerHTML).toContain('<span>A</span>');
    expect(container.innerHTML).toContain('<span>B</span>');
    expect(ref.current).toBe(null);

<<<<<<< HEAD
    expect(() => {
      act(() => {
        ReactDOMClient.hydrateRoot(container, <App hasB={false} />, {
          onRecoverableError(error) {
            Scheduler.unstable_yieldValue(error.message);
=======
    await expect(async () => {
      await act(() => {
        ReactDOMClient.hydrateRoot(container, <App hasB={false} />, {
          onRecoverableError(error) {
            Scheduler.log(error.message);
>>>>>>> remotes/upstream/main
          },
        });
      });
    }).toErrorDev('Did not expect server HTML to contain a <span> in <div>');
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'Hydration failed because the initial UI does not match what was rendered on the server.',
      'There was an error while hydrating this Suspense boundary. Switched to client rendering.',
    ]);

    expect(container.innerHTML).toContain('<span>A</span>');
    expect(container.innerHTML).not.toContain('<span>B</span>');
    expect(ref.current).not.toBe(span);
  });

  it('calls the onDeleted hydration callback if the parent gets deleted', async () => {
    let suspend = false;
    const promise = new Promise(() => {});
    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    function App({deleted}) {
      if (deleted) {
        return null;
      }
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child />
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const deleted = [];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
<<<<<<< HEAD
    const root = ReactDOMClient.hydrateRoot(container, <App />, {
      onDeleted(node) {
        deleted.push(node);
      },
    });
    Scheduler.unstable_flushAll();

    expect(deleted.length).toBe(0);

    act(() => {
=======
    const root = await act(() => {
      return ReactDOMClient.hydrateRoot(container, <App />, {
        onDeleted(node) {
          deleted.push(node);
        },
      });
    });

    expect(deleted.length).toBe(0);

    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<App deleted={true} />);
    });

    // The callback should have been invoked.
    expect(deleted.length).toBe(1);
  });

  it('warns and replaces the boundary content in legacy mode', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();

    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    function App() {
      return (
        <div>
          <Suspense fallback="Loading...">
            <span ref={ref}>
              <Child />
            </span>
          </Suspense>
        </div>
      );
    }

    // Don't suspend on the server.
    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];

    // On the client we try to hydrate.
    suspend = true;
<<<<<<< HEAD
    expect(() => {
      act(() => {
=======
    await expect(async () => {
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactDOM.hydrate(<App />, container);
      });
    }).toErrorDev(
      'Warning: Cannot hydrate Suspense in legacy mode. Switch from ' +
        'ReactDOM.hydrate(element, container) to ' +
        'ReactDOMClient.hydrateRoot(container, <App />)' +
        '.render(element) or remove the Suspense components from the server ' +
        'rendered components.' +
        '\n    in Suspense (at **)' +
        '\n    in div (at **)' +
        '\n    in App (at **)',
    );

    // We're now in loading state.
    expect(container.textContent).toBe('Loading...');

    const span2 = container.getElementsByTagName('span')[0];
    // This is a new node.
    expect(span).not.toBe(span2);

    if (gate(flags => flags.dfsEffectsRefactor)) {
      // The effects list refactor causes this to be null because the Suspense Offscreen's child
      // is null. However, since we can't hydrate Suspense in legacy this change in behavior is ok
      expect(ref.current).toBe(null);
    } else {
      expect(ref.current).toBe(span2);
    }

    // Resolving the promise should render the final content.
    suspend = false;
<<<<<<< HEAD
    resolve();
    await promise;
    Scheduler.unstable_flushAll();
    await null;
    jest.runAllTimers();
=======
    await act(() => resolve());
>>>>>>> remotes/upstream/main

    // We should now have hydrated with a ref on the existing span.
    expect(container.textContent).toBe('Hello');
  });

<<<<<<< HEAD
  it('can insert siblings before the dehydrated boundary', () => {
=======
  it('can insert siblings before the dehydrated boundary', async () => {
>>>>>>> remotes/upstream/main
    let suspend = false;
    const promise = new Promise(() => {});
    let showSibling;

    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return 'Second';
      }
    }

    function Sibling() {
      const [visible, setVisibilty] = React.useState(false);
      showSibling = () => setVisibilty(true);
      if (visible) {
        return <div>First</div>;
      }
      return null;
    }

    function App() {
      return (
        <div>
          <Sibling />
          <Suspense fallback="Loading...">
            <span>
              <Child />
            </span>
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;

<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactDOMClient.hydrateRoot(container, <App />);
    });

    expect(container.firstChild.firstChild.tagName).not.toBe('DIV');

    // In this state, we can still update the siblings.
<<<<<<< HEAD
    act(() => showSibling());
=======
    await act(() => showSibling());
>>>>>>> remotes/upstream/main

    expect(container.firstChild.firstChild.tagName).toBe('DIV');
    expect(container.firstChild.firstChild.textContent).toBe('First');
  });

<<<<<<< HEAD
  it('can delete the dehydrated boundary before it is hydrated', () => {
=======
  it('can delete the dehydrated boundary before it is hydrated', async () => {
>>>>>>> remotes/upstream/main
    let suspend = false;
    const promise = new Promise(() => {});
    let hideMiddle;

    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return (
          <>
            <div>Middle</div>
            Some text
          </>
        );
      }
    }

    function App() {
      const [visible, setVisibilty] = React.useState(true);
      hideMiddle = () => setVisibilty(false);

      return (
        <div>
          <div>Before</div>
          {visible ? (
            <Suspense fallback="Loading...">
              <Child />
            </Suspense>
          ) : null}
          <div>After</div>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactDOMClient.hydrateRoot(container, <App />);
    });

    expect(container.firstChild.children[1].textContent).toBe('Middle');

    // In this state, we can still delete the boundary.
<<<<<<< HEAD
    act(() => hideMiddle());
=======
    await act(() => hideMiddle());
>>>>>>> remotes/upstream/main

    expect(container.firstChild.children[1].textContent).toBe('After');
  });

  it('blocks updates to hydrate the content first if props have changed', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();

    function Child({text}) {
      if (suspend) {
        throw promise;
      } else {
        return text;
      }
    }

    function App({text, className}) {
      return (
        <div>
          <Suspense fallback="Loading...">
            <span ref={ref} className={className}>
              <Child text={text} />
            </span>
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(
      <App text="Hello" className="hello" />,
    );
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    const root = ReactDOMClient.hydrateRoot(
      container,
      <App text="Hello" className="hello" />,
    );
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref.current).toBe(null);
    expect(span.textContent).toBe('Hello');

    // Render an update, which will be higher or the same priority as pinging the hydration.
    root.render(<App text="Hi" className="hi" />);

    // At the same time, resolving the promise so that rendering can complete.
<<<<<<< HEAD
    suspend = false;
    resolve();
    await promise;

    // This should first complete the hydration and then flush the update onto the hydrated state.
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    // This should first complete the hydration and then flush the update onto the hydrated state.
    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });
>>>>>>> remotes/upstream/main

    // The new span should be the same since we should have successfully hydrated
    // before changing it.
    const newSpan = container.getElementsByTagName('span')[0];
    expect(span).toBe(newSpan);

    // We should now have fully rendered with a ref on the new span.
    expect(ref.current).toBe(span);
    expect(span.textContent).toBe('Hi');
    // If we ended up hydrating the existing content, we won't have properly
    // patched up the tree, which might mean we haven't patched the className.
    expect(span.className).toBe('hi');
  });

  // @gate experimental || www
  it('blocks updates to hydrate the content first if props changed at idle priority', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();

    function Child({text}) {
      if (suspend) {
        throw promise;
      } else {
        return text;
      }
    }

    function App({text, className}) {
      return (
        <div>
          <Suspense fallback="Loading...">
            <span ref={ref} className={className}>
              <Child text={text} />
            </span>
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(
      <App text="Hello" className="hello" />,
    );
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    const root = ReactDOMClient.hydrateRoot(
      container,
      <App text="Hello" className="hello" />,
    );
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref.current).toBe(null);
    expect(span.textContent).toBe('Hello');

    // Schedule an update at idle priority
    ReactDOM.unstable_runWithPriority(IdleEventPriority, () => {
      root.render(<App text="Hi" className="hi" />);
    });

    // At the same time, resolving the promise so that rendering can complete.
    suspend = false;
    resolve();
    await promise;

    // This should first complete the hydration and then flush the update onto the hydrated state.
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    // The new span should be the same since we should have successfully hydrated
    // before changing it.
    const newSpan = container.getElementsByTagName('span')[0];
    expect(span).toBe(newSpan);

    // We should now have fully rendered with a ref on the new span.
    expect(ref.current).toBe(span);
    expect(span.textContent).toBe('Hi');
    // If we ended up hydrating the existing content, we won't have properly
    // patched up the tree, which might mean we haven't patched the className.
    expect(span.className).toBe('hi');
  });

  it('shows the fallback if props have changed before hydration completes and is still suspended', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();

    function Child({text}) {
      if (suspend) {
        throw promise;
      } else {
        return text;
      }
    }

    function App({text, className}) {
      return (
        <div>
          <Suspense fallback="Loading...">
            <span ref={ref} className={className}>
              <Child text={text} />
            </span>
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(
      <App text="Hello" className="hello" />,
    );
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    const root = ReactDOMClient.hydrateRoot(
      container,
      <App text="Hello" className="hello" />,
      {
        onRecoverableError(error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(error.message);
        },
      },
    );
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
          Scheduler.log(error.message);
        },
      },
    );
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref.current).toBe(null);

    // Render an update, but leave it still suspended.
<<<<<<< HEAD
    root.render(<App text="Hi" className="hi" />);
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
    expect(Scheduler).toHaveYielded([
      'This Suspense boundary received an update before it finished ' +
        'hydrating. This caused the boundary to switch to client ' +
        'rendering. The usual way to fix this is to wrap the original ' +
        'update in startTransition.',
    ]);
=======
    await act(() => {
      root.render(<App text="Hi" className="hi" />);
    });
>>>>>>> remotes/upstream/main

    // Flushing now should delete the existing content and show the fallback.

    expect(container.getElementsByTagName('span').length).toBe(0);
    expect(ref.current).toBe(null);
    expect(container.textContent).toBe('Loading...');

    // Unsuspending shows the content.
<<<<<<< HEAD
    suspend = false;
    resolve();
    await promise;

    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });
>>>>>>> remotes/upstream/main

    const span = container.getElementsByTagName('span')[0];
    expect(span.textContent).toBe('Hi');
    expect(span.className).toBe('hi');
    expect(ref.current).toBe(span);
    expect(container.textContent).toBe('Hi');
  });

  it('treats missing fallback the same as if it was defined', async () => {
    // This is the same exact test as above but with a nested Suspense without a fallback.
    // This should be a noop.
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();

    function Child({text}) {
      if (suspend) {
        throw promise;
      } else {
        return text;
      }
    }

    function App({text, className}) {
      return (
        <div>
          <Suspense fallback="Loading...">
            <span ref={ref} className={className}>
              <Suspense>
                <Child text={text} />
              </Suspense>
            </span>
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(
      <App text="Hello" className="hello" />,
    );
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    const root = ReactDOMClient.hydrateRoot(
      container,
      <App text="Hello" className="hello" />,
      {
        onRecoverableError(error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(error.message);
        },
      },
    );
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
          Scheduler.log(error.message);
        },
      },
    );
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    const span = container.getElementsByTagName('span')[0];
    expect(ref.current).toBe(span);

    // Render an update, but leave it still suspended.
<<<<<<< HEAD
    root.render(<App text="Hi" className="hi" />);

    // Flushing now should delete the existing content and show the fallback.
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
    expect(Scheduler).toHaveYielded([
      'This Suspense boundary received an update before it finished ' +
        'hydrating. This caused the boundary to switch to client rendering. ' +
        'The usual way to fix this is to wrap the original update ' +
        'in startTransition.',
    ]);
=======
    // Flushing now should delete the existing content and show the fallback.
    await act(() => {
      root.render(<App text="Hi" className="hi" />);
    });
>>>>>>> remotes/upstream/main

    expect(container.getElementsByTagName('span').length).toBe(1);
    expect(ref.current).toBe(span);
    expect(container.textContent).toBe('');

    // Unsuspending shows the content.
<<<<<<< HEAD
    suspend = false;
    resolve();
    await promise;

    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });
>>>>>>> remotes/upstream/main

    expect(span.textContent).toBe('Hi');
    expect(span.className).toBe('hi');
    expect(ref.current).toBe(span);
    expect(container.textContent).toBe('Hi');
  });

  it('clears nested suspense boundaries if they did not hydrate yet', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();

    function Child({text}) {
      if (suspend) {
        throw promise;
      } else {
        return text;
      }
    }

    function App({text, className}) {
      return (
        <div>
          <Suspense fallback="Loading...">
            <Suspense fallback="Never happens">
              <Child text={text} />
            </Suspense>{' '}
            <span ref={ref} className={className}>
              <Child text={text} />
            </span>
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(
      <App text="Hello" className="hello" />,
    );
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    const root = ReactDOMClient.hydrateRoot(
      container,
      <App text="Hello" className="hello" />,
      {
        onRecoverableError(error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(error.message);
        },
      },
    );
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
          Scheduler.log(error.message);
        },
      },
    );
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref.current).toBe(null);

    // Render an update, but leave it still suspended.
<<<<<<< HEAD
    root.render(<App text="Hi" className="hi" />);

    // Flushing now should delete the existing content and show the fallback.
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    // Flushing now should delete the existing content and show the fallback.
    await act(() => {
      root.render(<App text="Hi" className="hi" />);
    });
>>>>>>> remotes/upstream/main

    expect(container.getElementsByTagName('span').length).toBe(0);
    expect(ref.current).toBe(null);
    expect(container.textContent).toBe('Loading...');

    // Unsuspending shows the content.
<<<<<<< HEAD
    suspend = false;
    resolve();
    await promise;
    expect(Scheduler).toHaveYielded([
      'This Suspense boundary received an update before it finished ' +
        'hydrating. This caused the boundary to switch to client rendering. ' +
        'The usual way to fix this is to wrap the original update ' +
        'in startTransition.',
    ]);

    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });

    await waitForAll([]);
>>>>>>> remotes/upstream/main

    const span = container.getElementsByTagName('span')[0];
    expect(span.textContent).toBe('Hi');
    expect(span.className).toBe('hi');
    expect(ref.current).toBe(span);
    expect(container.textContent).toBe('Hi Hi');
  });

  it('hydrates first if props changed but we are able to resolve within a timeout', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();

    function Child({text}) {
      if (suspend) {
        throw promise;
      } else {
        return text;
      }
    }

    function App({text, className}) {
      return (
        <div>
          <Suspense fallback="Loading...">
            <span ref={ref} className={className}>
              <Child text={text} />
            </span>
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(
      <App text="Hello" className="hello" />,
    );
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    const root = ReactDOMClient.hydrateRoot(
      container,
      <App text="Hello" className="hello" />,
    );
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref.current).toBe(null);
    expect(container.textContent).toBe('Hello');

    // Render an update with a long timeout.
    React.startTransition(() => root.render(<App text="Hi" className="hi" />));
<<<<<<< HEAD

    // This shouldn't force the fallback yet.
    Scheduler.unstable_flushAll();
=======
    // This shouldn't force the fallback yet.
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref.current).toBe(null);
    expect(container.textContent).toBe('Hello');

    // Resolving the promise so that rendering can complete.
<<<<<<< HEAD
    suspend = false;
    resolve();
    await promise;

    // This should first complete the hydration and then flush the update onto the hydrated state.
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    // This should first complete the hydration and then flush the update onto the hydrated state.
    suspend = false;
    await act(() => resolve());
>>>>>>> remotes/upstream/main

    // The new span should be the same since we should have successfully hydrated
    // before changing it.
    const newSpan = container.getElementsByTagName('span')[0];
    expect(span).toBe(newSpan);

    // We should now have fully rendered with a ref on the new span.
    expect(ref.current).toBe(span);
    expect(container.textContent).toBe('Hi');
    // If we ended up hydrating the existing content, we won't have properly
    // patched up the tree, which might mean we haven't patched the className.
    expect(span.className).toBe('hi');
  });

  it('warns but works if setState is called before commit in a dehydrated component', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    let updateText;

    function Child() {
      const [state, setState] = React.useState('Hello');
      updateText = setState;
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Child');
=======
      Scheduler.log('Child');
>>>>>>> remotes/upstream/main
      if (suspend) {
        throw promise;
      } else {
        return state;
      }
    }

    function Sibling() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Sibling');
=======
      Scheduler.log('Sibling');
>>>>>>> remotes/upstream/main
      return null;
    }

    function App() {
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child />
            <Sibling />
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Child', 'Sibling']);
=======
    assertLog(['Child', 'Sibling']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    ReactDOMClient.hydrateRoot(
      container,
      <App text="Hello" className="hello" />,
    );

    await act(async () => {
      suspend = true;
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYieldThrough(['Child']);
=======
      await waitFor(['Child']);
>>>>>>> remotes/upstream/main

      // While we're part way through the hydration, we update the state.
      // This will schedule an update on the children of the suspense boundary.
      expect(() => updateText('Hi')).toErrorDev(
        "Can't perform a React state update on a component that hasn't mounted yet.",
      );

      // This will throw it away and rerender.
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Child', 'Sibling']);
=======
      await waitForAll(['Child']);
>>>>>>> remotes/upstream/main

      expect(container.textContent).toBe('Hello');

      suspend = false;
      resolve();
      await promise;
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Child', 'Sibling']);
=======
    assertLog(['Child', 'Sibling']);
>>>>>>> remotes/upstream/main

    expect(container.textContent).toBe('Hello');
  });

  it('blocks the update to hydrate first if context has changed', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();
    const Context = React.createContext(null);

    function Child() {
      const {text, className} = React.useContext(Context);
      if (suspend) {
        throw promise;
      } else {
        return (
          <span ref={ref} className={className}>
            {text}
          </span>
        );
      }
    }

    const App = React.memo(function App() {
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child />
          </Suspense>
        </div>
      );
    });

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(
      <Context.Provider value={{text: 'Hello', className: 'hello'}}>
        <App />
      </Context.Provider>,
    );
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    const root = ReactDOMClient.hydrateRoot(
      container,
      <Context.Provider value={{text: 'Hello', className: 'hello'}}>
        <App />
      </Context.Provider>,
    );
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref.current).toBe(null);
    expect(span.textContent).toBe('Hello');

    // Render an update, which will be higher or the same priority as pinging the hydration.
    root.render(
      <Context.Provider value={{text: 'Hi', className: 'hi'}}>
        <App />
      </Context.Provider>,
    );

    // At the same time, resolving the promise so that rendering can complete.
<<<<<<< HEAD
    suspend = false;
    resolve();
    await promise;

    // This should first complete the hydration and then flush the update onto the hydrated state.
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    // This should first complete the hydration and then flush the update onto the hydrated state.
    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });
>>>>>>> remotes/upstream/main

    // Since this should have been hydrated, this should still be the same span.
    const newSpan = container.getElementsByTagName('span')[0];
    expect(newSpan).toBe(span);

    // We should now have fully rendered with a ref on the new span.
    expect(ref.current).toBe(span);
    expect(span.textContent).toBe('Hi');
    // If we ended up hydrating the existing content, we won't have properly
    // patched up the tree, which might mean we haven't patched the className.
    expect(span.className).toBe('hi');
  });

  it('shows the fallback if context has changed before hydration completes and is still suspended', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();
    const Context = React.createContext(null);

    function Child() {
      const {text, className} = React.useContext(Context);
      if (suspend) {
        throw promise;
      } else {
        return (
          <span ref={ref} className={className}>
            {text}
          </span>
        );
      }
    }

    const App = React.memo(function App() {
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child />
          </Suspense>
        </div>
      );
    });

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(
      <Context.Provider value={{text: 'Hello', className: 'hello'}}>
        <App />
      </Context.Provider>,
    );
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    const root = ReactDOMClient.hydrateRoot(
      container,
      <Context.Provider value={{text: 'Hello', className: 'hello'}}>
        <App />
      </Context.Provider>,
      {
        onRecoverableError(error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(error.message);
        },
      },
    );
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
          Scheduler.log(error.message);
        },
      },
    );
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref.current).toBe(null);

    // Render an update, but leave it still suspended.
<<<<<<< HEAD
    root.render(
      <Context.Provider value={{text: 'Hi', className: 'hi'}}>
        <App />
      </Context.Provider>,
    );

    // Flushing now should delete the existing content and show the fallback.
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
    expect(Scheduler).toHaveYielded([
      'This Suspense boundary received an update before it finished ' +
        'hydrating. This caused the boundary to switch to client rendering. ' +
        'The usual way to fix this is to wrap the original update ' +
        'in startTransition.',
    ]);
=======
    // Flushing now should delete the existing content and show the fallback.
    await act(() => {
      root.render(
        <Context.Provider value={{text: 'Hi', className: 'hi'}}>
          <App />
        </Context.Provider>,
      );
    });
>>>>>>> remotes/upstream/main

    expect(container.getElementsByTagName('span').length).toBe(0);
    expect(ref.current).toBe(null);
    expect(container.textContent).toBe('Loading...');

    // Unsuspending shows the content.
<<<<<<< HEAD
    suspend = false;
    resolve();
    await promise;

    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });
>>>>>>> remotes/upstream/main

    const span = container.getElementsByTagName('span')[0];
    expect(span.textContent).toBe('Hi');
    expect(span.className).toBe('hi');
    expect(ref.current).toBe(span);
    expect(container.textContent).toBe('Hi');
  });

  it('replaces the fallback with client content if it is not rendered by the server', async () => {
    let suspend = false;
    const promise = new Promise(resolvePromise => {});
    const ref = React.createRef();

    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    function App() {
      return (
        <div>
          <Suspense fallback="Loading...">
            <span ref={ref}>
              <Child />
            </span>
          </Suspense>
        </div>
      );
    }

    // First we render the final HTML. With the streaming renderer
    // this may have suspense points on the server but here we want
    // to test the completed HTML. Don't suspend on the server.
    suspend = true;
    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    expect(container.getElementsByTagName('span').length).toBe(0);

    // On the client we have the data available quickly for some reason.
    suspend = false;
    ReactDOMClient.hydrateRoot(container, <App />, {
      onRecoverableError(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(error.message);
      },
    });
    if (__DEV__) {
      expect(Scheduler).toFlushAndYield([
=======
        Scheduler.log(error.message);
      },
    });
    if (__DEV__) {
      await waitForAll([
>>>>>>> remotes/upstream/main
        'The server did not finish this Suspense boundary: The server used' +
          ' "renderToString" which does not support Suspense. If you intended' +
          ' for this Suspense boundary to render the fallback content on the' +
          ' server consider throwing an Error somewhere within the Suspense boundary.' +
          ' If you intended to have the server wait for the suspended component' +
          ' please switch to "renderToPipeableStream" which supports Suspense on the server',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        'The server could not finish this Suspense boundary, likely due to ' +
          'an error during server rendering. Switched to client rendering.',
      ]);
    }
    jest.runAllTimers();

    expect(container.textContent).toBe('Hello');

    const span = container.getElementsByTagName('span')[0];
    expect(ref.current).toBe(span);
  });

  it('replaces the fallback within the suspended time if there is a nested suspense', async () => {
    let suspend = false;
    const promise = new Promise(resolvePromise => {});
    const ref = React.createRef();

    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    function InnerChild() {
      // Always suspends indefinitely
      throw promise;
    }

    function App() {
      return (
        <div>
          <Suspense fallback="Loading...">
            <span ref={ref}>
              <Child />
            </span>
            <Suspense fallback={null}>
              <InnerChild />
            </Suspense>
          </Suspense>
        </div>
      );
    }

    // First we render the final HTML. With the streaming renderer
    // this may have suspense points on the server but here we want
    // to test the completed HTML. Don't suspend on the server.
    suspend = true;
    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    expect(container.getElementsByTagName('span').length).toBe(0);

    // On the client we have the data available quickly for some reason.
    suspend = false;
    ReactDOMClient.hydrateRoot(container, <App />, {
      onRecoverableError(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(error.message);
      },
    });
    if (__DEV__) {
      expect(Scheduler).toFlushAndYield([
=======
        Scheduler.log(error.message);
      },
    });
    if (__DEV__) {
      await waitForAll([
>>>>>>> remotes/upstream/main
        'The server did not finish this Suspense boundary: The server used' +
          ' "renderToString" which does not support Suspense. If you intended' +
          ' for this Suspense boundary to render the fallback content on the' +
          ' server consider throwing an Error somewhere within the Suspense boundary.' +
          ' If you intended to have the server wait for the suspended component' +
          ' please switch to "renderToPipeableStream" which supports Suspense on the server',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        'The server could not finish this Suspense boundary, likely due to ' +
          'an error during server rendering. Switched to client rendering.',
      ]);
    }
    // This will have exceeded the suspended time so we should timeout.
    jest.advanceTimersByTime(500);
    // The boundary should longer be suspended for the middle content
    // even though the inner boundary is still suspended.

    expect(container.textContent).toBe('Hello');

    const span = container.getElementsByTagName('span')[0];
    expect(ref.current).toBe(span);
  });

  it('replaces the fallback within the suspended time if there is a nested suspense in a nested suspense', async () => {
    let suspend = false;
    const promise = new Promise(resolvePromise => {});
    const ref = React.createRef();

    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    function InnerChild() {
      // Always suspends indefinitely
      throw promise;
    }

    function App() {
      return (
        <div>
          <Suspense fallback="Another layer">
            <Suspense fallback="Loading...">
              <span ref={ref}>
                <Child />
              </span>
              <Suspense fallback={null}>
                <InnerChild />
              </Suspense>
            </Suspense>
          </Suspense>
        </div>
      );
    }

    // First we render the final HTML. With the streaming renderer
    // this may have suspense points on the server but here we want
    // to test the completed HTML. Don't suspend on the server.
    suspend = true;
    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    expect(container.getElementsByTagName('span').length).toBe(0);

    // On the client we have the data available quickly for some reason.
    suspend = false;
    ReactDOMClient.hydrateRoot(container, <App />, {
      onRecoverableError(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(error.message);
      },
    });
    if (__DEV__) {
      expect(Scheduler).toFlushAndYield([
=======
        Scheduler.log(error.message);
      },
    });
    if (__DEV__) {
      await waitForAll([
>>>>>>> remotes/upstream/main
        'The server did not finish this Suspense boundary: The server used' +
          ' "renderToString" which does not support Suspense. If you intended' +
          ' for this Suspense boundary to render the fallback content on the' +
          ' server consider throwing an Error somewhere within the Suspense boundary.' +
          ' If you intended to have the server wait for the suspended component' +
          ' please switch to "renderToPipeableStream" which supports Suspense on the server',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        'The server could not finish this Suspense boundary, likely due to ' +
          'an error during server rendering. Switched to client rendering.',
      ]);
    }
    // This will have exceeded the suspended time so we should timeout.
    jest.advanceTimersByTime(500);
    // The boundary should longer be suspended for the middle content
    // even though the inner boundary is still suspended.

    expect(container.textContent).toBe('Hello');

    const span = container.getElementsByTagName('span')[0];
    expect(ref.current).toBe(span);
  });

  // @gate enableSuspenseList
  it('shows inserted items in a SuspenseList before content is hydrated', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();

    function Child({children}) {
      if (suspend) {
        throw promise;
      } else {
        return children;
      }
    }

    // These are hoisted to avoid them from rerendering.
    const a = (
      <Suspense fallback="Loading A">
        <Child>
          <span>A</span>
        </Child>
      </Suspense>
    );
    const b = (
      <Suspense fallback="Loading B">
        <Child>
          <span ref={ref}>B</span>
        </Child>
      </Suspense>
    );

    function App({showMore}) {
      return (
        <SuspenseList revealOrder="forwards">
          {a}
          {b}
          {showMore ? (
            <Suspense fallback="Loading C">
              <span>C</span>
            </Suspense>
          ) : null}
        </SuspenseList>
      );
    }

    suspend = false;
    const html = ReactDOMServer.renderToString(<App showMore={false} />);

    const container = document.createElement('div');
    container.innerHTML = html;

    const spanB = container.getElementsByTagName('span')[1];

<<<<<<< HEAD
    const root = ReactDOMClient.hydrateRoot(
      container,
      <App showMore={false} />,
    );
    suspend = true;
    Scheduler.unstable_flushAll();
=======
    suspend = true;
    const root = await act(() =>
      ReactDOMClient.hydrateRoot(container, <App showMore={false} />),
    );
>>>>>>> remotes/upstream/main

    // We're not hydrated yet.
    expect(ref.current).toBe(null);
    expect(container.textContent).toBe('AB');

    // Add more rows before we've hydrated the first two.
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      root.render(<App showMore={true} />);
    });

    // We're not hydrated yet.
    expect(ref.current).toBe(null);

    // Since the first two are already showing their final content
    // we should be able to show the real content.
    expect(container.textContent).toBe('ABC');

    suspend = false;
    await act(async () => {
      await resolve();
    });

    expect(container.textContent).toBe('ABC');
    // We've hydrated the same span.
    expect(ref.current).toBe(spanB);
  });

  // @gate enableSuspenseList
  it('shows is able to hydrate boundaries even if others in a list are pending', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();

    function Child({children}) {
      if (suspend) {
        throw promise;
      } else {
        return children;
      }
    }

    const promise2 = new Promise(() => {});
    function AlwaysSuspend() {
      throw promise2;
    }

    // This is hoisted to avoid them from rerendering.
    const a = (
      <Suspense fallback="Loading A">
        <Child>
          <span ref={ref}>A</span>
        </Child>
      </Suspense>
    );

    function App({showMore}) {
      return (
        <SuspenseList revealOrder="together">
          {a}
          {showMore ? (
            <Suspense fallback="Loading B">
              <AlwaysSuspend />
            </Suspense>
          ) : null}
        </SuspenseList>
      );
    }

    suspend = false;
    const html = ReactDOMServer.renderToString(<App showMore={false} />);

    const container = document.createElement('div');
    container.innerHTML = html;

    const spanA = container.getElementsByTagName('span')[0];

<<<<<<< HEAD
    const root = ReactDOMClient.hydrateRoot(
      container,
      <App showMore={false} />,
    );

    suspend = true;
    Scheduler.unstable_flushAll();
=======
    suspend = true;
    const root = await act(() =>
      ReactDOMClient.hydrateRoot(container, <App showMore={false} />),
    );
>>>>>>> remotes/upstream/main

    // We're not hydrated yet.
    expect(ref.current).toBe(null);
    expect(container.textContent).toBe('A');

    await act(async () => {
      // Add another row before we've hydrated the first one.
      root.render(<App showMore={true} />);
      // At the same time, we resolve the blocking promise.
      suspend = false;
      await resolve();
    });

    // We should have been able to hydrate the first row.
    expect(ref.current).toBe(spanA);
    // Even though we're still slowing B.
    expect(container.textContent).toBe('ALoading B');
  });

  // @gate enableSuspenseList
  it('clears server boundaries when SuspenseList runs out of time hydrating', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    const ref = React.createRef();

    function Child({children}) {
      if (suspend) {
        throw promise;
      } else {
        return children;
      }
    }

    function Before() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Before');
=======
      Scheduler.log('Before');
>>>>>>> remotes/upstream/main
      return null;
    }

    function After() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('After');
=======
      Scheduler.log('After');
>>>>>>> remotes/upstream/main
      return null;
    }

    function FirstRow() {
      return (
        <>
          <Before />
          <Suspense fallback="Loading A">
            <span>A</span>
          </Suspense>
          <After />
        </>
      );
    }

    function App() {
      return (
        <Suspense fallback={null}>
          <SuspenseList revealOrder="forwards" tail="hidden">
            <FirstRow />
            <Suspense fallback="Loading B">
              <Child>
                <span ref={ref}>B</span>
              </Child>
            </Suspense>
          </SuspenseList>
        </Suspense>
      );
    }

    suspend = false;
    const html = ReactDOMServer.renderToString(<App />);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Before', 'After']);
=======
    assertLog(['Before', 'After']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    container.innerHTML = html;

    const b = container.getElementsByTagName('span')[1];
    expect(b.textContent).toBe('B');

    const root = ReactDOMClient.hydrateRoot(container, <App />);

    // Increase hydration priority to higher than "offscreen".
    root.unstable_scheduleHydration(b);

    suspend = true;

    await act(async () => {
<<<<<<< HEAD
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        expect(Scheduler).toFlushAndYieldThrough(['Before', 'After']);
      } else {
        expect(Scheduler).toFlushAndYieldThrough(['Before']);
        // This took a long time to render.
        Scheduler.unstable_advanceTime(1000);
        expect(Scheduler).toFlushAndYield(['After']);
=======
      if (gate(flags => flags.forceConcurrentByDefaultForTesting)) {
        await waitFor(['Before']);
        // This took a long time to render.
        Scheduler.unstable_advanceTime(1000);
        await waitFor(['After']);
      } else {
        await waitFor(['Before', 'After']);
>>>>>>> remotes/upstream/main
      }

      // This will cause us to skip the second row completely.
    });

    // We haven't hydrated the second child but the placeholder is still in the list.
    expect(ref.current).toBe(null);
    expect(container.textContent).toBe('AB');

    suspend = false;
    await act(async () => {
      // Resolve the boundary to be in its resolved final state.
      await resolve();
    });

    expect(container.textContent).toBe('AB');
    expect(ref.current).toBe(b);
  });

  // @gate enableSuspenseList
  it('clears server boundaries when SuspenseList suspends last row hydrating', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    function Child({children}) {
      if (suspend) {
        throw promise;
      } else {
        return children;
      }
    }

    function App() {
      return (
        <Suspense fallback={null}>
          <SuspenseList revealOrder="forwards" tail="hidden">
            <Suspense fallback="Loading A">
              <span>A</span>
            </Suspense>
            <Suspense fallback="Loading B">
              <Child>
                <span>B</span>
              </Child>
            </Suspense>
          </SuspenseList>
        </Suspense>
      );
    }

    suspend = true;
    const html = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = html;

    ReactDOMClient.hydrateRoot(container, <App />, {
      onRecoverableError(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(error.message);
=======
        Scheduler.log(error.message);
>>>>>>> remotes/upstream/main
      },
    });

    suspend = true;
    if (__DEV__) {
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        'The server did not finish this Suspense boundary: The server used' +
          ' "renderToString" which does not support Suspense. If you intended' +
          ' for this Suspense boundary to render the fallback content on the' +
          ' server consider throwing an Error somewhere within the Suspense boundary.' +
          ' If you intended to have the server wait for the suspended component' +
          ' please switch to "renderToPipeableStream" which supports Suspense on the server',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        'The server could not finish this Suspense boundary, likely due to ' +
          'an error during server rendering. Switched to client rendering.',
      ]);
    }

    // We haven't hydrated the second child but the placeholder is still in the list.
    expect(container.textContent).toBe('ALoading B');

    suspend = false;
    await act(async () => {
      // Resolve the boundary to be in its resolved final state.
      await resolve();
    });

    expect(container.textContent).toBe('AB');
  });

  it('can client render nested boundaries', async () => {
    let suspend = false;
    const promise = new Promise(() => {});
    const ref = React.createRef();

    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    function App() {
      return (
        <div>
          <Suspense
            fallback={
              <>
                <Suspense fallback="Loading...">
                  <Child />
                </Suspense>
                <span>Inner Sibling</span>
              </>
            }>
            <Child />
          </Suspense>
          <span ref={ref}>Sibling</span>
        </div>
      );
    }

    suspend = true;
    const html = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = html + '<!--unrelated comment-->';

    const span = container.getElementsByTagName('span')[1];

    suspend = false;
    ReactDOMClient.hydrateRoot(container, <App />, {
      onRecoverableError(error) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(error.message);
      },
    });
    if (__DEV__) {
      expect(Scheduler).toFlushAndYield([
=======
        Scheduler.log(error.message);
      },
    });
    if (__DEV__) {
      await waitForAll([
>>>>>>> remotes/upstream/main
        'The server did not finish this Suspense boundary: The server used' +
          ' "renderToString" which does not support Suspense. If you intended' +
          ' for this Suspense boundary to render the fallback content on the' +
          ' server consider throwing an Error somewhere within the Suspense boundary.' +
          ' If you intended to have the server wait for the suspended component' +
          ' please switch to "renderToPipeableStream" which supports Suspense on the server',
      ]);
    } else {
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        'The server could not finish this Suspense boundary, likely due to ' +
          'an error during server rendering. Switched to client rendering.',
      ]);
    }
    jest.runAllTimers();

    expect(ref.current).toBe(span);
    expect(span.parentNode).not.toBe(null);

    // It leaves non-React comments alone.
    expect(container.lastChild.nodeType).toBe(8);
    expect(container.lastChild.data).toBe('unrelated comment');
  });

  it('can hydrate TWO suspense boundaries', async () => {
    const ref1 = React.createRef();
    const ref2 = React.createRef();

    function App() {
      return (
        <div>
          <Suspense fallback="Loading 1...">
            <span ref={ref1}>1</span>
          </Suspense>
          <Suspense fallback="Loading 2...">
            <span ref={ref2}>2</span>
          </Suspense>
        </div>
      );
    }

    // First we render the final HTML. With the streaming renderer
    // this may have suspense points on the server but here we want
    // to test the completed HTML. Don't suspend on the server.
    const finalHTML = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span1 = container.getElementsByTagName('span')[0];
    const span2 = container.getElementsByTagName('span')[1];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    ReactDOMClient.hydrateRoot(container, <App />);
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref1.current).toBe(span1);
    expect(ref2.current).toBe(span2);
  });

  it('regenerates if it cannot hydrate before changes to props/context expire', async () => {
    let suspend = false;
    const promise = new Promise(resolvePromise => {});
    const ref = React.createRef();
    const ClassName = React.createContext(null);

    function Child({text}) {
      const className = React.useContext(ClassName);
      if (suspend && className !== 'hi' && text !== 'Hi') {
        // Never suspends on the newer data.
        throw promise;
      } else {
        return (
          <span ref={ref} className={className}>
            {text}
          </span>
        );
      }
    }

    function App({text, className}) {
      return (
        <div>
          <Suspense fallback="Loading...">
            <Child text={text} />
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(
      <ClassName.Provider value={'hello'}>
        <App text="Hello" />
      </ClassName.Provider>,
    );
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    const root = ReactDOMClient.hydrateRoot(
      container,
      <ClassName.Provider value={'hello'}>
        <App text="Hello" />
      </ClassName.Provider>,
      {
        onRecoverableError(error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(error.message);
        },
      },
    );
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
          Scheduler.log(error.message);
        },
      },
    );
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref.current).toBe(null);
    expect(span.textContent).toBe('Hello');

    // Render an update, which will be higher or the same priority as pinging the hydration.
    // The new update doesn't suspend.
<<<<<<< HEAD
    root.render(
      <ClassName.Provider value={'hi'}>
        <App text="Hi" />
      </ClassName.Provider>,
    );

    // Since we're still suspended on the original data, we can't hydrate.
    // This will force all expiration times to flush.
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
    expect(Scheduler).toHaveYielded([
      'This Suspense boundary received an update before it finished ' +
        'hydrating. This caused the boundary to switch to client rendering. ' +
        'The usual way to fix this is to wrap the original update ' +
        'in startTransition.',
    ]);
=======
    // Since we're still suspended on the original data, we can't hydrate.
    // This will force all expiration times to flush.
    await act(() => {
      root.render(
        <ClassName.Provider value={'hi'}>
          <App text="Hi" />
        </ClassName.Provider>,
      );
    });
>>>>>>> remotes/upstream/main

    // This will now be a new span because we weren't able to hydrate before
    const newSpan = container.getElementsByTagName('span')[0];
    expect(newSpan).not.toBe(span);

    // We should now have fully rendered with a ref on the new span.
    expect(ref.current).toBe(newSpan);
    expect(newSpan.textContent).toBe('Hi');
    // If we ended up hydrating the existing content, we won't have properly
    // patched up the tree, which might mean we haven't patched the className.
    expect(newSpan.className).toBe('hi');
  });

  it('does not invoke an event on a hydrated node until it commits', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    function Sibling({text}) {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    let clicks = 0;

    function Button() {
      const [clicked, setClicked] = React.useState(false);
      if (clicked) {
        return null;
      }
      return (
        <a
          onClick={() => {
            setClicked(true);
            clicks++;
          }}>
          Click me
        </a>
      );
    }

    function App() {
      return (
        <div>
          <Suspense fallback="Loading...">
            <Button />
            <Sibling />
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    const a = container.getElementsByTagName('a')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    ReactDOMClient.hydrateRoot(container, <App />);
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(container.textContent).toBe('Click meHello');

    // We're now partially hydrated.
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      a.click();
    });
    expect(clicks).toBe(0);

    // Resolving the promise so that rendering can complete.
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
      expect(clicks).toBe(0);
      expect(container.textContent).toBe('Click meHello');
    } else {
      expect(clicks).toBe(1);
      expect(container.textContent).toBe('Hello');
    }
=======
    expect(clicks).toBe(0);
    expect(container.textContent).toBe('Click meHello');

>>>>>>> remotes/upstream/main
    document.body.removeChild(container);
  });

  // @gate www
  it('does not invoke an event on a hydrated event handle until it commits', async () => {
    const setClick = ReactDOM.unstable_createEventHandle('click');
    let suspend = false;
    let isServerRendering = true;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    function Sibling({text}) {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    const onEvent = jest.fn();

    function Button() {
      const ref = React.useRef(null);
      if (!isServerRendering) {
        React.useLayoutEffect(() => {
          return setClick(ref.current, onEvent);
        });
      }
      return <a ref={ref}>Click me</a>;
    }

    function App() {
      return (
        <div>
          <Suspense fallback="Loading...">
            <Button />
            <Sibling />
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    const a = container.getElementsByTagName('a')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    isServerRendering = false;
    ReactDOMClient.hydrateRoot(container, <App />);

    // We'll do one click before hydrating.
    a.click();
    // This should be delayed.
    expect(onEvent).toHaveBeenCalledTimes(0);

<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();

    // We're now partially hydrated.
    await act(async () => {
=======
    await waitForAll([]);

    // We're now partially hydrated.
    await act(() => {
>>>>>>> remotes/upstream/main
      a.click();
    });
    // We should not have invoked the event yet because we're not
    // yet hydrated.
    expect(onEvent).toHaveBeenCalledTimes(0);

    // Resolving the promise so that rendering can complete.
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
      expect(onEvent).toHaveBeenCalledTimes(0);
    } else {
      expect(onEvent).toHaveBeenCalledTimes(2);
    }
=======
    expect(onEvent).toHaveBeenCalledTimes(0);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  it('invokes discrete events on nested suspense boundaries in a root (legacy system)', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    let clicks = 0;

    function Button() {
      return (
        <a
          onClick={() => {
            clicks++;
          }}>
          Click me
        </a>
      );
    }

    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return (
          <Suspense fallback="Loading...">
            <Button />
          </Suspense>
        );
      }
    }

    function App() {
      return (
        <Suspense fallback="Loading...">
          <Child />
        </Suspense>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    const a = container.getElementsByTagName('a')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    ReactDOMClient.hydrateRoot(container, <App />);

    // We'll do one click before hydrating.
<<<<<<< HEAD
    await act(async () => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      a.click();
    });
    // This should be delayed.
    expect(clicks).toBe(0);

<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();

    // We're now partially hydrated.
    await act(async () => {
=======
    await waitForAll([]);

    // We're now partially hydrated.
    await act(() => {
>>>>>>> remotes/upstream/main
      a.click();
    });
    expect(clicks).toBe(0);

    // Resolving the promise so that rendering can complete.
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
      expect(clicks).toBe(0);
    } else {
      expect(clicks).toBe(2);
    }
=======
    expect(clicks).toBe(0);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  // @gate www
  it('invokes discrete events on nested suspense boundaries in a root (createEventHandle)', async () => {
    let suspend = false;
    let isServerRendering = true;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    const onEvent = jest.fn();
    const setClick = ReactDOM.unstable_createEventHandle('click');

    function Button() {
      const ref = React.useRef(null);

      if (!isServerRendering) {
        React.useLayoutEffect(() => {
          return setClick(ref.current, onEvent);
        });
      }

      return <a ref={ref}>Click me</a>;
    }

    function Child() {
      if (suspend) {
        throw promise;
      } else {
        return (
          <Suspense fallback="Loading...">
            <Button />
          </Suspense>
        );
      }
    }

    function App() {
      return (
        <Suspense fallback="Loading...">
          <Child />
        </Suspense>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    const a = container.getElementsByTagName('a')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    isServerRendering = false;
    ReactDOMClient.hydrateRoot(container, <App />);

    // We'll do one click before hydrating.
    a.click();
    // This should be delayed.
    expect(onEvent).toHaveBeenCalledTimes(0);

<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();

    // We're now partially hydrated.
    await act(async () => {
=======
    await waitForAll([]);

    // We're now partially hydrated.
    await act(() => {
>>>>>>> remotes/upstream/main
      a.click();
    });
    // We should not have invoked the event yet because we're not
    // yet hydrated.
    expect(onEvent).toHaveBeenCalledTimes(0);

    // Resolving the promise so that rendering can complete.
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
      expect(onEvent).toHaveBeenCalledTimes(0);
    } else {
      expect(onEvent).toHaveBeenCalledTimes(2);
    }
=======

    expect(onEvent).toHaveBeenCalledTimes(0);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  it('does not invoke the parent of dehydrated boundary event', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    let clicksOnParent = 0;
    let clicksOnChild = 0;

    function Child({text}) {
      if (suspend) {
        throw promise;
      } else {
        return (
          <span
            onClick={e => {
              // The stopPropagation is showing an example why invoking
              // the event on only a parent might not be correct.
              e.stopPropagation();
              clicksOnChild++;
            }}>
            Hello
          </span>
        );
      }
    }

    function App() {
      return (
        <div onClick={() => clicksOnParent++}>
          <Suspense fallback="Loading...">
            <Child />
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    const span = container.getElementsByTagName('span')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    ReactDOMClient.hydrateRoot(container, <App />);
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();

    // We're now partially hydrated.
    await act(async () => {
=======
    await waitForAll([]);

    // We're now partially hydrated.
    await act(() => {
>>>>>>> remotes/upstream/main
      span.click();
    });
    expect(clicksOnChild).toBe(0);
    expect(clicksOnParent).toBe(0);

    // Resolving the promise so that rendering can complete.
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
      expect(clicksOnChild).toBe(0);
      expect(clicksOnParent).toBe(0);
    } else {
      expect(clicksOnChild).toBe(1);
      // This will be zero due to the stopPropagation.
      expect(clicksOnParent).toBe(0);
    }
=======
    expect(clicksOnChild).toBe(0);
    expect(clicksOnParent).toBe(0);
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  it('does not invoke an event on a parent tree when a subtree is dehydrated', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    let clicks = 0;
    const childSlotRef = React.createRef();

    function Parent() {
      return <div onClick={() => clicks++} ref={childSlotRef} />;
    }

    function Child({text}) {
      if (suspend) {
        throw promise;
      } else {
        return <a>Click me</a>;
      }
    }

    function App() {
      // The root is a Suspense boundary.
      return (
        <Suspense fallback="Loading...">
          <Child />
        </Suspense>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);

    const parentContainer = document.createElement('div');
    const childContainer = document.createElement('div');

    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(parentContainer);

    // We're going to use a different root as a parent.
    // This lets us detect whether an event goes through React's event system.
    const parentRoot = ReactDOMClient.createRoot(parentContainer);
<<<<<<< HEAD
    parentRoot.render(<Parent />);
    Scheduler.unstable_flushAll();
=======
    await act(() => parentRoot.render(<Parent />));
>>>>>>> remotes/upstream/main

    childSlotRef.current.appendChild(childContainer);

    childContainer.innerHTML = finalHTML;

    const a = childContainer.getElementsByTagName('a')[0];

    suspend = true;

    // Hydrate asynchronously.
<<<<<<< HEAD
    ReactDOMClient.hydrateRoot(childContainer, <App />);
    jest.runAllTimers();
    Scheduler.unstable_flushAll();

    // The Suspense boundary is not yet hydrated.
    await act(async () => {
=======
    await act(() => ReactDOMClient.hydrateRoot(childContainer, <App />));

    // The Suspense boundary is not yet hydrated.
    await act(() => {
>>>>>>> remotes/upstream/main
      a.click();
    });
    expect(clicks).toBe(0);

    // Resolving the promise so that rendering can complete.
    await act(async () => {
      suspend = false;
      resolve();
      await promise;
    });

<<<<<<< HEAD
    // We're now full hydrated.
    if (
      gate(
        flags =>
          flags.enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay,
      )
    ) {
      expect(clicks).toBe(0);
    } else {
      expect(clicks).toBe(1);
    }
=======
    expect(clicks).toBe(0);
>>>>>>> remotes/upstream/main

    document.body.removeChild(parentContainer);
  });

  it('blocks only on the last continuous event (legacy system)', async () => {
    let suspend1 = false;
    let resolve1;
    const promise1 = new Promise(resolvePromise => (resolve1 = resolvePromise));
    let suspend2 = false;
    let resolve2;
    const promise2 = new Promise(resolvePromise => (resolve2 = resolvePromise));

    function First({text}) {
      if (suspend1) {
        throw promise1;
      } else {
        return 'Hello';
      }
    }

    function Second({text}) {
      if (suspend2) {
        throw promise2;
      } else {
        return 'World';
      }
    }

    const ops = [];

    function App() {
      return (
        <div>
          <Suspense fallback="Loading First...">
            <span
              onMouseEnter={() => ops.push('Mouse Enter First')}
              onMouseLeave={() => ops.push('Mouse Leave First')}
            />
            {/* We suspend after to test what happens when we eager
                attach the listener. */}
            <First />
          </Suspense>
          <Suspense fallback="Loading Second...">
            <span
              onMouseEnter={() => ops.push('Mouse Enter Second')}
              onMouseLeave={() => ops.push('Mouse Leave Second')}>
              <Second />
            </span>
          </Suspense>
        </div>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    const appDiv = container.getElementsByTagName('div')[0];
    const firstSpan = appDiv.getElementsByTagName('span')[0];
    const secondSpan = appDiv.getElementsByTagName('span')[1];
    expect(firstSpan.textContent).toBe('');
    expect(secondSpan.textContent).toBe('World');

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend1 = true;
    suspend2 = true;
    ReactDOMClient.hydrateRoot(container, <App />);

<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    dispatchMouseEvent(appDiv, null);
    dispatchMouseEvent(firstSpan, appDiv);
    dispatchMouseEvent(secondSpan, firstSpan);

    // Neither target is yet hydrated.
    expect(ops).toEqual([]);

    // Resolving the second promise so that rendering can complete.
    suspend2 = false;
    resolve2();
    await promise2;

<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    // We've unblocked the current hover target so we should be
    // able to replay it now.
    expect(ops).toEqual(['Mouse Enter Second']);

    // Resolving the first promise has no effect now.
    suspend1 = false;
    resolve1();
    await promise1;

<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ops).toEqual(['Mouse Enter Second']);

    document.body.removeChild(container);
  });

  it('finishes normal pri work before continuing to hydrate a retry', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));
    const ref = React.createRef();

    function Child() {
      if (suspend) {
        throw promise;
      } else {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Child');
=======
        Scheduler.log('Child');
>>>>>>> remotes/upstream/main
        return 'Hello';
      }
    }

    function Sibling() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('Sibling');
      React.useLayoutEffect(() => {
        Scheduler.unstable_yieldValue('Commit Sibling');
=======
      Scheduler.log('Sibling');
      React.useLayoutEffect(() => {
        Scheduler.log('Commit Sibling');
>>>>>>> remotes/upstream/main
      });
      return 'World';
    }

    // Avoid rerendering the tree by hoisting it.
    const tree = (
      <Suspense fallback="Loading...">
        <span ref={ref}>
          <Child />
        </span>
      </Suspense>
    );

    function App({showSibling}) {
      return (
        <div>
          {tree}
          {showSibling ? <Sibling /> : null}
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Child']);
=======
    assertLog(['Child']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    suspend = true;
    const root = ReactDOMClient.hydrateRoot(
      container,
      <App showSibling={false} />,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(ref.current).toBe(null);
    expect(container.textContent).toBe('Hello');

    // Resolving the promise should continue hydration
    suspend = false;
    resolve();
    await promise;

    Scheduler.unstable_advanceTime(100);

    // Before we have a chance to flush it, we'll also render an update.
    root.render(<App showSibling={true} />);

    // When we flush we expect the Normal pri render to take priority
    // over hydration.
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough(['Sibling', 'Commit Sibling']);
=======
    await waitFor(['Sibling', 'Commit Sibling']);
>>>>>>> remotes/upstream/main

    // We shouldn't have hydrated the child yet.
    expect(ref.current).toBe(null);
    // But we did have a chance to update the content.
    expect(container.textContent).toBe('HelloWorld');

<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield(['Child']);
=======
    await waitForAll(['Child']);
>>>>>>> remotes/upstream/main

    // Now we're hydrated.
    expect(ref.current).not.toBe(null);
  });

  it('regression test: does not overfire non-bubbling browser events', async () => {
    let suspend = false;
    let resolve;
    const promise = new Promise(resolvePromise => (resolve = resolvePromise));

    function Sibling({text}) {
      if (suspend) {
        throw promise;
      } else {
        return 'Hello';
      }
    }

    let submits = 0;

    function Form() {
      const [submitted, setSubmitted] = React.useState(false);
      if (submitted) {
        return null;
      }
      return (
        <form
          onSubmit={() => {
            setSubmitted(true);
            submits++;
          }}>
          Click me
        </form>
      );
    }

    function App() {
      return (
        <div>
          <Suspense fallback="Loading...">
            <Form />
            <Sibling />
          </Suspense>
        </div>
      );
    }

    suspend = false;
    const finalHTML = ReactDOMServer.renderToString(<App />);
    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // We need this to be in the document since we'll dispatch events on it.
    document.body.appendChild(container);

    const form = container.getElementsByTagName('form')[0];

    // On the client we don't have all data yet but we want to start
    // hydrating anyway.
    suspend = true;
    ReactDOMClient.hydrateRoot(container, <App />);
<<<<<<< HEAD
    Scheduler.unstable_flushAll();
    jest.runAllTimers();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    expect(container.textContent).toBe('Click meHello');

    // We're now partially hydrated.
<<<<<<< HEAD
    await act(async () => {
      form.dispatchEvent(
        new Event('submit', {
=======
    await act(() => {
      form.dispatchEvent(
        new window.Event('submit', {
>>>>>>> remotes/upstream/main
          bubbles: true,
        }),
      );
    });
    expect(submits).toBe(0);

    // Resolving the promise so that rendering can complete.
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
      // discrete event not replayed
      expect(submits).toBe(0);
      expect(container.textContent).toBe('Click meHello');
    } else {
      expect(submits).toBe(1);
      expect(container.textContent).toBe('Hello');
    }
=======
    // discrete event not replayed
    expect(submits).toBe(0);
    expect(container.textContent).toBe('Click meHello');
>>>>>>> remotes/upstream/main

    document.body.removeChild(container);
  });

  // This test fails, in both forks. Without a boundary, the deferred tree won't
  // re-enter hydration mode. It doesn't come up in practice because there's
  // always a parent Suspense boundary. But it's still a bug. Leaving for a
  // follow up.
  //
  // @gate FIXME
  it('hydrates a hidden subtree outside of a Suspense boundary', async () => {
    const ref = React.createRef();

    function App() {
      return (
        <LegacyHiddenDiv mode="hidden">
          <span ref={ref}>Hidden child</span>
        </LegacyHiddenDiv>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];
    expect(span.innerHTML).toBe('Hidden child');

<<<<<<< HEAD
    ReactDOMClient.hydrateRoot(container, <App />, {
      onRecoverableError(error) {
        Scheduler.unstable_yieldValue(
          'Log recoverable error: ' + error.message,
        );
      },
    });

    Scheduler.unstable_flushAll();
=======
    await act(() =>
      ReactDOMClient.hydrateRoot(container, <App />, {
        onRecoverableError(error) {
          Scheduler.log('Log recoverable error: ' + error.message);
        },
      }),
    );

>>>>>>> remotes/upstream/main
    expect(ref.current).toBe(span);
    expect(span.innerHTML).toBe('Hidden child');
  });

  // @gate www
  it('renders a hidden LegacyHidden component inside a Suspense boundary', async () => {
    const ref = React.createRef();

    function App() {
      return (
        <Suspense fallback="Loading...">
          <LegacyHiddenDiv mode="hidden">
            <span ref={ref}>Hidden child</span>
          </LegacyHiddenDiv>
        </Suspense>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];
    expect(span.innerHTML).toBe('Hidden child');

<<<<<<< HEAD
    ReactDOMClient.hydrateRoot(container, <App />);
    Scheduler.unstable_flushAll();
=======
    await act(() => ReactDOMClient.hydrateRoot(container, <App />));
>>>>>>> remotes/upstream/main
    expect(ref.current).toBe(span);
    expect(span.innerHTML).toBe('Hidden child');
  });

  // @gate www
  it('renders a visible LegacyHidden component', async () => {
    const ref = React.createRef();

    function App() {
      return (
        <LegacyHiddenDiv mode="visible">
          <span ref={ref}>Hidden child</span>
        </LegacyHiddenDiv>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    const span = container.getElementsByTagName('span')[0];

<<<<<<< HEAD
    ReactDOMClient.hydrateRoot(container, <App />);
    Scheduler.unstable_flushAll();
=======
    await act(() => ReactDOMClient.hydrateRoot(container, <App />));
>>>>>>> remotes/upstream/main
    expect(ref.current).toBe(span);
    expect(ref.current.innerHTML).toBe('Hidden child');
  });

  // @gate enableOffscreen
  it('a visible Offscreen component acts like a fragment', async () => {
    const ref = React.createRef();

    function App() {
      return (
        <Offscreen mode="visible">
          <span ref={ref}>Child</span>
        </Offscreen>
      );
    }

    const finalHTML = ReactDOMServer.renderToString(<App />);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // Visible Offscreen boundaries behave exactly like fragments: a
    // pure indirection.
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          Child
        </span>
      </div>
    `);

    const span = container.getElementsByTagName('span')[0];

    // The tree successfully hydrates
    ReactDOMClient.hydrateRoot(container, <App />);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(ref.current).toBe(span);
  });

  // @gate enableOffscreen
  it('a hidden Offscreen component is skipped over during server rendering', async () => {
    const visibleRef = React.createRef();

    function HiddenChild() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('HiddenChild');
=======
      Scheduler.log('HiddenChild');
>>>>>>> remotes/upstream/main
      return <span>Hidden</span>;
    }

    function App() {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('App');
=======
      Scheduler.log('App');
>>>>>>> remotes/upstream/main
      return (
        <>
          <span ref={visibleRef}>Visible</span>
          <Offscreen mode="hidden">
            <HiddenChild />
          </Offscreen>
        </>
      );
    }

    // During server rendering, the Child component should not be evaluated,
    // because it's inside a hidden tree.
    const finalHTML = ReactDOMServer.renderToString(<App />);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['App']);
=======
    assertLog(['App']);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    container.innerHTML = finalHTML;

    // The hidden child is not part of the server rendered HTML
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          Visible
        </span>
      </div>
    `);

    const visibleSpan = container.getElementsByTagName('span')[0];

    // The visible span successfully hydrates
    ReactDOMClient.hydrateRoot(container, <App />);
<<<<<<< HEAD
    expect(Scheduler).toFlushUntilNextPaint(['App']);
    expect(visibleRef.current).toBe(visibleSpan);

    // Subsequently, the hidden child is prerendered on the client
    expect(Scheduler).toFlushUntilNextPaint(['HiddenChild']);
=======
    await waitForPaint(['App']);
    expect(visibleRef.current).toBe(visibleSpan);

    // Subsequently, the hidden child is prerendered on the client
    await waitForPaint(['HiddenChild']);
>>>>>>> remotes/upstream/main
    expect(container).toMatchInlineSnapshot(`
      <div>
        <span>
          Visible
        </span>
        <span
          style="display: none;"
        >
          Hidden
        </span>
      </div>
    `);
  });

  function itHydratesWithoutMismatch(msg, App) {
<<<<<<< HEAD
    it('hydrates without mismatch ' + msg, () => {
=======
    it('hydrates without mismatch ' + msg, async () => {
>>>>>>> remotes/upstream/main
      const container = document.createElement('div');
      document.body.appendChild(container);
      const finalHTML = ReactDOMServer.renderToString(<App />);
      container.innerHTML = finalHTML;

<<<<<<< HEAD
      ReactDOMClient.hydrateRoot(container, <App />);
      Scheduler.unstable_flushAll();
=======
      await act(() => ReactDOMClient.hydrateRoot(container, <App />));
>>>>>>> remotes/upstream/main
    });
  }

  itHydratesWithoutMismatch('an empty string with neighbors', function App() {
    return (
      <div>
        <div id="test">Test</div>
        {'' && <div>Test</div>}
        {'Test'}
      </div>
    );
  });

  itHydratesWithoutMismatch('an empty string', function App() {
    return '';
  });
  itHydratesWithoutMismatch(
    'an empty string simple in fragment',
    function App() {
      return (
        <>
          {''}
          {'sup'}
        </>
      );
    },
  );
  itHydratesWithoutMismatch(
    'an empty string simple in suspense',
    function App() {
      return <Suspense>{'' && false}</Suspense>;
    },
  );

  itHydratesWithoutMismatch('an empty string in class component', TestAppClass);

  it('fallback to client render on hydration mismatch at root', async () => {
<<<<<<< HEAD
    let isClient = false;
=======
>>>>>>> remotes/upstream/main
    let suspend = true;
    let resolve;
    const promise = new Promise((res, rej) => {
      resolve = () => {
        suspend = false;
        res();
      };
    });
<<<<<<< HEAD
    function App() {
      return (
        <>
          <Suspense fallback={<div>Loading</div>}>
            <ChildThatSuspends id={1} />
          </Suspense>
          {isClient ? <span>client</span> : <div>server</div>}
          <Suspense fallback={<div>Loading</div>}>
            <ChildThatSuspends id={2} />
=======
    function App({isClient}) {
      return (
        <>
          <Suspense fallback={<div>Loading</div>}>
            <ChildThatSuspends id={1} isClient={isClient} />
          </Suspense>
          {isClient ? <span>client</span> : <div>server</div>}
          <Suspense fallback={<div>Loading</div>}>
            <ChildThatSuspends id={2} isClient={isClient} />
>>>>>>> remotes/upstream/main
          </Suspense>
        </>
      );
    }
<<<<<<< HEAD
    function ChildThatSuspends({id}) {
=======
    function ChildThatSuspends({id, isClient}) {
>>>>>>> remotes/upstream/main
      if (isClient && suspend) {
        throw promise;
      }
      return <div>{id}</div>;
    }

<<<<<<< HEAD
    const finalHTML = ReactDOMServer.renderToString(<App />);
=======
    const finalHTML = ReactDOMServer.renderToString(<App isClient={false} />);
>>>>>>> remotes/upstream/main

    const container = document.createElement('div');
    document.body.appendChild(container);
    container.innerHTML = finalHTML;
<<<<<<< HEAD
    isClient = true;

    expect(() => {
      act(() => {
        ReactDOMClient.hydrateRoot(container, <App />, {
          onRecoverableError(error) {
            Scheduler.unstable_yieldValue(
              'Log recoverable error: ' + error.message,
            );
=======

    await expect(async () => {
      await act(() => {
        ReactDOMClient.hydrateRoot(container, <App isClient={true} />, {
          onRecoverableError(error) {
            Scheduler.log('Log recoverable error: ' + error.message);
>>>>>>> remotes/upstream/main
          },
        });
      });
    }).toErrorDev(
      [
        'Warning: An error occurred during hydration. ' +
          'The server HTML was replaced with client content in <div>.',
        'Warning: Expected server HTML to contain a matching <span> in <div>.\n' +
          '    in span (at **)\n' +
          '    in App (at **)',
      ],
      {withoutStack: 1},
    );
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
      'Log recoverable error: Hydration failed because the initial UI does not match what was rendered on the server.',
      // TODO: There were multiple mismatches in a single container. Should
      // we attempt to de-dupe them?
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'Log recoverable error: Hydration failed because the initial UI does not match what was rendered on the server.',
      'Log recoverable error: There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.',
    ]);

    // We show fallback state when mismatch happens at root
    expect(container.innerHTML).toEqual(
      '<div>Loading</div><span>client</span><div>Loading</div>',
    );

    await act(async () => {
      resolve();
      await promise;
    });

    expect(container.innerHTML).toEqual(
      '<div>1</div><span>client</span><div>2</div>',
    );
  });

  // @gate enableClientRenderFallbackOnTextMismatch
  it("falls back to client rendering when there's a text mismatch (direct text child)", async () => {
    function DirectTextChild({text}) {
      return <div>{text}</div>;
    }
    const container = document.createElement('div');
    container.innerHTML = ReactDOMServer.renderToString(
      <DirectTextChild text="good" />,
    );
<<<<<<< HEAD
    expect(() => {
      act(() => {
        ReactDOMClient.hydrateRoot(container, <DirectTextChild text="bad" />, {
          onRecoverableError(error) {
            Scheduler.unstable_yieldValue(error.message);
=======
    await expect(async () => {
      await act(() => {
        ReactDOMClient.hydrateRoot(container, <DirectTextChild text="bad" />, {
          onRecoverableError(error) {
            Scheduler.log(error.message);
>>>>>>> remotes/upstream/main
          },
        });
      });
    }).toErrorDev(
      [
        'Text content did not match. Server: "good" Client: "bad"',
        'An error occurred during hydration. The server HTML was replaced with ' +
          'client content in <div>.',
      ],
      {withoutStack: 1},
    );
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'Text content does not match server-rendered HTML.',
      'There was an error while hydrating. Because the error happened outside ' +
        'of a Suspense boundary, the entire root will switch to client rendering.',
    ]);
  });

  // @gate enableClientRenderFallbackOnTextMismatch
  it("falls back to client rendering when there's a text mismatch (text child with siblings)", async () => {
    function Sibling() {
      return 'Sibling';
    }

    function TextChildWithSibling({text}) {
      return (
        <div>
          <Sibling />
          {text}
        </div>
      );
    }
    const container2 = document.createElement('div');
    container2.innerHTML = ReactDOMServer.renderToString(
      <TextChildWithSibling text="good" />,
    );
<<<<<<< HEAD
    expect(() => {
      act(() => {
=======
    await expect(async () => {
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactDOMClient.hydrateRoot(
          container2,
          <TextChildWithSibling text="bad" />,
          {
            onRecoverableError(error) {
<<<<<<< HEAD
              Scheduler.unstable_yieldValue(error.message);
=======
              Scheduler.log(error.message);
>>>>>>> remotes/upstream/main
            },
          },
        );
      });
    }).toErrorDev(
      [
        'Text content did not match. Server: "good" Client: "bad"',
        'An error occurred during hydration. The server HTML was replaced with ' +
          'client content in <div>.',
      ],
      {withoutStack: 1},
    );
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'Text content does not match server-rendered HTML.',
      'There was an error while hydrating. Because the error happened outside ' +
        'of a Suspense boundary, the entire root will switch to client rendering.',
    ]);
  });
});
