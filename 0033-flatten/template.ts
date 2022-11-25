/**
 * 1. 遍历类型数组，如果某一项是数组递归处理
 * 2. 只有数组才递归打平
 */
type Flatten<T extends any[]> = T extends [infer K, ...infer R]
  ? K extends any[]
    ? [...Flatten<K>, ...Flatten<R>]
    : [K, ...Flatten<R>]
  : []
