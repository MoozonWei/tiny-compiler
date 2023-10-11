import { expect, it } from 'vitest'
import { compiler } from '../src/compiler'

it('compiler', () => {
  const code = '(add 2 (subtract 4 2))'
  expect(compiler(code)).toBe('add(2, subtract(4, 2));')
})

it('multi statement', () => {
  const code = '(add 2 (subtract 4 2))(add 5 (subtract 4 3))'
  expect(compiler(code)).toMatchInlineSnapshot(`
    "add(2, subtract(4, 2));
    add(5, subtract(4, 3));"
  `)
})
