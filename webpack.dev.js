const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    context: __dirname,
    entry: path.join(__dirname, '/src', 'main'),
    output: {
        path: path.join(__dirname, 'dist'),
    },
    devServer: {
        port: 8888,
        contentBase: path.join(__dirname, "library"),//对外提供的访问内容的路径
        compress: true,//是否启用gzip压缩
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.san$/,
                use: [
                    {
                        loader: 'babel-loader?cacheDirectory=true'
                    },
                    {
                        loader: 'san-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            // sourceMap: isProduction ? true : false,
                            javascriptEnabled: true,
                            // paths: [resolve('./')]
                        }
                    }
                ]
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.san', '.json'],
    },
    plugins: [
        new HTMLWebpackPlugin({template: 'index.html'}),
    ],
};
