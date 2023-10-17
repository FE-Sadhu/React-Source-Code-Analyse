let React;
let ReactNoop;
let Scheduler;
let act;
<<<<<<< HEAD
=======
let assertLog;
>>>>>>> remotes/upstream/main

describe('ReactClassSetStateCallback', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;
  });

  function Text({text}) {
    Scheduler.unstable_yieldValue(text);
=======
    act = require('internal-test-utils').act;

    const InternalTestUtils = require('internal-test-utils');
    assertLog = InternalTestUtils.assertLog;
  });

  function Text({text}) {
    Scheduler.log(text);
>>>>>>> remotes/upstream/main
    return text;
  }

  test('regression: setState callback (2nd arg) should only fire once, even after a rebase', async () => {
    let app;
    class App extends React.Component {
      state = {step: 0};
      render() {
        app = this;
        return <Text text={this.state.step} />;
      }
    }

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
      root.render(<App />);
    });
    expect(Scheduler).toHaveYielded([0]);

    await act(async () => {
      app.setState({step: 1}, () =>
        Scheduler.unstable_yieldValue('Callback 1'),
      );
      ReactNoop.flushSync(() => {
        app.setState({step: 2}, () =>
          Scheduler.unstable_yieldValue('Callback 2'),
        );
      });
    });
    expect(Scheduler).toHaveYielded([2, 'Callback 2', 2, 'Callback 1']);
=======
    await act(() => {
      root.render(<App />);
    });
    assertLog([0]);

    await act(() => {
      if (gate(flags => flags.enableUnifiedSyncLane)) {
        React.startTransition(() => {
          app.setState({step: 1}, () => Scheduler.log('Callback 1'));
        });
      } else {
        app.setState({step: 1}, () => Scheduler.log('Callback 1'));
      }
      ReactNoop.flushSync(() => {
        app.setState({step: 2}, () => Scheduler.log('Callback 2'));
      });
    });
    assertLog([2, 'Callback 2', 2, 'Callback 1']);
>>>>>>> remotes/upstream/main
  });
});
