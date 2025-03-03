// Creating token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // 🔥 Secure cookies (cannot be accessed via JavaScript)
        secure: process.env.NODE_ENV === "production", // 🔥 Secure cookies only in production
        // secure: false, // 🔥 Secure cookies only in production
        sameSite: "None", // 🔥 Ensure cross-site requests work
        path: "/" // Apply to all routes
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;