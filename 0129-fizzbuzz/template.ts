/**
 * FizzBuzz 生成递增的元组
 * 1. 遇到3的倍数 替换为Fizz
 * 2. 遇到5的倍数 替换为Buzz
 * 3. 遇到3和5的倍数 替换为FizzBuzz
 * 思路：
 * 1. 除法
 * 2. 计数Count数组，初始长度为1
 * 3. 结果Res数组，其中的元素即使递归中Count的长度
 * 4. 判断当前元素除以3除以5是否满足条件，满足条件则替换
 */
type BuildArray2<T extends number, A extends unknown[] = []> = A['length'] extends T ? A : BuildArray2<T, [...A, unknown]>
type LessThan1<
  T extends number,
  S extends number
> = BuildArray2<S> extends [...unknown[], unknown, ...BuildArray2<T>]
  ? true
  : false
type Minus1<T extends number, N extends number> = BuildArray2<T> extends [...BuildArray2<N>, ...infer F] ? F['length'] : 0
type Multiple<
  T extends number,
  N extends number
> = T extends 0
  ? true
  : LessThan1<T, N> extends true
    ? false
    : Multiple<Minus1<T, N>, N>
type AddOne<T extends number> = [...BuildArray2<T>, unknown]['length']
type FizzBuzz1<
  N extends number,
  Count extends unknown[] = [unknown], // 计数，从1开始计数
  Res extends string[] = []            // 结果
> = Count['length'] extends AddOne<N>
  ? Res
  : FizzBuzz1<
    N,
    [unknown, ...Count],
    [
      ...Res,
      Multiple<Count['length'], 3> extends true
        ? Multiple<Count['length'], 5> extends true
          ? 'FizzBuzz'
          : 'Fizz'
        : Multiple<Count['length'], 5> extends true
          ? 'Buzz'
          : `${Count['length']}`
    ]
  >

/** 大佬的解法 */
type FizzBuzz<
  T extends number,
  T1 extends number[] = [],
  T2 extends number[] = [],
  I extends unknown[] = []
> = I['length'] extends T
  ? I
  : T1['length'] extends 2
    ? T2['length'] extends 4
      ? FizzBuzz<T, [], [], [...I, 'FizzBuzz']>
      : FizzBuzz<T, [], [...T2, 0], [...I, 'Fizz']>
    : T2['length'] extends 4
      ? FizzBuzz<T, [...T1, 0], [], [...I, 'Buzz']>
      : FizzBuzz<T, [...T1, 0], [...T2, 0], [...I, `${I extends unknown[] ? [...I, 0]['length'] : never}`]>

// JS实现
/**
 * FizzBuzz 生成从一开始递增的数组
 * 遇到3的倍数 替换为Fizz
 * 遇到5的倍数 替换为Buzz
 * 遇到3和5的倍数 替换为FizzBuzz
 * @param {Number} num
 */
// function fizzBuzz (length) {
//   return Array.from({ length }).map((_, index) => {
//     const item = index + 1
//     if (item % 3 === 0 && item % 5 === 0) return 'FizzBuzz'
//     if (item % 3 === 0) return 'Fizz'
//     if (item % 5 === 0) return 'Buzz'
//     return `${item}`
//   })
// }
