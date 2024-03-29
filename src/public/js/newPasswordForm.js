const form = document.getElementById("new-password-form")

const showError = (messsage) =>{
    const errorTag = document.createElement("div");
    errorTag.classList.add("error-message");
    errorTag.textContent = messsage;
    form.parentElement.parentElement.appendChild(errorTag)
}

const showMessage = (message, type = 'success') => {
    const messageTag = document.createElement("div");
    if (type === 'success') {
        messageTag.classList.add("success-message");
    } else if (type === 'error') {
        messageTag.classList.add("error-message");
    }
    messageTag.textContent = message;
    form.parentElement.parentElement.appendChild(messageTag);
}


const showRedirectButton = () =>{
    const redirectButton = document.createElement("button")
    redirectButton.innerHTML = `
    <a href='/login/recover'>New email</a>
    `
    form.parentElement.parentElement.appendChild(redirectButton)
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    const payload = new URLSearchParams(formData)
    const requestOptions = {
        method: 'PUT',
        body: payload
    }
    fetch("/api/users/generatenewpassword", requestOptions)
    .then(response => {
        switch (response.status) {
            case 200:
                console.log(response);
                showMessage("Password changed successfully!");
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
                break;
            case 400:
                showError("The new password can not be the same than the previous. Please, choose a new one")
                break;
            case 403:
                showError("The token has expired, click below to send a new recovering email")
                showRedirectButton()
                break;
            default:
                break;
        }
    })
    .catch(error => console.log(error))
})