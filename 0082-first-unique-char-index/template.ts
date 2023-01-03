type CountMap = Record<PropertyKey, unknown[]>
/**
 * 遍历字符串，记录每个字符的数量
 * S 记录的字符串
 * M 记录每个字符长度的对象
 */
type CharCountMap<
  S extends string,
  M extends CountMap = {}
> = S extends `${infer F}${infer L}`
  ? F extends keyof M
    ? CharCountMap<L, {[P in F]: [...M[F], unknown]} & Omit<M, F>>
    : CharCountMap<L, {[P in F]: [unknown]} & M>
  : M
/**
 * 查找第一个非重复字符，并返回索引
 * T 被查找的字符串
 * I 记录当前查找字符的索引
 * M 字符串中每个字符与数量的映射关系
 */
type FirstUniqueCharIndex<
  T extends string,
  I extends unknown[] = [],
  M extends CountMap = CharCountMap<T>
> = T extends `${infer F}${infer L}`
  ? M[F]['length'] extends 1
    ? I['length']
    : FirstUniqueCharIndex<L, [...I, unknown], M>
  : -1

type Simply<T extends Record<PropertyKey, unknown>> = { [P in keyof T]: T[P] }
type c = Simply<CharCountMap<'loveleetcode'>>
// type c = {
//   e: [unknown, unknown, unknown, unknown];
//   l: [unknown, unknown];
//   o: [unknown, unknown];
//   v: [unknown];
//   t: [unknown];
//   c: [unknown];
//   d: [unknown];
// }

/** 大神的解法，细品 */
// type FirstUniqueCharIndex<
//   T extends string,
//   Unchecked extends string = T,
//   Counter extends 1[] = []
// > = Unchecked extends `${infer Head}${infer Remainder}`
// ? T extends `${infer Before}${Head}${infer After}`
//   ? `${Before}${After}` extends `${any}${Head}${any}`
//     ? FirstUniqueCharIndex<T, Remainder, [1, ...Counter]>
//     : Counter["length"]
//   : never
// : -1
