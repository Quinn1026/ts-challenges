type IsRequireKey1<T, K extends keyof T> =
  { [P in K]: T[P] } extends { [P in K]-?: T[P] }
    ? true
    : false
/**
 * https://juejin.cn/post/7172144361810067463
 * 1. 根据 {a: 1} extends {a?: 1} is true but {a?: 1} extends {a: 1} is false 找到非必要项
 * 2. 使用属性映射筛选出满足条件的项
 */
type GetOptional<T extends Record<PropertyKey, unknown>> = {
  [P in keyof T as IsRequireKey1<T, P> extends true ? never : P]: T[P]
}
