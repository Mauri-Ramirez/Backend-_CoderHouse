const { Router } = require("express")
const CartsController = require("../controllers/carts.controller")
const passportCall = require("../middlewares/passport.middleware.js")
const { roleMiddleware } = require("../middlewares/role.middleware.js")

const router = Router();

//RUTAS
router.get("/", CartsController.getAll) 
router.get("/:cid", CartsController.getById)
router.post("/", CartsController.addCart)
router.post("/:cid/product/:pid", passportCall("jwt"), roleMiddleware(["user", "premium"]), CartsController.addProduct)
router.put("/:cid", passportCall("jwt"), roleMiddleware(["admin"]), CartsController.updateCart)
router.put("/:cid/product/:pid", passportCall("jwt"), roleMiddleware(["user", "premium"]), CartsController.updateProductAmount)
router.put("/:cid/purchase", passportCall("jwt"), roleMiddleware(["user", "premium"]), CartsController.purchase)
router.delete("/:cid/product/:pid", CartsController.removeProduct)
router.delete("/:cid", CartsController.clearCart)



module.exports = router;