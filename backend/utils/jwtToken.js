// Creating token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    console.log("inside sendToken in jwtToken.js , token : ", token);
    const isProd = process.env.NODE_ENV === "production";
    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: `true`,
        sameSite: "None",
        path: "/"
    };

    
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
    console.log("inside sendToken in jwtToken.js , cookie set successfully : ");

    console.log("Cookies set in response:", res.getHeaders()["set-cookie"]);
};

module.exports = sendToken;