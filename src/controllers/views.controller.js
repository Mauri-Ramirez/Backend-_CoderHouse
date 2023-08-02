const getDaos = require("../dao/factory")
const ProductsService = require("../services/products.service.js")

const { productsDao, cartsDao } = getDaos()

const productsService = new ProductsService()

class ViewsController{

    static async register(req, res, next) {
        res.render("register", {
            title: "Sign Up!",
            style: "register.css"
        })
    }


    static async login(req, res, next) {
        res.render("login",{
            tittle: "Login",
            style: "login.css"
        })
    }


    static async products(req, res, next) {
        const user = req.user
        try {
            const products = await productsService.getProducts(req.query)
            res.render("index",{
                title: "E-commerce",
                style:"index.css",
                products: products.docs,
                user: user
            })
        }catch (error) {
            res.status(500).send({
                status: "error",
                error: error.message
            })
        }
    }


    static async cart(req, res, next) {
        const cartId = req.params.cid
        const user = req.user
        try {
            const cart = await cartsDao.getById(cartId)
            res.render("cart", {
                title: "Cart",
                style:"cart.css",
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
}

module.exports = ViewsController