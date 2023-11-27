let path = require('path');
//引入vue-loader插件
let { VueLoaderPlugin } = require('vue-loader');
let HtmlWebpackPlugin = require('html-webpack-plugin');
//拆分css
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let webpack = require('webpack');
const { env } = require('process');

const root = process.cwd();
//配置
module.exports = {
    stats:{errorDetails: true},
    //模式
    mode: "development",
    //入口
    entry: "./src/main.js",
    //发布
    output: {
        //相对位置 打包结果存放的目录
        path: path.join(root,'/server'),
        //静态资源打包发布的文件名称
        filename: 'static/js/[name].js',
        //chunkFilename：打包结果异步模块的文件名称
        //资源的公共路径，在html中引用打包结果的资源时，会在路径前面加上publicPath
        publicPath: '/'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@': path.join(root,'src'),
            '@v': path.join(root,'src/views'),
            '@c': path.join(root,'src/components'),
            '@t': path.join(root,'src/tools')
        },
        extensions: ['.vue', '.js','.json']
    },
    //模块
    module: {
        rules: [
            //vue
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            //CSS
            {
                test: /\.css$/,
                use: ['style-loader', 
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { esModule: false}
                    }, 
                    {
                        loader: 'css-loader',
                        options:{ url: false}
                    }, 'postcss-loader']
            },
            //less
            {
                test: /\.less$/,
                use: ['style-loader', {
                    loader: MiniCssExtractPlugin.loader,
                    options: { esModule: false}
                },{
                    loader: 'css-loader',
                    options:{ url: false}
                }, 'postcss-loader', 'less-loader']
            },
            //scss
            {
                test: /\.scss$/,
                use: ['style-loader', {
                    loader: MiniCssExtractPlugin.loader,
                    options: { esModule: false}
                },{
                    loader: 'css-loader',
                    options:{ url: false}
                }, 'postcss-loader','sass-loader']
            },
            //字体图标
            {
                test: /\.(ttf|woff)$/,
                //loader: 'url-loader'
                type: 'asset/resource',
                //dependency: { not: ['url']},
                generator: { filename: 'static/fonts/[name][hash:6][ext]' }
            },
            {
                test: /.(png|jpg|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: { maxSize: 1024 * 5 }
                },
                generator: {
                    filename: "static/img/[name].[hash:6][ext]"
                }
                // use: ['url-loader?limit=8192&name=./[name].[ext]']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            /* 'process.env': {
                ...env
            }  */
        }),
        //vue
        new VueLoaderPlugin(),
        //发布
        new HtmlWebpackPlugin({
            //模板
            template: "public/index.html",
            //发布
            filename: "views/chuangshiji.html",
            //指纹
            hash: true
        }),
        //拆分css 将css抽离成单独的文件，避免js文件体积过大
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css'
        })
    ],
     //优化
    optimization: {
        //拆分库文件
        splitChunks: {
            //分组
            cacheGroups: {
                lib: {
                    name: 'lib',
                    chunks: 'initial',
                    test: /node_modules/
                }
            }
        },
       //nodeEnv: false
    },
    devServer: {
        proxy: {
            
        }
    }
}