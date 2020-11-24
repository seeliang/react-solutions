const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { GenerateConfig } = require('@kickoffready/generate-config');

const {reactJs,  devSet} = require("../config/index") 

const base = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.js'
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{
          from: './*.html'
        }]
      })
    ]
};

const set = new GenerateConfig()
  .addConfig(base)
  .addConfig(reactJs)
  .addConfig(devSet({port: 9011}))
  .setup
console.log(JSON.stringify(set))
module.exports = set