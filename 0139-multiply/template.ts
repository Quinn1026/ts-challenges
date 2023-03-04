// type BuildArray<
//   T extends number,
//   R extends number[] = []
// > = R['length'] extends T
//   ? R
//   : BuildArray<T, [...R, number]>
type BuildArrs<
  T extends string | number | bigint
> = `${T}` extends `${infer F extends number}`
  ? BuildArray<F>
  : []
/** 三个数字相加，单个数字 */
// type Add<
//   A extends number,
//   B extends number,
//   C extends number = 0
// > = [...BuildArray<A>, ...BuildArray<B>, ...BuildArray<C>]['length']
/** FIXME 元组length不满足number类型？暂时不清楚为啥 */
// type NumberType<T extends unknown> = T extends number ? T : never
/** 获取十位数字 */
type GetDecade1<
  T extends number | string
> = `${T}` extends `${infer F extends number}${infer R}`
  ? R extends ''
    ? 0
    : F
  : 0
/** 获取个位数字 */
type GetUnit1<
  T extends number | string
> = `${T}` extends `${number}${infer R extends number}`
  ? R
  : `${T}` extends `${infer F extends number}`
    ? F
    : ''
/** 翻转数字字符串 */
// type ReverseNumber<
//   T extends string | number | bigint
// > = `${T}` extends `${infer F}${infer R}`
//   ? `${ReverseNumber<R>}${F}`
//   : ''
/** 两数之和 */
// type Sum<
//   A extends string | number | bigint,
//   B extends string | number | bigint,
//   AR extends string = ReverseNumber<A>,
//   BR extends string = ReverseNumber<B>,
//   Carry extends number = 0,
//   Result extends string = ''
// > = AR extends `${infer F1 extends number}${infer R1}`
//   ? BR extends `${infer F2 extends number}${infer R2}`
//     ? Sum<A, B, R1, R2, GetDecade<NumberType<Add<F1, F2, Carry>>>, `${GetUnit<NumberType<Add<F1, F2, Carry>>>}${Result}`>
//     : Sum<A, B, R1, '', GetDecade<NumberType<Add<F1, Carry>>>, `${GetUnit<NumberType<Add<F1, Carry>>>}${Result}`>
//   : BR extends `${infer F2 extends number}${infer R2}`
//     ? Sum<A, B, '', R2, GetDecade<NumberType<Add<F2, Carry>>>, `${GetUnit<NumberType<Add<F2, Carry>>>}${Result}`>
//     : Carry extends 0
//       ? Result
//       : `${Carry}${Result}`
/** 单位数 * 单位数 */
type MultiplySingle<
  A extends string | number | bigint,
  B extends string | number | bigint,
  AA extends unknown[] = BuildArrs<A>,
  Res extends string = ''
> = AA extends [unknown, ...infer R]
  ? MultiplySingle<A, B, R, Sum<Res, B>>
  : Res
/** 10倍数 */
type PadZero<
  T extends number,
  A extends unknown[] = [],
  R extends string = ''
> = A['length'] extends T
  ? R
  : PadZero<T, [...A, unknown], `${R}0`>
type Magnification10<
  T extends number | string | bigint,
  M extends unknown[] = []
> = `${T}${PadZero<M['length']>}`
/** 多位数 * 单位数 */
type MultiplyUnitsDigit<
  A extends string | number | bigint,
  B extends string | number | bigint,
  AR extends string = ReverseNumber<A>,
  Carry extends number = 0,
  Result extends string = ''
> = `${A}` extends '0'
  ? '0'
  : `${B}` extends '0'
    ? '0'
    : AR extends `${infer F}${infer R}`
      ? MultiplyUnitsDigit<
          A,
          B,
          R,
          GetDecade1<Sum<MultiplySingle<F, B>, Carry>>,
          `${GetUnit1<Sum<MultiplySingle<F, B>, Carry>>}${Result}`
        >
      : Carry extends 0
        ? Result
        : `${Carry}${Result}`
/**
 * 乘法
 * 1. A或B == 0，结果就是0
 * 2. 从A个位F开始 --> F * B 
 * 3. 乘以10的倍数 --> Bit补零
 */
type Multiply<
  A extends string | number | bigint,
  B extends string | number | bigint,
  AR extends string = ReverseNumber<A>,
  Bit extends unknown[] = [],
  Result extends string = ''
> = `${A}` extends '0'
  ? '0'
  : `${B}` extends '0'
    ? '0'
    : AR extends `${infer F1}${infer R1}`
      ? Multiply<
          A,
          B,
          R1,
          [...Bit, unknown],
          Sum<Result, Magnification10<MultiplyUnitsDigit<B, F1>, Bit>>
        >
      : Result
