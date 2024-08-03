const ErrorHander = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Mongodb errors - wrong id
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message, 400);
    }

    //Mongoose duplicate key error - duplicate user
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHander(message, 400);
    }

    //Wrong jwt error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Wen Token is invalid, try again`;
        err = new ErrorHander(message, 400);
    }

    //JWT Expire  error
    if(err.name === "TokenExpiredError"){
        const message = `Json Wen Token is Expired, try again`;
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
