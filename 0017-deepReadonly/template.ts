/**
 * 1. 所有属性设置readonly
 * 2. 通过 keyof T[P] extends never 判断是否有子属性
 */
type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>
}
