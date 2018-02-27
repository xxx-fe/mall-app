const KoaBodyParser  = require('koa-bodyparser');
/**
 * bodyparser
 */
module.exports.default = module.exports = async (app) => {
    app.use(KoaBodyParser());
    console.log('body-parser initialized');
};
