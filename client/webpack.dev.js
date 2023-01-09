
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build',
        host: '0.0.0.0',
        publicPath: '/',
        hot: true,
        historyApiFallback: true,
    },
});