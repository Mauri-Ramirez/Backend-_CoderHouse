const { Router } = require("express")
const ProductManager = require("../dao/fileManagers/ProductManager")
const ProductManagerMongo = require("../dao/mongoManagers/ProductManagerMongo")
const options = require("../config/options")



const router = Router(); // se crea una instancia del router

//const manager = new ProductManager("products.json")
const productService = new ProductManager(options.fileSystem.productsFileName)
const productMongoService = new ProductManagerMongo()

//GET ---> TRAE TODOS LOS PRODUCTOS

router.get("/", async (req, res) =>{
    try {
        const products = await productMongoService.getProducts(req.query)
        return res.send({
            status: "succes",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: null,
            nexLink:null
        })

    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
        
    }
})

/* router.get('/', async (req, res)=>{
    const limit = req.query.limit
    try {
        const products = await productMongoService.getProducts()
        if(!limit){
            return res.send({
                status: 'success',
                data: products})
        }
        const limitedProducts = products.slice(0,limit)
        res.send({
            status: 'success',
            data: limitedProducts
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
}) */



//GET ---> TRAE UN PRODUCTO POR SU ID

router.get('/:pid', async (req, res)=>{
    const id = req.params.pid
    try {
        const product = await productMongoService.getProductById(id)
        res.send({product})
        
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})


//POST ---> Agrega un producto al array de productos


router.post('/', async (req, res) =>{
    try {
        const newProduct = req.body
        if(req.files){
            const paths = req.files.map(file => {
                return {path: file.path,
                 originalName: file.originalname  
                }  
                })
            newProduct.thumbnails = paths
        }else{
            newProduct.thumbnails = []
        }
        if(!Object.keys(newProduct).length){
            throw new Error('Error: Missing product')
        }
        const addProduct = await productMongoService.addProduct(newProduct)
        res.send({
            status: 'success',
            added: addProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})



//PUT ---> ACTUALIZAR POR LOS CAMPOS ENVIADOS DESDE EL BODY

router.put('/:pid', async(req, res)=>{
    const productId = req.params.pid
    try {
        if(req.body.id){
            throw new Error("No id must be provided")
        }
        const updateProduct = await productMongoService.updateProduct(productId, req.body)
        res.send({
            status: 'success',
            newProduct: updateProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }

})



//DELETE ---> ELIMINA UN PRODUCTO CON EL ID INDICADO

router.delete('/:pid', async(req, res)=>{
    const productId = req.params.pid
    try {
        const deleteProduct = await productMongoService.deleteProduct(productId)
        res.send({
            status: 'success',
            deletedProduct: deleteProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

module.exports = router;
