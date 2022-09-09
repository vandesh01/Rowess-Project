const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development';
const port = 1993;
const outputDir = 'dist';
const cdnUrl = devMode ? "" : "";

module.exports = {
    devServer: {
        port,
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        allowedHosts: 'all'
    },
    context: path.resolve(__dirname),
    devtool: devMode ? 'source-map' : false,
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: 'assets/js/' + (devMode ? '[name].js' : '[name].bundle.js'),
        path: path.join(__dirname, outputDir)
    },
    module: {
        rules: [
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    outputPath: './assets/',
                    limit: 512
                }
            },
            {
                test: /\.(pdf|png|jpeg|jpg|gif|ico)$/,
                loader: 'url-loader',
                options: {
                    name: 'images/[name].[ext]',
                    outputPath: './assets/',
                    limit: 1024,
                    esModule: false
                }
            }, {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                    name(file) {
                        if (/fonts/.test(file)) {
                            return 'fonts/[name].[ext]';
                        }
                        return 'vectors/[name].[ext]';
                    },
                    context: 'src',
                    outputPath: './assets/',
                    limit: 512,
                    noquotes: true
                }
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [
                                    './node_modules',
                                    path.join(__dirname, 'src', 'images')
                                ]
                            }
                        }
                    }]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }]
    },
    resolve: {
        extensions: [
            '.js',
            '.scss', '.sass', '.css',
            '.eot', '.ttf', '.woff', '.woff2',
            '.jpg', '.jpeg', '.png', '.svg', '.gif', '.ico',
        ],
        alias: {
            'src': path.join(__dirname, 'src')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/css/' + (devMode ? '[name].css' : '[name].bundle.css')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
       
        new CopyPlugin({
            patterns: [
                { from: 'src/images', to: 'assets/images' },
            ]
        }),
    ],
    optimization: {
        minimize: !devMode,
        minimizer: [new TerserPlugin({
            parallel: false,
            terserOptions: {
                warnings: false,
                format: {
                    comments: false,
                }
            },
            extractComments: false
        })]
    },
}
