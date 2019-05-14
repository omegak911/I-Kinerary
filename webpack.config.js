var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './client/src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './client/dist/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      // {
      //   test: /\.(scss|css)$/,
      //   loaders: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loaders: ['file-loader'], 
      }
    ]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
};