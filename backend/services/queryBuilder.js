exports.buildMongoQuery = (filters) => {
    const query = {};

    if (filters.category) {
        query.category = {
            $regex: filters.category,

            $options: "i",
        };
    }

    if (filters.name || filters.brand) {
        const searchTerms = [];

        if (filters.name) searchTerms.push(filters.name);
        if (filters.brand) searchTerms.push(filters.brand);

        query.name = {
            $regex: searchTerms.join("|"), // OR search
            $options: "i",
        };
    }

    if (filters.priceMin || filters.priceMax) {
        query.price = {};

        if (filters.priceMin) {
            query.price.$gte = filters.priceMin;
        }

        if (filters.priceMax) {
            query.price.$lte = filters.priceMax;
        }
    }

    // Description search (color + usage + keywords)
    const descriptionTerms = [];

    if (filters.color) descriptionTerms.push(filters.color);

    if (filters.usage) descriptionTerms.push(filters.usage);

    if (filters.keywords && filters.keywords.length > 0) {
        descriptionTerms.push(...filters.keywords);
    }

    if (descriptionTerms.length > 0) {
        query.description = {
            $regex: descriptionTerms.join("|"),
            $options: "i",
        };
    }

    if (filters.ratingMin != null) {
        query.ratings = {
            $gte: filters.ratingMin,
        };
    }

    return query;
};
