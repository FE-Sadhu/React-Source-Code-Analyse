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
let Scheduler;
let act;
let container;
<<<<<<< HEAD
=======
let waitForAll;
let assertLog;
let fakeModuleCache;
>>>>>>> remotes/upstream/main

describe('ReactSuspenseEffectsSemanticsDOM', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    ReactDOM = require('react-dom');
    ReactDOMClient = require('react-dom/client');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;

    container = document.createElement('div');
    document.body.appendChild(container);
=======
    act = require('internal-test-utils').act;

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    assertLog = InternalTestUtils.assertLog;

    container = document.createElement('div');
    document.body.appendChild(container);

    fakeModuleCache = new Map();
>>>>>>> remotes/upstream/main
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

<<<<<<< HEAD
  async function fakeImport(result) {
    return {default: result};
  }

  function Text(props) {
    Scheduler.unstable_yieldValue(props.text);
    return props.text;
  }

  it('should not cause a cycle when combined with a render phase update', () => {
=======
  async function fakeImport(Component) {
    const record = fakeModuleCache.get(Component);
    if (record === undefined) {
      const newRecord = {
        status: 'pending',
        value: {default: Component},
        pings: [],
        then(ping) {
          switch (newRecord.status) {
            case 'pending': {
              newRecord.pings.push(ping);
              return;
            }
            case 'resolved': {
              ping(newRecord.value);
              return;
            }
            case 'rejected': {
              throw newRecord.value;
            }
          }
        },
      };
      fakeModuleCache.set(Component, newRecord);
      return newRecord;
    }
    return record;
  }

  function resolveFakeImport(moduleName) {
    const record = fakeModuleCache.get(moduleName);
    if (record === undefined) {
      throw new Error('Module not found');
    }
    if (record.status !== 'pending') {
      throw new Error('Module already resolved');
    }
    record.status = 'resolved';
    record.pings.forEach(ping => ping(record.value));
  }

  function Text(props) {
    Scheduler.log(props.text);
    return props.text;
  }

  it('should not cause a cycle when combined with a render phase update', async () => {
>>>>>>> remotes/upstream/main
    let scheduleSuspendingUpdate;

    function App() {
      const [value, setValue] = React.useState(true);

      scheduleSuspendingUpdate = () => setValue(!value);

      return (
        <>
          <React.Suspense fallback="Loading...">
            <ComponentThatCausesBug value={value} />
            <ComponentThatSuspendsOnUpdate shouldSuspend={!value} />
          </React.Suspense>
        </>
      );
    }

    function ComponentThatCausesBug({value}) {
      const [mirroredValue, setMirroredValue] = React.useState(value);
      if (mirroredValue !== value) {
        setMirroredValue(value);
      }

      // eslint-disable-next-line no-unused-vars
      const [_, setRef] = React.useState(null);

      return <div ref={setRef} />;
    }

<<<<<<< HEAD
    const promise = Promise.resolve();
=======
    const neverResolves = {then() {}};
>>>>>>> remotes/upstream/main

    function ComponentThatSuspendsOnUpdate({shouldSuspend}) {
      if (shouldSuspend) {
        // Fake Suspend
<<<<<<< HEAD
        throw promise;
=======
        throw neverResolves;
>>>>>>> remotes/upstream/main
      }
      return null;
    }

<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      const root = ReactDOMClient.createRoot(container);
      root.render(<App />);
    });

<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      scheduleSuspendingUpdate();
    });
  });

  it('does not destroy ref cleanup twice when hidden child is removed', async () => {
    function ChildA({label}) {
      return (
        <span
          ref={node => {
            if (node) {
<<<<<<< HEAD
              Scheduler.unstable_yieldValue('Ref mount: ' + label);
            } else {
              Scheduler.unstable_yieldValue('Ref unmount: ' + label);
=======
              Scheduler.log('Ref mount: ' + label);
            } else {
              Scheduler.log('Ref unmount: ' + label);
>>>>>>> remotes/upstream/main
            }
          }}>
          <Text text={label} />
        </span>
      );
    }

    function ChildB({label}) {
      return (
        <span
          ref={node => {
            if (node) {
<<<<<<< HEAD
              Scheduler.unstable_yieldValue('Ref mount: ' + label);
            } else {
              Scheduler.unstable_yieldValue('Ref unmount: ' + label);
=======
              Scheduler.log('Ref mount: ' + label);
            } else {
              Scheduler.log('Ref unmount: ' + label);
>>>>>>> remotes/upstream/main
            }
          }}>
          <Text text={label} />
        </span>
      );
    }

    const LazyChildA = React.lazy(() => fakeImport(ChildA));
    const LazyChildB = React.lazy(() => fakeImport(ChildB));

    function Parent({swap}) {
      return (
        <React.Suspense fallback={<Text text="Loading..." />}>
          {swap ? <LazyChildB label="B" /> : <LazyChildA label="A" />}
        </React.Suspense>
      );
    }

    const root = ReactDOMClient.createRoot(container);
<<<<<<< HEAD
    act(() => {
      root.render(<Parent swap={false} />);
    });
    expect(Scheduler).toHaveYielded(['Loading...']);

    await LazyChildA;
    expect(Scheduler).toFlushAndYield(['A', 'Ref mount: A']);
=======
    await act(() => {
      root.render(<Parent swap={false} />);
    });
    assertLog(['Loading...']);

    await act(() => resolveFakeImport(ChildA));
    assertLog(['A', 'Ref mount: A']);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('<span>A</span>');

    // Swap the position of A and B
    ReactDOM.flushSync(() => {
      root.render(<Parent swap={true} />);
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Loading...', 'Ref unmount: A']);
=======
    assertLog(['Loading...', 'Ref unmount: A']);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe(
      '<span style="display: none;">A</span>Loading...',
    );

<<<<<<< HEAD
    await LazyChildB;
    expect(Scheduler).toFlushAndYield(['B', 'Ref mount: B']);
=======
    await act(() => resolveFakeImport(ChildB));
    assertLog(['B', 'Ref mount: B']);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('<span>B</span>');
  });

  it('does not call componentWillUnmount twice when hidden child is removed', async () => {
    class ChildA extends React.Component {
      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Did mount: ' + this.props.label);
      }
      componentWillUnmount() {
        Scheduler.unstable_yieldValue('Will unmount: ' + this.props.label);
=======
        Scheduler.log('Did mount: ' + this.props.label);
      }
      componentWillUnmount() {
        Scheduler.log('Will unmount: ' + this.props.label);
>>>>>>> remotes/upstream/main
      }
      render() {
        return <Text text={this.props.label} />;
      }
    }

    class ChildB extends React.Component {
      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Did mount: ' + this.props.label);
      }
      componentWillUnmount() {
        Scheduler.unstable_yieldValue('Will unmount: ' + this.props.label);
=======
        Scheduler.log('Did mount: ' + this.props.label);
      }
      componentWillUnmount() {
        Scheduler.log('Will unmount: ' + this.props.label);
>>>>>>> remotes/upstream/main
      }
      render() {
        return <Text text={this.props.label} />;
      }
    }

    const LazyChildA = React.lazy(() => fakeImport(ChildA));
    const LazyChildB = React.lazy(() => fakeImport(ChildB));

    function Parent({swap}) {
      return (
        <React.Suspense fallback={<Text text="Loading..." />}>
          {swap ? <LazyChildB label="B" /> : <LazyChildA label="A" />}
        </React.Suspense>
      );
    }

    const root = ReactDOMClient.createRoot(container);
<<<<<<< HEAD
    act(() => {
      root.render(<Parent swap={false} />);
    });
    expect(Scheduler).toHaveYielded(['Loading...']);

    await LazyChildA;
    expect(Scheduler).toFlushAndYield(['A', 'Did mount: A']);
=======
    await act(() => {
      root.render(<Parent swap={false} />);
    });
    assertLog(['Loading...']);

    await act(() => resolveFakeImport(ChildA));
    assertLog(['A', 'Did mount: A']);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('A');

    // Swap the position of A and B
    ReactDOM.flushSync(() => {
      root.render(<Parent swap={true} />);
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Loading...', 'Will unmount: A']);
    expect(container.innerHTML).toBe('Loading...');

    await LazyChildB;
    expect(Scheduler).toFlushAndYield(['B', 'Did mount: B']);
=======
    assertLog(['Loading...', 'Will unmount: A']);
    expect(container.innerHTML).toBe('Loading...');

    await act(() => resolveFakeImport(ChildB));
    assertLog(['B', 'Did mount: B']);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('B');
  });

  it('does not destroy layout effects twice when parent suspense is removed', async () => {
    function ChildA({label}) {
      React.useLayoutEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Did mount: ' + label);
        return () => {
          Scheduler.unstable_yieldValue('Will unmount: ' + label);
=======
        Scheduler.log('Did mount: ' + label);
        return () => {
          Scheduler.log('Will unmount: ' + label);
>>>>>>> remotes/upstream/main
        };
      }, []);
      return <Text text={label} />;
    }
    function ChildB({label}) {
      React.useLayoutEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Did mount: ' + label);
        return () => {
          Scheduler.unstable_yieldValue('Will unmount: ' + label);
=======
        Scheduler.log('Did mount: ' + label);
        return () => {
          Scheduler.log('Will unmount: ' + label);
>>>>>>> remotes/upstream/main
        };
      }, []);
      return <Text text={label} />;
    }
    const LazyChildA = React.lazy(() => fakeImport(ChildA));
    const LazyChildB = React.lazy(() => fakeImport(ChildB));

    function Parent({swap}) {
      return (
        <React.Suspense fallback={<Text text="Loading..." />}>
          {swap ? <LazyChildB label="B" /> : <LazyChildA label="A" />}
        </React.Suspense>
      );
    }

    const root = ReactDOMClient.createRoot(container);
<<<<<<< HEAD
    act(() => {
      root.render(<Parent swap={false} />);
    });
    expect(Scheduler).toHaveYielded(['Loading...']);

    await LazyChildA;
    expect(Scheduler).toFlushAndYield(['A', 'Did mount: A']);
=======
    await act(() => {
      root.render(<Parent swap={false} />);
    });
    assertLog(['Loading...']);

    await act(() => resolveFakeImport(ChildA));
    assertLog(['A', 'Did mount: A']);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('A');

    // Swap the position of A and B
    ReactDOM.flushSync(() => {
      root.render(<Parent swap={true} />);
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Loading...', 'Will unmount: A']);
=======
    assertLog(['Loading...', 'Will unmount: A']);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('Loading...');

    // Destroy the whole tree, including the hidden A
    ReactDOM.flushSync(() => {
      root.render(<h1>Hello</h1>);
    });
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('<h1>Hello</h1>');
  });

  it('does not destroy ref cleanup twice when parent suspense is removed', async () => {
    function ChildA({label}) {
      return (
        <span
          ref={node => {
            if (node) {
<<<<<<< HEAD
              Scheduler.unstable_yieldValue('Ref mount: ' + label);
            } else {
              Scheduler.unstable_yieldValue('Ref unmount: ' + label);
=======
              Scheduler.log('Ref mount: ' + label);
            } else {
              Scheduler.log('Ref unmount: ' + label);
>>>>>>> remotes/upstream/main
            }
          }}>
          <Text text={label} />
        </span>
      );
    }

    function ChildB({label}) {
      return (
        <span
          ref={node => {
            if (node) {
<<<<<<< HEAD
              Scheduler.unstable_yieldValue('Ref mount: ' + label);
            } else {
              Scheduler.unstable_yieldValue('Ref unmount: ' + label);
=======
              Scheduler.log('Ref mount: ' + label);
            } else {
              Scheduler.log('Ref unmount: ' + label);
>>>>>>> remotes/upstream/main
            }
          }}>
          <Text text={label} />
        </span>
      );
    }

    const LazyChildA = React.lazy(() => fakeImport(ChildA));
    const LazyChildB = React.lazy(() => fakeImport(ChildB));

    function Parent({swap}) {
      return (
        <React.Suspense fallback={<Text text="Loading..." />}>
          {swap ? <LazyChildB label="B" /> : <LazyChildA label="A" />}
        </React.Suspense>
      );
    }

    const root = ReactDOMClient.createRoot(container);
<<<<<<< HEAD
    act(() => {
      root.render(<Parent swap={false} />);
    });
    expect(Scheduler).toHaveYielded(['Loading...']);

    await LazyChildA;
    expect(Scheduler).toFlushAndYield(['A', 'Ref mount: A']);
=======
    await act(() => {
      root.render(<Parent swap={false} />);
    });
    assertLog(['Loading...']);

    await act(() => resolveFakeImport(ChildA));
    assertLog(['A', 'Ref mount: A']);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('<span>A</span>');

    // Swap the position of A and B
    ReactDOM.flushSync(() => {
      root.render(<Parent swap={true} />);
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Loading...', 'Ref unmount: A']);
=======
    assertLog(['Loading...', 'Ref unmount: A']);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe(
      '<span style="display: none;">A</span>Loading...',
    );

    // Destroy the whole tree, including the hidden A
    ReactDOM.flushSync(() => {
      root.render(<h1>Hello</h1>);
    });
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('<h1>Hello</h1>');
  });

  it('does not call componentWillUnmount twice when parent suspense is removed', async () => {
    class ChildA extends React.Component {
      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Did mount: ' + this.props.label);
      }
      componentWillUnmount() {
        Scheduler.unstable_yieldValue('Will unmount: ' + this.props.label);
=======
        Scheduler.log('Did mount: ' + this.props.label);
      }
      componentWillUnmount() {
        Scheduler.log('Will unmount: ' + this.props.label);
>>>>>>> remotes/upstream/main
      }
      render() {
        return <Text text={this.props.label} />;
      }
    }

    class ChildB extends React.Component {
      componentDidMount() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Did mount: ' + this.props.label);
      }
      componentWillUnmount() {
        Scheduler.unstable_yieldValue('Will unmount: ' + this.props.label);
=======
        Scheduler.log('Did mount: ' + this.props.label);
      }
      componentWillUnmount() {
        Scheduler.log('Will unmount: ' + this.props.label);
>>>>>>> remotes/upstream/main
      }
      render() {
        return <Text text={this.props.label} />;
      }
    }

    const LazyChildA = React.lazy(() => fakeImport(ChildA));
    const LazyChildB = React.lazy(() => fakeImport(ChildB));

    function Parent({swap}) {
      return (
        <React.Suspense fallback={<Text text="Loading..." />}>
          {swap ? <LazyChildB label="B" /> : <LazyChildA label="A" />}
        </React.Suspense>
      );
    }

    const root = ReactDOMClient.createRoot(container);
<<<<<<< HEAD
    act(() => {
      root.render(<Parent swap={false} />);
    });
    expect(Scheduler).toHaveYielded(['Loading...']);

    await LazyChildA;
    expect(Scheduler).toFlushAndYield(['A', 'Did mount: A']);
=======
    await act(() => {
      root.render(<Parent swap={false} />);
    });
    assertLog(['Loading...']);

    await act(() => resolveFakeImport(ChildA));
    assertLog(['A', 'Did mount: A']);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('A');

    // Swap the position of A and B
    ReactDOM.flushSync(() => {
      root.render(<Parent swap={true} />);
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Loading...', 'Will unmount: A']);
=======
    assertLog(['Loading...', 'Will unmount: A']);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('Loading...');

    // Destroy the whole tree, including the hidden A
    ReactDOM.flushSync(() => {
      root.render(<h1>Hello</h1>);
    });
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYield([]);
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(container.innerHTML).toBe('<h1>Hello</h1>');
  });

  it('regression: unmount hidden tree, in legacy mode', async () => {
    // In legacy mode, when a tree suspends and switches to a fallback, the
    // effects are not unmounted. So we have to unmount them during a deletion.

    function Child() {
      React.useLayoutEffect(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('Mount');
        return () => {
          Scheduler.unstable_yieldValue('Unmount');
=======
        Scheduler.log('Mount');
        return () => {
          Scheduler.log('Unmount');
>>>>>>> remotes/upstream/main
        };
      }, []);
      return <Text text="Child" />;
    }

    function Sibling() {
      return <Text text="Sibling" />;
    }
    const LazySibling = React.lazy(() => fakeImport(Sibling));

    function App({showMore}) {
      return (
        <React.Suspense fallback={<Text text="Loading..." />}>
          <Child />
          {showMore ? <LazySibling /> : null}
        </React.Suspense>
      );
    }

    // Initial render
    ReactDOM.render(<App showMore={false} />, container);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Child', 'Mount']);
=======
    assertLog(['Child', 'Mount']);
>>>>>>> remotes/upstream/main

    // Update that suspends, causing the existing tree to switches it to
    // a fallback.
    ReactDOM.render(<App showMore={true} />, container);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([
=======
    assertLog([
>>>>>>> remotes/upstream/main
      'Child',
      'Loading...',

      // In a concurrent root, the effect would unmount here. But this is legacy
      // mode, so it doesn't.
      // Unmount
    ]);

    // Delete the tree and unmount the effect
    ReactDOM.render(null, container);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Unmount']);
=======
    assertLog(['Unmount']);
  });

  it('does not call cleanup effects twice after a bailout', async () => {
    const never = new Promise(resolve => {});
    function Never() {
      throw never;
    }

    let setSuspended;
    let setLetter;

    function App() {
      const [suspended, _setSuspended] = React.useState(false);
      setSuspended = _setSuspended;
      const [letter, _setLetter] = React.useState('A');
      setLetter = _setLetter;

      return (
        <React.Suspense fallback="Loading...">
          <Child letter={letter} />
          {suspended && <Never />}
        </React.Suspense>
      );
    }

    let nextId = 0;
    const freed = new Set();
    let setStep;

    function Child({letter}) {
      const [, _setStep] = React.useState(0);
      setStep = _setStep;

      React.useLayoutEffect(() => {
        const localId = nextId++;
        Scheduler.log('Did mount: ' + letter + localId);
        return () => {
          if (freed.has(localId)) {
            throw Error('Double free: ' + letter + localId);
          }
          freed.add(localId);
          Scheduler.log('Will unmount: ' + letter + localId);
        };
      }, [letter]);
    }

    const root = ReactDOMClient.createRoot(container);
    await act(() => {
      root.render(<App />);
    });
    assertLog(['Did mount: A0']);

    await act(() => {
      setStep(1);
      setSuspended(false);
    });
    assertLog([]);

    await act(() => {
      setStep(1);
    });
    assertLog([]);

    await act(() => {
      setSuspended(true);
    });
    assertLog(['Will unmount: A0']);

    await act(() => {
      setSuspended(false);
      setLetter('B');
    });
    assertLog(['Did mount: B1']);

    await act(() => {
      root.unmount();
    });
    assertLog(['Will unmount: B1']);
>>>>>>> remotes/upstream/main
  });
});
