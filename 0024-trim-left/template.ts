type Space = ' ' | '\n' | '\t'
/**
 * 字符串模式匹配，取出一个字符是否是空白字符，然后递归处理
 */
type TrimLeft<S extends string> = S extends `${Space}${infer Rest}`
  ? TrimLeft<Rest>
  : S
