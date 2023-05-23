const path = require('path');
const webpack = require('webpack');
const crypto = require('crypto');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify") ,
      "path": false
    },
    alias: {
    'node-gyp': path.resolve(__dirname, 'node_modules', 'node-gyp', 'bin', 'node-gyp.js'),
    'npm': path.resolve(__dirname, 'node_modules', 'npm', 'bin', 'npm-cli.js')
  }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),

  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

