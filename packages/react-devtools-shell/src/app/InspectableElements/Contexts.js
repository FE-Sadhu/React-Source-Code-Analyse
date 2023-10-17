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
import {createContext, Component, useContext, useState} from 'react';
import PropTypes from 'prop-types';

<<<<<<< HEAD
function someNamedFunction() {}

function formatContextForDisplay(name, value) {
=======
import type {ReactContext} from 'shared/ReactTypes';

function someNamedFunction() {}

function formatContextForDisplay(name: string, value: any | string) {
>>>>>>> remotes/upstream/main
  return (
    <li>
      {name}: <pre>{JSON.stringify(value, null, 2)}</pre>
    </li>
  );
}

const contextData = {
  array: ['first', 'second', 'third'],
  bool: true,
  func: someNamedFunction,
  number: 123,
  object: {outer: {inner: {}}},
  string: 'abc',
  symbol: Symbol.for('symbol'),
  null: null,
  undefined: undefined,
};

class LegacyContextProvider extends Component<any> {
<<<<<<< HEAD
  static childContextTypes = {
=======
  static childContextTypes: {
    array: any,
    bool: any,
    func: any,
    null: any,
    number: any,
    object: any,
    string: any,
    symbol: any,
    undefined: any,
  } = {
>>>>>>> remotes/upstream/main
    array: PropTypes.array,
    bool: PropTypes.bool,
    func: PropTypes.func,
    number: PropTypes.number,
    object: PropTypes.object,
    string: PropTypes.string,
    symbol: PropTypes.symbol,
    null: PropTypes.any,
    undefined: PropTypes.any,
  };

<<<<<<< HEAD
  getChildContext() {
    return contextData;
  }

  render() {
=======
  getChildContext(): {
    array: Array<string>,
    bool: boolean,
    func: () => void,
    null: null,
    number: number,
    object: {outer: {inner: {...}}},
    string: string,
    symbol: symbol,
    undefined: void,
  } {
    return contextData;
  }

  render(): any {
>>>>>>> remotes/upstream/main
    return this.props.children;
  }
}

class LegacyContextConsumer extends Component<any> {
<<<<<<< HEAD
  static contextTypes = {
=======
  static contextTypes: {
    array: any,
    bool: any,
    func: any,
    null: any,
    number: any,
    object: any,
    string: any,
    symbol: any,
    undefined: any,
  } = {
>>>>>>> remotes/upstream/main
    array: PropTypes.array,
    bool: PropTypes.bool,
    func: PropTypes.func,
    number: PropTypes.number,
    object: PropTypes.object,
    string: PropTypes.string,
    symbol: PropTypes.symbol,
    null: PropTypes.any,
    undefined: PropTypes.any,
  };

<<<<<<< HEAD
  render() {
=======
  render(): any {
>>>>>>> remotes/upstream/main
    return formatContextForDisplay('LegacyContextConsumer', this.context);
  }
}

class LegacyContextProviderWithUpdates extends Component<any> {
<<<<<<< HEAD
  constructor(props) {
=======
  constructor(props: any) {
>>>>>>> remotes/upstream/main
    super(props);
    this.state = {type: 'desktop'};
  }

<<<<<<< HEAD
  getChildContext() {
    return {type: this.state.type};
  }

=======
  getChildContext(): {type: any} {
    return {type: this.state.type};
  }

  // $FlowFixMe[missing-local-annot]
>>>>>>> remotes/upstream/main
  handleChange = event => {
    this.setState({type: event.target.value});
  };

<<<<<<< HEAD
  render() {
=======
  render(): any {
>>>>>>> remotes/upstream/main
    return (
      <>
        <LegacyFunctionalContextConsumer />
        <div>
          <input value={this.state.type} onChange={this.handleChange} />
        </div>
      </>
    );
  }
}

LegacyContextProviderWithUpdates.childContextTypes = {
  type: PropTypes.string,
};

<<<<<<< HEAD
function LegacyFunctionalContextConsumer(props, context) {
=======
// $FlowFixMe[missing-local-annot]
function LegacyFunctionalContextConsumer(props: any, context) {
>>>>>>> remotes/upstream/main
  return formatContextForDisplay('LegacyFunctionContextConsumer', context.type);
}
LegacyFunctionalContextConsumer.contextTypes = {
  type: PropTypes.string,
};

const ModernContext = createContext();
ModernContext.displayName = 'ModernContext';
const ArrayContext = createContext(contextData.array);
ArrayContext.displayName = 'ArrayContext';
const BoolContext = createContext(contextData.bool);
BoolContext.displayName = 'BoolContext';
const FuncContext = createContext(contextData.func);
FuncContext.displayName = 'FuncContext';
const NumberContext = createContext(contextData.number);
NumberContext.displayName = 'NumberContext';
const StringContext = createContext(contextData.string);
StringContext.displayName = 'StringContext';
const SymbolContext = createContext(contextData.symbol);
SymbolContext.displayName = 'SymbolContext';
const NullContext = createContext(null);
NullContext.displayName = 'NullContext';
const UndefinedContext = createContext(undefined);
UndefinedContext.displayName = 'UndefinedContext';

class ModernContextType extends Component<any> {
<<<<<<< HEAD
  static contextType = ModernContext;

  render() {
=======
  static contextType: ReactContext<void> = ModernContext;

  render(): any {
>>>>>>> remotes/upstream/main
    return formatContextForDisplay('ModernContextType', this.context);
  }
}

function FunctionalContextConsumer() {
  const value = useContext(StringContext);
  return formatContextForDisplay('FunctionalContextConsumer', value);
}

const StringContextWithUpdates = createContext({
  string: contextData.string,
  setString: (string: string) => {},
});
const StringContextWithUpdates2 = createContext({
  string2: contextData.string,
  setString2: (string: string) => {},
});

function FunctionalContextProviderWithContextUpdates() {
  const [string, setString] = useState(contextData.string);
  const [string2, setString2] = useState(contextData.string);
  const value = {string, setString};
  const value2 = {string2, setString2};

  return (
    <StringContextWithUpdates.Provider value={value}>
      <StringContextWithUpdates2.Provider value={value2}>
        <FunctionalContextConsumerWithContextUpdates />
      </StringContextWithUpdates2.Provider>
    </StringContextWithUpdates.Provider>
  );
}

function FunctionalContextConsumerWithContextUpdates() {
  const {string, setString} = useContext(StringContextWithUpdates);
  const {string2, setString2} = useContext(StringContextWithUpdates2);
  const [state, setState] = useState('state');

<<<<<<< HEAD
  const handleChange = e => setString(e.target.value);
=======
  // $FlowFixMe[missing-local-annot]
  const handleChange = e => setString(e.target.value);
  // $FlowFixMe[missing-local-annot]
>>>>>>> remotes/upstream/main
  const handleChange2 = e => setString2(e.target.value);

  return (
    <>
      {formatContextForDisplay(
        'FunctionalContextConsumerWithUpdates',
        `context: ${string}, context 2: ${string2}`,
      )}
      <div>
        context: <input value={string} onChange={handleChange} />
      </div>
      <div>
        context 2: <input value={string2} onChange={handleChange2} />
      </div>
      <div>
        {state}
        <div>
          test state:{' '}
          <input value={state} onChange={e => setState(e.target.value)} />
        </div>
      </div>
    </>
  );
}

class ModernClassContextProviderWithUpdates extends Component<any> {
<<<<<<< HEAD
  constructor(props) {
=======
  constructor(props: any) {
>>>>>>> remotes/upstream/main
    super(props);
    this.setString = string => {
      this.setState({string});
    };

    this.state = {
      string: contextData.string,
      setString: this.setString,
    };
  }

<<<<<<< HEAD
  render() {
=======
  render(): any {
>>>>>>> remotes/upstream/main
    return (
      <StringContextWithUpdates.Provider value={this.state}>
        <ModernClassContextConsumerWithUpdates />
      </StringContextWithUpdates.Provider>
    );
  }
}

class ModernClassContextConsumerWithUpdates extends Component<any> {
<<<<<<< HEAD
  render() {
    return (
      <StringContextWithUpdates.Consumer>
        {({string, setString}) => (
=======
  render(): any {
    return (
      <StringContextWithUpdates.Consumer>
        {({string, setString}: {string: string, setString: string => void}) => (
>>>>>>> remotes/upstream/main
          <>
            {formatContextForDisplay(
              'ModernClassContextConsumerWithUpdates',
              string,
            )}
            <input value={string} onChange={e => setString(e.target.value)} />
          </>
        )}
      </StringContextWithUpdates.Consumer>
    );
  }
}

export default function Contexts(): React.Node {
  return (
    <div>
      <h1>Contexts</h1>
      <ul>
        <LegacyContextProvider>
          <LegacyContextConsumer />
        </LegacyContextProvider>
        <LegacyContextProviderWithUpdates />
        <ModernContext.Provider value={contextData}>
          <ModernContext.Consumer>
<<<<<<< HEAD
            {value => formatContextForDisplay('ModernContext.Consumer', value)}
=======
            {(value: $FlowFixMe) =>
              formatContextForDisplay('ModernContext.Consumer', value)
            }
>>>>>>> remotes/upstream/main
          </ModernContext.Consumer>
          <ModernContextType />
        </ModernContext.Provider>
        <FunctionalContextConsumer />
        <FunctionalContextProviderWithContextUpdates />
        <ModernClassContextProviderWithUpdates />
        <ArrayContext.Consumer>
<<<<<<< HEAD
          {value => formatContextForDisplay('ArrayContext.Consumer', value)}
        </ArrayContext.Consumer>
        <BoolContext.Consumer>
          {value => formatContextForDisplay('BoolContext.Consumer', value)}
        </BoolContext.Consumer>
        <FuncContext.Consumer>
          {value => formatContextForDisplay('FuncContext.Consumer', value)}
        </FuncContext.Consumer>
        <NumberContext.Consumer>
          {value => formatContextForDisplay('NumberContext.Consumer', value)}
        </NumberContext.Consumer>
        <StringContext.Consumer>
          {value => formatContextForDisplay('StringContext.Consumer', value)}
        </StringContext.Consumer>
        <SymbolContext.Consumer>
          {value => formatContextForDisplay('SymbolContext.Consumer', value)}
        </SymbolContext.Consumer>
        <NullContext.Consumer>
          {value => formatContextForDisplay('NullContext.Consumer', value)}
        </NullContext.Consumer>
        <UndefinedContext.Consumer>
          {value => formatContextForDisplay('UndefinedContext.Consumer', value)}
=======
          {(value: $FlowFixMe) =>
            formatContextForDisplay('ArrayContext.Consumer', value)
          }
        </ArrayContext.Consumer>
        <BoolContext.Consumer>
          {(value: $FlowFixMe) =>
            formatContextForDisplay('BoolContext.Consumer', value)
          }
        </BoolContext.Consumer>
        <FuncContext.Consumer>
          {(value: $FlowFixMe) =>
            formatContextForDisplay('FuncContext.Consumer', value)
          }
        </FuncContext.Consumer>
        <NumberContext.Consumer>
          {(value: $FlowFixMe) =>
            formatContextForDisplay('NumberContext.Consumer', value)
          }
        </NumberContext.Consumer>
        <StringContext.Consumer>
          {(value: $FlowFixMe) =>
            formatContextForDisplay('StringContext.Consumer', value)
          }
        </StringContext.Consumer>
        <SymbolContext.Consumer>
          {(value: $FlowFixMe) =>
            formatContextForDisplay('SymbolContext.Consumer', value)
          }
        </SymbolContext.Consumer>
        <NullContext.Consumer>
          {(value: $FlowFixMe) =>
            formatContextForDisplay('NullContext.Consumer', value)
          }
        </NullContext.Consumer>
        <UndefinedContext.Consumer>
          {(value: $FlowFixMe) =>
            formatContextForDisplay('UndefinedContext.Consumer', value)
          }
>>>>>>> remotes/upstream/main
        </UndefinedContext.Consumer>
      </ul>
    </div>
  );
}
