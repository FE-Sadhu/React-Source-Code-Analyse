/** @flow */

import * as React from 'react';
import {Fragment} from 'react';
import {createPortal} from 'react-dom';

export default function Iframe(): React.Node {
  return (
    <Fragment>
      <h2>Iframe</h2>
      <div>
        <Frame>
          <Greeting />
        </Frame>
      </div>
    </Fragment>
  );
}

const iframeStyle = {border: '2px solid #eee', height: 80};

<<<<<<< HEAD
=======
// $FlowFixMe[missing-local-annot]
>>>>>>> remotes/upstream/main
function Frame(props) {
  const [element, setElement] = React.useState(null);

  const ref = React.useRef();

<<<<<<< HEAD
  React.useLayoutEffect(function() {
=======
  React.useLayoutEffect(function () {
>>>>>>> remotes/upstream/main
    const iframe = ref.current;

    if (iframe) {
      const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <div id="root"></div>
    </body>
    </html>
    `;

      const document = iframe.contentDocument;

      document.open();
      document.write(html);
      document.close();

      setElement(document.getElementById('root'));
    }
  }, []);

  return (
    <Fragment>
      <iframe title="Test Iframe" ref={ref} style={iframeStyle} />
      <iframe
        title="Secured Iframe"
        src="https://example.com"
        style={iframeStyle}
      />

      {element ? createPortal(props.children, element) : null}
    </Fragment>
  );
}

function Greeting() {
  return (
    <p>
      Hello from within an <code>&lt;iframe&gt;</code>!
    </p>
  );
}
