/**
 * 重点：1. join函数接收一个连接字符参数，返回一个函数；2. 返回的函数参数就是要拼接的字符串集合
 * 1. JoinString 拼接字符
 * 2. join的参数D extends string，返回的函数参数T extends string[]
 */
type JoinString<
  D extends string,
  T extends string[],
> = T extends [infer F extends string, ...infer R extends string[]]
  ? R extends []
    ? F
    : `${F}${D}${JoinString<D, R>}`
  : ''

declare function join<
  D extends string
>(delimiter: D): <T extends string[]>(...parts: T) => JoinString<D, T>
