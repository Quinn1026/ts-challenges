/**
 * 1. 转化字符串
 * 2. 判断是否有小数点
 * 3. 小数点后面的数字是否为0，为0则是正数，否则never
 * 4. 排除 number 类型
 */
type Integer<T extends number> = `${T}` extends `${infer F}.${infer R}`
  ? R extends '0'
    ? F
    : never
  : number extends T
    ? never
    : T
