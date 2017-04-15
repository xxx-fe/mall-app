/*
 *@fileOverview app
*/
const path        = require('path');
const Koa         = require('koa');
const app         = new Koa();
const log4js      = require('log4js');
const logger      = log4js.getLogger('app');
const send        = require('koa-send');
const koaBody     = require('koa-body');

const setting     = require('./libs/setting');
const routers     = require('./libs/routers');
const middleware  = require('./libs/middleware');


//配置  全局通用  只需要设置一次
log4js.configure({
    appenders: [
        { type: 'console',layout:{type:'basic'}}
    ],
    replaceConsole: true
});


app
.use(koaBody({multipart: true}))//格式化请求  针对于post
.use(async (ctx,next) => {
    //判断是否首页
    if (ctx.path === '/'){
        await next();
    }else{
        //允许隐藏文件
        const res = await send(ctx,ctx.path,{root: path.join(__dirname,'/statics'),hidden: true});

        //判断是否有返回结果  有返回结果则表示找到该静态文件  如果没有则往下执行
        if(res){
            return false;
        }else{
            await next();
        }
    }
    return true;
})
.use(async (ctx,next) => {
    middleware(ctx);

    await next();//往下执行
})
.use(routers.init())//初始化路由
.listen(setting.server.port,() => {
    logger.info('server listen on '+setting.server.port);
});
