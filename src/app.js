const express = require("express")
const apiRoutes = require("./routes/app.routers")
const path = require("path")
const handlebars = require("express-handlebars")
const viewsRouter = require("./routes/views.routes")
const realtimeProd = require("./routes/realtimeprod.router")
const { Server } = require("socket.io")
const { socketProduct } = require("./utils/socketProduct")
const dbConfig = require("./config/dbConfig")
const { socketChat } = require("./utils/socketChat")



//se inicia el servidor
const app = express()
const PORT = process.env.PORT || 8080; 

//////////
dbConfig.connectDB()
/////////
//hbs-----------------------------------
//inicializamos el motor indicado con app.engine("que motor", el motor instanciado)
app.engine("handlebars", handlebars.engine())
//indocamos en parte del proyecto estan las vistas app.set("viewas",ruta)
app.set("views", path.resolve(__dirname, "./views"))
//indicamos que motor queremos utilizar
app.set("view engine", "handlebars")
//-----------------------------------------

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/statics', express.static(path.resolve(__dirname, "./public")))
app.use("/api", apiRoutes)
app.use("/", viewsRouter)


//se pone en marcha
const httpServer = app.listen(PORT, err =>{
    if (err)console.log(err);
    console.log("server running in port", PORT);
})

const io = new Server(httpServer)

socketProduct(io)
socketChat(io)


app.use("/", realtimeProd )