const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const fs = require("fs");
let entryParam={}
const readDir = (entry) => {
	const dirInfo = fs.readdirSync(entry);
	dirInfo.forEach(item=>{
		const location = path.join(entry,item);
		const info = fs.statSync(location);
		if(info.isDirectory()){
			readDir(location);
		}else{

            // console.log(`file:${location}-${item}`);
            const name=item.split('.')[0]
            const suffxi=item.split('.')[1]
            entryParam[name]=location
		}
	})
}
readDir(path.join(__dirname, 'src/tabs'))

module.exports = {
    context: __dirname,
    entry: entryParam,
    output: {
        path: path.join(__dirname, 'library'),
        libraryTarget:'umd',
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
    ],
};
