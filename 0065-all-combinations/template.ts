type StringToUnion<S extends string> = S extends `${infer F}${infer R}` ? F | StringToUnion<R> : ''
type a = StringToUnion<'ABCD'> // "" | "A" | "B" | "C" | "D"
/**
 * 1. T = StringToUnion<S> 转化为联合类型
 * 2. 将联合类型分离 U = T
 * 3. U extends U 分布式条件，需要每次将用到的 U 从 T 中删去
 * 4. '' = '' + '' + ''; 'A' = 'A' + '' + ''; 'AB' = 'A' + 'B' + '';
 * 5. U extends '' ? T : Exclude<T, U>> 如果是''就用上，不是就剔除掉以防出现'AA'
 * 6. 递归次数确定，S extends `${string}${infer R}` 每次递归去掉一个字符。递归次数就是字符串长度
 * https://github.com/type-challenges/type-challenges/issues/16430
 */
type AllCombinations<
  S extends string,
  T extends string = StringToUnion<S>,
  U extends string = T
> = S extends `${string}${infer R}`
  ? U extends U
    ? `${U}${AllCombinations<R, U extends '' ? T : Exclude<T, U>>}`
    : never
  : ''

type b = AllCombinations<'ABC'>
