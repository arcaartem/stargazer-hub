const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: (mode === 'development') ? 'inline-source-map' : false,
  devServer: {
    contentBase: './dist',
    writeToDisk: true,
  },
  mode: mode,
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  entry: {
    main: './src/main.ts',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Stargazer Hub'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'electron-main'
};
