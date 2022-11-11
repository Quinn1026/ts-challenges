/**
 * 1. T extends 中的T如果不被数组、元组、Promise包裹则属于裸类型
 * 2. 裸类型是联合类型的时候，该条件类型就成为分布式条件类型，会进行分解
 */
type MyExclude<T, U> = T extends U ? never : T
