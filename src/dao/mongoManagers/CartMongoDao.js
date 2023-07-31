const cartModel = require("../models/cart.model")

class CartMongoDao {

    async getAll() {
        const carts = await cartModel.find()
            return carts
    }

    async getById(id) {
        const cart = await cartModel.findById(id).lean()
            return cart
    }
    /* async getById(id) {
        const cart = await cartModel.findOne({_id: id}).lean()
            return cart
    } */

    async add(){
        const newCart = await cartModel.create({})
            console.log("New cart created");
            return newCart
    }

    async addProductToCart(cid, pid, amount){
        const updatedCart = await cartModel.findByIdAndUpdate(cid, {
            $push: {
                products: {
                    product: pid,
                    quantity: amount
                }
            }
        })
        console.log(`product ${pid} added to cart`);
        return updatedCart
    }    
   
    async updateCart (cid, payload){
        const updateCart = await cartModel.findByIdAndUpdate(cid, payload)
        return updateCart        
    }

    async deleteProductFromCart(cid, pid){
        const cart = cartModel.updateOne({_id: cid}, {$pull: {products: {product: {_id: pid}}}})
        console.log(`product ${pid} deleted from cart`);
        return cart
    }

    async deleteAllProducts(cid){
        const emptyCart = cartModel.updateOne({_id: cid}, {$pull: {products: {}}})
        console.log("cart empty");
        return emptyCart
    }  
}

module.exports = CartMongoDao