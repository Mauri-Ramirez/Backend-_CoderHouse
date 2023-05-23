const fs = require('fs')


class ProductManager{
    
    constructor(path){
        this.path = path
    }

    ///OBTENER PRODUCTOS\\\


     getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            //console.log(data);
            const products = JSON.parse(data);
            return products;
        }else{
            return []
        }
    }
 
    ///AGREGAR PRODUCTOS\\\ 

    async addProduct(product) {
        try{
            const savedProducts = await this.getProducts()
            const DuplicatedProduct = savedProducts.find(item => item.code == product.code)
            if (DuplicatedProduct){
                throw new Error(`ERROR: Unable to add. The next code has been already added: ${product.code}`)
            }
            if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category){
                throw new Error(`ERROR: Unable to add. Missing fields`)
            }
            const newId = savedProducts.length > 0 ? savedProducts[savedProducts.length -1 ].id + 1 : 1
            const newProduct = {
                id: newId,
                status: product.status || true,
                thumbnails: product.thumbnails || [],
                ...product
            }
            savedProducts.push(newProduct)
            const productListString = JSON.stringify(savedProducts, null, '\t')
            await fs.promises.writeFile(this.path, productListString)
            console.log(`${product.title} added`)
            return newProduct
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    ///TRAER PRODUCTOS POR SU ID\\\

    async getProductById(id) {
        const idNumber = Number(id)
        try{
            const savedProducts = await this.getProducts();
            const selectedProduct = savedProducts.find(prod => prod.id === idNumber)
            if(!selectedProduct){
                throw new Error('ERROR: no product matches the specified ID')
            }
            return selectedProduct
        }
        catch(error){
            throw new Error(error.message)
        }
    }

    
    ///ACTUALIZAR PRODUCTOS POR SU ID \\\

    async updateProduct(id, product) {
        const idNumber = Number(id)
        try{
            const savedProducts = await this.getProducts()
            const targetProduct = await this.getProductById(idNumber)
            const updatedProduct = {...targetProduct, ...product}
            const updatedList = savedProducts.map(prod =>{
                if(prod.id === idNumber){
                    return updatedProduct
                }else{
                    return prod
                }
            })
            const productListString = JSON.stringify(updatedList, null, '\t')
            await fs.promises.writeFile(this.path, productListString)
            console.log('product modified')
            return updatedProduct
        }
        catch(error){
            throw new Error(error.message)
        }
    }



    ///BORRAR PRODUCTOS POR SU ID\\\

     async deleteProduct(id) {
        const idNumber = Number(id)
        try{
            const savedProducts = await this.getProducts();
            const targetProduct = await this.getProductById(idNumber)
            const filteredList = savedProducts.filter((prod) => prod.id !== idNumber)
            const productListString = JSON.stringify(filteredList, null, '\t')
            await fs.promises.writeFile(this.path, productListString)
            console.log(`${targetProduct.title} deleted`)
            return targetProduct   
        }
        catch(error){
            throw new Error(error.message)
        }
    }
    
}



module.exports = ProductManager;