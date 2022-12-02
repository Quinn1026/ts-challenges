/**
 * 02595-medium-pickbytype
 * as 接口属性重映射
 * 根据条件类型返回一个 never 过滤掉一些属性
 */
 type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}
