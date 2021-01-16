const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const path = require('path');

const electronRendererConfig = {
  entry: {
    renderer: './src/renderer.tsx'
  },
  output: {
    filename: 'js/[name].bundle.js',
    sourceMapFilename: "js/[name].js.map",
    path: path.resolve(__dirname, '../dist'),
  },
  target: 'electron-renderer'
}
module.exports = merge(commonConfig, electronRendererConfig);
