const productModel = require("../models/product.model");
const HttError = require("../../utils/error.utils")
const HTTP_STATUS = require("../../constants/api.constants")

class ProductMongoDao {
    
    async getAll({limit, page, query, sort}) {
        let filter
        if(!query){
            filter =  {}
        }else if(query == "true"){
            filter = {status: true}
        }else if(query == "false"){
            filter = {status: false}
        }else{
            filter = {category: query}
        }
        const options = {
            sort: (sort ? {price: sort} : {}),
            limit: limit || 10,
            page: page || 1,
            lean: true
        }
        const products = await productModel.paginate(filter,options)
        return products
    }

    /* async getAll({limit, page, query, sort}) {
         const filter = (query ? {category: query} : {})
            const options = {
                sort: (sort ? {price: sort}: {}),
                limit: limit || 10,
                page: page || 1,
                lean: true     
            }            
        const products = await productModel.paginate(filter, options)
        return products
    } */

   
    async getById(id) {
        const product = await productModel.findById(id)
        return product
    }

    async add(product) {
        await productModel.create(product)
        console.log(`${product.title} added`);
        const newProduct = {
            status: product.status || true,
            thumbnails: product.thumbnails || [],
            ...product
        }
        return newProduct
    }

    async updateById(id, product) {
        console.log(product);
        const updatedProduct = await productModel.updateOne({_id: id}, product)
        console.log(`${product.title ?? "product"} modified`);
        return updatedProduct
    }

    async delete(id) {
        const deletedProduct = await productModel.deleteOne({_id: id})
        console.log(`product deleted`);
        return deletedProduct
    }


}

module.exports = {ProductMongoDao}