const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { GenerateConfig } = require('@kickoffready/generate-config');

const {reactTs,  devSet, fileConfig} = require("@kickoffready/webpack-react") 

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
  .addConfig(reactTs)
  .addConfig(fileConfig({entry: './src/index.ts'}))
  .addConfig(devSet({port: 9011}))
  .setup
console.log(JSON.stringify(set))
module.exports = set