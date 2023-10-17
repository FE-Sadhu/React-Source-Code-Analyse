/**
<<<<<<< HEAD
 * Copyright (c) Facebook, Inc. and its affiliates.
=======
 * Copyright (c) Meta Platforms, Inc. and affiliates.
>>>>>>> remotes/upstream/main
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const helperModuleImports = require('@babel/helper-module-imports');

module.exports = function autoImporter(babel) {
  function getAssignIdent(path, file, state) {
    if (state.id) {
      return state.id;
    }
    state.id = helperModuleImports.addDefault(path, 'shared/assign', {
      nameHint: 'assign',
    });
    return state.id;
  }

  return {
<<<<<<< HEAD
    pre: function() {
=======
    pre: function () {
>>>>>>> remotes/upstream/main
      // map from module to generated identifier
      this.id = null;
    },

    visitor: {
<<<<<<< HEAD
      CallExpression: function(path, file) {
=======
      CallExpression: function (path, file) {
>>>>>>> remotes/upstream/main
        if (/shared(\/|\\)assign/.test(file.filename)) {
          // Don't replace Object.assign if we're transforming shared/assign
          return;
        }
        if (path.get('callee').matchesPattern('Object.assign')) {
          // generate identifier and require if it hasn't been already
          const id = getAssignIdent(path, file, this);
          path.node.callee = id;
        }
      },

<<<<<<< HEAD
      MemberExpression: function(path, file) {
=======
      MemberExpression: function (path, file) {
>>>>>>> remotes/upstream/main
        if (/shared(\/|\\)assign/.test(file.filename)) {
          // Don't replace Object.assign if we're transforming shared/assign
          return;
        }
        if (path.matchesPattern('Object.assign')) {
          const id = getAssignIdent(path, file, this);
          path.replaceWith(id);
        }
      },
    },
  };
};
