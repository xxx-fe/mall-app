/**
 * 请求数据
 */
function request(options) {
    let that = this;
    that.$http[options.type](options.url, options.params).then(response => {

    }, () => {

    });
};
Vue.prototype.request = request;
