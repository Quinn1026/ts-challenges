enum Comparison {
  Greater,
  Equal,
  Lower,
}
/** 是否是负数 */
type IsNegative<T extends number> = `${T}` extends `-${number}` ? true : false
/** 取正 */
type Absolute<T extends number> = `${T}` extends `-${infer F extends number}` ? F : T
/** 大于判断 */
type GreatThan<
  T extends number,
  U extends number,
  Arr extends unknown[] = []
> = Arr['length'] extends T
  ? false
  : Arr['length'] extends U
    ? true
    : GreatThan<T, U, [...Arr, unknown]>
/** 获取字符串的长度 */
type StringLength<
  T extends string,
  V extends unknown[] = []
> = T extends `${string}${infer R}`
  ? StringLength<R, [...V, unknown]>
  : V['length']
/** 比较长度【相同】正数的大小 */
type ComparaSameLength<
  A extends string,
  B extends string
> = A extends `${infer AF extends number}${infer AR}`
  ? B extends `${infer BF extends number}${infer BR}`
    ? AF extends BF
      ? ComparaSameLength<AR, BR>
      : GreatThan<AF, BF> extends true
        ? Comparison.Greater
        : Comparison.Lower
    : Comparison.Equal
  : Comparison.Equal
/** 比较长度【不同】正数的大小 */
type ComparaDifferentLength<
  A extends string,
  B extends string
> = GreatThan<StringLength<A>, StringLength<B>> extends true
  ? Comparison.Greater
  : Comparison.Lower
/**
 * 比较整数的大小
 * 1. 正数 > 0 > 负数
 * 2. 长度不同：
 *    正数：长度比较，长的比较大，短的比较小；
 *    负数：长度比较，长的比较小，短的比较大；
 * 3. 长度相同：
 *    正数：按位比较，相同继续比较下一位，大则大
 *    负数：按位比较，相同继续比较下一位，大则小
 */
type Comparator<
  A extends number,
  B extends number
> = A extends B
  ? Comparison.Equal
  : IsNegative<A> extends true
    ? IsNegative<B> extends true
      ? StringLength<`${A}`> extends StringLength<`${B}`>
        ? ComparaSameLength<`${Absolute<B>}`, `${Absolute<A>}`>
        : ComparaDifferentLength<`${B}`, `${A}`>
      : Comparison.Lower
    : IsNegative<B> extends true
      ? Comparison.Greater
      : StringLength<`${A}`> extends StringLength<`${B}`>
        ? ComparaSameLength<`${A}`, `${B}`>
        : ComparaDifferentLength<`${A}`, `${B}`>
