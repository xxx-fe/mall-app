/*
 * @description 设置模块
 * @auth subying
 */
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const _file = path.join(__dirname,'../config.yml');
const config = yaml.safeLoad(fs.readFileSync(_file));

const setting = config;

module.exports = setting;
