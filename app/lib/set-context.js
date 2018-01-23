const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const configYml = path.join(__dirname, '../../config.yml');
const config = yaml.safeLoad(fs.readFileSync(configYml));
import {isEmptyArray} from './utils/is-empty-array';

/**
 * app上下文配置
 */
function appContextConfig(app) {
    let argv = process.argv.splice(2);
    let env = process.env.NODE_ENV = argv[0] !== 'production' ? 'development' : 'production';
    let appConfig = Object.assign({},
        config,
        config[env],
        {env: env}
    );
    let lang = config.lang;
    //多语言前缀
    if (!isEmptyArray(lang)) {
        let regexp = '';
        for (let i = 0; i < lang.length; i++) {
            let item = lang[i];
            if (i === lang.length - 1) {
                regexp += `\/(${item})`;
            }
            else {
                regexp += `\/(${item})|`;
            }
        }
        if (regexp) {
            regexp = new RegExp(regexp);
            appConfig.urlLangRegExp = regexp;
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
export const setContext = async (app) => {
    appContextConfig(app);

    console.log('set-context initialized');
};
