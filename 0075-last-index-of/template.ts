type Pop<T extends unknown[]> = T extends [...infer F, infer R]
  ? F
  : []
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
type LastIndexOf<
  T extends unknown[],
  U,
  Res extends unknown[] = T
> = T extends [...infer F, infer R]
  ? Equal<U, R> extends true
    ? Pop<Res>['length']
    : LastIndexOf<F, U, Pop<Res>>
  : -1
