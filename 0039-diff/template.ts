type UninCommon<T, S> = T extends S ? T : never
type UnionDiff<T, S> = Exclude<T | S, UninCommon<T, S>>
type A = 'name' | 'age'
type B = 'name' | 'gender'
type C = UnionDiff<B, A> // "age" | "gender"
type D = Exclude<A, B> | Exclude<B, A> // "age" | "gender"
/**
 * 1. 找到 keyof O | keyof O1 中不同的key值
 * 2. Pick
 */
type Diff0<
  O extends Record<PropertyKey, unknown>,
  O1 extends Record<PropertyKey, unknown>,
> = Pick<O & O1, UnionDiff<keyof O, keyof O1>>

/** 大佬们的解法 */
type Diff1<
  O extends Record<PropertyKey, unknown>,
  O1 extends Record<PropertyKey, unknown>,
> = {
  [P in keyof (Omit<O, keyof O1> & Omit<O1, keyof O>)]: P extends keyof O ? O[P] : O1[P]
}
type Diff<
  O extends Record<PropertyKey, unknown>,
  O1 extends Record<PropertyKey, unknown>,
> = {
  [P in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>]: P extends keyof O
    ? O[P]
    : P extends keyof O1
      ? O1[P]
      : never
}