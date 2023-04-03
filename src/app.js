const express = require("express")
const ProductManager = require("./productManager")

//se inicia el servidor
const app = express()

const manager = new ProductManager("./products.json")

app.get("/", (req,res) =>{
    res.status(200).json({mensaje: "Entregable 3"})
})

 app.get("/products", async (req, res) =>{
    const products = await manager.getProducts()
    
    if(req.query.limit){
        const limit = Number(req.query.limit)
        if (isNaN(limit)) {
            return res.status(400).send("debe ser un numero");
          }
        const limitProducts = products.slice(0, limit)
        res.json(limitProducts)
    }else{
        res.json(products)
    }
})

app.get("/products/:pid", async (req, res) =>{
    const pid = Number(req.params.pid)
    const data = await manager.getProductsById(pid)
    if (isNaN(pid)) {
        return res.status(400).send("debe ser un numero");
      }

    if(data){
        res.json(data)
    }else{
        res.status(404).send("No se encontro el producto con ese id")
    }
})


//se pone en marcha
app.listen(8080, err =>{
    if (err)console.log(err);
    console.log("server running");
})