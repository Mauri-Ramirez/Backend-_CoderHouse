const { Router } = require("express");
const productRoutes = require("./products.routes");
const cartRoutes = require("./cart.routes");
const chatRoutes = require("./chat.routes")
const sessionRoutes = require("./session.routes")
const userRoutes = require("./users.routes")
const errorMiddleware = require("../middlewares/error.middleware")
//const { userMiddleware } = require("../middlewares/role.middleware.js")
//const passportCall = require("../middlewares/passport.middleware.js")

const router = Router();

router.use("/products", productRoutes)
router.use("/carts", cartRoutes)
router.use("/chat", chatRoutes)
router.use("/session", sessionRoutes)
router.use("/users", userRoutes)

router.use(errorMiddleware)

module.exports = router;