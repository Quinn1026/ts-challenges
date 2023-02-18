type Keys<O, IsTop, K extends string | number> =
  IsTop extends true
    ? K | (O extends unknown[] ? `[${K}]` : never)
    : `.${K}` | (O extends unknown[] ? `[${K}]` | `.[${K}]` : never)

type ObjectKeyPaths<T, IsTop = true, K extends keyof T = keyof T> =
  K extends string | number
    ? `${Keys<T, IsTop, K>}${'' | (T[K] extends object ? ObjectKeyPaths<T[K], false> : '')}`
    : never
