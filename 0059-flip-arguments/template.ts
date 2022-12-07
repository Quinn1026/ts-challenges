type Reversed<T extends any[]> = T extends [infer F, ...infer R]
  ? [...Reversed<R>, F]
  : []
/**
 * 1. 收窄T类型为函数
 * 2. Reversed反转参数列表
 */
type FlipArguments<T extends (...args: any[]) => any> =
  T extends (...args: infer P) => infer R ? (...args: Reversed<P>) => R : T
