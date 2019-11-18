const logger = require('koa-logger');
/**
 * 日志
 */
module.exports.default = module.exports = async (app) => {
    app.use(logger((str, args) => {
        app.context.logger.info(str);
    }));
    app.context.logger.info('logger initialized');
};
