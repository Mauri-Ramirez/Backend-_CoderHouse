const  fs = require("fs")

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

     addProduct = async  (tittle, description, price, thumbnail, code, stock) => {
        const products = await this.getProducts();
        let newCode = await products.find(prod => prod.code === code)
        //await console.log(typeof products);
        if (newCode) { console.log("Codigo Duplicado") }
        else{
            const product = {
                tittle,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            if (products.length === 0){
                product.id = 1
            }else{
                product.id = await products [products.length - 1].id + 1;
            }

            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
        }
    }  
 
    ///TRAER PRODUCTOS POR SU ID\\\

    async getProductsById(id){
        try{
            const contenidoArchivo = await this.getProducts()
            let idFound = contenidoArchivo.find((prod) => prod.id === id);
            //console.log(idFound);
            return idFound
        }catch (error){
            console.log(error);
        }
    }

    
    ///ACTUALIZAR PRODUCTOS POR SU ID \\\

    async updateProduct(id, product){
        try{
            const contenidoArchivo = await this.getProducts()
            const tarjetProduct = await this.getProductsById(id)
            //console.log(tarjetProduct);
            if(tarjetProduct){
                const updateProduct = {...tarjetProduct, ...product}
                const updateList = contenidoArchivo.map(prod =>{
                    if(prod.id === id){
                        return updateProduct
                    }else{
                        return prod
                    }
                })
                const productListString = JSON.stringify(updateList, null, 2)
                await fs.promises.writeFile(this.path, productListString)
                console.log("producto modificado");
            }
        }catch(error){
            console.log(error);
        }
    }


    ///BORRAR PRODUCTOS POR SU ID\\\

    async deleteProduct (id){
        try{
            const contenidoArchivo = await this.getProducts()
            const deleted = contenidoArchivo.filter((prod) => prod.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(deleted, null, 2))
            console.log("Producto Borrado");
        }catch (error){
            console.log(error);
        }
    }
}


//const contenedor = new ProductManager("./products.json")
//contenedor.getProducts()
//contenedor.addProduct ("titulo ejemplo3", " descripcion ejemplo3", 100, "imggggg", 000,  23)
//contenedor.getProductsById(2)
//contenedor.updateProduct(3, {tittle:"titulo", description: "descripcion", price: 200, thumbnail:"imagen", code: 321, stock : 10})
//contenedor.deleteProduct(1);

module.exports = ProductManager;