/**
 * 1. 定义存放结果的Res参数
 * 2. 递归遍历元组，如果不等于F，将元素存入Res中
 * 3. 最终输出Res
 */
type FilterOut1<
  T extends any[],
  F,
  Res extends any[] = []
> = T extends [infer U, ...infer R]
  ? [U] extends [F]
    ? FilterOut1<R, F, Res>
    : FilterOut1<R, F, [...Res, U]>
  : Res
/** 不使用Res变量参数 */
type FilterOut<T extends any[], F> = T extends [infer U, ...infer R]
  ? [...([U] extends [F] ? [] : [U]), ...FilterOut<R, F>]
  : []