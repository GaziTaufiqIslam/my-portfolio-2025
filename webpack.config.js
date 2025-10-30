const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development', // Change to 'production' for builds
  entry: './src/js/main.js', // Your main JS entry file
  output: {
    filename: 'bundle.js', // The final bundled JS file
    path: path.resolve(__dirname, 'src/assets/js'), // Put it in src/assets
    assetModuleFilename: '../[name][ext][query]' // Send fonts/images to '../assets/'
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/bundle.css' // Put the final CSS file in 'src/assets/css'
    })
  ],


  module: {
    rules: [
        // Rule for JavaScript files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            sourceType: 'unambiguous'
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. Extracts CSS into files
          'css-loader',                // 2. Translates CSS into CommonJS
          'sass-loader'                // 1. Compiles Sass to CSS
        ]
      },
      // New rule for Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]' // Output to 'src/assets/fonts'
        }
      },
      // New rule for Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]' // Output to 'src/assets/images'
        }
      }
    ]
  }
};