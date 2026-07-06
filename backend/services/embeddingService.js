// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// const { getEmbedding, setEmbedding } = require("./queryCacheService");

// async function generateEmbedding(text) {

//     const response = await ai.models.embedContent({
//         model: "gemini-embedding-001",
//         contents: text
//     });

//     return response.embeddings[0].values;
// }

// module.exports = {
//     generateEmbedding
// };

const ai = require("../utils/gemini");
const { getEmbedding, saveEmbedding } = require("./queryCacheService");

exports.generateEmbedding = async (text) => {
  const cached = getEmbedding(text);

  if (cached) {
    console.log("embeddingService.js : Embedding Cache HIT ✅");
    return cached;
  }

  const response = await ai.models.embedContent({
    model: "text-embedding-004",
    contents: text,
  });

  const embedding = response.embeddings[0].values;

  saveEmbedding(text, embedding);

  return embedding;
};
