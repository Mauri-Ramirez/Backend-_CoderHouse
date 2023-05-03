const ProductManager = require("../../ManagerDaos/productManager")
const path = "products.json"


const productManager = new ProductManager(path)

const socketProduct = async (io) => {
    const products = await productManager.getProducts()
    console.log(productManager);
    io.on("connection", socket => {
        console.log("Cliente conectado socket prodcut")
        console.log(products);
        socket.emit("productos", products)

        socket.on("addProduct", data =>{
            console.log(data);
            productManager.addProduct(data)
        })

        
    })
}


module.exports = {
    socketProduct}
 