const tweet = require("./tweet");

module.exports = app => {
  app.use("/", tweet);
};
