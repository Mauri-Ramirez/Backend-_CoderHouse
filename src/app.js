const express = require("express")
const apiRouter = require("./routes/app.routers")
const path = require("path")
const handlebars = require("express-handlebars")
const helpers = require("handlebars-helpers")
const viewsRouter = require("./routes/views.routes")
const mockRoutes = require("./routes/mock.routes.js")
const loggerTestRoutes = require("./routes/loggerTest.routes.js")
const realtimeProd = require("./routes/realtimeprod.router")
const { Server } = require("socket.io")
const { socketProduct } = require("./utils/socketProduct")
const { socketChat } = require("./utils/socketChat")


const passport = require("passport")
const initializePassport = require("./config/passport.config")


const cookieParser = require("cookie-parser")
const { PORT } = require("./config/enviroment.config")
const addLogger = require("./middlewares/logger.middleware.js")
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUiExpress = require("swagger-ui-express")


//se inicia el servidor
const app = express()

//Swagger documentation

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "E-commerce documentation",
            description: "Main project for Coderhouse backend course"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerOptions)
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))


//hbs---templates--------------------------------
//inicializamos el motor indicado con app.engine("que motor", el motor instanciado)
app.engine("handlebars", handlebars.engine())
//indocamos en parte del proyecto estan las vistas app.set("viewas",ruta)
app.set("views", path.resolve(__dirname, "./views"))
//indicamos que motor queremos utilizar
app.set("view engine", "handlebars")
//-----------------------------------------

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/statics', express.static(path.resolve(__dirname, "./public")))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(addLogger)

///Router
app.use("/api", apiRouter)
app.use("/", viewsRouter)
app.use("/mockingproducts", mockRoutes)
app.use("/loggerTest", loggerTestRoutes)

//Templates
const math = helpers.math();
app.engine('handlebars', handlebars.engine({
    helpers: {
        math
    }
}))
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'handlebars');


//se pone en marcha
const httpServer = app.listen(PORT, err =>{
    if (err)console.log(err);
    console.log("server running in port", PORT);
})

const io = new Server(httpServer)

socketProduct(io)
socketChat(io)


app.use("/", realtimeProd )