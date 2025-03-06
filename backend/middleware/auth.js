const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    console.log("Authentication process started");
    console.log("req in auth : ", req);
    console.log("req in auth ended")
    console.log("Headers received in request in auth:", req.headers);
    console.log("Headers received in request in auth: ended");

    console.log("Cookies in Headers in auth:", req.headers);
    console.log("Cookies in Headers in auth: ended");

    console.log("Received Cookies in auth:", req.cookies);
    console.log("Received Cookies in auth: ended")

    const authHeader = req.headers.authorization;
    console.log("authorization in auth.js : ", authHeader);
    console.log("authorization in auth.js : ended");

    const token = authHeader.split(" ")[1];

    console.log("token in auth.js : ", token);
    
    console.log("Checking incoming cookies inside auth.js : ", req.cookies);

    // if (!token) {
    //     return next(new ErrorHander("Token not found!, Please Login to access this resource", 401));
    // }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication required!!! Token not found!, Please Login to access this resource" });
    }

    try {
        // const token = authorization.split(" ")[1]; // Extract token
        console.log("Extracted token from Authorization : ", token);
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded data in auth : ", decodedData);

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


