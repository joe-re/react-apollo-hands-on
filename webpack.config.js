const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  resolve: {
    extensions: [ '.js', '.jsx' ]
  },
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 3000,
  },
  devtool: 'source-map'
};
