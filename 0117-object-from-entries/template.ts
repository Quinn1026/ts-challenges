type UnionToIntersect<T> =
  (T extends T ? (arg: T) => void : never) extends (arg: infer X) => void
    ? X
    : never

type DeBug<T> = { [K in keyof T]: T[K] }

type ObjectFromEntriesUnion<
  T
> = T extends [infer K extends string, infer V]
  ? { [P in K]: V }
  : never

type ObjectFromEntries<T> = DeBug<UnionToIntersect<ObjectFromEntriesUnion<T>>>

// oh my god！
type ObjectFromEntries1<T extends [string, unknown]> = {
  [Entry in T as Entry[0]]: Entry[1]
}