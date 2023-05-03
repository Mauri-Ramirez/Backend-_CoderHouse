const { Router } = require("express")

const router = Router()

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