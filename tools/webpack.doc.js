/**
 * @file webpack configuration
 * @author leon <ludafa@outlook.com>
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MarkdownItAnchor = require('markdown-it-anchor');
const MarkdownItClass = require('./markdown-it-class');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: path.join(__dirname, '../example/index.js')
    },
    output: {
        publicPath: '/',
        filename: '[name].[chunkhash:8].js',
        path: path.join(__dirname, '../public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules|lib/
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelcase: true
                        }
                    }
                ]
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'rct-md-loader',
                        options: {
                            codeBlock: {
                                loader: 'babel-loader',
                                props: {
                                    className: 'markdown-body'
                                }
                            },
                            use: [
                                [
                                    MarkdownItAnchor,
                                    {
                                        level: 1,
                                        permalink: true,
                                        permalinkBefore: true,
                                        slugify(title) {
                                            return title.replace(/ /g, '_');
                                        }
                                    }
                                ],
                                [
                                    MarkdownItClass,
                                    'md'
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'melon-svg-icon': path.join(__dirname, '../lib')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            title: 'index',
            template: path.join(__dirname, '../example/index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                let context = module.context;
                if (typeof context !== 'string') {
                    return false;
                }
                return /node_modules/.test(context);
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ]
};
