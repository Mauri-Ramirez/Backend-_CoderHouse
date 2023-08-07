const {connect} = require("mongoose")
const { MONGO_URL } = require("../config/enviroment.config")

module.exports = {
    connectDB: () =>{
     connect(MONGO_URL)
     console.log("base de datos conectada");
    } 
} 

