/**
 * handlebars 中间件
 * 主要注册 handlebars partial,helper
 */
const path = require('path');
const fs = require('fs');
const readDirSync = require('../utils/read-dirsync');
const handlebars = require('handlebars');

let manifest = '';
let existsManifest = fs.existsSync(path.resolve('./dist/manifest.json'));
if (existsManifest) {
    manifest = require(path.resolve('./dist/manifest.json'));
}
const isEmpty = require('lodash/isEmpty');

/**
 * dev 环境插入文件
 */
const appendFileForDev = (ctx, url) => {
    let appName = ctx.state.appName + '.css';
    let fileName = url.replace(/\.js/, '');
    if (url.indexOf('.js') > -1) {
        if (url === 'header.js') {
            let html = [];
            if (ctx.urlLocalesRegExp) {
                let localeJS = `./web/locale/${ctx.state.locale}.js`;
                let existsLocaleJS = fs.existsSync(path.resolve(localeJS));
                if (existsLocaleJS) {
                    html.push(`<script src="${localeJS}"></script>`);
                }
            }
            //插入mockjs
            if (ctx.app.context.isMockAPI) {
                html.push(`<script src="/public/vendor/mockjs/dist/mock-min.js"></script>`);
            }
            //不插入全局entry
            if (!ctx.globalEntry.includes(url)) {
                html.push(`<script src="${url}"></script>`);
            }
            return html.join('');
        }
        else {
            if (!ctx.globalEntry.includes(url) && url.indexOf('/') === -1) {
                if (ctx.originalUrl.match(new RegExp('\/', 'g')).length > 0) {
                    return `<script src="/${url}"></script>`;
                }
                else {
                    return `<script src="${url}"></script>`;
                }
            }
        }
    }
    //dist可能存在css,但当前app的css就不加载了,避免冲突
    else if (url.indexOf('.css') > -1 && appName !== fileName && manifest) {
        let cssUrl = manifest[url];
        if (cssUrl) {
            return `<link href="${cssUrl}" type="text/css" rel="stylesheet"/>`
        }
    }
};

/**
 * prod 环境插入文件
 */
const appendFileForProd = (ctx, url) => {
    let html = [];
    if (url.indexOf('.css') > -1) {
        let cssUrl = manifest[url];
        //判断是否存在生产模式的css
        if (cssUrl) {
            html.push(`<link href="${cssUrl}" type="text/css" rel="stylesheet"/>`);
        }
    }
    else if (url.indexOf('.js') > -1) {
        let jsUrl = manifest[url];
        //头部插入通用chunks
        if (url === 'header.js') {
            html.push(`<script src="${manifest['manifest.js']}"></script>`);
            html.push(`<script src="${manifest['vendor.js']}"></script>`);
            let vendorCss = manifest['vendor.css'];
            if (vendorCss) {
                html.push(`<link href="${vendorCss}" type="text/css" rel="stylesheet"/>`);
            }
        }
        html.push(`<script src="${jsUrl}"></script>`);
    }

    if (!isEmpty(html)) {
        return html.join('');
    }
};


/**
 * 解析url
 */
const parseUrl = (url, ctx) => {
    try {
        if (url || typeof url !== 'number') {
            if (ctx.env === 'development') {
                return appendFileForDev(ctx, url);
            }
            //生产模式读取dist地址
            else if (ctx.env === 'production' && manifest) {
                return appendFileForProd(ctx, url);
            }
        }
    } catch (err) {
        console.warn('handlebars parseUrl exception');
        console.warn(err);
    }
};

/**
 * handlebars布局
 * 主要解析.hbs文件,返回请求文件
 */
const layouts = async (ctx, next) => {
    let layouts = require('handlebars-layouts');
    layouts.register(handlebars);

    //解析view(.hbs)模板,注册partial
    readDirSync(path.join(__dirname, '../../view/layout'), function (fileName, isDirectory, dirPath) {
        let isHbsFile = (dirPath.indexOf('.') !== 0) && (dirPath.slice(-4) === '.hbs');
        if (!isDirectory && isHbsFile) {
            let hbsName = path.basename(dirPath, '.hbs');
            handlebars.registerPartial(hbsName, fs.readFileSync(dirPath, 'utf8'));
        }
    });

    //解析url,注册helper
    handlebars.registerHelper('parseUrl', function (urls) {
        let url = [];
        for (let i = 0; i < arguments.length - 1; i++) {
            let item = parseUrl(arguments[i], ctx);
            if (item) {
                url.push(item);
            }
        }
        if (url.length > 0) {
            return url.join('');
        }
    });

    //挂载ctx.state到window
    handlebars.registerHelper('mountState', function () {
        return `<script type="text/javascript">window.APPSTATE = ${JSON.stringify(ctx.state)}</script>`;
    });

    await next();
};


/**
 * handlebarsHelper
 * 输出raw内容
 */
const rawHelper = async (ctx, next) => {
    handlebars.registerHelper('raw', function (options) {
        return options.fn(this);
    });
    await next();
};

/**
 * handlebarsPartial
 */
module.exports.default = module.exports = async (app) => {
    app.use(layouts);
    app.use(rawHelper);
    app.context.logger.info('handlebars initialized');
};
