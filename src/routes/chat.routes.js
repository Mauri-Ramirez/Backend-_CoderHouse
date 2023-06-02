const { Router } = require("express")
const messageModel = require("../dao/models/message.model")

const router = Router()

 router.get("/", (req, res)=>{
     res.render("chat", {})
 })


module.exports = router