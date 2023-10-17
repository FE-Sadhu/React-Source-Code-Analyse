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

let React = require('react');
let useContext;
let ReactNoop;
let Scheduler;
let gen;
<<<<<<< HEAD
=======
let waitForAll;
let waitFor;
let waitForThrow;
>>>>>>> remotes/upstream/main

describe('ReactNewContext', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    useContext = React.useContext;
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
    gen = require('random-seed');
<<<<<<< HEAD
  });

  function Text(props) {
    Scheduler.unstable_yieldValue(props.text);
=======

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitFor = InternalTestUtils.waitFor;
    waitForThrow = InternalTestUtils.waitForThrow;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function Text(props) {
    Scheduler.log(props.text);
>>>>>>> remotes/upstream/main
    return <span prop={props.text} />;
  }

  function span(prop) {
    return {type: 'span', children: [], prop, hidden: false};
  }

  function readContext(Context) {
    const dispatcher =
      React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentDispatcher.current;
    return dispatcher.readContext(Context);
  }

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

  // We have several ways of reading from context. sharedContextTests runs
  // a suite of tests for a given context consumer implementation.
  sharedContextTests('Context.Consumer', Context => Context.Consumer);
  sharedContextTests(
    'useContext inside function component',
    Context =>
      function Consumer(props) {
        const contextValue = useContext(Context);
        const render = props.children;
        return render(contextValue);
      },
  );
  sharedContextTests('useContext inside forwardRef component', Context =>
    React.forwardRef(function Consumer(props, ref) {
      const contextValue = useContext(Context);
      const render = props.children;
      return render(contextValue);
    }),
  );
  sharedContextTests('useContext inside memoized function component', Context =>
    React.memo(function Consumer(props) {
      const contextValue = useContext(Context);
      const render = props.children;
      return render(contextValue);
    }),
  );
  sharedContextTests(
    'readContext(Context) inside class component',
    Context =>
      class Consumer extends React.Component {
        render() {
          const contextValue = readContext(Context);
          const render = this.props.children;
          return render(contextValue);
        }
      },
  );
  sharedContextTests(
    'readContext(Context) inside pure class component',
    Context =>
      class Consumer extends React.PureComponent {
        render() {
          const contextValue = readContext(Context);
          const render = this.props.children;
          return render(contextValue);
        }
      },
  );

  function sharedContextTests(label, getConsumer) {
    describe(`reading context with ${label}`, () => {
<<<<<<< HEAD
      it('simple mount and update', () => {
=======
      it('simple mount and update', async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext(1);
        const Consumer = getConsumer(Context);

        const Indirection = React.Fragment;

        function App(props) {
          return (
            <Context.Provider value={props.value}>
              <Indirection>
                <Indirection>
                  <Consumer>
                    {value => <span prop={'Result: ' + value} />}
                  </Consumer>
                </Indirection>
              </Indirection>
            </Context.Provider>
          );
        }

        ReactNoop.render(<App value={2} />);
<<<<<<< HEAD
        expect(Scheduler).toFlushWithoutYielding();
        expect(ReactNoop.getChildren()).toEqual([span('Result: 2')]);

        // Update
        ReactNoop.render(<App value={3} />);
        expect(Scheduler).toFlushWithoutYielding();
        expect(ReactNoop.getChildren()).toEqual([span('Result: 3')]);
      });

      it('propagates through shouldComponentUpdate false', () => {
=======
        await waitForAll([]);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Result: 2" />);

        // Update
        ReactNoop.render(<App value={3} />);
        await waitForAll([]);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Result: 3" />);
      });

      it('propagates through shouldComponentUpdate false', async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext(1);
        const ContextConsumer = getConsumer(Context);

        function Provider(props) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Provider');
=======
          Scheduler.log('Provider');
>>>>>>> remotes/upstream/main
          return (
            <Context.Provider value={props.value}>
              {props.children}
            </Context.Provider>
          );
        }

        function Consumer(props) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Consumer');
          return (
            <ContextConsumer>
              {value => {
                Scheduler.unstable_yieldValue('Consumer render prop');
=======
          Scheduler.log('Consumer');
          return (
            <ContextConsumer>
              {value => {
                Scheduler.log('Consumer render prop');
>>>>>>> remotes/upstream/main
                return <span prop={'Result: ' + value} />;
              }}
            </ContextConsumer>
          );
        }

        class Indirection extends React.Component {
          shouldComponentUpdate() {
            return false;
          }
          render() {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Indirection');
=======
            Scheduler.log('Indirection');
>>>>>>> remotes/upstream/main
            return this.props.children;
          }
        }

        function App(props) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App');
=======
          Scheduler.log('App');
>>>>>>> remotes/upstream/main
          return (
            <Provider value={props.value}>
              <Indirection>
                <Indirection>
                  <Consumer />
                </Indirection>
              </Indirection>
            </Provider>
          );
        }

        ReactNoop.render(<App value={2} />);
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
=======
        await waitForAll([
>>>>>>> remotes/upstream/main
          'App',
          'Provider',
          'Indirection',
          'Indirection',
          'Consumer',
          'Consumer render prop',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([span('Result: 2')]);

        // Update
        ReactNoop.render(<App value={3} />);
        expect(Scheduler).toFlushAndYield([
          'App',
          'Provider',
          'Consumer render prop',
        ]);
        expect(ReactNoop.getChildren()).toEqual([span('Result: 3')]);
      });

      it('consumers bail out if context value is the same', () => {
=======
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Result: 2" />);

        // Update
        ReactNoop.render(<App value={3} />);
        await waitForAll(['App', 'Provider', 'Consumer render prop']);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Result: 3" />);
      });

      it('consumers bail out if context value is the same', async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext(1);
        const ContextConsumer = getConsumer(Context);

        function Provider(props) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Provider');
=======
          Scheduler.log('Provider');
>>>>>>> remotes/upstream/main
          return (
            <Context.Provider value={props.value}>
              {props.children}
            </Context.Provider>
          );
        }

        function Consumer(props) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Consumer');
          return (
            <ContextConsumer>
              {value => {
                Scheduler.unstable_yieldValue('Consumer render prop');
=======
          Scheduler.log('Consumer');
          return (
            <ContextConsumer>
              {value => {
                Scheduler.log('Consumer render prop');
>>>>>>> remotes/upstream/main
                return <span prop={'Result: ' + value} />;
              }}
            </ContextConsumer>
          );
        }

        class Indirection extends React.Component {
          shouldComponentUpdate() {
            return false;
          }
          render() {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Indirection');
=======
            Scheduler.log('Indirection');
>>>>>>> remotes/upstream/main
            return this.props.children;
          }
        }

        function App(props) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App');
=======
          Scheduler.log('App');
>>>>>>> remotes/upstream/main
          return (
            <Provider value={props.value}>
              <Indirection>
                <Indirection>
                  <Consumer />
                </Indirection>
              </Indirection>
            </Provider>
          );
        }

        ReactNoop.render(<App value={2} />);
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
=======
        await waitForAll([
>>>>>>> remotes/upstream/main
          'App',
          'Provider',
          'Indirection',
          'Indirection',
          'Consumer',
          'Consumer render prop',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([span('Result: 2')]);

        // Update with the same context value
        ReactNoop.render(<App value={2} />);
        expect(Scheduler).toFlushAndYield([
=======
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Result: 2" />);

        // Update with the same context value
        ReactNoop.render(<App value={2} />);
        await waitForAll([
>>>>>>> remotes/upstream/main
          'App',
          'Provider',
          // Don't call render prop again
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([span('Result: 2')]);
      });

      it('nested providers', () => {
=======
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Result: 2" />);
      });

      it('nested providers', async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext(1);
        const Consumer = getConsumer(Context);

        function Provider(props) {
          return (
            <Consumer>
              {contextValue => (
                // Multiply previous context value by 2, unless prop overrides
                <Context.Provider value={props.value || contextValue * 2}>
                  {props.children}
                </Context.Provider>
              )}
            </Consumer>
          );
        }

        class Indirection extends React.Component {
          shouldComponentUpdate() {
            return false;
          }
          render() {
            return this.props.children;
          }
        }

        function App(props) {
          return (
            <Provider value={props.value}>
              <Indirection>
                <Provider>
                  <Indirection>
                    <Provider>
                      <Indirection>
                        <Consumer>
                          {value => <span prop={'Result: ' + value} />}
                        </Consumer>
                      </Indirection>
                    </Provider>
                  </Indirection>
                </Provider>
              </Indirection>
            </Provider>
          );
        }

        ReactNoop.render(<App value={2} />);
<<<<<<< HEAD
        expect(Scheduler).toFlushWithoutYielding();
        expect(ReactNoop.getChildren()).toEqual([span('Result: 8')]);

        // Update
        ReactNoop.render(<App value={3} />);
        expect(Scheduler).toFlushWithoutYielding();
        expect(ReactNoop.getChildren()).toEqual([span('Result: 12')]);
      });

      it('should provide the correct (default) values to consumers outside of a provider', () => {
=======
        await waitForAll([]);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Result: 8" />);

        // Update
        ReactNoop.render(<App value={3} />);
        await waitForAll([]);
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Result: 12" />);
      });

      it('should provide the correct (default) values to consumers outside of a provider', async () => {
>>>>>>> remotes/upstream/main
        const FooContext = React.createContext({value: 'foo-initial'});
        const BarContext = React.createContext({value: 'bar-initial'});
        const FooConsumer = getConsumer(FooContext);
        const BarConsumer = getConsumer(BarContext);

        const Verify = ({actual, expected}) => {
          expect(expected).toBe(actual);
          return null;
        };

        ReactNoop.render(
          <>
            <BarContext.Provider value={{value: 'bar-updated'}}>
              <BarConsumer>
                {({value}) => <Verify actual={value} expected="bar-updated" />}
              </BarConsumer>

              <FooContext.Provider value={{value: 'foo-updated'}}>
                <FooConsumer>
                  {({value}) => (
                    <Verify actual={value} expected="foo-updated" />
                  )}
                </FooConsumer>
              </FooContext.Provider>
            </BarContext.Provider>

            <FooConsumer>
              {({value}) => <Verify actual={value} expected="foo-initial" />}
            </FooConsumer>
            <BarConsumer>
              {({value}) => <Verify actual={value} expected="bar-initial" />}
            </BarConsumer>
          </>,
        );
<<<<<<< HEAD
        expect(Scheduler).toFlushWithoutYielding();
      });

      it('multiple consumers in different branches', () => {
=======
        await waitForAll([]);
      });

      it('multiple consumers in different branches', async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext(1);
        const Consumer = getConsumer(Context);

        function Provider(props) {
          return (
            <Context.Consumer>
              {contextValue => (
                // Multiply previous context value by 2, unless prop overrides
                <Context.Provider value={props.value || contextValue * 2}>
                  {props.children}
                </Context.Provider>
              )}
            </Context.Consumer>
          );
        }

        class Indirection extends React.Component {
          shouldComponentUpdate() {
            return false;
          }
          render() {
            return this.props.children;
          }
        }

        function App(props) {
          return (
            <Provider value={props.value}>
              <Indirection>
                <Indirection>
                  <Provider>
                    <Consumer>
                      {value => <span prop={'Result: ' + value} />}
                    </Consumer>
                  </Provider>
                </Indirection>
                <Indirection>
                  <Consumer>
                    {value => <span prop={'Result: ' + value} />}
                  </Consumer>
                </Indirection>
              </Indirection>
            </Provider>
          );
        }

        ReactNoop.render(<App value={2} />);
<<<<<<< HEAD
        expect(Scheduler).toFlushWithoutYielding();
        expect(ReactNoop.getChildren()).toEqual([
          span('Result: 4'),
          span('Result: 2'),
        ]);

        // Update
        ReactNoop.render(<App value={3} />);
        expect(Scheduler).toFlushWithoutYielding();
        expect(ReactNoop.getChildren()).toEqual([
          span('Result: 6'),
          span('Result: 3'),
        ]);

        // Another update
        ReactNoop.render(<App value={4} />);
        expect(Scheduler).toFlushWithoutYielding();
        expect(ReactNoop.getChildren()).toEqual([
          span('Result: 8'),
          span('Result: 4'),
        ]);
      });

      it('compares context values with Object.is semantics', () => {
=======
        await waitForAll([]);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Result: 4" />
            <span prop="Result: 2" />
          </>,
        );

        // Update
        ReactNoop.render(<App value={3} />);
        await waitForAll([]);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Result: 6" />
            <span prop="Result: 3" />
          </>,
        );

        // Another update
        ReactNoop.render(<App value={4} />);
        await waitForAll([]);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="Result: 8" />
            <span prop="Result: 4" />
          </>,
        );
      });

      it('compares context values with Object.is semantics', async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext(1);
        const ContextConsumer = getConsumer(Context);

        function Provider(props) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Provider');
=======
          Scheduler.log('Provider');
>>>>>>> remotes/upstream/main
          return (
            <Context.Provider value={props.value}>
              {props.children}
            </Context.Provider>
          );
        }

        function Consumer(props) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Consumer');
          return (
            <ContextConsumer>
              {value => {
                Scheduler.unstable_yieldValue('Consumer render prop');
=======
          Scheduler.log('Consumer');
          return (
            <ContextConsumer>
              {value => {
                Scheduler.log('Consumer render prop');
>>>>>>> remotes/upstream/main
                return <span prop={'Result: ' + value} />;
              }}
            </ContextConsumer>
          );
        }

        class Indirection extends React.Component {
          shouldComponentUpdate() {
            return false;
          }
          render() {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Indirection');
=======
            Scheduler.log('Indirection');
>>>>>>> remotes/upstream/main
            return this.props.children;
          }
        }

        function App(props) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App');
=======
          Scheduler.log('App');
>>>>>>> remotes/upstream/main
          return (
            <Provider value={props.value}>
              <Indirection>
                <Indirection>
                  <Consumer />
                </Indirection>
              </Indirection>
            </Provider>
          );
        }

        ReactNoop.render(<App value={NaN} />);
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
=======
        await waitForAll([
>>>>>>> remotes/upstream/main
          'App',
          'Provider',
          'Indirection',
          'Indirection',
          'Consumer',
          'Consumer render prop',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([span('Result: NaN')]);

        // Update
        ReactNoop.render(<App value={NaN} />);
        expect(Scheduler).toFlushAndYield([
=======
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Result: NaN" />);

        // Update
        ReactNoop.render(<App value={NaN} />);
        await waitForAll([
>>>>>>> remotes/upstream/main
          'App',
          'Provider',
          // Consumer should not re-render again
          // 'Consumer render prop',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([span('Result: NaN')]);
      });

      it('context unwinds when interrupted', () => {
=======
        expect(ReactNoop).toMatchRenderedOutput(<span prop="Result: NaN" />);
      });

      it('context unwinds when interrupted', async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext('Default');
        const ContextConsumer = getConsumer(Context);

        function Consumer(props) {
          return (
            <ContextConsumer>
              {value => <span prop={'Result: ' + value} />}
            </ContextConsumer>
          );
        }

        function BadRender() {
          throw new Error('Bad render');
        }

        class ErrorBoundary extends React.Component {
          state = {error: null};
          componentDidCatch(error) {
            this.setState({error});
          }
          render() {
            if (this.state.error) {
              return null;
            }
            return this.props.children;
          }
        }

        function App(props) {
          return (
            <>
              <Context.Provider value="Does not unwind">
                <ErrorBoundary>
                  <Context.Provider value="Unwinds after BadRender throws">
                    <BadRender />
                  </Context.Provider>
                </ErrorBoundary>
                <Consumer />
              </Context.Provider>
            </>
          );
        }

        ReactNoop.render(<App value="A" />);
<<<<<<< HEAD
        expect(Scheduler).toFlushWithoutYielding();
        expect(ReactNoop.getChildren()).toEqual([
          // The second provider should use the default value.
          span('Result: Does not unwind'),
        ]);
      });

      it("does not re-render if there's an update in a child", () => {
=======
        await waitForAll([]);
        expect(ReactNoop).toMatchRenderedOutput(
          // The second provider should use the default value.
          <span prop="Result: Does not unwind" />,
        );
      });

      it("does not re-render if there's an update in a child", async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext(0);
        const Consumer = getConsumer(Context);

        let child;
        class Child extends React.Component {
          state = {step: 0};
          render() {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('Child');
=======
            Scheduler.log('Child');
>>>>>>> remotes/upstream/main
            return (
              <span
                prop={`Context: ${this.props.context}, Step: ${this.state.step}`}
              />
            );
          }
        }

        function App(props) {
          return (
            <Context.Provider value={props.value}>
              <Consumer>
                {value => {
<<<<<<< HEAD
                  Scheduler.unstable_yieldValue('Consumer render prop');
=======
                  Scheduler.log('Consumer render prop');
>>>>>>> remotes/upstream/main
                  return <Child ref={inst => (child = inst)} context={value} />;
                }}
              </Consumer>
            </Context.Provider>
          );
        }

        // Initial mount
        ReactNoop.render(<App value={1} />);
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield(['Consumer render prop', 'Child']);
        expect(ReactNoop.getChildren()).toEqual([span('Context: 1, Step: 0')]);

        child.setState({step: 1});
        expect(Scheduler).toFlushAndYield(['Child']);
        expect(ReactNoop.getChildren()).toEqual([span('Context: 1, Step: 1')]);
      });

      it('consumer bails out if value is unchanged and something above bailed out', () => {
=======
        await waitForAll(['Consumer render prop', 'Child']);
        expect(ReactNoop).toMatchRenderedOutput(
          <span prop="Context: 1, Step: 0" />,
        );

        child.setState({step: 1});
        await waitForAll(['Child']);
        expect(ReactNoop).toMatchRenderedOutput(
          <span prop="Context: 1, Step: 1" />,
        );
      });

      it('consumer bails out if value is unchanged and something above bailed out', async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext(0);
        const Consumer = getConsumer(Context);

        function renderChildValue(value) {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('Consumer');
=======
          Scheduler.log('Consumer');
>>>>>>> remotes/upstream/main
          return <span prop={value} />;
        }

        function ChildWithInlineRenderCallback() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ChildWithInlineRenderCallback');
=======
          Scheduler.log('ChildWithInlineRenderCallback');
>>>>>>> remotes/upstream/main
          // Note: we are intentionally passing an inline arrow. Don't refactor.
          return <Consumer>{value => renderChildValue(value)}</Consumer>;
        }

        function ChildWithCachedRenderCallback() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('ChildWithCachedRenderCallback');
=======
          Scheduler.log('ChildWithCachedRenderCallback');
>>>>>>> remotes/upstream/main
          return <Consumer>{renderChildValue}</Consumer>;
        }

        class PureIndirection extends React.PureComponent {
          render() {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('PureIndirection');
=======
            Scheduler.log('PureIndirection');
>>>>>>> remotes/upstream/main
            return (
              <>
                <ChildWithInlineRenderCallback />
                <ChildWithCachedRenderCallback />
              </>
            );
          }
        }

        class App extends React.Component {
          render() {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('App');
=======
            Scheduler.log('App');
>>>>>>> remotes/upstream/main
            return (
              <Context.Provider value={this.props.value}>
                <PureIndirection />
              </Context.Provider>
            );
          }
        }

        // Initial mount
        ReactNoop.render(<App value={1} />);
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield([
=======
        await waitForAll([
>>>>>>> remotes/upstream/main
          'App',
          'PureIndirection',
          'ChildWithInlineRenderCallback',
          'Consumer',
          'ChildWithCachedRenderCallback',
          'Consumer',
        ]);
<<<<<<< HEAD
        expect(ReactNoop.getChildren()).toEqual([span(1), span(1)]);

        // Update (bailout)
        ReactNoop.render(<App value={1} />);
        expect(Scheduler).toFlushAndYield(['App']);
        expect(ReactNoop.getChildren()).toEqual([span(1), span(1)]);

        // Update (no bailout)
        ReactNoop.render(<App value={2} />);
        expect(Scheduler).toFlushAndYield(['App', 'Consumer', 'Consumer']);
        expect(ReactNoop.getChildren()).toEqual([span(2), span(2)]);
      });

      // @gate www
      it("context consumer doesn't bail out inside hidden subtree", () => {
=======
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop={1} />
            <span prop={1} />
          </>,
        );

        // Update (bailout)
        ReactNoop.render(<App value={1} />);
        await waitForAll(['App']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop={1} />
            <span prop={1} />
          </>,
        );

        // Update (no bailout)
        ReactNoop.render(<App value={2} />);
        await waitForAll(['App', 'Consumer', 'Consumer']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop={2} />
            <span prop={2} />
          </>,
        );
      });

      // @gate www
      it("context consumer doesn't bail out inside hidden subtree", async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext('dark');
        const Consumer = getConsumer(Context);

        function App({theme}) {
          return (
            <Context.Provider value={theme}>
              <LegacyHiddenDiv mode="hidden">
                <Consumer>{value => <Text text={value} />}</Consumer>
              </LegacyHiddenDiv>
            </Context.Provider>
          );
        }

        ReactNoop.render(<App theme="dark" />);
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield(['dark']);
=======
        await waitForAll(['dark']);
>>>>>>> remotes/upstream/main
        expect(ReactNoop.getChildrenAsJSX()).toEqual(
          <div hidden={true}>
            <span prop="dark" />
          </div>,
        );

        ReactNoop.render(<App theme="light" />);
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield(['light']);
=======
        await waitForAll(['light']);
>>>>>>> remotes/upstream/main
        expect(ReactNoop.getChildrenAsJSX()).toEqual(
          <div hidden={true}>
            <span prop="light" />
          </div>,
        );
      });

      // This is a regression case for https://github.com/facebook/react/issues/12389.
<<<<<<< HEAD
      it('does not run into an infinite loop', () => {
=======
      it('does not run into an infinite loop', async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext(null);
        const Consumer = getConsumer(Context);

        class App extends React.Component {
          renderItem(id) {
            return (
              <span key={id}>
                <Consumer>{() => <span>inner</span>}</Consumer>
                <span>outer</span>
              </span>
            );
          }
          renderList() {
            const list = [1, 2].map(id => this.renderItem(id));
            if (this.props.reverse) {
              list.reverse();
            }
            return list;
          }
          render() {
            return (
              <Context.Provider value={{}}>
                {this.renderList()}
              </Context.Provider>
            );
          }
        }

        ReactNoop.render(<App reverse={false} />);
<<<<<<< HEAD
        expect(Scheduler).toFlushWithoutYielding();
        ReactNoop.render(<App reverse={true} />);
        expect(Scheduler).toFlushWithoutYielding();
        ReactNoop.render(<App reverse={false} />);
        expect(Scheduler).toFlushWithoutYielding();
      });

      // This is a regression case for https://github.com/facebook/react/issues/12686
      it('does not skip some siblings', () => {
=======
        await waitForAll([]);
        ReactNoop.render(<App reverse={true} />);
        await waitForAll([]);
        ReactNoop.render(<App reverse={false} />);
        await waitForAll([]);
      });

      // This is a regression case for https://github.com/facebook/react/issues/12686
      it('does not skip some siblings', async () => {
>>>>>>> remotes/upstream/main
        const Context = React.createContext(0);
        const ContextConsumer = getConsumer(Context);

        class App extends React.Component {
          state = {
            step: 0,
          };

          render() {
<<<<<<< HEAD
            Scheduler.unstable_yieldValue('App');
=======
            Scheduler.log('App');
>>>>>>> remotes/upstream/main
            return (
              <Context.Provider value={this.state.step}>
                <StaticContent />
                {this.state.step > 0 && <Indirection />}
              </Context.Provider>
            );
          }
        }

        class StaticContent extends React.PureComponent {
          render() {
            return (
              <>
                <>
                  <span prop="static 1" />
                  <span prop="static 2" />
                </>
              </>
            );
          }
        }

        class Indirection extends React.PureComponent {
          render() {
            return (
              <ContextConsumer>
                {value => {
<<<<<<< HEAD
                  Scheduler.unstable_yieldValue('Consumer');
=======
                  Scheduler.log('Consumer');
>>>>>>> remotes/upstream/main
                  return <span prop={value} />;
                }}
              </ContextConsumer>
            );
          }
        }

        // Initial mount
        let inst;
        ReactNoop.render(<App ref={ref => (inst = ref)} />);
<<<<<<< HEAD
        expect(Scheduler).toFlushAndYield(['App']);
        expect(ReactNoop.getChildren()).toEqual([
          span('static 1'),
          span('static 2'),
        ]);
        // Update the first time
        inst.setState({step: 1});
        expect(Scheduler).toFlushAndYield(['App', 'Consumer']);
        expect(ReactNoop.getChildren()).toEqual([
          span('static 1'),
          span('static 2'),
          span(1),
        ]);
        // Update the second time
        inst.setState({step: 2});
        expect(Scheduler).toFlushAndYield(['App', 'Consumer']);
        expect(ReactNoop.getChildren()).toEqual([
          span('static 1'),
          span('static 2'),
          span(2),
        ]);
=======
        await waitForAll(['App']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="static 1" />
            <span prop="static 2" />
          </>,
        );
        // Update the first time
        inst.setState({step: 1});
        await waitForAll(['App', 'Consumer']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="static 1" />
            <span prop="static 2" />
            <span prop={1} />
          </>,
        );
        // Update the second time
        inst.setState({step: 2});
        await waitForAll(['App', 'Consumer']);
        expect(ReactNoop).toMatchRenderedOutput(
          <>
            <span prop="static 1" />
            <span prop="static 2" />
            <span prop={2} />
          </>,
        );
>>>>>>> remotes/upstream/main
      });
    });
  }

  describe('Context.Provider', () => {
<<<<<<< HEAD
    it('warns if no value prop provided', () => {
=======
    it('warns if no value prop provided', async () => {
>>>>>>> remotes/upstream/main
      const Context = React.createContext();

      ReactNoop.render(
        <Context.Provider anyPropNameOtherThanValue="value could be anything" />,
      );

<<<<<<< HEAD
      expect(() => expect(Scheduler).toFlushWithoutYielding()).toErrorDev(
=======
      await expect(async () => await waitForAll([])).toErrorDev(
>>>>>>> remotes/upstream/main
        'The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?',
        {
          withoutStack: true,
        },
      );
    });

<<<<<<< HEAD
    it('warns if multiple renderers concurrently render the same context', () => {
      spyOnDev(console, 'error');
      const Context = React.createContext(0);

      function Foo(props) {
        Scheduler.unstable_yieldValue('Foo');
=======
    it('warns if multiple renderers concurrently render the same context', async () => {
      spyOnDev(console, 'error').mockImplementation(() => {});
      const Context = React.createContext(0);

      function Foo(props) {
        Scheduler.log('Foo');
>>>>>>> remotes/upstream/main
        return null;
      }

      function App(props) {
        return (
          <Context.Provider value={props.value}>
            <Foo />
            <Foo />
          </Context.Provider>
        );
      }

<<<<<<< HEAD
      if (gate(flags => flags.enableSyncDefaultUpdates)) {
        React.startTransition(() => {
          ReactNoop.render(<App value={1} />);
        });
      } else {
        ReactNoop.render(<App value={1} />);
      }
      // Render past the Provider, but don't commit yet
      expect(Scheduler).toFlushAndYieldThrough(['Foo']);
=======
      React.startTransition(() => {
        ReactNoop.render(<App value={1} />);
      });
      // Render past the Provider, but don't commit yet
      await waitFor(['Foo']);
>>>>>>> remotes/upstream/main

      // Get a new copy of ReactNoop
      jest.resetModules();
      React = require('react');
      ReactNoop = require('react-noop-renderer');
      Scheduler = require('scheduler');
<<<<<<< HEAD

      // Render the provider again using a different renderer
      ReactNoop.render(<App value={1} />);
      expect(Scheduler).toFlushAndYield(['Foo', 'Foo']);

      if (__DEV__) {
        expect(console.error.calls.argsFor(0)[0]).toContain(
=======
      const InternalTestUtils = require('internal-test-utils');
      waitForAll = InternalTestUtils.waitForAll;
      waitFor = InternalTestUtils.waitFor;

      // Render the provider again using a different renderer
      ReactNoop.render(<App value={1} />);
      await waitForAll(['Foo', 'Foo']);

      if (__DEV__) {
        expect(console.error.mock.calls[0][0]).toContain(
>>>>>>> remotes/upstream/main
          'Detected multiple renderers concurrently rendering the same ' +
            'context provider. This is currently unsupported',
        );
      }
    });

<<<<<<< HEAD
    it('provider bails out if children and value are unchanged (like sCU)', () => {
      const Context = React.createContext(0);

      function Child() {
        Scheduler.unstable_yieldValue('Child');
=======
    it('does not warn if multiple renderers use the same context sequentially', async () => {
      spyOnDev(console, 'error');
      const Context = React.createContext(0);

      function Foo(props) {
        Scheduler.log('Foo');
        return null;
      }

      function App(props) {
        return (
          <Context.Provider value={props.value}>
            <Foo />
            <Foo />
          </Context.Provider>
        );
      }

      React.startTransition(() => {
        ReactNoop.render(<App value={1} />);
      });
      await waitForAll(['Foo', 'Foo']);

      // Get a new copy of ReactNoop
      jest.resetModules();
      React = require('react');
      ReactNoop = require('react-noop-renderer');
      Scheduler = require('scheduler');
      const InternalTestUtils = require('internal-test-utils');
      waitForAll = InternalTestUtils.waitForAll;
      waitFor = InternalTestUtils.waitFor;

      // Render the provider again using a different renderer
      ReactNoop.render(<App value={1} />);
      await waitForAll(['Foo', 'Foo']);

      if (__DEV__) {
        expect(console.error).not.toHaveBeenCalled();
      }
    });

    it('provider bails out if children and value are unchanged (like sCU)', async () => {
      const Context = React.createContext(0);

      function Child() {
        Scheduler.log('Child');
>>>>>>> remotes/upstream/main
        return <span prop="Child" />;
      }

      const children = <Child />;

      function App(props) {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('App');
=======
        Scheduler.log('App');
>>>>>>> remotes/upstream/main
        return (
          <Context.Provider value={props.value}>{children}</Context.Provider>
        );
      }

      // Initial mount
      ReactNoop.render(<App value={1} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['App', 'Child']);
      expect(ReactNoop.getChildren()).toEqual([span('Child')]);

      // Update
      ReactNoop.render(<App value={1} />);
      expect(Scheduler).toFlushAndYield([
        'App',
        // Child does not re-render
      ]);
      expect(ReactNoop.getChildren()).toEqual([span('Child')]);
    });

    it('provider does not bail out if legacy context changed above', () => {
      const Context = React.createContext(0);

      function Child() {
        Scheduler.unstable_yieldValue('Child');
=======
      await waitForAll(['App', 'Child']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Child" />);

      // Update
      ReactNoop.render(<App value={1} />);
      await waitForAll([
        'App',
        // Child does not re-render
      ]);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Child" />);
    });

    // @gate !disableLegacyContext
    it('provider does not bail out if legacy context changed above', async () => {
      const Context = React.createContext(0);

      function Child() {
        Scheduler.log('Child');
>>>>>>> remotes/upstream/main
        return <span prop="Child" />;
      }

      const children = <Child />;

      class LegacyProvider extends React.Component {
        static childContextTypes = {
          legacyValue: () => {},
        };
        state = {legacyValue: 1};
        getChildContext() {
          return {legacyValue: this.state.legacyValue};
        }
        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('LegacyProvider');
=======
          Scheduler.log('LegacyProvider');
>>>>>>> remotes/upstream/main
          return this.props.children;
        }
      }

      class App extends React.Component {
        state = {value: 1};
        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App');
=======
          Scheduler.log('App');
>>>>>>> remotes/upstream/main
          return (
            <Context.Provider value={this.state.value}>
              {this.props.children}
            </Context.Provider>
          );
        }
      }

      const legacyProviderRef = React.createRef();
      const appRef = React.createRef();

      // Initial mount
      ReactNoop.render(
        <LegacyProvider ref={legacyProviderRef}>
          <App ref={appRef} value={1}>
            {children}
          </App>
        </LegacyProvider>,
      );
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['LegacyProvider', 'App', 'Child']);
      expect(ReactNoop.getChildren()).toEqual([span('Child')]);

      // Update App with same value (should bail out)
      appRef.current.setState({value: 1});
      expect(Scheduler).toFlushAndYield(['App']);
      expect(ReactNoop.getChildren()).toEqual([span('Child')]);

      // Update LegacyProvider (should not bail out)
      legacyProviderRef.current.setState({value: 1});
      expect(Scheduler).toFlushAndYield(['LegacyProvider', 'App', 'Child']);
      expect(ReactNoop.getChildren()).toEqual([span('Child')]);

      // Update App with same value (should bail out)
      appRef.current.setState({value: 1});
      expect(Scheduler).toFlushAndYield(['App']);
      expect(ReactNoop.getChildren()).toEqual([span('Child')]);
=======
      await waitForAll(['LegacyProvider', 'App', 'Child']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Child" />);

      // Update App with same value (should bail out)
      appRef.current.setState({value: 1});
      await waitForAll(['App']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Child" />);

      // Update LegacyProvider (should not bail out)
      legacyProviderRef.current.setState({value: 1});
      await waitForAll(['LegacyProvider', 'App', 'Child']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Child" />);

      // Update App with same value (should bail out)
      appRef.current.setState({value: 1});
      await waitForAll(['App']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Child" />);
>>>>>>> remotes/upstream/main
    });
  });

  describe('Context.Consumer', () => {
<<<<<<< HEAD
    it('warns if child is not a function', () => {
      spyOnDev(console, 'error');
      const Context = React.createContext(0);
      ReactNoop.render(<Context.Consumer />);
      expect(Scheduler).toFlushAndThrow('is not a function');
      if (__DEV__) {
        expect(console.error.calls.argsFor(0)[0]).toContain(
=======
    it('warns if child is not a function', async () => {
      spyOnDev(console, 'error').mockImplementation(() => {});
      const Context = React.createContext(0);
      ReactNoop.render(<Context.Consumer />);
      await waitForThrow('is not a function');
      if (__DEV__) {
        expect(console.error.mock.calls[0][0]).toContain(
>>>>>>> remotes/upstream/main
          'A context consumer was rendered with multiple children, or a child ' +
            "that isn't a function",
        );
      }
    });

<<<<<<< HEAD
    it('can read other contexts inside consumer render prop', () => {
=======
    it('can read other contexts inside consumer render prop', async () => {
>>>>>>> remotes/upstream/main
      const FooContext = React.createContext(0);
      const BarContext = React.createContext(0);

      function FooAndBar() {
        return (
          <FooContext.Consumer>
            {foo => {
              const bar = readContext(BarContext);
              return <Text text={`Foo: ${foo}, Bar: ${bar}`} />;
            }}
          </FooContext.Consumer>
        );
      }

      class Indirection extends React.Component {
        shouldComponentUpdate() {
          return false;
        }
        render() {
          return this.props.children;
        }
      }

      function App(props) {
        return (
          <FooContext.Provider value={props.foo}>
            <BarContext.Provider value={props.bar}>
              <Indirection>
                <FooAndBar />
              </Indirection>
            </BarContext.Provider>
          </FooContext.Provider>
        );
      }

      ReactNoop.render(<App foo={1} bar={1} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Foo: 1, Bar: 1']);
      expect(ReactNoop.getChildren()).toEqual([span('Foo: 1, Bar: 1')]);

      // Update foo
      ReactNoop.render(<App foo={2} bar={1} />);
      expect(Scheduler).toFlushAndYield(['Foo: 2, Bar: 1']);
      expect(ReactNoop.getChildren()).toEqual([span('Foo: 2, Bar: 1')]);

      // Update bar
      ReactNoop.render(<App foo={2} bar={2} />);
      expect(Scheduler).toFlushAndYield(['Foo: 2, Bar: 2']);
      expect(ReactNoop.getChildren()).toEqual([span('Foo: 2, Bar: 2')]);
=======
      await waitForAll(['Foo: 1, Bar: 1']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Foo: 1, Bar: 1" />);

      // Update foo
      ReactNoop.render(<App foo={2} bar={1} />);
      await waitForAll(['Foo: 2, Bar: 1']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Foo: 2, Bar: 1" />);

      // Update bar
      ReactNoop.render(<App foo={2} bar={2} />);
      await waitForAll(['Foo: 2, Bar: 2']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="Foo: 2, Bar: 2" />);
>>>>>>> remotes/upstream/main
    });

    // Context consumer bails out on propagating "deep" updates when `value` hasn't changed.
    // However, it doesn't bail out from rendering if the component above it re-rendered anyway.
    // If we bailed out on referential equality, it would be confusing that you
    // can call this.setState(), but an autobound render callback "blocked" the update.
    // https://github.com/facebook/react/pull/12470#issuecomment-376917711
<<<<<<< HEAD
    it('consumer does not bail out if there were no bailouts above it', () => {
=======
    it('consumer does not bail out if there were no bailouts above it', async () => {
>>>>>>> remotes/upstream/main
      const Context = React.createContext(0);
      const Consumer = Context.Consumer;

      class App extends React.Component {
        state = {
          text: 'hello',
        };

        renderConsumer = context => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App#renderConsumer');
=======
          Scheduler.log('App#renderConsumer');
>>>>>>> remotes/upstream/main
          return <span prop={this.state.text} />;
        };

        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App');
=======
          Scheduler.log('App');
>>>>>>> remotes/upstream/main
          return (
            <Context.Provider value={this.props.value}>
              <Consumer>{this.renderConsumer}</Consumer>
            </Context.Provider>
          );
        }
      }

      // Initial mount
      let inst;
      ReactNoop.render(<App value={1} ref={ref => (inst = ref)} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['App', 'App#renderConsumer']);
      expect(ReactNoop.getChildren()).toEqual([span('hello')]);

      // Update
      inst.setState({text: 'goodbye'});
      expect(Scheduler).toFlushAndYield(['App', 'App#renderConsumer']);
      expect(ReactNoop.getChildren()).toEqual([span('goodbye')]);
=======
      await waitForAll(['App', 'App#renderConsumer']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="hello" />);

      // Update
      inst.setState({text: 'goodbye'});
      await waitForAll(['App', 'App#renderConsumer']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="goodbye" />);
>>>>>>> remotes/upstream/main
    });
  });

  describe('readContext', () => {
    // Unstable changedBits API was removed. Port this test to context selectors
    // once that exists.
    // @gate FIXME
<<<<<<< HEAD
    it('can read the same context multiple times in the same function', () => {
=======
    it('can read the same context multiple times in the same function', async () => {
>>>>>>> remotes/upstream/main
      const Context = React.createContext({foo: 0, bar: 0, baz: 0}, (a, b) => {
        let result = 0;
        if (a.foo !== b.foo) {
          result |= 0b001;
        }
        if (a.bar !== b.bar) {
          result |= 0b010;
        }
        if (a.baz !== b.baz) {
          result |= 0b100;
        }
        return result;
      });

      function Provider(props) {
        return (
          <Context.Provider
            value={{foo: props.foo, bar: props.bar, baz: props.baz}}>
            {props.children}
          </Context.Provider>
        );
      }

      function FooAndBar() {
        const {foo} = readContext(Context, 0b001);
        const {bar} = readContext(Context, 0b010);
        return <Text text={`Foo: ${foo}, Bar: ${bar}`} />;
      }

      function Baz() {
        const {baz} = readContext(Context, 0b100);
        return <Text text={'Baz: ' + baz} />;
      }

      class Indirection extends React.Component {
        shouldComponentUpdate() {
          return false;
        }
        render() {
          return this.props.children;
        }
      }

      function App(props) {
        return (
          <Provider foo={props.foo} bar={props.bar} baz={props.baz}>
            <Indirection>
              <Indirection>
                <FooAndBar />
              </Indirection>
              <Indirection>
                <Baz />
              </Indirection>
            </Indirection>
          </Provider>
        );
      }

      ReactNoop.render(<App foo={1} bar={1} baz={1} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Foo: 1, Bar: 1', 'Baz: 1']);
      expect(ReactNoop.getChildren()).toEqual([
        span('Foo: 1, Bar: 1'),
        span('Baz: 1'),
=======
      await waitForAll(['Foo: 1, Bar: 1', 'Baz: 1']);
      expect(ReactNoop).toMatchRenderedOutput([
        <span prop="Foo: 1, Bar: 1" />,
        <span prop="Baz: 1" />,
>>>>>>> remotes/upstream/main
      ]);

      // Update only foo
      ReactNoop.render(<App foo={2} bar={1} baz={1} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Foo: 2, Bar: 1']);
      expect(ReactNoop.getChildren()).toEqual([
        span('Foo: 2, Bar: 1'),
        span('Baz: 1'),
=======
      await waitForAll(['Foo: 2, Bar: 1']);
      expect(ReactNoop).toMatchRenderedOutput([
        <span prop="Foo: 2, Bar: 1" />,
        <span prop="Baz: 1" />,
>>>>>>> remotes/upstream/main
      ]);

      // Update only bar
      ReactNoop.render(<App foo={2} bar={2} baz={1} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Foo: 2, Bar: 2']);
      expect(ReactNoop.getChildren()).toEqual([
        span('Foo: 2, Bar: 2'),
        span('Baz: 1'),
=======
      await waitForAll(['Foo: 2, Bar: 2']);
      expect(ReactNoop).toMatchRenderedOutput([
        <span prop="Foo: 2, Bar: 2" />,
        <span prop="Baz: 1" />,
>>>>>>> remotes/upstream/main
      ]);

      // Update only baz
      ReactNoop.render(<App foo={2} bar={2} baz={2} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Baz: 2']);
      expect(ReactNoop.getChildren()).toEqual([
        span('Foo: 2, Bar: 2'),
        span('Baz: 2'),
=======
      await waitForAll(['Baz: 2']);
      expect(ReactNoop).toMatchRenderedOutput([
        <span prop="Foo: 2, Bar: 2" />,
        <span prop="Baz: 2" />,
>>>>>>> remotes/upstream/main
      ]);
    });

    // Context consumer bails out on propagating "deep" updates when `value` hasn't changed.
    // However, it doesn't bail out from rendering if the component above it re-rendered anyway.
    // If we bailed out on referential equality, it would be confusing that you
    // can call this.setState(), but an autobound render callback "blocked" the update.
    // https://github.com/facebook/react/pull/12470#issuecomment-376917711
<<<<<<< HEAD
    it('does not bail out if there were no bailouts above it', () => {
=======
    it('does not bail out if there were no bailouts above it', async () => {
>>>>>>> remotes/upstream/main
      const Context = React.createContext(0);

      class Consumer extends React.Component {
        render() {
          const contextValue = readContext(Context);
          return this.props.children(contextValue);
        }
      }

      class App extends React.Component {
        state = {
          text: 'hello',
        };

        renderConsumer = context => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App#renderConsumer');
=======
          Scheduler.log('App#renderConsumer');
>>>>>>> remotes/upstream/main
          return <span prop={this.state.text} />;
        };

        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App');
=======
          Scheduler.log('App');
>>>>>>> remotes/upstream/main
          return (
            <Context.Provider value={this.props.value}>
              <Consumer>{this.renderConsumer}</Consumer>
            </Context.Provider>
          );
        }
      }

      // Initial mount
      let inst;
      ReactNoop.render(<App value={1} ref={ref => (inst = ref)} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['App', 'App#renderConsumer']);
      expect(ReactNoop.getChildren()).toEqual([span('hello')]);

      // Update
      inst.setState({text: 'goodbye'});
      expect(Scheduler).toFlushAndYield(['App', 'App#renderConsumer']);
      expect(ReactNoop.getChildren()).toEqual([span('goodbye')]);
    });

    it('warns when reading context inside render phase class setState updater', () => {
=======
      await waitForAll(['App', 'App#renderConsumer']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="hello" />);

      // Update
      inst.setState({text: 'goodbye'});
      await waitForAll(['App', 'App#renderConsumer']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="goodbye" />);
    });

    it('warns when reading context inside render phase class setState updater', async () => {
>>>>>>> remotes/upstream/main
      const ThemeContext = React.createContext('light');

      class Cls extends React.Component {
        state = {};
        render() {
          this.setState(() => {
            readContext(ThemeContext);
          });
          return null;
        }
      }

      ReactNoop.render(<Cls />);
<<<<<<< HEAD
      expect(() => expect(Scheduler).toFlushWithoutYielding()).toErrorDev([
=======
      await expect(async () => await waitForAll([])).toErrorDev([
>>>>>>> remotes/upstream/main
        'Context can only be read while React is rendering',
        'Cannot update during an existing state transition',
      ]);
    });
  });

  describe('useContext', () => {
<<<<<<< HEAD
    it('throws when used in a class component', () => {
=======
    it('throws when used in a class component', async () => {
>>>>>>> remotes/upstream/main
      const Context = React.createContext(0);
      class Foo extends React.Component {
        render() {
          return useContext(Context);
        }
      }
      ReactNoop.render(<Foo />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndThrow(
=======
      await waitForThrow(
>>>>>>> remotes/upstream/main
        'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen' +
          ' for one of the following reasons:\n' +
          '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
          '2. You might be breaking the Rules of Hooks\n' +
          '3. You might have more than one copy of React in the same app\n' +
          'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.',
      );
    });

<<<<<<< HEAD
    it('warns when passed a consumer', () => {
=======
    it('warns when passed a consumer', async () => {
>>>>>>> remotes/upstream/main
      const Context = React.createContext(0);
      function Foo() {
        return useContext(Context.Consumer);
      }
      ReactNoop.render(<Foo />);
<<<<<<< HEAD
      expect(() => expect(Scheduler).toFlushWithoutYielding()).toErrorDev(
=======
      await expect(async () => await waitForAll([])).toErrorDev(
>>>>>>> remotes/upstream/main
        'Calling useContext(Context.Consumer) is not supported, may cause bugs, ' +
          'and will be removed in a future major release. ' +
          'Did you mean to call useContext(Context) instead?',
      );
    });

<<<<<<< HEAD
    it('warns when passed a provider', () => {
=======
    it('warns when passed a provider', async () => {
>>>>>>> remotes/upstream/main
      const Context = React.createContext(0);
      function Foo() {
        useContext(Context.Provider);
        return null;
      }
      ReactNoop.render(<Foo />);
<<<<<<< HEAD
      expect(() => expect(Scheduler).toFlushWithoutYielding()).toErrorDev(
=======
      await expect(async () => await waitForAll([])).toErrorDev(
>>>>>>> remotes/upstream/main
        'Calling useContext(Context.Provider) is not supported. ' +
          'Did you mean to call useContext(Context) instead?',
      );
    });

    // Context consumer bails out on propagating "deep" updates when `value` hasn't changed.
    // However, it doesn't bail out from rendering if the component above it re-rendered anyway.
    // If we bailed out on referential equality, it would be confusing that you
    // can call this.setState(), but an autobound render callback "blocked" the update.
    // https://github.com/facebook/react/pull/12470#issuecomment-376917711
<<<<<<< HEAD
    it('does not bail out if there were no bailouts above it', () => {
=======
    it('does not bail out if there were no bailouts above it', async () => {
>>>>>>> remotes/upstream/main
      const Context = React.createContext(0);

      function Consumer({children}) {
        const contextValue = useContext(Context);
        return children(contextValue);
      }

      class App extends React.Component {
        state = {
          text: 'hello',
        };

        renderConsumer = context => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App#renderConsumer');
=======
          Scheduler.log('App#renderConsumer');
>>>>>>> remotes/upstream/main
          return <span prop={this.state.text} />;
        };

        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue('App');
=======
          Scheduler.log('App');
>>>>>>> remotes/upstream/main
          return (
            <Context.Provider value={this.props.value}>
              <Consumer>{this.renderConsumer}</Consumer>
            </Context.Provider>
          );
        }
      }

      // Initial mount
      let inst;
      ReactNoop.render(<App value={1} ref={ref => (inst = ref)} />);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['App', 'App#renderConsumer']);
      expect(ReactNoop.getChildren()).toEqual([span('hello')]);

      // Update
      inst.setState({text: 'goodbye'});
      expect(Scheduler).toFlushAndYield(['App', 'App#renderConsumer']);
      expect(ReactNoop.getChildren()).toEqual([span('goodbye')]);
    });
  });

  it('unwinds after errors in complete phase', () => {
=======
      await waitForAll(['App', 'App#renderConsumer']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="hello" />);

      // Update
      inst.setState({text: 'goodbye'});
      await waitForAll(['App', 'App#renderConsumer']);
      expect(ReactNoop).toMatchRenderedOutput(<span prop="goodbye" />);
    });
  });

  it('unwinds after errors in complete phase', async () => {
>>>>>>> remotes/upstream/main
    const Context = React.createContext(0);

    // This is a regression test for stack misalignment
    // caused by unwinding the context from wrong point.
    ReactNoop.render(
      <errorInCompletePhase>
        <Context.Provider value={null} />
      </errorInCompletePhase>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushAndThrow('Error in host config.');
=======
    await waitForThrow('Error in host config.');
>>>>>>> remotes/upstream/main

    ReactNoop.render(
      <Context.Provider value={10}>
        <Context.Consumer>{value => <span prop={value} />}</Context.Consumer>
      </Context.Provider>,
    );
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren()).toEqual([span(10)]);
=======
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput(<span prop={10} />);
>>>>>>> remotes/upstream/main
  });

  describe('fuzz test', () => {
    const contextKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    const FLUSH_ALL = 'FLUSH_ALL';
    function flushAll() {
      return {
        type: FLUSH_ALL,
        toString() {
          return `flushAll()`;
        },
      };
    }

    const FLUSH = 'FLUSH';
    function flush(unitsOfWork) {
      return {
        type: FLUSH,
        unitsOfWork,
        toString() {
          return `flush(${unitsOfWork})`;
        },
      };
    }

    const UPDATE = 'UPDATE';
    function update(key, value) {
      return {
        type: UPDATE,
        key,
        value,
        toString() {
          return `update('${key}', ${value})`;
        },
      };
    }

    function randomInteger(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function randomAction() {
      switch (randomInteger(0, 3)) {
        case 0:
          return flushAll();
        case 1:
          return flush(randomInteger(0, 500));
        case 2:
          const key = contextKeys[randomInteger(0, contextKeys.length)];
          const value = randomInteger(1, 10);
          return update(key, value);
        default:
          throw new Error('Switch statement should be exhaustive');
      }
    }

    function randomActions(n) {
      const actions = [];
      for (let i = 0; i < n; i++) {
        actions.push(randomAction());
      }
      return actions;
    }

    function ContextSimulator(maxDepth) {
      const contexts = new Map(
        contextKeys.map(key => {
          const Context = React.createContext(0);
          Context.displayName = 'Context' + key;
          return [key, Context];
        }),
      );

      class ConsumerTree extends React.Component {
        shouldComponentUpdate() {
          return false;
        }
        render() {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue();
=======
          Scheduler.log();
>>>>>>> remotes/upstream/main
          if (this.props.depth >= this.props.maxDepth) {
            return null;
          }
          const consumers = [0, 1, 2].map(i => {
            const randomKey =
              contextKeys[
                this.props.rand.intBetween(0, contextKeys.length - 1)
              ];
            const Context = contexts.get(randomKey);
            return (
              <Context.Consumer key={i}>
                {value => (
                  <>
                    <span prop={`${randomKey}:${value}`} />
                    <ConsumerTree
                      rand={this.props.rand}
                      depth={this.props.depth + 1}
                      maxDepth={this.props.maxDepth}
                    />
                  </>
                )}
              </Context.Consumer>
            );
          });
          return consumers;
        }
      }

      function Root(props) {
        return contextKeys.reduceRight((children, key) => {
          const Context = contexts.get(key);
          const value = props.values[key];
          return <Context.Provider value={value}>{children}</Context.Provider>;
        }, <ConsumerTree rand={props.rand} depth={0} maxDepth={props.maxDepth} />);
      }

      const initialValues = contextKeys.reduce(
        (result, key, i) => ({...result, [key]: i + 1}),
        {},
      );

      function assertConsistentTree(expectedValues = {}) {
<<<<<<< HEAD
        const children = ReactNoop.getChildren();
        children.forEach(child => {
          const text = child.prop;
=======
        const jsx = ReactNoop.getChildrenAsJSX();
        const children = jsx === null ? [] : jsx.props.children;
        children.forEach(child => {
          const text = child.props.prop;
>>>>>>> remotes/upstream/main
          const key = text[0];
          const value = parseInt(text[2], 10);
          const expectedValue = expectedValues[key];
          if (expectedValue === undefined) {
            // If an expected value was not explicitly passed to this function,
            // use the first occurrence.
            expectedValues[key] = value;
          } else if (value !== expectedValue) {
            throw new Error(
              `Inconsistent value! Expected: ${key}:${expectedValue}. Actual: ${text}`,
            );
          }
        });
      }

      function simulate(seed, actions) {
        const rand = gen.create(seed);
        let finalExpectedValues = initialValues;
        function updateRoot() {
          ReactNoop.render(
            <Root
              maxDepth={maxDepth}
              rand={rand}
              values={finalExpectedValues}
            />,
          );
        }
        updateRoot();

        actions.forEach(action => {
          switch (action.type) {
            case FLUSH_ALL:
              Scheduler.unstable_flushAllWithoutAsserting();
              break;
            case FLUSH:
              Scheduler.unstable_flushNumberOfYields(action.unitsOfWork);
              break;
            case UPDATE:
              finalExpectedValues = {
                ...finalExpectedValues,
                [action.key]: action.value,
              };
              updateRoot();
              break;
            default:
              throw new Error('Switch statement should be exhaustive');
          }
          assertConsistentTree();
        });

        Scheduler.unstable_flushAllWithoutAsserting();
        assertConsistentTree(finalExpectedValues);
      }

      return {simulate};
    }

    it('hard-coded tests', () => {
      const {simulate} = ContextSimulator(5);
      simulate('randomSeed', [flush(3), update('A', 4)]);
    });

    it('generated tests', () => {
      const {simulate} = ContextSimulator(5);

      const LIMIT = 100;
      for (let i = 0; i < LIMIT; i++) {
<<<<<<< HEAD
        const seed = Math.random()
          .toString(36)
          .substr(2, 5);
=======
        const seed = Math.random().toString(36).slice(2, 7);
>>>>>>> remotes/upstream/main
        const actions = randomActions(5);
        try {
          simulate(seed, actions);
        } catch (error) {
          console.error(`
Context fuzz tester error! Copy and paste the following line into the test suite:
  simulate('${seed}', ${actions.join(', ')});
`);
          throw error;
        }
      }
    });
  });

<<<<<<< HEAD
  it('should warn with an error message when using context as a consumer in DEV', () => {
=======
  it('should warn with an error message when using context as a consumer in DEV', async () => {
>>>>>>> remotes/upstream/main
    const BarContext = React.createContext({value: 'bar-initial'});
    const BarConsumer = BarContext;

    function Component() {
      return (
        <>
          <BarContext.Provider value={{value: 'bar-updated'}}>
            <BarConsumer>
              {({value}) => <div actual={value} expected="bar-updated" />}
            </BarConsumer>
          </BarContext.Provider>
        </>
      );
    }

<<<<<<< HEAD
    expect(() => {
      ReactNoop.render(<Component />);
      expect(Scheduler).toFlushWithoutYielding();
=======
    await expect(async () => {
      ReactNoop.render(<Component />);
      await waitForAll([]);
>>>>>>> remotes/upstream/main
    }).toErrorDev(
      'Rendering <Context> directly is not supported and will be removed in ' +
        'a future major release. Did you mean to render <Context.Consumer> instead?',
    );
  });

  // False positive regression test.
<<<<<<< HEAD
  it('should not warn when using Consumer from React < 16.6 with newer renderer', () => {
=======
  it('should not warn when using Consumer from React < 16.6 with newer renderer', async () => {
>>>>>>> remotes/upstream/main
    const BarContext = React.createContext({value: 'bar-initial'});
    // React 16.5 and earlier didn't have a separate object.
    BarContext.Consumer = BarContext;

    function Component() {
      return (
        <>
          <BarContext.Provider value={{value: 'bar-updated'}}>
            <BarContext.Consumer>
              {({value}) => <div actual={value} expected="bar-updated" />}
            </BarContext.Consumer>
          </BarContext.Provider>
        </>
      );
    }

    ReactNoop.render(<Component />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
  });

  it('should warn with an error message when using nested context consumers in DEV', () => {
=======
    await waitForAll([]);
  });

  it('should warn with an error message when using nested context consumers in DEV', async () => {
>>>>>>> remotes/upstream/main
    const BarContext = React.createContext({value: 'bar-initial'});
    const BarConsumer = BarContext;

    function Component() {
      return (
        <>
          <BarContext.Provider value={{value: 'bar-updated'}}>
            <BarConsumer.Consumer.Consumer>
              {({value}) => <div actual={value} expected="bar-updated" />}
            </BarConsumer.Consumer.Consumer>
          </BarContext.Provider>
        </>
      );
    }

<<<<<<< HEAD
    expect(() => {
      ReactNoop.render(<Component />);
      expect(Scheduler).toFlushWithoutYielding();
=======
    await expect(async () => {
      ReactNoop.render(<Component />);
      await waitForAll([]);
>>>>>>> remotes/upstream/main
    }).toErrorDev(
      'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' +
        'a future major release. Did you mean to render <Context.Consumer> instead?',
    );
  });

<<<<<<< HEAD
  it('should warn with an error message when using Context.Consumer.Provider DEV', () => {
=======
  it('should warn with an error message when using Context.Consumer.Provider DEV', async () => {
>>>>>>> remotes/upstream/main
    const BarContext = React.createContext({value: 'bar-initial'});

    function Component() {
      return (
        <>
          <BarContext.Consumer.Provider value={{value: 'bar-updated'}}>
            <BarContext.Consumer>
              {({value}) => <div actual={value} expected="bar-updated" />}
            </BarContext.Consumer>
          </BarContext.Consumer.Provider>
        </>
      );
    }

<<<<<<< HEAD
    expect(() => {
      ReactNoop.render(<Component />);
      expect(Scheduler).toFlushWithoutYielding();
=======
    await expect(async () => {
      ReactNoop.render(<Component />);
      await waitForAll([]);
>>>>>>> remotes/upstream/main
    }).toErrorDev(
      'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' +
        'a future major release. Did you mean to render <Context.Provider> instead?',
    );
  });
});
