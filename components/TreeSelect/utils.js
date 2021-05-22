/* [_each description]  倒查、展平、数据回调返回回当前一条数据和子集
* @param  {[Array]}   data     [description]
* @param  {Function}  callback [description]
* @param  {String}    childName[description]
* @return {[Array]}            [description]
* 默认使用副本,在callback处理数据，如果不使用副本，那么需要重新对treeData赋值
   treeData = each(treeData, (item, children) => {
       item.value = xx;
   });
*/
const each = (data, callback, childName = 'children') => {
  let current
  let children
  for (let i = 0, len = data.length; i < len; i++) {
    current = data[i]
    children = []
    if (current[childName] && current[childName].length > 0) {
      children = current[childName]
    }
    callback && callback(current, children)
    if (children.length > 0) {
      each(children, callback, childName)
    }
  }
}

export { each }
