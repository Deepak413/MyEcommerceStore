const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const path = require("path");

const dotenv = require("dotenv");

const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Required for cookies and auth headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin); // Dynamic origin
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

const errorMiddleware = require("./middleware/error");

//config
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const Order = require("./routes/orderRoute");
const Payment = require("./routes/paymentRoute");

// creating collections in database
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", Order);
app.use("/api/v1", Payment);

if (process.env.NODE_ENV == "production") {

    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
    });


    // app.get('/', (req,res)=>{
    //     app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
    //     res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html'));
    // })
}

//Middleware for errors
app.use(errorMiddleware);



module.exports = app;