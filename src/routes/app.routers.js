const { Router } = require("express");
const productRoutes = require("./products.routes");
const cartRoutes = require("./cart.routes");
const chatRoutes = require("./chat.routes")
const sessionRoutes = require("./session.routes")

const router = Router();

router.use("/products", productRoutes)
router.use("/carts", cartRoutes)
router.use("/chat", chatRoutes)
router.use("/session", sessionRoutes)

module.exports = router;