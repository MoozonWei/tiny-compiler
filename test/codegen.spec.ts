import { expect, it } from 'vitest'
import { codegen } from '../src/codegen'

it('codegen', () => {
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

  expect(codegen(transformedAst)).toMatchInlineSnapshot('"add(2, subtract(4, 2));"')
})

it('two statement', () => {
  const transformedAst = {
    type: 'Program',
    body: [
      {
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
      },
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'add',
          },
          arguments: [
            { type: 'NumberLiteral', value: '5' },
            {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'subtract',
              },
              arguments: [
                { type: 'NumberLiteral', value: '4' },
                { type: 'NumberLiteral', value: '3' },
              ],
            },
          ],
        },
      },
    ],
  }

  expect(codegen(transformedAst)).toMatchInlineSnapshot(`
    "add(2, subtract(4, 2));
    add(5, subtract(4, 3));"
  `)
})
