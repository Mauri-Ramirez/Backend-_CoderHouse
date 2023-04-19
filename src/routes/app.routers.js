const { Router } = require("express");
const productRoutes = require("./products.routes");
const cartRoutes = require("./cart.routes");

const router = Router();

router.use("/products", productRoutes)
router.use("/cart", cartRoutes)

module.exports = router;