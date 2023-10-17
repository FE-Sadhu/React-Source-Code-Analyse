'use strict';

<<<<<<< HEAD
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react-dom-static.node.production.min.js');
} else {
  module.exports = require('./cjs/react-dom-static.node.development.js');
}
=======
var s;
if (process.env.NODE_ENV === 'production') {
  s = require('./cjs/react-dom-server.node.production.min.js');
} else {
  s = require('./cjs/react-dom-server.node.development.js');
}

exports.version = s.version;
exports.prerenderToNodeStream = s.prerenderToNodeStream;
>>>>>>> remotes/upstream/main
