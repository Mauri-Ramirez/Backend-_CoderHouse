const { PERSISTENCE } = require("../config/enviroment.config")
const dbconfig = require("../config/dbConfig")

let cartsDao, productsDao, usersDao

console.log(`Using ${PERSISTENCE} as persistence method`);

switch(PERSISTENCE){

    case "FILE": {
        const CartFileDao = require("./fileManagers/CartFileDao")
        const ProductFileDao = require("./fileManagers/ProductFileDao")
        cartsDao = new CartFileDao()
        productsDao = new ProductFileDao()
        break;
    }

    case "MONGO": {
        dbconfig.connectDB()
        const CartMongoDao = require("./mongoManagers/CartMongoDao")
        const { ProductMongoDao } = require("./mongoManagers/ProductMongoDao")
        const UserMongoDao = require("./mongoManagers/UserMongoDao")
        cartsDao = new CartMongoDao()
        productsDao = new ProductMongoDao()
        usersDao = new UserMongoDao()
        break;
    }
 
    default: {
        throw new Error('You must provide a valid persistence method')
    }
}

const getDaos = () => {
    console.log(cartsDao);
    return {
        cartsDao,
        productsDao, 
        usersDao
    }
}

module.exports = getDaos