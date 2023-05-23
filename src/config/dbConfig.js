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

//colocar el nombre del documento en el que queremos guardar despues de mongodb.net/ o se guardara por defecto en test
//let url = "mongodb+srv://mauricioandres9308:uwQzdhQJeOQZwn3a@cluster0.jmtd4ap.mongodb.net/?retryWrites=true&w=majority"


/* module.exports = {
    connectDB: () =>{
     connect(url)
     console.log("base de datos conectada");
    } 

} */