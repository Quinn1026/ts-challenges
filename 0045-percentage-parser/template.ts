type PlusOrMinus = '+' | '-'
/**
 * 1. 返回一个数组，[+|-, num, %]
 * 2. 每个元素判断是否符合，不符合置空
 */
type PercentageParser<A extends string> = [
  A extends `${infer F}${string}`
    ? F extends PlusOrMinus
      ? F
      : ''
    : '',
  A extends `${PlusOrMinus}${infer R}%`
    ? R
    : A extends `${PlusOrMinus}${infer R}`
      ? R
      : A extends `${infer R}%`
        ? R
        : A,
  A extends `${string}%`
    ? '%'
    : ''
]

type a1 = PercentageParser<'+100%'>