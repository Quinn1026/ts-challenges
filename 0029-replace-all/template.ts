/**
 * 1. 自左向右依次（递归）替换
 */
type ReplaceAll<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer F}${From}${infer R}`
    ? `${F}${To}${ReplaceAll<R, From, To>}`
    : S
