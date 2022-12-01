/** 类型实例化过深，且可能无限。 */
type MinusOne0<T extends number, A extends 1[] = []> = A['length'] extends T
  ? A extends [1, ...infer R]
    ? R['length']
    : -1
  : MinusOne0<T, [...A, 1]>

/**
 * TS 编译器设置了 1000 的递归限制。如何绕过？
 * 大佬们的解法：多个计数器
 * 两个计数器，每次长度+2，不满足在判断+1是否满足，都不满足则+2递归
 * https://github.com/type-challenges/type-challenges/issues/19437
 */
type MinusOne1<T extends number, A extends 1[] = []> = T extends 0
  ? -1
  : [1, 1, ...A]['length'] extends T
    ? [1, ...A]['length']
    : [1, ...A]['length'] extends T
      ? A['length']
      : MinusOne1<T, [1, 1, ...A]>

/** 模拟运算，这种太牛了，给大佬端茶 */
// 数字减 1 之后对应的数字
type MinusMap = {
  '0': -1
  '1': 0
  '2': 1
  '3': 2
  '4': 3
  '5': 4
  '6': 5
  '7': 6
  '8': 7
  '9': 8
}

type _GetHeadAndLast<T extends string, Acc extends string = ''> = T extends `${infer Head}${infer Tail}`
  ? Tail extends ''
    ? [head: Acc, last: Head]
    : _GetHeadAndLast<Tail, `${Acc}${Head}`>
  : never
type GetHead<T extends string> = _GetHeadAndLast<T>[0]
type GetLast<T extends string> = _GetHeadAndLast<T>[1]

type ToNumber<T extends string> = T extends `${infer U extends number}` ? U : never

type MinusOne<T extends number> = `${T}` extends infer _T extends string
  ? _T extends keyof MinusMap
    ? MinusMap[_T]
    : ToNumber<
        GetLast<_T> extends '0'
          ? `${GetHead<_T> extends '1' ? '' : MinusOne<GetHead<_T>>}9`
          : `${GetHead<_T>}${MinusMap[GetLast<_T>]}`
      >
  : never