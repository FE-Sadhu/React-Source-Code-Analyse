/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import {REACT_FRAGMENT_TYPE} from 'shared/ReactSymbols';
import {
  jsxWithValidationStatic,
  jsxWithValidationDynamic,
  jsxWithValidation,
} from './ReactJSXElementValidator';
import {jsx as jsxProd} from './ReactJSXElement';
const jsx = __DEV__ ? jsxWithValidationDynamic : jsxProd;
// we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions
// 暂且 jsxs 和 jsx 使用同函数，此处做区分是为了以后另外指明 jsxs 方法去对静态子节点做优化。
const jsxs = __DEV__ ? jsxWithValidationStatic : jsxProd;
const jsxDEV = __DEV__ ? jsxWithValidation : undefined;

export {REACT_FRAGMENT_TYPE as Fragment, jsx, jsxs, jsxDEV};
