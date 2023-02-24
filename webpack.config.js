const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  return {
    mode: env.NODE_ENV ? env.NODE_ENV : 'development',
    entry: [
      path.join(__dirname, "src", "index.js")
    ],
    output: {
      path: path.join(__dirname, "/dist"), // the bundle output path
      filename: "bundle.js", // the name of the bundle
      publicPath: '/'
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        // template: "src/index.html", // to import index.html file inside index.js
        template: path.join(__dirname, "public", "index.html"),

        // favicon: path.join(__dirname, "public", "favicon.ico"),
        // manifest: path.join(__dirname, "public", "manifest.json"),
        inject: true
      }),
      // new webpack.ProvidePlugin({
      //   // $: 'jquery',
      //   // jQuery: 'jquery',
      //   // 'window.jQuery': 'jquery'
      // }),
    ],
    devServer: {
      port: 3002,
      open: true,
      proxy: {
        "/api": "http://localhost:8080"
      },
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // .js and .jsx files
          exclude: /node_modules/, // excluding the node_modules folder
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/, // styles files
          use: ["style-loader", "css-loader", "sass-loader"],
        },
       
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          type: 'asset/resource',
          // use: [
          //     'file-loader'
          // ]
        }
      ],
    },
    resolve: {
      alias: {
        "@img": path.resolve(__dirname, "./src/img"),
        "@fonts": path.resolve(__dirname, "./src/fonts"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@contents": path.resolve(__dirname, "./src/contents"),
        "@reducers": path.resolve(__dirname, "./src/reducers"),
        "@css": path.resolve(__dirname, "./src/assets/css"),
        "@saga": path.resolve(__dirname, "./src/saga"),
        "@constants": path.resolve(__dirname, "./src/constants.js"),
        "@api": path.resolve(__dirname, "./src/api"),
      },
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
  };
}