const Product = require("../models/productModel.js");

exports.searchProducts = async (question) => {

    const query = {};
    const lowerQuestion = question.toLowerCase();

    // ---------- Category Detection ----------
    const categories = [
        "shoes",
        "laptop",
        "mobile",
        "camera",
        "watch",
        "headphone",
        "clothes",
    ];

    const matchedCategory = categories.find((category) =>
        lowerQuestion.includes(category)
    );

    if (matchedCategory) {
        query.category = {
            $regex: matchedCategory,
            $options: "i",
        };
    }

    // ---------- Price Detection ----------

    const underMatch = lowerQuestion.match(/under\s*₹?\s*(\d+)/i);

    if (underMatch) {
        query.price = {
            $lte: Number(underMatch[1]),
        };
    }

    const aboveMatch = lowerQuestion.match(/above\s*₹?\s*(\d+)/i);

    if (aboveMatch) {
        query.price = {
            $gte: Number(aboveMatch[1]),
        };
    }

    // ---------- Keyword Search ----------

    query.$or = [
        {
            name: {
                $regex: lowerQuestion,
                $options: "i",
            },
        },
        {
            description: {
                $regex: lowerQuestion,
                $options: "i",
            },
        },
    ];

    const products = await Product.find(query)
        .select("name description category price ratings stock seller")
        .limit(10);

    return products;

};