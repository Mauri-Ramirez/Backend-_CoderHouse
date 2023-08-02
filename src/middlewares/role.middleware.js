/* const { adminName, adminPassword } = require ("../config/enviroment.config")

const roleMiddleware = async (req, res, next) =>{
    const {email, password} = req.body
    if(email == adminName && password == adminPassword){
        req.session.user = {
            name : "admin",
            lastName: "Coder",
            email: adminName,
            age: 15,
            password: adminPassword,
            role: "admin"
        }
        req.session.save(err => {
            if (err){
                console.log("session error: ", err);
            }
            else{
                res.redirect("/products")
            }
        })
    }else{
        next()
    }
}

module.exports ={
    roleMiddleware
}  */
 
const HTTP_STATUS = require("../constants/api.constants.js")

const adminMiddleware = async (req, res, next) => {
    if(req.user.role === "admin"){
        next()
    }
    else{
        res.status(HTTP_STATUS.FORBIDDEN).json({
            success: false,
            message: 'Only admin can access this resource'
        })
    }
}

const userMiddleware = async (req, res, next) => {
    if(req.user.role === "user"){
        next()
    }
    else{
        res.status(HTTP_STATUS.FORBIDDEN).json({
            success: false,
            message: 'Only users can access this resource'
        })
    }
}


module.exports = {
    adminMiddleware,
    userMiddleware
} 