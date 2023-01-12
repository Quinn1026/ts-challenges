/**
 * 1. 先转化为大驼峰
 * 2. 然后首字母小写 -_-
 * 3. too low...
 */
type BigCamelCase<
  S extends string,
  W extends string = '',
  Res extends string = ''
> = S extends `${infer F}${infer R}`
  ? R extends ''
    ? `${Res}${Capitalize<W>}${Lowercase<F>}`
    : F extends '_'
      ? BigCamelCase<R, '', `${Res}${Capitalize<W>}`>
      : BigCamelCase<R, Lowercase<`${W}${F}`>, Res>
  : Res
type CamelCase1<S extends string> = Uncapitalize<BigCamelCase<S>>
/**
 * 1. 定义一个类型参数 C = Lowercase<S> 全部转化为小写
 * 2. 字符串匹配下横线_，递归时将Capitalize<R>赋值给C，这样下一次递归就保留了首字母大写
 */
type CamelCase2<
  S extends string,
  C extends string = Lowercase<S>
> = C extends `${infer F}_${infer R}`
  ? `${F}${CamelCase2<'', Capitalize<R>>}`
  : C
/**
 * 1. 直接infer三个变量，_前的字符串F，_后字符S(要转大写的)，R剩余字符串
 * 2. F转小写，S转大写，R递归处理
 */
type CamelCase<
  T extends string
> = T extends `${infer F}_${infer S}${infer R}`
  ? `${Lowercase<F>}${Uppercase<S>}${CamelCase<R>}`
  : Lowercase<T>