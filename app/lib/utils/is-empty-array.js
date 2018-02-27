/**
 * 测试对象是否是空数组
 */
module.exports.default = module.exports = function isEmptyArray(value) {
    if (value && value.length > 0) {
        return false;
    }
    return true;
};
