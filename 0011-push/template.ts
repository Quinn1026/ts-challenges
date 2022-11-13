/**
 * 1. 返回一个数组
 * 2. ...运算符即可
 */
type Push<T extends unknown[], U> = [...T, U]
