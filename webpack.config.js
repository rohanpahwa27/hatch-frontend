const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
require('dotenv').config()
module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/' || '/admin/'
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
              },
              {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                  'babel-loader'
                ]
              },
              {
                test: /\.(png|svg|jpg)$/,
                use: [
                  'file-loader'
                ]
              }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public'),
        port: process.env.PORT || 8080
    },
    plugins: [new HtmlWebpackPlugin({
      template: './public/index.html'
    })],
};