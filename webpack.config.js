const { resolve, join } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  stats: {
    children: false,
  },
  devServer: {
    contentBase: join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
  devtool: "source-map",
  entry: {
    main: "./src/main.ts",
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            preprocess: require("svelte-preprocess")({}),
          },
        },
      },
      {
        test: /\.tsx?$/,
        include: resolve(__dirname, "src"),
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.jsx?$/,
        include: resolve(__dirname, "src"),
        exclude: /[\\/]node_modules[\\/]/,
        loader: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/images",
              name: "[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/fonts",
              name: "[name].[ext]",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "**/*",
          context: "public",
          // flatten: true,
        },
      ],
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  resolve: {
    alias: {
      svelte: resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", "ts", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
};
