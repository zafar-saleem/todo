const config = require('./webpack.base');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('bundle.css');

config.plugins = config.plugins.concat([
    extractCSS,
    new webpack.optimize.UglifyJsPlugin({ comments: false  })
]);

const cssLoaders = config.module.loaders[0].loaders;
config.module.loaders[0].loaders = null;
config.module.loaders[0].loader = extractCSS.extract(cssLoaders.slice(1, 10));

module.exports = config;
