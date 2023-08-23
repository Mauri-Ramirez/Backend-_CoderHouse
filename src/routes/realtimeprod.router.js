const { Router } = require("express")

const router = Router()

router.get("/realtimeprod", ( req, res)=>{
    res.render("realtimeprod", {}) 
    })


module.exports = router; 