type SnakeCase<T extends string, IsHeader = true> = T extends `${infer F}${infer R}`
  ? F extends Capitalize<F>
    ? IsHeader extends true
      ? `${Lowercase<F>}${SnakeCase<R, false>}`
      : `_${Lowercase<F>}${SnakeCase<R, false>}`
    : `${F}${SnakeCase<R, false>}`
  : ''
