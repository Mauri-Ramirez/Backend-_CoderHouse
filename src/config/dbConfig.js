const {connect} = require("mongoose")
//const mongoose = require("mongoose")
const options = require("./options")

/* mongoose.connect(options.mongoDB.url, (error) =>{
    if(error){
        return console.log(`db connection failes: ${error}`);
    }
    console.log("connected to db");
}) */

module.exports = {
    connectDB: () =>{
     connect(options.mongoDB.url)
     console.log("base de datos conectada");
    } 
}

