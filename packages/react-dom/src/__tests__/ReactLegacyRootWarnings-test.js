let ReactDOM = require('react-dom');

describe('ReactDOMRoot', () => {
  let container;

  beforeEach(() => {
    jest.resetModules();
    container = document.createElement('div');
    ReactDOM = require('react-dom');
  });

<<<<<<< HEAD
=======
  afterEach(() => {
    jest.restoreAllMocks();
  });

>>>>>>> remotes/upstream/main
  test('deprecation warning for ReactDOM.render', () => {
    spyOnDev(console, 'error');

    ReactDOM.render('Hi', container);
    expect(container.textContent).toEqual('Hi');
    if (__DEV__) {
      expect(console.error).toHaveBeenCalledTimes(1);
<<<<<<< HEAD
      expect(console.error.calls.argsFor(0)[0]).toContain(
=======
      expect(console.error.mock.calls[0][0]).toContain(
>>>>>>> remotes/upstream/main
        'ReactDOM.render is no longer supported',
      );
    }
  });

  test('deprecation warning for ReactDOM.hydrate', () => {
    spyOnDev(console, 'error');

    container.innerHTML = 'Hi';
    ReactDOM.hydrate('Hi', container);
    expect(container.textContent).toEqual('Hi');
    if (__DEV__) {
      expect(console.error).toHaveBeenCalledTimes(1);
<<<<<<< HEAD
      expect(console.error.calls.argsFor(0)[0]).toContain(
=======
      expect(console.error.mock.calls[0][0]).toContain(
>>>>>>> remotes/upstream/main
        'ReactDOM.hydrate is no longer supported',
      );
    }
  });
});
