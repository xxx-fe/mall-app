const koaWebpack = require('koa-webpack');
const path = require('path');
/**
 * webpack
 */
module.exports.default = module.exports = async (app) => {
    //如果是生产模式则不加载
    if (app.context.env === 'development') {
        const webpack = require("webpack");
        const webpackConf = require(path.resolve('./build/webpack.dev.conf'));
        const compiler = webpack(webpackConf);
        koaWebpack(
            {
                compiler: compiler,
                devMiddleware: {
                    publicPath: '/',
                    logLevel: 'silent',
                },
                hotClient: {
                    logLevel: 'silent',
                }

            }
        )
            .then((middleware) => {
                app.use(middleware);
            });
    }
};
