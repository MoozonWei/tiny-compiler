export enum NodeTypes {
  Program = 'Program',
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
  CallExpression = 'CallExpression',
}

export interface Node {
  type: NodeTypes
}

// ---ChildNode---
export type ChildNode = NumberLiteralNode | CallExpressionNode

// ---RootNode---
export interface RootNode extends Node {
  type: NodeTypes.Program
  body: ChildNode[]
  _context?: any[]
}
export function createRootNode(): RootNode {
  return {
    type: NodeTypes.Program,
    body: [],
  }
}

// ---NumberNode---
export interface NumberLiteralNode extends Node {
  type: NodeTypes.NumberLiteral
  value: string
}
export function createNumberLiteralNode(value: string): NumberLiteralNode {
  return {
    type: NodeTypes.NumberLiteral,
    value,
  }
}

// ---StringNode---
export interface StringLiteralNode extends Node {
  type: NodeTypes.StringLiteral
  value: string
}
export function createStringLiteralNode(value: string): StringLiteralNode {
  return {
    type: NodeTypes.StringLiteral,
    value,
  }
}

// ---CallExpressionNode---
export interface CallExpressionNode extends Node {
  type: NodeTypes.CallExpression
  name: string
  params: ChildNode[]
  _context?: any[]
}
export function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: [],
  }
}
