const Product = require("../models/productModel");
// const { generateEmbedding } = require("./embeddingService");
// const generateEmbedding = require("./embeddingService").generateEmbedding;
const { generateEmbedding } = require("../services/embeddingService");

exports.populateMissingEmbeddings = async () => {
  const productsWithoutEmbeddings = await Product.find({
    $or: [
      { embedding: { $exists: false } },
      { embedding: null },
      { embedding: [] },
    ],
  });

  console.log(`populateMissingEmbeddings : Found ${productsWithoutEmbeddings.length} products without embeddings found.`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < productsWithoutEmbeddings.length; i++) {
    const product = productsWithoutEmbeddings[i];

    try {
      console.log(`populateMissingEmbeddings : [${i + 1}/${productsWithoutEmbeddings.length}] Generating embedding for ${product.name}`)

      const embeddingText = `
            Name: ${product.name}
            Description: ${product.description}
            Category: ${product.category}
            Rating: ${product.ratings}
            Price: ${product.price}
            `;

      const embedding = await generateEmbedding(embeddingText);

      await Product.findByIdAndUpdate(product._id, {
        embedding,
      });

      success++;

      console.log(`populateMissingEmbeddings : ✅ ${product.name}`);
    } catch (error) {
      failed++;

      console.error(`populateMissingEmbeddings : ❌ Failed for ${product.name}:`, error.message);
    }

    // Helps avoid hitting Gemini rate limits
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  console.log("\n========== DONE ==========");
  console.log(`populateMissingEmbeddings : Successful : ${success}`);
  console.log(`populateMissingEmbeddings : Failed     : ${failed}`);

  return {
    success,
    failed,
  };
};
