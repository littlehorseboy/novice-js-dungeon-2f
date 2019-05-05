const path = require('path');

module.exports = {
  entry: [path.resolve(__dirname, '../src/index.js')],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist/'),
    // publicPath: './',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
};
