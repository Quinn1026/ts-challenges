/**
 * 通过 as 属性映射，通过 never 过滤掉不要的属性
 */
type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P]
}
