const { Router } = require("express")
const CartManager = require("../dao/fileManagers/Cart.manager")
const CartManagerMongo = require("../dao/mongoManagers/CartManagerMongo")
const { cartModel } = require("../dao/models/cart.model")
const router = Router();

const cartManager = new CartManager("cart.json")
const cartManagerMongo = new CartManagerMongo()

//RUTAS

//TRAE TODOS LOS CARTS


  router.get("/", async (req, res) =>{
    try {
        const cart = await cartManagerMongo.getCarts()
        res.send({
            status: "success",
            carts: cart
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
        
    }
}) 
 
//TRAE UN CART POR SU ID

 router.get("/:cid", async (req, res) =>{
    const id = req.params.cid
    try {
        const cart = await cartManagerMongo.getCartById(id)
        res.send({
            status:"success",
            cart: cart
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})
 
//CREA UN CART CON UN ID AUTOGENERADO

router.post("/", async(req, res)=>{
    try {
        const addCart = await cartManagerMongo.addCart()
        res.send({
            status: "success",
            cart: addCart
        })    
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
        
    }
})

//AGREGA UN PROD A UN CARRITO YA CREADO

router.post("/:cid/product/:pid", async (req,res)=>{
    try {
        const {cid, pid} = req.params
        const addProduct = await cartManagerMongo.addProductToCart(cid, pid)
        res.send({
            status: "succes",
            newCart: addProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
        
    }
})

//UPDATE PRODUCTS

router.put("/:cid", async (req,res) =>{
    const {cid} = req.params
    const newProduct = req.body
    try {
        const updatedCart = await cartManagerMongo.updateProducts(cid, newProduct)
        res.send({
            status:"succes",
            payload: updatedCart
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
        
    }
})

//

 router.put("/:cid/product/:pid", async(req,res)=>{
    const {cid, pid} = req.params
    const amount = Number(req.body.quantity)
    try {
         if(!amount){
            throw new Error("an amount of product must be provided")
        } 
        const updateProduct = await cartManagerMongo.addProductToCart(cid, pid, amount)
        res.send({
            status: "success",
            payload: updateProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
}) 
//

router.delete("/:cid/product/:pid", async(req,res)=>{
    try {
        const {cid, pid} = req.params
        const deletedProduct = await cartManagerMongo.deleteProductFromCart(cid,pid)
        res.send({
            status: "success",
            newCart: deletedProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

//

router.delete("/:cid", async(req,res)=>{
    try {
        const { cid } = req.params
        const result = await cartManagerMongo.deleteAllProducts(cid)
        res.send({
            status: "success",
            payload: result
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})



module.exports = router;