const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const _entry = {
    "index": './app/src/js/index.js',
};
module.exports = {
  entry: _entry,
  output: {
    path: path.join(__dirname, 'app','dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use:[ 'css-loader','sass-loader'],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.html$/,
        loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ],
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by Adam'),
    new ExtractTextPlugin({
      filename: 'index.css',
      disable: false,
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './app/src/index.html'
    })
  ]
}
