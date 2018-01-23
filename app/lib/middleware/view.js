import views from 'koa-views';
import path from 'path';
/**
 * 模板引擎
 */
export const view = async (app) => {
    app.use(views(path.join(path.resolve('./app/view')), {
        extension: 'hbs',
        map: {
            hbs: 'handlebars'
        }
    }));
    console.log('view initialized');
};
