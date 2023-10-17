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
import {Fragment} from 'react';
import styles from './Badge.css';

<<<<<<< HEAD
import type {ElementType} from 'react-devtools-shared/src/types';
=======
import type {ElementType} from 'react-devtools-shared/src/frontend/types';
>>>>>>> remotes/upstream/main

type Props = {
  className?: string,
  hocDisplayNames: Array<string> | null,
  type: ElementType,
  children: React$Node,
};

export default function Badge({
  className,
  hocDisplayNames,
  type,
  children,
}: Props): React.Node {
  if (hocDisplayNames === null || hocDisplayNames.length === 0) {
    return null;
  }

  const totalBadgeCount = hocDisplayNames.length;

  return (
    <Fragment>
      <div className={`${styles.Badge} ${className || ''}`}>{children}</div>
      {totalBadgeCount > 1 && (
        <div className={styles.ExtraLabel}>+{totalBadgeCount - 1}</div>
      )}
    </Fragment>
  );
}
