/**
 * 1. 把字符串拆分为数组
 * 2. 数组转化为联合类型 T[number]
 */
/**
type StringToArray<T> = T extends `${infer F}${infer R}`
  ? [F, ...StringToArray<R>]
  : []
type StringToUnion1<T extends string> = StringToArray<T>[number]

type StringToUnion2<T extends string> = T extends `${infer F}${infer R}`
  ? [F, ...StringToArray<R>][number]
  : never
 */

/**
 * 模式匹配出字符，递归转化为联合类型
 */
type StringToUnion<T extends string> = T extends `${infer F}${infer R}`
  ? F | StringToUnion<R>
  : never

type B<T extends string> = T extends `${infer F}${infer R}` ? F : never
type b1 = B<''>   // never
type b2 = B<'1'>  // 1
// 定义的第一个变量F不能为空，第二个可以为空？！第一个只有一个字符，第二个是剩余的集合。
type C<T extends string> = T extends `${infer F}${infer R}` ? R : never
type c1 = C<''>   // never
type c2 = C<'1'>  // ''
type c3 = C<'12'> // '2'
// 如何取出最后一个字符呢？解法：转化为数组取出最后一位。字符串模式匹配行不行呢？
type A<T extends string> = T extends `${infer F}${infer R}` ? [F, ...A<R>] : []
type PoP<T extends any[]> = T extends [...any[], infer L] ? L : ''
type D<T extends string> = PoP<A<T>>
type d1 = D<''>
type d2 = D<'123'>