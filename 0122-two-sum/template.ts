/**
 * 元组T中两数之和等于期望值U
 * 1. 思路：遍历元组，拿到一项F，获取与期望值的差值(U - F)，然后判断这个差值是否在元组剩余元素中(Include)
 * 2. 减法Minus
 * 3. 是否包含Include，最好只用Equal来判断，目前仅仅使用extends去判断
 * 4. 遍历元组
 */
type BuildArray<T extends number, R extends unknown[] = []> = R['length'] extends T ? R : BuildArray<T, [...R, unknown]>
type Minus<A extends number, B extends number> = BuildArray<A> extends [...infer R, ...BuildArray<B>] ? R['length'] : never
type Include<T extends unknown[], V> = T extends [infer F, ...infer R]
  ? F extends V
    ? true
    : Include<R, V>
  : false
type TwoSum<
  T extends number[],
  U extends number
> = T extends [infer F extends number, ...infer R extends number[]]
  ? Include<R, Minus<U, F>> extends true
    ? true
    : TwoSum<R, U>
  : false
