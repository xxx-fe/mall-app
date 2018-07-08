const views = require('koa-views');
const path = require('path');
/**
 * 模板引擎
 */
module.exports.default = module.exports = async (app) => {
    app.use(views(path.join(path.resolve('./server/view')), {
        extension: 'hbs',
        map: {
            hbs: 'handlebars'
        }
    }));
    app.context.logger.info('view initialized');
};
