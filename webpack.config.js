const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const sourceDir = path.join(__dirname, "./src/");
const distDir = path.join(__dirname, "./dist/");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  entry: {
    app: `${sourceDir}index.tsx`,
  },
  output: {
    path: distDir,
    filename: "js/[name].js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|png|svg|)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 85,
              },
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
              gifsicle: {
                enabled: false,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: `${distDir}index.html`,
      template: `${sourceDir}index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: `${sourceDir}images/`, to: `${distDir}images/` }],
    }),
    // PWA plugins
    new FaviconsWebpackPlugin({
      logo: `${sourceDir}images/logo.svg`,
      prefix: "images/favicons/",
      favicons: {
        appName: "Seleet ecommerce",
        appDescription: "Store front for the Seleet ecommerce platform",
        display: "standalone",
        developerURL: null, // prevent retrieving from the nearest package.json
        background: "#ddd",
        theme_color: "#333",
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: "seleet-store-front",
      filename: "service-worker.js",
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new webpack.EnvironmentPlugin(["npm_package_version", "NODE_ENV"]),
  ],
  node: {
    fs: "empty",
  },
};
