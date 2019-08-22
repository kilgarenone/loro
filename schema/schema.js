const graphql = require("graphql");
const db = require("../db");
const axios = require("axios");
const { GraphQLDateTime } = require("graphql-iso-date");

const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID } = graphql;

const TweetType = new GraphQLObjectType({
  name: "Tweet",
  fields: {
    id: { type: GraphQLID },
    author: { type: GraphQLString },
    tweet: { type: GraphQLString },
    created_at: { type: GraphQLDateTime }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    tweet: {
      type: TweetType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        // return axios
        //   .get(`http://localhost:3001/tweet/${args.id}`)
        //   .then(resp => resp.data);
        const query = `SELECT * FROM tweet WHERE id=$1`;
        const values = [args.id];

        return db
          .query(query, values)
          .then(res => res.rows[0]) // .rows is by postgres! CAN NOT JUST RETURN 'res' !!! Graphql won't get it!!!
          .catch(err => err);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
