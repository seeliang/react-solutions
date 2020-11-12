const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
              ]
            }
          }
        }
      ],
    },
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