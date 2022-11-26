/**
 * 1. 使用 Uncapitalize 将首字母转化为小写
 * 2. F extends Lowercase<F> 所有小写字母和短横线不变
 * 3. 其余的 大写 转化为 -小写
 */
// type KebabCaseWithoutFirstLetter<S extends string> = S extends `${infer F}${infer R}`
//   ? F extends Lowercase<F>
//     ? `${F}${KebabCaseWithoutFirstLetter<R>}`
//     : `-${Lowercase<F>}${KebabCaseWithoutFirstLetter<R>}`
//   : S
// type KebabCase<S extends string> = KebabCaseWithoutFirstLetter<Uncapitalize<S>>

/**
 * 1. 将所有【大写字母】转化为【-小写字母】
 * 2. 去掉首部的 -，如果只有一个字符 - 则保留
 */
// type UppercaseUnion = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
// type KebabCaseAll<S extends string> = S extends `${infer F}${infer R}`
//   ? F extends UppercaseUnion
//     ? `-${Lowercase<F>}${KebabCaseAll<R>}`
//     : `${F}${KebabCaseAll<R>}`
//   : S
// type KebabCase<S extends string> = KebabCaseAll<Uncapitalize<S>>

/**
 * 大佬们的解法
 */
type KebabCase<S> = S extends `${infer F}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Uncapitalize<F>}${KebabCase<R>}`
    : `${Uncapitalize<F>}-${KebabCase<Uncapitalize<R>>}`
  : S
