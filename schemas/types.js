const graphql = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const TweetType = new GraphQLObjectType({
  name: "Tweet",
  type: "Query",
  fields: {
    id: { type: GraphQLID },
    author: { type: GraphQLString },
    tweet: { type: GraphQLString },
    created_at: { type: GraphQLDateTime }
  }
});

exports.TweetType = TweetType;
