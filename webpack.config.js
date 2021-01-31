const path = require('path');
module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public'),
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
        contentBase: path.join(__dirname, 'public')
    },
};