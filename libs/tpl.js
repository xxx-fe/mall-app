/*
 * @description 模板渲染
 * @auth subying
 */

const fs        = require('fs');
const path      = require('path');

const _         = require('lodash');
const ejs       = require('ejs');

const setting   = require('./setting');
const viewsPath = '../'+setting.path.views;

module.exports = function(data, tpl, status){
    const file = path.join(__dirname, viewsPath, tpl+'.html');
    let _html = null;
    _.extend(this._data, data);
    this.status = status || 200;

    _html = ejs.render(fs.readFileSync(file).toString(), this._data);

    this.body = _html;
};
