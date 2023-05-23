const { Router } = require("express")
//const { userModel } = require("../dao/models/user.model")

const router = Router()

/* router.get("/", async (req, res)=>{
    try {
        let users = await userModel.find()
        console.log(users);
        res.send({
            status: "success",
            payload: users
        })
        
    } catch (error) {
        console.log(error);
        
    }
})

router.post("/", async (req, res)=>{
    try {
        let user = req.body
        
        const newUser = {
            firt_name: user.nombre,
            last_name: user.apellido,
            email: user.email
        }

        let result = await userModel.create(newUser)
        res.status(200).send({result})
    } catch (error) {
        console.log(error);
    }
})

router.put("/:uid", async(req, res) =>{
    const { uid } = req.params
    const user = req.body
    let userToReplace = {
        firt_name: user.nombre,
        last_name: user.apellido,
        email: user.email
    }
    
    let result = await userModel.updateOne({_id: uid}, userToReplace )
    
    res.send({
        status: "succes",
        payload: result
    })
})

router.delete("/:uid", async (req, res)=>{
    try {
        let {uid} = req.params
        let result = await userModel.deleteOne({_id: uid})
        res.send({status: " succes", payload: result})
    } catch (error) {
        console.log(error);
        
    }
}) */


router.get("/", (req,res) =>{

    let testUser = {
        style: "index.css",

        name: "mauriiiii",

        title: "ecommerce",

    }

    res.render("index", testUser)
}) 

/* router.get("/realtimeprod", (req,res)=>{
    res.render("realtimeprod", {})
}) */

module.exports = router