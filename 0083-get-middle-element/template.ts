/**
 * 1. 每次取出头尾两个元素
 * 2. 判断中间元素是否是空，为空表示元组遍历结束，直接输出[F, R]
 */
type GetMiddleElement<
  T extends unknown[]
> = T extends [infer F, ...infer M, infer R]
  ? M extends []
    ? [F, R]
    : GetMiddleElement<M>
  : T
