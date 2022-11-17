/**
 * 1. T[number] -> 即可得到元组的联合类型
 */
type TupleToUnion<T extends any[]> = T[number]

// type TupleToUnion<T extends any[]> = T extends (infer U)[] ? U : never
