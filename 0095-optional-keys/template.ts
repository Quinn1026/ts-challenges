type IsRequireKey3<T, K extends keyof T> =
  { [P in K]: T[P] } extends { [P in K]-?: T[P] }
    ? true
    : false
type OptionalKeys<
  T extends Record<PropertyKey, unknown>,
  K extends keyof T = keyof T
> = K extends K
  ? IsRequireKey3<T, K> extends true
    ? never
    : K
  : never

/** 大佬们的解法 */
type OptionalKeys0<T extends Record<PropertyKey, unknown>> = keyof GetOptional<T>

type OptionalKeys1<T extends object, K = keyof T> = K extends keyof T
  ? T extends Required<Pick<T, K>>
    ? never
    : K
  : never
