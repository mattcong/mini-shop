const express = require('express');
const session = require('express-session');
const path = require('path');
const productData = require('./products');
const {cartItemCount, getCartItems, calculateCartTotal} = require('./middleware.js')


const app = express()

const port = process.env.PORT || 3000;

const DIST_DIR = path.join(__dirname, '../dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')


app.use(express.static(DIST_DIR))
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000000 }
}))

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
})

app.get('/products', (req, res) => {
    res.send(productData)
})

app.get('/add/:id', (req, res) => {
    const id = req.params.id
    let cart = {}
    req.session.cart ? cart = req.session.cart : null
    if (!cart[id]) { cart[id] = 0 }
    cart[id] = cart[id] + 1
    req.session.cart = cart
    res.send(cart)
})

app.get('/cart-items', (req, res) => {
    let total
    req.session.cart ? total = cartItemCount(req.session.cart) : null
    res.send(total)
})

app.get('/cart', (req, res) => {
    req.session.cart ? cart = getCartItems(req.session.cart) : cart = "Cart is Empty!"
    res.send(cart)
})

app.get('/cart-total', (req, res) => {
    const items = getCartItems(req.session.cart)
    req.session.cart ? cartTotal = calculateCartTotal(items) : cartTotal = "0"
    res.send(cartTotal)
})


app.listen(port, function () {
    console.log(`Listening on ${port}`);
});