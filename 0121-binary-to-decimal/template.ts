type DoubleTuple<T extends unknown[]> = [...T, ...T]
type CalcPureBinary<S extends string> = S extends `${string}${infer R}` ? DoubleTuple<CalcPureBinary<R>> : [unknown]
type BinaryToDecimalTuple<S extends string> = S extends `${infer F}${infer R}`
  ? [...(F extends '1' ? CalcPureBinary<R> : []), ...BinaryToDecimalTuple<R>]
  : []
type BinaryToDecimal<S extends string> = BinaryToDecimalTuple<S>['length']
