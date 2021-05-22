/**
 *  通用的工具函数
 */

function noop() {
  // 不执行任何操作
}

/**
 * 转换对象数组为对象
 * @param {Array} arr
 * @param {Function} [getKey=item => item.label] key生成函数，参数为数组项/数组项索引/原数组
 * @param {Function} [getValue=item => item.value] value生成函数，参数为数组项/数组项索引/原数组
 * @returns {Object}
 */
const getObjectFromObjectArray = (
  arr,
  getKey = item => item.label,
  getValue = item => item.value
) => {
  return arr.reduce((obj, item, index, arr) => {
    return { ...obj, [getKey(item, index, arr)]: getValue(item, index, arr) }
  }, {})
}

/**
 * 从对象生成选项列表
 * @param {Object} obj 对象
 * @param {Function} [getLabel=key => key] 获取label值函数，接收对象的key为参数,默认为对象的key
 * @param {Function} [getValue=key => obj[key]] 获取value值函数，接收对象的key为参数，默认获取对象的value
 * @returns
 */
const getOptionsFromObject = (
  obj,
  getLabel = key => key,
  getValue = key => obj[key]
) => {
  if (!obj) {
    return []
  }
  return Object.keys(obj).map(key => ({
    label: getLabel(key),
    value: getValue(key),
  }))
}

/**
 * 从数组生成选项列表
 * @param {Object} obj 对象
 * @param {Function} [getLabel=item => item.name] 获取label值函数，接收数组的每一项为参数，默认获取每一项的name属性
 * @param {Function} [getValue=item => item.id] 获取value值函数，接收数组的每一项为参数，默认获取每一项的id属性
 * @returns
 */
const getOptionsFromArray = (
  array,
  getLabel = item => item.name,
  getValue = item => item.id
) => {
  if (!array) {
    return []
  }
  return array.map(item => ({
    label: getLabel(item),
    value: getValue(item),
  }))
}

/**
 *
 * @param {Array} options
 * @param {any} [defaultValue='']
 * @returns
 */
const injectAllOptionToOptions = (options, defaultValue = '') => {
  const defaultOptions = [{ label: '全部', value: defaultValue }]
  if (!(options && options.length)) {
    return defaultOptions
  }
  return [...defaultOptions, ...options]
}

/**
 * 通过value值获取对应的label值
 * @param {Array} list 列表
 * @param {any} value 值
 * @param {string} [labelKey='label'] label对应的键名称
 * @param {string} [valueKey='value'] value对于的键名称
 */
const getLabelByValue = (
  list,
  value,
  labelKey = 'label',
  valueKey = 'value'
) => {
  const item = list.find(item => item[valueKey] === value)
  return item ? item[labelKey] : ''
}

export {
  noop,
  getObjectFromObjectArray,
  getLabelByValue,
  getOptionsFromObject,
  getOptionsFromArray,
  injectAllOptionToOptions,
}
