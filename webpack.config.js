const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/driver.js',  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),  
  },
  devServer: {
    static: './dist',  
    open: true, 
    hot: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,  
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,  
        exclude: /node_modules/,
        use: 'babel-loader',  // npm install --save-dev babel-loader @babel/core @babel/preset-env
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', 
    }),
  ],
};
