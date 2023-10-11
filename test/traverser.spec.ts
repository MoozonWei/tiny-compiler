/* eslint-disable no-console */
import { expect, it } from 'vitest'
import type { Visitor } from '../src/traverser'
import { traverser } from '../src/traverser'
import type { RootNode } from '../src/ast'
import { NodeTypes } from '../src/ast'

it('traverser', () => {
  const ast: RootNode = {
    type: NodeTypes.Program,
    body: [{
      type: NodeTypes.CallExpression,
      name: 'add',
      params: [
        {
          type: NodeTypes.NumberLiteral,
          value: '2',
        },
        {
          type: NodeTypes.CallExpression,
          name: 'subtract',
          params: [{
            type: NodeTypes.NumberLiteral,
            value: '4',
          }, {
            type: NodeTypes.NumberLiteral,
            value: '2',
          }],
        },
      ],
    }],
  }

  const callArr: any[] = []
  const visitor: Visitor = {
    Program: {
      enter(node, parent) {
        callArr.push(['Program-enter', node.type, parent?.type])
      },
      exit(node, parent) {
        callArr.push(['Program-exit', node.type, parent?.type])
      },
    },
    StringLiteral: {
      enter(node, parent) {
        callArr.push(['StringLiteral-enter', node.type, parent?.type])
      },
      exit(node, parent) {
        callArr.push(['StringLiteral-exit', node.type, parent?.type])
      },
    },
    NumberLiteral: {
      enter(node, parent) {
        callArr.push(['NumberLiteral-enter', node.type, parent?.type])
      },
      exit(node, parent) {
        callArr.push(['NumberLiteral-exit', node.type, parent?.type])
      },
    },
    CallExpression: {
      enter(node, parent) {
        callArr.push(['CallExpression-enter', node.type, parent?.type])
      },
      exit(node, parent) {
        callArr.push(['CallExpression-exit', node.type, parent?.type])
      },
    },
  }
  traverser(ast, visitor)
  expect(callArr).toEqual([
    ['Program-enter', NodeTypes.Program, undefined],
    ['CallExpression-enter', NodeTypes.CallExpression, NodeTypes.Program],
    ['NumberLiteral-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['NumberLiteral-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['CallExpression-enter', NodeTypes.CallExpression, NodeTypes.CallExpression],
    ['NumberLiteral-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['NumberLiteral-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['NumberLiteral-enter', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['NumberLiteral-exit', NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ['CallExpression-exit', NodeTypes.CallExpression, NodeTypes.CallExpression],
    ['CallExpression-exit', NodeTypes.CallExpression, NodeTypes.Program],
    ['Program-exit', NodeTypes.Program, undefined],
  ])
})
