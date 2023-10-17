let React;
let ReactNoop;
let Scheduler;
let act;
let Suspense;
let useState;
let textCache;

let readText;
let resolveText;
// let rejectText;

<<<<<<< HEAD
=======
let assertLog;
let waitForPaint;

>>>>>>> remotes/upstream/main
describe('ReactSuspenseWithNoopRenderer', () => {
  beforeEach(() => {
    jest.resetModules();

    React = require('react');
    ReactNoop = require('react-noop-renderer');
    Scheduler = require('scheduler');
<<<<<<< HEAD
    act = require('jest-react').act;
    Suspense = React.Suspense;
    useState = React.useState;

=======
    act = require('internal-test-utils').act;
    Suspense = React.Suspense;
    useState = React.useState;

    const InternalTestUtils = require('internal-test-utils');
    assertLog = InternalTestUtils.assertLog;
    waitForPaint = InternalTestUtils.waitForPaint;

>>>>>>> remotes/upstream/main
    textCache = new Map();

    readText = text => {
      const record = textCache.get(text);
      if (record !== undefined) {
        switch (record.status) {
          case 'pending':
            throw record.promise;
          case 'rejected':
            throw Error('Failed to load: ' + text);
          case 'resolved':
            return text;
        }
      } else {
        let ping;
        const promise = new Promise(resolve => (ping = resolve));
        const newRecord = {
          status: 'pending',
          ping: ping,
          promise,
        };
        textCache.set(text, newRecord);
        throw promise;
      }
    };

    resolveText = text => {
      const record = textCache.get(text);
      if (record !== undefined) {
        if (record.status === 'pending') {
          record.ping();
          record.ping = null;
          record.status = 'resolved';
          record.promise = null;
        }
      } else {
        const newRecord = {
          ping: null,
          status: 'resolved',
          promise: null,
        };
        textCache.set(text, newRecord);
      }
    };

    // rejectText = text => {
    //   const record = textCache.get(text);
    //   if (record !== undefined) {
    //     if (record.status === 'pending') {
<<<<<<< HEAD
    //       Scheduler.unstable_yieldValue(`Promise rejected [${text}]`);
=======
    //       Scheduler.log(`Promise rejected [${text}]`);
>>>>>>> remotes/upstream/main
    //       record.ping();
    //       record.status = 'rejected';
    //       clearTimeout(record.promise._timer);
    //       record.promise = null;
    //     }
    //   } else {
    //     const newRecord = {
    //       ping: null,
    //       status: 'rejected',
    //       promise: null,
    //     };
    //     textCache.set(text, newRecord);
    //   }
    // };
  });

  function Text(props) {
<<<<<<< HEAD
    Scheduler.unstable_yieldValue(props.text);
=======
    Scheduler.log(props.text);
>>>>>>> remotes/upstream/main
    return props.text;
  }

  function AsyncText(props) {
    const text = props.text;
    try {
      readText(text);
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(text);
      return text;
    } catch (promise) {
      if (typeof promise.then === 'function') {
        Scheduler.unstable_yieldValue(`Suspend! [${text}]`);
      } else {
        Scheduler.unstable_yieldValue(`Error! [${text}]`);
=======
      Scheduler.log(text);
      return text;
    } catch (promise) {
      if (typeof promise.then === 'function') {
        Scheduler.log(`Suspend! [${text}]`);
      } else {
        Scheduler.log(`Error! [${text}]`);
>>>>>>> remotes/upstream/main
      }
      throw promise;
    }
  }

  // @gate enableCPUSuspense
  it('skips CPU-bound trees on initial mount', async () => {
    function App() {
      return (
        <>
          <Text text="Outer" />
          <div>
            <Suspense
              unstable_expectedLoadTime={2000}
              fallback={<Text text="Loading..." />}>
              <Text text="Inner" />
            </Suspense>
          </div>
        </>
      );
    }

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App />);
<<<<<<< HEAD
      expect(Scheduler).toFlushUntilNextPaint(['Outer', 'Loading...']);
=======
      await waitForPaint(['Outer', 'Loading...']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(
        <>
          Outer
          <div>Loading...</div>
        </>,
      );
    });
    // Inner contents finish in separate commit from outer
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Inner']);
=======
    assertLog(['Inner']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        Outer
        <div>Inner</div>
      </>,
    );
  });

  // @gate enableCPUSuspense
  it('does not skip CPU-bound trees during updates', async () => {
    let setCount;

    function App() {
      const [count, _setCount] = useState(0);
      setCount = _setCount;
      return (
        <>
          <Text text="Outer" />
          <div>
            <Suspense
              unstable_expectedLoadTime={2000}
              fallback={<Text text="Loading..." />}>
              <Text text={`Inner [${count}]`} />
            </Suspense>
          </div>
        </>
      );
    }

    // Initial mount
    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
      root.render(<App />);
    });
    // Inner contents finish in separate commit from outer
    expect(Scheduler).toHaveYielded(['Outer', 'Loading...', 'Inner [0]']);
=======
    await act(() => {
      root.render(<App />);
    });
    // Inner contents finish in separate commit from outer
    assertLog(['Outer', 'Loading...', 'Inner [0]']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        Outer
        <div>Inner [0]</div>
      </>,
    );

    // Update
<<<<<<< HEAD
    await act(async () => {
      setCount(1);
    });
    // Entire update finishes in a single commit
    expect(Scheduler).toHaveYielded(['Outer', 'Inner [1]']);
=======
    await act(() => {
      setCount(1);
    });
    // Entire update finishes in a single commit
    assertLog(['Outer', 'Inner [1]']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        Outer
        <div>Inner [1]</div>
      </>,
    );
  });

  // @gate enableCPUSuspense
  it('suspend inside CPU-bound tree', async () => {
    function App() {
      return (
        <>
          <Text text="Outer" />
          <div>
            <Suspense
              unstable_expectedLoadTime={2000}
              fallback={<Text text="Loading..." />}>
              <AsyncText text="Inner" />
            </Suspense>
          </div>
        </>
      );
    }

    const root = ReactNoop.createRoot();
    await act(async () => {
      root.render(<App />);
<<<<<<< HEAD
      expect(Scheduler).toFlushUntilNextPaint(['Outer', 'Loading...']);
=======
      await waitForPaint(['Outer', 'Loading...']);
>>>>>>> remotes/upstream/main
      expect(root).toMatchRenderedOutput(
        <>
          Outer
          <div>Loading...</div>
        </>,
      );
    });
    // Inner contents suspended, so we continue showing a fallback.
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Suspend! [Inner]']);
=======
    assertLog(['Suspend! [Inner]']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        Outer
        <div>Loading...</div>
      </>,
    );

    // Resolve the data and finish rendering
    await act(async () => {
      await resolveText('Inner');
    });
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded(['Inner']);
=======
    assertLog(['Inner']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        Outer
        <div>Inner</div>
      </>,
    );
  });

  // @gate enableCPUSuspense
  it('nested CPU-bound trees', async () => {
    function App() {
      return (
        <>
          <Text text="A" />
          <div>
            <Suspense
              unstable_expectedLoadTime={2000}
              fallback={<Text text="Loading B..." />}>
              <Text text="B" />
              <div>
                <Suspense
                  unstable_expectedLoadTime={2000}
                  fallback={<Text text="Loading C..." />}>
                  <Text text="C" />
                </Suspense>
              </div>
            </Suspense>
          </div>
        </>
      );
    }

    const root = ReactNoop.createRoot();
<<<<<<< HEAD
    await act(async () => {
      root.render(<App />);
    });
    // Each level commits separately
    expect(Scheduler).toHaveYielded([
      'A',
      'Loading B...',
      'B',
      'Loading C...',
      'C',
    ]);
=======
    await act(() => {
      root.render(<App />);
    });
    // Each level commits separately
    assertLog(['A', 'Loading B...', 'B', 'Loading C...', 'C']);
>>>>>>> remotes/upstream/main
    expect(root).toMatchRenderedOutput(
      <>
        A
        <div>
          B<div>C</div>
        </div>
      </>,
    );
  });
});
