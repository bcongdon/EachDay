var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public', 'dist');
var APP_DIR = path.resolve(__dirname, 'src');
var API_BASE_URL = process.env.NODE_ENV === 'production' ? 'http://api.eachday.life' : 'http://localhost:5000'

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
        loader : 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
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
    port: 9000,
    historyApiFallback: true
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${process.env.NODE_ENV}'`,
        API_BASE_URL: `'${API_BASE_URL}'`
      }
    })
  ]
};

module.exports = config;