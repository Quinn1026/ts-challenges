/**
 * 1. - readonly 去掉只读
 * 2. 从object中去掉Function类型，然后递归处理
 */
type DeepMutable<T extends Record<PropertyKey, any>> = {
  - readonly [P in keyof T]: T[P] extends Record<PropertyKey, any>
    ? T[P] extends Function
      ? T[P]
      : DeepMutable<T[P]>
    : T[P]
}
