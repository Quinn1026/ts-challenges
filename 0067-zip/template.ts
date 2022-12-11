/**
 * 1. 索引位一一对应，没有则为空
 * 2. 递归
 * 3. { P in keyof T }: P extends keyof U ? [T[P], U[P]] : never 不行！数组会出现never选项
 */
type Zip<
  T extends unknown[],
  U extends unknown[]
> = T extends [infer FT, ...infer RT]
  ? U extends [infer FU, ...infer RU]
    ? [[FT, FU], ...Zip<RT, RU>]
    : []
  : []

type a = Zip<[1, 2, 3], ['1', '2']> // [[1, "1"], [2, "2"]]
type b = Zip<[], ['1', '2']> // []
type c = Zip<[1, 2, 3], []> // []