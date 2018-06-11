const log4js = require('log4js');
/**
 * 日志
 */
module.exports.default = module.exports = async (app) => {
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
