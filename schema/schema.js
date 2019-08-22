const graphql = require("graphql");
const db = require("../db");
const axios = require("axios");
const { GraphQLDateTime } = require("graphql-iso-date");

const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID } = graphql;

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    desc: { type: GraphQLString }
  }
});

const TweetType = new GraphQLObjectType({
  name: "Tweet",
  fields: {
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    // here we associate 'author' to a Tweet; we're walking from Tweet to associated author in the 'graph'
    author: {
      // when model's key is different(authorId) than graphql schema(author), you need 'resolve'.
      type: AuthorType,
      resolve(parentValue, args) {
        // parentValue has the specific queried Tweet data
        return axios
          .get(`http://localhost:3001/authors/${parentValue.authorId}`)
          .then(resp => resp.data);
      }
    }
  }
});

// RootQuery is your entry point to walking in the graph to get data you want along the way
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    tweet: {
      type: TweetType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3001/tweets/${args.id}`)
          .then(resp => resp.data);
        // const query = `SELECT * FROM tweet WHERE id=$1`;
        // const values = [args.id];

        // return db
        //   .query(query, values)
        //   .then(res => res.rows[0]) // .rows is by postgres! CAN NOT JUST RETURN 'res' !!! Graphql won't get it!!!
        //   .catch(err => err);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
