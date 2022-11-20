/**
 * U extends { type: T } 分布式条件类型
 */
type LookUp<U, T> = U extends { type: T } ? U : never
