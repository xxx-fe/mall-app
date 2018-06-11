/**
 * 获取locale对应的值
 */
window.getLocale = function (key) {
    if (window.locale) {
        return window.locale[key] || '';
    }
    else {
        return key;
    }
};
