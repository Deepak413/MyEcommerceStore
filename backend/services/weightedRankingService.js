exports.calculateScore = (product) => {
  const semantic = product.score * 0.6;

  const rating = (product.ratings / 5) * 0.2;

  const popularity = (product.numOfReviews / 1000) * 0.1;

  const stock = product.Stock > 0 ? 0.1 : 0;

  return semantic + rating + popularity + stock;
};
