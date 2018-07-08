const logger = require('koa-logger');
/**
 * 日志
 */
module.exports.default = module.exports = async (app) => {
    app.use(logger((str, args) => {
        console.log(str)
    }));
    app.context.logger.info('logger initialized');
};
