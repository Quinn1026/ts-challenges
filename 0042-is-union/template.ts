/**
 * 1. [T] extends [never] 先剔除 never
 * 2. T extends never 排除联合类型中的 never
 * 3. [K] extends [T] 判断是否是联合类型
 */
type IsUnion<T, K = T> = [T] extends [never]
  ? false
  : T extends never
    ? false
    : [K] extends [T]
      ? false
      : true
