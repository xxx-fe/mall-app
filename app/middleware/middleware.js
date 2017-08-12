import path from 'path';
import fs from 'fs';
import common from '../common/common';

/**
 * 错误处理
 */
async function catchError(ctx, next) {
    try {
        await next();
        if (ctx.status === 404) ctx.throw(404);
    } catch (err) {
        let status = err.status || 500;
        if (status < 0) {
            status = 500;
        }
        ctx.status = status;
        ctx.state = {
            status: status,
            // helpers: helpers,
            currentUser: null,
        };
        if (status === 500) {
            console.log('server error', err, ctx);
        }
        await ctx.render('common/error', {error: err});
    }
}

/**
 * handlebars布局
 * 主要解析.hbs文件,返回请求文件
 */
async function handlebarsLayouts(ctx, next) {
    let handlebars = require('handlebars');
    let layouts = require('handlebars-layouts');
    layouts.register(handlebars);
    //解析view(.hbs)模板
    common.readDirSync(path.join(__dirname, '../view/'), function (fileName, isDirectory, dirPath) {
        let isHbsFile = (dirPath.indexOf('.') !== 0) && (dirPath.slice(-4) === '.hbs');
        if (!isDirectory && isHbsFile) {
            let hbsName = path.basename(dirPath, '.hbs');
            handlebars.registerPartial(hbsName, fs.readFileSync(dirPath, 'utf8'));
        }
    });


    let manifest = '';
    let existsManifest = fs.existsSync(path.join(__dirname, '../../dist/manifest.json'));
    if (existsManifest) {
        manifest = require('../../dist/manifest.json');
    }

    //解析url
    handlebars.registerHelper('parseUrl', function (url) {
        let NODE_ENV = process.env.NODE_ENV;
        let appName = ctx.state.appName + '.css';
        let fileName = url.replace(/\.js/, '');
        // && webpackOptions.entry[fileName]
        //是否应该插入chunks/css
        // console.log(`appName: ${appName} fileName: ${fileName} NODE_ENV: ${NODE_ENV} isAppendChunks ${isAppendChunks}`);
        //开发模式读取热加载地址
        if (NODE_ENV === 'development') {
            if (url.indexOf('.js') > -1) {
                return `<script src="${url}"></script>`;
            }
            //dist可能存在css,但当前app的css就不加载了,避免冲突
            else if (url.indexOf('.css') > -1 && appName !== fileName && manifest) {
                let cssUrl = manifest[url];
                return `<link href="${cssUrl}" type="text/css" rel="stylesheet"/>`
            }
        }
        //生产模式读取dist地址
        else if (NODE_ENV === 'production' && manifest) {
            let html = [];
            if (url.indexOf('.css') > -1) {
                let cssUrl = manifest[url];
                //判断是否存在生产模式的css
                let existsCss = fs.existsSync(path.join(__dirname, '../../' + cssUrl));
                if (existsCss) {
                    html.push(`<link href="${cssUrl}" type="text/css" rel="stylesheet"/>`);
                }
            }
            else if (url.indexOf('.js') > -1) {
                let jsUrl = manifest[url];
                //判断是否存在生产模式的js
                let existsJs = fs.existsSync(path.join(__dirname, '../../' + jsUrl));
                if (existsJs) {
                    //头部插入通用chunks
                    if (url === 'header.js') {
                        {
                            html.push(`<script src="${manifest['manifest.js']}"></script>`);
                            html.push(`<script src="${manifest['vendor.js']}"></script>`);
                        }
                    }
                    html.push(`<script src="${jsUrl}"></script>`);
                }
            }
            return html.join('');
        }
    });
    await next();
}

export default {
    catchError,
    handlebarsLayouts
}
