const { Router } = require("express")
const messageModel = require("../dao/models/message.model")

const router = Router()

router.get("/", async (req, res)=>{
    const messages = await messageModel.find().lean()
    res.render("chat", {messages})
})  

 /* router.get("/", (req, res)=>{
     res.render("chat", {})
 }) */ 





module.exports = router