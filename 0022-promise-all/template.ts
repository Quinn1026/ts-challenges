/**
 * 1. Resolve推导出Promise的类型参数
 * 2. ResolveAll推导出类型参数的数组
 */
type Resolve<T> = T extends Promise<infer K> ? K : T
type ResolveAll<T extends readonly unknown[]> = T extends [infer First, ...infer Others]
  ? [Resolve<First>, ...ResolveAll<Others>]
  : []
declare function PromiseAll<T extends unknown[]>(values: readonly [...T]): Promise<ResolveAll<T>>

// declare function PromiseAll<T extends unknown[]>(values: readonly [...T]): Promise<{
//   [P in keyof T]: T[P] extends Promise<infer K> ? K : T[P]
// }>

// 两种方式貌似等价
type AA<T extends readonly unknown[]> = {
  [P in keyof T]: T[P] extends Promise<infer K> ? K : T[P]
}
type BB<T extends readonly unknown[]> = T extends readonly [infer First, ...infer Others]
  ? readonly [Resolve<First>, ...BB<Others>]
  : []
let x = [1, 2, Promise.resolve(3)] as const
type XX = typeof x
type CC = AA<XX>
type DD = BB<XX>

// 数组 => { [P in T]: T[P] }
let arrAsConst = [1, 3, 5, 7] as const
type ReadonlyArrType = typeof arrAsConst
type ResType<T> = {
  [P in keyof T]: T[P]
}
type Res = ResType<ReadonlyArrType>
