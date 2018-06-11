/**
 * 判断`array`是否是空数组
 * @param  {Object} array
 * @return {Boolean}
 */
module.exports.default = module.exports = function isEmptyArray(array) {
    return !array || (Object.prototype.toString.call(array) === '[object Array]' && array.length === 0)
};
