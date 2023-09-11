const deleteUser = async(id) =>{
    fetch(`/api/users/${id}`, {
        method: "DELETE"
    })
    .then(()=>alert("Usuario eliminado"))
    .then(response => console.log(response))
}

const changeRole = async(id) =>{
    fetch(`/api/users/premium/${id}`, {
        method: "PUT"
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert("Usuario modificado");
        } else {
            alert(data.message || "Error desconocido");
        }
    })
    .catch(err => console.error(err));    
}

const deleteInactive = async() =>{
    fetch(`/api/users`,{
        method: "DELETE"
    })
    .then((response) =>{
        if(response.status === 200){
            alert("Usuarios eliminados")
        }else{
            alert("Ha habidio un problema al elimiminar usuarios")
        }
    })
}

