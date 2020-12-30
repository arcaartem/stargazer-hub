const electronMain = require('./webpack.electron-main.config');
const electronRenderer = require('./webpack.electron-renderer.config');

module.exports = [electronMain, electronRenderer];