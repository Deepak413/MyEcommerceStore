const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const path = require("path");

const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");

app.use(cors({
    origin: ["http://localhost:3000", "https://shoppinggkaro.netlify.app", "http://192.168.1.17:3000"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

//config
dotenv.config({ path: "backend/config/config.env" });
app.use(cookieParser());

app.use(fileUpload());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const Order = require("./routes/orderRoute");
const Payment = require("./routes/paymentRoute");
const ai = require("./routes/aiRoute");

// creating collections in database
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", Order);
app.use("/api/v1", Payment);
app.use("/api/v1", ai)

if (process.env.NODE_ENV == "production") {

    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
    });

}

//Middleware for errors
app.use(errorMiddleware);



module.exports = app;