var path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './index.js'],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
