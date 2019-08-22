const express = require("express");

const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");

const port = process.env.PORT || 4000;
const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log(`🚀  We are live at locahost:${port} 🚀 `);
});
