/**
 * 生成Element Form的Validator
 * @export
 * @param {Array[rule]} rules
 * rule.required 值是否是必填
 * rule.predicate 断言函数，接受唯一的参数value，返回true|false，返回false时将会显示message定义的提示文本
 * rule.message 断言函数返回false时对应显示的提示文本
 * @returns Function
 */
export function getValidator(rules) {
  return (rule, value, callback) => {
    if (!(rules && rules.length)) {
      return callback()
    }

    const isNotEmpty = value && value.length

    for (let index = 0; index < rules.length; index++) {
      const { predicate, message, required } = rules[index] || {}
      const errorCallback = () => callback(new Error(message))

      // 定义了required校验值是否为空
      if (required && !isNotEmpty) {
        return errorCallback()
      }

      // 定义了断言函数，则进行断言校验
      if (predicate && isNotEmpty && !predicate(value)) {
        return errorCallback()
      }
    }

    // 默认返回callback()
    return callback()
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(?:(?:(?:[a-z]+:)?\/\/)|www\.)(?:\S+(?::\S*)?@)?(?:localhost|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3})|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#][^\s"]*)?$/.test(
    path
  )
}

// TODO: 用户名正则
export const USERNAME_REG = /^.{4,20}$/

export const PASSWORD_REG = /^(?![0-9]*$)(?![a-z]*$)(?![A-Z]*$)(?![!@$^-_=+[{}\]:,.\/?~#*]*$)[0-9a-zA-Z!@$^-_=+[{}\]:,.\/?~#*]{8,20}$/

/**
 * @param {string} str
 * @returns {Boolean|String}
 */
export function isUsername(str) {
  return USERNAME_REG.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean|String}
 */
export function isPassword(str) {
  return PASSWORD_REG.test(str)
}

/**
 *  验证是移动手机电话号码
 * @param {string} str
 * @returns {boolean}
 */
export function isMobilePhoneNumber(str) {
  const reg = /^1[345678]\d{9}$/

  return reg.test(str)
}

/**
 *  验证固定电话号码
 * @param {string} str
 * @returns {boolean}
 */
export function isFixedPhoneNumber(str) {
  const reg = /^((\d{3}-|\d{3})\d{8}|(\d{4}-|\d{4})\d{7,8})$/

  return reg.test(str)
}

/**
 * 验证是否是电话号码
 * @param {string} str
 * @returns {boolean}
 */
export function isPhoneNumber(str) {
  return isMobilePhoneNumber(str) || isFixedPhoneNumber(str)
}
