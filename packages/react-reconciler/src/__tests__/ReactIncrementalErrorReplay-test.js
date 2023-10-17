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
=======
let waitForAll;
let waitForThrow;
>>>>>>> remotes/upstream/main

describe('ReactIncrementalErrorReplay', () => {
  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactNoop = require('react-noop-renderer');
<<<<<<< HEAD
    Scheduler = require('scheduler');
  });

  it('should fail gracefully on error in the host environment', () => {
    ReactNoop.render(<errorInBeginPhase />);
    expect(Scheduler).toFlushAndThrow('Error in host config.');
  });

  it("should ignore error if it doesn't throw on retry", () => {
=======

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    waitForThrow = InternalTestUtils.waitForThrow;
  });

  it('should fail gracefully on error in the host environment', async () => {
    ReactNoop.render(<errorInBeginPhase />);
    await waitForThrow('Error in host config.');
  });

  it("should ignore error if it doesn't throw on retry", async () => {
>>>>>>> remotes/upstream/main
    let didInit = false;

    function badLazyInit() {
      const needsInit = !didInit;
      didInit = true;
      if (needsInit) {
        throw new Error('Hi');
      }
    }

    class App extends React.Component {
      render() {
        badLazyInit();
        return <div />;
      }
    }
    ReactNoop.render(<App />);
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
  });
});
