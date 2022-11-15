/**
 * 1. (...args: any) 参数声明any
 * 2. infer R 定义返回的类型
 */
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R
  ? R
  : never
