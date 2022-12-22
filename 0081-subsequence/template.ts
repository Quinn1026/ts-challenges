type Subsequence<T extends any[]> = T extends [infer F, ...infer R]
  ? [F, ...Subsequence<R>] | Subsequence<R>
  : []

type a = [1, 2, 3][number]
type b = Subsequence<[1, 2, 3]>

/**
 * 分析过程：
 * 1. F == 1 ---> [1, ...Subsequence<[2, 3]>] | Subsequence<[2, 3]>
 * 2.  Subsequence<[2, 3]> ---> F == 2 ---> [2, ...Subsequence<[3]>] | Subsequence<[3]>
 *    ---> [2] | [2, 3] | [3] | []
 * 3.  Subsequence<[3]> ---> F == 3 ---> [3] | []
 * 4. 综上：
 *  [1, ...Subsequence<[2, 3]>] ---> [1, 2] | [1, 2, 3] | [1, 3] | [1]
 *  Subsequence<[2, 3]> ---> [2] | [2, 3] | [3] | []
 */
