# Tiny Compiler

Learn [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler).

- [x] tokenizer
- [x] parser
- [x] traverser
- [x] transformer
- [x] codegen
- [x] compiler

## Test it out

### Installation

```shell
npm install @moozon/tiny-compiler
```

### Compiler


```typescript
import { compiler } from '@moozon/tiny-compiler'

console.log(
  /** 
   * should output:
   * "add(2, subtract(4, 2));"
   */
  compiler('(add 2 (subtract 4 2))')
)

console.log(
  /** 
   * should output:
   * "add(2, subtract(4, 2));
   * add(2, subtract(4, 2));"
   */
  compiler('(add 2 (subtract 4 2))(add 2 (subtract 4 2))')
)
```

### Other APIs

```ts
import {
  codegen,
  parser,
  tokenizer,
  transformer,
  traverser,
} from '@moozon/tiny-compiler'

// checkout test files
// ...
```
