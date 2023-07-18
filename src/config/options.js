const enviroment = require("./enviroment.config")

const options = {
    fileSystem: {
        productsFileName: "products.json"
    },
    mongoDB:{
        url: enviroment.MONGO_URL
    }
}

module.exports = options