import path from 'path';
import fs from 'fs';
import {readDirSync} from '../utils/read-dirsync';

const handlebars = require('handlebars');

let manifest = '';
let existsManifest = fs.existsSync(path.resolve('./dist/manifest.json'));
if (existsManifest) {
    manifest = require(path.resolve('./dist/manifest.json'));
}

/**
 * 解析url
 */
const parseUrl = (url, ctx) => {
    if (url || typeof url !== 'number') {
        let appName = ctx.state.appName + '.css';
        let fileName = url.replace(/\.js/, '');
        let basePath = '../../../';
        if (ctx.env === 'development') {
            if (url.indexOf('.js') > -1) {
                return `<script src="${url}"></script>`;
            }
            //dist可能存在css,但当前app的css就不加载了,避免冲突
            else if (url.indexOf('.css') > -1 && appName !== fileName && manifest) {
                let cssUrl = manifest[url];
                if (cssUrl) {
                    return `<link href="${cssUrl}" type="text/css" rel="stylesheet"/>`
                }
            }
        }
        //生产模式读取dist地址
        else if (ctx.env === 'production' && manifest) {
            let html = [];
            if (url.indexOf('.css') > -1) {
                let cssUrl = manifest[url];
                //判断是否存在生产模式的css
                let existsCSS = fs.existsSync(path.join(__dirname, `${basePath}${cssUrl}`));
                if (existsCSS) {
                    html.push(`<link href="${cssUrl}" type="text/css" rel="stylesheet"/>`);
                }
            }
            else if (url.indexOf('.js') > -1) {
                let jsUrl = manifest[url];
                //判断是否存在生产模式的js
                let existsJS = fs.existsSync(path.join(__dirname, `${basePath}${jsUrl}`));
                if (existsJS) {
                    //头部插入通用chunks
                    if (url === 'header.js') {
                        html.push(`<script src="${manifest['manifest.js']}"></script>`);
                        html.push(`<script src="${manifest['vendor.js']}"></script>`);
                    }
                    html.push(`<script src="${jsUrl}"></script>`);
                }
            }
            return html.join('');
        }
    }
};


/**
 * handlebars布局
 * 主要解析.hbs文件,返回请求文件
 */
const layouts = async (ctx, next) => {
    let layouts = require('handlebars-layouts');
    layouts.register(handlebars);
    //解析view(.hbs)模板
    readDirSync(path.join(__dirname, '../../view/common'), function (fileName, isDirectory, dirPath) {
        let isHbsFile = (dirPath.indexOf('.') !== 0) && (dirPath.slice(-4) === '.hbs');
        if (!isDirectory && isHbsFile) {
            let hbsName = path.basename(dirPath, '.hbs');
            handlebars.registerPartial(hbsName, fs.readFileSync(dirPath, 'utf8'));
        }
    });

    //解析url
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
 * 捕获错误
 */
export const handlebarsHelper = async (app) => {
    app.use(layouts);
    app.use(rawHelper);
    console.log('handlebars-helper initialized');
};
