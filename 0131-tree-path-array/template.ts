type Path<
  T extends Record<string, unknown>,
  V extends unknown[] = [],
  K extends keyof T = keyof T
> = K extends keyof T
  ? T[K] extends Record<string, unknown>
    ? [...V, K] | Path<T[K], [...V, K]>
    : [...V, K]
  : []
