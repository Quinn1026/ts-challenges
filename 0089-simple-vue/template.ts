/**
 * 计算属性类型是函数的返回值类型
 */
type GetComputed<T extends Record<string, Function>> = {
  [P in keyof T]: T[P] extends (...args: unknown[]) => infer A ? A : never
}

/**
 * 1. D是一个对象，或者返回一个对象的函数
 * 2. C、M是函数
 * 3. ThisType 上下文的this，需要开启 noImplicitThis
 */
type Options<
  D extends Record<string, unknown>,
  C extends Record<string, Function>,
  M extends Record<string, Function>
> = {
  data(this: never): D
  computed: C & ThisType<D & GetComputed<C>>
  methods: M & ThisType<D & GetComputed<C> & M>
}

/**
 * 1. data 方法中不能访问到 computed 和 methods 中的属性
 * 2. computed 中的 this 可以访问到 data 的属性
 * 3. methods 中的 this 可以访问到 data 和 computed 的属性
 * 4. methods 中的 this 访问 computed 的属性的值类型是 computed 中方法的返回值类型
 */
declare function SimpleVue<
  D extends Record<string, unknown>,
  C extends Record<string, Function>,
  M extends Record<string, Function>
>(options: Options<D, C, M>): unknown

// declare function SimpleVue<
//   D extends Record<string, unknown>,
//   C extends Record<string, unknown>,
//   M extends Record<string, unknown>
// >(options: {
//   data: (this: never) => D
//   computed: { [K in keyof C]: (this: D, ...args: unknown[]) => C[K] }
//   methods: {
//     [K in keyof M]: (
//       this: D & C & { [K in keyof M]: (...args: unknown[]) => M[K] }
//     ) => M[K]
//   }
// }): any
