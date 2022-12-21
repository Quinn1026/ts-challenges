/**
 * 1. T[number] 获取每项联合类型，如['foo', 'bar', 'baz'][number] --> "foo" | "bar" | "baz"
 * 2. K = U作为分布式条件分离联合类型
 * 3. K extends string，由于K可能是 null | undefined 所以使用string收窄
 */
type Combination<
  T extends string[],
  U = T[number],
  K = U
> = K extends string
  ? K | `${K} ${Combination<[], Exclude<U, K>>}`
  : ''

type a = Combination<['foo', 'bar', 'baz']>
type b = ['foo', 'bar', 'baz'][number]
type c = Exclude<'foo', 'foo'> // never

/**
 * 步骤分析：
 * 1. K 是 foo --> foo | foo Combination<Exclude<foo>>
 * 2.  Combination<Exclude<foo>> --> K 是 bar --> bar | bar Combination<Exclude<foo, bar>>
 * 3.   Combination<Exclude<foo, bar>> --> K 是 baz --> baz | never
 * 4.  Combination<Exclude<foo>> --> K 是 baz --> baz | baz Combination<Exclude<foo, baz>>
 * 5.   Combination<Exclude<foo, baz>> --> K 是 bar --> bar | never
 * 6. 综上：foo | foo bar | foo bar baz | foo baz | foo baz bar
 * 7. K 是 bar...
 * 8. K 是 baz...
 */
