/**
 * 合并值并去重，多个值用元组表示，保证顺序
 * 1. 'k1=v1' --> v1
 * 2. 'k1=v1&k1=v1' --> v1
 * 3. 'k1=v1&k1=v2' --> ['v1', 'v2']
 */
type TransformTuple<
  T extends unknown,
  U extends unknown
> = T extends unknown[]
  ? U extends T[number]
    ? T
    : [...T, U]
  : U extends T
    ? T
    : [T, U]
/**
 * 解析key=value字符串
 * 1. key=value --> { key: value }
 * 2. key --> { key: true }
 */
type ParseKeyValue<
  T extends string,
  R extends Record<string, unknown> = {}
> = T extends `${infer K}=${infer V}`
  ? { [P in K]: K extends keyof R ? TransformTuple<R[K], V> : V } & Omit<R, K>
  : { [P in T]: T extends keyof R ? TransformTuple<R[T], true> : true } & Omit<R, T>
/**
 * 解析query
 * 1. 根据&符号拆分字符串
 * 2. 使用ParseKeyValue获取键值对组成的对象
 */
type ParseQuery<
  T extends string,
  Res extends Record<string, unknown> = {}
> = T extends ''
  ? Res
  : T extends `${infer F}&${infer R}`
    ? ParseQuery<R, ParseKeyValue<F, Res>>
    : ParseKeyValue<T, Res>

type ParseQueryString<T extends string> = Debug<ParseQuery<T>>
