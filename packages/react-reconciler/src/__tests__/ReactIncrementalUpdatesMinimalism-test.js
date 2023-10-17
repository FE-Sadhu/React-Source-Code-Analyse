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
 * @jest-environment node
 */

'use strict';

let React;
let ReactNoop;
<<<<<<< HEAD
=======
let act;
>>>>>>> remotes/upstream/main

describe('ReactIncrementalUpdatesMinimalism', () => {
  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactNoop = require('react-noop-renderer');
<<<<<<< HEAD
  });

  it('should render a simple component', () => {
=======

    act = require('internal-test-utils').act;
  });

  it('should render a simple component', async () => {
>>>>>>> remotes/upstream/main
    function Child() {
      return <div>Hello World</div>;
    }

    function Parent() {
      return <Child />;
    }

<<<<<<< HEAD
    ReactNoop.render(<Parent />);
    expect(ReactNoop.flushWithHostCounters()).toEqual({
      hostDiffCounter: 0,
      hostUpdateCounter: 0,
    });

    ReactNoop.render(<Parent />);
    expect(ReactNoop.flushWithHostCounters()).toEqual({
      hostDiffCounter: 1,
=======
    ReactNoop.startTrackingHostCounters();
    await act(() => ReactNoop.render(<Parent />));
    expect(ReactNoop.stopTrackingHostCounters()).toEqual({
      hostUpdateCounter: 0,
    });

    ReactNoop.startTrackingHostCounters();
    await act(() => ReactNoop.render(<Parent />));
    expect(ReactNoop.stopTrackingHostCounters()).toEqual({
>>>>>>> remotes/upstream/main
      hostUpdateCounter: 1,
    });
  });

<<<<<<< HEAD
  it('should not diff referentially equal host elements', () => {
=======
  it('should not diff referentially equal host elements', async () => {
>>>>>>> remotes/upstream/main
    function Leaf(props) {
      return (
        <span>
          hello
          <b />
          {props.name}
        </span>
      );
    }

    const constEl = (
      <div>
        <Leaf name="world" />
      </div>
    );

    function Child() {
      return constEl;
    }

    function Parent() {
      return <Child />;
    }

<<<<<<< HEAD
    ReactNoop.render(<Parent />);
    expect(ReactNoop.flushWithHostCounters()).toEqual({
      hostDiffCounter: 0,
      hostUpdateCounter: 0,
    });

    ReactNoop.render(<Parent />);
    expect(ReactNoop.flushWithHostCounters()).toEqual({
      hostDiffCounter: 0,
=======
    ReactNoop.startTrackingHostCounters();
    await act(() => ReactNoop.render(<Parent />));
    expect(ReactNoop.stopTrackingHostCounters()).toEqual({
      hostUpdateCounter: 0,
    });

    ReactNoop.startTrackingHostCounters();
    await act(() => ReactNoop.render(<Parent />));
    expect(ReactNoop.stopTrackingHostCounters()).toEqual({
>>>>>>> remotes/upstream/main
      hostUpdateCounter: 0,
    });
  });

<<<<<<< HEAD
  it('should not diff parents of setState targets', () => {
=======
  it('should not diff parents of setState targets', async () => {
>>>>>>> remotes/upstream/main
    let childInst;

    function Leaf(props) {
      return (
        <span>
          hello
          <b />
          {props.name}
        </span>
      );
    }

    class Child extends React.Component {
      state = {name: 'Batman'};
      render() {
        childInst = this;
        return (
          <div>
            <Leaf name={this.state.name} />
          </div>
        );
      }
    }

    function Parent() {
      return (
        <section>
          <div>
            <Leaf name="world" />
            <Child />
            <hr />
            <Leaf name="world" />
          </div>
        </section>
      );
    }

<<<<<<< HEAD
    ReactNoop.render(<Parent />);
    expect(ReactNoop.flushWithHostCounters()).toEqual({
      hostDiffCounter: 0,
      hostUpdateCounter: 0,
    });

    childInst.setState({name: 'Robin'});
    expect(ReactNoop.flushWithHostCounters()).toEqual({
      // Child > div
      // Child > Leaf > span
      // Child > Leaf > span > b
      hostDiffCounter: 3,
=======
    ReactNoop.startTrackingHostCounters();
    await act(() => ReactNoop.render(<Parent />));
    expect(ReactNoop.stopTrackingHostCounters()).toEqual({
      hostUpdateCounter: 0,
    });

    ReactNoop.startTrackingHostCounters();
    await act(() => childInst.setState({name: 'Robin'}));
    expect(ReactNoop.stopTrackingHostCounters()).toEqual({
>>>>>>> remotes/upstream/main
      // Child > div
      // Child > Leaf > span
      // Child > Leaf > span > b
      // Child > Leaf > span > #text
      hostUpdateCounter: 4,
    });

<<<<<<< HEAD
    ReactNoop.render(<Parent />);
    expect(ReactNoop.flushWithHostCounters()).toEqual({
=======
    ReactNoop.startTrackingHostCounters();
    await act(() => ReactNoop.render(<Parent />));
    expect(ReactNoop.stopTrackingHostCounters()).toEqual({
>>>>>>> remotes/upstream/main
      // Parent > section
      // Parent > section > div
      // Parent > section > div > Leaf > span
      // Parent > section > div > Leaf > span > b
      // Parent > section > div > Child > div
      // Parent > section > div > Child > div > Leaf > span
      // Parent > section > div > Child > div > Leaf > span > b
      // Parent > section > div > hr
      // Parent > section > div > Leaf > span
      // Parent > section > div > Leaf > span > b
<<<<<<< HEAD
      hostDiffCounter: 10,
=======
>>>>>>> remotes/upstream/main
      hostUpdateCounter: 10,
    });
  });
});
