import { createCallExpressionNode, createNumberLiteralNode, createRootNode } from './ast'
import { type Token, TokenTypes } from './tokenizer'

export function parser(tokens: Token[]) {
  const rootNode = createRootNode()
  let current = 0

  function walk() {
    let token = tokens[current]

    // Number
    if (token.type === TokenTypes.Number) {
      current++ // skip number
      return createNumberLiteralNode(token.value)
    }

    // CallExpression
    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[++current] // skip '('

      const callExpressionNode = createCallExpressionNode(token.value)

      token = tokens[++current] // skip 'add'

      while (!(token.type === TokenTypes.Paren && token.value === ')')) {
        callExpressionNode.params.push(walk())
        token = tokens[current]
      }

      current++ // skip ')'
      return callExpressionNode
    }

    throw new TypeError(`unknown token type: ${token}`)
  }

  while (current < tokens.length)
    rootNode.body.push(walk())

  return rootNode
}
