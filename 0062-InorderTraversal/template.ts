interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}
/**
 * 1. 二叉树中序遍历
 * 2. 递归
 * 3. T extends TreeNode (实例化过深?) --优化--> [T] extends [TreeNode] ？why
 */
type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode]
  ? [
      ...T['left'] extends TreeNode ? InorderTraversal<T['left']> : [],
      T['val'],
      ...T['right'] extends TreeNode ? InorderTraversal<T['right']> : [],
    ]
  : []
