const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require('./config');
const webpack = require('webpack');
const utils = require('./build/utils');
const env = config.build.env;
module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                  mangle: { // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/92
                      safari10: true,
                  }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
            chunks: "all",
            // 表示在压缩前的最小模块大小，默认为0；
            minSize: 30000,
            minChunks: 1,
            //最大的按需(异步)加载次数，默认为1；
            maxAsyncRequests: 3,
            //最大的初始化加载次数，默认为1；
            maxInitialRequests: 3,
            //缓存组，目前在项目中设置cacheGroup可以抽取公共模块，不设置则不会抽取
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),

        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),

        new webpack.HashedModuleIdsPlugin(),

        new ManifestPlugin({
            publicPath: '/dist/'
        })
    ]
};
