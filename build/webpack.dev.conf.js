var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var webpackDevConf = require('../webpack.dev.conf');
var _ = require('lodash');
var path = require('path');
var TimeFixPlugin = require('time-fix-plugin');
var webpackEntryConf = require('../webapck.entry.conf');
var webpackHotClient = path.join(path.resolve(__dirname, '../node_modules/webpack-hot-client/client'));

baseWebpackConfig = Object.assign({}, baseWebpackConfig, webpackDevConf);

var webpackEntry = [];
Object.keys(webpackEntryConf).forEach(function (name) {
    webpackEntry.push(webpackEntryConf[name]);
});

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = webpackEntry.concat([baseWebpackConfig.entry[name]], webpackHotClient);
});

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.NamedModulesPlugin(),
        new TimeFixPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ]
});
