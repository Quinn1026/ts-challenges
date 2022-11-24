/**
 * 1. [T] extends [never] 可以正确判断never类型。如果T是never类型，不以元组或数组的方式判断never类型，那么ts会直接推断这个表达式为never不进入预期判断的条件。
 * 2. 条件 R extends R 可遍历出联合类型的每一项，字句中的 Exclude<T, R> T是完整的类型，R是联合类型的其中一项
 * 3. 联合条件类型的分发 ＋ 递归
 * 4. 参考链接：https://github.com/type-challenges/type-challenges/issues/614
 * 5. ...
 */
type Permutation<T, R = T> = [T] extends [never]
  ? []
  : R extends R
    ? [R, ...Permutation<Exclude<T, R>>]
    : []

type A<T> = [T] extends [never] ? true : false
type a = A<never> // true

type B<T> = T extends T ? [T] : never
type b = B<'A' | 'B' | 'C'> // ["A"] | ["B"] | ["C"]
