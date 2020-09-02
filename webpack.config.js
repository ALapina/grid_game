const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "JS13K",
    }),
  ],
  output: {
    filename: "game.bundle.js",
    path: __dirname,
  },
};
