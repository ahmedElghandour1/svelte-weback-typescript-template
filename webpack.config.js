const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');


module.exports = (env) => {
  const prod = env.production;

  /** @type {import('webpack').Configuration} */
  const config = {
    entry: {
      main: "./src/main.ts"
    },
    output: {
      filename: "[name].js",
      path: resolve(__dirname, "dist"),
    },
    resolve: {
      alias: {
        svelte: resolve("node_modules", "svelte"),
        '@': resolve(__dirname, 'src')
      },
      extensions: ['.tsx', '.ts', '.js', '.svelte'],
      mainFields: ["svelte", "browser", "module", "main"],
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false
              }
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
          // required to prevent errors from Svelte on Webpack 5+
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.(svelte)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              preprocess: require("svelte-preprocess")({}),
              compilerOptions: {
                dev: !prod,
                customElement: true,
              },
              emitCss: prod,
              hotReload: !prod
            }
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.ts?$/,
          include: resolve(__dirname, "src"),
          exclude: /[\\/]node_modules[\\/]/,
          use: [
            {
              loader: "ts-loader",
            },
          ],
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'public/index.html'),
      }),
      new CleanWebpackPlugin(),
      new Dotenv(),
      new CopyPlugin({
        patterns: [{
          from: '**/*',
          to: "[name][ext]",
          context: resolve(__dirname, 'public'),
          globOptions: { ignore: "**/*.html" }
        }],
      }),
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: resolve(__dirname, 'dist'),
      hot: true,
    },
  };

  return config;
}
