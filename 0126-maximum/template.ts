/**
 * 元组的最大值
 * 1. 转数组比较大小
 * 2. 取前一项与后一项比较，保存较大的一项，然后递归比较
 */
type MaxNum<
  A extends number,
  B extends number,
  Len extends unknown[] = []
> = Len['length'] extends A
  ? B
  : Len['length'] extends B
    ? A
    : MaxNum<A, B, [...Len, unknown]>
type BuildArray1<T extends number, A extends unknown[] = []> = A['length'] extends T ? A : BuildArray1<T, [...A, unknown]>
type GreatThan1<
  T extends unknown[],
  S extends unknown[]
> = T extends [...S, ...unknown[]]
  ? true
  : false
type Maximum<
  T extends number[],
  M extends number = never
> = T extends [infer F extends number, ...infer R extends number[]]
  ? [M] extends [never]
    ? Maximum<R, F>
    : Maximum<R, GreatThan1<BuildArray1<M>, BuildArray1<F>> extends true ? M : F>
  : M
