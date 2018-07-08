const koaHelmet = require('koa-helmet');
/**
 * 头盔
 * 安全性
 */
module.exports.default = module.exports = async (app) => {
    app.use(koaHelmet());
    app.context.logger.info('helmet initialized');
};
