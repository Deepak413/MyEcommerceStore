require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("../models/productModel");

const { generateEmbedding } = require("../services/embeddingService");

mongoose.connect(process.env.DB_URI);

async function updateEmbeddings(){

    const products = await Product.find();

    console.log(

        `Found ${products.length} products`

    );

    for(const product of products){

        const text = `

        Name: ${product.name}

        Description: ${product.description}

        Category: ${product.category}

        Brand: ${product.brand}

        Price: ${product.price}

        `;

        console.log(

            "Generating embedding for",

            product.name

        );

        const embedding = await generateEmbedding(text);

        product.embedding = embedding;

        await product.save();

    }

    console.log(

        "Done"

    );

    process.exit();

}

updateEmbeddings();