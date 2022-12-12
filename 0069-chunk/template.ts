/**
 * 1. C 存放一个chunk中的元素，V 是最终结果
 * 2. C['length'] == N 满足就推入 V
 * 3. 如果拆分每一部分长度都相同，则 C['length'] == 0，返回最终结果 V
 * 4. 如果最后一次 C['length'] != 0，将最后一部分 C 推入到结果中
 */
type Chunk<
  T extends unknown[],
  N extends number,
  C extends unknown[] = [],
  V extends unknown[] = [],
> = T extends [infer F, ...infer R]
  ? C['length'] extends N
    ? Chunk<R, N, [F], [...V, C]>
    : Chunk<R, N, [...C, F], V>
  : C['length'] extends 0
    ? V
    : [...V, C]

type a = Chunk<[1, 2, 3, 4], 2>

/**
 * 大佬优化后的
 */
type Chunk1<
T extends unknown[],
N extends number = 1,
S extends unknown[] = [],
> = T extends [infer F, ...infer R]
  ? S['length'] extends N
    ? [S, ...Chunk1<T, N>]
    : Chunk1<R, N, [...S, F]>
  : S['length'] extends 0
    ? S
    : [S]

type b = Chunk1<[1, 2, 3, 4], 3>
