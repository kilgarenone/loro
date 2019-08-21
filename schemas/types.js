const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString } = graphql;

const TweetType = new GraphQLObjectType({
  name: "Tweet",
  type: "Query",
  fields: {
    id: { type: GraphQLString },
    author: { type: GraphQLString },
    tweet: { type: GraphQLString },
    created_at: { type: GraphQLString }
  }
});

exports.TweetType = TweetType;
