const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const imageLoaderRule = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
    generator: {
      filename: (pathData) => {
        const relativePath = path.relative(
          path.resolve(__dirname, 'src/images'), 
          pathData.filename
        );
        return `images/${relativePath}`;
      },
    },
    use: []
  };

  if (isProduction) {
    imageLoaderRule.use.push({
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: { progressive: true, quality: 65 },
        pngquant: { quality: [0.65, 0.90], speed: 1 },
        svgo: {
          plugins: [
            {
              name: 'preset-default',
              params: { overrides: { removeViewBox: false } },
            },
          ],
        },
      },
    });
  }

  const imageFiles = glob.sync('src/images/**/*.{png,svg,jpg,jpeg,gif}');
  const imageEntries = imageFiles.map(file => './' + file);

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      main: './src/js/main.js',
      images: imageEntries
    },
    output: {
      path: path.resolve(__dirname, 'src/assets'),
      filename: 'js/[name].bundle.js',
      clean: true,
    },
    
    plugins: [
      new RemoveEmptyScriptsPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/bundle.css'
      }),
    ],

    module: {
      rules: [
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
            // --- THIS IS THE FIX ---
            // We replace the simple string with an object
            // to provide the correct publicPath
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // This tells Webpack to go "up one level" from /css/ 
                // to find other assets. (e.g., ../images/)
                publicPath: '../' 
              }
            },
            // --- END FIX ---
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        },
        imageLoaderRule 
      ]
    }
  };
};