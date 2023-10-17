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

<<<<<<< HEAD
=======
import type {ReactContext} from 'shared/ReactTypes';

>>>>>>> remotes/upstream/main
import * as React from 'react';
import {createContext, useCallback, useContext, useEffect} from 'react';
import {createResource} from '../../cache';
import {BridgeContext, StoreContext} from '../context';
import {TreeStateContext} from './TreeContext';
import {separateDisplayNameAndHOCs} from 'react-devtools-shared/src/utils';

import type {OwnersList} from 'react-devtools-shared/src/backend/types';
import type {
  Element,
  SerializedElement,
<<<<<<< HEAD
} from 'react-devtools-shared/src/devtools/views/Components/types';
=======
} from 'react-devtools-shared/src/frontend/types';
>>>>>>> remotes/upstream/main
import type {Resource, Thenable} from '../../cache';

type Context = (id: number) => Array<SerializedElement> | null;

<<<<<<< HEAD
const OwnersListContext = createContext<Context>(((null: any): Context));
=======
const OwnersListContext: ReactContext<Context> = createContext<Context>(
  ((null: any): Context),
);
>>>>>>> remotes/upstream/main
OwnersListContext.displayName = 'OwnersListContext';

type ResolveFn = (ownersList: Array<SerializedElement> | null) => void;
type InProgressRequest = {
  promise: Thenable<Array<SerializedElement>>,
  resolveFn: ResolveFn,
};

const inProgressRequests: WeakMap<Element, InProgressRequest> = new WeakMap();
const resource: Resource<
  Element,
  Element,
  Array<SerializedElement>,
> = createResource(
  (element: Element) => {
    const request = inProgressRequests.get(element);
    if (request != null) {
      return request.promise;
    }

<<<<<<< HEAD
    let resolveFn = ((null: any): ResolveFn);
=======
    let resolveFn:
      | ResolveFn
      | ((
          result: Promise<Array<SerializedElement>> | Array<SerializedElement>,
        ) => void) = ((null: any): ResolveFn);
>>>>>>> remotes/upstream/main
    const promise = new Promise(resolve => {
      resolveFn = resolve;
    });

<<<<<<< HEAD
    inProgressRequests.set(element, {promise, resolveFn});

    return promise;
=======
    // $FlowFixMe[incompatible-call] found when upgrading Flow
    inProgressRequests.set(element, {promise, resolveFn});

    return (promise: $FlowFixMe);
>>>>>>> remotes/upstream/main
  },
  (element: Element) => element,
  {useWeakMap: true},
);

type Props = {
  children: React$Node,
};

<<<<<<< HEAD
function OwnersListContextController({children}: Props) {
=======
function OwnersListContextController({children}: Props): React.Node {
>>>>>>> remotes/upstream/main
  const bridge = useContext(BridgeContext);
  const store = useContext(StoreContext);
  const {ownerID} = useContext(TreeStateContext);

  const read = useCallback(
    (id: number) => {
      const element = store.getElementByID(id);
      if (element !== null) {
        return resource.read(element);
      } else {
        return null;
      }
    },
    [store],
  );

  useEffect(() => {
    const onOwnersList = (ownersList: OwnersList) => {
      const id = ownersList.id;

      const element = store.getElementByID(id);
      if (element !== null) {
        const request = inProgressRequests.get(element);
        if (request != null) {
          inProgressRequests.delete(element);

          request.resolveFn(
            ownersList.owners === null
              ? null
              : ownersList.owners.map(owner => {
<<<<<<< HEAD
                  const [
                    displayNameWithoutHOCs,
                    hocDisplayNames,
                  ] = separateDisplayNameAndHOCs(owner.displayName, owner.type);
=======
                  const [displayNameWithoutHOCs, hocDisplayNames] =
                    separateDisplayNameAndHOCs(owner.displayName, owner.type);
>>>>>>> remotes/upstream/main

                  return {
                    ...owner,
                    displayName: displayNameWithoutHOCs,
                    hocDisplayNames,
                  };
                }),
          );
        }
      }
    };

    bridge.addListener('ownersList', onOwnersList);
    return () => bridge.removeListener('ownersList', onOwnersList);
  }, [bridge, store]);

  // This effect requests an updated owners list any time the selected owner changes
  useEffect(() => {
    if (ownerID !== null) {
      const rendererID = store.getRendererIDForElement(ownerID);
      if (rendererID !== null) {
        bridge.send('getOwnersList', {id: ownerID, rendererID});
      }
    }

    return () => {};
  }, [bridge, ownerID, store]);

  return (
    <OwnersListContext.Provider value={read}>
      {children}
    </OwnersListContext.Provider>
  );
}

export {OwnersListContext, OwnersListContextController};
