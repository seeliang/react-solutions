const { GenerateConfig } = require('@kickoffready/generate-config');
const path = require('path');

const reactBase = {
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      },
    module: {
      rules: [
        {
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        }
      ],
    },
};

const reactJsExt = {
    module: {
      rules: [
        {
          test: /\.js(|x)$/,
        }
      ],
    },
};

const devSet = ({port = 8888, dist = 'dist/'}) => ({
    devtool: 'source-map' ,
    devServer: {
        contentBase: path.join(__dirname, dist),
        port,
    },
})

const fileConfig = ({entry = './src/index', dist = 'dist/', outputFile = 'bundle.js'}) => ({
    entry,
    output: {
        path: path.resolve(__dirname, dist),
        filename: outputFile,
    },
})

const reactJs = new GenerateConfig()
    .addConfig(reactBase)
    .addConfig(reactJsExt)
    .setup

module.exports = {
    reactJs,
    devSet,
    fileConfig,
}