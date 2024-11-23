fetch('/api/stripe-checkout', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        items: cart
    })
})
