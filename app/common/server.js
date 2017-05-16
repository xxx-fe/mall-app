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

        //解析url
        handlebars.registerHelper('parseUrl', function(url) {
            if(process.env.NODE_ENV = 'development'){
                return `<script type="text/javascript" src=${url}></script>`;
            }
            else{
                return '';
            }
        });
    },
    init() {
        this.handlebarsLayouts();
    }
}
export default server;
