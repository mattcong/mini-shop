const cartItemCount = sessionData => Object.values(sessionData).length > 0 ? Object.values(sessionData).reduce((a, b) => a + b).toString() : "0"

const getCartItems = (sessionData, products) => {
    if (sessionData) {
        const sessionKeys = Object.keys(sessionData).map(e => parseInt(e))
        const sessionValues = Object.values(sessionData).map(e => parseInt(e))
        let cartItems = []
        for (const v of sessionKeys) {
            products.forEach(i => { if (v === i.id) { cartItems.push(i) } })
        }
        let i = 0
        for (const v of cartItems) {
            v.amount = sessionValues[i]
            i++
        }
        return cartItems
    }
}

const calculateCartTotal = cartItems => {
    let prices = []
    cartItems.forEach(() =>
        prices = cartItems.map(e => e.discounted ? (e.price - (e.price * 20 / 100)) * e.amount : e.price * e.amount)
    )
    return Object.values(cartItems).length > 0 ? prices.reduce((a, b) => a + b).toString() : "0"
}

const removeEmpty = sessionData => {
    for (key in sessionData) {
        if (!sessionData[key]) { delete sessionData[key] }
    }
}


module.exports = { cartItemCount, getCartItems, calculateCartTotal, removeEmpty }