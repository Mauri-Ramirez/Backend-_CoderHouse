const { Router } = require("express")
const SessionsController = require("../controllers/sessions.controller")
const passportCall = require("../middlewares/passport.middleware")

const router = Router();

router.post("/register",
    passportCall("register", {failureRedirect: "/api/session/failRegister", failureFlash: true}),
    (req, res) =>res.redirect("/login")
)

router.get("/failRegister", (req, res) =>{
    res.send({error: req.flash()})
})


router.post("/login",
    passportCall("login", {failureRedirect: "/api/session/failLogin"}),
    SessionsController.login
)

router.get("/failLogin", (req, res)=>{
    res.send({error: "Failed Login"})
})

router.get("/github",
    passportCall("github", { scope: ["user:email"] })    
)

router.get("/github/callback",
    passportCall("github", {failureRedirect: "/api/session/failLogin"}),
    SessionsController.loginGithub
)

router.get("/logout",
    passportCall("jwt"),
    SessionsController.logout
 )

router.get("/current",
    passportCall("jwt"),
    SessionsController.currentSession
)
   

module.exports = router 

