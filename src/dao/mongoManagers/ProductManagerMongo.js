const productModel = require("../models/product.model");
const HttError = require("../../utils/error.utils")
const HTTP_STATUS = require("../../constants/api.constants")

class ProductManagerMongo {
    
    async getProducts({limit, page, query, sort}) {
         const filter = (query ? {category: query} : {})
            const options = {
                sort: (sort ? {price: sort}: {}),
                limit: limit || 10,
                page: page || 1,
                lean: true     
            }            
        const products = await productModel.paginate(filter, options)
        return products
    }

   
    async getProductById(id) {
        const product = await productModel.findById(id)
        if(!product){
            throw new HttError(HTTP_STATUS.NOT_FOUND, "No product matches the specified ID")
        }
        return product
    }

    async addProduct(product) {
        await productModel.create(product)
        console.log(`${product.title} added`);
        const newProduct = {
            status: product.status || true,
            thumbnails: product.thumbnails || [],
            ...product
        }
        return newProduct
    }

    async updateProduct(id, product) {
        const updatedProduct = await productModel.updateOne({_id: id}, product)
        console.log(`${product.title ?? "product"} modified`);
        return updatedProduct
    }

    async deleteProduct(id) {
        const deletedProduct = await productModel.deleteOne({_id: id})
        console.log(`product deleted`);
        return deletedProduct
    }


}

module.exports = ProductManagerMongo