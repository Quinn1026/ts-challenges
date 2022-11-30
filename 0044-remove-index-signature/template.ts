/**
 * 1. as: key remapping, 接口属性重映射 https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types
 * 2. 对于确定的key来说：比如 'bar' extends string --> true; string extends 'bar' --> false
 * 3. [key: string] --> 索引签名，来个复杂一点的 [key: `get${string}`]
 * 4. 使用 as 接口属性重映射去掉索引签名，比如：[P in keyof T as `get${Capitalize<string & P>}`]
 */
type RemoveIndexSignature<T> = {
  [
    P in keyof T as (
      string extends P
        ? never
        : number extends P
          ? never
          : symbol extends P
            ? never
            : P
    )
  ]: T[P]
}

/** 简化一下 */
type NoIndexSignatureProperty<T> = string extends T
  ? never
  : number extends T
    ? never
    : symbol extends T
      ? never
      : T
type RemoveIndexSignature1<T> = {
  [P in keyof T as NoIndexSignatureProperty<P>]: T[P]
}

/** 大佬的解法，这个T[P]表示啥 */
type RemoveIndexSignature2<T> = {
  [P in keyof T as (PropertyKey extends T[P] ? never : P)]: T[P]
}

