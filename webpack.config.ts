import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as WebpackConfiguration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

interface Mode {
  mode: "production" | "development";
}

interface EnvVariables {
  mode?: Mode;
  port?: number;
}

export default (env: EnvVariables): WebpackConfiguration => {
  const isDev = env.mode?.mode === "development";
  const mode = env.mode?.mode || "development";
  const port = env.port || 3000;

  const config: WebpackConfiguration = {
    mode: mode,
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/[id].[contenthash].css",
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new webpack.ProgressPlugin(),
    ],
    module: {
      rules: [
        // ПОРЯДОК ВАЖЕН!!!!
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: isDev ? "inline-source-map" : false,
    devServer: isDev
      ? ({
          port: port,
          open: true,
        } as DevServerConfiguration)
      : undefined,
  };

  return config;
};
