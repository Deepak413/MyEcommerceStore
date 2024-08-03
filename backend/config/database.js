const mongoose = require("mongoose");


// const DB = 'mongodb+srv://ddhaker2000:2oLQFpMLZTrW4Fn9@ecommercecluster.eam03zq.mongodb.net/ecomdb?retryWrites=true&w=majority';

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
    // mongoose.connect(DB, {
    //     useNewUrlParser:true, useFindAndModify:false, useUnifiedTopology:true
    // }).then(()=>{
    //     console.log("Mongodb connected with server");
    // }).catch((err)=> console.log(`No connection to db`));
}

module.exports = connectDatabase