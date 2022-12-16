type Includes<T extends any[], S> = T extends [infer F, ...infer R]
  ? Equal<F, S> extends true
    ? true
    : Includes<R, S>
  : false

type Unique<T extends any[], Res extends any[] = []> = T extends [infer F, ...infer R]
  ? Includes<Res, F> extends true
    ? Unique<R, Res>
    : Unique<R, [...Res, F]>
  : Res
