const ProductManager = require("../dao/fileManagers/ProductFileDao")
const path = "products.json"


const productManager = new ProductManager(path)

const socketProduct = async (io) => {
    const products = await productManager.getAll
    console.log(productManager);
    io.on("connection", socket => {
        console.log("Cliente conectado socket product")
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


   