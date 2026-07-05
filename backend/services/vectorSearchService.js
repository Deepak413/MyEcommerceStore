const Product = require("../models/productModel");
const { generateEmbedding } = require("./embeddingService");

const vectorSearchProducts = async (query, limit = 5, mongoQuery = {}) => {
  const queryEmbedding = await generateEmbedding(query);

  const products = await Product.aggregate([
    {
      $vectorSearch: {
        index: "productVectorIndex",

        path: "embedding",

        queryVector: queryEmbedding,
        filter: mongoQuery,

        numCandidates: limit * 10,

        limit: limit,
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        category: 1,
        price: 1,
        ratings: 1,
        Stock: 1,
        images: 1,
        description: 1,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ]);
  return products;
};

module.exports = {
  vectorSearchProducts,
};
