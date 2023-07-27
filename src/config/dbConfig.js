/* const {connect} = require("mongoose")
//const options = require("./options")
const { PERSISTENCE, MONGO_URL } = require("../config/enviroment.config")

let urlprueba = MONGO_URL

module.exports = {
    connectDB: () =>{
     connect(PERSISTENCE.urlprueba)
     console.log("base de datos conectada");
    } 
}  */

const {connect} = require("mongoose")
//const options = require("./options")
const { MONGO_URL } = require("../config/enviroment.config")

module.exports = {
    connectDB: () =>{
     connect(MONGO_URL)
     console.log("base de datos conectada");
    } 
} 

