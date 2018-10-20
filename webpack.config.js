const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const splitChunks = require("./tasks/split-chunks.webpack.js");
const BundleAnalyzer = require("webpack-bundle-analyzer");
const WorkboxPlugin = require('workbox-webpack-plugin')

//Performance budget
const performanceConfig = {
  hints: "warning",
  maxEntrypointSize: 50000,
  maxAssetSize: 100000
};

module.exports = env => {
  const mode = env.mode ? env.mode : "production";
  const isProduction = mode === "production";

  const mainScripts = ["./src/index.js"];

  if (isProduction) {
    mainScripts.push("./src/sw/register.production.js");
  }

  const conditionalPlugins = [];
  if (isProduction) {
    conditionalPlugins.push(
      new CleanWebpackPlugin(["dist"], {
        root: __dirname
      })
    );
  }

  if (env.analyze) {
    conditionalPlugins.push(
      new BundleAnalyzer.BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        reportFilename: "bundle-analyzer.html"
      })
    );
  }

  return {
    mode,
    entry: {
      main: mainScripts,
      "appshell-style": "./src/app-shell/app-shell.critical.css",
      "appshell-script": "./src/app-shell/app-shell.critical.js"
    },
    output: {
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.hbs$/,
          loader: `handlebars-loader?helperDirs[]=${__dirname}/tasks`
        },
        { test: /\.html/, loader: "html-loader" },
        {
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    useBuiltIns: "entry",
                    targets: {
                      browsers: [">0.25%", "not ie 11", "not op_mini all"]
                    }
                  }
                ]
              ],
              plugins: ["@babel/syntax-dynamic-import"]
            }
          }
        },
        { test: /app-shell\.js$/, loader: MiniCssExtractPlugin.loader },
        {
          test: /\.css$/,
          use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"]
        },
        { test: /\.worker\.js$/, use: { loader: "worker-loader" } }
      ]
    },
    plugins: [
      ...conditionalPlugins,
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css"
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          map: {
            inline: false,
            annotation: true
          }
        },
        sourcemap: true,
        canPrint: true
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.hbs",
        minify: { collapseWhitespace: true, removeComments: true },
        inject: false
      }),
      new CopyWebpackPlugin(
        [
          { from: "src/assets", to: "assets", ignore: [".DS_Store"] },
          // only enable for Service Worker section, but comment out for Workbox section
          //{ from: "src/sw/sw.js", to: "sw.js" }
        ],
        {}
      ),
      new HtmlWebpackInlineSourcePlugin(),
      new WorkboxPlugin.InjectManifest({
        swSrc: './src/sw/sw.js',
        swDest: 'sw.js'
      })
    ],
    devtool: "source-map",
    optimization: { splitChunks: splitChunks },
    performance: isProduction ? performanceConfig : {}
  };
};
