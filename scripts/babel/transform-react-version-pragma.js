'use strict';

/* eslint-disable no-for-of-loops/no-for-of-loops */

<<<<<<< HEAD
const GATE_VERSION_STR = '@reactVersion ';
=======
const getComments = require('./getComments');

const GATE_VERSION_STR = '@reactVersion ';
const REACT_VERSION_ENV = process.env.REACT_VERSION;
>>>>>>> remotes/upstream/main

function transform(babel) {
  const {types: t} = babel;

  // Runs tests conditionally based on the version of react (semver range) we are running
  // Input:
  //   @reactVersion >= 17.0
  //   test('some test', () => {/*...*/})
  //
  // Output:
  //    @reactVersion >= 17.0
  //   _test_react_version('>= 17.0', 'some test', () => {/*...*/});
  //
  // See info about semver ranges here:
  // https://www.npmjs.com/package/semver
  function buildGateVersionCondition(comments) {
    if (!comments) {
      return null;
    }

<<<<<<< HEAD
    let conditions = null;
    for (const line of comments) {
      const commentStr = line.value.trim();
      if (commentStr.startsWith(GATE_VERSION_STR)) {
        const condition = t.stringLiteral(
          commentStr.slice(GATE_VERSION_STR.length)
        );
        if (conditions === null) {
          conditions = [condition];
        } else {
          conditions.push(condition);
        }
      }
    }

    if (conditions !== null) {
      let condition = conditions[0];
      for (let i = 1; i < conditions.length; i++) {
        const right = conditions[i];
        condition = t.logicalExpression('&&', condition, right);
      }
      return condition;
    } else {
      return null;
    }
=======
    const resultingCondition = comments.reduce(
      (accumulatedCondition, commentLine) => {
        const commentStr = commentLine.value.trim();

        if (!commentStr.startsWith(GATE_VERSION_STR)) {
          return accumulatedCondition;
        }

        const condition = commentStr.slice(GATE_VERSION_STR.length);
        if (accumulatedCondition === null) {
          return condition;
        }

        return accumulatedCondition.concat(' ', condition);
      },
      null
    );

    if (resultingCondition === null) {
      return null;
    }

    return t.stringLiteral(resultingCondition);
>>>>>>> remotes/upstream/main
  }

  return {
    name: 'transform-react-version-pragma',
    visitor: {
      ExpressionStatement(path) {
        const statement = path.node;
        const expression = statement.expression;
        if (expression.type === 'CallExpression') {
          const callee = expression.callee;
          switch (callee.type) {
            case 'Identifier': {
              if (
                callee.name === 'test' ||
                callee.name === 'it' ||
                callee.name === 'fit'
              ) {
<<<<<<< HEAD
                const comments = statement.leadingComments;
=======
                const comments = getComments(path);
>>>>>>> remotes/upstream/main
                const condition = buildGateVersionCondition(comments);
                if (condition !== null) {
                  callee.name =
                    callee.name === 'fit'
                      ? '_test_react_version_focus'
                      : '_test_react_version';
                  expression.arguments = [condition, ...expression.arguments];
<<<<<<< HEAD
                } else {
=======
                } else if (REACT_VERSION_ENV) {
>>>>>>> remotes/upstream/main
                  callee.name = '_test_ignore_for_react_version';
                }
              }
              break;
            }
            case 'MemberExpression': {
              if (
                callee.object.type === 'Identifier' &&
                (callee.object.name === 'test' ||
                  callee.object.name === 'it') &&
                callee.property.type === 'Identifier' &&
                callee.property.name === 'only'
              ) {
<<<<<<< HEAD
                const comments = statement.leadingComments;
=======
                const comments = getComments(path);
>>>>>>> remotes/upstream/main
                const condition = buildGateVersionCondition(comments);
                if (condition !== null) {
                  statement.expression = t.callExpression(
                    t.identifier('_test_react_version_focus'),
                    [condition, ...expression.arguments]
                  );
<<<<<<< HEAD
                } else {
=======
                } else if (REACT_VERSION_ENV) {
>>>>>>> remotes/upstream/main
                  statement.expression = t.callExpression(
                    t.identifier('_test_ignore_for_react_version'),
                    expression.arguments
                  );
                }
              }
              break;
            }
          }
        }
        return;
      },
    },
  };
}

module.exports = transform;
