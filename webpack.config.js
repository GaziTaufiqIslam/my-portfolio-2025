const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const imageLoaderRule = {
    test: /\.(png|svg|jpg|jpeg)$/i, //removed gif as it is not supported by image-webpack-loader while production build
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

  const imageFiles = glob.sync('src/images/**/*.{png,svg,jpg,jpeg}'); //removed gif as it is not supported by image-webpack-loader while production build
  const imageEntries = imageFiles.map(file => './' + file);

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: 'source-map',
    
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
        filename: 'css/bundle.css',
        // Enable source maps for the plugin
        experimentalUseImportModule: false
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
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
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