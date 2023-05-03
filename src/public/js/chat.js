console.log("chat js");
const socket = io ()

socket.emit("message", "Hola me comunico de un cliente socket")

/* socket.on("event-socket-individual", data =>{
    console.log(data);
}) */

/* socket.on("evet-para-todos-menos-el-socket-actual", data =>{
    console.log(data);
}) */

 socket.on("evt-para-todos", data =>{
    console.log(data);
})