type Falsy = 0 | '' | false | [] | Record<PropertyKey, never>
/**
 * 1. 定义假值 Falsy，空对象要使用 Record<PropertyKey, never>
 * 2. 取出数组每一项对比
 */
type AnyOf<T extends readonly any[]> = T extends [infer F, ...infer R]
  ? F extends Falsy
    ? AnyOf<R>
    : true
  : false
