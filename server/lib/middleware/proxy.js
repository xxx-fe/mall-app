const path = require('path');
const koaProxy = require('koa-proxy');
const koaConvert = require('koa-convert');
const isEmpty = require('lodash/isEmpty');
/**
 * 代理
 */
module.exports.default = module.exports = async (app) => {
    let webpackDevConf = require(path.resolve('./webpack.dev.conf'));
    let entry = webpackDevConf.entry;
    let webpackEntryName = [];
    let env = app.context.env;

    //处理webpack.options.conf 所有EntryName
    for (let item in entry) {
        if (!webpackEntryName.includes(item)) {
            webpackEntryName.push(item + '.js');
        }
    }

    let port = app.context.port;

    let locales = app.context.locales;

    //返回在多语言路由加载文件的正确性
    if (env === 'development' && !isEmpty(locales)) {
        let urlMatch = '';
        let urlReplaceMatch = '';
        let len = locales.length;
        for (let i = 0; i < len; i++) {
            let item = locales[i];
            if (i == len - 1) {
                urlMatch += `(${item}(.+)[.])`;
                urlReplaceMatch += `(\/${item})`;
            }
            else {
                urlMatch += `(${item}(.+)[.])|`;
                urlReplaceMatch += `(\/${item})|`;
            }
        }
        let urlRegexp = new RegExp(urlMatch);
        let urlReplaceRegexp = new RegExp(urlReplaceMatch);
        app.use(koaConvert(koaProxy({
            match: urlRegexp,
            host: `http://localhost:${port}/`,
            map: function (url) {
                if (env === 'development' && /[.]js/.test(url)) {
                    let hotUrl = '';
                    if (webpackEntryName.includes(url)) {
                        return hotUrl;
                    }
                    else if (!hotUrl) {
                        return url.replace(urlReplaceRegexp, '');
                    }
                }
                if (url.indexOf('.') > -1) {
                    return url.replace(urlReplaceRegexp, '');
                }
                else {
                    return url;
                }
            }
        })));
    }

    app.context.logger.info('proxy initialized');
};
