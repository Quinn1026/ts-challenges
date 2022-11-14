/**
 * 1. (...args: infer K) => any 定义参数列表的类型变量K
 * 2. 条件类型提取出K即可
 */
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer K) => any
  ? K
  : never
