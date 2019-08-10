require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const postcssNano = require("cssnano");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    home: path.resolve(__dirname, "frontend/scripts/home"),
    balance: path.resolve(__dirname, "frontend/scripts/balance")
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    publicPath: "/js/",
    filename: "[name].js"
  },
  resolve: {
    // see below for an explanation
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"]
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            hotReload: true
          }
        }
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
    // new HtmlWebpackPlugin({
    //   filename: path.resolve(__dirname, "frontend/views/balance.pug"),
    //   template: path.resolve(__dirname, "frontend/views/balance.pug"),
    //   inject: true
    // }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
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
