exports.buildMongoQuery = (filters) => {
  const query = {};

  if (filters.category) {
    query.category = filters.category;
  }

//   if (filters.name != null || filters.brand != null) {
//     const searchTerms = [];

//     if (filters.name != null) searchTerms.push(filters.name);
//     if (filters.brand != null) searchTerms.push(filters.brand);

//     query.name = {
//       $regex: searchTerms.join("|"), // OR search
//       $options: "i",
//     };
//   }

  if (filters.priceMin != null || filters.priceMax != null) {
    query.price = {};

    if (filters.priceMin != null) {
      query.price.$gte = filters.priceMin;
    }

    if (filters.priceMax != null) {
      query.price.$lte = filters.priceMax;
    }
  }

  if (filters.ratingMin != null) {
    query.ratings = {
      $gte: filters.ratingMin,
    };
  }

  return query;
};
