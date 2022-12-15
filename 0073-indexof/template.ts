type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
type IndexOf<T extends any[], U, Len extends any[] = []> = T extends [infer F, ...infer R]
  ? Equal<U, F> extends true
    ? Len['length']
    : IndexOf<R, U, [...Len, any]>
  : -1
