const productData = require('./products');

const cartItemCount = sessionData => Object.values(sessionData).reduce((a, b) => a + b).toString()

const getCartItems = sessionData => {
    const sessionKeys = Object.keys(sessionData).map(e => parseInt(e))
    const sessionValues = Object.values(sessionData).map(e => parseInt(e))
    let cartItems = []
    for (const v of sessionKeys) {
        productData.forEach(i => { if (v === i.id) { cartItems.push(i) } })
    }
    let i = 0
    for (const v of cartItems) {
        v.amount = sessionValues[i]
        i++
    }
    return cartItems
}

const calculateCartTotal = cartItems => {
    let prices = []
    cartItems.forEach(v => {
        prices = v.discounted ?
            cartItems.map(e => (e.price - (e.price * 20 / 100)) * e.amount) : cartItems.map(e => e.price * e.amount)
    })
    return prices.reduce((a, b) => a + b).toString()
}

module.exports = { cartItemCount, getCartItems, calculateCartTotal }