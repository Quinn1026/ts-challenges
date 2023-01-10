type A1 = { foo: string } extends { foo?: string } ? true : false // true
type A2 = { foo?: string } extends { foo: string } ? true : false // false

type IsRequireKey<T, K extends keyof T> =
  { [P in K]: T[P] } extends { [P in K]-?: T[P] }
    ? true
    : false
/**
 * https://juejin.cn/post/7172144361810067463
 * 1. 根据 {a: 1} extends {a?: 1} is true but {a?: 1} extends {a: 1} is false 找到必要项
 * 2. 使用属性映射筛选出满足条件的项
 */
type GetRequired<T extends Record<PropertyKey, unknown>> = {
  [P in keyof T as IsRequireKey<T, P> extends true ? P : never]: T[P]
}
