/**
 * 0. 使用f(n) = f(n-1) + f(n-2)会出现【实例化过深】的报错
 * 1. T == C['length']
 * 2. F1 当前项(初始为[]，也就是0)、F2 下一项
 * 3. 最终结果取 F1['length']
 */
type Fibonacci<
  T extends number,
  C extends unknown[] = [],
  F1 extends unknown[] = [],
  F2 extends unknown[] = [unknown],
> = T extends C['length']
  ? F1['length']
  : Fibonacci<T, [unknown, ...C], F2, [...F1, ...F2]>
