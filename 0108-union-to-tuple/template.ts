/**
 * 重点：1. 获取联合类型的其中一项；2. 将此项存入数组中
 * 1. 通过UninoToCrossFn将联合类型转换为函数参数的交叉类型
 * 2. 通过GetCrossLast获取上一步1中交叉类型最后一项参数，也就是取出了原始联合类型的最后一项
 * 3. 递归
 */

type UninoToCrossFn<T> = (
  T extends T ? (x: () => T) => void : never
) extends (x: infer R) => void
  ? R
  : never

type TA1 = UninoToCrossFn<'a' | 'b'> // (() => "a") & (() => "b")

type GetCrossLast<T> = T extends () => infer R ? R : never

type TA2 = GetCrossLast<TA1> // "b"

type UnionToTuple<
  T,
  U extends unknown[] = []
> = [T] extends [never]
  ? U
  : [
    ...UnionToTuple<Exclude<T, GetCrossLast<UninoToCrossFn<T>>>>,
    GetCrossLast<UninoToCrossFn<T>>
  ]

type TA3 = UnionToTuple<'a' | 'b'> // ["a", "b"]
type TA4 = UnionToTuple<'any' | 'a'> // ["a", "any"]
