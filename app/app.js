import Koa from 'koa';
import log4js from 'log4js';
import session from 'koa-generic-session';
import config from './common/config';
import server from './common/server';
import router from './router/router';
import middleware from './middleware/middleware';
import views from 'koa-views';

const app = new Koa();
const logger = log4js.getLogger('app');

//日志
log4js.configure({
    appenders: [
        { type: 'console', layout: { type: 'basic' } }
    ],
    replaceConsole: true
});

//session
app.keys = ['keys', 'keykeys'];
app.use(session());

//catchError
app.use(middleware.catchError);


server.init();

//模板渲染
app.use(views(__dirname + '/view', {
    extension: 'hbs',
    map: { hbs: 'handlebars' }
}));


//热加载
// var webpack = require("webpack");
// var webpackConf = require("../build/webpack.dev.conf");
// var compiler = webpack(webpackConf);
// import koaWebpack from 'koa-webpack';
// app.use(koaWebpack({
//   compiler: compiler
// }))

//路由
app.use(router.routes(), router.allowedMethods());

//监听
app.listen(config.server.port, () => {
    logger.info('server listen on ' + config.server.port);
});
