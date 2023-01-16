type NumberUnion = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type IsPureNumString<S extends string> = S extends `${infer F}${infer R}`
  ? F extends `${NumberUnion}`
    ? IsPureNumString<R>
    : false
  : true
type ToNumber1<
  S extends string,
  A extends unknown[] = []
> = IsPureNumString<S> extends false
  ? never
  : `${A['length']}` extends S
    ? A['length']
    : ToNumber1<S, [...A, unknown]>

/** 大佬的解法 *_* */
type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never