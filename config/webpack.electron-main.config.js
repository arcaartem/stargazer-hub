const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

const electronMainConfig = {
  entry: {
    main: './src/main.ts',
  },
  target: 'electron-main'
}
module.exports = merge(commonConfig, electronMainConfig);
