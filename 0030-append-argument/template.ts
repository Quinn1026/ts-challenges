/**
 * 1. (...args: infer P) => infer R 定义参数组合P和函数返回类型R
 * 2. [...P, A] 追加参数
 */
type AppendArgument<Fn extends (...args: any[]) => any, A> = Fn extends (...args: infer P) => infer R
  ? (...args: [...P, A]) => R
  : never
