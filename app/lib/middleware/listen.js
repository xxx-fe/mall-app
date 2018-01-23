/**
 * 监听
 */
export const listen = async (app) => {
    let port = app.context.getEnvConfigProp('port');
    app.listen(port, () => {
        console.info('server listen on ' + port);
    });
};
