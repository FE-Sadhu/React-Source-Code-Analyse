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

const rule = require('../no-to-warn-dev-within-to-throw');
const {RuleTester} = require('eslint');
const ruleTester = new RuleTester();

ruleTester.run('eslint-rules/no-to-warn-dev-within-to-throw', rule, {
  valid: [
    'expect(callback).toWarnDev("warning");',
    'expect(function() { expect(callback).toThrow("error") }).toWarnDev("warning");',
  ],
  invalid: [
    {
<<<<<<< HEAD
      code:
        'expect(function() { expect(callback).toWarnDev("warning") }).toThrow("error");',
=======
      code: 'expect(function() { expect(callback).toWarnDev("warning") }).toThrow("error");',
>>>>>>> remotes/upstream/main
      errors: [
        {
          message: 'toWarnDev() matcher should not be nested',
        },
      ],
    },
  ],
});
