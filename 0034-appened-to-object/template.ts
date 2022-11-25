/**
 * 1. keyof T | U 获取添加后的key的联合类型
 * 2. P extends keyof T ? T[P] : V 设置key对应的value
 * 3. Record<string, unknown>任意对象；Record<string, never>空对象；
 */
type AppendToObject<T extends Record<string, unknown>, U extends keyof any, V> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V
}
