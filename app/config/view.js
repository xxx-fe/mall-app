import bodyParser from 'koa-bodyparser';
import views from 'koa-views';
import serve from 'koa-static';
import path from 'path';

/**
 * 显示
 * 包含静态文件,bodyParser,模板渲染
 */
export const view = async (app) => {
    //koa-static
    app.use(serve(path.join(path.resolve('./'))));

    app.use(bodyParser());

    //模板渲染
    app.use(views(path.join(path.resolve('./app/view')), {
        extension: 'hbs',
        map: {
            hbs: 'handlebars'
        }
    }));
}
