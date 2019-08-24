const tweet = require("./tweet");

module.exports = app => {
  app.use("/graphql", tweet);
};
