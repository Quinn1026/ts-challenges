type BA<T extends string, A extends any[] = []> = `${A['length']}` extends T ? A : BA<T, [...A, unknown]>
type GreatThenAndEqual<T extends string, U extends string> = BA<T> extends [...any[], ...BA<U>] ? true : false
type LessThan<T extends string, U extends string> = BA<U> extends [any, ...any[], ...BA<T>] ? true : false
/**
 * 1. 根据字符串数字构建数组
 * 2. 大于等于 和 小于
 * 3. 索引P是否在[start, end)区间内，在则使用N替换，不在则为原值
 */
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
> = {
  [P in keyof T]: P extends string
    ? GreatThenAndEqual<P, `${Start}`> extends true
      ? LessThan<P, `${End}`> extends true
        ? N
        : T[P]
      : T[P]
    : never
}
/**
 * 1. 增加两个数组类型变量，用于存放start和end对应长度的数组
 * 2. 每次取T的一个元素，并判断Pending和Filled长度是否满足
 * 3. 长度从0开始，判断长度是否满足，满足则替换值为N
 * 4. 递归中判断长度是否满足，满足则停止向Pending/Filled添加元素，表示其长度已经等于Start/End
 */
type Fill2<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Pending extends unknown[] = [], // 直到Pending['length'] == Start
  Filled extends unknown[] = []   // 直到Filled['length'] == End
> = T extends [infer F, ...infer R]
  ? [
      Pending['length'] extends Start
        ? Filled['length'] extends End
          ? F
          : N
        : F,
      ...Fill2<
        R,
        N,
        Start,
        End,
        Pending['length'] extends Start ? Pending : [...Pending, unknown],
        Filled['length'] extends End ? Filled : [...Filled, unknown]
      >
    ]
  : []
