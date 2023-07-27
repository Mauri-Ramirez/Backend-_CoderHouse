const { PERSISTENCE } = require("../config/enviroment.config")

let cartDao,  productsDao, userDao

console.log(`Using ${PERSISTENCE} as persistence method`);

switch(PERSISTENCE){

    case "FILE": {
        const CartFileDao = require("./fileManagers/CartFileDao")
        const ProductFileDao = require("./fileManagers/ProductFileDao")
        cartDao = new CartFileDao()
        productsDao = new ProductFileDao()
        break;
    }

    case "MONGO": {
        const CartMongoDao = require("./mongoManagers/CartMongoDao")
        const { ProductMongoDao } = require("./mongoManagers/ProductMongoDao")
        const UserMongoDao = require("./mongoManagers/UserMongoDao")
        cartDao = new CartMongoDao()
        productsDao = new ProductMongoDao()
        userDao = new UserMongoDao()
        break;
    }
 
    default: {
        throw new Error('You must provide a valid persistence method')
    }
}

const getDaos = () => {
    console.log(cartDao);
    return {
        cartDao,
        productsDao, 
        userDao
    }
}

module.exports = getDaos