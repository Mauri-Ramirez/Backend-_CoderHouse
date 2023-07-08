const { Router } = require("express")
//const productModel = require("../dao/models/product.model")
const ProductManagerMongo = require("../dao/mongoManagers/ProductManagerMongo")
const CartManagerMongo = require("../dao/mongoManagers/CartManagerMongo")
const { sessionMiddleware } = require ("../middlewares/session.middleware")
const { authMiddleware } = require ("../middlewares/auth.middleware")
const passportCall = require("../middlewares/passport.middleware")

const router = Router()

const productMongo = new ProductManagerMongo()
const cartMongo = new CartManagerMongo()


router.get("/", (req, res) =>{
    res.redirect("/login")
})

router.get("/register",
        sessionMiddleware,
        (req, res)=>{
            res.render("register", {
                title: "Sign Up!",
                style: "register.css"
    })
})

router.get("/login",
     sessionMiddleware,
     (req, res)=>{
        res.render("login",{
            tittle: "Login",
            style: "login.css"
    })
})
 

router.get("/products",
 authMiddleware,
 passportCall("jwt"),
 async (req, res) =>{
    const user = req.user
    try {
        const products = await productMongo.getProducts(req.query)
        res.render("index",{
            title: "E-commerce",
            style:"index.css",
            products: products.docs,
            user: user
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})


router.get("/cart/:cid",
    authMiddleware,
    passportCall("jwt"),
    async (req, res)=>{
        const cartId = req.params.cid
        const user = req.user
        try {
            const cart = await cartMongo.getCartById(cartId)
            res.render("cart", {
                title: "Cart",
                style:"cart.css",
                products: cart.products,
                user,
                cart
            })
        } catch (error) {
            res.status(500).send({
                status: "error",
                error: error.message
                })
        }
    }
)

module.exports = router