/**
 * 校验日期的合法性：
 * 1. 4位字符，前两位代表月，后两位代表日
 * 2. 1、3、5、7、8、10、12月有31天，4、6、9、11月有30天，2月有28天
 * 思路：
 * 1. 拆分字符串，前两位数字范围是01-12，后两位的判断需要月份对应的天数范围
 * 2. 1、3、5、7、8、10、12范围01-31，4、6、9、11范围01-30，2是28
 * 3. 以上条件都满足才是true，否则为false
 */
 /** 笨办法，列举 */
 type RangeMonth31 = '01' | '03' | '05' | '07' | '08' | '10' | '12'
type RangeMonth30 = '04' | '06' | '09' | '11'
type RangeMonth28 = '02'
// type AllMonth = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
type AllMonth = RangeMonth28 | RangeMonth30 | RangeMonth31
type AllDay = AllMonth | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31'
type ValidDate0<T extends string> = T extends `${infer ML}${infer MR}${infer D}`
  ? `${ML}${MR}` extends RangeMonth31
    ? D extends AllDay
      ? true
      : false
    : `${ML}${MR}` extends RangeMonth30
      ? D extends Exclude<AllDay, '31'>
        ? true
        : false
      : `${ML}${MR}` extends RangeMonth28
        ? D extends Exclude<AllDay, '29' | '30' | '31'>
          ? true
          : false
        : false
  : false
/** 比较法 */
interface Days {
  '01': 31
  '02': 28
  '03': 31
  '04': 30
  '05': 31
  '06': 30
  '07': 31
  '08': 31
  '09': 30
  '10': 31
  '11': 30
  '12': 31
  [xxx: string]: number
}
type BuildTuple<T extends number, A extends unknown[] = []> = A['length'] extends T ? A : BuildTuple<T, [...A, unknown]>
type LessThanN<T extends number, N extends number> = BuildTuple<T> extends [...BuildTuple<N>, unknown, ...unknown[]] ? false : true
type Legal<T extends string, N extends number> = T extends `0${infer R extends number}`
  ? R extends 0
    ? false
    : LessThanN<R, N>
  : T extends `${infer F extends number}`
    ? LessThanN<F, N>
    : false
type ValidDate<T extends string> = T extends `${infer MF}${infer ML}${infer Day}`
  ? number extends Days[`${MF}${ML}`]
    ? false
    : Legal<Day, Days[`${MF}${ML}`]>
  : false
