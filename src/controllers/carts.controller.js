const HTTP_STATUS = require("../constants/api.constants.js")
const CartsService = require ("../services/carts.service.js")
const { apiSuccessResponse } = require("../utils/api.utils.js")

const cartsService = new CartsService

class CartsController{

    static async getAll(req, res, next){        
        try {
            const carts = await cartsService.getCarts()
            const response = apiSuccessResponse(carts)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        const { cid } = req.params
        try {
            const cart = await cartsService.getCartById(cid)
            const response = apiSuccessResponse(cart)
            res.status(HTTP_STATUS.OK).json(response) 
        } catch (error) {
            next(error)
        }
    }

    static async addCart(req, res, next) {
        try {
            const addCart = await cartsService.createCart()
            const response = apiSuccessResponse(addCart)
            res.status(HTTP_STATUS.CREATED).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async addProduct(req, res, next){
        try {
            const {cid, pid} = req.params
            const amount = +req.body?.amount || 1
            const addedProduct = await cartsService.addProductToCart(cid, pid, amount)
            const response = apiSuccessResponse(addedProduct)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

 /*    static async updateProducts(req, res, next){
        const { cid } = req.params
        const newProducts = req.body
        try {
            const updatedCart = await cartsDao.updateProducts(cid, newProducts)
            const response = apiSuccessResponse(updatedCart)
            res.status(HTTP_STATUS.OK).json(response)
            
        } catch (error) {
            next(error)
        }
    }    */
    
   /*  static async updateQuantity(req, res, next){
        const {cid, pid} = req.params
        const amount = req.body.quantity
        if(!amount){
            throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'An amount of product must be provided')
        }
        try {
            const updateProduct = await cartsDao.addProductToCart(cid, pid, amount)
            const response = apiSuccessResponse(updateProduct)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    } */
    
    static async removeProduct(req, res, next){
        const {cid, pid} = req.params
        try {
            const deletedProduct = await cartsService.deleteProduct(cid, pid)
            const response = apiSuccessResponse(deletedProduct)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async clearCart(req, res, next){
        const { cid } = req.params
        try {
            const emptyCart = await cartsService.clearCart(cid)
            const response = apiSuccessResponse(emptyCart)
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = CartsController