const { Router } = require("express")
const CartManager = require("../dao/fileManagers/Cart.manager")
const CartManagerMongo = require("../dao/mongoManagers/CartManagerMongo")

const router = Router();

const cartManager = new CartManager("cart.json")
const cartManagerMongo = new CartManagerMongo()

//RUTAS

 router.get("/", async (req, res) =>{
    try {
        const cart = await cartManagerMongo.getCarts()
        res.send({
            status: "success",
            carts: cart
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
        
    }
}) 

router.get("/:cid", async (req, res) =>{
    const id = req.params.cid
    try {
        const cart = await cartManagerMongo.getCartById(id)
        res.send({
            status:"success",
            cart: cart
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.post("/:cid/product/:pid", async(req, res) =>{
    try {
        const cartId = req.params.cid
        const prodcutId = req.params.pid
        const addProduct = await cartManagerMongo.addProduct(cartId, prodcutId)
        res.send({
            status:"success",
            newCart: addProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.post("/", async(req, res)=>{
    const addCart = await cartManagerMongo.addCart()
    res.send({
        status: "success",
        cart: addCart
    })
})

//GET ---> TRAE UN CART EN ESPECIFICO

/*  router.get("/:cid", async (req, res) =>{
    const cid = Number(req.params.cid);
    if(isNaN(cid)){
        res.status(400).send("debe ser un numero");
    }else{
        res.json({
            status: "success",
            data: await cartManager.getCartById(cid),
        });
    }
});  */


//POST --> CREA UN CART CON UN ID AUTOGENERADO Y UN ARRAY DE PRODUCTOS [prodId, qnt]
/* router.post('/', async(req, res)=>{
    const addCart = await cartManager.addCart()
    res.send({
        status: 'success',
        cart: addCart
    })
}) */


//POST --->  cid/products/pid AGREGA UN PROD A UN CARRITO YA CREADO SI YA EXISTE ESE PROD SOLO SE AGREGA UNO EN LA CANTIDAD

/*  router.post('/:cid/products/:pid', async(req,res)=>{
    try {
        const cid = Number(req.params.cid)
        const pid = Number(req.params.pid)
        const addProduct = await cartManager.addProduct(cid, pid)
        console.log(addProduct);
        res.send({
            status: 'success',
            newCart: addProduct,
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
}) 
 */

module.exports = router;