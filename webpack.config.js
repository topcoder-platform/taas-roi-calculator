const _ = require('lodash');
const config = require('config');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


let cssLocalIdent;
if (process.env.NODE_ENV === 'production') {
  cssLocalIdent = '[hash:base64:6]';
} else {
  cssLocalIdent = '[path][name]___[local]___[hash:base64:6]';
}

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    polyfill: '@babel/polyfill',
    main: path.resolve(__dirname, 'src/index.js'),
  },
  node: {
    __dirname: true,
    fs: 'empty',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: `[name].js`,
    filename: `[name].js`,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        /* Loads jsx */
        test: /\.(jsx?|svg)$/,
        exclude: [
          /node_modules/,
          /[/\\]assets[/\\]fonts/,
          /[/\\]assets[/\\]images/,
        ],
        loader: 'babel-loader',
      },
      {
        /* Loads images */
        test: /\.(svg|gif|jpe?g|png)$/,
        exclude: [
          /[/\\]assets[/\\]fonts/
        ],
        loader: 'file-loader',
        options: {
          outputPath: 'images',
        }
      },
      {
        /* Loads fonts */
        test: /\.(eot|otf|svg|ttf|woff2?)$/,
        exclude: [
          /[/\\]assets[/\\]images/
        ],
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        }
      },
      {
        /* Loads scss stylesheets */
        test: /\.scss/,
        use:  [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: cssLocalIdent,
                mode: 'local',
              }
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ],
              }
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        /* Loads css stylesheets */
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'body',
      favicon: path.resolve(__dirname, 'favicon.ico')
    }),
    new MiniCssExtractPlugin({
      chunkFilename: `[name].css`,
      filename: `[name].css`,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ..._.mapValues(config, (value) => JSON.stringify(value)),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  resolve: {
    alias: {
      styles: path.resolve(__dirname, "src/styles"),
    },
    extensions: ['.js', '.json', '.jsx', '.scss'],
    symlinks: false,
  },
  mode,
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/sheets-api': 'http://localhost:3100'
    }
  }
};
