/**
 * 1. [P in F]获取key值
 * 2. 递归
 */
type TupleToNestedObject<T extends any[], U> = T extends [infer F extends PropertyKey, ...infer R]
  ? { [P in F]: TupleToNestedObject<R, U> }
  : U

// type TupleToNestedObject<T extends any[], U> = T extends [infer F, ...infer R]
//   ? { [P in F as P extends PropertyKey ? P : never]: TupleToNestedObject<R, U> }
//   : U
