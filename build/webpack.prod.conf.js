var path = require('path');
var utils = require('./utils');
var config = require('../config');
var merge = require('webpack-merge');
var fs = require('fs');
var readDirSync = require('../server/lib/utils/read-dirsync');
var baseWebpackConfig = require('./webpack.base.conf');
let webpackProdConf = require('../webpack.prod.conf');
baseWebpackConfig = Object.assign({}, baseWebpackConfig, webpackProdConf);

const yaml = require('js-yaml');
const configYml = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../config.yml')));

var files = {};
var buildPath = configYml.buildPath;
if (buildPath) {
    for (var i = 0; i < buildPath.length; i++) {
        var buildPathItem = buildPath[i];
        readDirSync(path.resolve(buildPathItem.name), function (fileName, isDirectory, dirPath) {
            if (buildPathItem.isIndexEntry) {
                if (/\.js$/.test(fileName) && fileName === 'index.js') {
                    var entryPath = path.basename(path.join(dirPath, '../'));
                    files[entryPath] = dirPath;
                }
            }
            else {
                if (/\.js$/.test(fileName)) {
                    var entryPath = path.basename(dirPath, '.js');
                    files[entryPath] = dirPath;
                }
            }
        });
    }
}

var webpackConfig = merge(baseWebpackConfig, {
    entry: files,
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.productionSourceMap,
            extract: true
        })
    },
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
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
