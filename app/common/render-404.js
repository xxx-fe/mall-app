/**
 * 渲染404页面
 */
export const render404 = (ctx) => {
    return ctx.render('common/error-404', {title: 'error'});
};
