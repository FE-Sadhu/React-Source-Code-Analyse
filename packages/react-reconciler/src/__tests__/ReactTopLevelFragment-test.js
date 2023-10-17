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
let Scheduler;

// This is a new feature in Fiber so I put it in its own test file. It could
// probably move to one of the other test files once it is official.
describe('ReactTopLevelFragment', function() {
  beforeEach(function() {
    jest.resetModules();
    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
  });

  it('should render a simple fragment at the top of a component', function() {
=======
let waitForAll;

// This is a new feature in Fiber so I put it in its own test file. It could
// probably move to one of the other test files once it is official.
describe('ReactTopLevelFragment', function () {
  beforeEach(function () {
    jest.resetModules();
    React = require('react');
    ReactNoop = require('react-noop-renderer');

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
  });

  it('should render a simple fragment at the top of a component', async function () {
>>>>>>> remotes/upstream/main
    function Fragment() {
      return [<div key="a">Hello</div>, <div key="b">World</div>];
    }
    ReactNoop.render(<Fragment />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
  });

  it('should preserve state when switching from a single child', function() {
=======
    await waitForAll([]);
  });

  it('should preserve state when switching from a single child', async function () {
>>>>>>> remotes/upstream/main
    let instance = null;

    class Stateful extends React.Component {
      render() {
        instance = this;
        return <div>Hello</div>;
      }
    }

    function Fragment({condition}) {
      return condition ? (
        <Stateful key="a" />
      ) : (
        [<Stateful key="a" />, <div key="b">World</div>]
      );
    }
    ReactNoop.render(<Fragment />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    const instanceA = instance;

    expect(instanceA).not.toBe(null);

    ReactNoop.render(<Fragment condition={true} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    const instanceB = instance;

    expect(instanceB).toBe(instanceA);
  });

<<<<<<< HEAD
  it('should not preserve state when switching to a nested array', function() {
=======
  it('should not preserve state when switching to a nested array', async function () {
>>>>>>> remotes/upstream/main
    let instance = null;

    class Stateful extends React.Component {
      render() {
        instance = this;
        return <div>Hello</div>;
      }
    }

    function Fragment({condition}) {
      return condition ? (
        <Stateful key="a" />
      ) : (
        [[<Stateful key="a" />, <div key="b">World</div>], <div key="c" />]
      );
    }
    ReactNoop.render(<Fragment />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    const instanceA = instance;

    expect(instanceA).not.toBe(null);

    ReactNoop.render(<Fragment condition={true} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    const instanceB = instance;

    expect(instanceB).not.toBe(instanceA);
  });

<<<<<<< HEAD
  it('preserves state if an implicit key slot switches from/to null', function() {
=======
  it('preserves state if an implicit key slot switches from/to null', async function () {
>>>>>>> remotes/upstream/main
    let instance = null;

    class Stateful extends React.Component {
      render() {
        instance = this;
        return <div>World</div>;
      }
    }

    function Fragment({condition}) {
      return condition
        ? [null, <Stateful key="a" />]
        : [<div key="b">Hello</div>, <Stateful key="a" />];
    }
    ReactNoop.render(<Fragment />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    const instanceA = instance;

    expect(instanceA).not.toBe(null);

    ReactNoop.render(<Fragment condition={true} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    const instanceB = instance;

    expect(instanceB).toBe(instanceA);

    ReactNoop.render(<Fragment condition={false} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    const instanceC = instance;

    expect(instanceC === instanceA).toBe(true);
  });

<<<<<<< HEAD
  it('should preserve state in a reorder', function() {
=======
  it('should preserve state in a reorder', async function () {
>>>>>>> remotes/upstream/main
    let instance = null;

    class Stateful extends React.Component {
      render() {
        instance = this;
        return <div>Hello</div>;
      }
    }

    function Fragment({condition}) {
      return condition
        ? [[<div key="b">World</div>, <Stateful key="a" />]]
        : [[<Stateful key="a" />, <div key="b">World</div>], <div key="c" />];
    }
    ReactNoop.render(<Fragment />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    const instanceA = instance;

    expect(instanceA).not.toBe(null);

    ReactNoop.render(<Fragment condition={true} />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main

    const instanceB = instance;

    expect(instanceB).toBe(instanceA);
  });
});
