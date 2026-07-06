const { client } = require("../config/redis");

exports.get = async (key) => {
  const value = await client.get(key);

  return value ? JSON.parse(value) : null;
};

exports.set = async (key, value, ttl = 3600) => {
  await client.set(key, JSON.stringify(value), {
    EX: ttl,
  });
};

exports.delete = async (key) => {
  await client.del(key);
};
