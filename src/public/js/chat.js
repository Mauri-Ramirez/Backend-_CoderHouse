console.log("chat js");
const socket = io ()
let user
let chatbox = document.querySelector("#chatbox")

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresar nombre de usario",
    inputValidator: (value) =>{
        return !value&& "Es obligatorio el nombre de usuario"
    },
    allowOutsideClick: false
}).then (result => {
    user = result.value
    socket.emit("authenticated", user)
})

chatbox.addEventListener("keyup", evt =>{
    if (evt.key === "Enter"){
        if(chatbox.value.trim().length>0){
            socket.emit("message",{
                user, message: chatbox.value
            })
            chatbox.value=""
        }
    }
})

socket.on("messageLogs", data =>{
    console.log(data);

    let log = document.getElementById("messageLogs")
    let mensajes =""
    data.forEach(({user, message}) => {
        mensajes += `<li>${user} dice: ${message}</li>`
    });
    log.innerHTML = mensajes
})

socket.on("newUserConnected", user => {
    if (!user){
        return
    }

    Swal.fire({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 10000,
        title: `${user} se a unido al chat`,
        icon: "success"
    })
})

//socket.emit("message", "Hola me comunico de un cliente socket")

/* socket.on("event-socket-individual", data =>{
    console.log(data);
}) */

/* socket.on("evet-para-todos-menos-el-socket-actual", data =>{
    console.log(data);
}) */

 /* socket.on("evt-para-todos", data =>{
    console.log(data);
}) */