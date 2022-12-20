type BuildArr<T extends number, A extends unknown[] = []> = A['length'] extends T ? A : BuildArr<T, [...A, unknown]>
type GreatThan<T extends number, S extends number> = BuildArr<T> extends [...unknown[], ...BuildArr<S>] ? true : false
/**
 * 1. 构建 大于等于 类型，构建一个递归次数的数组T，构建存放结果的Res
 * 2. 当 T['lenght'] >= L 将T['length']存入Res中
 * 3. 当 T['length'] == H 则输出Res
 */
// type NumberRange<
//   L extends number,
//   H extends number,
//   T extends unknown[] = [],
//   Res = never
// > = T['length'] extends H
// ? Res | T['length']
// : GreatThan<T['length'], L> extends true
//   ? NumberRange<L, H, [...T, unknown], Res | T['length']>
//   : NumberRange<L, H, [...T, unknown], Res>

/**
 * 1. 两个计数器 CArr 和 OArr，OArr长度比CArr多1
 * 2. 小于L时，CArr 和 OArr都 +1
 * 3. 等于L时，将OArr长度作为 L 递归处理，接下来每一次递归都是等于L，直到CArr等于H输出结果
 */
// type NumberRange<
//   L extends number,
//   H extends number,
//   CArr extends any[] = [],
//   OArr extends unknown[] = [unknown],
//   R extends number = H
// > = H extends CArr['length']
//   ? R
//   : L extends CArr['length']
//     ? NumberRange<OArr['length'], H, [any, ...CArr], [unknown, ...OArr], L | R>
//     : NumberRange<L, H, [...CArr, any], [unknown, ...OArr]>

/**
 * 1. Tuple 根据长度构建元组，每一项是never
 * 2. [][number] 获取每一项的联合类型
 * 3. A 作为计数器，起始值是 L 构建的元组，其中每一项为never
 * 4. 相当于从0-L是never，L-H是数字(A长度即当前数字)，然后通过[number]获取其联合类型
 */
type Tuple<L extends number, A extends never[] = []> = A['length'] extends L
  ? A
  : Tuple<L, [...A, never]>

type a0 = Tuple<2> // [never, never]
type a1 = [...a0, 1, 2][number] // never | 1 | 2 ---> 1 | 2

type NumberRange<
  L extends number,
  H extends number,
  A extends number[] = Tuple<L>
> = A['length'] extends H
  ? [...A, A['length']][number]
  : NumberRange<L, H, [...A, A['length']]>

type a9 = NumberRange<2, 9>