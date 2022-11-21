type Space = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer Rest}`
  ? TrimLeft<Rest>
  : S
type TrimRight<S extends string> = S extends `${infer Rest}${Space}`
  ? TrimRight<Rest>
  : S
/**
 * 两者结合，先去掉一侧再去掉另一侧
 */
type Trim<S extends string> = TrimLeft<TrimRight<S>>
