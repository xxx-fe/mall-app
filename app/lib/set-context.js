/**
 * 设置上下文
 */
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const configYml = path.join(__dirname, '../../config.yml');
const config = yaml.safeLoad(fs.readFileSync(configYml));
import {isEmptyArray} from './utils/is-empty-array';

export const setContext = async (app) => {
    let argv = process.argv.splice(2);
    let env = process.env.NODE_ENV = argv[0] !== 'production' ? 'development' : 'production';
    app.context.env = env;
    app.context.config = config;
    /**
     * 获取环境属性
     */
    app.context.getEnvConfigProp = (name) => {
        return app.context.config[app.context.env][name] || '';
    };
    let urlLangPrefix = app.context.config.urlLangPrefix;

    //多语言前缀
    if (!isEmptyArray(urlLangPrefix)) {
        let regexp = '';
        for (let i = 0; i < urlLangPrefix.length; i++) {
            let item = urlLangPrefix[i];
            if (i === urlLangPrefix.length - 1) {
                regexp += `\/(${item})`;
            }
            else {
                regexp += `\/(${item})|`;
            }
        }
        if (regexp) {
            regexp = new RegExp(regexp);
            app.context.urlLangRegExp = regexp;
        }
    }
};
