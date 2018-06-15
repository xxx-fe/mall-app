var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
let webpackDevConf = require('../webpack.dev.conf');
var _ = require('lodash');
baseWebpackConfig = Object.assign({}, baseWebpackConfig, webpackDevConf);
utils.mergeEntry(baseWebpackConfig);

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = [baseWebpackConfig.entry[name]];
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ]
});
