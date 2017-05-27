import path from 'path';
import fs from 'fs';
const server = {
    /**
     *  模板布局
     */
    handlebarsLayouts() {
        var handlebars = require('handlebars');
        var layouts = require('handlebars-layouts');
        layouts.register(handlebars);

        //解析布局
        let laytoutPath = path.join(__dirname, '../view/layout/');
        fs
        .readdirSync(laytoutPath)
        .filter(function (file) {
            return (file.indexOf('.') !== 0) && (file.slice(-4) === '.hbs');
        })
        .forEach(function (file) {
            let hbsPath = path.join(laytoutPath, file);
            let hbsName = path.basename(hbsPath, '.hbs');
            handlebars.registerPartial(hbsName,fs.readFileSync(hbsPath, 'utf8'));
        });


        //解析url
        handlebars.registerHelper('parseUrl', function (url) {
            //开发模式返回的URL
            if (process.env.NODE_ENV == 'development') {
                //开发模式只加载js,js模块加载各scss,js已经能解决这类问题,无需再加载css,避免出错.
                if(url.indexOf('.js') > -1){
                    return `<script src="${url}"></script>`;
                }
            }
            //生产模式返回的URL
            else {
                let html = [];
                const manifest = require('../../dist/manifest.json');
                //判断是否存在生产模式的css
                if(url.indexOf('.css') > -1){
                    let cssUrl = manifest[url];
                    var existsCss = fs.existsSync(path.join(__dirname, '../../' + cssUrl));
                    if(existsCss){
                        html.push(`<link href="${cssUrl}" type="text/css" rel="stylesheet"/>`);
                    }
                }
                else if(url.indexOf('.js') > -1){
                    //判断是否存在生产模式的js
                    let jsUrl = manifest[url]
                    var existsJs = fs.existsSync(path.join(__dirname, '../../' + jsUrl));
                    if(existsJs){
                        //头部插入通用chunks
                        if(url === 'header.js'){{
                            html.push(`<script src="${manifest['manifest.js']}"></script>`);
                            html.push(`<script src="${manifest['vendor.js']}"></script>`);
                        }}
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
