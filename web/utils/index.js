/**
 * 设置相同行的标记
 */
export function setSameRowSign() {
    this.sameRowItems = []
    for (var i = 0; i < this.items.length; i++) {
        if (i === 0) {
            this.sameRowItems.push(1)
            this.pos = 0
        } else {
            if (this.items[i][this.sameRowKey] === this.items[i - 1][this.sameRowKey]) {
                this.sameRowItems[this.pos] += 1
                this.sameRowItems.push(0)
            } else {
                // 不相等push 1
                this.sameRowItems.push(1)
                this.pos = i
            }
        }
    }
}

/**
 * 合并同标记相同行为一行
 */
export function mergeSameRow({row, column, rowIndex, columnIndex}) {
    if (this.sameRowItems && columnIndex === 0) {
        const _row = this.sameRowItems[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
            rowspan: _row,
            colspan: _col
        }
    }
}

/**
 * 深度递归清空对象
 */
export function deepClearObject(form) {
    for (let item in form) {
        if (_.isArray(form[item])) {
            form[item] = []
        } else if (_.isObject(form[item])) {
            deepClearObject(form[item])
        } else if (!_.isBoolean(form[item])) {
            form[item] = ''
        }
    }
}

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function isMobile() {
    return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}
