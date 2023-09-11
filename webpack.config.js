const path = require('path');

module.exports = {
  mode: 'development', //tells webpack we're building for development so it does fewer optimizations to improve our development experience, make debugging easier and give us more meaningful error messages
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist',
  },
  devtool: 'inline-source-map', //this tells webpack there will be generated source maps already which it should extract and wire up correctly to the bundle it generates
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
};
