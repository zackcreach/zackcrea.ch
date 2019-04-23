require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const postcssNano = require("cssnano");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    balance: path.resolve(__dirname, "frontend/scripts/balance.js")
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    publicPath: "/js/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: loader => [
                postcssImport({ root: loader.resourcePath }),
                postcssPresetEnv(),
                postcssNano()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "frontend/views/balance.pug"),
      template: path.resolve(__dirname, "frontend/views/balance.pug"),
      inject: true
    })
  ],
  devServer: {
    proxy: {
      "/": "http://localhost:1337"
    },
    port: 1338,
    host: "0.0.0.0",
    compress: true,
    progress: true,
    hot: true,
    open: true,
    noInfo: false,
    clientLogLevel: "error",
    overlay: { errors: true }
  }
};
