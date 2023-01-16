/** 有缺陷，{ 'boo.wow': { bee: 1 } } 这种类型不行 */
type Get<
  T extends Record<string, any>,
  K extends string
> = K extends keyof T
  ? T[K]
  : K extends `${infer F}.${infer R}`
    ? F extends keyof T
      ? Get<T[F], R>
      : never
    : never

