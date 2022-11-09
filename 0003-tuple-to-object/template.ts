/**
 * 1. {}
 * 2. T[number] -> 'tesla' | 'model 3' | 'model X' | 'model Y' 得到每项的联合类型
 * 3. keyof any -> string | number | symbol
 * 4. as const将类型变为只读字面量类型
 */
type TupleToObject<T extends readonly (keyof any)[]> = {
  [K in T[number]]: K
}
