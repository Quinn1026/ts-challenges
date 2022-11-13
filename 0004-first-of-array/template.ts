/**
 * 1. infer F 声明变量F表示第一个元素
 * 2. 条件类型取出第一个元素
 */
// type First<T extends any[]> = T["length"] extends 0 ? never : T[0]
// type First<T extends any[]> = T extends [] ? never : T[0]
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never
