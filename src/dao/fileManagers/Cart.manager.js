const fs = require("fs/promises")
const { existsSync } = require("fs")


class CartManager{
    constructor(path){
        this.path = path
    }


     ///OBTENER CART\\\
     async getCarts() {
        try{
            if (!existsSync(this.path)){
                return []
            }
            const carts = await fs.readFile(this.path, 'utf-8')
            if(!carts.length){
                return []
            }
            const parsedCarts = JSON.parse(carts)
            return parsedCarts
        }
        catch(error){
            console.log(error.message)
        }
    }

    ///TRAER CART POR SU ID\\\
    async getCartById(id) {
        try{
            const savedCarts = await this.getCarts();
            const selectedCart = savedCarts.find(cart => cart.id === id)
            if(!selectedCart){
                return { error:'ERROR: no cart matches the specified ID' }
            }
            return selectedCart
        }
        catch(error){
            console.log(error.message)
        }
    }

    ///CREAR UN CART\\\ 
    async addCart(){
        try{
            const savedCarts = await this.getCarts()
            const newId = savedCarts.length > 0 ? savedCarts[savedCarts.length -1 ].id + 1 : 1
            const newCart = {
                id: newId,
                products: []
            }
            savedCarts.push(newCart)
            const CartsString = JSON.stringify(savedCarts, null, '\t')
            await fs.writeFile(this.path, CartsString)
            console.log(`New cart added. Amount of carts: ${savedCarts.length}`)
            return newCart
        }
        catch(error){
            console.log(error.message)
        }
    }


    ///AGREGAR PRODUCTOS A UN CART\\\ 
    async addProduct(cartId, productId){
        const allCarts = await this.getCarts()
        const cart = await this.getCartById(cartId)
        const cartIndex = allCarts.findIndex(item => item.id === cart.id)
        //console.log(cartIndex);
        if(cart.error){
            return cart.error
        }
        const existingProduct = cart.products.find(prod => prod.id === productId)
        if(existingProduct){
            const updatedCart = cart.products.map(prod => {
                if(prod.id === productId){
                    return {
                        id: prod.id,
                        quantity: ++prod.quantity 
                    }
                }else{
                    return prod
                }
            })
        }else{
            cart.products.push({
                product: productId,
                quantity: 1
            })
        }
        allCarts[cartIndex] = cart
        const cartString = JSON.stringify(allCarts, null, '\t')
        await fs.writeFile(this.path, cartString)
        console.log('product added')
        return cart
    } 

 
}

module.exports = CartManager;