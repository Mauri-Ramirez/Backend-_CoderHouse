const getDaos = require("../dao/factory")
const CartsService = require("../services/carts.service.js")
const ProductsService = require("../services/products.service.js")
const TicketsService = require("../services/tickets.service.js")

const { ticketsDao } = getDaos()

const productsService = new ProductsService()
const cartsService = new CartsService()
const ticketsService = new TicketsService()

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
        const  {user}  = req
        const filter = req.query
        try {
            const products = await productsService.getProducts(filter)
            res.render("index",{
                title: "E-commerce",
                style:"index.css",
                products: products,
                user: user
            })          
        }catch (error) {
            next(error)
        }
    }


    static async cart(req, res, next) {
        const { cid } = req.params
        const { user }  = req
        try {
            const cart = await cartsService.getCartById(cid)
            res.render("cart", {
                title: "Cart",
                style:"cart.css",
                user,
                cart
            })
            console.log(cart);
        } catch (error) {
            next(error)
        }
    }

     static async ticket(req, res, next){
        const { tid } = req.params
        try {
            const ticket = await ticketsService.getTicketById(tid)
            res.render("ticket", {
                title: "Purchase Ticket",
                styles: "ticket.css",
                ticket
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ViewsController