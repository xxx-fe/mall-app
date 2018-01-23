import log4js from 'log4js'
/**
 * 日志
 */
export const logger = async (app) => {
    log4js.configure({
        appenders: [{
            type: 'console',
            layout: {
                type: 'basic'
            }
        }],
        replaceConsole: true
    });
    console.log('logger initialized');
};
