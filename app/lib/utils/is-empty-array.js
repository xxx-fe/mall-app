/**
 * 测试对象是否是空数组
 */
export const isEmptyArray = (value) => {
    if (value && value.length > 0) {
        return false;
    }
    return true;
};
