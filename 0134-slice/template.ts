/** 判断是否是负数 */
type IsNegative<T extends number> = `${T}` extends `-${number}` ? true : false
/** 取负数的绝对值 */
type AbsoluteNumber<T extends number> = `${T}` extends `-${infer F extends number}` ? F : T
// type BuildArray<T extends number, R extends unknown[] = []> = R['length'] extends T ? R : BuildArray<T, [...R, unknown]>
/** 字符串转数字 */
type StrToNumber<T extends string> = T extends `${infer F extends number}` ? F : never
/** 取数值的负值 */
type Negative<T extends number> = `${T}` extends `-${infer F}`
  ? StrToNumber<F>
  : `${T}` extends `${infer F}`
    ? StrToNumber<`-${F}`>
    : never
/** 减法 */
type MinusNumber<
  T extends number,
  U extends number,
> = BuildArray<T> extends [...infer R, ...BuildArray<U>]
  ? R['length']
  : BuildArray<U> extends [...infer R, ...BuildArray<T>]
    ? Negative<R['length']>
    : never
/** 将负数索引转化为正数 */
type TransitionIndex<
  T extends number,
  Len extends number
> = IsNegative<T> extends true
  ? MinusNumber<Len, AbsoluteNumber<T>>
  : T
/** 大于等于 */
type GreatEqualThan<
  T extends number,
  U extends number,
  Arr extends unknown[] = []
> = Arr['length'] extends U
  ? true
  : Arr['length'] extends T
    ? false
    : GreatEqualThan<T, U, [...Arr, unknown]>
/** 是否在范围内 */
type IsInRange<
  Num extends number,
  Start extends number,
  End extends number,
> = GreatEqualThan<Num, Start> extends true
  ? GreatEqualThan<Num, End> extends false
    ? true
    : false
  : false
/**
 * 截取元组：从起始位置(包含)到结束位置(不包含)
 * 1. Start 默认值0，End 默认值元组Arr长度
 * 2. Idx 元组Arr的索引下标
 * 3. IsInRange 判断下标是否在[Start, End)范围内
 * 4. TransitionIndex将负值下标转化为对应的正值
 * 5. 递归遍历元组Arr
 */
type Slice<
  Arr extends unknown[],
  Start extends number = 0,
  End extends number = Arr['length'],
  Idx extends unknown[] = [],
  Res extends unknown[] = [],
  Len extends number = Arr['length']
> = Arr extends [infer F, ...infer R]
  ? IsInRange<Idx['length'], TransitionIndex<Start, Len>, TransitionIndex<End, Len>> extends true
    ? Slice<R, TransitionIndex<Start, Len>, TransitionIndex<End, Len>, [...Idx, unknown], [...Res, F]>
    : Slice<R, TransitionIndex<Start, Len>, TransitionIndex<End, Len>, [...Idx, unknown], Res>
  : Res
