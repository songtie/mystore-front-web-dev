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
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
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
    devServer: {
        static: './dist',
    },
    mode : 'development',
};

module.exports = config;