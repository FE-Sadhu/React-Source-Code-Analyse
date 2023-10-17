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
 * @jest-environment node
 */

// sanity tests for act()

const React = require('react');
const ReactNoop = require('react-noop-renderer');
const Scheduler = require('scheduler');
<<<<<<< HEAD
const act = require('jest-react').act;
=======
const act = require('internal-test-utils').act;
const {assertLog, waitForAll} = require('internal-test-utils');
>>>>>>> remotes/upstream/main

// TODO: These tests are no longer specific to the noop renderer
// implementation. They test the internal implementation we use in the React
// test suite.
describe('internal act()', () => {
  it('can use act to flush effects', async () => {
    function App(props) {
      React.useEffect(props.callback);
      return null;
    }

    const calledLog = [];
<<<<<<< HEAD
    act(() => {
=======
    await act(() => {
>>>>>>> remotes/upstream/main
      ReactNoop.render(
        <App
          callback={() => {
            calledLog.push(calledLog.length);
          }}
        />,
      );
    });
<<<<<<< HEAD
    expect(Scheduler).toFlushWithoutYielding();
=======
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(calledLog).toEqual([0]);
  });

  it('should work with async/await', async () => {
    function App() {
      const [ctr, setCtr] = React.useState(0);
      async function someAsyncFunction() {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue('stage 1');
        await null;
        Scheduler.unstable_yieldValue('stage 2');
=======
        Scheduler.log('stage 1');
        await null;
        Scheduler.log('stage 2');
>>>>>>> remotes/upstream/main
        await null;
        setCtr(1);
      }
      React.useEffect(() => {
        someAsyncFunction();
      }, []);
      return ctr;
    }
<<<<<<< HEAD
    await act(async () => {
      ReactNoop.render(<App />);
    });
    expect(Scheduler).toHaveYielded(['stage 1', 'stage 2']);
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop.getChildren()).toEqual([{text: '1', hidden: false}]);
=======
    await act(() => {
      ReactNoop.render(<App />);
    });
    assertLog(['stage 1', 'stage 2']);
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput('1');
>>>>>>> remotes/upstream/main
  });
});
