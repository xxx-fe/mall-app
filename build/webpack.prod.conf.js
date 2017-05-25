var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf');
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin');

var env = config.build.env;
//自定义webpack配置(主要自定义入口)
let webpackOptionConf = require('../webpack.options.conf');
baseWebpackConfig = Object.assign({}, baseWebpackConfig, webpackOptionConf);

var fs = require('fs');
let travel = (dir, callback) => {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);
        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}
//获取全部入口,打包全部
let getAllEntry = () => {
    var files = {};
    var jsPath = path.resolve('./src/page');
    travel(jsPath, function (pathName) {
        if (/.js/.test(pathName)) {
            let fileName = pathName.split('\\');
            fileName = fileName[fileName.length - 1];
            //mac & linux
            let travelpath = pathName.split('\/');
            //windows
            travelpath = (travelpath.length > 1) ? travelpath : pathName.split('\\');
            let entryName = '';
            if (travelpath.length > 1) {
                let entryPath = pathName.match(/page.+/)[0];
                entryPath = entryPath.replace(/\\/ig ,'\/');
                entryName = entryPath.replace(/\.js/, '').replace(/page\//, '');
                files[entryName] = `./src/${entryPath}`;
            }
        }
    });
    return files;
}
var webpackConfig = merge(baseWebpackConfig, {
    entry: getAllEntry(),
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    // devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        // new HtmlWebpackPlugin({
        //   filename: config.build.index,
        //   template: 'index.html',
        //   inject: true,
        //   minify: {
        //     removeComments: true,
        //     collapseWhitespace: true,
        //     removeAttributeQuotes: true
        //     // more options:
        //     // https://github.com/kangax/html-minifier#options-quick-reference
        //   },
        //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        //   chunksSortMode: 'dependency'
        // }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new ManifestPlugin({
            publicPath: '/dist/'
        })
        // copy custom static assets
        // new CopyWebpackPlugin([
        //   {
        //     from: path.resolve(__dirname, '../static'),
        //     to: config.build.assetsSubDirectory,
        //     ignore: ['.*']
        //   }
        // ])
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

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
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
