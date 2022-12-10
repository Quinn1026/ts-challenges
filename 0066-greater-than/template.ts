type NumberToArray<
  T extends number,
  A extends unknown[] = []
> = A['length'] extends T
  ? A
  : NumberToArray<T, [...A, unknown]>
/**
 * 1. 数字构建为数组 NumberToArray
 * 2. [...NumberToArray<U>, unknown, ...unknown[]] 来判断是否包含U数组
 * 3. 包含则是大于，否则小于
 */
type GreaterThan<
  T extends number,
  U extends number
> = NumberToArray<T> extends [...NumberToArray<U>, unknown, ...unknown[]]
  ? true
  : false
