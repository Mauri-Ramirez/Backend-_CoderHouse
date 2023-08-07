const passport = require("passport")
const local = require("passport-local")
const github = require("passport-github2")
const jwt = require("passport-jwt")
const { createHash, isValidPassword  } = require("../utils/bcrypt.utils")
const getDaos = require("../dao/factory")
const { cookieExtractor } = require("../utils/session.utils")
const { SECRET_KEY } = require("../config/enviroment.config.js")
const { ADMIN_NAME, ADMIN_PASSWORD } = require("./enviroment.config")
const { AddUserDTO, GetUserDTO } = require("../dao/DTOs/users.dto.js")

const { cartsDao, usersDao } = getDaos()

const LocalStrategy = local.Strategy
const GitHubStrategy = github.Strategy
const JwtStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () =>{
    //LOCAL REGISTER
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
                    const message = "User already exist"
                    console.log(message);
                    return done(null, false, {message})
                }
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    age,
                    password: createHash(password),
                    cart: cart._id,
                }
                const userPayload = new AddUserDTO(newUser)
                let result = await usersDao.addUser(userPayload)
                //console.log(result);
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
                        first_name: "Admin",
                        last_name: "Coder",
                        email: ADMIN_NAME,
                        password: ADMIN_PASSWORD,
                        role: "admin",
                        cart: "64c9505ccaa4e771fc74cb12"
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
                        cart: cart._id
                    }
                    const userPayload = new AddUserDTO(newUser)
                    const response = await usersDao.addUser(userPayload)
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
            console.log(jwt_payload);
            const userPayload = new GetUserDTO(jwt_payload)
            return done(null, userPayload)
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