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
    //处理webpack.options.conf 所有EntryName
    for (let item in entry) {
        if (!webpackEntryName.includes(item)) {
            webpackEntryName.push(item + '.js');
        }
    }

    let port = app.context.getEnvConfigProp('port');

    let urlLangPrefix = app.context.config.urlLangPrefix;

    //返回在多语言路由加载文件的正确性
    if (env === 'development' && urlLangPrefix) {
        let urlMatch = '';
        let urlReplaceMatch = '';
        let len = urlLangPrefix.length;
        for (let i = 0; i < len; i++) {
            let item = urlLangPrefix[i];
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

    //返回webpack.entry加载js的正确性
    if (env === 'development' && webpackEntryName) {
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
        let webpackMatchRegexp = new RegExp(webpackMatch);
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
