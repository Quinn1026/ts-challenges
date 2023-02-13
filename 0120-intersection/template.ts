type A0A0 = Extract<'1' | '2' | '3', unknown>   // '1' | '2' | '3'
type A0A1 = Extract<'1' | '2' | '3', '0' | '2'> // '2'
type A0A2 = ('1' | '2' | '3') & unknown         // '1' | '2' | '3'
type A0A3 = ('1' | '2' | '3') & ('0' | '2')     // '2'
/**
 * 1. 定义结果参数Res并赋予默认值unknow
 * 2. 遍历元祖，获取元素的联合类型(元祖则通过F[number]获取)与Res交叉
 * 3. 输出结果Res
 */
type Intersection<
  T extends unknown[],
  Res = unknown
> = T extends [infer F, ...infer R]
  ? Intersection<R, Res & (F extends unknown[] ? F[number] : F)>
  : Res
