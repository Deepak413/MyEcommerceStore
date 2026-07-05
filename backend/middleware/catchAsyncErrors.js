module.exports = theFunc => (req, res, next) => {

    Promise.resolve(theFunc(req, res, next)).catch(next);

}

module.exports = (theFunc) => (req, res, next) => {
  console.log("catchAsyncErrors==================================================");

  Promise.resolve(theFunc(req, res, next)).catch((err) => {
    console.log("ERROR CAUGHT IN catchAsyncErrors");
    console.log("Route:", `${req.method} ${req.originalUrl}`);
    console.log("Message:", err.message);
    console.log("Stack:");
    console.log(err.stack);

    next(err);
  });
};