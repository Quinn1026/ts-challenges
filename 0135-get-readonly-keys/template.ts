// type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false
/** 判断是否只读，需要通过Equal */
type IsReadonlyKey<
  T extends Record<string, any>,
  K extends keyof T = keyof T
> = Equal<{ [P in K]: T[P] }, { - readonly [P in K]: T[P] }> extends false
  ? true
  : false
type GetReadonlyKeys<
  T extends Record<string, any>
> = keyof {
  [P in keyof T as IsReadonlyKey<T, P> extends true ? P : never]: T[P]
}
