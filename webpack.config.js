const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        'index'     : './src/page/index/index.js',
        'user-login': './src/page/user-login/index.js',
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
                test: /\.htm$/i,
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

        new HtmlWebpackPlugin({
            template : './src/view/index.html',
            filename : 'view/index.html',
            inject   : true,
            hash     : true,
            chunks   : ['common' , 'index'],
        }),
    
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
        }
    },
    devServer: {
        static: './dist',
    },
    mode : 'development',
};

module.exports = config;