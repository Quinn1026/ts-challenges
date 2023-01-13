type ControlsMap = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}
/**
 * 1. 定义结果类型参数Res，然后字符串匹配 %C
 * 2. C 如果是 keyof ControlsMap 则存入Res中
 * 3. C 如果是 ControlsMap以外的字符，则递归处理剩余的字符串R
 * 4. 最后输出 Res
 */
type ParsePrintFormat1<T extends string, Res extends string[] = []> = T extends `${string}%${infer C}${infer R}`
  ? C extends keyof ControlsMap
    ? ParsePrintFormat1<R, [...Res, ControlsMap[C]]>
    : ParsePrintFormat1<R, Res>
  : Res

/** 不使用Res版本 */
type ParsePrintFormat2<T extends string> = T extends `${string}%${infer C}${infer R}`
  ? C extends keyof ControlsMap
    ? [ControlsMap[C], ...ParsePrintFormat2<R>]
    : ParsePrintFormat2<R>
  : []
/** 再精简一点，好像没那么精简 */
type ParsePrintFormat<T extends string> = T extends `${string}%${infer C}${infer R}`
  ? [
      ...(C extends keyof ControlsMap ? [ControlsMap[C]] : []),
      ...ParsePrintFormat<R>
    ]
  : []