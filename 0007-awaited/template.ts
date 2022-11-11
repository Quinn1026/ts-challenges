/**
 * 1. T extends Promise<unknown> 限制类型参数
 * 2. T extends Promise<infer R> 定义类型参数R
 * 3. R extends Promise<unknown> 判断R是否也是Promise
 * 4. 是则递归
 * exp. 考虑使用 PromiseLike<T>
 */
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer R>
  ? R extends Promise<unknown>
    ? MyAwaited<R>
    : R
  : never
