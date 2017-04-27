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
const session     = require('koa-generic-session');

const setting     = require('./server/common/setting');
const middleware  = require('./server/common/middleware');
const routers     = require('./server/router/router');



//配置全局通用只需要设置一次
log4js.configure({
    appenders: [
        { type: 'console',layout:{type:'basic'}}
    ],
    replaceConsole: true
});

//设置session用到的key 类似前缀
app.keys = ['keys', 'keykeys'];

app
//格式化请求  针对于post
.use(koaBody({ multipart: true }))
.use(session()) // session
.use(async (ctx, next) => {
    //判断是否首页
    if (ctx.path === '/') {
        await next();
    }else{
        //允许隐藏文件
        const res = await send(ctx,ctx.path,{root: path.join(__dirname,'/dist/'),hidden: true});
        //判断是否有返回结果,有返回结果则表示找到该静态文件,如果没有则往下执行
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
    //往下执行
    await next();
})
//初始化路由
.use(routers.init())
.listen(setting.server.port, () => {
    logger.info('server listen on ' + setting.server.port);
});
