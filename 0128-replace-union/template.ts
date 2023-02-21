type UnionReplace<
  T,
  U extends [any, any][]
> = U extends [[infer Old, infer Now], ...infer R extends [any, any][]]
  ? Old extends T
    ? UnionReplace<Exclude<T, Old> | Now, R>
    : UnionReplace<T, R>
  : T
