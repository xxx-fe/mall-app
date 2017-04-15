/*
 *@fileOverview 中间件
 *@auth subying
 */
const log4js      = require('log4js');
const logger      = log4js.getLogger('router');

const tpl         = require('./tpl');

module.exports = (ctx) => {
    logger.info(ctx.request.url,ctx.headers['user-agent']);

    //共享数据
    ctx._data = {};

    //渲染模板方法
    ctx.render = tpl.bind(ctx);
};
