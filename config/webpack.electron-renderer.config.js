const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const electronRendererConfig = {
  entry: {
    gui: './src/index.tsx',
  },
  target: 'electron-renderer'
}
module.exports = merge(commonConfig, electronRendererConfig);
