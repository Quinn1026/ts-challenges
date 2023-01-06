/**
 * 1. 借助 U = [] 递归往里面塞满足的元素
 * 2. 不借助U的话，直接返回[F, ...递归]来实现
 */
// type Filter<
//   T extends any[],
//   P,
//   U extends any[] = []
// > = T extends [infer F, ...infer R]
//   ? F extends P
//     ? Filter<R, P, [...U, F]>
//     : Filter<R, P, U>
//   : U

type Filter<T extends any[], P> = T extends [infer F, ...infer R]
  ? F extends P
    ? [F, ...Filter<R, P>]
    : Filter<R, P>
  : []