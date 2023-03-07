// M => minuend, S => subtrahend
/** 构建数组 */
type Build<T extends number, R extends number[] = []> = R['length'] extends T ? R : Build<T, [...R, number]>
/** 去掉字符串头部的0 */
type RemoveHeader0<T extends string> = T extends `0${infer R}` ? RemoveHeader0<R> : T
/** 简易减法 */
type MiniSubtract<T extends number, U extends number> = Build<T> extends [...Build<U>, ...infer R] ? R['length'] : -1
/** 简易加法 */
type ToNum1<T> = T extends number ? T : never
type MiniSum<T extends number, U extends number> = ToNum1<[...Build<T>, ...Build<U>]['length']>
/** 负数判断 */
type IsNegative1<T extends number> = `${T}` extends `-${number}` ? true : false
/** 求绝对值 */
type Absoluta<T extends number> = `${T}` extends `-${infer F extends number}` ? F : T
/** 字符串长度 */
type StringLength1<
  T extends string,
  Idx extends unknown[] = []
> = T extends `${string}${infer R}`
  ? StringLength1<R, [...Idx, unknown]>
  : Idx['length']
/** 字符串转数字 */
type StrToNum<T extends string> = T extends `${infer N extends number}` ? N : never
/** 翻转数字字符串 */
type ReverseNumber1<
  T extends string | number | bigint
> = `${T}` extends `${infer F}${infer R}`
  ? `${ReverseNumber1<R>}${F}`
  : ''
/** 大于 */
type GreatThan3<
  T extends number,
  U extends number,
  Arr extends unknown[] = []
> = Arr['length'] extends T
  ? false
  : Arr['length'] extends U
    ? true
    : GreatThan3<T, U, [...Arr, unknown]>
/** 比较相同长度的数字大小 */
type CompareEqualLengthNum<
  A extends string,
  B extends string
> = A extends `${infer AF extends number}${infer AR}`
  ? B extends `${infer BF extends number}${infer BR}`
    ? GreatThan3<AF, BF> extends true
      ? true
      : CompareEqualLengthNum<AR, BR>
    : false
  : false
/** 比较数字大小 */
type GreatThanForString<
  A extends string,
  B extends string
> = GreatThan3<StringLength1<A>, StringLength1<B>> extends true
  ? true
  : GreatThan3<StringLength1<B>, StringLength1<A>> extends true
    ? false
    : CompareEqualLengthNum<A, B>
// 拓展简易减法支持负数 T - U
type Sub<
  T extends number,
  U extends number
> = T extends U
  ? 0
  : IsNegative1<T> extends true
    ? StrToNum<`-${MiniSum<Absoluta<T>, U>}`>
    : GreatThan3<T, U> extends false
      ? StrToNum<`-${MiniSubtract<U, T>}`>
      : MiniSubtract<T, U>
/** 减法输出字符串 */
type SubtractString<
  A extends number,
  B extends number,
  AR extends string = ReverseNumber1<A>,
  BR extends string = ReverseNumber1<B>,
  Borrow extends number = 0,
  Res extends string = ''
> = AR extends `${infer F1 extends number}${infer R1}`
  ? BR extends `${infer F2 extends number}${infer R2}`
    ? IsNegative1<Sub<Sub<F1, Borrow>, F2>> extends true
      ? SubtractString<A, B, R1, R2, 1, `${Sub<10, Absoluta<Sub<Sub<F1, Borrow>, F2>>>}${Res}`>
      : SubtractString<A, B, R1, R2, 0, `${Sub<Sub<F1, Borrow>, F2>}${Res}`>
    : SubtractString<A, B, R1, '0', 0, `${Sub<F1, Borrow>}${Res}`>
  : Res
/**
 * 减法
 * 1. 从个位开始计算，F1 - F2，若F1小，则借位当10：10 - (F2 - F1)
 * 2. 从十位开始，要考虑减去借位，然后递归
 * 3. 支持很大的数字相减
 */
type Subtract<
  M extends number,
  S extends number
> = M extends S
  ? 0
  : GreatThanForString<`${M}`, `${S}`> extends false
    ? never
    : StrToNum<RemoveHeader0<SubtractString<M, S>>>

/** 不支持大数字相减 */
// type Subtract<
//   M extends number,
//   S extends number
// > = M extends S
// ? 0
// : GreatThanForString<`${M}`, `${S}`> extends false
//   ? never
//   : MiniSubtract<M, S>
