export function codegen(node: any): any {
  switch (node.type) {
    case 'Program':
      return node.body.map(codegen).join('\n')
    case 'ExpressionStatement':
      return `${codegen(node.expression)};`
    case 'CallExpression':
      return `${node.callee.name}(${node.arguments.map(codegen).join(', ')})`
    case 'Identifier':
      break
    case 'NumberLiteral':
      return node.value
  }
}
