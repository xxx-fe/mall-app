const KoaBodyParser  = require('koa-bodyparser');
/**
 * bodyparser
 */
module.exports.default = module.exports = async (app) => {
    app.use(KoaBodyParser());
    app.context.logger.info('body-parser initialized');
};
