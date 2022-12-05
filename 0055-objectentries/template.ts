/**
 * 1. 新增类型参数 K extends keyof T
 * 2. 分布式条件处理每一项，注意可选项会有 undefined 需要处理掉
 * 太差了，下面看看大佬的表演
 */
type ObjectEntries1<T extends Record<PropertyKey, any>, K extends keyof T = keyof T> =
  K extends keyof T ? [K, T[K] extends undefined ? undefined : Required<T>[K]] : never
/**
 * 合并映射类型的处理结果为联合类型 https://mp.weixin.qq.com/s/36x-zQ2e0ZcVam0YdpR7_A
 * 1. T[keyof T] 可以获取值的联合类型
 * 2. 去掉可选，去掉 undefined，将值映射为我们需要的[key, value]形式，最后通过T[keyof T]获取其值的联合类型
 */
type ObjectEntries<T extends Record<PropertyKey, any>> = {
  [P in keyof T]-?: [P, T[P] extends infer R | undefined ? R : T[P]]
}[keyof T]
