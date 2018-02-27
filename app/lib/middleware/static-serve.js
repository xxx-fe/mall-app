const path = require('path');
const serve = require('koa-static');
/**
 * 静态文件
 */
module.exports.default = module.exports = async (app) => {
    app.use(serve(path.join(path.resolve('./'))));
    console.log('static-serve initialized');
};
