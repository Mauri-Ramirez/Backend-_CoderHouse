const HTTP_STATUS = require("../constants/api.constants.js")
const getDaos = require("../dao/factory.js")
const HttpError = require("../utils/error.utils.js")

const { productsDao } = getDaos()

class ProductsService{

     async getProducts(filter = {}){
        const products = await productsDao.getAll(filter)
        return products
    } 

    async getProductById(pid) {
        if(!pid){
            throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST)
        }
        const product = await productsDao.getById(pid)
        if(!product){
            throw new HttpError("Product not found", HTTP_STATUS.NOT_FOUND)
        }
        return product
    }

    async createProduct(productPayload, files){
        const { title, description, code, stock, price, category } = productPayload
        if(!title || !description || !code || !stock || !price || !category){
            throw new HttpError("Please include all the required fields", HTTP_STATUS.BAD_REQUEST)
        }
        if(files){
            const paths = files.map(file => {
                return{
                    path: file.path,
                    originalName: file.originalName
                }
            })
            productPayload.thumbnails = paths
        }else{
            productPayload.thumbnails = []
        }
        const newProduct = productsDao.add(productPayload)
        return newProduct
    }

    async updateProduct(pid, productPayload){
        if(!pid || !productPayload){
            throw new HttpError("Please provide an id and a payload for the product", HTTP_STATUS.BAD_REQUEST)
        }
        const product = await productsDao.getById(pid)
        if(!product){
            throw new HttpError("Product not found", HTTP_STATUS.NOT_FOUND)
        }
        const updatedProduct = await productsDao.updateById(pid, productPayload)
        return updatedProduct
    }

    async deleteProduct(pid){
        if(!pid){
            throw new HttpError("Please specify a product ID", HTTP_STATUS.BAD_REQUEST)
        }
        const deletedProduct = await productsDao.delete(pid)
        return deletedProduct
    }
    
}

module.exports = ProductsService