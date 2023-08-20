const { Router } = require("express")
const { authMiddleware } = require ("../middlewares/auth.middleware")
const passportCall = require("../middlewares/passport.middleware")
const { roleMiddleware } = require("../middlewares/role.middleware.js")

const router = Router()

 router.get("/",
 passportCall("jwt"),
 roleMiddleware(["user"]),
 (req, res)=>{
     res.render("chat", {})
 })


module.exports = router