const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL,
});

console.log("REDIS_URL:", process.env.REDIS_URL);

client.on("connect", () => {
  console.log("✅ Redis Connected");
});

client.on("error", (err) => {
  console.error("Redis Error:", err);
});

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}

module.exports = {
  client,
  connectRedis,
};
