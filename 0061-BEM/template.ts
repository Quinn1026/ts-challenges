/**
 * 1. 模板字符串里面还可以使用模板字符串
 * 2. 在模板字符串中判空
 */
type BEM<B extends string, E extends string[], M extends string[]> =
  `${B}${E extends [] ? '' : `__${E[number]}`}${M extends [] ? '' : `--${M[number]}`}`
