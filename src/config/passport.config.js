const passport = require("passport")
const local = require("passport-local")
const github = require("passport-github2")

const userService = require("../dao/models/user.model")
const { createHash, isValidPassword  } = require("../utils/bcrypt.utils")

const LocalStrategy = local.Strategy
const GitHubStrategy = github.Strategy

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
                let user = await userService.findOne({email:username})
                if(user){
                    console.log("User already exist");
                    return done(null, false)
                }
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    age,
                    password: createHash(password)
                }
                let result = await userService.create(newUser)
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
                const user = await userService.findOne({email:username})
                if(!user){
                    console.log("user not found");
                    return done(null, false)
                }
                if(!isValidPassword(user, password)){
                    return done(null, false)
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
            try {
                const userData = profile._json
                const user = await userService.findOne({email: userData.email})
                if(!user){
                    const newUser = {
                        firstName: userData.name.split(" ")[0],
                        lastName: userData.name.split(" ")[2],
                        //firstName: userData.fistName,
                        //lastName: userData.lastName,
                        //email: userData.email || " ",
                        email: userData.email,
                        age: userData.age || 0,
                        password: " ",
                        githubLogin: userData.login
                    }
                    const response = userService.create(newUser)
                    const user = response._doc
                    done(null, user)
                }else{
                    done(null, user)
                }
            } catch (error) {
                console.log("Github login error " + error);
                done(error)
            }
        }
    ))
}

passport.serializeUser((user, done) =>{
    done(null, user._id);
})

passport.deserializeUser(async (id, done) =>{
    const user = await userService.findById(id)
    done(null, user)
}) 

module.exports = initializePassport