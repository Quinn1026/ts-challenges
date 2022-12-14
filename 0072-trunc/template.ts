type NumberToString<T> = T extends string ? T : T extends number ? `${T}` : never
/**
 * 1. 逐个字符判断是否是.
 * 2. 是输出结果字符，不是继续递归
 */
type Trunc2<T, Res extends string = ''> = NumberToString<T> extends `${infer F}${infer R}`
  ? F extends '.'
    ? Res
    : Trunc2<R, `${Res}${F}`>
  : Res
/**
 * 模板字符串YYDS
 */
type Trunc<T extends number | string> =
  `${T}` extends `${infer A }.${string}` ? A : `${T}`
