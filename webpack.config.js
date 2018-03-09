const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FileListPlugin = require('./plugins/copy-assets.js')


function optimize(path) {
    let p = path.split('/'),
        filename = p.pop()

    while( (p.length > 0) && (p[p.length-1] !== 'assets') ) {
        filename = `${p.pop()}_${filename}`
    }

    console.log('filename: ', filename)
    return filename
}

module.exports = env => {
    console.log(env.NODE_ENV)
    return {
        entry: {
            app: ['babel-polyfill', './index.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        mode: env.NODE_ENV,
        module: {
            rules: [
                { 
                    test: /\.(js|jsx)$/, 
                    exclude: [
                        path.resolve(__dirname, 'node_modules')
                    ],
                    loader: 'babel-loader',
                }
            ]
        },
        resolve: {
            modules: [ 'node_modules' ]
        },
        devtool: 'source-map',
        devServer: {
            proxy: {
            '/api': 'http://localhost:3000'
            },
            port: '10001',
            host: 'localhost',
            contentBase: path.resolve(__dirname, 'dist'), 
            compress: true,
            historyApiFallback: true,
        },
        plugins: [
            // new webpack.optimize.UglifyJsPlugin(),
            new HtmlWebpackPlugin({template: './index.html'}),
            new CopyWebpackPlugin([
                {
                    from: 'src/assets/**/*',
                    to: '[folder]_[name].[ext]',
                    test: /([^/]+)\/(.+)\.png$/
                }
            ], {ignore: [ '*.js', '*.css' ]}),
            // new FileListPlugin()
        ]
    }
};