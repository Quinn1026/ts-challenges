type UnionToIntersection1<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never
type I = UnionToIntersection1<'foo' | 'bar'> // 'foo' & 'bar' --> never
type II = UnionToIntersection1<(() => 'foo') | ((i: 42) => true)> // (() => 'foo') & ((i: 42) => true)

/**
 * 1. ↑ U是泛型，U extends U 分布式条件 ↑
 * 2. ↓ A0不是泛型 ↓
 */
type A0 = 'foo' | 'bar'
type B0 = A0 extends any ? (arg: A0) => any : never // (arg: A0) => any
type C0 = B0 extends ((arg: infer I) => void) ? I : never // 'foo' | 'bar'

type B1<U = A0> = U extends any ? (arg: U) => any : never
type C1 = B1 extends ((arg: infer I) => void) ? I : never // 'foo' & 'bar' --> never

/**
 * https://github.com/type-challenges/type-challenges/issues/122
 * 1. UnionToFunctionUnion 将联合类型每一项转化为函数的参数
 * 2. 定义函数的参数类型Arg 参考Boo
 */
type UnionToFunctionUnion<U> = U extends unknown
  ? (arg: U) => unknown
  : never
type UnionToIntersection<U> = UnionToFunctionUnion<U> extends (arg: infer Arg) => unknown
  ? Arg
  : never

type FF = (() => 'foo') & ((i: 42) => true) // (() => 'foo') & ((i: 42) => true)
type UU = 'foo' & 42 & true // never

type Foo<T> = T extends { a: infer U; b: infer U } ? U : never
type T1 = Foo<{ a: string; b: number }> // string | number
type T2 = Foo<{ a: string; b: string }> // string
type Boo<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never
type T3 = Boo<{ a: (x: string) => void; b: (x: number) => void }> // string & number --> never
type T4 = Boo<{ a: (x: string) => void; b: (x: string) => void }> // string
