/**
 * 1. Equal的实现 --- TypeScript issues: [Feature request]type level equal operator #27024
 * 2. T中取出一个值与U判等，若不等递归直到T为[]
 */
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

type Includes<T extends readonly unknown[], U> = T extends [infer First, ...infer Other]
  ? Equal<First, U> extends true
    ? true
    : Includes<Other, U>
  : false
