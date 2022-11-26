/**
 * 1. [P in keyof F | keyof S] 遍历所有key值
 * 2. 先设置所有S的key对应的值
 * 3. Exclude<keyof F, keyof S>排除S的key后再设置剩余F的key对应的值
 * 4. PropertyKey == keyof any --> string | number | symbol
 */
// type Merge<F, S> = {
//   [P in keyof F | keyof S]: P extends keyof S
//     ? S[P]
//     : P extends Exclude<keyof F, keyof S>
//       ? F[P]
//       : never
// }

/**
 * 1. 收窄F和S的类型是{}
 * 2. 设置键和值
 */
type Merge<
  F extends Record<PropertyKey, unknown>,
  S extends Record<PropertyKey, unknown>
> = {
  [P in keyof F | keyof S]: P extends keyof S ? S[P] : F[P]
}

