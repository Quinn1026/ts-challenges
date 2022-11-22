/**
 * 1. 字符串模式匹配取出首字母
 * 2. Uppercase转为大写
 * 注：内置Capitalize
 */
type MyCapitalize<S extends string> = S extends `${infer F}${infer Rest}`
  ? `${Uppercase<F>}${Rest}`
  : S