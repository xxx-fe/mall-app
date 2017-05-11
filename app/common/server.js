/**
 *  koa server 通用方法
 */
import path from 'path';
const server = {
    /**
     *  模板布局
     */
    handlebarsLayouts() {
        var handlebars = require('handlebars');
        var layouts = require('handlebars-layouts');
        var fs = require('fs');
        layouts.register(handlebars);
        //默认布局
        handlebars.registerPartial(
            'layoutDefault',
            fs.readFileSync(path.join(__dirname, '../view/layout/default.hbs'), 'utf8'));
    },
    init() {
        this.handlebarsLayouts();
    }
}
export default server;
