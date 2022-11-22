/**
 * 1. 字符串模式匹配`${infer F}${From}${infer R}`
 * 2. 判断From为空情况
 */
type Replace<S extends string, From extends string, To extends string> = S extends `${infer F}${From}${infer R}`
  ? From extends ''
    ? S
    : `${F}${To}${R}`
  : S
