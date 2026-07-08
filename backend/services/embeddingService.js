const ai = require("../utils/gemini");
const { getEmbedding, saveEmbedding } = require("./queryCacheService");

exports.generateEmbedding = async (text) => {
  const cached = await getEmbedding(text);

  if (cached) {
    console.log("embeddingService.js : Embedding Cache HIT ✅");
    return cached;
  }

  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  const embedding = response.embeddings[0].values;

  await saveEmbedding(text, embedding);

  return embedding;
};
