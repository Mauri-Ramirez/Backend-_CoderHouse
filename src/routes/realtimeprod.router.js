const { Router } = require("express")
//const productManager = require("../dao/fileManagers/ProductFileDao")
//const ProductManagerMongo = require("../dao/mongoManagers/ProductMongoDao")

const router = Router()
//const path = "products.json"

//const ProductMongo =  ProductManagerMongo()
//const ProductManager = new productManager(path)

/*  router.get("/home", async (req, res) => {
    try {
        const products = await ProductManager.getProducts()

        res.render("home", products)
    } catch (error) {
        return res.status(500).send(error)
    }
})  */


/* router.get("/home", async (req, res) => {
    const products = await ProductMongo.getProducts()
    res.render("home", {
        style:"home.css",
        products
    }) 
}) */


router.get("/realtimeprod", ( req, res)=>{
    res.render("realtimeprod", {}) 
    })



module.exports = router; 