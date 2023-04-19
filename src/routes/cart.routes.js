const { Router } = require("express")
const router = Router();
const CartManager = require("../ManagerDaos/cart.manager")
const cartManager = new CartManager("cart.json")

//RUTAS

//GET ---> TRAE UN CART EN ESPECIFICO

router.get("/:cid", async (req, res) =>{
    const cid = Number(req.params.cid);
    if(isNaN(cid)){
        res.status(400).send("debe ser un numero");
    }else{
        res.json({
            status: "success",
            data: await cartManager.getCartById(cid),
        });
    }
});


//POST --> CREA UN CART CON UN ID AUTOGENERADO Y UN ARRAY DE PRODUCTOS [prodId, qnt]
router.post('/', async(req, res)=>{
    const addCart = await cartManager.addCart()
    res.send({
        status: 'success',
        cart: addCart
    })
})


//POST --->  cid/products/pid AGREGA UN PROD A UN CARRITO YA CREADO SI YA EXISTE ESE PROD SOLO SE AGREGA UNO EN LA CANTIDAD

 router.post('/:cid/products/:pid', async(req,res)=>{
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


module.exports = router;