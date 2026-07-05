exports.buildMongoQuery = (filters) => {
  const query = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.name != null || filters.brand != null) {
    const searchTerms = [];

    if (filters.name != null) searchTerms.push(filters.name);
    if (filters.brand != null) searchTerms.push(filters.brand);

    query.name = {
      $regex: searchTerms.join("|"), // OR search
      $options: "i",
    };
  }

  if (filters.priceMin != null || filters.priceMax != null) {
    query.price = {};

    if (filters.priceMin != null) {
      query.price.$gte = filters.priceMin;
    }

    if (filters.priceMax != null) {
      query.price.$lte = filters.priceMax;
    }
  }

  // Description search (color + usage + keywords)
  // const descriptionTerms = [];

  // if (filters.color) descriptionTerms.push(filters.color);

  // if (filters.usage) descriptionTerms.push(filters.usage);

  // if (filters.keywords && filters.keywords.length > 0) {
  //     descriptionTerms.push(...filters.keywords);
  // }

  // if (descriptionTerms.length > 0) {
  //     query.description = {
  //         $regex: descriptionTerms.join("|"),
  //         $options: "i",
  //     };
  // }

  if (filters.ratingMin != null) {
    query.ratings = {
      $gte: filters.ratingMin,
    };
  }

  return query;
};
