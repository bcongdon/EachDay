var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public', 'dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test : /\.js?/,
        include : APP_DIR,
        loader : 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: "/dist/",
    port: 9000
  }
};

module.exports = config;