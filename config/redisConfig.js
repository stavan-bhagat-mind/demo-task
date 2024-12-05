const { createClient } = require("redis");
require("dotenv").config();
const client = createClient({
  url: process.env.REDIS_URL,
});
client.on("error", (err) => console.log("Redis Client Error", err));

async function connectClient() {
  try {
    await client.connect();
    console.log("Connected successfully to the redis server.");
  } catch (error) {
    console.error("Error connecting to the redis server:", error);
  }
}

connectClient();

module.exports = client;
