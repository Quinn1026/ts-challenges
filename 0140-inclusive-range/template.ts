type GreatThanEqual<
  T extends number,
  U extends number,
  Arr extends unknown[] = []
> = Arr['length'] extends U
  ? true
  : Arr['length'] extends T
    ? false
    : GreatThanEqual<T, U, [...Arr, unknown]>

type LessThanEqual<
  T extends number,
  U extends number,
  Arr extends unknown[] = []
> = Arr['length'] extends T
  ? true
  : Arr['length'] extends U
    ? false
    : LessThanEqual<T, U, [...Arr, unknown]>

type InclusiveRange<
  Lower extends number,
  Higher extends number,
  Idx extends number[] = [],
  Res extends number[] = []
> = GreatThanEqual<Idx['length'], Lower> extends true
  ? LessThanEqual<Idx['length'], Higher> extends true
    ? InclusiveRange<Lower, Higher, [...Idx, number], [...Res, Idx['length']]>
    : Res
  : InclusiveRange<Lower, Higher, [...Idx, number], Res>
