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
 * @flow
 */

import * as React from 'react';
import {isInternalFacebookBuild} from 'react-devtools-feature-flags';
<<<<<<< HEAD
import {REACT_DEVTOOLS_WORKPLACE_URL} from 'react-devtools-shared/src/constants';
=======
import {REACT_DEVTOOLS_WORKPLACE_URL} from 'react-devtools-shared/src/devtools/constants';
>>>>>>> remotes/upstream/main
import Icon from '../Icon';
import styles from './shared.css';

export default function WorkplaceGroup(): React.Node {
  if (!isInternalFacebookBuild) {
    return null;
  }

  return (
    <div className={styles.WorkplaceGroupRow}>
      <Icon className={styles.ReportIcon} type="facebook" />
      <a
        className={styles.ReportLink}
        href={REACT_DEVTOOLS_WORKPLACE_URL}
        rel="noopener noreferrer"
        target="_blank"
        title="Report bug">
        Report this on Workplace
      </a>
      <div className={styles.FacebookOnly}>(Facebook employees only.)</div>
    </div>
  );
}
