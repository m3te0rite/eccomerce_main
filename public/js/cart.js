const payBtn = document.querySelector('.btn-buy');

payBtn.addEventListener('click', () => {
    console.log("checking out")
    console.log(localStorage.getItem('cartItems'))
    fetch('/stripe-checkout',{
        method: 'post',
        headers: new Headers({'Content-Type': 'application/Json'}),
        body: JSON.stringify({
            items:JSON.parse(localStorage.getItem('cartItems')),
        }),
    })
    .then ((res) => res.json())
    .then((url) => {
        location.href = url;
        clearCart();
    })
    .catch((err) => console.log(err));
});