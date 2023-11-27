//引入开发的配置
let config = require('./webpack.dev');
//压缩css
let OptimizeCssAssetsPlugin = require('optimize-css-assets-plugin');

//压缩js
config.mode = 'production';
//压缩css
config.plugins.push(new OptimizeCssAssetsPlugin());

//暴露接口
module.exports = config;