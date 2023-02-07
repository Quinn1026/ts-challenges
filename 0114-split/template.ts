type Split1<
  S extends string,
  SEP extends string,
  Word extends string = '',
  Res extends string[] = []
> = SEP extends ''
? string extends S
  ? string[]
  : S extends `${infer F}${infer R}`
    ? Split1<R, SEP, '', [...Res, F]>
    : Res
: string extends S
  ? string[]
  : S extends `${infer F}${infer R}`
    ? F extends SEP
      ? Split1<R, SEP, '', [...Res, Word]>
      : Split1<R, SEP, `${Word}${F}`, Res>
    : [...Res, Word]

/** 大佬们的解法 */
type Split<
  S extends string,
  SEP extends string,
  R extends string[] = []
> = string extends S
  ? string[]
  : S extends `${infer A}${SEP}${infer Rest}`
    ? Split<Rest, SEP, [...R, A]>
    : S extends ''
      ? SEP extends ''
        ? R
        : ['']
      : [...R, S]
