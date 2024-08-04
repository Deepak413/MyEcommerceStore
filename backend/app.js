const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const path = require("path");

const dotenv = require("dotenv");

// const corsOptions = {
//     origin: "http://localhost:3000" // frontend URI (ReactJS)
// }
// app.use(cors(corsOptions));

app.use(cors());

const errorMiddleware = require("./middleware/error");

//config
dotenv.config({ path: "backend/config/config.env" });

// app.use(cors())
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

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware for errors
app.use(errorMiddleware);



module.exports = app;