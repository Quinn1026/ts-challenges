type Fn<T extends Function> = T extends (f: infer F, ...r: infer R) => infer V
  ? R extends []
    ? T
    : (f: F) => Fn<(...r: R) => V>
  : never
/**
 * 1. 每次递归取出一个参数F
 * 2. R extends [] 表示没有参数，然后返回函数T
 */
declare function Currying<F extends Function>(fn: F): Fn<F>

/**
 * T extends (f) => any 表达式中参数f个数可以是0和1个
 */
type HasOneParam<T extends Function> = T extends (f: infer F) => any ? true : false
type ff1 = HasOneParam<() => true> // true
type ff2 = HasOneParam<(a: string) => true> // true
type ff3 = HasOneParam<(a: string, b: string) => true> // false

const curry = (fn, ...args) => {
  args.length >= fn.length
    ? fn(...args)
    : (..._args) => curry(fn, ...args, ..._args)
}
const printLog = (a, b, c) => {
  console.log(`${a} -> ${b} -> ${c}`)
}
const curryPrintLog = curry(printLog)
