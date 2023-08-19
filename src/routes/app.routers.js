const { Router } = require("express");
const productRoutes = require("./products.routes");
const cartRoutes = require("./cart.routes");
const chatRoutes = require("./chat.routes")
const sessionRoutes = require("./session.routes")
const userRoutes = require("./users.routes")
const mailRoutes = require("./mail.routes.js")
const errorMiddleware = require("../middlewares/error.middleware")

const router = Router();

router.use("/products", productRoutes)
router.use("/carts", cartRoutes)
router.use("/chat", chatRoutes)
router.use("/session", sessionRoutes)
router.use("/users", userRoutes)
router.use("/mail", mailRoutes)

router.use(errorMiddleware)

module.exports = router;