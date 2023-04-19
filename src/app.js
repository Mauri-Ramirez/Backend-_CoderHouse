const express = require("express")
const apiRoutes = require("./routes/app.routers")

//se inicia el servidor
const app = express()
const PORT = process.env.PORT || 8080; 

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api", apiRoutes)


//se pone en marcha
app.listen(PORT, err =>{
    if (err)console.log(err);
    console.log("server running in port", PORT);
})