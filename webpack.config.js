const path = require('path');

module.exports = {
  entry: './js/script',
  output: {
    filename: 'build.min.js',
    path: path.resolve(__dirname, 'js')
  }
 };