const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");
const { generateEmbedding } = require("../services/embeddingService");
const {
  populateMissingEmbeddings,
} = require("../scripts/populateEmbeddingsService");

const cacheService = require("../services/cacheService");

// Create Products -- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  const text = `
        Name: ${product.name}
        Description: ${product.description}
        Category: ${product.category}
        Rating: ${product.ratings}
        Price: ${product.price}
        `;

  const embedding = await generateEmbedding(text);

  product.embedding = embedding;

  await product.save();

  await cacheService.delete("products:first-page");
  await cacheService.delete("home:products");

  res.status(201).json({
    success: true,
    product,
  });
});

//Get all products with pagination
exports.getAllProductsWithPagination = catchAsyncErrors(
  async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    console.log(
      "getAllProductsWithPagination, productsCount in ProductController : ",
      productsCount,
    );

    //To check products in redis
    const isDefaultRequest =
      (!req.query.keyword || req.query.keyword === "") &&
      (!req.query.category || req.query.category === "") &&
      (!req.query.sort || req.query.sort === "default") &&
      (!req.query["ratings[gte]"] || req.query["ratings[gte]"] == 0) &&
      (!req.query.page || Number(req.query.page) === 1) &&
      ((!req.query["price[gte]"] && !req.query["price[lte]"]) ||
        (Number(req.query["price[gte]"]) === 0 &&
          Number(req.query["price[lte]"]) === 200000));

    console.log(
      "getAllProductsWithPagination - isDefaultRequest : ",
      isDefaultRequest,
    );

    const DEFAULT_PRODUCTS_CACHE_KEY = "products:first-page";

    if (isDefaultRequest) {
      const cachedProducts = await cacheService.get(DEFAULT_PRODUCTS_CACHE_KEY);

      if (cachedProducts) {
        console.log(
          "getAllProductsWithPagination - Products served from Redis ✅",
        );
        return res.status(200).json(cachedProducts);
      }
    }

    console.log(
      "getAllProductsWithPagination - Products NOT found in Redis, fetching from MongoDB, query from frontend : req.query : ",
      req.query
    );

    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    // Get filtered count BEFORE pagination
    const filteredProducts = await apiFeature.query.clone();
    const filteredProductsCount = filteredProducts.length;

    apiFeature.sort().pagination(resultPerPage);

    let products = await apiFeature.query;

    const response = {
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    };

    if (isDefaultRequest) {
      await cacheService.set(
        DEFAULT_PRODUCTS_CACHE_KEY,
        response,
        60 * 60 * 48, // 48 hours
      );

      console.log(
        "getAllProductsWithPagination - Products stored in cache redis.",
      );
    }

    res.status(200).json(response);
  },
);

//Get all products without pagination
exports.getAllProductsWithoutPagination = catchAsyncErrors(
  async (req, res, next) => {
    const productsCount = await Product.countDocuments();
    console.log(
      "productsCount in getAllProductsWithoutPagination in ProductController : ",
      productsCount,
    );

    const apiFeature = new ApiFeatures(Product.find(), req.query).sort();

    const products = await apiFeature.query;

    res.status(200).json({
      success: true,
      products,
      productsCount,
      filteredProductsCount: products.length,
    });
  },
);

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  const productsCount = await Product.countDocuments();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    totalProducts: products.length,
  });
});

//get Home display products
exports.getHomeProducts = catchAsyncErrors(async (req, res, next) => {
  const HOME_PRODUCTS_CACHE_KEY = "home:products";
  const cachedProducts = await cacheService.get(HOME_PRODUCTS_CACHE_KEY);

  console.log(
    cachedProducts ? "getHomeProducts - ✅ Found in Redis" : "getHomeProducts - ❌ Not found in Redis",
  );

  if (cachedProducts) {
    console.log("getHomeProducts - Products served from Redis ✅");
    return res.status(200).json(cachedProducts);
  }

  const [featuredProducts, topRatedProducts, bestSellerProducts] =
    await Promise.all([
      Product.find().limit(8),

      Product.find()
        .sort({
          ratings: -1,
        })
        .limit(8),

      Product.find()
        .sort({
          totalSold: -1,
        })
        .limit(8),
    ]);

  const response = {
    success: true,
    featuredProducts,
    topRatedProducts,
    bestSellerProducts,
  };

  await cacheService.set(HOME_PRODUCTS_CACHE_KEY, response, 60 * 60 * 48);

  console.log("getHomeProducts - Products stored in cache redis.");
  res.status(200).json(response);
});

//Get product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Update product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  console.log(
    "productController : updateProduct - Updating Product with ID:",
    req.params.id,
    "and Data:",
    req.body,
  );

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  console.log(
    "productController : updateProduct - Updated Product without embedding:",
    product,
  );

  if (
    req.body.name ||
    req.body.description ||
    req.body.category ||
    req.body.price
  ) {
    const text = `
        Name: ${product.name}
        Description: ${product.description}
        Category: ${product.category}
        Rating: ${product.ratings}
        Price: ${product.price}
        `;

    const embedding = await generateEmbedding(text);

    product.embedding = embedding;

    await product.save();
  }
  console.log("productController : updateProduct - Embedding updated");
  await cacheService.delete("products:first-page");
  await cacheService.delete("home:products");

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete product -- Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.deleteOne();

  await cacheService.delete("products:first-page");
  await cacheService.delete("home:products");

  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});

//Create New Review or Update the Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    avatar: req.user.avatar.url,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString(),
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
        rev.avatar = req.user.avatar.url;
      }
      // (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 400));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 400));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString(),
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) ratings = 0;
  else ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    },
  );

  res.status(200).json({
    success: true,
  });
});

//Populate embeddings for products that are missing them
exports.populateEmbeddings = catchAsyncErrors(async (req, res) => {
  const result = await populateMissingEmbeddings();

  res.status(200).json({
    success: true,
    ...result,
  });
});
