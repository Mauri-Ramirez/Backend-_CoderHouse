const { Router } = require("express")
const productModel = require("../dao/models/product.model")
const ProductManagerMongo = require("../dao/mongoManagers/ProductManagerMongo")
const CartManagerMongo = require("../dao/mongoManagers/CartManagerMongo")


const router = Router()
const productMongo = new ProductManagerMongo()
const cartMongo = new CartManagerMongo()

router.get("/products", async (req, res) =>{
    try {
        const products = await productMongo.getProducts(req.params)
        res.render("index",{
            title: "E-commerce",
            style:"index.css",
            products: products.docs
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.get("/cart/:cid", async (req, res)=>{
    const cartId = req.params.cid
    try {
        const cart = await cartMongo.getCartById(cartId)
        res.render("cart", {
            title: "Cart",
            style:"cart.css",
            products: cart.products,
            cartId: cart._id
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})


module.exports = router