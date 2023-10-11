import { expect, it } from 'vitest'
import { TokenTypes } from '../src/tokenizer'
import { parser } from '../src/parser'
import { NodeTypes } from '../src/ast'

/**
 * Parsing
 * -------
 *
 * Parsing typically gets broken down into two phases: Lexical Analysis and
 * Syntactic Analysis.
 *
 * 1. *Lexical Analysis* takes the raw code and splits it apart into these things
 *    called tokens by a thing called a tokenizer (or lexer).
 *
 *    Tokens are an array of tiny little objects that describe an isolated piece
 *    of the syntax. They could be numbers, labels, punctuation, operators,
 *    whatever.
 *
 * 2. *Syntactic Analysis* takes the tokens and reformats them into a
 *    representation that describes each part of the syntax and their relation
 *    to one another. This is known as an intermediate representation or
 *    Abstract Syntax Tree.
 *
 *    An Abstract Syntax Tree, or AST for short, is a deeply nested object that
 *    represents code in a way that is both easy to work with and tells us a lot
 *    of information.
 *
 * For the following syntax:
 *
 *   (add 2 (subtract 4 2))
 *
 * Tokens might look something like this:
 *
 *   [
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'add'      },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: '('        },
 *     { type: 'name',   value: 'subtract' },
 *     { type: 'number', value: '4'        },
 *     { type: 'number', value: '2'        },
 *     { type: 'paren',  value: ')'        },
 *     { type: 'paren',  value: ')'        },
 *   ]
 *
 * And an Abstract Syntax Tree (AST) might look like this:
 *
 *   {
 *     type: 'Program',
 *     body: [{
 *       type: 'CallExpression',
 *       name: 'add',
 *       params: [{
 *         type: 'NumberLiteral',
 *         value: '2',
 *       }, {
 *         type: 'CallExpression',
 *         name: 'subtract',
 *         params: [{
 *           type: 'NumberLiteral',
 *           value: '4',
 *         }, {
 *           type: 'NumberLiteral',
 *           value: '2',
 *         }]
 *       }]
 *     }]
 *   }
 */

it('number', () => {
  const tokens = [
    { type: TokenTypes.Number, value: '123' },
  ]

  const ast = {
    type: NodeTypes.Program,
    body: [{
      type: NodeTypes.NumberLiteral,
      value: '123',
    }],
  }

  expect(parser(tokens)).toEqual(ast)
})

it('call expression', () => {
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Paren, value: ')' },
  ]

  const ast = {
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
          type: NodeTypes.NumberLiteral,
          value: '4',
        },
      ],
    }],
  }

  expect(parser(tokens)).toEqual(ast)
})

it('two call expression', () => {
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Paren, value: ')' },

    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Paren, value: ')' },
  ]

  const ast = {
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
          type: NodeTypes.NumberLiteral,
          value: '4',
        },
      ],
    }, {
      type: NodeTypes.CallExpression,
      name: 'add',
      params: [
        {
          type: NodeTypes.NumberLiteral,
          value: '2',
        },
        {
          type: NodeTypes.NumberLiteral,
          value: '4',
        },
      ],
    }],
  }

  expect(parser(tokens)).toEqual(ast)
})

it('parser', () => {
  const tokens = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'subtract' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: ')' },
    { type: TokenTypes.Paren, value: ')' },
  ]

  const ast = {
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
    },
    ],
  }

  expect(parser(tokens)).toEqual(ast)
})
