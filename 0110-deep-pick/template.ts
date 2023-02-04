/**
 * 1. 深度获取键K对应的对象
 * 2. 构建联合类型转交叉类型
 * 3. K若是联合类型，最终将每个Key对应的对象交叉后得到结果
 */
type GetKey<
  T extends Record<string, any>,
  K extends string
> = K extends keyof T
  ? { [Key in K]: T[Key] }
  : K extends `${infer F}.${infer R}`
    ? { [Key in F]: R extends '' ? T[F] : GetKey<T[F], R> }
    : never

type UionToIntersection<T> = (T extends T ? (arg: T) => void : never) extends (arg: infer A) => void ? A : never

type DeepPick<
  T extends Record<string, any>,
  K extends string
> = UionToIntersection<GetKey<T, K>>
