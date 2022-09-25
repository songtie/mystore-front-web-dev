const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlPluginConfig = function(name){
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        inject   : true,
        hash     : true,
        chunks   : ['common' , name],
    };
}

const config = {
    entry: {
        'index'     : './src/page/index/index.js',
        'user-login': './src/page/user-login/index.js',
        'user-register': './src/page/user-register/index.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename : 'resources/[name][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(htm|string)$/i,
                use: {
                    loader  : 'html-loader',
                    options : {
                        esModule : false
                    } 
                },
            },
            {
                test : /\.(woff|woff2|eot|ttf|otf)$/i,
                type : 'asset/resource',
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'css/[name].css'}),

        new HtmlWebpackPlugin(getHtmlPluginConfig('index')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-login')),
        new HtmlWebpackPlugin(getHtmlPluginConfig('user-register')),
    ],
    optimization : {
        //提取公共模块
        splitChunks: {
            cacheGroups: {
                commons: {
                    name:'common',
                    chunks: 'all', 
                    minChunks: 2,
                    minSize : 0
                }
            }
        }
    },
    resolve : {
        alias : {
            node_modules : path.resolve(__dirname, '/node_modules'),
            page         : path.resolve(__dirname, '/src/page'),
            utils        : path.resolve(__dirname, '/src/utils'),
            view         : path.resolve(__dirname, '/src/view'),
            service      : path.resolve(__dirname, '/src/service'),
        }
    },
    devServer: {
        static: './dist',
    },
    mode : 'development',
};

module.exports = config;