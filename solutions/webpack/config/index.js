const { GenerateConfig } = require('@kickoffready/generate-config');

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

reactJsExt = {
    module: {
      rules: [
        {
          test: /\.js(|x)$/,
        }
      ],
    },
};

const reactJs = new GenerateConfig()
    .addConfig(reactBase)
    .addConfig(reactJsExt)
    .setup

module.exports = {
    reactJs
}