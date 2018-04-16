const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PATHS={
  app:path.join(__dirname,'app'),
  build:path.join(__dirname,'build'),
};

module.exports = {
  entry: {
    app:PATHS.app,
  },
  output: {
    path:PATHS.build,
    filename: "[name].js"
  },
  

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'SuCloud Tech',
      filename: path.resolve(__dirname, 'build/index.html'),
      template: path.resolve(__dirname, 'template/index.html'),
      chunks:["index"],
      inject:true,
      hash:true

    })
  ]
};
