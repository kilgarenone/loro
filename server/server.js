const express = require("express");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const expressGraphQL = require("express-graphql");

const schema = require("./schema/schema");
const webpackConfig = require("../client/webpack.config");

const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.use(webpackMiddleware(webpack(webpackConfig), { publicPath: "/" }));

module.exports = app;
