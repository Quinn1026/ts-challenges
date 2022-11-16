/**
 * 1. 返回{}
 * 2. Exclude排除联合类型K
 */
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type MyOmit<T, K extends keyof T> = {
//   [P in Exclude<keyof T, K>]: T[P]
// }
