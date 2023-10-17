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

import type {CommitTree} from './types';
<<<<<<< HEAD
import type {SerializedElement} from '../Components/types';
=======
import type {SerializedElement} from 'react-devtools-shared/src/frontend/types';
>>>>>>> remotes/upstream/main

import * as React from 'react';
import {useContext} from 'react';
import {ProfilerContext} from './ProfilerContext';
import styles from './Updaters.css';
<<<<<<< HEAD
import {ElementTypeRoot} from '../../../types';
=======
import {ElementTypeRoot} from '../../../frontend/types';
>>>>>>> remotes/upstream/main

export type Props = {
  commitTree: CommitTree,
  updaters: Array<SerializedElement>,
};

export default function Updaters({commitTree, updaters}: Props): React.Node {
  const {selectFiber} = useContext(ProfilerContext);

  const children =
    updaters.length > 0 ? (
<<<<<<< HEAD
      updaters.map<React$Node>((serializedElement: SerializedElement) => {
=======
      updaters.map((serializedElement: SerializedElement): React$Node => {
>>>>>>> remotes/upstream/main
        const {displayName, id, key, type} = serializedElement;
        const isVisibleInTree =
          commitTree.nodes.has(id) && type !== ElementTypeRoot;
        if (isVisibleInTree) {
          return (
            <button
              key={id}
              className={styles.Updater}
              onClick={() => selectFiber(id, displayName)}>
              {displayName} {key ? `key="${key}"` : ''}
            </button>
          );
        } else {
          return (
            <div key={id} className={styles.UnmountedUpdater}>
              {displayName} {key ? `key="${key}"` : ''}
            </div>
          );
        }
      })
    ) : (
      <div key="none" className={styles.NoUpdaters}>
        (unknown)
      </div>
    );

  return <div className={styles.Updaters}>{children}</div>;
}
