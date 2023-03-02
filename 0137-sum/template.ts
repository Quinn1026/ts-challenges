/** 三个数字相加，单个数字 */
type Add<
  A extends number,
  B extends number,
  C extends number = 0
> = [...BuildArray<A>, ...BuildArray<B>, ...BuildArray<C>]['length']
/** FIXME 元组length不满足number类型？暂时不清楚为啥 */
type NumberType<T extends unknown> = T extends number ? T : never
/** 获取十位数字 */
type GetDecade<
  T extends number
> = `${T}` extends `${infer F extends number}${infer R}`
  ? R extends ''
    ? 0
    : F
  : 0
/** 获取个位数字 */
type GetUnit<
  T extends number
> = `${T}` extends `${number}${infer R extends number}`
  ? R
  : T
/** 最大值 */
type MaxLen<
  A extends number,
  B extends number,
  Arr extends unknown[] = []
> = Arr['length'] extends A
  ? B
  : Arr['length'] extends B
    ? A
    : MaxLen<A, B, [...Arr, unknown]>
/** 小于判断 */
type LessThan<
  T extends number,
  U extends number,
  Idx extends unknown[] = []
> = Idx['length'] extends U
  ? false
  : Idx['length'] extends T
    ? true
    : LessThan<T, U, [...Idx, unknown]>
/** 字符串长度 */
type StringLength<
  T extends string,
  Idx extends unknown[] = []
> = T extends `${string}${infer R}`
  ? StringLength<R, [...Idx, unknown]>
  : Idx['length']
/** 字符长度小于Len，则在后面补零 */
type PadEnd<
  T extends string,
  Len extends number
> = LessThan<StringLength<T>, Len> extends true
  ? PadEnd<`${T}0`, Len>
  : T
/** 翻转数字字符串 */
type ReverseNumber<
  T extends string | number | bigint
> = `${T}` extends `${infer F}${infer R}`
  ? `${ReverseNumber<R>}${F}`
  : ''
/**
 * 加法计算
 * 1. 翻转数字字符串，方便从首位开始计算，
 * 2. 从首(个)位开始计算，计算等式：F1 + F2 + Carry
 * 3. 计算完成将结果十位存入进位Carry，个位存入结果Result中(由于字符经过翻转，所以在前面插入字符)
 * 4. 如果两数长度不同，补零继续计算
 * 5. 最后判断进位Carry是否为0，若不是则存入最终结果中
 */
type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint,
  AR extends string = ReverseNumber<A>,
  BR extends string = ReverseNumber<B>,
  Carry extends number = 0,
  Result extends string = ''
> = AR extends `${infer F1 extends number}${infer R1}`
  ? BR extends `${infer F2 extends number}${infer R2}`
    ? Sum<A, B, R1, R2, GetDecade<NumberType<Add<F1, F2, Carry>>>, `${GetUnit<NumberType<Add<F1, F2, Carry>>>}${Result}`>
    : Sum<A, B, R1, '', GetDecade<NumberType<Add<F1, Carry>>>, `${GetUnit<NumberType<Add<F1, Carry>>>}${Result}`>
  : BR extends `${infer F2 extends number}${infer R2}`
    ? Sum<A, B, '', R2, GetDecade<NumberType<Add<F2, Carry>>>, `${GetUnit<NumberType<Add<F2, Carry>>>}${Result}`>
    : Carry extends 0
      ? Result
      : `${Carry}${Result}`
