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
let ReactTestUtils;

let TestComponent;

describe('refs-destruction', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    ReactDOM = require('react-dom');
    ReactTestUtils = require('react-dom/test-utils');

    class ClassComponent extends React.Component {
      render() {
        return null;
      }
    }

    TestComponent = class extends React.Component {
<<<<<<< HEAD
=======
      theInnerDivRef = React.createRef();
      theInnerClassComponentRef = React.createRef();

>>>>>>> remotes/upstream/main
      render() {
        if (this.props.destroy) {
          return <div />;
        } else if (this.props.removeRef) {
          return (
            <div>
              <div />
              <ClassComponent />
            </div>
          );
        } else {
          return (
            <div>
<<<<<<< HEAD
              <div ref="theInnerDiv" />
              <ClassComponent ref="theInnerClassComponent" />
=======
              <div ref={this.theInnerDivRef} />
              <ClassComponent ref={this.theInnerClassComponentRef} />
>>>>>>> remotes/upstream/main
            </div>
          );
        }
      }
    };
  });

  it('should remove refs when destroying the parent', () => {
    const container = document.createElement('div');
    const testInstance = ReactDOM.render(<TestComponent />, container);
<<<<<<< HEAD
    expect(ReactTestUtils.isDOMComponent(testInstance.refs.theInnerDiv)).toBe(
      true,
    );
    expect(
      Object.keys(testInstance.refs || {}).filter(key => testInstance.refs[key])
        .length,
    ).toEqual(2);
    ReactDOM.unmountComponentAtNode(container);
    expect(
      Object.keys(testInstance.refs || {}).filter(key => testInstance.refs[key])
        .length,
    ).toEqual(0);
=======

    expect(
      ReactTestUtils.isDOMComponent(testInstance.theInnerDivRef.current),
    ).toBe(true);
    expect(testInstance.theInnerClassComponentRef.current).toBeTruthy();

    ReactDOM.unmountComponentAtNode(container);

    expect(testInstance.theInnerDivRef.current).toBe(null);
    expect(testInstance.theInnerClassComponentRef.current).toBe(null);
>>>>>>> remotes/upstream/main
  });

  it('should remove refs when destroying the child', () => {
    const container = document.createElement('div');
    const testInstance = ReactDOM.render(<TestComponent />, container);
<<<<<<< HEAD
    expect(ReactTestUtils.isDOMComponent(testInstance.refs.theInnerDiv)).toBe(
      true,
    );
    expect(
      Object.keys(testInstance.refs || {}).filter(key => testInstance.refs[key])
        .length,
    ).toEqual(2);
    ReactDOM.render(<TestComponent destroy={true} />, container);
    expect(
      Object.keys(testInstance.refs || {}).filter(key => testInstance.refs[key])
        .length,
    ).toEqual(0);
=======
    expect(
      ReactTestUtils.isDOMComponent(testInstance.theInnerDivRef.current),
    ).toBe(true);
    expect(testInstance.theInnerClassComponentRef.current).toBeTruthy();

    ReactDOM.render(<TestComponent destroy={true} />, container);

    expect(testInstance.theInnerDivRef.current).toBe(null);
    expect(testInstance.theInnerClassComponentRef.current).toBe(null);
>>>>>>> remotes/upstream/main
  });

  it('should remove refs when removing the child ref attribute', () => {
    const container = document.createElement('div');
    const testInstance = ReactDOM.render(<TestComponent />, container);
<<<<<<< HEAD
    expect(ReactTestUtils.isDOMComponent(testInstance.refs.theInnerDiv)).toBe(
      true,
    );
    expect(
      Object.keys(testInstance.refs || {}).filter(key => testInstance.refs[key])
        .length,
    ).toEqual(2);
    ReactDOM.render(<TestComponent removeRef={true} />, container);
    expect(
      Object.keys(testInstance.refs || {}).filter(key => testInstance.refs[key])
        .length,
    ).toEqual(0);
=======

    expect(
      ReactTestUtils.isDOMComponent(testInstance.theInnerDivRef.current),
    ).toBe(true);
    expect(testInstance.theInnerClassComponentRef.current).toBeTruthy();

    ReactDOM.render(<TestComponent removeRef={true} />, container);

    expect(testInstance.theInnerDivRef.current).toBe(null);
    expect(testInstance.theInnerClassComponentRef.current).toBe(null);
>>>>>>> remotes/upstream/main
  });

  it('should not error when destroying child with ref asynchronously', () => {
    class Modal extends React.Component {
      componentDidMount() {
        this.div = document.createElement('div');
        document.body.appendChild(this.div);
        this.componentDidUpdate();
      }

      componentDidUpdate() {
        ReactDOM.render(<div>{this.props.children}</div>, this.div);
      }

      componentWillUnmount() {
        const self = this;
        // some async animation
<<<<<<< HEAD
        setTimeout(function() {
          expect(function() {
=======
        setTimeout(function () {
          expect(function () {
>>>>>>> remotes/upstream/main
            ReactDOM.unmountComponentAtNode(self.div);
          }).not.toThrow();
          document.body.removeChild(self.div);
        }, 0);
      }

      render() {
        return null;
      }
    }

    class AppModal extends React.Component {
      render() {
        return (
          <Modal>
<<<<<<< HEAD
            <a ref="ref" />
=======
            <a ref={React.createRef()} />
>>>>>>> remotes/upstream/main
          </Modal>
        );
      }
    }

    class App extends React.Component {
      render() {
        return this.props.hidden ? null : <AppModal onClose={this.close} />;
      }
    }

    const container = document.createElement('div');
    ReactDOM.render(<App />, container);
    ReactDOM.render(<App hidden={true} />, container);
    jest.runAllTimers();
  });
});
