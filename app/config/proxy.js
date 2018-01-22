import path from 'path';
import koaProxy from 'koa-proxy';
import koaConvert from 'koa-convert';

/**
 * 代理
 */
export const proxy = async (app) => {
    let webpackOptionConf = require('../../webpack.options.conf');
    let entry = webpackOptionConf.entry;
    let webpackEntryName = [];
    let webpackMatch = '';
    let env = app.context.env;
    for (let item in entry) {
        if (!webpackEntryName.includes(item)) {
            webpackEntryName.push(item + '.js');
        }
    }

    //生成webpack入正则
    if (webpackEntryName) {
        let len = webpackEntryName.length;
        for (let i = 0; i < len; i++) {
            let item = webpackEntryName[i];
            if (i == len - 1) {
                webpackMatch += `((.+)${item})`;
            }
            else {
                webpackMatch += `((.+)${item})|`;
            }
        }
    }

    let port = app.context.getEnvConfigProp('port');

    //处理热加载路径(多语言)
    app.use(koaConvert(koaProxy({
        match: /zh(.+)[.]/,
        host: `http://localhost:${port}/`,
        map: function (url) {
            if (env === 'development' && /[.]js/.test(url)) {
                let hoturl = '';
                if (webpackEntryName.includes(url)) {
                    return hoturl;
                }
                else if (!hoturl) {
                    return url.replace(/\/zh/, '');
                }
            }
            if (url.indexOf('.') > -1) {
                return url.replace(/\/zh/, '');
            }
            else {
                return url;
            }
        }
    })));

    //处理热加载路径js
    if (env === 'development' && webpackEntryName) {
        let webpackMatchRegexp = new RegExp(webpackMatch);
        // console.log('webpackMatchRegexp:' + webpackMatchRegexp)
        app.use(koaConvert(koaProxy({
            match: webpackMatchRegexp,
            host: `http://localhost:${port}/`,
            map: function (url) {
                if (/[.]js/.test(url)) {
                    return path.basename(url);
                }
                else {
                    return url;
                }
            }
        })));
    }
}
