/**
 * 1. keyof T 限制类型都是T的键，联合类型
 * 2. [P in K] 取出所有键
 */
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
