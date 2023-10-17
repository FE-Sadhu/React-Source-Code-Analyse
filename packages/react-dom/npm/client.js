'use strict';

var m = require('react-dom');
if (process.env.NODE_ENV === 'production') {
  exports.createRoot = m.createRoot;
  exports.hydrateRoot = m.hydrateRoot;
} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
<<<<<<< HEAD
  exports.createRoot = function(c, o) {
=======
  exports.createRoot = function (c, o) {
>>>>>>> remotes/upstream/main
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
<<<<<<< HEAD
  exports.hydrateRoot = function(c, h, o) {
=======
  exports.hydrateRoot = function (c, h, o) {
>>>>>>> remotes/upstream/main
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}
