const path = require('path')
const webpack = require('webpack');
module.exports = {
  devtool: 'eval',
  entry: './bin/www.js',
  target: "node",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }, 
    ]
  },
  devServer: {
    hot: true,
    compress: true,
    host: process.env.HOST,
    port: process.env.PORT,
    overlay: {
      warnings: false,
      errors: true,
    } 
  }
};