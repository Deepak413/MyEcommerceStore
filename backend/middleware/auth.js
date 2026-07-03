const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    console.log("Authentication process started");

    console.log("Checking incoming token cookie inside auth.js : ", req.cookies.token);

    try {
        const decodedData = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        req.user = await User.findById(decodedData.id);

        if (!req.user) {
            return res.status(401).json({ message: "User not found in auth" });
        }

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }

});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHander(
                    `Role: ${req.user.role} is not allowed to access this resource`,
                    403
                )
            );
        }
        next();
    }
}


