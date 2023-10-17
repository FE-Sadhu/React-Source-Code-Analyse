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
 * @flow strict
 */

<<<<<<< HEAD
type Heap = Array<Node>;
type Node = {
  id: number,
  sortIndex: number,
};

export function push(heap: Heap, node: Node): void {
=======
type Heap<T: Node> = Array<T>;
type Node = {
  id: number,
  sortIndex: number,
  ...
};

export function push<T: Node>(heap: Heap<T>, node: T): void {
>>>>>>> remotes/upstream/main
  const index = heap.length;
  heap.push(node);
  siftUp(heap, node, index);
}

<<<<<<< HEAD
export function peek(heap: Heap): Node | null {
  return heap.length === 0 ? null : heap[0];
}

export function pop(heap: Heap): Node | null {
=======
export function peek<T: Node>(heap: Heap<T>): T | null {
  return heap.length === 0 ? null : heap[0];
}

export function pop<T: Node>(heap: Heap<T>): T | null {
>>>>>>> remotes/upstream/main
  if (heap.length === 0) {
    return null;
  }
  const first = heap[0];
  const last = heap.pop();
  if (last !== first) {
    heap[0] = last;
    siftDown(heap, last, 0);
  }
  return first;
}

<<<<<<< HEAD
function siftUp(heap, node, i) {
=======
function siftUp<T: Node>(heap: Heap<T>, node: T, i: number): void {
>>>>>>> remotes/upstream/main
  let index = i;
  while (index > 0) {
    const parentIndex = (index - 1) >>> 1;
    const parent = heap[parentIndex];
    if (compare(parent, node) > 0) {
      // The parent is larger. Swap positions.
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      // The parent is smaller. Exit.
      return;
    }
  }
}

<<<<<<< HEAD
function siftDown(heap, node, i) {
=======
function siftDown<T: Node>(heap: Heap<T>, node: T, i: number): void {
>>>>>>> remotes/upstream/main
  let index = i;
  const length = heap.length;
  const halfLength = length >>> 1;
  while (index < halfLength) {
    const leftIndex = (index + 1) * 2 - 1;
    const left = heap[leftIndex];
    const rightIndex = leftIndex + 1;
    const right = heap[rightIndex];

    // If the left or right node is smaller, swap with the smaller of those.
    if (compare(left, node) < 0) {
      if (rightIndex < length && compare(right, left) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (rightIndex < length && compare(right, node) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      // Neither child is smaller. Exit.
      return;
    }
  }
}

<<<<<<< HEAD
function compare(a, b) {
=======
function compare(a: Node, b: Node) {
>>>>>>> remotes/upstream/main
  // Compare sort index first, then task id.
  const diff = a.sortIndex - b.sortIndex;
  return diff !== 0 ? diff : a.id - b.id;
}
