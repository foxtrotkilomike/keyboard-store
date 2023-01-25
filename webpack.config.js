const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: path.resolve(__dirname, './src/scripts/index'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: {
      keep: /\.git/,
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: '/node_modules/',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              exportLocalsConvention: 'camelCase',
            },
            sourceMap: true,
          },
        }],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpe?g|gif)$/i,
        type: isProduction ? 'asset' : 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new EslintPlugin({
      extensions: 'ts'
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/favicon.png',
      favicons: {
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          favicons: true,
          windows: true,
          yandex: false,
        },
      },
    }),
  ],
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
