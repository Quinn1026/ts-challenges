/**
 * 0. K extends keyof T = keyof T 给予K类型一个默认值
 * 1. 找出将要readonly的key
 * 2. 找出其余key
 * 3. 将两个类型交叉
 */
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}
// type MyReadonly2<T, K extends keyof T = keyof T> = {
//   readonly [P in K]: T[P]
// } & Omit<T, Exclude<keyof T, K>>

type Simplify<T> = {
  [P in keyof T]: T[P]
}

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}
type O = Omit<Todo1, 'title' | 'description'>
type Res = Simplify<MyReadonly2<Todo1, 'title' | 'description'>>
