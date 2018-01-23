/**
 * 监听
 */
export const listen = async (app) => {
    let port = app.context.port || 3333;
    app.listen(port, () => {
        console.info('server listen on ' + port);
    });
};
