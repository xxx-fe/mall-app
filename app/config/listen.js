import log4js from 'log4js'
const logger = log4js.getLogger('app');
/**
 * 监听
 */
export const listen = async (app) => {
    //日志
    log4js.configure({
        appenders: [{
            type: 'console',
            layout: {
                type: 'basic'
            }
        }],
        replaceConsole: true
    });
    let port = app.context.getEnvConfigProp('port');
    app.listen(port, () => {
        logger.info('server listen on ' + port);
    });
}
