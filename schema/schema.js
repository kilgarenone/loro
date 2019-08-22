const graphql = require("graphql");
const db = require("../db");
const axios = require("axios");
// const { GraphQLDateTime } = require("graphql-iso-date");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} = graphql;

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    // arrow function here resolves circular dependencies around JS closure. Execute the object once whole file did
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    desc: { type: GraphQLString },
    tweets: {
      type: new GraphQLList(TweetType), // GraphQLList is telling graphql an 'author' can have multiple 'tweet's
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3001/authors/${parentValue.id}/tweets`)
          .then(resp => resp.data);
      }
    }
  })
});

const TweetType = new GraphQLObjectType({
  name: "Tweet",
  fields: () => ({
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
  })
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addAuthor: {
      type: AuthorType, // the type that 'resolve' returns
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) }, // GraphQLNonNull means client needs to always provide it
        desc: { type: GraphQLString }
      },
      resolve(parentValue, { firstName, desc }) {
        return axios
          .post("http://localhost:3001/authors", { firstName, desc })
          .then(resp => resp.data);
      }
    },
    deleteAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return axios
          .delete(`http://localhost:3001/authors/${id}`)
          .then(resp => resp.data);
      }
    }
  })
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
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3001/authors/${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
