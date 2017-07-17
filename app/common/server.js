import path from 'path';
import fs from 'fs';
import common from './common';
import webpackOptions from '../../webpack.options.conf';
const server = {
    /**
     *  模板布局
     */
    handlebarsLayouts() {
        var handlebars = require('handlebars');
        var layouts = require('handlebars-layouts');
        layouts.register(handlebars);

        //解析view(.hbs)模板
        common.readDirSync(path.join(__dirname, '../view/'), function (fileName, isDirectory, dirPath) {
            let isHbsFile = (dirPath.indexOf('.') !== 0) && (dirPath.slice(-4) === '.hbs');
            if (!isDirectory && isHbsFile) {
                let hbsName = path.basename(dirPath, '.hbs');
                handlebars.registerPartial(hbsName, fs.readFileSync(dirPath, 'utf8'));
            }
        });

        //解析url
        handlebars.registerHelper('parseUrl', function (url) {
            var entryName = url.replace(/\.js/, '');
            //是否应该插入chunks
            var isAppendChunks = (process.env.NODE_ENV == 'development' && !webpackOptions.entry[entryName]);

            //开发模式 读取热加载地址
            if (process.env.NODE_ENV == 'development' && webpackOptions.entry[entryName]) {
                if (url.indexOf('.js') > -1) {
                    return `<script src="${url}"></script>`;
                }
            }
            //生产模式 读取dist地址
            else if ((process.env.NODE_ENV == 'production' || isAppendChunks) && fs.existsSync(path.join(__dirname,'../../dist/manifest.json'))) {
                console.log(url + '      '+ webpackOptions.entry[entryName])
                let html = [];
                const manifest = require('../../dist/manifest.json');
                //判断是否存在生产模式的css
                if (url.indexOf('.css') > -1) {
                    let cssUrl = manifest[url];
                    var existsCss = fs.existsSync(path.join(__dirname, '../../' + cssUrl));
                    if (existsCss) {
                        html.push(`<link href="${cssUrl}" type="text/css" rel="stylesheet"/>`);
                    }
                } else if (url.indexOf('.js') > -1) {
                    //判断是否存在生产模式的js
                    let jsUrl = manifest[url]
                    var existsJs = fs.existsSync(path.join(__dirname, '../../' + jsUrl));
                    if (existsJs) {
                        //头部插入通用chunks
                        if (url === 'header.js' || isAppendChunks) {
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
    },
    init() {
        this.handlebarsLayouts();
    }
}
export default server;
