/** 大于 */
type GreatThan2<
  T extends number,
  U extends number,
  Arr extends unknown[] = []
> = Arr['length'] extends T
  ? false
  : Arr['length'] extends U
    ? true
    : GreatThan2<T, U, [...Arr, unknown]>
/** 数组中的最小值 */
type Min<
  U extends number[],
  Res extends number = -1
> = U extends [infer F extends number, ...infer R extends number[]]
  ? Min<
      R,
      Res extends -1
        ? F
        : GreatThan2<F, Res> extends true
          ? Res
          : F
    >
  : Res
/** 数组T中剔除等于U的元素，只剔除第一个 */
type ArrayExcludeFirst<
  T extends number[],
  U extends number,
  IsDel extends boolean = false,
  Res extends number[] = []
> = T extends [infer F extends number, ...infer R extends number[]]
  ? U extends F
    ? ArrayExcludeFirst<R, U, true, IsDel extends true ? [...Res, F] : Res>
    : ArrayExcludeFirst<R, U, IsDel, [...Res, F]>
  : Res
/**
 * 排序
 * 1. Flag升降序，Len递归次数，Idx索引，Res结果
 * 2. 每次提取数组的最小值，存入Res中，升序存入左侧，降序存入右侧
 * 3. 剩余数组递归处理
 */
type Sort<
  T extends number[],
  Flag extends boolean = false,
  Len extends number = T['length'],
  Idx extends number[] = [],
  Res extends number[] = []
> = Idx['length'] extends Len
  ? Res
  : Sort<ArrayExcludeFirst<T, Min<T>>, Flag, Len, [...Idx, number], Flag extends true ? [Min<T>, ...Res] : [...Res, Min<T>]>
