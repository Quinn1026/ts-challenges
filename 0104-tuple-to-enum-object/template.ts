/**
 * 1. 定义存放索引的变量Index，存放结果的Res
 * 2. 拿到元组的一个元素，判断N，如果true取索引Index，如果false取key
 * 3. 输出结果
 */
type EnumDebug<
  T extends readonly string[],
  N extends boolean = false,
  Index extends unknown[] = [],
  Res extends Record<string, unknown> = {}
> = T extends readonly [
  infer F extends string,
  ...infer R extends string[]
] ? EnumDebug<
  R,
  N,
  [...Index, unknown],
  Res & { readonly [P in Capitalize<F>]: N extends false ? F : Index['length'] }
> : Res
type Debug<T extends Record<string, unknown>> = { [P in keyof T]: T[P] }
type Enum1<
  T extends readonly string[],
  N extends boolean = false,
> = Debug<EnumDebug<T, N>>
/**
 * 1. K in keyof T as K extends `${number}` 取出元组的索引
 * 2. 判断N，true则索引，false则key
 */
type Enum<
  T extends readonly string[],
  N extends boolean = false
> = {
  readonly [
    K in keyof T as K extends `${number}`
      ? Capitalize<T[K]>
      : never
  ]: N extends true
    ? K extends `${infer F extends number}`
      ? F
      : never
    : T[K]
}