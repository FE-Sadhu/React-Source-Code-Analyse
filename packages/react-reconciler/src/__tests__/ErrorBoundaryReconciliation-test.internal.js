describe('ErrorBoundaryReconciliation', () => {
  let BrokenRender;
  let DidCatchErrorBoundary;
  let GetDerivedErrorBoundary;
  let React;
  let ReactFeatureFlags;
  let ReactTestRenderer;
<<<<<<< HEAD
  let Scheduler;
  let span;
=======
  let span;
  let act;
>>>>>>> remotes/upstream/main

  beforeEach(() => {
    jest.resetModules();

    ReactFeatureFlags = require('shared/ReactFeatureFlags');

    ReactFeatureFlags.replayFailedUnitOfWorkWithInvokeGuardedCallback = false;
    ReactTestRenderer = require('react-test-renderer');
    React = require('react');
<<<<<<< HEAD
    Scheduler = require('scheduler');

=======
    act = require('internal-test-utils').act;
>>>>>>> remotes/upstream/main
    DidCatchErrorBoundary = class extends React.Component {
      state = {error: null};
      componentDidCatch(error) {
        this.setState({error});
      }
      render() {
        return this.state.error
          ? React.createElement(this.props.fallbackTagName, {
              prop: 'ErrorBoundary',
            })
          : this.props.children;
      }
    };

    GetDerivedErrorBoundary = class extends React.Component {
      state = {error: null};
      static getDerivedStateFromError(error) {
        return {error};
      }
      render() {
        return this.state.error
          ? React.createElement(this.props.fallbackTagName, {
              prop: 'ErrorBoundary',
            })
          : this.props.children;
      }
    };

    const InvalidType = undefined;
    BrokenRender = ({fail}) =>
      fail ? <InvalidType /> : <span prop="BrokenRender" />;
  });

  [true, false].forEach(isConcurrent => {
<<<<<<< HEAD
    function sharedTest(ErrorBoundary, fallbackTagName) {
      const renderer = ReactTestRenderer.create(
        <ErrorBoundary fallbackTagName={fallbackTagName}>
          <BrokenRender fail={false} />
        </ErrorBoundary>,
        {unstable_isConcurrent: isConcurrent},
      );
      Scheduler.unstable_flushAll();
      expect(renderer).toMatchRenderedOutput(<span prop="BrokenRender" />);

      expect(() => {
        renderer.update(
          <ErrorBoundary fallbackTagName={fallbackTagName}>
            <BrokenRender fail={true} />
          </ErrorBoundary>,
        );
        Scheduler.unstable_flushAll();
=======
    async function sharedTest(ErrorBoundary, fallbackTagName) {
      let renderer;

      await act(() => {
        renderer = ReactTestRenderer.create(
          <ErrorBoundary fallbackTagName={fallbackTagName}>
            <BrokenRender fail={false} />
          </ErrorBoundary>,
          {unstable_isConcurrent: isConcurrent},
        );
      });
      expect(renderer).toMatchRenderedOutput(<span prop="BrokenRender" />);

      await expect(async () => {
        await act(() => {
          renderer.update(
            <ErrorBoundary fallbackTagName={fallbackTagName}>
              <BrokenRender fail={true} />
            </ErrorBoundary>,
          );
        });
>>>>>>> remotes/upstream/main
      }).toErrorDev(isConcurrent ? ['invalid', 'invalid'] : ['invalid']);
      const Fallback = fallbackTagName;
      expect(renderer).toMatchRenderedOutput(<Fallback prop="ErrorBoundary" />);
    }

    describe(isConcurrent ? 'concurrent' : 'sync', () => {
      it('componentDidCatch can recover by rendering an element of the same type', () =>
        sharedTest(DidCatchErrorBoundary, 'span'));

      it('componentDidCatch can recover by rendering an element of a different type', () =>
        sharedTest(DidCatchErrorBoundary, 'div'));

      it('getDerivedStateFromError can recover by rendering an element of the same type', () =>
        sharedTest(GetDerivedErrorBoundary, 'span'));

      it('getDerivedStateFromError can recover by rendering an element of a different type', () =>
        sharedTest(GetDerivedErrorBoundary, 'div'));
    });
  });
});
