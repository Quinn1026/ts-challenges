/**
 * 1. U extends unknown 分布式条件取得联合类型每一项
 * 2. P extends T / P extends keyof Y 判断 T 和 keyof Y 是否有 P
 * 3. 有则替换
 */
type ReplaceKeys<U, T, Y> = U extends unknown
  ? {
    [P in keyof U]: P extends T
      ? P extends keyof Y
        ? Y[P]
        : never
      : U[P]
  }
  : never
