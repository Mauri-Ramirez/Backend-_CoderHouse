const { Router } = require("express")
const ProductsController = require("../controllers/products.controller")
const { roleMiddleware } = require("../middlewares/role.middleware.js")
const passportCall = require("../middlewares/passport.middleware.js")

const router = Router()

router.get("/", ProductsController.getAll)
router.get('/:pid', ProductsController.getById)
router.post('/', passportCall("jwt"), roleMiddleware(["admin", "premium"]), ProductsController.addProduct)
router.put('/:pid', passportCall("jwt"), roleMiddleware(["admin", "premium"]), ProductsController.updateProduct)
router.delete('/:pid', passportCall("jwt"), roleMiddleware(["admin", "premium"]), ProductsController.deleteProduct)

module.exports = router;
