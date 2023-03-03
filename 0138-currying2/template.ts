type Curried2<
  Args extends unknown[],
  V extends unknown
> = <A extends unknown[]>(...args: A) => Args extends [...A, ...infer R]
  ? R extends []
    ? V
    : Curried2<R, V>
  : void

declare function DynamicParamsCurrying<
  Args extends unknown[],
  V extends unknown
>(fn: (...args: Args) => V): Curried2<Args, V>
