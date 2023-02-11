/**
 * 1. 将字符串翻转
 * 2. 若翻转字符串等于原始字符串，就是回文
 */
type ReverseString<T extends string> = T extends `${infer F}${infer R}` ? `${ReverseString<R>}${F}` : ''

type IsPalindrome<T extends string | number> = `${T}` extends ReverseString<`${T}`> ? true : false
// 递归法
// type IsPalindrome<T extends string | number> =
//   `${T}` extends `${infer A}${infer B}${infer R}`
//     ? `${B}${R}` extends `${infer L}${A}`
//       ? IsPalindrome<L>
//       : false
//     : true
