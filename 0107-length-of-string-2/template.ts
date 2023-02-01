type LengthOfString2<
  S extends string,
  Res extends string[] = []
> = S extends `${string}${infer R}`
  ? LengthOfString2<R, [...Res, string]>
  : Res['length']

