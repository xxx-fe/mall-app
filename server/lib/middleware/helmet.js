const koaHelmet = require('koa-helmet');
/**
 * 头盔
 * 安全性
 */
module.exports.default = module.exports = async (app) => {
    app.use(koaHelmet());
    console.log('helmet initialized');
};
