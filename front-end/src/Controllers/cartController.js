/************************* Add Book to Cart ***************************/
const addToCart = async (bookId, amount) => {
    if (!bookId || !amount) {
        throw Error("Book ID and amount are required")
    }

    const res = await fetch(`/api/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            bookId,
            amount
        })
    })

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error)
    }

    return data;
}

/************************* Get Cart ***************************/

const getCart = async () => {
    const res = await fetch(`/api/cart`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error)
    }

    return data;
}

/************************* Remove Book from Cart ***************************/

const removeFromCart = async (cartItemId) => {
    const res = await fetch(`/api/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error)
    }
}


/************************* Clear Cart ***************************/
const clearCart = async () => {
    const res = await fetch(`/api/cart`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error)
    }

    return data;
}

export { addToCart, getCart , removeFromCart , clearCart }