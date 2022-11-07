const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlPluginConfig = function (name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name],
    }
};


module.exports = {
    entry: {
        'index'                 : './src/page/index/index.js',
        'product-list'          : './src/page/product-list/index.js',
        'product-detail'        : './src/page/product-detail/index.js',
        'user-login'            : './src/page/user-login/index.js',
        'user-register'         : './src/page/user-register/index.js',
        'result'                : './src/page/result/index.js',
        'user-center'           : './src/page/user-center/index.js',
        'user-update'           : './src/page/user-update/index.js',
        'user-password-reset'   : './src/page/user-password-reset/index.js',
        'user-password-update'  : './src/page/user-password-update/index.js',
        //'common'    : './src/page/common/index.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'resources/[name][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                //use: ['style-loader', 'css-loader'],
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(htm|string)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        esModule: false
                    }
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|gif|jpg|jpeg|png|avif|webp)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'css/[name].css' }),

        new HtmlWebpackPlugin(getHtmlPluginConfig('index')),

        new HtmlWebpackPlugin(getHtmlPluginConfig('product-list')),

        new HtmlWebpackPlugin(getHtmlPluginConfig('product-detail')),


        new HtmlWebpackPlugin(getHtmlPluginConfig('user-login')),

        new HtmlWebpackPlugin(getHtmlPluginConfig('user-register')),

        new HtmlWebpackPlugin(getHtmlPluginConfig('result')),

        new HtmlWebpackPlugin(getHtmlPluginConfig('user-center')),

        new HtmlWebpackPlugin(getHtmlPluginConfig('user-update')),

        new HtmlWebpackPlugin(getHtmlPluginConfig('user-password-reset')),

        new HtmlWebpackPlugin(getHtmlPluginConfig('user-password-update')),

    ],
    optimization: {
        minimize : false,
        //runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    minSize: 0
                }
            }
        }
    },
    resolve: {
        alias: {
            page: path.resolve(__dirname, '/src/page'),
            utils: path.resolve(__dirname, '/src/utils'),
            view: path.resolve(__dirname, '/src/view'),
            service: path.resolve(__dirname, '/src/service'),
            node_modules: path.resolve(__dirname, '/node_modules'),
            dist: path.resolve(__dirname, '/dist'),
        }
    },
    devServer: {
        static: './dist',
    },
    mode: "development",
    devtool: 'source-map',
};