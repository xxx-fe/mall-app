var path = require('path');
var utils = require('./utils');
var config = require('../config');
var merge = require('webpack-merge');
var readDirSync = require('../server/lib/utils/read-dirsync');
var baseWebpackConfig = require('./webpack.base.conf');
let webpackProdConf = require('../webpack.prod.conf');
baseWebpackConfig = Object.assign({}, baseWebpackConfig, webpackProdConf);
let getAllEntry = () => {
    var files = {};
    //所有应用入口
    readDirSync(path.resolve('./web/page'), function (fileName, isDirectory, dirPath) {
        if (/.js/.test(fileName)) {
            var entryPath = path.basename(path.resolve(dirPath, './') , '.js');
            files[entryPath] = dirPath;
        }
    });
    //多语言入口
    readDirSync(path.resolve('./web/locale'), function (fileName, isDirectory, dirPath) {
        if (/.js/.test(fileName)) {
            var entryPath = path.basename(dirPath, '.js');
            files[entryPath] = dirPath;
        }
    });
    return files;
};

var webpackConfig = merge(baseWebpackConfig, {
    entry: getAllEntry(),
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    }
});

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin');
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

utils.mergeEntry(webpackConfig);

module.exports = webpackConfig;
