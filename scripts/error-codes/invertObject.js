/**
<<<<<<< HEAD
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
'use strict';

/*:: import type { ErrorMap } from './Types' */

=======
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

>>>>>>> remotes/upstream/main
/**
 * turns
 *   { 'MUCH ERROR': '0', 'SUCH WRONG': '1' }
 * into
 *   { 0: 'MUCH ERROR', 1: 'SUCH WRONG' }
 */
<<<<<<< HEAD
function invertObject(targetObj /* : ErrorMap */) /* : ErrorMap */ {
  const result = {};
=======
function invertObject(targetObj) {
  const result /*: {[string]: string} */ = {};
>>>>>>> remotes/upstream/main
  const mapKeys = Object.keys(targetObj);

  // eslint-disable-next-line no-for-of-loops/no-for-of-loops
  for (const originalKey of mapKeys) {
    const originalVal = targetObj[originalKey];

    result[originalVal] = originalKey;
  }

  return result;
}

module.exports = invertObject;
