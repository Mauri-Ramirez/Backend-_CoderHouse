const cartBody = document.querySelector(".cart-container")
const cartList = document.querySelector(".cart-list")

const removeProduct = async (event) =>{
    const productId = event.target.parentNode.getAttribute("id")
    const cartId = event.target.parentNode.parentNode.getAttribute("id")
    await fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'DELETE'
    })
    alert("item deleted from cart")
    window.location.href = window.location.href
}

const clearCart = async(event) =>{
    const cartId = event.target.parentNode.getAttribute("id")
    await fetch(`/api/carts/${cartId}`,{
        method: 'delete'
    })
    window.location.href = window.location.href
}


const seeTicketButton = ticketId => {
    const ticketButton = document.createElement("button");
    ticketButton.innerText = 'See ticket';
    ticketButton.classList.add('see-ticket', 'waves-effect', 'waves-light', 'btn-small', 'indigo', 'darken-4');
    ticketButton.addEventListener('click', ()=>{
        window.location.pathname = `/ticket/${ticketId}`;
    })
    cartBody.appendChild(ticketButton);
}


const showThanks = () =>{
    const thanksTag = document.createElement('p')
    thanksTag.innerText = 'Thanks for buying with us. Enjoy your purchase!'
    cartBody.appendChild(thanksTag)
}

const purchase = async(event) => {
    const cartId = event.target.parentNode.getAttribute('id');
    await fetch(`/api/carts/${cartId}/purchase`,{
        method: 'put'
    })
    .then(response => response.json())
    .then(response => {
        if(response.success && response.payload.newTicket) {
            const ticketId = response.payload.newTicket._id;
            seeTicketButton(ticketId); 
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    cartList.remove();
    showThanks();
}





