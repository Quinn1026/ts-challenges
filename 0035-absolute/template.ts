type StringRemoveSymbol<T extends string> = T extends `-${infer S}`
  ? S
  : T
/**
 * 1. 如果是字符串，模式匹配出负号
 * 2. 如果是数值，转化为字符串再处理
 */
// type Absolute<T extends number | string | bigint> = T extends string
//   ? StringRemoveSymbol<T>
//   : T extends number | bigint
//     ? StringRemoveSymbol<`${T}`>
//     : never
/**
 * 1. 直接转化为字符串，不用区分原始类型
 * 2. 去掉负号
 */
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer S}`
  ? S
  : `${T}`
