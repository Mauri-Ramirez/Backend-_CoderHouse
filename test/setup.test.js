const mongoose = require("mongoose")
//const connectDB = require("../src/config/dbConfig.js")
const { MONGO_URL } = require("../src/config/enviroment.config.js")

before( async() =>{
    await mongoose.connect(MONGO_URL)
})

after(async () =>{
    mongoose.connection.close()
})