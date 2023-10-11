import { expect, it } from 'vitest'
import { transformer } from '../src/transformer'
import { NodeTypes, type RootNode } from '../src/ast'

it('transformer', () => {
  const originalAst: RootNode = {
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
  const transformedAst = {
    type: 'Program',
    body: [{
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'add',
        },
        arguments: [
          { type: 'NumberLiteral', value: '2' },
          {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'subtract',
            },
            arguments: [
              { type: 'NumberLiteral', value: '4' },
              { type: 'NumberLiteral', value: '2' },
            ],
          },
        ],
      },
    }],
  }

  expect(transformer(originalAst)).toEqual(transformedAst)
})
