/**
 * 1. 定义数组 A 来做计数器，默认值为1
 * 2. 判断infer F是否是数组，是递归处理
 * 3. 判断计数器 A['length'] == C，相等则不再处理
 */
type FlattenDepth<T extends unknown[], C extends number = 1, A extends 1[] = []> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? A['length'] extends C
      ? T
      : [...FlattenDepth<F, C, [...A, 1]>, ...FlattenDepth<R, C, A>]
    : [F, ...FlattenDepth<R, C, A>]
  : T
