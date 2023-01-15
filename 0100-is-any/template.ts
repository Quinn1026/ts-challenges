/**
 * 除了 never【任何类型 & any】都是 any
 */
type IsAny<T> = 0 extends 1 & T ? true : false
