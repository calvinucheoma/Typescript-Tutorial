const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.ts$/, //regular expression code to check forfiles that end with .ts
        use: 'ts-loader', //to specify the loader webpage
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], //to tell webpack to look for .ts files and .js files
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(), // this tells typescript to clear everything in the ouput folder before it writes something to it
  ],
};
