const path = require('path');

module.exports = {
  mode: 'development', // Change to 'production' for builds
  entry: './src/js/main.js', // Your main JS entry file
  output: {
    filename: 'bundle.js', // The final bundled JS file
    path: path.resolve(__dirname, 'src/assets/js'), // Put it in src/assets
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};