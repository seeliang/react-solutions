const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { GenerateConfig } = require('@infomediacode/generate-config');

const react = require("../config/index") 

const base = {
    entry: './src/index.js',
    devtool: 'source-map' ,
    devServer: {
        contentBase: path.join(__dirname, 'dist/'),
        port: 9011
      },
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

const set = new GenerateConfig().addConfig(base).addConfig(react.reactJs).setup
console.log(JSON.stringify(set))
module.exports = set