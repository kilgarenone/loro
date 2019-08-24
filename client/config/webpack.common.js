const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const settings = require("./webpack.settings");

const { NODE_ENV } = process.env;

// eslint-disable-next-line import/order
const dotenv = require("dotenv").config({
  path: settings.envPath
});

// add env var that live in circleCI here
const GLOBALS = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV)
};

const isProduction = NODE_ENV !== "development";

// Configure Babel loader
const configureBabelLoader = () => {
  return {
    test: /\.(js|jsx)$/,
    exclude: settings.babelLoaderConfig.exclude,
    use: {
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              pragma: "h"
            }
          ],
          "@babel/proposal-class-properties",
          "@babel/plugin-syntax-dynamic-import",
          "module:fast-async"
        ]
      }
    }
  };
};
// Understanding the path.resolve traversing.
// Path.resolve build absolute path from right to left arguments,
// starting from the current directory where its run, in this case of 'webpack.common.js',
// it starts from ROOT/config/webpack
module.exports = {
  entry: {
    app: settings.entryPath
    // TODO: Add more entries whose files rarely change
  },
  module: {
    rules: [
      configureBabelLoader(),
      // FONT loader
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `${settings.fontsFolder}/[name].[hash].[ext]` // output to /fonts folder under output.path
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // load variables from .env files based on given environment.
    // able to access the keys in the GLOBALS object above.
    // Note: 'process.env.NODE_ENV' is set in package.json scripts section eg. NODE_ENV="development"
    new webpack.DefinePlugin(GLOBALS),
    new ProgressBarPlugin()
  ],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js", ".jsx"]
  }
};
