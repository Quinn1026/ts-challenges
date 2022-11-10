/**
 * 1. 数组类型长度用["length"]表示
 * 2. as const只读需要readonly约束
 */
type Length<T extends readonly any[]> = T["length"]
