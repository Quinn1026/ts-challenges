/**
 * 数组类型长度可以直接使用length属性得到，字符串不行
 * 可以讲字符串转化为数组，然后得到长度
 */
type StringToArray<S extends string> = S extends `${infer F}${infer R}`
  ? [F, ...StringToArray<R>]
  : []
type ArrayLength<T extends any[]> = T['length']
/**
* 1. 转化为数组类型
* 2. 求数组的长度
*/
type LengthOfString<S extends string> = ArrayLength<StringToArray<S>>

// type LengthOfString<S extends string, T extends any[] = []> = S extends `${infer F}${infer R}`
//   ? LengthOfString<R, [...T, F]>
//   : T['length']