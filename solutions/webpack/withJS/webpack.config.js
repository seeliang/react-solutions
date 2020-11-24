const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { GenerateConfig } = require('@kickoffready/generate-config');

const {reactJs,  devSet, fileConfig} = require("../config/index") 

const base = {
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
  .addConfig(fileConfig({entry: './src/index'}))
  .addConfig(devSet({port: 9011}))
  .setup
console.log(JSON.stringify(set))
module.exports = set