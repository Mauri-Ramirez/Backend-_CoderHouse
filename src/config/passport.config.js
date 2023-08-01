const passport = require("passport")
const local = require("passport-local")
const github = require("passport-github2")
const jwt = require("passport-jwt")
//const userService = require("../dao/models/user.model")
const { createHash, isValidPassword  } = require("../utils/bcrypt.utils")
const getDaos = require("../dao/factory")
//const CartMongoDao = require("../dao/mongoManagers/CartMongoDao")
//const UserMongoDao = require("../dao/mongoManagers/UserMongoDao")
const { cookieExtractor } = require("../utils/session.utils")
const { SECRET_KEY } = require("../constants/session.constants")
const { ADMIN_NAME, ADMIN_PASSWORD } = require("./enviroment.config")

const { cartsDao, usersDao } = getDaos()

const LocalStrategy = local.Strategy
const GitHubStrategy = github.Strategy
const JwtStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () =>{
    //Local Register
     passport.use("register", new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email" 
        },
        async (req, username, password, done) => {
            const { firstName, lastName, email, age } = req.body
            if(!firstName || !lastName || !age || !email || !password){
                console.log("missing fields");
                return done(null, false)
            }
            try {
                const user = await usersDao.getByEmail(username)
                const cart = await cartsDao.add()
                if(user){
                    console.log("User already exist");
                    return done(null, false)
                }
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    age,
                    password: createHash(password),
                    cart: cart._id
                }
                let result = await usersDao.addUser(newUser)
                console.log(result);
                return done(null, result)
            } catch (error) {
                return done("Error getting user: " + error)
                
            }
        }
    )),

    //Local Login

    passport.use("login", new LocalStrategy(
        {usernameField: "email"},
        async(username, password, done) =>{
            try {
                if(username === ADMIN_NAME && password === ADMIN_PASSWORD){
                    const user = {
                        firstName: "Admin",
                        lastName: "Coder",
                        email: ADMIN_NAME,
                        password: ADMIN_PASSWORD,
                        role: "admin"
                    }
                    return done(null, user)
                }
                const user = await usersDao.getByEmail(username)
                if(!user){
                    return done(null, false, "user not found")
                }
                if(!isValidPassword(user, password)){
                    return done(null, false, "wrong user or password")
                }
                return done(null, user)

            } catch (error) {
                return done(error)
            }
        }
    ))

 /*     passport.use("login", new LocalStrategy(
        {usernameField: "email"},
        async(username, password, done) =>{
            try {
                const user = await usersDao.getByEmail(username)
                if(!user){
                    return done(null, false, "user not found")
                }
                if(!isValidPassword(user, password)){
                    return done(null, false, "wrong user or password")
                }
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))
  */
    //Github Strategy
    passport.use(
        new GitHubStrategy({
            clientID: "Iv1.3ad9386e54c96ebf",
            clientSecret: "d04d3d3b03abb8ab1353a71f29d3dec7b3e3c5ee",
            callbackURL: "http://localhost:8080/api/session/github/callback"
        },
        async (accessToken, refreshToken, profile, done)=>{
            const userData = profile._json
            try {
                const user = await usersDao.getByEmail(userData.email)
                if(!user){
                    const cart = await cartsDao.add()
                    const newUser = {
                        firstName: userData.name.split(" ")[0],
                        lastName: userData.name.split(" ")[1],
                        //firstName: userData.fistName,
                        //lastName: userData.lastName,
                        //email: userData.email || " ",
                        age: userData.age || 0,
                        email: userData.email,
                        password: " ",
                        githubLogin: userData.login,
                        cart: cart.id
                    }
                    const response = await usersDao.addUser(newUser)
                    const finalUser = response._doc
                    done(null, finalUser)
                    return
                }
                done(null, user)   
            } catch (error) {
                console.log("Github login error " + error);
                done(error)
            }
        }
    ))

    //JWT
    passport.use("jwt", new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET_KEY
    }, async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }
    ))
}

passport.serializeUser((user, done) =>{
    done(null, user._id);
})

passport.deserializeUser(async (id, done) =>{
    const user = await usersDao.getById(id)
    done(null, user)
}) 

module.exports = initializePassport