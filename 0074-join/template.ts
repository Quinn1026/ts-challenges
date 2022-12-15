type Join<
  T,
  U extends string | number
> = T extends [infer F extends string, ...infer R]
  ? `${F}${R extends [] ? '' : U}${Join<R, U>}`
  : ''

// type Join<
//   T extends string[],
//   U extends string | number,
//   Res extends string = ''
// > = T extends [infer F extends string, ...infer R extends string[]]
//   ? R['length'] extends 0
//     ? `${Res}${F}`
//     : Join<R, U, `${Res}${F}${U}`>
//   : Res
