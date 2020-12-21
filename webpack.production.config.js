/* eslint-disable sort-keys-fix/sort-keys-fix */
const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dotEnv = require('dotenv').config({ path: `${__dirname}/.env` });

const assetsDirName = 'assets';
const outputImagesDirName = 'img';
const outputFontsDirName = 'font';

const distDir = path.join(__dirname, assetsDirName);
const srcDir = path.join(__dirname, './src');

module.exports = [
  {
    name: 'client',
    target: 'web',
    mode: 'production',
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    entry: {
      client: `${srcDir}/client.jsx`,
      vendor: [
        '@babel/polyfill',
        'react',
        'react-dom',
        'react-helmet',
        'react-router-dom',
        'axios',
        'formik',
        // 'material-snackbar-supplier',
        'redux',
        'react-redux',
        'redux-saga',
        'serialize-javascript',
        'classnames',
        'yup',
        'lodash.clonedeep',
      ],
    },
    output: {
      path: distDir,
      filename: 'js/[name].js',
      publicPath: distDir,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '~': srcDir,
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules\/)/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            limit: 1024,
            name: '[hash:base64:5].[ext]',
            publicPath: `/${assetsDirName}/${outputFontsDirName}`,
            outputPath: outputFontsDirName,
          },
        },
        {
          test: /\.(jpg|png)$/,
          exclude: /node_modules/,
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[hash:base64:5].[ext]',
            publicPath: `/${assetsDirName}/${outputImagesDirName}`,
            outputPath: outputImagesDirName,
          },
        },
      ],
    },
    optimization: {
      splitChunks: {
        name: 'vendor',
        cacheGroups: {
          vendors: {
            test: 'vendor',
            filename: 'js/[name].js',
            enforce: true,
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': dotEnv.parsed,
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
          },
          parse: {
            shebang: true,
          },
          output: {
            comments: false,
            beautify: false,
          },
        },
      }),
      new webpack.optimize.OccurrenceOrderPlugin(undefined),
    ],
  },
  {
    name: 'server',
    target: 'node',
    mode: 'production',
    entry: `${srcDir}/server.jsx`,
    output: {
      path: distDir,
      filename: 'js/server.js',
      libraryTarget: 'commonjs2',
      publicPath: distDir,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '~': srcDir,
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules\/)/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            limit: 1024,
            name: '[hash:base64:5].[ext]',
            publicPath: `/${assetsDirName}/${outputFontsDirName}`,
            outputPath: outputFontsDirName,
          },
        },
        {
          test: /\.(jpg|png)$/,
          exclude: /node_modules/,
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[hash:base64:5].[ext]',
            publicPath: `/${assetsDirName}/${outputImagesDirName}`,
            outputPath: outputImagesDirName,
          },
        },
      ],
    },
    plugins: [
      new StatsPlugin(
        'stats.json',
        {
          chunkModules: true,
          modules: true,
          chunks: true,
          exclude: [/node_modules[\\/]react/],
        },
        undefined
      ),
    ],
  },
];
