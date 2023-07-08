const { Router } = require("express")
const { authMiddleware } = require ("../middlewares/auth.middleware")
const passportCall = require("../middlewares/passport.middleware")


//const messageModel = require("../dao/models/message.model")

const router = Router()

 router.get("/",
 authMiddleware,
 passportCall("jwt"),
 (req, res)=>{
     res.render("chat", {})
 })


module.exports = router