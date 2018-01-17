/**
 * yaml配置文件
 */
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const configYml = path.join(__dirname, '../../config.yml');
const config = yaml.safeLoad(fs.readFileSync(configYml));
export default config;
