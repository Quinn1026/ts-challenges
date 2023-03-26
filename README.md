### 类型体操练习总结

#### 0. 啊...

```ts
// Equal
type Equal<X, Y> =
(<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? true
  : false
```



#### 1. 元组相关

```ts
// 通过 T[number] 获取元组的联合类型
type Tup = [1, 2, 3]
type TupleToUnion = Tup[number] // 1 | 2 | 3
```

```ts
// 通过 as const 创建字面量类型
const arr = [1, 2] as const
const arr2 = [1, 2]
type A = typeof arr // readonly [1, 2]
type A2 = typeof arr2 // number[]
```

#### 2. 联合类型相关

```ts
// 分布式条件，裸类型
// T extends X 中的 T 如果不被数组、元组、Promise包裹则属于裸类型
// 若裸类型是联合类型，那么该条件类型就成为分布式条件类型，会进行分解
```



#### 3. object相关

```ts
// obj的key值
type K1 = keyof any // string | number | symbol
type K2 = PropertyKey // 等价于 keyof any
```



#### 

