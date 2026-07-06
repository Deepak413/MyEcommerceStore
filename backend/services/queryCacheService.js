const cacheService = require("./cacheService");

const CACHE_TTL = 60 * 60; // 1 hour

const normalizeQuery = (query) => {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
};

exports.getEmbedding = async (query) => {
  const key = `embedding:${normalizeQuery(query)}`;
  return await cacheService.get(key);
};

exports.saveEmbedding = async (query, embedding) => {
  const key = `embedding:${normalizeQuery(query)}`;

  await cacheService.set(key, embedding, CACHE_TTL);
};

exports.deleteEmbedding = async (query) => {
  const key = `embedding:${normalizeQuery(query)}`;
  await cacheService.delete(key);
};
