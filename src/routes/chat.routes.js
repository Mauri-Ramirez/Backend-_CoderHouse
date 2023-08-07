const { Router } = require("express")
const { authMiddleware } = require ("../middlewares/auth.middleware")
const passportCall = require("../middlewares/passport.middleware")
const { userMiddleware } = require("../middlewares/role.middleware.js")

const router = Router()

 router.get("/",
 passportCall("jwt"),
 userMiddleware,
 (req, res)=>{
     res.render("chat", {})
 })


module.exports = router