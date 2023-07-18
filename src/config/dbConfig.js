const {connect} = require("mongoose")
const options = require("./options")

module.exports = {
    connectDB: () =>{
     connect(options.mongoDB.url)
     console.log("base de datos conectada");
    } 
} 

