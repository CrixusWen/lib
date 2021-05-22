/**
 * 判断当前模块是否是目标模块的子模块
 * @param {Object} target 目标模块
 * @param {Object} current 当前模块
 * @param {Function} [predicate=(target, current) => target.id === current.id] 每次迭代调用的断言函数
 * @returns
 */
const isAncestor = (
  target,
  current,
  predicate = (target, current) => target.id === current.id
) => {
  if (!(current && current.id && target.children && target.children.length)) {
    return false
  }
  return target.children.some(child => {
    if (predicate(child, current)) {
      return true
    }
    if (child.children && child.children.length) {
      return isAncestor(child, current)
    }
    return false
  })
}

const listToTree = (
  list,
  options = { key: 'id', parent: 'parentId', children: 'children' }
) => {
  const { key, parent, children } = options
  let info = list.reduce((map, node) => {
    map[node[key]] = node
    node[children] = []
    return map
  }, {})
  return list.filter(node => {
    info[node[parent]] && info[node[parent]][children].push(node)
    return !node[parent]
  })
}

export { isAncestor, listToTree }
