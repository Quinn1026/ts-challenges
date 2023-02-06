type SplitChar<S extends string> = S extends `${infer F}${infer R}`
  ? F | (R extends '' ? never : SplitChar<R>)
  : ''
/**
 * 1. 将R转化为联合类型
 * 2. 遍历S，如果extends Union<R>，继续递归遍历，否则将此字符存入结果中V
 * 3. 输出V
 */
type DropString<
  S extends string,
  R extends string,
  V extends string = ''
> = R extends ''
  ? S
  : S extends `${infer F}${infer L}`
    ? F extends SplitChar<R>
      ? DropString<L, R, V>
      : DropString<L, R, `${V}${F}`>
    : V
