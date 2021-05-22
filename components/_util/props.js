const getSlotOptions = ele => {
  if (ele.fnOptions) {
    // 函数式组件
    return ele.fnOptions
  }
  let componentOptions = ele.componentOptions
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions
  }
  return componentOptions ? componentOptions.Ctor.options || {} : {}
}

const isEmptyElement = c => {
  return !(c.tag || (c.text && c.text.trim() !== ''))
}

export { getSlotOptions, isEmptyElement }
