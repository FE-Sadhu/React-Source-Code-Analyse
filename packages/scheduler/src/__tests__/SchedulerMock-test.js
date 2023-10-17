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

let Scheduler;
let runWithPriority;
let ImmediatePriority;
let UserBlockingPriority;
let NormalPriority;
let LowPriority;
let IdlePriority;
let scheduleCallback;
let cancelCallback;
let wrapCallback;
let getCurrentPriorityLevel;
let shouldYield;
<<<<<<< HEAD
=======
let waitForAll;
let assertLog;
let waitFor;
let waitForPaint;
>>>>>>> remotes/upstream/main

describe('Scheduler', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock('scheduler', () => require('scheduler/unstable_mock'));

    Scheduler = require('scheduler');

    runWithPriority = Scheduler.unstable_runWithPriority;
    ImmediatePriority = Scheduler.unstable_ImmediatePriority;
    UserBlockingPriority = Scheduler.unstable_UserBlockingPriority;
    NormalPriority = Scheduler.unstable_NormalPriority;
    LowPriority = Scheduler.unstable_LowPriority;
    IdlePriority = Scheduler.unstable_IdlePriority;
    scheduleCallback = Scheduler.unstable_scheduleCallback;
    cancelCallback = Scheduler.unstable_cancelCallback;
    wrapCallback = Scheduler.unstable_wrapCallback;
    getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel;
    shouldYield = Scheduler.unstable_shouldYield;
<<<<<<< HEAD
  });

  it('flushes work incrementally', () => {
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('A'));
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('B'));
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('C'));
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('D'));

    expect(Scheduler).toFlushAndYieldThrough(['A', 'B']);
    expect(Scheduler).toFlushAndYieldThrough(['C']);
    expect(Scheduler).toFlushAndYield(['D']);
  });

  it('cancels work', () => {
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('A'));
    const callbackHandleB = scheduleCallback(NormalPriority, () =>
      Scheduler.unstable_yieldValue('B'),
    );
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('C'));

    cancelCallback(callbackHandleB);

    expect(Scheduler).toFlushAndYield([
=======

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
    assertLog = InternalTestUtils.assertLog;
    waitFor = InternalTestUtils.waitFor;
    waitForPaint = InternalTestUtils.waitForPaint;
  });

  it('flushes work incrementally', async () => {
    scheduleCallback(NormalPriority, () => Scheduler.log('A'));
    scheduleCallback(NormalPriority, () => Scheduler.log('B'));
    scheduleCallback(NormalPriority, () => Scheduler.log('C'));
    scheduleCallback(NormalPriority, () => Scheduler.log('D'));

    await waitFor(['A', 'B']);
    await waitFor(['C']);
    await waitForAll(['D']);
  });

  it('cancels work', async () => {
    scheduleCallback(NormalPriority, () => Scheduler.log('A'));
    const callbackHandleB = scheduleCallback(NormalPriority, () =>
      Scheduler.log('B'),
    );
    scheduleCallback(NormalPriority, () => Scheduler.log('C'));

    cancelCallback(callbackHandleB);

    await waitForAll([
>>>>>>> remotes/upstream/main
      'A',
      // B should have been cancelled
      'C',
    ]);
  });

<<<<<<< HEAD
  it('executes the highest priority callbacks first', () => {
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('A'));
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('B'));

    // Yield before B is flushed
    expect(Scheduler).toFlushAndYieldThrough(['A']);

    scheduleCallback(UserBlockingPriority, () =>
      Scheduler.unstable_yieldValue('C'),
    );
    scheduleCallback(UserBlockingPriority, () =>
      Scheduler.unstable_yieldValue('D'),
    );

    // C and D should come first, because they are higher priority
    expect(Scheduler).toFlushAndYield(['C', 'D', 'B']);
  });

  it('expires work', () => {
    scheduleCallback(NormalPriority, didTimeout => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.unstable_yieldValue(`A (did timeout: ${didTimeout})`);
    });
    scheduleCallback(UserBlockingPriority, didTimeout => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.unstable_yieldValue(`B (did timeout: ${didTimeout})`);
    });
    scheduleCallback(UserBlockingPriority, didTimeout => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.unstable_yieldValue(`C (did timeout: ${didTimeout})`);
=======
  it('executes the highest priority callbacks first', async () => {
    scheduleCallback(NormalPriority, () => Scheduler.log('A'));
    scheduleCallback(NormalPriority, () => Scheduler.log('B'));

    // Yield before B is flushed
    await waitFor(['A']);

    scheduleCallback(UserBlockingPriority, () => Scheduler.log('C'));
    scheduleCallback(UserBlockingPriority, () => Scheduler.log('D'));

    // C and D should come first, because they are higher priority
    await waitForAll(['C', 'D', 'B']);
  });

  it('expires work', async () => {
    scheduleCallback(NormalPriority, didTimeout => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.log(`A (did timeout: ${didTimeout})`);
    });
    scheduleCallback(UserBlockingPriority, didTimeout => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.log(`B (did timeout: ${didTimeout})`);
    });
    scheduleCallback(UserBlockingPriority, didTimeout => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.log(`C (did timeout: ${didTimeout})`);
>>>>>>> remotes/upstream/main
    });

    // Advance time, but not by enough to expire any work
    Scheduler.unstable_advanceTime(249);
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([]);
=======
    assertLog([]);
>>>>>>> remotes/upstream/main

    // Schedule a few more callbacks
    scheduleCallback(NormalPriority, didTimeout => {
      Scheduler.unstable_advanceTime(100);
<<<<<<< HEAD
      Scheduler.unstable_yieldValue(`D (did timeout: ${didTimeout})`);
    });
    scheduleCallback(NormalPriority, didTimeout => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.unstable_yieldValue(`E (did timeout: ${didTimeout})`);
=======
      Scheduler.log(`D (did timeout: ${didTimeout})`);
    });
    scheduleCallback(NormalPriority, didTimeout => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.log(`E (did timeout: ${didTimeout})`);
>>>>>>> remotes/upstream/main
    });

    // Advance by just a bit more to expire the user blocking callbacks
    Scheduler.unstable_advanceTime(1);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough([
      'B (did timeout: true)',
      'C (did timeout: true)',
    ]);

    // Expire A
    Scheduler.unstable_advanceTime(4600);
    expect(Scheduler).toFlushAndYieldThrough(['A (did timeout: true)']);

    // Flush the rest without expiring
    expect(Scheduler).toFlushAndYield([
      'D (did timeout: false)',
      'E (did timeout: true)',
    ]);
  });

  it('has a default expiration of ~5 seconds', () => {
    scheduleCallback(NormalPriority, () => Scheduler.unstable_yieldValue('A'));

    Scheduler.unstable_advanceTime(4999);
    expect(Scheduler).toHaveYielded([]);

    Scheduler.unstable_advanceTime(1);
    expect(Scheduler).toFlushExpired(['A']);
  });

  it('continues working on same task after yielding', () => {
    scheduleCallback(NormalPriority, () => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.unstable_yieldValue('A');
    });
    scheduleCallback(NormalPriority, () => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.unstable_yieldValue('B');
=======
    await waitFor(['B (did timeout: true)', 'C (did timeout: true)']);

    // Expire A
    Scheduler.unstable_advanceTime(4600);
    await waitFor(['A (did timeout: true)']);

    // Flush the rest without expiring
    await waitForAll(['D (did timeout: false)', 'E (did timeout: true)']);
  });

  it('has a default expiration of ~5 seconds', () => {
    scheduleCallback(NormalPriority, () => Scheduler.log('A'));

    Scheduler.unstable_advanceTime(4999);
    assertLog([]);

    Scheduler.unstable_advanceTime(1);
    Scheduler.unstable_flushExpired();
    assertLog(['A']);
  });

  it('continues working on same task after yielding', async () => {
    scheduleCallback(NormalPriority, () => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.log('A');
    });
    scheduleCallback(NormalPriority, () => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.log('B');
>>>>>>> remotes/upstream/main
    });

    let didYield = false;
    const tasks = [
      ['C1', 100],
      ['C2', 100],
      ['C3', 100],
    ];
    const C = () => {
      while (tasks.length > 0) {
        const [label, ms] = tasks.shift();
        Scheduler.unstable_advanceTime(ms);
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(label);
=======
        Scheduler.log(label);
>>>>>>> remotes/upstream/main
        if (shouldYield()) {
          didYield = true;
          return C;
        }
      }
    };

    scheduleCallback(NormalPriority, C);

    scheduleCallback(NormalPriority, () => {
      Scheduler.unstable_advanceTime(100);
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('D');
    });
    scheduleCallback(NormalPriority, () => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.unstable_yieldValue('E');
=======
      Scheduler.log('D');
    });
    scheduleCallback(NormalPriority, () => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.log('E');
>>>>>>> remotes/upstream/main
    });

    // Flush, then yield while in the middle of C.
    expect(didYield).toBe(false);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough(['A', 'B', 'C1']);
    expect(didYield).toBe(true);

    // When we resume, we should continue working on C.
    expect(Scheduler).toFlushAndYield(['C2', 'C3', 'D', 'E']);
  });

  it('continuation callbacks inherit the expiration of the previous callback', () => {
=======
    await waitFor(['A', 'B', 'C1']);
    expect(didYield).toBe(true);

    // When we resume, we should continue working on C.
    await waitForAll(['C2', 'C3', 'D', 'E']);
  });

  it('continuation callbacks inherit the expiration of the previous callback', async () => {
>>>>>>> remotes/upstream/main
    const tasks = [
      ['A', 125],
      ['B', 124],
      ['C', 100],
      ['D', 100],
    ];
    const work = () => {
      while (tasks.length > 0) {
        const [label, ms] = tasks.shift();
        Scheduler.unstable_advanceTime(ms);
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(label);
=======
        Scheduler.log(label);
>>>>>>> remotes/upstream/main
        if (shouldYield()) {
          return work;
        }
      }
    };

    // Schedule a high priority callback
    scheduleCallback(UserBlockingPriority, work);

    // Flush until just before the expiration time
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough(['A', 'B']);

    // Advance time by just a bit more. This should expire all the remaining work.
    Scheduler.unstable_advanceTime(1);
    expect(Scheduler).toFlushExpired(['C', 'D']);
  });

  it('continuations are interrupted by higher priority work', () => {
=======
    await waitFor(['A', 'B']);

    // Advance time by just a bit more. This should expire all the remaining work.
    Scheduler.unstable_advanceTime(1);
    Scheduler.unstable_flushExpired();
    assertLog(['C', 'D']);
  });

  it('continuations are interrupted by higher priority work', async () => {
>>>>>>> remotes/upstream/main
    const tasks = [
      ['A', 100],
      ['B', 100],
      ['C', 100],
      ['D', 100],
    ];
    const work = () => {
      while (tasks.length > 0) {
        const [label, ms] = tasks.shift();
        Scheduler.unstable_advanceTime(ms);
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(label);
=======
        Scheduler.log(label);
>>>>>>> remotes/upstream/main
        if (tasks.length > 0 && shouldYield()) {
          return work;
        }
      }
    };
    scheduleCallback(NormalPriority, work);
<<<<<<< HEAD
    expect(Scheduler).toFlushAndYieldThrough(['A']);

    scheduleCallback(UserBlockingPriority, () => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.unstable_yieldValue('High pri');
    });

    expect(Scheduler).toFlushAndYield(['High pri', 'B', 'C', 'D']);
=======
    await waitFor(['A']);

    scheduleCallback(UserBlockingPriority, () => {
      Scheduler.unstable_advanceTime(100);
      Scheduler.log('High pri');
    });

    await waitForAll(['High pri', 'B', 'C', 'D']);
>>>>>>> remotes/upstream/main
  });

  it(
    'continuations do not block higher priority work scheduled ' +
      'inside an executing callback',
<<<<<<< HEAD
    () => {
=======
    async () => {
>>>>>>> remotes/upstream/main
      const tasks = [
        ['A', 100],
        ['B', 100],
        ['C', 100],
        ['D', 100],
      ];
      const work = () => {
        while (tasks.length > 0) {
          const task = tasks.shift();
          const [label, ms] = task;
          Scheduler.unstable_advanceTime(ms);
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(label);
          if (label === 'B') {
            // Schedule high pri work from inside another callback
            Scheduler.unstable_yieldValue('Schedule high pri');
            scheduleCallback(UserBlockingPriority, () => {
              Scheduler.unstable_advanceTime(100);
              Scheduler.unstable_yieldValue('High pri');
=======
          Scheduler.log(label);
          if (label === 'B') {
            // Schedule high pri work from inside another callback
            Scheduler.log('Schedule high pri');
            scheduleCallback(UserBlockingPriority, () => {
              Scheduler.unstable_advanceTime(100);
              Scheduler.log('High pri');
>>>>>>> remotes/upstream/main
            });
          }
          if (tasks.length > 0) {
            // Return a continuation
            return work;
          }
        }
      };
      scheduleCallback(NormalPriority, work);
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll([
>>>>>>> remotes/upstream/main
        'A',
        'B',
        'Schedule high pri',
        // The high pri callback should fire before the continuation of the
        // lower pri work
        'High pri',
        // Continue low pri work
        'C',
        'D',
      ]);
    },
  );

<<<<<<< HEAD
  it('cancelling a continuation', () => {
    const task = scheduleCallback(NormalPriority, () => {
      Scheduler.unstable_yieldValue('Yield');
      return () => {
        Scheduler.unstable_yieldValue('Continuation');
      };
    });

    expect(Scheduler).toFlushAndYieldThrough(['Yield']);
    cancelCallback(task);
    expect(Scheduler).toFlushWithoutYielding();
  });

  it('top-level immediate callbacks fire in a subsequent task', () => {
    scheduleCallback(ImmediatePriority, () =>
      Scheduler.unstable_yieldValue('A'),
    );
    scheduleCallback(ImmediatePriority, () =>
      Scheduler.unstable_yieldValue('B'),
    );
    scheduleCallback(ImmediatePriority, () =>
      Scheduler.unstable_yieldValue('C'),
    );
    scheduleCallback(ImmediatePriority, () =>
      Scheduler.unstable_yieldValue('D'),
    );
    // Immediate callback hasn't fired, yet.
    expect(Scheduler).toHaveYielded([]);
    // They all flush immediately within the subsequent task.
    expect(Scheduler).toFlushExpired(['A', 'B', 'C', 'D']);
  });

  it('nested immediate callbacks are added to the queue of immediate callbacks', () => {
    scheduleCallback(ImmediatePriority, () =>
      Scheduler.unstable_yieldValue('A'),
    );
    scheduleCallback(ImmediatePriority, () => {
      Scheduler.unstable_yieldValue('B');
      // This callback should go to the end of the queue
      scheduleCallback(ImmediatePriority, () =>
        Scheduler.unstable_yieldValue('C'),
      );
    });
    scheduleCallback(ImmediatePriority, () =>
      Scheduler.unstable_yieldValue('D'),
    );
    expect(Scheduler).toHaveYielded([]);
    // C should flush at the end
    expect(Scheduler).toFlushExpired(['A', 'B', 'D', 'C']);
=======
  it('cancelling a continuation', async () => {
    const task = scheduleCallback(NormalPriority, () => {
      Scheduler.log('Yield');
      return () => {
        Scheduler.log('Continuation');
      };
    });

    await waitFor(['Yield']);
    cancelCallback(task);
    await waitForAll([]);
  });

  it('top-level immediate callbacks fire in a subsequent task', () => {
    scheduleCallback(ImmediatePriority, () => Scheduler.log('A'));
    scheduleCallback(ImmediatePriority, () => Scheduler.log('B'));
    scheduleCallback(ImmediatePriority, () => Scheduler.log('C'));
    scheduleCallback(ImmediatePriority, () => Scheduler.log('D'));
    // Immediate callback hasn't fired, yet.
    assertLog([]);
    // They all flush immediately within the subsequent task.
    Scheduler.unstable_flushExpired();
    assertLog(['A', 'B', 'C', 'D']);
  });

  it('nested immediate callbacks are added to the queue of immediate callbacks', () => {
    scheduleCallback(ImmediatePriority, () => Scheduler.log('A'));
    scheduleCallback(ImmediatePriority, () => {
      Scheduler.log('B');
      // This callback should go to the end of the queue
      scheduleCallback(ImmediatePriority, () => Scheduler.log('C'));
    });
    scheduleCallback(ImmediatePriority, () => Scheduler.log('D'));
    assertLog([]);
    // C should flush at the end
    Scheduler.unstable_flushExpired();
    assertLog(['A', 'B', 'D', 'C']);
>>>>>>> remotes/upstream/main
  });

  it('wrapped callbacks have same signature as original callback', () => {
    const wrappedCallback = wrapCallback((...args) => ({args}));
    expect(wrappedCallback('a', 'b')).toEqual({args: ['a', 'b']});
  });

  it('wrapped callbacks inherit the current priority', () => {
    const wrappedCallback = runWithPriority(NormalPriority, () =>
      wrapCallback(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(getCurrentPriorityLevel());
=======
        Scheduler.log(getCurrentPriorityLevel());
>>>>>>> remotes/upstream/main
      }),
    );

    const wrappedUserBlockingCallback = runWithPriority(
      UserBlockingPriority,
      () =>
        wrapCallback(() => {
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(getCurrentPriorityLevel());
=======
          Scheduler.log(getCurrentPriorityLevel());
>>>>>>> remotes/upstream/main
        }),
    );

    wrappedCallback();
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([NormalPriority]);

    wrappedUserBlockingCallback();
    expect(Scheduler).toHaveYielded([UserBlockingPriority]);
=======
    assertLog([NormalPriority]);

    wrappedUserBlockingCallback();
    assertLog([UserBlockingPriority]);
>>>>>>> remotes/upstream/main
  });

  it('wrapped callbacks inherit the current priority even when nested', () => {
    let wrappedCallback;
    let wrappedUserBlockingCallback;

    runWithPriority(NormalPriority, () => {
      wrappedCallback = wrapCallback(() => {
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(getCurrentPriorityLevel());
      });
      wrappedUserBlockingCallback = runWithPriority(UserBlockingPriority, () =>
        wrapCallback(() => {
          Scheduler.unstable_yieldValue(getCurrentPriorityLevel());
=======
        Scheduler.log(getCurrentPriorityLevel());
      });
      wrappedUserBlockingCallback = runWithPriority(UserBlockingPriority, () =>
        wrapCallback(() => {
          Scheduler.log(getCurrentPriorityLevel());
>>>>>>> remotes/upstream/main
        }),
      );
    });

    wrappedCallback();
<<<<<<< HEAD
    expect(Scheduler).toHaveYielded([NormalPriority]);

    wrappedUserBlockingCallback();
    expect(Scheduler).toHaveYielded([UserBlockingPriority]);
=======
    assertLog([NormalPriority]);

    wrappedUserBlockingCallback();
    assertLog([UserBlockingPriority]);
>>>>>>> remotes/upstream/main
  });

  it("immediate callbacks fire even if there's an error", () => {
    scheduleCallback(ImmediatePriority, () => {
<<<<<<< HEAD
      Scheduler.unstable_yieldValue('A');
      throw new Error('Oops A');
    });
    scheduleCallback(ImmediatePriority, () => {
      Scheduler.unstable_yieldValue('B');
    });
    scheduleCallback(ImmediatePriority, () => {
      Scheduler.unstable_yieldValue('C');
      throw new Error('Oops C');
    });

    expect(() => expect(Scheduler).toFlushExpired()).toThrow('Oops A');
    expect(Scheduler).toHaveYielded(['A']);

    // B and C flush in a subsequent event. That way, the second error is not
    // swallowed.
    expect(() => expect(Scheduler).toFlushExpired()).toThrow('Oops C');
    expect(Scheduler).toHaveYielded(['B', 'C']);
=======
      Scheduler.log('A');
      throw new Error('Oops A');
    });
    scheduleCallback(ImmediatePriority, () => {
      Scheduler.log('B');
    });
    scheduleCallback(ImmediatePriority, () => {
      Scheduler.log('C');
      throw new Error('Oops C');
    });

    expect(() => Scheduler.unstable_flushExpired()).toThrow('Oops A');
    assertLog(['A']);

    // B and C flush in a subsequent event. That way, the second error is not
    // swallowed.
    expect(() => Scheduler.unstable_flushExpired()).toThrow('Oops C');
    assertLog(['B', 'C']);
>>>>>>> remotes/upstream/main
  });

  it('multiple immediate callbacks can throw and there will be an error for each one', () => {
    scheduleCallback(ImmediatePriority, () => {
      throw new Error('First error');
    });
    scheduleCallback(ImmediatePriority, () => {
      throw new Error('Second error');
    });
    expect(() => Scheduler.unstable_flushAll()).toThrow('First error');
    // The next error is thrown in the subsequent event
    expect(() => Scheduler.unstable_flushAll()).toThrow('Second error');
  });

  it('exposes the current priority level', () => {
<<<<<<< HEAD
    Scheduler.unstable_yieldValue(getCurrentPriorityLevel());
    runWithPriority(ImmediatePriority, () => {
      Scheduler.unstable_yieldValue(getCurrentPriorityLevel());
      runWithPriority(NormalPriority, () => {
        Scheduler.unstable_yieldValue(getCurrentPriorityLevel());
        runWithPriority(UserBlockingPriority, () => {
          Scheduler.unstable_yieldValue(getCurrentPriorityLevel());
        });
      });
      Scheduler.unstable_yieldValue(getCurrentPriorityLevel());
    });

    expect(Scheduler).toHaveYielded([
=======
    Scheduler.log(getCurrentPriorityLevel());
    runWithPriority(ImmediatePriority, () => {
      Scheduler.log(getCurrentPriorityLevel());
      runWithPriority(NormalPriority, () => {
        Scheduler.log(getCurrentPriorityLevel());
        runWithPriority(UserBlockingPriority, () => {
          Scheduler.log(getCurrentPriorityLevel());
        });
      });
      Scheduler.log(getCurrentPriorityLevel());
    });

    assertLog([
>>>>>>> remotes/upstream/main
      NormalPriority,
      ImmediatePriority,
      NormalPriority,
      UserBlockingPriority,
      ImmediatePriority,
    ]);
  });

  if (__DEV__) {
    // Function names are minified in prod, though you could still infer the
    // priority if you have sourcemaps.
    // TODO: Feature temporarily disabled while we investigate a bug in one of
    // our minifiers.
<<<<<<< HEAD
    it.skip('adds extra function to the JS stack whose name includes the priority level', () => {
=======
    it.skip('adds extra function to the JS stack whose name includes the priority level', async () => {
>>>>>>> remotes/upstream/main
      function inferPriorityFromCallstack() {
        try {
          throw Error();
        } catch (e) {
          const stack = e.stack;
          const lines = stack.split('\n');
          for (let i = lines.length - 1; i >= 0; i--) {
            const line = lines[i];
            const found = line.match(
              /scheduler_flushTaskAtPriority_([A-Za-z]+)/,
            );
            if (found !== null) {
              const priorityStr = found[1];
              switch (priorityStr) {
                case 'Immediate':
                  return ImmediatePriority;
                case 'UserBlocking':
                  return UserBlockingPriority;
                case 'Normal':
                  return NormalPriority;
                case 'Low':
                  return LowPriority;
                case 'Idle':
                  return IdlePriority;
              }
            }
          }
          return null;
        }
      }

      scheduleCallback(ImmediatePriority, () =>
<<<<<<< HEAD
        Scheduler.unstable_yieldValue(
          'Immediate: ' + inferPriorityFromCallstack(),
        ),
      );
      scheduleCallback(UserBlockingPriority, () =>
        Scheduler.unstable_yieldValue(
          'UserBlocking: ' + inferPriorityFromCallstack(),
        ),
      );
      scheduleCallback(NormalPriority, () =>
        Scheduler.unstable_yieldValue(
          'Normal: ' + inferPriorityFromCallstack(),
        ),
      );
      scheduleCallback(LowPriority, () =>
        Scheduler.unstable_yieldValue('Low: ' + inferPriorityFromCallstack()),
      );
      scheduleCallback(IdlePriority, () =>
        Scheduler.unstable_yieldValue('Idle: ' + inferPriorityFromCallstack()),
      );

      expect(Scheduler).toFlushAndYield([
=======
        Scheduler.log('Immediate: ' + inferPriorityFromCallstack()),
      );
      scheduleCallback(UserBlockingPriority, () =>
        Scheduler.log('UserBlocking: ' + inferPriorityFromCallstack()),
      );
      scheduleCallback(NormalPriority, () =>
        Scheduler.log('Normal: ' + inferPriorityFromCallstack()),
      );
      scheduleCallback(LowPriority, () =>
        Scheduler.log('Low: ' + inferPriorityFromCallstack()),
      );
      scheduleCallback(IdlePriority, () =>
        Scheduler.log('Idle: ' + inferPriorityFromCallstack()),
      );

      await waitForAll([
>>>>>>> remotes/upstream/main
        'Immediate: ' + ImmediatePriority,
        'UserBlocking: ' + UserBlockingPriority,
        'Normal: ' + NormalPriority,
        'Low: ' + LowPriority,
        'Idle: ' + IdlePriority,
      ]);
    });
  }

  describe('delayed tasks', () => {
<<<<<<< HEAD
    it('schedules a delayed task', () => {
      scheduleCallback(
        NormalPriority,
        () => Scheduler.unstable_yieldValue('A'),
        {
          delay: 1000,
        },
      );

      // Should flush nothing, because delay hasn't elapsed
      expect(Scheduler).toFlushAndYield([]);
=======
    it('schedules a delayed task', async () => {
      scheduleCallback(NormalPriority, () => Scheduler.log('A'), {
        delay: 1000,
      });

      // Should flush nothing, because delay hasn't elapsed
      await waitForAll([]);
>>>>>>> remotes/upstream/main

      // Advance time until right before the threshold
      Scheduler.unstable_advanceTime(999);
      // Still nothing
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([]);
=======
      await waitForAll([]);
>>>>>>> remotes/upstream/main

      // Advance time past the threshold
      Scheduler.unstable_advanceTime(1);

      // Now it should flush like normal
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['A']);
    });

    it('schedules multiple delayed tasks', () => {
      scheduleCallback(
        NormalPriority,
        () => Scheduler.unstable_yieldValue('C'),
        {
          delay: 300,
        },
      );

      scheduleCallback(
        NormalPriority,
        () => Scheduler.unstable_yieldValue('B'),
        {
          delay: 200,
        },
      );

      scheduleCallback(
        NormalPriority,
        () => Scheduler.unstable_yieldValue('D'),
        {
          delay: 400,
        },
      );

      scheduleCallback(
        NormalPriority,
        () => Scheduler.unstable_yieldValue('A'),
        {
          delay: 100,
        },
      );

      // Should flush nothing, because delay hasn't elapsed
      expect(Scheduler).toFlushAndYield([]);
=======
      await waitForAll(['A']);
    });

    it('schedules multiple delayed tasks', async () => {
      scheduleCallback(NormalPriority, () => Scheduler.log('C'), {
        delay: 300,
      });

      scheduleCallback(NormalPriority, () => Scheduler.log('B'), {
        delay: 200,
      });

      scheduleCallback(NormalPriority, () => Scheduler.log('D'), {
        delay: 400,
      });

      scheduleCallback(NormalPriority, () => Scheduler.log('A'), {
        delay: 100,
      });

      // Should flush nothing, because delay hasn't elapsed
      await waitForAll([]);
>>>>>>> remotes/upstream/main

      // Advance some time.
      Scheduler.unstable_advanceTime(200);
      // Both A and B are no longer delayed. They can now flush incrementally.
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYieldThrough(['A']);
      expect(Scheduler).toFlushAndYield(['B']);

      // Advance the rest
      Scheduler.unstable_advanceTime(200);
      expect(Scheduler).toFlushAndYield(['C', 'D']);
    });

    it('interleaves normal tasks and delayed tasks', () => {
      // Schedule some high priority callbacks with a delay. When their delay
      // elapses, they will be the most important callback in the queue.
      scheduleCallback(
        UserBlockingPriority,
        () => Scheduler.unstable_yieldValue('Timer 2'),
        {delay: 300},
      );
      scheduleCallback(
        UserBlockingPriority,
        () => Scheduler.unstable_yieldValue('Timer 1'),
        {delay: 100},
      );

      // Schedule some tasks at default priority.
      scheduleCallback(NormalPriority, () => {
        Scheduler.unstable_yieldValue('A');
        Scheduler.unstable_advanceTime(100);
      });
      scheduleCallback(NormalPriority, () => {
        Scheduler.unstable_yieldValue('B');
        Scheduler.unstable_advanceTime(100);
      });
      scheduleCallback(NormalPriority, () => {
        Scheduler.unstable_yieldValue('C');
        Scheduler.unstable_advanceTime(100);
      });
      scheduleCallback(NormalPriority, () => {
        Scheduler.unstable_yieldValue('D');
=======
      await waitFor(['A']);
      await waitForAll(['B']);

      // Advance the rest
      Scheduler.unstable_advanceTime(200);
      await waitForAll(['C', 'D']);
    });

    it('interleaves normal tasks and delayed tasks', async () => {
      // Schedule some high priority callbacks with a delay. When their delay
      // elapses, they will be the most important callback in the queue.
      scheduleCallback(UserBlockingPriority, () => Scheduler.log('Timer 2'), {
        delay: 300,
      });
      scheduleCallback(UserBlockingPriority, () => Scheduler.log('Timer 1'), {
        delay: 100,
      });

      // Schedule some tasks at default priority.
      scheduleCallback(NormalPriority, () => {
        Scheduler.log('A');
        Scheduler.unstable_advanceTime(100);
      });
      scheduleCallback(NormalPriority, () => {
        Scheduler.log('B');
        Scheduler.unstable_advanceTime(100);
      });
      scheduleCallback(NormalPriority, () => {
        Scheduler.log('C');
        Scheduler.unstable_advanceTime(100);
      });
      scheduleCallback(NormalPriority, () => {
        Scheduler.log('D');
>>>>>>> remotes/upstream/main
        Scheduler.unstable_advanceTime(100);
      });

      // Flush all the work. The timers should be interleaved with the
      // other tasks.
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
        'A',
        'Timer 1',
        'B',
        'C',
        'Timer 2',
        'D',
      ]);
    });

    it('interleaves delayed tasks with time-sliced tasks', () => {
      // Schedule some high priority callbacks with a delay. When their delay
      // elapses, they will be the most important callback in the queue.
      scheduleCallback(
        UserBlockingPriority,
        () => Scheduler.unstable_yieldValue('Timer 2'),
        {delay: 300},
      );
      scheduleCallback(
        UserBlockingPriority,
        () => Scheduler.unstable_yieldValue('Timer 1'),
        {delay: 100},
      );
=======
      await waitForAll(['A', 'Timer 1', 'B', 'C', 'Timer 2', 'D']);
    });

    it('interleaves delayed tasks with time-sliced tasks', async () => {
      // Schedule some high priority callbacks with a delay. When their delay
      // elapses, they will be the most important callback in the queue.
      scheduleCallback(UserBlockingPriority, () => Scheduler.log('Timer 2'), {
        delay: 300,
      });
      scheduleCallback(UserBlockingPriority, () => Scheduler.log('Timer 1'), {
        delay: 100,
      });
>>>>>>> remotes/upstream/main

      // Schedule a time-sliced task at default priority.
      const tasks = [
        ['A', 100],
        ['B', 100],
        ['C', 100],
        ['D', 100],
      ];
      const work = () => {
        while (tasks.length > 0) {
          const task = tasks.shift();
          const [label, ms] = task;
          Scheduler.unstable_advanceTime(ms);
<<<<<<< HEAD
          Scheduler.unstable_yieldValue(label);
=======
          Scheduler.log(label);
>>>>>>> remotes/upstream/main
          if (tasks.length > 0) {
            return work;
          }
        }
      };
      scheduleCallback(NormalPriority, work);

      // Flush all the work. The timers should be interleaved with the
      // other tasks.
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([
        'A',
        'Timer 1',
        'B',
        'C',
        'Timer 2',
        'D',
      ]);
    });

    it('cancels a delayed task', () => {
      // Schedule several tasks with the same delay
      const options = {delay: 100};

      scheduleCallback(
        NormalPriority,
        () => Scheduler.unstable_yieldValue('A'),
        options,
      );
      const taskB = scheduleCallback(
        NormalPriority,
        () => Scheduler.unstable_yieldValue('B'),
=======
      await waitForAll(['A', 'Timer 1', 'B', 'C', 'Timer 2', 'D']);
    });

    it('cancels a delayed task', async () => {
      // Schedule several tasks with the same delay
      const options = {delay: 100};

      scheduleCallback(NormalPriority, () => Scheduler.log('A'), options);
      const taskB = scheduleCallback(
        NormalPriority,
        () => Scheduler.log('B'),
>>>>>>> remotes/upstream/main
        options,
      );
      const taskC = scheduleCallback(
        NormalPriority,
<<<<<<< HEAD
        () => Scheduler.unstable_yieldValue('C'),
=======
        () => Scheduler.log('C'),
>>>>>>> remotes/upstream/main
        options,
      );

      // Cancel B before its delay has elapsed
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield([]);
=======
      await waitForAll([]);
>>>>>>> remotes/upstream/main
      cancelCallback(taskB);

      // Cancel C after its delay has elapsed
      Scheduler.unstable_advanceTime(500);
      cancelCallback(taskC);

      // Only A should flush
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['A']);
    });

    it('gracefully handles scheduled tasks that are not a function', () => {
      scheduleCallback(ImmediatePriority, null);
      expect(Scheduler).toFlushWithoutYielding();

      scheduleCallback(ImmediatePriority, undefined);
      expect(Scheduler).toFlushWithoutYielding();

      scheduleCallback(ImmediatePriority, {});
      expect(Scheduler).toFlushWithoutYielding();

      scheduleCallback(ImmediatePriority, 42);
      expect(Scheduler).toFlushWithoutYielding();
    });

    it('toFlushUntilNextPaint stops if a continuation is returned', () => {
      scheduleCallback(NormalPriority, () => {
        Scheduler.unstable_yieldValue('Original Task');
        Scheduler.unstable_yieldValue('shouldYield: ' + shouldYield());
        Scheduler.unstable_yieldValue('Return a continuation');
        return () => {
          Scheduler.unstable_yieldValue('Continuation Task');
        };
      });

      expect(Scheduler).toFlushUntilNextPaint([
=======
      await waitForAll(['A']);
    });

    it('gracefully handles scheduled tasks that are not a function', async () => {
      scheduleCallback(ImmediatePriority, null);
      await waitForAll([]);

      scheduleCallback(ImmediatePriority, undefined);
      await waitForAll([]);

      scheduleCallback(ImmediatePriority, {});
      await waitForAll([]);

      scheduleCallback(ImmediatePriority, 42);
      await waitForAll([]);
    });

    it('toFlushUntilNextPaint stops if a continuation is returned', async () => {
      scheduleCallback(NormalPriority, () => {
        Scheduler.log('Original Task');
        Scheduler.log('shouldYield: ' + shouldYield());
        Scheduler.log('Return a continuation');
        return () => {
          Scheduler.log('Continuation Task');
        };
      });

      await waitForPaint([
>>>>>>> remotes/upstream/main
        'Original Task',
        // Immediately before returning a continuation, `shouldYield` returns
        // false, which means there must be time remaining in the frame.
        'shouldYield: false',
        'Return a continuation',

        // The continuation should not flush yet.
      ]);

      // No time has elapsed
      expect(Scheduler.unstable_now()).toBe(0);

      // Continue the task
<<<<<<< HEAD
      expect(Scheduler).toFlushAndYield(['Continuation Task']);
    });

    it("toFlushAndYield keeps flushing even if there's a continuation", () => {
      scheduleCallback(NormalPriority, () => {
        Scheduler.unstable_yieldValue('Original Task');
        Scheduler.unstable_yieldValue('shouldYield: ' + shouldYield());
        Scheduler.unstable_yieldValue('Return a continuation');
        return () => {
          Scheduler.unstable_yieldValue('Continuation Task');
        };
      });

      expect(Scheduler).toFlushAndYield([
=======
      await waitForAll(['Continuation Task']);
    });

    it("toFlushAndYield keeps flushing even if there's a continuation", async () => {
      scheduleCallback(NormalPriority, () => {
        Scheduler.log('Original Task');
        Scheduler.log('shouldYield: ' + shouldYield());
        Scheduler.log('Return a continuation');
        return () => {
          Scheduler.log('Continuation Task');
        };
      });

      await waitForAll([
>>>>>>> remotes/upstream/main
        'Original Task',
        // Immediately before returning a continuation, `shouldYield` returns
        // false, which means there must be time remaining in the frame.
        'shouldYield: false',
        'Return a continuation',

        // The continuation should flush immediately, even though the task
        // yielded a continuation.
        'Continuation Task',
      ]);
    });
  });
});
