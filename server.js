const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const schema = require("./schema");
const resolvers = require("./resolver");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server listening at: ${url}`);
}
startServer().catch((error) => {
  console.error("Error starting server:", error);
});
