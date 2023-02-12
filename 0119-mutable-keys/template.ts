type Mutable1<T> = {
  -readonly [P in keyof T]: T[P]
}

type MutableKeys<T, K extends keyof T = keyof T> = K extends K
  ? Equal<{ [P in K]: T[K] }, { -readonly [P in K]: T[K] }> extends true
    ? K
    : never
  : never
