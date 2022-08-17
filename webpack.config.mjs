import path from "path"
import { createRequire } from "module";

import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

// SEE: [ecmascript 6 - Alternative for __dirname in Node.js when using ES6 modules - Stack Overflow](https://stackoverflow.com/a/66651120/9998350)
const __dirname = new URL(".", import.meta.url).pathname;

// SEE: [javascript - Do require.resolve for ES modules - Stack Overflow](https://stackoverflow.com/a/62499498/9998350)
const require = createRequire(import.meta.url);

export default (env, argv) => {
  // SEE: https://webpack.js.org/configuration/mode/
  const mode = argv.mode || "development";
  const dev = mode !== "production";

  return {
    mode,
    entry: path.resolve(__dirname, "./src/index"),
    devtool: dev ? "inline-cheap-module-source-map" : "nosources-source-map",
    output: {
      clean: true,
      path: path.resolve(__dirname, "./dist"),
      filename: dev ? "[name].js" : "[name].[contenthash].js",
      assetModuleFilename: dev ? "[name].[ext]" : "asset/[name].[ext]?[hash]",
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "SWC relay plugin issue",
        template: "public/index.html",
      }),
      new ReactRefreshWebpackPlugin({
        esModule: true,
        overlay: { sockProtocol: "ws" },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve("swc-loader"),
              options: {
                env: { mode: "usage" },
                jsc: {
                  experimental: {
                    plugins: [
                      [
                        "@swc/plugin-relay",
                        {
                          language: "flow",
                          schema: "src/graphql/schema.graphql",
                          rootDir: __dirname,
                          src: "src",
                          artifactDirectory: "src/__generated__",
                        },
                      ],
                    ],
                  },
                  parser: {
                    syntax: "ecmascript",
                    jsx: true,
                    dynamicImport: true,
                  },
                  loose: true,
                  transform: {
                    react: {
                      runtime: "automatic",
                      development: dev,
                      refresh: dev,
                    },
                  },
                  target: "es5",
                },
              },
            },
          ],
        },
      ],
    },
    devServer: {
      hot: true,
      client: { overlay: false },
      static: "./public",
      port: 3000,
    },
    resolve: {
      extensions: [".jsx", ".js", ".mjs"],
    },
  }
}
