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
 * @flow
 */

let React;
let ReactNoop;
let Scheduler;
let act;
let Suspense;
let getCacheForType;
let caches;
let seededCache;
let ErrorBoundary;
<<<<<<< HEAD
=======
let waitForAll;
let waitFor;
let assertLog;
>>>>>>> remotes/upstream/main

// TODO: These tests don't pass in persistent mode yet. Need to implement.

describe('ReactSuspenseEffectsSemantics', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;
=======
    act = require('internal-test-utils').act;
>>>>>>> remotes/upstream/main
    Suspense = React.Suspense;

    getCacheForType = React.unstable_getCacheForType;

<<<<<<< HEAD
=======
    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitFor = InternalTestUtils.waitFor;
    assertLog = InternalTestUtils.assertLog;

>>>>>>> remotes/upstream/main
    caches = [];
    seededCache = null;

    ErrorBoundary = class extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        this.setState({error});
      }
      render() {
        if (this.state.error) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ErrorBoundary render: catch');
          return this.props.fallback;
        }
        Scheduler.unstable_yieldValue('ErrorBoundary render: try');
=======
          Scheduler.log('ErrorBoundary render: catch');
          return this.props.fallback;
        }
        Scheduler.log('ErrorBoundary render: try');
>>>>>>> remotes/upstream/main
        return this.props.children;
      }
    };
  });

  function createTextCache() {
    if (seededCache !== null) {
      // Trick to seed a cache before it exists.
      // TODO: Need a built-in API to seed data before the initial render (i.e.
      // not a refresh because nothing has mounted yet).
      const cache = seededCache;
      seededCache = null;
      return cache;
    }

    const data = new Map();
    const version = caches.length + 1;
    const cache = {
      version,
      data,
      resolve(text) {
        const record = data.get(text);
        if (record === undefined) {
          const newRecord = {
            status: 'resolved',
            value: text,
          };
          data.set(text, newRecord);
        } else if (record.status === 'pending') {
          const thenable = record.value;
          record.status = 'resolved';
          record.value = text;
          thenable.pings.forEach(t => t());
        }
      },
      reject(text, error) {
        const record = data.get(text);
        if (record === undefined) {
          const newRecord = {
            status: 'rejected',
            value: error,
          };
          data.set(text, newRecord);
        } else if (record.status === 'pending') {
          const thenable = record.value;
          record.status = 'rejected';
          record.value = error;
          thenable.pings.forEach(t => t());
        }
      },
    };
    caches.push(cache);
    return cache;
  }

  function readText(text) {
    const textCache = getCacheForType(createTextCache);
    const record = textCache.data.get(text);
    if (record !== undefined) {
      switch (record.status) {
        case 'pending':
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`Suspend:${text}`);
          throw record.value;
        case 'rejected':
          Scheduler.unstable_yieldValue(`Error:${text}`);
=======
          Scheduler.log(`Suspend:${text}`);
          throw record.value;
        case 'rejected':
          Scheduler.log(`Error:${text}`);
>>>>>>> remotes/upstream/main
          throw record.value;
        case 'resolved':
          return textCache.version;
      }
    } else {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(`Suspend:${text}`);
=======
      Scheduler.log(`Suspend:${text}`);
>>>>>>> remotes/upstream/main

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
      textCache.data.set(text, newRecord);

      throw thenable;
    }
  }

  function Text({children = null, text}) {
<<<<<<< HEAD
    Scheduler.unstable_yieldValue(`Text:${text} render`);
    React.useLayoutEffect(() => {
      Scheduler.unstable_yieldValue(`Text:${text} create layout`);
      return () => {
        Scheduler.unstable_yieldValue(`Text:${text} destroy layout`);
      };
    }, []);
    React.useEffect(() => {
      Scheduler.unstable_yieldValue(`Text:${text} create passive`);
      return () => {
        Scheduler.unstable_yieldValue(`Text:${text} destroy passive`);
=======
    Scheduler.log(`Text:${text} render`);
    React.useLayoutEffect(() => {
      Scheduler.log(`Text:${text} create layout`);
      return () => {
        Scheduler.log(`Text:${text} destroy layout`);
      };
    }, []);
    React.useEffect(() => {
      Scheduler.log(`Text:${text} create passive`);
      return () => {
        Scheduler.log(`Text:${text} destroy passive`);
>>>>>>> remotes/upstream/main
      };
    }, []);
    return <span prop={text}>{children}</span>;
  }

  function AsyncText({children = null, text}) {
    readText(text);
<<<<<<< HEAD
    Scheduler.unstable_yieldValue(`AsyncText:${text} render`);
    React.useLayoutEffect(() => {
      Scheduler.unstable_yieldValue(`AsyncText:${text} create layout`);
      return () => {
        Scheduler.unstable_yieldValue(`AsyncText:${text} destroy layout`);
      };
    }, []);
    React.useEffect(() => {
      Scheduler.unstable_yieldValue(`AsyncText:${text} create passive`);
      return () => {
        Scheduler.unstable_yieldValue(`AsyncText:${text} destroy passive`);
=======
    Scheduler.log(`AsyncText:${text} render`);
    React.useLayoutEffect(() => {
      Scheduler.log(`AsyncText:${text} create layout`);
      return () => {
        Scheduler.log(`AsyncText:${text} destroy layout`);
      };
    }, []);
    React.useEffect(() => {
      Scheduler.log(`AsyncText:${text} create passive`);
      return () => {
        Scheduler.log(`AsyncText:${text} destroy passive`);
>>>>>>> remotes/upstream/main
      };
    }, []);
    return <span prop={text}>{children}</span>;
  }

  function resolveMostRecentTextCache(text) {
    if (caches.length === 0) {
      throw Error('Cache does not exist.');
    } else {
      // Resolve the most recently created cache. An older cache can by
      // resolved with `caches[index].resolve(text)`.
      caches[caches.length - 1].resolve(text);
    }
  }

  const resolveText = resolveMostRecentTextCache;

<<<<<<< HEAD
  function span(prop, children = []) {
    return {type: 'span', children, prop, hidden: false};
  }

  function spanHidden(prop, children = []) {
    return {type: 'span', children, prop, hidden: true};
  }

=======
>>>>>>> remotes/upstream/main
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

  describe('when a component suspends during initial mount', () => {
<<<<<<< HEAD
    // @gate enableCache
=======
    // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
    it('should not change behavior in concurrent mode', async () => {
      class ClassText extends React.Component {
        componentDidMount() {
          const {text} = this.props;
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`ClassText:${text} componentDidMount`);
        }
        componentDidUpdate() {
          const {text} = this.props;
          Scheduler.unstable_yieldValue(`ClassText:${text} componentDidUpdate`);
        }
        componentWillUnmount() {
          const {text} = this.props;
          Scheduler.unstable_yieldValue(
            `ClassText:${text} componentWillUnmount`,
          );
        }
        render() {
          const {children, text} = this.props;
          Scheduler.unstable_yieldValue(`ClassText:${text} render`);
=======
          Scheduler.log(`ClassText:${text} componentDidMount`);
        }
        componentDidUpdate() {
          const {text} = this.props;
          Scheduler.log(`ClassText:${text} componentDidUpdate`);
        }
        componentWillUnmount() {
          const {text} = this.props;
          Scheduler.log(`ClassText:${text} componentWillUnmount`);
        }
        render() {
          const {children, text} = this.props;
          Scheduler.log(`ClassText:${text} render`);
>>>>>>> remotes/upstream/main
          return <span prop={text}>{children}</span>;
        }
      }

      function App({children = null}) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('App render');
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('App create layout');
          return () => {
            Scheduler.unstable_yieldValue('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('App create passive');
          return () => {
            Scheduler.unstable_yieldValue('App destroy passive');
=======
        Scheduler.log('App render');
        React.useLayoutEffect(() => {
          Scheduler.log('App create layout');
          return () => {
            Scheduler.log('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.log('App create passive');
          return () => {
            Scheduler.log('App destroy passive');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return (
          <>
            <Suspense fallback={<Text text="Fallback" />}>
              <Text text="Inside:Before" />
              {children}
              <ClassText text="Inside:After" />
            </Suspense>
            <Text text="Outside" />
          </>
        );
      }

      // Mount and suspend.
<<<<<<< HEAD
      await act(async () => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App>
            <AsyncText text="Async" ms={1000} />
          </App>,
        );
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'App render',
        'Text:Inside:Before render',
        'Suspend:Async',
        'ClassText:Inside:After render',
=======
      assertLog([
        'App render',
        'Text:Inside:Before render',
        'Suspend:Async',
>>>>>>> remotes/upstream/main
        'Text:Fallback render',
        'Text:Outside render',
        'Text:Fallback create layout',
        'Text:Outside create layout',
        'App create layout',
        'Text:Fallback create passive',
        'Text:Outside create passive',
        'App create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Fallback'),
        span('Outside'),
      ]);
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Fallback" />
          <span prop="Outside" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Inside:Before render',
        'AsyncText:Async render',
        'ClassText:Inside:After render',
        'Text:Fallback destroy layout',
        'Text:Inside:Before create layout',
        'AsyncText:Async create layout',
        'ClassText:Inside:After componentDidMount',
        'Text:Fallback destroy passive',
        'Text:Inside:Before create passive',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside:Before'),
        span('Async'),
        span('Inside:After'),
        span('Outside'),
      ]);

      await act(async () => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside:Before" />
          <span prop="Async" />
          <span prop="Inside:After" />
          <span prop="Outside" />
        </>,
      );

      await act(() => {
        ReactNoop.render(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App destroy layout',
        'Text:Inside:Before destroy layout',
        'AsyncText:Async destroy layout',
        'ClassText:Inside:After componentWillUnmount',
        'Text:Outside destroy layout',
        'App destroy passive',
        'Text:Inside:Before destroy passive',
        'AsyncText:Async destroy passive',
        'Text:Outside destroy passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);
    });

    // @gate enableCache
=======
      expect(ReactNoop).toMatchRenderedOutput(null);
    });

    // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
    it('should not change behavior in sync', async () => {
      class ClassText extends React.Component {
        componentDidMount() {
          const {text} = this.props;
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`ClassText:${text} componentDidMount`);
        }
        componentDidUpdate() {
          const {text} = this.props;
          Scheduler.unstable_yieldValue(`ClassText:${text} componentDidUpdate`);
        }
        componentWillUnmount() {
          const {text} = this.props;
          Scheduler.unstable_yieldValue(
            `ClassText:${text} componentWillUnmount`,
          );
        }
        render() {
          const {children, text} = this.props;
          Scheduler.unstable_yieldValue(`ClassText:${text} render`);
=======
          Scheduler.log(`ClassText:${text} componentDidMount`);
        }
        componentDidUpdate() {
          const {text} = this.props;
          Scheduler.log(`ClassText:${text} componentDidUpdate`);
        }
        componentWillUnmount() {
          const {text} = this.props;
          Scheduler.log(`ClassText:${text} componentWillUnmount`);
        }
        render() {
          const {children, text} = this.props;
          Scheduler.log(`ClassText:${text} render`);
>>>>>>> remotes/upstream/main
          return <span prop={text}>{children}</span>;
        }
      }

      function App({children = null}) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('App render');
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('App create layout');
          return () => {
            Scheduler.unstable_yieldValue('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('App create passive');
          return () => {
            Scheduler.unstable_yieldValue('App destroy passive');
=======
        Scheduler.log('App render');
        React.useLayoutEffect(() => {
          Scheduler.log('App create layout');
          return () => {
            Scheduler.log('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.log('App create passive');
          return () => {
            Scheduler.log('App destroy passive');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return (
          <>
            <Suspense fallback={<Text text="Fallback" />}>
              <Text text="Inside:Before" />
              {children}
              <ClassText text="Inside:After" />
            </Suspense>
            <Text text="Outside" />
          </>
        );
      }

      // Mount and suspend.
<<<<<<< HEAD
      act(() => {
=======
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.renderLegacySyncRoot(
          <App>
            <AsyncText text="Async" ms={1000} />
          </App>,
        );
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'Text:Inside:Before render',
        'Suspend:Async',
        'ClassText:Inside:After render',
        'Text:Fallback render',
        'Text:Outside render',
        'Text:Inside:Before create layout',
        'ClassText:Inside:After componentDidMount',
        'Text:Fallback create layout',
        'Text:Outside create layout',
        'App create layout',
        'Text:Inside:Before create passive',
        'Text:Fallback create passive',
        'Text:Outside create passive',
        'App create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Inside:Before'),
        spanHidden('Inside:After'),
        span('Fallback'),
        span('Outside'),
      ]);
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside:Before" hidden={true} />
          <span prop="Inside:After" hidden={true} />
          <span prop="Fallback" />
          <span prop="Outside" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async render',
        'Text:Fallback destroy layout',
        'AsyncText:Async create layout',
        'Text:Fallback destroy passive',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside:Before'),
        span('Async'),
        span('Inside:After'),
        span('Outside'),
      ]);

      await act(async () => {
        ReactNoop.renderLegacySyncRoot(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside:Before" />
          <span prop="Async" />
          <span prop="Inside:After" />
          <span prop="Outside" />
        </>,
      );

      await act(() => {
        ReactNoop.renderLegacySyncRoot(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App destroy layout',
        'Text:Inside:Before destroy layout',
        'AsyncText:Async destroy layout',
        'ClassText:Inside:After componentWillUnmount',
        'Text:Outside destroy layout',
        'App destroy passive',
        'Text:Inside:Before destroy passive',
        'AsyncText:Async destroy passive',
        'Text:Outside destroy passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);
=======
      expect(ReactNoop).toMatchRenderedOutput(null);
>>>>>>> remotes/upstream/main
    });
  });

  describe('layout effects within a tree that re-suspends in an update', () => {
<<<<<<< HEAD
    // @gate enableCache
    it('should not be destroyed or recreated in legacy roots', async () => {
      function App({children = null}) {
        Scheduler.unstable_yieldValue('App render');
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('App create layout');
          return () => {
            Scheduler.unstable_yieldValue('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('App create passive');
          return () => {
            Scheduler.unstable_yieldValue('App destroy passive');
=======
    // @gate enableLegacyCache
    it('should not be destroyed or recreated in legacy roots', async () => {
      function App({children = null}) {
        Scheduler.log('App render');
        React.useLayoutEffect(() => {
          Scheduler.log('App create layout');
          return () => {
            Scheduler.log('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.log('App create passive');
          return () => {
            Scheduler.log('App destroy passive');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return (
          <>
            <Suspense fallback={<Text text="Fallback" />}>
              <Text text="Inside:Before" />
              {children}
              <Text text="Inside:After" />
            </Suspense>
            <Text text="Outside" />
          </>
        );
      }

      // Mount
<<<<<<< HEAD
      act(() => {
        ReactNoop.renderLegacySyncRoot(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.renderLegacySyncRoot(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'Text:Inside:Before render',
        'Text:Inside:After render',
        'Text:Outside render',
        'Text:Inside:Before create layout',
        'Text:Inside:After create layout',
        'Text:Outside create layout',
        'App create layout',
        'Text:Inside:Before create passive',
        'Text:Inside:After create passive',
        'Text:Outside create passive',
        'App create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside:Before'),
        span('Inside:After'),
        span('Outside'),
      ]);

      // Schedule an update that causes React to suspend.
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside:Before" />
          <span prop="Inside:After" />
          <span prop="Outside" />
        </>,
      );

      // Schedule an update that causes React to suspend.
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.renderLegacySyncRoot(
          <App>
            <AsyncText text="Async" ms={1000} />
          </App>,
        );
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'Text:Inside:Before render',
        'Suspend:Async',
        'Text:Inside:After render',
        'Text:Fallback render',
        'Text:Outside render',
        'Text:Fallback create layout',
        'Text:Fallback create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Inside:Before'),
        spanHidden('Inside:After'),
        span('Fallback'),
        span('Outside'),
      ]);
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside:Before" hidden={true} />
          <span prop="Inside:After" hidden={true} />
          <span prop="Fallback" />
          <span prop="Outside" />
        </>,
      );
>>>>>>> remotes/upstream/main

      await advanceTimers(1000);

      // Noop since sync root has already committed
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Inside:Before'),
        spanHidden('Inside:After'),
        span('Fallback'),
        span('Outside'),
      ]);
=======
      assertLog([]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside:Before" hidden={true} />
          <span prop="Inside:After" hidden={true} />
          <span prop="Fallback" />
          <span prop="Outside" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async render',
        'Text:Fallback destroy layout',
        'AsyncText:Async create layout',
        'Text:Fallback destroy passive',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside:Before'),
        span('Async'),
        span('Inside:After'),
        span('Outside'),
      ]);

      await act(async () => {
        ReactNoop.renderLegacySyncRoot(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside:Before" />
          <span prop="Async" />
          <span prop="Inside:After" />
          <span prop="Outside" />
        </>,
      );

      await act(() => {
        ReactNoop.renderLegacySyncRoot(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App destroy layout',
        'Text:Inside:Before destroy layout',
        'AsyncText:Async destroy layout',
        'Text:Inside:After destroy layout',
        'Text:Outside destroy layout',
        'App destroy passive',
        'Text:Inside:Before destroy passive',
        'AsyncText:Async destroy passive',
        'Text:Inside:After destroy passive',
        'Text:Outside destroy passive',
      ]);
    });

<<<<<<< HEAD
    // @gate enableCache
    it('should be destroyed and recreated for function components', async () => {
      function App({children = null}) {
        Scheduler.unstable_yieldValue('App render');
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('App create layout');
          return () => {
            Scheduler.unstable_yieldValue('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('App create passive');
          return () => {
            Scheduler.unstable_yieldValue('App destroy passive');
=======
    // @gate enableLegacyCache
    it('should be destroyed and recreated for function components', async () => {
      function App({children = null}) {
        Scheduler.log('App render');
        React.useLayoutEffect(() => {
          Scheduler.log('App create layout');
          return () => {
            Scheduler.log('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.log('App create passive');
          return () => {
            Scheduler.log('App destroy passive');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return (
          <>
            <Suspense fallback={<Text text="Fallback" />}>
              <Text text="Inside:Before" />
              {children}
              <Text text="Inside:After" />
            </Suspense>
            <Text text="Outside" />
          </>
        );
      }

<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'Text:Inside:Before render',
        'Text:Inside:After render',
        'Text:Outside render',
        'Text:Inside:Before create layout',
        'Text:Inside:After create layout',
        'Text:Outside create layout',
        'App create layout',
        'Text:Inside:Before create passive',
        'Text:Inside:After create passive',
        'Text:Outside create passive',
        'App create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside:Before'),
        span('Inside:After'),
        span('Outside'),
      ]);

      // Schedule an update that causes React to suspend.
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside:Before" />
          <span prop="Inside:After" />
          <span prop="Outside" />
        </>,
      );

      // Schedule an update that causes React to suspend.
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App>
            <AsyncText text="Async" ms={1000} />
          </App>,
        );
<<<<<<< HEAD
      });
      expect(Scheduler).toHaveYielded([
        'App render',
        'Text:Inside:Before render',
        'Suspend:Async',
        'Text:Inside:After render',
        'Text:Fallback render',
        'Text:Outside render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside:Before'),
        span('Inside:After'),
        span('Outside'),
      ]);

      await advanceTimers(1000);

      // Timing out should commit the fallback and destroy inner layout effects.
      expect(Scheduler).toHaveYielded([
        'Text:Inside:Before destroy layout',
        'Text:Inside:After destroy layout',
        'Text:Fallback create layout',
      ]);
      expect(Scheduler).toFlushAndYield(['Text:Fallback create passive']);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Inside:Before'),
        spanHidden('Inside:After'),
        span('Fallback'),
        span('Outside'),
      ]);
=======
        await waitFor([
          'App render',
          'Text:Inside:Before render',
          'Suspend:Async',
          'Text:Fallback render',
          'Text:Outside render',
          'Text:Inside:Before destroy layout',
          'Text:Inside:After destroy layout',
          'Text:Fallback create layout',
        ]);
        await waitForAll(['Text:Fallback create passive']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Inside:Before" hidden={true} />
            <span prop="Inside:After" hidden={true} />
            <span prop="Fallback" />
            <span prop="Outside" />
          </>,
        );
      });
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Inside:Before render',
        'AsyncText:Async render',
        'Text:Inside:After render',
        'Text:Fallback destroy layout',
        'Text:Inside:Before create layout',
        'AsyncText:Async create layout',
        'Text:Inside:After create layout',
        'Text:Fallback destroy passive',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside:Before'),
        span('Async'),
        span('Inside:After'),
        span('Outside'),
      ]);

      await act(async () => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside:Before" />
          <span prop="Async" />
          <span prop="Inside:After" />
          <span prop="Outside" />
        </>,
      );

      await act(() => {
        ReactNoop.render(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App destroy layout',
        'Text:Inside:Before destroy layout',
        'AsyncText:Async destroy layout',
        'Text:Inside:After destroy layout',
        'Text:Outside destroy layout',
        'App destroy passive',
        'Text:Inside:Before destroy passive',
        'AsyncText:Async destroy passive',
        'Text:Inside:After destroy passive',
        'Text:Outside destroy passive',
      ]);
    });

<<<<<<< HEAD
    // @gate enableCache
=======
    // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
    it('should be destroyed and recreated for class components', async () => {
      class ClassText extends React.Component {
        componentDidMount() {
          const {text} = this.props;
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`ClassText:${text} componentDidMount`);
        }
        componentDidUpdate() {
          const {text} = this.props;
          Scheduler.unstable_yieldValue(`ClassText:${text} componentDidUpdate`);
        }
        componentWillUnmount() {
          const {text} = this.props;
          Scheduler.unstable_yieldValue(
            `ClassText:${text} componentWillUnmount`,
          );
        }
        render() {
          const {children, text} = this.props;
          Scheduler.unstable_yieldValue(`ClassText:${text} render`);
=======
          Scheduler.log(`ClassText:${text} componentDidMount`);
        }
        componentDidUpdate() {
          const {text} = this.props;
          Scheduler.log(`ClassText:${text} componentDidUpdate`);
        }
        componentWillUnmount() {
          const {text} = this.props;
          Scheduler.log(`ClassText:${text} componentWillUnmount`);
        }
        render() {
          const {children, text} = this.props;
          Scheduler.log(`ClassText:${text} render`);
>>>>>>> remotes/upstream/main
          return <span prop={text}>{children}</span>;
        }
      }

      function App({children = null}) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('App render');
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('App create layout');
          return () => {
            Scheduler.unstable_yieldValue('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('App create passive');
          return () => {
            Scheduler.unstable_yieldValue('App destroy passive');
=======
        Scheduler.log('App render');
        React.useLayoutEffect(() => {
          Scheduler.log('App create layout');
          return () => {
            Scheduler.log('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.log('App create passive');
          return () => {
            Scheduler.log('App destroy passive');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return (
          <>
            <Suspense fallback={<ClassText text="Fallback" />}>
              <ClassText text="Inside:Before" />
              {children}
              <ClassText text="Inside:After" />
            </Suspense>
            <ClassText text="Outside" />
          </>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'ClassText:Inside:Before render',
        'ClassText:Inside:After render',
        'ClassText:Outside render',
        'ClassText:Inside:Before componentDidMount',
        'ClassText:Inside:After componentDidMount',
        'ClassText:Outside componentDidMount',
        'App create layout',
        'App create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside:Before'),
        span('Inside:After'),
        span('Outside'),
      ]);

      // Schedule an update that causes React to suspend.
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside:Before" />
          <span prop="Inside:After" />
          <span prop="Outside" />
        </>,
      );

      // Schedule an update that causes React to suspend.
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App>
            <AsyncText text="Async" ms={1000} />
          </App>,
        );
<<<<<<< HEAD
      });
      expect(Scheduler).toHaveYielded([
        'App render',
        'ClassText:Inside:Before render',
        'Suspend:Async',
        'ClassText:Inside:After render',
        'ClassText:Fallback render',
        'ClassText:Outside render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside:Before'),
        span('Inside:After'),
        span('Outside'),
      ]);

      await advanceTimers(1000);

      // Timing out should commit the fallback and destroy inner layout effects.
      expect(Scheduler).toHaveYielded([
        'ClassText:Inside:Before componentWillUnmount',
        'ClassText:Inside:After componentWillUnmount',
        'ClassText:Fallback componentDidMount',
        'ClassText:Outside componentDidUpdate',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Inside:Before'),
        spanHidden('Inside:After'),
        span('Fallback'),
        span('Outside'),
      ]);
=======

        await waitFor([
          'App render',
          'ClassText:Inside:Before render',
          'Suspend:Async',
          'ClassText:Fallback render',
          'ClassText:Outside render',
          'ClassText:Inside:Before componentWillUnmount',
          'ClassText:Inside:After componentWillUnmount',
          'ClassText:Fallback componentDidMount',
          'ClassText:Outside componentDidUpdate',
        ]);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Inside:Before" hidden={true} />
            <span prop="Inside:After" hidden={true} />
            <span prop="Fallback" />
            <span prop="Outside" />
          </>,
        );
      });
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'ClassText:Inside:Before render',
        'AsyncText:Async render',
        'ClassText:Inside:After render',
        'ClassText:Fallback componentWillUnmount',
        'ClassText:Inside:Before componentDidMount',
        'AsyncText:Async create layout',
        'ClassText:Inside:After componentDidMount',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside:Before'),
        span('Async'),
        span('Inside:After'),
        span('Outside'),
      ]);

      await act(async () => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside:Before" />
          <span prop="Async" />
          <span prop="Inside:After" />
          <span prop="Outside" />
        </>,
      );
      await act(() => {
        ReactNoop.render(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App destroy layout',
        'ClassText:Inside:Before componentWillUnmount',
        'AsyncText:Async destroy layout',
        'ClassText:Inside:After componentWillUnmount',
        'ClassText:Outside componentWillUnmount',
        'App destroy passive',
        'AsyncText:Async destroy passive',
      ]);
    });

<<<<<<< HEAD
    // @gate enableCache
    it('should be destroyed and recreated when nested below host components', async () => {
      function App({children = null}) {
        Scheduler.unstable_yieldValue('App render');
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('App create layout');
          return () => {
            Scheduler.unstable_yieldValue('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('App create passive');
          return () => {
            Scheduler.unstable_yieldValue('App destroy passive');
=======
    // @gate enableLegacyCache
    it('should be destroyed and recreated when nested below host components', async () => {
      function App({children = null}) {
        Scheduler.log('App render');
        React.useLayoutEffect(() => {
          Scheduler.log('App create layout');
          return () => {
            Scheduler.log('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.log('App create passive');
          return () => {
            Scheduler.log('App destroy passive');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return (
          <Suspense fallback={<Text text="Fallback" />}>
            {children}
            <Text text="Outer">
              <Text text="Inner" />
            </Text>
          </Suspense>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'Text:Outer render',
        'Text:Inner render',
        'Text:Inner create layout',
        'Text:Outer create layout',
        'App create layout',
        'Text:Inner create passive',
        'Text:Outer create passive',
        'App create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span('Outer', [span('Inner')])]);

      // Schedule an update that causes React to suspend.
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <span prop="Outer">
          <span prop="Inner" />
        </span>,
      );

      // Schedule an update that causes React to suspend.
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App>
            <AsyncText text="Async" ms={1000} />
          </App>,
        );
<<<<<<< HEAD
      });
      expect(Scheduler).toHaveYielded([
        'App render',
        'Suspend:Async',
        'Text:Outer render',
        'Text:Inner render',
        'Text:Fallback render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([span('Outer', [span('Inner')])]);

      await advanceTimers(1000);

      // Timing out should commit the fallback and destroy inner layout effects.
      expect(Scheduler).toHaveYielded([
        'Text:Outer destroy layout',
        'Text:Inner destroy layout',
        'Text:Fallback create layout',
      ]);
      expect(Scheduler).toFlushAndYield(['Text:Fallback create passive']);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Outer', [span('Inner')]),
        span('Fallback'),
      ]);
=======
        await waitFor([
          'App render',
          'Suspend:Async',
          'Text:Fallback render',
          'Text:Outer destroy layout',
          'Text:Inner destroy layout',
          'Text:Fallback create layout',
        ]);
        await waitForAll(['Text:Fallback create passive']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span hidden={true} prop="Outer">
              <span prop="Inner" />
            </span>
            <span prop="Fallback" />
          </>,
        );
      });
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async render',
        'Text:Outer render',
        'Text:Inner render',
        'Text:Fallback destroy layout',
        'AsyncText:Async create layout',
        'Text:Inner create layout',
        'Text:Outer create layout',
        'Text:Fallback destroy passive',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Async'),
        span('Outer', [span('Inner')]),
      ]);

      await act(async () => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Async" />
          <span prop="Outer">
            <span prop="Inner" />
          </span>
        </>,
      );

      await act(() => {
        ReactNoop.render(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App destroy layout',
        'AsyncText:Async destroy layout',
        'Text:Outer destroy layout',
        'Text:Inner destroy layout',
        'App destroy passive',
        'AsyncText:Async destroy passive',
        'Text:Outer destroy passive',
        'Text:Inner destroy passive',
      ]);
    });

<<<<<<< HEAD
    // @gate enableCache
=======
    // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
    it('should be destroyed and recreated even if there is a bailout because of memoization', async () => {
      const MemoizedText = React.memo(Text, () => true);

      function App({children = null}) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('App render');
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue('App create layout');
          return () => {
            Scheduler.unstable_yieldValue('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.unstable_yieldValue('App create passive');
          return () => {
            Scheduler.unstable_yieldValue('App destroy passive');
=======
        Scheduler.log('App render');
        React.useLayoutEffect(() => {
          Scheduler.log('App create layout');
          return () => {
            Scheduler.log('App destroy layout');
          };
        }, []);
        React.useEffect(() => {
          Scheduler.log('App create passive');
          return () => {
            Scheduler.log('App destroy passive');
>>>>>>> remotes/upstream/main
          };
        }, []);
        return (
          <Suspense fallback={<Text text="Fallback" />}>
            {children}
            <Text text="Outer">
              <MemoizedText text="MemoizedInner" />
            </Text>
          </Suspense>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'Text:Outer render',
        'Text:MemoizedInner render',
        'Text:MemoizedInner create layout',
        'Text:Outer create layout',
        'App create layout',
        'Text:MemoizedInner create passive',
        'Text:Outer create passive',
        'App create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Outer', [span('MemoizedInner')]),
      ]);

      // Schedule an update that causes React to suspend.
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <span prop="Outer">
          <span prop="MemoizedInner" />
        </span>,
      );

      // Schedule an update that causes React to suspend.
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App>
            <AsyncText text="Async" ms={1000} />
          </App>,
        );
<<<<<<< HEAD
      });
      expect(Scheduler).toHaveYielded([
        'App render',
        'Suspend:Async',
        'Text:Outer render',
        // Text:MemoizedInner is memoized
        'Text:Fallback render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        span('Outer', [span('MemoizedInner')]),
      ]);

      await advanceTimers(1000);

      // Timing out should commit the fallback and destroy inner layout effects.
      // Even though the innermost layout effects are beneath a hidden HostComponent.
      expect(Scheduler).toHaveYielded([
        'Text:Outer destroy layout',
        'Text:MemoizedInner destroy layout',
        'Text:Fallback create layout',
      ]);
      expect(Scheduler).toFlushAndYield(['Text:Fallback create passive']);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Outer', [span('MemoizedInner')]),
        span('Fallback'),
      ]);
=======
        await waitFor([
          'App render',
          'Suspend:Async',
          // Text:MemoizedInner is memoized
          'Text:Fallback render',
          'Text:Outer destroy layout',
          'Text:MemoizedInner destroy layout',
          'Text:Fallback create layout',
        ]);
        await waitForAll(['Text:Fallback create passive']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span hidden={true} prop="Outer">
              <span prop="MemoizedInner" />
            </span>
            <span prop="Fallback" />
          </>,
        );
      });
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async render',
        'Text:Outer render',
        'Text:Fallback destroy layout',
        'AsyncText:Async create layout',
        'Text:MemoizedInner create layout',
        'Text:Outer create layout',
        'Text:Fallback destroy passive',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Async'),
        span('Outer', [span('MemoizedInner')]),
      ]);

      await act(async () => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Async" />
          <span prop="Outer">
            <span prop="MemoizedInner" />
          </span>
        </>,
      );

      await act(() => {
        ReactNoop.render(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App destroy layout',
        'AsyncText:Async destroy layout',
        'Text:Outer destroy layout',
        'Text:MemoizedInner destroy layout',
        'App destroy passive',
        'AsyncText:Async destroy passive',
        'Text:Outer destroy passive',
        'Text:MemoizedInner destroy passive',
      ]);
    });

<<<<<<< HEAD
    // @gate enableCache
=======
    // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
    it('should respect nested suspense boundaries', async () => {
      function App({innerChildren = null, outerChildren = null}) {
        return (
          <Suspense fallback={<Text text="OuterFallback" />}>
            <Text text="Outer" />
            {outerChildren}
            <Suspense fallback={<Text text="InnerFallback" />}>
              <Text text="Inner" />
              {innerChildren}
            </Suspense>
          </Suspense>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Outer render',
        'Text:Inner render',
        'Text:Outer create layout',
        'Text:Inner create layout',
        'Text:Outer create passive',
        'Text:Inner create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span('Outer'), span('Inner')]);

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" />
          <span prop="Inner" />
        </>,
      );

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App innerChildren={<AsyncText text="InnerAsync_1" ms={1000} />} />,
        );
      });
<<<<<<< HEAD
      await advanceTimers(1000);
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Outer render',
        'Text:Inner render',
        'Suspend:InnerAsync_1',
        'Text:InnerFallback render',
        'Text:Inner destroy layout',
        'Text:InnerFallback create layout',
<<<<<<< HEAD
      ]);
      expect(Scheduler).toFlushAndYield(['Text:InnerFallback create passive']);
      expect(ReactNoop.getChildren()).toEqual([
        span('Outer'),
        spanHidden('Inner'),
        span('InnerFallback'),
      ]);

      // Suspend the outer Suspense subtree (outer effects and inner fallback effects should be destroyed)
      // (This check also ensures we don't destroy effects for mounted inner fallback.)
      act(() => {
=======
        'Text:InnerFallback create passive',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" />
          <span prop="Inner" hidden={true} />
          <span prop="InnerFallback" />
        </>,
      );

      // Suspend the outer Suspense subtree (outer effects and inner fallback effects should be destroyed)
      // (This check also ensures we don't destroy effects for mounted inner fallback.)
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App
            outerChildren={<AsyncText text="OuterAsync_1" ms={1000} />}
            innerChildren={<AsyncText text="InnerAsync_1" ms={1000} />}
          />,
        );
      });
      await advanceTimers(1000);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Text:Outer render',
        'Suspend:OuterAsync_1',
        'Text:Inner render',
        'Suspend:InnerAsync_1',
        'Text:InnerFallback render',
=======
      assertLog([
        'Text:Outer render',
        'Suspend:OuterAsync_1',
>>>>>>> remotes/upstream/main
        'Text:OuterFallback render',
        'Text:Outer destroy layout',
        'Text:InnerFallback destroy layout',
        'Text:OuterFallback create layout',
<<<<<<< HEAD
      ]);
      expect(Scheduler).toFlushAndYield(['Text:OuterFallback create passive']);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Outer'),
        spanHidden('Inner'),
        spanHidden('InnerFallback'),
        span('OuterFallback'),
      ]);
=======
        'Text:OuterFallback create passive',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" hidden={true} />
          <span prop="Inner" hidden={true} />
          <span prop="InnerFallback" hidden={true} />
          <span prop="OuterFallback" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Show the inner Suspense subtree (no effects should be recreated)
      await act(async () => {
        await resolveText('InnerAsync_1');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Text:Outer render',
        'Suspend:OuterAsync_1',
        'Text:Inner render',
        'AsyncText:InnerAsync_1 render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Outer'),
        spanHidden('Inner'),
        spanHidden('InnerFallback'),
        span('OuterFallback'),
      ]);

      // Suspend the inner Suspense subtree (no effects should be destroyed)
      act(() => {
=======
      assertLog(['Text:Outer render', 'Suspend:OuterAsync_1']);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" hidden={true} />
          <span prop="Inner" hidden={true} />
          <span prop="InnerFallback" hidden={true} />
          <span prop="OuterFallback" />
        </>,
      );

      // Suspend the inner Suspense subtree (no effects should be destroyed)
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App
            outerChildren={<AsyncText text="OuterAsync_1" ms={1000} />}
            innerChildren={<AsyncText text="InnerAsync_2" ms={1000} />}
          />,
        );
      });
      await advanceTimers(1000);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Text:Outer render',
        'Suspend:OuterAsync_1',
        'Text:Inner render',
        'Suspend:InnerAsync_2',
        'Text:InnerFallback render',
        'Text:OuterFallback render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Outer'),
        spanHidden('Inner'),
        spanHidden('InnerFallback'),
        span('OuterFallback'),
      ]);
=======
      assertLog([
        'Text:Outer render',
        'Suspend:OuterAsync_1',
        'Text:OuterFallback render',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" hidden={true} />
          <span prop="Inner" hidden={true} />
          <span prop="InnerFallback" hidden={true} />
          <span prop="OuterFallback" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Show the outer Suspense subtree (only outer effects should be recreated)
      await act(async () => {
        await resolveText('OuterAsync_1');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Outer render',
        'AsyncText:OuterAsync_1 render',
        'Text:Inner render',
        'Suspend:InnerAsync_2',
        'Text:InnerFallback render',
        'Text:OuterFallback destroy layout',
        'Text:Outer create layout',
        'AsyncText:OuterAsync_1 create layout',
        'Text:InnerFallback create layout',
        'Text:OuterFallback destroy passive',
        'AsyncText:OuterAsync_1 create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Outer'),
        span('OuterAsync_1'),
        spanHidden('Inner'),
        span('InnerFallback'),
      ]);
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" />
          <span prop="OuterAsync_1" />
          <span prop="Inner" hidden={true} />
          <span prop="InnerFallback" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Show the inner Suspense subtree (only inner effects should be recreated)
      await act(async () => {
        await resolveText('InnerAsync_2');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Inner render',
        'AsyncText:InnerAsync_2 render',
        'Text:InnerFallback destroy layout',
        'Text:Inner create layout',
        'AsyncText:InnerAsync_2 create layout',
        'Text:InnerFallback destroy passive',
        'AsyncText:InnerAsync_2 create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Outer'),
        span('OuterAsync_1'),
        span('Inner'),
        span('InnerAsync_2'),
      ]);

      // Suspend the outer Suspense subtree (all effects should be destroyed)
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" />
          <span prop="OuterAsync_1" />
          <span prop="Inner" />
          <span prop="InnerAsync_2" />
        </>,
      );

      // Suspend the outer Suspense subtree (all effects should be destroyed)
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App
            outerChildren={<AsyncText text="OuterAsync_2" ms={1000} />}
            innerChildren={<AsyncText text="InnerAsync_2" ms={1000} />}
          />,
        );
      });
<<<<<<< HEAD
      await advanceTimers(1000);
      expect(Scheduler).toHaveYielded([
        'Text:Outer render',
        'Suspend:OuterAsync_2',
        'Text:Inner render',
        'AsyncText:InnerAsync_2 render',
=======
      assertLog([
        'Text:Outer render',
        'Suspend:OuterAsync_2',
>>>>>>> remotes/upstream/main
        'Text:OuterFallback render',
        'Text:Outer destroy layout',
        'AsyncText:OuterAsync_1 destroy layout',
        'Text:Inner destroy layout',
        'AsyncText:InnerAsync_2 destroy layout',
        'Text:OuterFallback create layout',
<<<<<<< HEAD
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Outer'),
        spanHidden('OuterAsync_1'),
        spanHidden('Inner'),
        spanHidden('InnerAsync_2'),
        span('OuterFallback'),
      ]);
=======
        'Text:OuterFallback create passive',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" hidden={true} />
          <span prop="OuterAsync_1" hidden={true} />
          <span prop="Inner" hidden={true} />
          <span prop="InnerAsync_2" hidden={true} />
          <span prop="OuterFallback" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Show the outer Suspense subtree (all effects should be recreated)
      await act(async () => {
        await resolveText('OuterAsync_2');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Text:OuterFallback create passive',
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Outer render',
        'AsyncText:OuterAsync_2 render',
        'Text:Inner render',
        'AsyncText:InnerAsync_2 render',
        'Text:OuterFallback destroy layout',
        'Text:Outer create layout',
        'AsyncText:OuterAsync_2 create layout',
        'Text:Inner create layout',
        'AsyncText:InnerAsync_2 create layout',
        'Text:OuterFallback destroy passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Outer'),
        span('OuterAsync_2'),
        span('Inner'),
        span('InnerAsync_2'),
      ]);
    });

    // @gate enableCache
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" />
          <span prop="OuterAsync_2" />
          <span prop="Inner" />
          <span prop="InnerAsync_2" />
        </>,
      );
    });

    // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
    it('should show nested host nodes if multiple boundaries resolve at the same time', async () => {
      function App({innerChildren = null, outerChildren = null}) {
        return (
          <Suspense fallback={<Text text="OuterFallback" />}>
            <Text text="Outer" />
            {outerChildren}
            <Suspense fallback={<Text text="InnerFallback" />}>
              <Text text="Inner" />
              {innerChildren}
            </Suspense>
          </Suspense>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Outer render',
        'Text:Inner render',
        'Text:Outer create layout',
        'Text:Inner create layout',
        'Text:Outer create passive',
        'Text:Inner create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span('Outer'), span('Inner')]);

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" />
          <span prop="Inner" />
        </>,
      );

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App innerChildren={<AsyncText text="InnerAsync_1" ms={1000} />} />,
        );
      });
<<<<<<< HEAD
      await advanceTimers(1000);
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Outer render',
        'Text:Inner render',
        'Suspend:InnerAsync_1',
        'Text:InnerFallback render',
        'Text:Inner destroy layout',
        'Text:InnerFallback create layout',
<<<<<<< HEAD
      ]);
      expect(Scheduler).toFlushAndYield(['Text:InnerFallback create passive']);
      expect(ReactNoop.getChildren()).toEqual([
        span('Outer'),
        spanHidden('Inner'),
        span('InnerFallback'),
      ]);

      // Suspend the outer Suspense subtree (outer effects and inner fallback effects should be destroyed)
      // (This check also ensures we don't destroy effects for mounted inner fallback.)
      act(() => {
=======
        'Text:InnerFallback create passive',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" />
          <span prop="Inner" hidden={true} />
          <span prop="InnerFallback" />
        </>,
      );

      // Suspend the outer Suspense subtree (outer effects and inner fallback effects should be destroyed)
      // (This check also ensures we don't destroy effects for mounted inner fallback.)
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App
            outerChildren={<AsyncText text="OuterAsync_1" ms={1000} />}
            innerChildren={<AsyncText text="InnerAsync_1" ms={1000} />}
          />,
        );
      });
<<<<<<< HEAD
      await advanceTimers(1000);
      expect(Scheduler).toHaveYielded([
        'Text:Outer render',
        'Suspend:OuterAsync_1',
        'Text:Inner render',
        'Suspend:InnerAsync_1',
        'Text:InnerFallback render',
=======
      assertLog([
        'Text:Outer render',
        'Suspend:OuterAsync_1',
>>>>>>> remotes/upstream/main
        'Text:OuterFallback render',
        'Text:Outer destroy layout',
        'Text:InnerFallback destroy layout',
        'Text:OuterFallback create layout',
<<<<<<< HEAD
      ]);
      expect(Scheduler).toFlushAndYield(['Text:OuterFallback create passive']);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Outer'),
        spanHidden('Inner'),
        spanHidden('InnerFallback'),
        span('OuterFallback'),
      ]);
=======
        'Text:OuterFallback create passive',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" hidden={true} />
          <span prop="Inner" hidden={true} />
          <span prop="InnerFallback" hidden={true} />
          <span prop="OuterFallback" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Resolve both suspended trees.
      await act(async () => {
        await resolveText('OuterAsync_1');
        await resolveText('InnerAsync_1');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Outer render',
        'AsyncText:OuterAsync_1 render',
        'Text:Inner render',
        'AsyncText:InnerAsync_1 render',
        'Text:OuterFallback destroy layout',
        'Text:Outer create layout',
        'AsyncText:OuterAsync_1 create layout',
        'Text:Inner create layout',
        'AsyncText:InnerAsync_1 create layout',
        'Text:OuterFallback destroy passive',
        'Text:InnerFallback destroy passive',
        'AsyncText:OuterAsync_1 create passive',
        'AsyncText:InnerAsync_1 create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Outer'),
        span('OuterAsync_1'),
        span('Inner'),
        span('InnerAsync_1'),
      ]);
    });

    // @gate enableCache
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Outer" />
          <span prop="OuterAsync_1" />
          <span prop="Inner" />
          <span prop="InnerAsync_1" />
        </>,
      );
    });

    // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
    it('should be cleaned up inside of a fallback that suspends', async () => {
      function App({fallbackChildren = null, outerChildren = null}) {
        return (
          <>
            <Suspense
              fallback={
                <>
                  <Suspense fallback={<Text text="Fallback:Fallback" />}>
                    <Text text="Fallback:Inside" />
                    {fallbackChildren}
                  </Suspense>
                  <Text text="Fallback:Outside" />
                </>
              }>
              <Text text="Inside" />
              {outerChildren}
            </Suspense>
            <Text text="Outside" />
          </>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Inside render',
        'Text:Outside render',
        'Text:Inside create layout',
        'Text:Outside create layout',
        'Text:Inside create passive',
        'Text:Outside create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside'),
        span('Outside'),
      ]);

      // Suspend the outer shell
      act(() => {
        ReactNoop.render(
          <App outerChildren={<AsyncText text="OutsideAsync" ms={1000} />} />,
        );
      });
      expect(Scheduler).toHaveYielded([
        'Text:Inside render',
        'Suspend:OutsideAsync',
        'Text:Fallback:Inside render',
        'Text:Fallback:Outside render',
        'Text:Outside render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside'),
        span('Outside'),
      ]);

      // Timing out should commit the fallback and destroy inner layout effects.
      await advanceTimers(1000);
      expect(Scheduler).toHaveYielded([
        'Text:Inside destroy layout',
        'Text:Fallback:Inside create layout',
        'Text:Fallback:Outside create layout',
      ]);
      expect(Scheduler).toFlushAndYield([
        'Text:Fallback:Inside create passive',
        'Text:Fallback:Outside create passive',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Inside'),
        span('Fallback:Inside'),
        span('Fallback:Outside'),
        span('Outside'),
      ]);

      // Suspend the fallback and verify that it's effects get cleaned up as well
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside" />
          <span prop="Outside" />
        </>,
      );

      // Suspend the outer shell
      await act(async () => {
        ReactNoop.render(
          <App outerChildren={<AsyncText text="OutsideAsync" ms={1000} />} />,
        );
        await waitFor([
          'Text:Inside render',
          'Suspend:OutsideAsync',
          'Text:Fallback:Inside render',
          'Text:Fallback:Outside render',
          'Text:Outside render',
          'Text:Inside destroy layout',
          'Text:Fallback:Inside create layout',
          'Text:Fallback:Outside create layout',
        ]);
        await waitForAll([
          'Text:Fallback:Inside create passive',
          'Text:Fallback:Outside create passive',
        ]);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Inside" hidden={true} />
            <span prop="Fallback:Inside" />
            <span prop="Fallback:Outside" />
            <span prop="Outside" />
          </>,
        );
      });

      // Suspend the fallback and verify that it's effects get cleaned up as well
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App
            fallbackChildren={<AsyncText text="FallbackAsync" ms={1000} />}
            outerChildren={<AsyncText text="OutsideAsync" ms={1000} />}
          />,
        );
<<<<<<< HEAD
      });
      expect(Scheduler).toHaveYielded([
        'Text:Inside render',
        'Suspend:OutsideAsync',
        'Text:Fallback:Inside render',
        'Suspend:FallbackAsync',
        'Text:Fallback:Fallback render',
        'Text:Fallback:Outside render',
        'Text:Outside render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Inside'),
        span('Fallback:Inside'),
        span('Fallback:Outside'),
        span('Outside'),
      ]);

      // Timing out should commit the inner fallback and destroy outer fallback layout effects.
      await advanceTimers(1000);
      expect(Scheduler).toHaveYielded([
        'Text:Fallback:Inside destroy layout',
        'Text:Fallback:Fallback create layout',
      ]);
      expect(Scheduler).toFlushAndYield([
        'Text:Fallback:Fallback create passive',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Inside'),
        spanHidden('Fallback:Inside'),
        span('Fallback:Fallback'),
        span('Fallback:Outside'),
        span('Outside'),
      ]);
=======
        await waitFor([
          'Text:Inside render',
          'Suspend:OutsideAsync',
          'Text:Fallback:Inside render',
          'Suspend:FallbackAsync',
          'Text:Fallback:Fallback render',
          'Text:Fallback:Outside render',
          'Text:Outside render',
          'Text:Fallback:Inside destroy layout',
          'Text:Fallback:Fallback create layout',
        ]);
        await waitForAll(['Text:Fallback:Fallback create passive']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Inside" hidden={true} />
            <span prop="Fallback:Inside" hidden={true} />
            <span prop="Fallback:Fallback" />
            <span prop="Fallback:Outside" />
            <span prop="Outside" />
          </>,
        );
      });
>>>>>>> remotes/upstream/main

      // Resolving both resources should cleanup fallback effects and recreate main effects
      await act(async () => {
        await resolveText('FallbackAsync');
        await resolveText('OutsideAsync');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Inside render',
        'AsyncText:OutsideAsync render',
        'Text:Fallback:Fallback destroy layout',
        'Text:Fallback:Outside destroy layout',
        'Text:Inside create layout',
        'AsyncText:OutsideAsync create layout',
        'Text:Fallback:Inside destroy passive',
        'Text:Fallback:Fallback destroy passive',
        'Text:Fallback:Outside destroy passive',
        'AsyncText:OutsideAsync create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside'),
        span('OutsideAsync'),
        span('Outside'),
      ]);
    });

    // @gate enableCache
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside" />
          <span prop="OutsideAsync" />
          <span prop="Outside" />
        </>,
      );
    });

    // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
    it('should be cleaned up inside of a fallback that suspends (alternate)', async () => {
      function App({fallbackChildren = null, outerChildren = null}) {
        return (
          <>
            <Suspense
              fallback={
                <>
                  <Suspense fallback={<Text text="Fallback:Fallback" />}>
                    <Text text="Fallback:Inside" />
                    {fallbackChildren}
                  </Suspense>
                  <Text text="Fallback:Outside" />
                </>
              }>
              <Text text="Inside" />
              {outerChildren}
            </Suspense>
            <Text text="Outside" />
          </>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Inside render',
        'Text:Outside render',
        'Text:Inside create layout',
        'Text:Outside create layout',
        'Text:Inside create passive',
        'Text:Outside create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside'),
        span('Outside'),
      ]);

      // Suspend both the outer boundary and the fallback
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside" />
          <span prop="Outside" />
        </>,
      );

      // Suspend both the outer boundary and the fallback
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App
            outerChildren={<AsyncText text="OutsideAsync" ms={1000} />}
            fallbackChildren={<AsyncText text="FallbackAsync" ms={1000} />}
          />,
        );
      });
<<<<<<< HEAD
      await advanceTimers(1000);
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Inside render',
        'Suspend:OutsideAsync',
        'Text:Fallback:Inside render',
        'Suspend:FallbackAsync',
        'Text:Fallback:Fallback render',
        'Text:Fallback:Outside render',
        'Text:Outside render',
        'Text:Inside destroy layout',
        'Text:Fallback:Fallback create layout',
        'Text:Fallback:Outside create layout',
<<<<<<< HEAD
      ]);
      expect(Scheduler).toFlushAndYield([
        'Text:Fallback:Fallback create passive',
        'Text:Fallback:Outside create passive',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Inside'),
        span('Fallback:Fallback'),
        span('Fallback:Outside'),
        span('Outside'),
      ]);
=======
        'Text:Fallback:Fallback create passive',
        'Text:Fallback:Outside create passive',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside" hidden={true} />
          <span prop="Fallback:Fallback" />
          <span prop="Fallback:Outside" />
          <span prop="Outside" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Resolving the inside fallback
      await act(async () => {
        await resolveText('FallbackAsync');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Fallback:Inside render',
        'AsyncText:FallbackAsync render',
        'Text:Fallback:Fallback destroy layout',
        'Text:Fallback:Inside create layout',
        'AsyncText:FallbackAsync create layout',
        'Text:Fallback:Fallback destroy passive',
        'Text:Fallback:Inside create passive',
        'AsyncText:FallbackAsync create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Inside'),
        span('Fallback:Inside'),
        span('FallbackAsync'),
        span('Fallback:Outside'),
        span('Outside'),
      ]);
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside" hidden={true} />
          <span prop="Fallback:Inside" />
          <span prop="FallbackAsync" />
          <span prop="Fallback:Outside" />
          <span prop="Outside" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Resolving the outer fallback only
      await act(async () => {
        await resolveText('OutsideAsync');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Inside render',
        'AsyncText:OutsideAsync render',
        'Text:Fallback:Inside destroy layout',
        'AsyncText:FallbackAsync destroy layout',
        'Text:Fallback:Outside destroy layout',
        'Text:Inside create layout',
        'AsyncText:OutsideAsync create layout',
        'Text:Fallback:Inside destroy passive',
        'AsyncText:FallbackAsync destroy passive',
        'Text:Fallback:Outside destroy passive',
        'AsyncText:OutsideAsync create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside'),
        span('OutsideAsync'),
        span('Outside'),
      ]);
    });

    // @gate enableCache
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside" />
          <span prop="OutsideAsync" />
          <span prop="Outside" />
        </>,
      );
    });

    // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
    it('should be cleaned up deeper inside of a subtree that suspends', async () => {
      function ConditionalSuspense({shouldSuspend}) {
        if (shouldSuspend) {
          readText('Suspend');
        }
        return <Text text="Inside" />;
      }

      function App({children = null, shouldSuspend}) {
        return (
          <>
            <Suspense fallback={<Text text="Fallback" />}>
              <ConditionalSuspense shouldSuspend={shouldSuspend} />
            </Suspense>
            <Text text="Outside" />
          </>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App shouldSuspend={false} />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App shouldSuspend={false} />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Inside render',
        'Text:Outside render',
        'Text:Inside create layout',
        'Text:Outside create layout',
        'Text:Inside create passive',
        'Text:Outside create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside'),
        span('Outside'),
      ]);

      // Suspending a component in the middle of the tree
      // should still properly cleanup effects deeper in the tree
      act(() => {
        ReactNoop.render(<App shouldSuspend={true} />);
      });
      expect(Scheduler).toHaveYielded([
        'Suspend:Suspend',
        'Text:Fallback render',
        'Text:Outside render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside'),
        span('Outside'),
      ]);

      // Timing out should commit the inner fallback and destroy outer fallback layout effects.
      await advanceTimers(1000);
      expect(Scheduler).toHaveYielded([
        'Text:Inside destroy layout',
        'Text:Fallback create layout',
      ]);
      expect(Scheduler).toFlushAndYield(['Text:Fallback create passive']);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Inside'),
        span('Fallback'),
        span('Outside'),
      ]);
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside" />
          <span prop="Outside" />
        </>,
      );

      // Suspending a component in the middle of the tree
      // should still properly cleanup effects deeper in the tree
      await act(async () => {
        ReactNoop.render(<App shouldSuspend={true} />);
        await waitFor([
          'Suspend:Suspend',
          'Text:Fallback render',
          'Text:Outside render',
          'Text:Inside destroy layout',
          'Text:Fallback create layout',
        ]);
        await waitForAll(['Text:Fallback create passive']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Inside" hidden={true} />
            <span prop="Fallback" />
            <span prop="Outside" />
          </>,
        );
      });
>>>>>>> remotes/upstream/main

      // Resolving should cleanup.
      await act(async () => {
        await resolveText('Suspend');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Inside render',
        'Text:Fallback destroy layout',
        'Text:Inside create layout',
        'Text:Fallback destroy passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Inside'),
        span('Outside'),
      ]);
    });

    describe('that throw errors', () => {
      // @gate enableCache
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Inside" />
          <span prop="Outside" />
        </>,
      );
    });

    describe('that throw errors', () => {
      // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
      it('are properly handled for componentDidMount', async () => {
        let componentDidMountShouldThrow = false;

        class ThrowsInDidMount extends React.Component {
          componentWillUnmount() {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue(
              'ThrowsInDidMount componentWillUnmount',
            );
          }
          componentDidMount() {
            Scheduler.unstable_yieldValue('ThrowsInDidMount componentDidMount');
=======
            Scheduler.log('ThrowsInDidMount componentWillUnmount');
          }
          componentDidMount() {
            Scheduler.log('ThrowsInDidMount componentDidMount');
>>>>>>> remotes/upstream/main
            if (componentDidMountShouldThrow) {
              throw Error('expected');
            }
          }
          render() {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('ThrowsInDidMount render');
=======
            Scheduler.log('ThrowsInDidMount render');
>>>>>>> remotes/upstream/main
            return <span prop="ThrowsInDidMount" />;
          }
        }

        function App({children = null}) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App render');
          React.useLayoutEffect(() => {
            Scheduler.unstable_yieldValue('App create layout');
            return () => {
              Scheduler.unstable_yieldValue('App destroy layout');
=======
          Scheduler.log('App render');
          React.useLayoutEffect(() => {
            Scheduler.log('App create layout');
            return () => {
              Scheduler.log('App destroy layout');
>>>>>>> remotes/upstream/main
            };
          }, []);
          return (
            <>
              <Suspense fallback={<Text text="Fallback" />}>
                {children}
                <ThrowsInDidMount />
                <Text text="Inside" />
              </Suspense>
              <Text text="Outside" />
            </>
          );
        }

<<<<<<< HEAD
        await act(async () => {
=======
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary fallback={<Text text="Error" />}>
              <App />
            </ErrorBoundary>,
          );
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'ErrorBoundary render: try',
          'App render',
          'ThrowsInDidMount render',
          'Text:Inside render',
          'Text:Outside render',
          'ThrowsInDidMount componentDidMount',
          'Text:Inside create layout',
          'Text:Outside create layout',
          'App create layout',
          'Text:Inside create passive',
          'Text:Outside create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          span('ThrowsInDidMount'),
          span('Inside'),
          span('Outside'),
        ]);

        // Schedule an update that causes React to suspend.
        await act(async () => {
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="ThrowsInDidMount" />
            <span prop="Inside" />
            <span prop="Outside" />
          </>,
        );

        // Schedule an update that causes React to suspend.
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary fallback={<Text text="Error" />}>
              <App>
                <AsyncText text="Async" ms={1000} />
              </App>
            </ErrorBoundary>,
          );
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
          'ErrorBoundary render: try',
          'App render',
          'Suspend:Async',
          'ThrowsInDidMount render',
          'Text:Inside render',
=======
        assertLog([
          'ErrorBoundary render: try',
          'App render',
          'Suspend:Async',
>>>>>>> remotes/upstream/main
          'Text:Fallback render',
          'Text:Outside render',
          'ThrowsInDidMount componentWillUnmount',
          'Text:Inside destroy layout',
          'Text:Fallback create layout',
          'Text:Fallback create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          spanHidden('ThrowsInDidMount'),
          spanHidden('Inside'),
          span('Fallback'),
          span('Outside'),
        ]);
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="ThrowsInDidMount" hidden={true} />
            <span prop="Inside" hidden={true} />
            <span prop="Fallback" />
            <span prop="Outside" />
          </>,
        );
>>>>>>> remotes/upstream/main

        // Resolve the pending suspense and throw
        componentDidMountShouldThrow = true;
        await act(async () => {
          await resolveText('Async');
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'AsyncText:Async render',
          'ThrowsInDidMount render',
          'Text:Inside render',
          'Text:Fallback destroy layout',
          'AsyncText:Async create layout',

          // Even though an error was thrown in componentDidMount,
          // subsequent layout effects should still be destroyed.
          'ThrowsInDidMount componentDidMount',
          'Text:Inside create layout',

          // Finish the in-progress commit
          'Text:Fallback destroy passive',
          'AsyncText:Async create passive',

          // Destroy layout and passive effects in the errored tree.
          'App destroy layout',
          'AsyncText:Async destroy layout',
          'ThrowsInDidMount componentWillUnmount',
          'Text:Inside destroy layout',
          'Text:Outside destroy layout',
          'AsyncText:Async destroy passive',
          'Text:Inside destroy passive',
          'Text:Outside destroy passive',

          // Render fallback
          'ErrorBoundary render: catch',
          'Text:Error render',
          'Text:Error create layout',
          'Text:Error create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([span('Error')]);
      });

      // @gate enableCache
      it('are properly handled for componentWillUnmount', async () => {
        class ThrowsInWillUnmount extends React.Component {
          componentDidMount() {
            Scheduler.unstable_yieldValue(
              'ThrowsInWillUnmount componentDidMount',
            );
          }
          componentWillUnmount() {
            Scheduler.unstable_yieldValue(
              'ThrowsInWillUnmount componentWillUnmount',
            );
            throw Error('expected');
          }
          render() {
            Scheduler.unstable_yieldValue('ThrowsInWillUnmount render');
=======
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Error" />);
      });

      // @gate enableLegacyCache
      it('are properly handled for componentWillUnmount', async () => {
        class ThrowsInWillUnmount extends React.Component {
          componentDidMount() {
            Scheduler.log('ThrowsInWillUnmount componentDidMount');
          }
          componentWillUnmount() {
            Scheduler.log('ThrowsInWillUnmount componentWillUnmount');
            throw Error('expected');
          }
          render() {
            Scheduler.log('ThrowsInWillUnmount render');
>>>>>>> remotes/upstream/main
            return <span prop="ThrowsInWillUnmount" />;
          }
        }

        function App({children = null}) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App render');
          React.useLayoutEffect(() => {
            Scheduler.unstable_yieldValue('App create layout');
            return () => {
              Scheduler.unstable_yieldValue('App destroy layout');
=======
          Scheduler.log('App render');
          React.useLayoutEffect(() => {
            Scheduler.log('App create layout');
            return () => {
              Scheduler.log('App destroy layout');
>>>>>>> remotes/upstream/main
            };
          }, []);
          return (
            <>
              <Suspense fallback={<Text text="Fallback" />}>
                {children}
                <ThrowsInWillUnmount />
                <Text text="Inside" />
              </Suspense>
              <Text text="Outside" />
            </>
          );
        }

<<<<<<< HEAD
        await act(async () => {
=======
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary fallback={<Text text="Error" />}>
              <App />
            </ErrorBoundary>,
          );
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'ErrorBoundary render: try',
          'App render',
          'ThrowsInWillUnmount render',
          'Text:Inside render',
          'Text:Outside render',
          'ThrowsInWillUnmount componentDidMount',
          'Text:Inside create layout',
          'Text:Outside create layout',
          'App create layout',
          'Text:Inside create passive',
          'Text:Outside create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          span('ThrowsInWillUnmount'),
          span('Inside'),
          span('Outside'),
        ]);

        // Schedule an update that suspends and triggers our error code.
        await act(async () => {
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="ThrowsInWillUnmount" />
            <span prop="Inside" />
            <span prop="Outside" />
          </>,
        );

        // Schedule an update that suspends and triggers our error code.
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary fallback={<Text text="Error" />}>
              <App>
                <AsyncText text="Async" ms={1000} />
              </App>
            </ErrorBoundary>,
          );
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
          'ErrorBoundary render: try',
          'App render',
          'Suspend:Async',
          'ThrowsInWillUnmount render',
          'Text:Inside render',
=======
        assertLog([
          'ErrorBoundary render: try',
          'App render',
          'Suspend:Async',
>>>>>>> remotes/upstream/main
          'Text:Fallback render',
          'Text:Outside render',

          // Even though an error was thrown in componentWillUnmount,
          // subsequent layout effects should still be destroyed.
          'ThrowsInWillUnmount componentWillUnmount',
          'Text:Inside destroy layout',

          // Finish the in-progress commit
          'Text:Fallback create layout',
          'Text:Fallback create passive',

          // Destroy layout and passive effects in the errored tree.
          'App destroy layout',
          'Text:Fallback destroy layout',
          'Text:Outside destroy layout',
          'Text:Inside destroy passive',
          'Text:Fallback destroy passive',
          'Text:Outside destroy passive',

          // Render fallback
          'ErrorBoundary render: catch',
          'Text:Error render',
          'Text:Error create layout',
          'Text:Error create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([span('Error')]);
      });

      // @gate enableCache
=======
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Error" />);
      });

      // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
      // @gate replayFailedUnitOfWorkWithInvokeGuardedCallback
      it('are properly handled for layout effect creation', async () => {
        let useLayoutEffectShouldThrow = false;

        function ThrowsInLayoutEffect() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ThrowsInLayoutEffect render');
          React.useLayoutEffect(() => {
            Scheduler.unstable_yieldValue(
              'ThrowsInLayoutEffect useLayoutEffect create',
            );
=======
          Scheduler.log('ThrowsInLayoutEffect render');
          React.useLayoutEffect(() => {
            Scheduler.log('ThrowsInLayoutEffect useLayoutEffect create');
>>>>>>> remotes/upstream/main
            if (useLayoutEffectShouldThrow) {
              throw Error('expected');
            }
            return () => {
<<<<<<< HEAD
              Scheduler.unstable_yieldValue(
                'ThrowsInLayoutEffect useLayoutEffect destroy',
              );
=======
              Scheduler.log('ThrowsInLayoutEffect useLayoutEffect destroy');
>>>>>>> remotes/upstream/main
            };
          }, []);
          return <span prop="ThrowsInLayoutEffect" />;
        }

        function App({children = null}) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App render');
          React.useLayoutEffect(() => {
            Scheduler.unstable_yieldValue('App create layout');
            return () => {
              Scheduler.unstable_yieldValue('App destroy layout');
=======
          Scheduler.log('App render');
          React.useLayoutEffect(() => {
            Scheduler.log('App create layout');
            return () => {
              Scheduler.log('App destroy layout');
>>>>>>> remotes/upstream/main
            };
          }, []);
          return (
            <>
              <Suspense fallback={<Text text="Fallback" />}>
                {children}
                <ThrowsInLayoutEffect />
                <Text text="Inside" />
              </Suspense>
              <Text text="Outside" />
            </>
          );
        }

<<<<<<< HEAD
        await act(async () => {
=======
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary fallback={<Text text="Error" />}>
              <App />
            </ErrorBoundary>,
          );
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'ErrorBoundary render: try',
          'App render',
          'ThrowsInLayoutEffect render',
          'Text:Inside render',
          'Text:Outside render',
          'ThrowsInLayoutEffect useLayoutEffect create',
          'Text:Inside create layout',
          'Text:Outside create layout',
          'App create layout',
          'Text:Inside create passive',
          'Text:Outside create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          span('ThrowsInLayoutEffect'),
          span('Inside'),
          span('Outside'),
        ]);

        // Schedule an update that causes React to suspend.
        await act(async () => {
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="ThrowsInLayoutEffect" />
            <span prop="Inside" />
            <span prop="Outside" />
          </>,
        );

        // Schedule an update that causes React to suspend.
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary fallback={<Text text="Error" />}>
              <App>
                <AsyncText text="Async" ms={1000} />
              </App>
            </ErrorBoundary>,
          );
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
          'ErrorBoundary render: try',
          'App render',
          'Suspend:Async',
          'ThrowsInLayoutEffect render',
          'Text:Inside render',
=======
        assertLog([
          'ErrorBoundary render: try',
          'App render',
          'Suspend:Async',
>>>>>>> remotes/upstream/main
          'Text:Fallback render',
          'Text:Outside render',
          'ThrowsInLayoutEffect useLayoutEffect destroy',
          'Text:Inside destroy layout',
          'Text:Fallback create layout',
          'Text:Fallback create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          spanHidden('ThrowsInLayoutEffect'),
          spanHidden('Inside'),
          span('Fallback'),
          span('Outside'),
        ]);
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="ThrowsInLayoutEffect" hidden={true} />
            <span prop="Inside" hidden={true} />
            <span prop="Fallback" />
            <span prop="Outside" />
          </>,
        );
>>>>>>> remotes/upstream/main

        // Resolve the pending suspense and throw
        useLayoutEffectShouldThrow = true;
        await act(async () => {
          await resolveText('Async');
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'AsyncText:Async render',
          'ThrowsInLayoutEffect render',
          'Text:Inside render',

          'Text:Fallback destroy layout',

          // Even though an error was thrown in useLayoutEffect,
          // subsequent layout effects should still be created.
          'AsyncText:Async create layout',
          'ThrowsInLayoutEffect useLayoutEffect create',
          'Text:Inside create layout',

          // Finish the in-progress commit
          'Text:Fallback destroy passive',
          'AsyncText:Async create passive',

          // Destroy layout and passive effects in the errored tree.
          'App destroy layout',
          'AsyncText:Async destroy layout',
          'Text:Inside destroy layout',
          'Text:Outside destroy layout',
          'AsyncText:Async destroy passive',
          'Text:Inside destroy passive',
          'Text:Outside destroy passive',

          // Render fallback
          'ErrorBoundary render: catch',
          'Text:Error render',
          'Text:Error create layout',
          'Text:Error create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([span('Error')]);
      });

      // @gate enableCache
      // @gate replayFailedUnitOfWorkWithInvokeGuardedCallback
      it('are properly handled for layout effect destruction', async () => {
        function ThrowsInLayoutEffectDestroy() {
          Scheduler.unstable_yieldValue('ThrowsInLayoutEffectDestroy render');
          React.useLayoutEffect(() => {
            Scheduler.unstable_yieldValue(
              'ThrowsInLayoutEffectDestroy useLayoutEffect create',
            );
            return () => {
              Scheduler.unstable_yieldValue(
=======
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Error" />);
      });

      // @gate enableLegacyCache
      // @gate replayFailedUnitOfWorkWithInvokeGuardedCallback
      it('are properly handled for layout effect destruction', async () => {
        function ThrowsInLayoutEffectDestroy() {
          Scheduler.log('ThrowsInLayoutEffectDestroy render');
          React.useLayoutEffect(() => {
            Scheduler.log('ThrowsInLayoutEffectDestroy useLayoutEffect create');
            return () => {
              Scheduler.log(
>>>>>>> remotes/upstream/main
                'ThrowsInLayoutEffectDestroy useLayoutEffect destroy',
              );
              throw Error('expected');
            };
          }, []);
          return <span prop="ThrowsInLayoutEffectDestroy" />;
        }

        function App({children = null}) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App render');
          React.useLayoutEffect(() => {
            Scheduler.unstable_yieldValue('App create layout');
            return () => {
              Scheduler.unstable_yieldValue('App destroy layout');
=======
          Scheduler.log('App render');
          React.useLayoutEffect(() => {
            Scheduler.log('App create layout');
            return () => {
              Scheduler.log('App destroy layout');
>>>>>>> remotes/upstream/main
            };
          }, []);
          return (
            <>
              <Suspense fallback={<Text text="Fallback" />}>
                {children}
                <ThrowsInLayoutEffectDestroy />
                <Text text="Inside" />
              </Suspense>
              <Text text="Outside" />
            </>
          );
        }

<<<<<<< HEAD
        await act(async () => {
=======
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary fallback={<Text text="Error" />}>
              <App />
            </ErrorBoundary>,
          );
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'ErrorBoundary render: try',
          'App render',
          'ThrowsInLayoutEffectDestroy render',
          'Text:Inside render',
          'Text:Outside render',
          'ThrowsInLayoutEffectDestroy useLayoutEffect create',
          'Text:Inside create layout',
          'Text:Outside create layout',
          'App create layout',
          'Text:Inside create passive',
          'Text:Outside create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          span('ThrowsInLayoutEffectDestroy'),
          span('Inside'),
          span('Outside'),
        ]);

        // Schedule an update that suspends and triggers our error code.
        await act(async () => {
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="ThrowsInLayoutEffectDestroy" />
            <span prop="Inside" />
            <span prop="Outside" />
          </>,
        );

        // Schedule an update that suspends and triggers our error code.
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary fallback={<Text text="Error" />}>
              <App>
                <AsyncText text="Async" ms={1000} />
              </App>
            </ErrorBoundary>,
          );
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
          'ErrorBoundary render: try',
          'App render',
          'Suspend:Async',
          'ThrowsInLayoutEffectDestroy render',
          'Text:Inside render',
=======
        assertLog([
          'ErrorBoundary render: try',
          'App render',
          'Suspend:Async',
>>>>>>> remotes/upstream/main
          'Text:Fallback render',
          'Text:Outside render',

          // Even though an error was thrown in useLayoutEffect destroy,
          // subsequent layout effects should still be destroyed.
          'ThrowsInLayoutEffectDestroy useLayoutEffect destroy',
          'Text:Inside destroy layout',

          // Finish the in-progress commit
          'Text:Fallback create layout',
          'Text:Fallback create passive',

          // Destroy layout and passive effects in the errored tree.
          'App destroy layout',
          'Text:Fallback destroy layout',
          'Text:Outside destroy layout',
          'Text:Inside destroy passive',
          'Text:Fallback destroy passive',
          'Text:Outside destroy passive',

          // Render fallback
          'ErrorBoundary render: catch',
          'Text:Error render',
          'Text:Error create layout',
          'Text:Error create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([span('Error')]);
      });
    });

    // @gate enableCache
=======
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Error" />);
      });
    });

    // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
    it('should be only destroy layout effects once if a tree suspends in multiple places', async () => {
      class ClassText extends React.Component {
        componentDidMount() {
          const {text} = this.props;
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`ClassText:${text} componentDidMount`);
        }
        componentDidUpdate() {
          const {text} = this.props;
          Scheduler.unstable_yieldValue(`ClassText:${text} componentDidUpdate`);
        }
        componentWillUnmount() {
          const {text} = this.props;
          Scheduler.unstable_yieldValue(
            `ClassText:${text} componentWillUnmount`,
          );
        }
        render() {
          const {children, text} = this.props;
          Scheduler.unstable_yieldValue(`ClassText:${text} render`);
=======
          Scheduler.log(`ClassText:${text} componentDidMount`);
        }
        componentDidUpdate() {
          const {text} = this.props;
          Scheduler.log(`ClassText:${text} componentDidUpdate`);
        }
        componentWillUnmount() {
          const {text} = this.props;
          Scheduler.log(`ClassText:${text} componentWillUnmount`);
        }
        render() {
          const {children, text} = this.props;
          Scheduler.log(`ClassText:${text} render`);
>>>>>>> remotes/upstream/main
          return <span prop={text}>{children}</span>;
        }
      }

      function App({children = null}) {
        return (
          <Suspense fallback={<ClassText text="Fallback" />}>
            <Text text="Function" />
            {children}
            <ClassText text="Class" />
          </Suspense>
        );
      }

<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Function render',
        'ClassText:Class render',
        'Text:Function create layout',
        'ClassText:Class componentDidMount',
        'Text:Function create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Function'),
        span('Class'),
      ]);

      // Schedule an update that causes React to suspend.
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Function" />
          <span prop="Class" />
        </>,
      );

      // Schedule an update that causes React to suspend.
      await act(async () => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App>
            <AsyncText text="Async_1" ms={1000} />
            <AsyncText text="Async_2" ms={2000} />
          </App>,
        );
<<<<<<< HEAD
      });
      expect(Scheduler).toHaveYielded([
        'Text:Function render',
        'Suspend:Async_1',
        'Suspend:Async_2',
        'ClassText:Class render',
        'ClassText:Fallback render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        span('Function'),
        span('Class'),
      ]);

      await advanceTimers(1000);

      // Timing out should commit the fallback and destroy inner layout effects.
      expect(Scheduler).toHaveYielded([
        'Text:Function destroy layout',
        'ClassText:Class componentWillUnmount',
        'ClassText:Fallback componentDidMount',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Function'),
        spanHidden('Class'),
        span('Fallback'),
      ]);
=======
        await waitFor([
          'Text:Function render',
          'Suspend:Async_1',
          'ClassText:Fallback render',
          'Text:Function destroy layout',
          'ClassText:Class componentWillUnmount',
          'ClassText:Fallback componentDidMount',
        ]);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Function" hidden={true} />
            <span prop="Class" hidden={true} />
            <span prop="Fallback" />
          </>,
        );
      });
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async_1');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Text:Function render',
        'AsyncText:Async_1 render',
        'Suspend:Async_2',
        'ClassText:Class render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Function'),
        spanHidden('Class'),
        span('Fallback'),
      ]);
=======
      assertLog([
        'Text:Function render',
        'AsyncText:Async_1 render',
        'Suspend:Async_2',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Function" hidden={true} />
          <span prop="Class" hidden={true} />
          <span prop="Fallback" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async_2');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Function render',
        'AsyncText:Async_1 render',
        'AsyncText:Async_2 render',
        'ClassText:Class render',
        'ClassText:Fallback componentWillUnmount',
        'Text:Function create layout',
        'AsyncText:Async_1 create layout',
        'AsyncText:Async_2 create layout',
        'ClassText:Class componentDidMount',
        'AsyncText:Async_1 create passive',
        'AsyncText:Async_2 create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Function'),
        span('Async_1'),
        span('Async_2'),
        span('Class'),
      ]);

      await act(async () => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Function" />
          <span prop="Async_1" />
          <span prop="Async_2" />
          <span prop="Class" />
        </>,
      );

      await act(() => {
        ReactNoop.render(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Function destroy layout',
        'AsyncText:Async_1 destroy layout',
        'AsyncText:Async_2 destroy layout',
        'ClassText:Class componentWillUnmount',
        'Text:Function destroy passive',
        'AsyncText:Async_1 destroy passive',
        'AsyncText:Async_2 destroy passive',
      ]);
    });

<<<<<<< HEAD
    // @gate enableCache
=======
    // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
    it('should be only destroy layout effects once if a component suspends multiple times', async () => {
      class ClassText extends React.Component {
        componentDidMount() {
          const {text} = this.props;
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(`ClassText:${text} componentDidMount`);
        }
        componentDidUpdate() {
          const {text} = this.props;
          Scheduler.unstable_yieldValue(`ClassText:${text} componentDidUpdate`);
        }
        componentWillUnmount() {
          const {text} = this.props;
          Scheduler.unstable_yieldValue(
            `ClassText:${text} componentWillUnmount`,
          );
        }
        render() {
          const {children, text} = this.props;
          Scheduler.unstable_yieldValue(`ClassText:${text} render`);
=======
          Scheduler.log(`ClassText:${text} componentDidMount`);
        }
        componentDidUpdate() {
          const {text} = this.props;
          Scheduler.log(`ClassText:${text} componentDidUpdate`);
        }
        componentWillUnmount() {
          const {text} = this.props;
          Scheduler.log(`ClassText:${text} componentWillUnmount`);
        }
        render() {
          const {children, text} = this.props;
          Scheduler.log(`ClassText:${text} render`);
>>>>>>> remotes/upstream/main
          return <span prop={text}>{children}</span>;
        }
      }

      let textToRead = null;

      function Suspender() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`Suspender "${textToRead}" render`);
=======
        Scheduler.log(`Suspender "${textToRead}" render`);
>>>>>>> remotes/upstream/main
        if (textToRead !== null) {
          readText(textToRead);
        }
        return <span prop="Suspender" />;
      }

      function App({children = null}) {
        return (
          <Suspense fallback={<ClassText text="Fallback" />}>
            <Text text="Function" />
            <Suspender />
            <ClassText text="Class" />
          </Suspense>
        );
      }

<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Function render',
        'Suspender "null" render',
        'ClassText:Class render',
        'Text:Function create layout',
        'ClassText:Class componentDidMount',
        'Text:Function create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Function'),
        span('Suspender'),
        span('Class'),
      ]);

      // Schedule an update that causes React to suspend.
      textToRead = 'A';
      act(() => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
        'Text:Function render',
        'Suspender "A" render',
        'Suspend:A',
        'ClassText:Class render',
        'ClassText:Fallback render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        span('Function'),
        span('Suspender'),
        span('Class'),
      ]);

      await advanceTimers(1000);

      // Timing out should commit the fallback and destroy inner layout effects.
      expect(Scheduler).toHaveYielded([
        'Text:Function destroy layout',
        'ClassText:Class componentWillUnmount',
        'ClassText:Fallback componentDidMount',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Function'),
        spanHidden('Suspender'),
        spanHidden('Class'),
        span('Fallback'),
      ]);
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Function" />
          <span prop="Suspender" />
          <span prop="Class" />
        </>,
      );

      // Schedule an update that causes React to suspend.
      textToRead = 'A';
      await act(async () => {
        ReactNoop.render(<App />);
        await waitFor([
          'Text:Function render',
          'Suspender "A" render',
          'Suspend:A',
          'ClassText:Fallback render',
          'Text:Function destroy layout',
          'ClassText:Class componentWillUnmount',
          'ClassText:Fallback componentDidMount',
        ]);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Function" hidden={true} />
            <span prop="Suspender" hidden={true} />
            <span prop="Class" hidden={true} />
            <span prop="Fallback" />
          </>,
        );
      });
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      textToRead = 'B';
      await act(async () => {
        await resolveText('A');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Text:Function render',
        'Suspender "B" render',
        'Suspend:B',
        'ClassText:Class render',
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('Function'),
        spanHidden('Suspender'),
        spanHidden('Class'),
        span('Fallback'),
      ]);
=======
      assertLog(['Text:Function render', 'Suspender "B" render', 'Suspend:B']);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Function" hidden={true} />
          <span prop="Suspender" hidden={true} />
          <span prop="Class" hidden={true} />
          <span prop="Fallback" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('B');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Function render',
        'Suspender "B" render',
        'ClassText:Class render',
        'ClassText:Fallback componentWillUnmount',
        'Text:Function create layout',
        'ClassText:Class componentDidMount',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Function'),
        span('Suspender'),
        span('Class'),
      ]);

      await act(async () => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Function" />
          <span prop="Suspender" />
          <span prop="Class" />
        </>,
      );

      await act(() => {
        ReactNoop.render(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'Text:Function destroy layout',
        'ClassText:Class componentWillUnmount',
        'Text:Function destroy passive',
      ]);
    });
  });

  describe('refs within a tree that re-suspends in an update', () => {
    function RefCheckerOuter({Component}) {
      const refObject = React.useRef(null);

      const manualRef = React.useMemo(() => ({current: null}), []);
      const refCallback = React.useCallback(value => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          `RefCheckerOuter refCallback value? ${value != null}`,
        );
        manualRef.current = value;
      }, []);

      Scheduler.unstable_yieldValue(`RefCheckerOuter render`);

      React.useLayoutEffect(() => {
        Scheduler.unstable_yieldValue(
          `RefCheckerOuter create layout refObject? ${refObject.current !=
            null} refCallback? ${manualRef.current != null}`,
        );
        return () => {
          Scheduler.unstable_yieldValue(
            `RefCheckerOuter destroy layout refObject? ${refObject.current !=
              null} refCallback? ${manualRef.current != null}`,
=======
        Scheduler.log(`RefCheckerOuter refCallback value? ${value != null}`);
        manualRef.current = value;
      }, []);

      Scheduler.log(`RefCheckerOuter render`);

      React.useLayoutEffect(() => {
        Scheduler.log(
          `RefCheckerOuter create layout refObject? ${
            refObject.current != null
          } refCallback? ${manualRef.current != null}`,
        );
        return () => {
          Scheduler.log(
            `RefCheckerOuter destroy layout refObject? ${
              refObject.current != null
            } refCallback? ${manualRef.current != null}`,
>>>>>>> remotes/upstream/main
          );
        };
      }, []);

      return (
        <>
          <Component ref={refObject} prop="refObject">
            <RefCheckerInner forwardedRef={refObject} text="refObject" />
          </Component>
          <Component ref={refCallback} prop="refCallback">
            <RefCheckerInner forwardedRef={manualRef} text="refCallback" />
          </Component>
        </>
      );
    }

    function RefCheckerInner({forwardedRef, text}) {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(`RefCheckerInner:${text} render`);
      React.useLayoutEffect(() => {
        Scheduler.unstable_yieldValue(
          `RefCheckerInner:${text} create layout ref? ${forwardedRef.current !=
            null}`,
        );
        return () => {
          Scheduler.unstable_yieldValue(
            `RefCheckerInner:${text} destroy layout ref? ${forwardedRef.current !=
              null}`,
=======
      Scheduler.log(`RefCheckerInner:${text} render`);
      React.useLayoutEffect(() => {
        Scheduler.log(
          `RefCheckerInner:${text} create layout ref? ${
            forwardedRef.current != null
          }`,
        );
        return () => {
          Scheduler.log(
            `RefCheckerInner:${text} destroy layout ref? ${
              forwardedRef.current != null
            }`,
>>>>>>> remotes/upstream/main
          );
        };
      }, []);
      return null;
    }

<<<<<<< HEAD
    // @gate enableCache
    it('should not be cleared within legacy roots', async () => {
      class ClassComponent extends React.Component {
        render() {
          Scheduler.unstable_yieldValue(
            `ClassComponent:${this.props.prop} render`,
          );
=======
    // @gate enableLegacyCache
    it('should not be cleared within legacy roots', async () => {
      class ClassComponent extends React.Component {
        render() {
          Scheduler.log(`ClassComponent:${this.props.prop} render`);
>>>>>>> remotes/upstream/main
          return this.props.children;
        }
      }

      function App({children}) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`App render`);
=======
        Scheduler.log(`App render`);
>>>>>>> remotes/upstream/main
        return (
          <Suspense fallback={<Text text="Fallback" />}>
            {children}
            <RefCheckerOuter Component={ClassComponent} />
          </Suspense>
        );
      }

<<<<<<< HEAD
      act(() => {
        ReactNoop.renderLegacySyncRoot(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.renderLegacySyncRoot(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'RefCheckerOuter render',
        'ClassComponent:refObject render',
        'RefCheckerInner:refObject render',
        'ClassComponent:refCallback render',
        'RefCheckerInner:refCallback render',
        'RefCheckerInner:refObject create layout ref? false',
        'RefCheckerInner:refCallback create layout ref? false',
        'RefCheckerOuter refCallback value? true',
        'RefCheckerOuter create layout refObject? true refCallback? true',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(null);

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.renderLegacySyncRoot(
          <App children={<AsyncText text="Async" ms={1000} />} />,
        );
      });
      await advanceTimers(1000);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'Suspend:Async',
        'RefCheckerOuter render',
        'ClassComponent:refObject render',
        'RefCheckerInner:refObject render',
        'ClassComponent:refCallback render',
        'RefCheckerInner:refCallback render',
        'Text:Fallback render',
        'Text:Fallback create layout',
        'Text:Fallback create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span('Fallback')]);
=======
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Fallback" />);
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async render',
        'Text:Fallback destroy layout',
        'AsyncText:Async create layout',
        'Text:Fallback destroy passive',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span('Async')]);

      await act(async () => {
        ReactNoop.renderLegacySyncRoot(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Async" />);

      await act(() => {
        ReactNoop.renderLegacySyncRoot(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async destroy layout',
        'RefCheckerOuter destroy layout refObject? true refCallback? true',
        'RefCheckerInner:refObject destroy layout ref? false',
        'RefCheckerOuter refCallback value? false',
        'RefCheckerInner:refCallback destroy layout ref? false',
        'AsyncText:Async destroy passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);
    });

    // @gate enableCache
    it('should be cleared and reset for host components', async () => {
      function App({children}) {
        Scheduler.unstable_yieldValue(`App render`);
=======
      expect(ReactNoop).toMatchRenderedOutput(null);
    });

    // @gate enableLegacyCache
    it('should be cleared and reset for host components', async () => {
      function App({children}) {
        Scheduler.log(`App render`);
>>>>>>> remotes/upstream/main
        return (
          <Suspense fallback={<Text text="Fallback" />}>
            {children}
            <RefCheckerOuter Component="span" />
          </Suspense>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'RefCheckerOuter render',
        'RefCheckerInner:refObject render',
        'RefCheckerInner:refCallback render',
        'RefCheckerInner:refObject create layout ref? false',
        'RefCheckerInner:refCallback create layout ref? false',
        'RefCheckerOuter refCallback value? true',
        'RefCheckerOuter create layout refObject? true refCallback? true',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('refObject'),
        span('refCallback'),
      ]);

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="refObject" />
          <span prop="refCallback" />
        </>,
      );

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App children={<AsyncText text="Async" ms={1000} />} />,
        );
      });
      await advanceTimers(1000);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'App render',
        'Suspend:Async',
        'RefCheckerOuter render',
        'RefCheckerInner:refObject render',
        'RefCheckerInner:refCallback render',
=======
      assertLog([
        'App render',
        'Suspend:Async',
>>>>>>> remotes/upstream/main
        'Text:Fallback render',
        'RefCheckerOuter destroy layout refObject? true refCallback? true',
        'RefCheckerInner:refObject destroy layout ref? false',
        'RefCheckerOuter refCallback value? false',
        'RefCheckerInner:refCallback destroy layout ref? false',
        'Text:Fallback create layout',
<<<<<<< HEAD
      ]);
      expect(ReactNoop.getChildren()).toEqual([
        spanHidden('refObject'),
        spanHidden('refCallback'),
        span('Fallback'),
      ]);
=======
        'Text:Fallback create passive',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="refObject" hidden={true} />
          <span prop="refCallback" hidden={true} />
          <span prop="Fallback" />
        </>,
      );
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Text:Fallback create passive',
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async render',
        'RefCheckerOuter render',
        'RefCheckerInner:refObject render',
        'RefCheckerInner:refCallback render',
        'Text:Fallback destroy layout',
        'AsyncText:Async create layout',
        'RefCheckerInner:refObject create layout ref? false',
        'RefCheckerInner:refCallback create layout ref? false',
        'RefCheckerOuter refCallback value? true',
        'RefCheckerOuter create layout refObject? true refCallback? true',
        'Text:Fallback destroy passive',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([
        span('Async'),
        span('refObject'),
        span('refCallback'),
      ]);

      await act(async () => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(
        <>
          <span prop="Async" />
          <span prop="refObject" />
          <span prop="refCallback" />
        </>,
      );

      await act(() => {
        ReactNoop.render(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async destroy layout',
        'RefCheckerOuter destroy layout refObject? true refCallback? true',
        'RefCheckerInner:refObject destroy layout ref? false',
        'RefCheckerOuter refCallback value? false',
        'RefCheckerInner:refCallback destroy layout ref? false',
        'AsyncText:Async destroy passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);
    });

    // @gate enableCache
    it('should be cleared and reset for class components', async () => {
      class ClassComponent extends React.Component {
        render() {
          Scheduler.unstable_yieldValue(
            `ClassComponent:${this.props.prop} render`,
          );
=======
      expect(ReactNoop).toMatchRenderedOutput(null);
    });

    // @gate enableLegacyCache
    it('should be cleared and reset for class components', async () => {
      class ClassComponent extends React.Component {
        render() {
          Scheduler.log(`ClassComponent:${this.props.prop} render`);
>>>>>>> remotes/upstream/main
          return this.props.children;
        }
      }

      function App({children}) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`App render`);
=======
        Scheduler.log(`App render`);
>>>>>>> remotes/upstream/main
        return (
          <Suspense fallback={<Text text="Fallback" />}>
            {children}
            <RefCheckerOuter Component={ClassComponent} />
          </Suspense>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'RefCheckerOuter render',
        'ClassComponent:refObject render',
        'RefCheckerInner:refObject render',
        'ClassComponent:refCallback render',
        'RefCheckerInner:refCallback render',
        'RefCheckerInner:refObject create layout ref? false',
        'RefCheckerInner:refCallback create layout ref? false',
        'RefCheckerOuter refCallback value? true',
        'RefCheckerOuter create layout refObject? true refCallback? true',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(null);

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App children={<AsyncText text="Async" ms={1000} />} />,
        );
      });
      await advanceTimers(1000);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'App render',
        'Suspend:Async',
        'RefCheckerOuter render',
        'ClassComponent:refObject render',
        'RefCheckerInner:refObject render',
        'ClassComponent:refCallback render',
        'RefCheckerInner:refCallback render',
=======
      assertLog([
        'App render',
        'Suspend:Async',
>>>>>>> remotes/upstream/main
        'Text:Fallback render',
        'RefCheckerOuter destroy layout refObject? true refCallback? true',
        'RefCheckerInner:refObject destroy layout ref? false',
        'RefCheckerOuter refCallback value? false',
        'RefCheckerInner:refCallback destroy layout ref? false',
        'Text:Fallback create layout',
<<<<<<< HEAD
      ]);
      expect(ReactNoop.getChildren()).toEqual([span('Fallback')]);
=======
        'Text:Fallback create passive',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Fallback" />);
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Text:Fallback create passive',
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async render',
        'RefCheckerOuter render',
        'ClassComponent:refObject render',
        'RefCheckerInner:refObject render',
        'ClassComponent:refCallback render',
        'RefCheckerInner:refCallback render',
        'Text:Fallback destroy layout',
        'AsyncText:Async create layout',
        'RefCheckerInner:refObject create layout ref? false',
        'RefCheckerInner:refCallback create layout ref? false',
        'RefCheckerOuter refCallback value? true',
        'RefCheckerOuter create layout refObject? true refCallback? true',
        'Text:Fallback destroy passive',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span('Async')]);

      await act(async () => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Async" />);

      await act(() => {
        ReactNoop.render(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async destroy layout',
        'RefCheckerOuter destroy layout refObject? true refCallback? true',
        'RefCheckerInner:refObject destroy layout ref? false',
        'RefCheckerOuter refCallback value? false',
        'RefCheckerInner:refCallback destroy layout ref? false',
        'AsyncText:Async destroy passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);
    });

    // @gate enableCache
    it('should be cleared and reset for function components with useImperativeHandle', async () => {
      const FunctionComponent = React.forwardRef((props, ref) => {
        Scheduler.unstable_yieldValue('FunctionComponent render');
=======
      expect(ReactNoop).toMatchRenderedOutput(null);
    });

    // @gate enableLegacyCache
    it('should be cleared and reset for function components with useImperativeHandle', async () => {
      const FunctionComponent = React.forwardRef((props, ref) => {
        Scheduler.log('FunctionComponent render');
>>>>>>> remotes/upstream/main
        React.useImperativeHandle(
          ref,
          () => ({
            // Noop
          }),
          [],
        );
        return props.children;
      });
      FunctionComponent.displayName = 'FunctionComponent';

      function App({children}) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`App render`);
=======
        Scheduler.log(`App render`);
>>>>>>> remotes/upstream/main
        return (
          <Suspense fallback={<Text text="Fallback" />}>
            {children}
            <RefCheckerOuter Component={FunctionComponent} />
          </Suspense>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'RefCheckerOuter render',
        'FunctionComponent render',
        'RefCheckerInner:refObject render',
        'FunctionComponent render',
        'RefCheckerInner:refCallback render',
        'RefCheckerInner:refObject create layout ref? false',
        'RefCheckerInner:refCallback create layout ref? false',
        'RefCheckerOuter refCallback value? true',
        'RefCheckerOuter create layout refObject? true refCallback? true',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(null);

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App children={<AsyncText text="Async" ms={1000} />} />,
        );
      });
      await advanceTimers(1000);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'App render',
        'Suspend:Async',
        'RefCheckerOuter render',
        'FunctionComponent render',
        'RefCheckerInner:refObject render',
        'FunctionComponent render',
        'RefCheckerInner:refCallback render',
=======
      assertLog([
        'App render',
        'Suspend:Async',
>>>>>>> remotes/upstream/main
        'Text:Fallback render',
        'RefCheckerOuter destroy layout refObject? true refCallback? true',
        'RefCheckerInner:refObject destroy layout ref? false',
        'RefCheckerOuter refCallback value? false',
        'RefCheckerInner:refCallback destroy layout ref? false',
        'Text:Fallback create layout',
<<<<<<< HEAD
      ]);
      expect(ReactNoop.getChildren()).toEqual([span('Fallback')]);
=======
        'Text:Fallback create passive',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Fallback" />);
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Text:Fallback create passive',
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async render',
        'RefCheckerOuter render',
        'FunctionComponent render',
        'RefCheckerInner:refObject render',
        'FunctionComponent render',
        'RefCheckerInner:refCallback render',
        'Text:Fallback destroy layout',
        'AsyncText:Async create layout',
        'RefCheckerInner:refObject create layout ref? false',
        'RefCheckerInner:refCallback create layout ref? false',
        'RefCheckerOuter refCallback value? true',
        'RefCheckerOuter create layout refObject? true refCallback? true',
        'Text:Fallback destroy passive',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span('Async')]);

      await act(async () => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Async" />);

      await act(() => {
        ReactNoop.render(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async destroy layout',
        'RefCheckerOuter destroy layout refObject? true refCallback? true',
        'RefCheckerInner:refObject destroy layout ref? false',
        'RefCheckerOuter refCallback value? false',
        'RefCheckerInner:refCallback destroy layout ref? false',
        'AsyncText:Async destroy passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);
    });

    // @gate enableCache
    it('should not reset for user-managed values', async () => {
      function RefChecker({forwardedRef}) {
        Scheduler.unstable_yieldValue(`RefChecker render`);
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue(
            `RefChecker create layout ref? ${forwardedRef.current === 'test'}`,
          );
          return () => {
            Scheduler.unstable_yieldValue(
              `RefChecker destroy layout ref? ${forwardedRef.current ===
                'test'}`,
=======
      expect(ReactNoop).toMatchRenderedOutput(null);
    });

    // @gate enableLegacyCache
    it('should not reset for user-managed values', async () => {
      function RefChecker({forwardedRef}) {
        Scheduler.log(`RefChecker render`);
        React.useLayoutEffect(() => {
          Scheduler.log(
            `RefChecker create layout ref? ${forwardedRef.current === 'test'}`,
          );
          return () => {
            Scheduler.log(
              `RefChecker destroy layout ref? ${
                forwardedRef.current === 'test'
              }`,
>>>>>>> remotes/upstream/main
            );
          };
        }, []);
        return null;
      }

      function App({children = null}) {
        const ref = React.useRef('test');
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(`App render`);
        React.useLayoutEffect(() => {
          Scheduler.unstable_yieldValue(
            `App create layout ref? ${ref.current === 'test'}`,
          );
          return () => {
            Scheduler.unstable_yieldValue(
              `App destroy layout ref? ${ref.current === 'test'}`,
            );
=======
        Scheduler.log(`App render`);
        React.useLayoutEffect(() => {
          Scheduler.log(`App create layout ref? ${ref.current === 'test'}`);
          return () => {
            Scheduler.log(`App destroy layout ref? ${ref.current === 'test'}`);
>>>>>>> remotes/upstream/main
          };
        }, []);
        return (
          <Suspense fallback={<Text text="Fallback" />}>
            {children}
            <RefChecker forwardedRef={ref} />
          </Suspense>
        );
      }

      // Mount
<<<<<<< HEAD
      await act(async () => {
        ReactNoop.render(<App />);
      });
      expect(Scheduler).toHaveYielded([
=======
      await act(() => {
        ReactNoop.render(<App />);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App render',
        'RefChecker render',
        'RefChecker create layout ref? true',
        'App create layout ref? true',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      act(() => {
=======
      expect(ReactNoop).toMatchRenderedOutput(null);

      // Suspend the inner Suspense subtree (only inner effects should be destroyed)
      await act(() => {
>>>>>>> remotes/upstream/main
        ReactNoop.render(
          <App children={<AsyncText text="Async" ms={1000} />} />,
        );
      });
      await advanceTimers(1000);
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'App render',
        'Suspend:Async',
        'RefChecker render',
        'Text:Fallback render',
        'RefChecker destroy layout ref? true',
        'Text:Fallback create layout',
      ]);
      expect(ReactNoop.getChildren()).toEqual([span('Fallback')]);
=======
      assertLog([
        'App render',
        'Suspend:Async',
        'Text:Fallback render',
        'RefChecker destroy layout ref? true',
        'Text:Fallback create layout',
        'Text:Fallback create passive',
      ]);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Fallback" />);
>>>>>>> remotes/upstream/main

      // Resolving the suspended resource should re-create inner layout effects.
      await act(async () => {
        await resolveText('Async');
      });
<<<<<<< HEAD
      expect(Scheduler).toHaveYielded([
        'Text:Fallback create passive',
=======
      assertLog([
>>>>>>> remotes/upstream/main
        'AsyncText:Async render',
        'RefChecker render',
        'Text:Fallback destroy layout',
        'AsyncText:Async create layout',
        'RefChecker create layout ref? true',
        'Text:Fallback destroy passive',
        'AsyncText:Async create passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([span('Async')]);

      await act(async () => {
        ReactNoop.render(null);
      });
      expect(Scheduler).toHaveYielded([
=======
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Async" />);

      await act(() => {
        ReactNoop.render(null);
      });
      assertLog([
>>>>>>> remotes/upstream/main
        'App destroy layout ref? true',
        'AsyncText:Async destroy layout',
        'RefChecker destroy layout ref? true',
        'AsyncText:Async destroy passive',
      ]);
<<<<<<< HEAD
      expect(ReactNoop.getChildren()).toEqual([]);
    });

    describe('that throw errors', () => {
      // @gate enableCache
=======
      expect(ReactNoop).toMatchRenderedOutput(null);
    });

    describe('that throw errors', () => {
      // @gate enableLegacyCache
>>>>>>> remotes/upstream/main
      // @gate replayFailedUnitOfWorkWithInvokeGuardedCallback
      it('are properly handled in ref callbacks', async () => {
        let useRefCallbackShouldThrow = false;

        function ThrowsInRefCallback() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ThrowsInRefCallback render');
          const refCallback = React.useCallback(value => {
            Scheduler.unstable_yieldValue(
              'ThrowsInRefCallback refCallback ref? ' + !!value,
            );
=======
          Scheduler.log('ThrowsInRefCallback render');
          const refCallback = React.useCallback(value => {
            Scheduler.log('ThrowsInRefCallback refCallback ref? ' + !!value);
>>>>>>> remotes/upstream/main
            if (useRefCallbackShouldThrow) {
              throw Error('expected');
            }
          }, []);
          return <span ref={refCallback} prop="ThrowsInRefCallback" />;
        }

        function App({children = null}) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App render');
          React.useLayoutEffect(() => {
            Scheduler.unstable_yieldValue('App create layout');
            return () => {
              Scheduler.unstable_yieldValue('App destroy layout');
=======
          Scheduler.log('App render');
          React.useLayoutEffect(() => {
            Scheduler.log('App create layout');
            return () => {
              Scheduler.log('App destroy layout');
>>>>>>> remotes/upstream/main
            };
          }, []);
          return (
            <>
              <Suspense fallback={<Text text="Fallback" />}>
                {children}
                <ThrowsInRefCallback />
                <Text text="Inside" />
              </Suspense>
              <Text text="Outside" />
            </>
          );
        }

<<<<<<< HEAD
        await act(async () => {
=======
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary fallback={<Text text="Error" />}>
              <App />
            </ErrorBoundary>,
          );
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'ErrorBoundary render: try',
          'App render',
          'ThrowsInRefCallback render',
          'Text:Inside render',
          'Text:Outside render',
          'ThrowsInRefCallback refCallback ref? true',
          'Text:Inside create layout',
          'Text:Outside create layout',
          'App create layout',
          'Text:Inside create passive',
          'Text:Outside create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          span('ThrowsInRefCallback'),
          span('Inside'),
          span('Outside'),
        ]);

        // Schedule an update that causes React to suspend.
        await act(async () => {
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="ThrowsInRefCallback" />
            <span prop="Inside" />
            <span prop="Outside" />
          </>,
        );

        // Schedule an update that causes React to suspend.
        await act(() => {
>>>>>>> remotes/upstream/main
          ReactNoop.render(
            <ErrorBoundary fallback={<Text text="Error" />}>
              <App>
                <AsyncText text="Async" ms={1000} />
              </App>
            </ErrorBoundary>,
          );
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
          'ErrorBoundary render: try',
          'App render',
          'Suspend:Async',
          'ThrowsInRefCallback render',
          'Text:Inside render',
=======
        assertLog([
          'ErrorBoundary render: try',
          'App render',
          'Suspend:Async',
>>>>>>> remotes/upstream/main
          'Text:Fallback render',
          'Text:Outside render',
          'ThrowsInRefCallback refCallback ref? false',
          'Text:Inside destroy layout',
          'Text:Fallback create layout',
          'Text:Fallback create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([
          spanHidden('ThrowsInRefCallback'),
          spanHidden('Inside'),
          span('Fallback'),
          span('Outside'),
        ]);
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="ThrowsInRefCallback" hidden={true} />
            <span prop="Inside" hidden={true} />
            <span prop="Fallback" />
            <span prop="Outside" />
          </>,
        );
>>>>>>> remotes/upstream/main

        // Resolve the pending suspense and throw
        useRefCallbackShouldThrow = true;
        await act(async () => {
          await resolveText('Async');
        });
<<<<<<< HEAD
        expect(Scheduler).toHaveYielded([
=======
        assertLog([
>>>>>>> remotes/upstream/main
          'AsyncText:Async render',
          'ThrowsInRefCallback render',
          'Text:Inside render',

          // Even though an error was thrown in refCallback,
          // subsequent layout effects should still be created.
          'Text:Fallback destroy layout',
          'AsyncText:Async create layout',
          'ThrowsInRefCallback refCallback ref? true',
          'Text:Inside create layout',

          // Finish the in-progress commit
          'Text:Fallback destroy passive',
          'AsyncText:Async create passive',

          // Destroy layout and passive effects in the errored tree.
          'App destroy layout',
          'AsyncText:Async destroy layout',
          'ThrowsInRefCallback refCallback ref? false',
          'Text:Inside destroy layout',
          'Text:Outside destroy layout',
          'AsyncText:Async destroy passive',
          'Text:Inside destroy passive',
          'Text:Outside destroy passive',

          // Render fallback
          'ErrorBoundary render: catch',
          'Text:Error render',
          'Text:Error create layout',
          'Text:Error create passive',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([span('Error')]);
=======
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Error" />);
>>>>>>> remotes/upstream/main
      });
    });
  });
});
