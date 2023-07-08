const cartModel = require("../models/cart.model")
const productModel = require("../models/product.model")
const { HttError } = require("../../utils/error.utils")
const HTTP_STATUS = require("../../constants/api.constants")

class CartManagerMongo {

    async getCarts() {
        const carts = await cartModel.find()
            return carts
    }

    async getCartById(id) {
        const cart = await cartModel.findOne({_id: id}).lean()
            return cart
    }

    async addCart(){
        const newCart = await cartModel.create({})
            return newCart
    }

    async addProductToCart(cartId, productId, amount){
        const updatedCart = await cartModel.findByIdAndUpdate(cartId, {
            $push: {
                products: {
                    product: productId,
                    quantity: amount
                }
            }
        })
        console.log(`product ${productId} added to cart`);
        return updatedCart
    }    
    /* async addProductToCart(cartId, productId, amount){
        let cart = await this.getCartById(cartId)
        const Originalproduct = await productModel.findById(productId)
        const producToAdd = cart.products.findIndex(product => product.product._id == productId)
        if(!amount){
            if(producToAdd < 0){
                cart.products.push({product: productId})
            }else{
                cart.products[producToAdd].quantity ++
            }
        }else{
            cart.products[producToAdd].quantity = amount
        }
        console.log(`prduct ${productId} added to cart`);
        let result = await cartModel.updateOne({_id:cartId}, cart)
        return result
    } 
 */

    async updateProducts (cartId, newProducts){
        const cart = await this.getCartById(cartId)
        cart.products = newProducts
        await cartModel.updateOne({_id:cartId}, cart)
        return newProducts        
    }

    async deleteProductFromCart(cartId, prodcutId){
        const cart = await this.getCartById(cartId)
        const productToDelete = cart.products.find(product => product.product._id == prodcutId)
        const index = cart.products.indexOf(productToDelete)
        if(index < 0){
            throw new HttError(HTTP_STATUS.NOT_FOUND, "Product not found")
        }
        cart.products.splice(index, 1)
        const result = cartModel.updateOne({_id:cartId},cart)
        return result
    }

    async deleteAllProducts(cartId){
        const cart = await this.getCartById(cartId)
        cart.products = []
        const result = cartModel.updateOne({_id:cartId}, cart)
        return result
    }  
}

module.exports = CartManagerMongo