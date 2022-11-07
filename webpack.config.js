const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: path.join(__dirname, "src", "index"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "docs")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /.jsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader"
      },
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body"
    }),
    new Dotenv({
      path: "./.env",
      safe: false
    })
  ],
  resolve: {
    extensions: [".json", ".js", ".jsx", ".css"]
  },
  devtool: "source-map",
  devServer: {
    static: path.join(__dirname, 'public/'),
    devMiddleware: {
      publicPath: "/"
    },
    port: 8080,
    hot: "only",
    open: true
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
