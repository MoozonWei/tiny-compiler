import { type CallExpressionNode, NodeTypes, type RootNode } from './ast'
import { traverser } from './traverser'

export function transformer(originalAst: RootNode) {
  const TransformedAst = {
    type: 'Program',
    body: [],
  }

  originalAst._context = TransformedAst.body

  traverser(originalAst, {
    CallExpression: {
      enter(node, parent) {
        if (node.type === NodeTypes.CallExpression) {
          let expression: any = {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: node.name,
            },
            arguments: [],
          }

          node._context = expression.arguments

          if (parent?.type !== NodeTypes.CallExpression) {
            expression = {
              type: 'ExpressionStatement',
              expression,
            }
          }

          parent?._context?.push(expression)
        }
      },
    },
    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {
          const numberNode: any = {
            type: 'NumberLiteral',
            value: node.value,
          }

          parent?._context?.push(numberNode)
        }
      },
    },
  })

  return TransformedAst
}
