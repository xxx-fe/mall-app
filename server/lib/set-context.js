const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const configYml = path.join(__dirname, '../../config.yml');
const config = yaml.safeLoad(fs.readFileSync(configYml));
const isEmptyArray = require('./utils/is-empty-array');

/**
 * app上下文配置
 */
function appContextConfig(app) {
    let argv = process.argv.splice(2);
    let env = process.env.NODE_ENV = argv[0] !== 'production' ? 'development' : 'production';
    let appConfig = Object.assign({},
        config,
        config[env],
        {env: env},
        {urlLocalesRegExp: ''}
    );
    let locales = config.locales;
    //多语言前缀
    if (!isEmptyArray(locales)) {
        let regexp = '';
        for (let i = 0; i < locales.length; i++) {
            let item = locales[i];
            if (i === locales.length - 1) {
                regexp += `${item}`;
            }
            else {
                regexp += `${item}|`;
            }
        }
        if (regexp) {
            //regexp = new RegExp(regexp);
            appConfig.urlLocalesRegExp = `(${regexp})*/`;
        }
    }
    delete appConfig['development'];
    delete appConfig['production'];

    for (let item in appConfig) {
        app.context[item] = appConfig[item];
    }

}

/**
 * 设置上下文
 */
module.exports.default = module.exports = async (app) => {
    appContextConfig(app);
    console.log('set-context initialized');
};
