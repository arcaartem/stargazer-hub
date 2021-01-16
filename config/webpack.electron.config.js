const { merge } = require('webpack-merge');

const electronMain = require('./webpack.electron-main.config');
const electronRenderer = require('./webpack.electron-renderer.config');

const mode = process.env.NODE_ENV || 'development';

const developmentConfig = {
  devtool: 'source-map',
  mode: mode,
};

const productionConfig = {
  mode: mode,
}

let electronMainConfig = {};
let electronRendererConfig = {};

switch (mode) {
    case 'development':
        electronMainConfig = merge(electronMain, developmentConfig);
        electronRendererConfig = merge(electronRenderer, developmentConfig);
        break;
    case 'production':
        electronMainConfig = merge(electronMain, productionConfig);
        electronRendererConfig = merge(electronRenderer, productionConfig);
        break;
    default:
        throw new Error('No matching configuration was found!');
    
}

module.exports = [electronMainConfig, electronRendererConfig];
