type CapitalizeKey<S extends string> =
  S extends `${infer F}_${infer R}` ? `${F}${CapitalizeKey<Capitalize<R>>}` : S
/**
 * 1. CapitalizeKey 将下横线转化为小驼峰
 * 2. 通过as将key值映射为小驼峰
 * 3. 单独处理数组的情况
 */
type Camelize<T extends Record<string, any>> = T extends unknown[]
  ? T extends [infer F, ...infer R]
    ? F extends Record<string, any>
      ? [Camelize<F>, ...Camelize<R>]
      : [F, ...Camelize<R>]
    : []
  : T extends Record<string, unknown>
    ? {
        [
          P in keyof T as P extends string
          ? CapitalizeKey<P>
          : P
        ]: Camelize<T[P]>
      }
    : T

