/**
 * https://www.typescriptlang.org/docs/handbook/symbols.html#unique-symbol
 * 1. symbol 作为属性名是独一无二的，不会和其他任何属性名重复
 * 2. unique symbol是symbols的子类型，值只能由Symbol()、Symbol.for()创建，或者通过指定类型来指定一个是这种类型的值
 * 3. 没太懂这个。。。
 */
declare const KEY: unique symbol

type DeepObjectToUniq1<O extends object> = {
  [K in keyof O]: O[K] extends object
    ? DeepObjectToUniq1<O[K]> & { readonly [KEY]?: [O, K] }
    : O[K]
} & { readonly [KEY]?: [O] }

type DeepObjectToUniq<O extends object, U extends readonly any[] = [O]> = {
  [K in keyof O]: O[K] extends object
    ? DeepObjectToUniq<O[K], [...U, K]>
    : O[K]
} & { [K in symbol]: U }
