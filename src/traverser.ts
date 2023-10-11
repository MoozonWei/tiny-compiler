import { type CallExpressionNode, type ChildNode, NodeTypes, type NumberLiteralNode, type RootNode, type StringLiteralNode } from './ast'

type ParentNode = RootNode | CallExpressionNode | undefined
type MethodFn = (node: ChildNode | RootNode, parent?: ParentNode) => void

interface VisitorOption {
  enter: MethodFn
  exit?: MethodFn
}

export interface Visitor {
  Program?: VisitorOption
  StringLiteral?: VisitorOption
  NumberLiteral?: VisitorOption
  CallExpression?: VisitorOption
}

export function traverser(ast: RootNode, visitor?: Visitor) {
  // 1. dfs
  function traverseArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverseNode(node, parent)
    })
  }
  function traverseNode(node: ChildNode | RootNode, parent: ParentNode) {
    const visitorOption = visitor?.[node.type]

    visitorOption?.enter(node, parent)

    switch (node.type) {
      case NodeTypes.NumberLiteral:
        break
      case NodeTypes.CallExpression:
        traverseArray(node.params, node)
        break
      case NodeTypes.Program:
        traverseArray(node.body, node)
        break
    }

    visitorOption?.exit?.(node, parent)
  }
  // 2. visitor

  traverseNode(ast, undefined)
}
