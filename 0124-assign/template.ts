type AssignObj<
  T extends Record<string, unknown>,
  S extends Record<string, unknown>
> = Debug<S & {
  [P in keyof T as P extends keyof S ? never : P]: T[P]
}>

type Assign<
  T extends Record<string, unknown>,
  U extends unknown[],
  V extends Record<string, unknown> = T
> = U extends [infer F, ...infer R]
  ? F extends Record<string, unknown>
    ? Assign<T, R, AssignObj<V, F>>
    : Assign<T, R, V>
  : V
