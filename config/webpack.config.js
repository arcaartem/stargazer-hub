const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common.config');

const mode = process.env.NODE_ENV || 'development';

const developmentConfig = {
  entry: {
    app: './src/index.tsx',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    writeToDisk: true,
  },
  mode: mode,
};

const productionConfig = {
  entry: {
    app: './src/index.tsx',
  },
}

let config = {};

switch (mode) {
    case 'development':
        config = merge(commonConfig, developmentConfig);
        break;
    case 'production':
        config = merge(commonConfig, productionConfig);
        break;
    default:
        throw new Error('No matching configuration was found!');
    
}

module.exports = config;