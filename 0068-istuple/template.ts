/**
 * 1. 排除never --> [T] extends [never]
 * 2. 排除非数组 --> T extends readonly unknown[]
 * 3. 排除number[] --> number extends T['length']
 * 4. number[]['length'] --> number
 * 5. T['length'] extends number --> false
 */
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly unknown[]
    ? number extends T['length']
      ? false
      : true
    : false

type A<T> = T extends readonly unknown[] ? true : false
type B<T extends unknown[]> = number extends T['length'] ? true : false
type a = A<number[]> // true
type b = B<number[]> // true
type b2 = B<[1]> // false
type b3 = number[]['length'] // number