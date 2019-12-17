const api = require('../api/index');
class page {
    async home(ctx, _next) {
        let locals = {
            appId: 'home',
            title: '首页'
        };
        //按需加载下必填,否则可忽略.
        ctx.state.appKey = 'home/index';
        //中台获取数据
        let data = await api.getList(ctx);
        ctx.state.list = data;
        //使用common通用视图
        await ctx.render('pages/common', locals);
    }

    async test(ctx, _next) {
        let locals = {
            appId: 'test',
            title: '测试页面'
        };
        ctx.state.appKey = 'test/index';
        await ctx.render('pages/common', locals);
    }
}

module.exports = new page();
