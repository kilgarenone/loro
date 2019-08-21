const db = require("../db");
const { GraphQLObjectType, GraphQLID } = require("graphql");

const { TweetType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    tweet: {
      type: TweetType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM tweet WHERE id=$1`;
        const values = [args.id];

        return db
          .query(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.query = RootQuery;
