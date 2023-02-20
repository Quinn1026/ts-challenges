type CapitalizeNestObjectKeys<T extends Record<string, any>> =T extends [infer F, ...infer R]
  ? F extends Record<string, any>
    ? [CapitalizeNestObjectKeys<F>, ...CapitalizeNestObjectKeys<R>]
    : [F, ...CapitalizeNestObjectKeys<R>]
  : T extends Record<string, unknown>
    ? {
        [P in keyof T as P extends string ? Capitalize<P> : P]: T[P] extends Record<string, any> ? CapitalizeNestObjectKeys<T[P]> : T[P]
      }
    : T
/** 精简一点 */
type CapitalizeNestObjectKeys1<T extends Record<string, any>> = T extends unknown[]
  ? { [P in keyof T]: T[P] extends Record<string, any> ? CapitalizeNestObjectKeys1<T[P]> : T[P] }
  : { [P in keyof T as P extends string ? Capitalize<P> : never]: CapitalizeNestObjectKeys1<T[P]> }
