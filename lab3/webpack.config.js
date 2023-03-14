const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
    watchOptions: {
        poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            sources: {
                                list: [
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src',
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },


    plugins: [
        new HtmlWebpackPlugin({
            title: 'Index',
            template: path.resolve(__dirname, './src/pages/index.html'),
            filename: 'index.html',
        }),


        new HtmlWebpackPlugin({
            title: 'Rozklad',
            template: path.resolve(__dirname, './src/pages/rozklad.html'),
            filename: 'rozklad.html',
        }),

        new HtmlWebpackPlugin({
            title: 'Photo',
            template: path.resolve(__dirname, './src/pages/photo.html'),
            filename: 'photo.html',
        }),

        new HtmlWebpackPlugin({
            title: 'News',
            template: path.resolve(__dirname, './src/pages/news.html'),
            filename: 'news.html',
        }),

        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: 'src/assets/images',
        //             to: '../assets/images',
        //         },
        //     ],
        // }),

        new CleanWebpackPlugin(),
    ],
}
