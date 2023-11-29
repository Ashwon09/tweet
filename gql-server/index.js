const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schemas/type-defs");
const { resolvers } = require("./schemas/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Here, you can access the request headers and include them in the context
    const headers = req.headers;
    return { headers };
  },
});

server.listen(3000).then(({ url }) => {
  console.log("API is running in", url);
});
