type UppercaseUnion = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
type LowercaseUnion = Lowercase<UppercaseUnion>
type IsLowerString<T extends string> = T extends LowercaseUnion ? true : false
type StrToArr<S extends string> = S extends `${infer F}${infer R}` ? [F, ...StrToArr<R>] : []
/**
 * S 要分割的字符
 * W 字母字符串
 * A 最终输出的字符数组
 */
type SplitString<
  S extends string,
  W extends string = '',
  A extends string[] = []
> = Uncapitalize<S> extends `${infer F}${infer R}`
  ? R extends ''
    ? Lowercase<F> extends LowercaseUnion
      ? [...A, `${W}${F}`]
      : [...A, W]
    : Lowercase<F> extends LowercaseUnion
      ? SplitString<R, `${W}${F}`, [...A]>
      : SplitString<R, '', [...A, W]>
  : []
type SS = SplitString<'foo bar.hello world'>
/**
 * 1. S 原始字符串；W 单词字符串；Res 最终结果字符串
 * 2. 遍历字符串，将单词字符串暂存到W中，遇到非字母字符，将单词字符串Capitalize后推入到Res中
 * 3. 直到字符遍历完，输出结果Res + W + 最后一个字符
 */
type CapitalizeWords<
  S extends string,
  W extends string = '',
  Res extends string = ''
> = S extends `${infer F}${infer R}`
  ? R extends ''
    ? `${Res}${Capitalize<W>}${F}`
    : Lowercase<F> extends LowercaseUnion
      ? CapitalizeWords<R, `${W}${F}`, Res>
      : CapitalizeWords<R, '', `${Res}${Capitalize<W>}${F}`>
  : ''
