/*
 *@fileOverview 路由定义
 *@auth subying
 */
const path = require('path');
const fs = require('fs');

const KoaRouter = require('koa-router');
const router = new KoaRouter();
const log4js = require('log4js');
const logger = log4js.getLogger('router');

const setting = require('../common/setting');
const _cpath = '../' + setting.path.controllers + '/';


const routersPad = {
    init: function () {
        //首页
        router.get('/', async (ctx, next) => {
            await this.bindController('index', ctx, next);
        });

        //404页面
        router.get('/404', async (ctx, next) => {
            await this.bindController('bad', ctx, next);
        });

        //没有设置控制器的页面
        router.get('*', async (ctx, next) => {
            await this.bindController('bad', ctx, next);
        });

        return router.routes();
    },

    bindController: async function (name, ctx) {
        try {
            const controller = this.getContrller(name);
            await controller.bind(ctx)(ctx);
        } catch (e) {
            //打印错误 并跳转到404
            logger.error(ctx.url, JSON.stringify({
                get: ctx.request.query,
                post: ctx.request.body
            }), e.stack);

            ctx.redirect('/404');
        }
    },
    /*
     * 获取控制器
     */
    getContrller: (name) => {
        const _path = _cpath + name + '.js';

        //转换文件绝对路径
        const filePath = path.resolve(__dirname, _path);

        //判断文件是否存在
        if (fs.existsSync(filePath)) {
            return require(_path);
        } else {
            throw Error('controllers is not exists');
        }
    }
};

module.exports = routersPad;
