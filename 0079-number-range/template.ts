type BuildArr<T extends number, A extends unknown[] = []> = A['length'] extends T ? A : BuildArr<T, [...A, unknown]>
type GreatThan<T extends number, S extends number> = BuildArr<T> extends [...unknown[], ...BuildArr<S>] ? true : false
/**
 * 1. 构建 大于等于 类型，构建一个递归次数的数组T，构建存放结果的Res
 * 2. 当 T['lenght'] >= L 将T['length']存入Res中
 * 3. 当 T['length'] == H 则输出Res
 */
type NumberRange<
  L extends number,
  H extends number,
  T extends unknown[] = [],
  Res = never
> = T['length'] extends H
? Res | T['length']
: GreatThan<T['length'], L> extends true
  ? NumberRange<L, H, [...T, unknown], Res | T['length']>
  : NumberRange<L, H, [...T, unknown], Res>

type a1 = NumberRange<2, 9>
type a2 = NumberRange<0, 3>