const mongoose = require("mongoose");

//TO CONNECT TO LOCAL MONGODBCOMPASS run mongod in CMD
const connectDatabase = () => {
    mongoose
    .connect(process.env.DB_URI, {      //it create a database
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then((data) => {
        console.log(`Mongodb connected with server ${data.connection.host}`);
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
}

module.exports = connectDatabase