import helperCreateInInObjectString from './helperCreateInInObjectString'

/**
 * 判断是否数组
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 */
let isArray = Array.isArray || helperCreateInInObjectString('Array')

export default isArray
