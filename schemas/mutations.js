const graphql = require("graphql");
const { GraphQLDateTime } = require("graphql-iso-date");

const { TweetType } = require("./types");
const db = require("../db");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  type: "Mutation",
  fields: {
    addProject: {
      type: TweetType,
      args: {
        author: { type: GraphQLString },
        tweet: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const query = `INSERT INTO tweet(author, tweet) VALUES ($1, $2)`;
        const values = [args.author, args.tweet];

        return db
          .query(query, values)
          .then(res => res)
          .catch(err => err);
      }
    }
  }
});

exports.mutation = RootMutation;
