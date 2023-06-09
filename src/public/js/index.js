const productItem = document.querySelector(".product-item")
const addToCartButton = document.getElementById('add-to-cart-button')
const seeCartButton = document.querySelector(".see-cart-button")

const cartId = seeCartButton.id

const addToCart = async (event) =>{
    productId = event.target.parentNode.getAttribute("id")
    //const amount = event.target.previousElementSibling.children[1].textContent    
    await fetch(`/api/carts/${cartId}/product/${productId}`, {
        headers: {
            "content-Type": "application/json"
        },
        method: "POST",
        //body: JSON.stringify({amount})
    })
    .then(()=>alert("item added to cart"))
    //event.target.previousElementSibling.children[1].textContent = 1
}


const seeCart = async (event) =>{
   // if(!currentCart){
   // return alert("cart empty")
   // }
   window.location.href = `/cart/${cartId}`
    
   // console.log(event.target.id);
}

/* const decreaseAmount = (event) =>{
    const amount = + event.target.nextElementSibling.textContent
    if (amount > 0){
        event.target.nextElementSibling.textContent = amount - 1
    }
}

const increaseAmount = (event) =>{
    const amount = + event.target.previousElementSibling.textContent
    event.target.previousElementSibling.textContent = amount + 1
} */