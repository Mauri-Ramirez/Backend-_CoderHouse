const { Router } = require("express")
const { roleMiddleware } = require("../middlewares/role.middleware")
const userModel = require("../dao/models/user.model")
const passport = require("passport")

const router = Router();

//POST 
router.post("/register",
passport.authenticate("register", {failureRedirect: "/api/session/failRegister"}),
(req, res) =>res.redirect("/login")
)

router.get("/failRegister", (req, res) =>{
    res.send({error: "Failed Register"})
})

router.get("/", (req, res) =>{
    res.send("Session!!!!")
})

/* router.post("/register", async (req, res)=>{
    try {
        const email = req.body.email
        let user = await userModel.findOne({email})
        if (user){
            return res.send("Erorr: Email already registered")
        }
        await userModel.create(req.body)
        res.redirect("/login")
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            error: error
        })
    }
}) */

router.post("/login",
    roleMiddleware,
    passport.authenticate("login", {failureRedirect: "/api/session/failLogin"}),
    async(req, res)=>{
        if(!req, res){
            return res.status(400).send({
                status: "error",
                error: "Invalid credentials"
            })
        }
        const userSession = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            age: req.user.age,
            role: "user"
        }
        req.session.user = userSession
        req.session.save(err => {
            if (err){
                console.log("session error: ", err);
            }
            else{
                res.redirect("/products")
            }
        })
    }
)

/* router.post("/login", roleMiddleware, async (req,res)=>{
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({email: email}).lean()
        if(user.password !== password){
            return res.send("incorrect password")
        }
        if(!user){
            return res.send("User not found")
        }
        const userSession = {
            ...user,
            role: "user"
        }
        req.session.user = userSession
        req.session.save(err =>{
            if(err){
                console.log("session error: ", err);
            }else{
                res.redirect("/products")
            }
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error
        })
    }
}) */

router.get("/failLogin", (req, res)=>{
    res.send({error: "Failed Login"})
})

router.get("/github",
    passport.authenticate("github", { scope: ["user:email"] }
))

router.get("/github/callback",
    passport.authenticate("github", {failureRedirect: "/api/session/failLogin"}),
    async (req, res) =>{
        const sessionUser = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            age: req.user.age,
            email: req.user.email,
            githubLogin: req.user.githubLogin,
            role: "user"
        }
        req.session.user = sessionUser
        res.redirect("/products")
    }
)

router.get("/logout", async (req, res) =>{
    try {
        req.session.destroy(err =>{
            if(err){
                console.log(err);
            }else{
                res.clearCookie("start-solo")
                res.redirect("/")
            }
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error
        })
    }
})

module.exports = router 

