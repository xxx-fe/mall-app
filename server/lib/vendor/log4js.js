var log4js = require('log4js');
log4js.configure({
    appenders: {
        console: {type: 'console', layout: {type: "basic"}},
    },
    categories: {
        default: {appenders: ['console'], level: 'all'}
    },
    //pm2-cluster模式使用
    //disableClustering: true
});
var logger = log4js.getLogger('default');

/**
 * log4js 配置
 */
module.exports = logger;
