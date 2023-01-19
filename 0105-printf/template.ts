/** 思路乱七八糟 */
type SDMap<T extends string> = T extends 's' ? string : T extends 'd' ? number : never
type Format1<
  T extends string,
  Res extends string | Function = string
> = T extends `${string}%${infer M}${infer R}`
  ? M extends '%'
    ? Format1<R, Res>
    : M extends 's' | 'd'
      ? Format1<
        R,
        Res extends string
          ? (x: SDMap<M>) => Res
          : Res extends (x: infer X) => string
            ? (x: X) => (x: SDMap<M>) => string
            : never
      >
      : Format1<R, Res>
  : Res
type R1 = Format1<'a%dbc%s'>
/** 大佬的解法 */
/**
 * 1. 定义s和d的映射类型
 * 2. 字符串匹配keyof StrAndNumMap，没有匹配递归剩余字符，匹配上作为作为函数参数=>递归剩余字符
 */
type StrAndNumMap = {
  s: string
  d: number
}
type Format<T extends string> = T extends `${string}%${infer M}${infer R}`
  ? M extends keyof StrAndNumMap
    ? (arg: StrAndNumMap[M]) => Format<R>
    : Format<R>
  : string