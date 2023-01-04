/**
 * 1. 将类型转化为字面量类型，string/number/boolean/symbol/bigint/object
 * 2. 如果是object类型，递归处理
 */
type ToPrimitive<T extends Record<PropertyKey, any>> = {
  [P in keyof T]: T[P] extends string
    ? string
    : T[P] extends number
      ? number
      : T[P] extends boolean
        ? boolean
        : T[P] extends object
          ? ToPrimitive<T[P]>
          : never
}
