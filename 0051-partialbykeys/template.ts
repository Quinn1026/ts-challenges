// type Clone<T> = Pick<T, keyof T>
type Clone<T> = {
  [P in keyof T]: T[P]
}
// type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]>; } : T
/**
 * 1. 重点在于 Clone 没它过不了测试用例...欲哭无泪
 * 2. Equal 与 Alike 不同点：Alike 会用 MergeInsertions 合并
 */
type PartialByKeys<T, K extends PropertyKey = keyof T> =
// Clone<Omit<T, K> & {
//   [P in Extract<keyof T, K>]?: T[P]
// }>
Clone<Omit<T, K> & Partial<Pick<T, Extract<keyof T, K>>>>
