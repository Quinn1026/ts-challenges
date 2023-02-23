type CountRepeat<T extends string[]> = T extends [infer F extends string, ...string[]]
  ? `${T['length'] extends 1 ? '' : T['length']}${F}`
  : ''
// type CountRepeat<
//   T extends string,
//   C extends string[] = []
// > = T extends `${infer F}${infer R}`
//   ? CountRepeat<R, [...C, F]>
//   : `${C['length']}${C[number]}`
type Repeat<
  T extends string,
  N extends number,
  L extends unknown[] = []
> = L['length'] extends N
  ? ''
  : `${T}${Repeat<T, N, [...L, unknown]>}`
type TransitionNumber<S extends string> = S extends `${infer F extends number}` ? F : S
namespace RLE {
  export type Encode<
    S extends string,        // 原始字符串
    C extends string[] = [], // 重复字符
    V extends string = ''    // 最终结果
  > = S extends `${infer F}${infer R}`
    ? F extends C[number]
      ? Encode<R, [...C, F], V>
      : Encode<R, [F], `${V}${CountRepeat<C>}`>
    : `${V}${CountRepeat<C>}`
  export type Decode<
    S extends string,
    V extends string = ''
  > = S extends `${infer F}${infer C}${infer R}`
    ? TransitionNumber<F> extends number
      ? Decode<R, `${V}${Repeat<C, TransitionNumber<F>>}`>
      : Decode<`${C}${R}`, `${V}${F}`>
    : `${V}${S}`
}