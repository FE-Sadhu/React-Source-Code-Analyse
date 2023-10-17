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
let ReactNoopPersistent;
<<<<<<< HEAD
=======
let act;
>>>>>>> remotes/upstream/main

describe('ReactPersistentUpdatesMinimalism', () => {
  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactNoopPersistent = require('react-noop-renderer/persistent');
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
    ReactNoopPersistent.render(<Parent />);
    expect(ReactNoopPersistent.flushWithHostCounters()).toEqual({
      hostDiffCounter: 0,
      hostCloneCounter: 0,
    });

    ReactNoopPersistent.render(<Parent />);
    expect(ReactNoopPersistent.flushWithHostCounters()).toEqual({
      hostDiffCounter: 1,
=======
    ReactNoopPersistent.startTrackingHostCounters();
    await act(() => ReactNoopPersistent.render(<Parent />));
    expect(ReactNoopPersistent.stopTrackingHostCounters()).toEqual({
      hostCloneCounter: 0,
    });

    ReactNoopPersistent.startTrackingHostCounters();
    await act(() => ReactNoopPersistent.render(<Parent />));
    expect(ReactNoopPersistent.stopTrackingHostCounters()).toEqual({
>>>>>>> remotes/upstream/main
      hostCloneCounter: 1,
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
    ReactNoopPersistent.render(<Parent />);
    expect(ReactNoopPersistent.flushWithHostCounters()).toEqual({
      hostDiffCounter: 0,
      hostCloneCounter: 0,
    });

    ReactNoopPersistent.render(<Parent />);
    expect(ReactNoopPersistent.flushWithHostCounters()).toEqual({
      hostDiffCounter: 0,
=======
    ReactNoopPersistent.startTrackingHostCounters();
    await act(() => ReactNoopPersistent.render(<Parent />));
    expect(ReactNoopPersistent.stopTrackingHostCounters()).toEqual({
      hostCloneCounter: 0,
    });

    ReactNoopPersistent.startTrackingHostCounters();
    await act(() => ReactNoopPersistent.render(<Parent />));
    expect(ReactNoopPersistent.stopTrackingHostCounters()).toEqual({
>>>>>>> remotes/upstream/main
      hostCloneCounter: 0,
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
    ReactNoopPersistent.render(<Parent />);
    expect(ReactNoopPersistent.flushWithHostCounters()).toEqual({
      hostDiffCounter: 0,
      hostCloneCounter: 0,
    });

    childInst.setState({name: 'Robin'});
    expect(ReactNoopPersistent.flushWithHostCounters()).toEqual({
      // section > div > Child > div
      // section > div > Child > Leaf > span
      // section > div > Child > Leaf > span > b
      hostDiffCounter: 3,
=======
    ReactNoopPersistent.startTrackingHostCounters();
    await act(() => ReactNoopPersistent.render(<Parent />));
    expect(ReactNoopPersistent.stopTrackingHostCounters()).toEqual({
      hostCloneCounter: 0,
    });

    ReactNoopPersistent.startTrackingHostCounters();
    await act(() => childInst.setState({name: 'Robin'}));
    expect(ReactNoopPersistent.stopTrackingHostCounters()).toEqual({
>>>>>>> remotes/upstream/main
      // section
      // section > div
      // section > div > Child > div
      // section > div > Child > Leaf > span
      // section > div > Child > Leaf > span > b
      hostCloneCounter: 5,
    });

<<<<<<< HEAD
    ReactNoopPersistent.render(<Parent />);
    expect(ReactNoopPersistent.flushWithHostCounters()).toEqual({
=======
    ReactNoopPersistent.startTrackingHostCounters();
    await act(() => ReactNoopPersistent.render(<Parent />));
    expect(ReactNoopPersistent.stopTrackingHostCounters()).toEqual({
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
      hostCloneCounter: 10,
    });
  });
});
