const cache = new Map();

const CACHE_EXPIRY_TIME = 1000 * 60 * 60; // 1 hour

exports.getEmbedding = (query) => {
  const key = query.trim().toLowerCase();

  const cached = cache.get(key);

  if (!cached) {
    return null;
  }

  if (Date.now() > cached.expiry) {
    cache.delete(key);
    return null;
  }

  return cached.embedding;
};

exports.saveEmbedding = (query, embedding) => {
  const key = query.trim().toLowerCase();

  cache.set(key, {
    embedding,
    expiry: Date.now() + CACHE_EXPIRY_TIME,
  });
};

exports.clearCache = () => {
  cache.clear();
};

exports.cacheSize = () => {
  return cache.size;
};