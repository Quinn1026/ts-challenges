/**
 * 1. option方法返回Chainable
 * 2. Chainable中给OBJ增加键值对，需要剔除已存在的键（后面覆盖前面）
 * 3. get返回OBJ
 */
type Chainable<OBJ = {}> = {    // 给予 OBJ = {} 默认值
  option<K extends string, V>(  // 限制类型键K是字符串
    key: K extends keyof OBJ    // 如果键K已存在继续判断
      ? V extends OBJ[K]        // 键已存在，看值类型是否一致
        ? never                 // 一致就要了
        : K                     // 不一致就以最新的为准
      : K,                      // 如果键K不存在，就是新的键
    value: V
  ): Chainable<Omit<OBJ, K> & { [X in K]: V }>
  // 剔除原来OBJ中的K，重新设置新的K:V
  get(): OBJ
}

