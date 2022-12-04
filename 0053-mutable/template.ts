/**
 * 1. Record<PropertyKey, any> 收窄对象和数组
 * 2. -readonly 去掉只读
 */
type Mutable<T extends Record<PropertyKey, any>> = {
  -readonly [P in keyof T]: T[P]
}
