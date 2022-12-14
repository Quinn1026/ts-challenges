type ArrOrStrToUnion<T> = T extends unknown[] ? T[number] : T
type Without<T extends any[], U, Res extends any[] = []> = T extends [infer F, ...infer R]
  ? F extends ArrOrStrToUnion<U>
    ? Without<R, U, Res>
    : Without<R, U, [...Res, F]>
  : Res
/** ↑↑ 提取一下 ↑↑ */
type Without2<T extends any[], U, Res extends any[] = []> = T extends [infer F, ...infer R]
  ? U extends any[]
    ? F extends U[number]
      ? Without2<R, U, Res>
      : Without2<R, U, [...Res, F]>
    : U extends number
      ? F extends U
        ? Without2<R, U, Res>
        : Without2<R, U, [...Res, F]>
      : Res
  : Res

/**
 * 1. U extends unknown[] ? U[number] : U 值或者值的联合类型
 * 2. 递归处理
 */
type Without3<T extends unknown[], U> = T extends [infer F, ...infer R]
  ? [
      ...(F extends (U extends unknown[] ? U[number] : U) ? [] : [F]),
      ...Without3<R, U>
    ]
  : []

