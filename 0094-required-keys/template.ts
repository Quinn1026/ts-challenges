type IsRequireKey2<T, K extends keyof T> =
  { [P in K]: T[P] } extends { [P in K]-?: T[P] }
    ? true
    : false
type RequiredKeys<
  T extends Record<PropertyKey, unknown>,
  K extends keyof T = keyof T
> = K extends K
  ? IsRequireKey2<T, K> extends true
    ? K
    : never
  : never

/** 大佬们的解法 */
type RequiredKeys0<T extends Record<PropertyKey, unknown>> = keyof GetRequired<T>

type RequiredKeys1<T extends object, K = keyof T> = K extends keyof T
  ? T extends Required<Pick<T, K>>
    ? K
    : never
  : never

type a99 = Record<PropertyKey, unknown> extends {} ? true : false // true
type a98 = {} extends Record<PropertyKey, unknown> ? true : false // true
type a97 = Record<PropertyKey, unknown> extends object ? true : false // true
type a96 = object extends Record<PropertyKey, unknown> ? true : false // false
type a95 = {} extends object ? true : false // true
type a94 = object extends {} ? true : false // true
// 只有 object extends Record<PropertyKey, unknown> 是 false
