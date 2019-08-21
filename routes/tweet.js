const Router = require("express-promise-router");
const { GraphQLSchema } = require("graphql");
const expressGraphQl = require("express-graphql");

const { query } = require("../schemas/queries");
const { mutation } = require("../schemas/mutations");

const schema = new GraphQLSchema({
  query
  // mutation
});
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;
router.use(
  "/",
  expressGraphQl({
    schema,
    graphiql: true
  })
);
