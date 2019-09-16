require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const postcssNano = require("cssnano");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    home: path.resolve(__dirname, "frontend/scripts/views/home.js"),
    balance: path.resolve(__dirname, "frontend/scripts/views/balance.js")
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"]
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    publicPath: "/js/",
    filename: "[name].js"
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
    open: true,
    hot: true,
    noInfo: false,
    clientLogLevel: "error",
    overlay: { errors: true }
  }
};
