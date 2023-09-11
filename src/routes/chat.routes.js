const { Router } = require("express")
const passportCall = require("../middlewares/passport.middleware")
const { roleMiddleware } = require("../middlewares/role.middleware.js")

const router = Router()

 router.get("/",
 passportCall("jwt"),
 roleMiddleware(["user", "premium"]),
 (req, res)=>{
     res.render("chat", {})
 })


module.exports = router