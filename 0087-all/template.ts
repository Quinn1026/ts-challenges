/**
 * 1. 取出元组每一项去比较
 * 2. 或者直接获取元组的联合类型T[number], 如果都相等，则联合类型只会有一项
 */
type All<T extends any[], S> = T extends [infer F, ...infer R]
  ? F extends S
    ? All<R, S>
    : false
  : true

type All1<T extends any[], S> = T[number] extends S ? true : false

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
type All2<T extends any[], S> = Equal<T[number], S>