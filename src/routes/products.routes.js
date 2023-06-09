const { Router } = require("express")
const ProductsController = require("../controllers/products.controller")

const router = Router()

router.get("/", ProductsController.getAll)
router.get('/:pid', ProductsController.getById)
router.post('/', ProductsController.addProduct)
router.put('/:pid', ProductsController.updateProduct)
router.delete('/:pid', ProductsController.deleteProduct)

module.exports = router;
