const express = require('express');
const session = require('express-session');
const path = require('path');
const productData = require('./products');
const { cartItemCount, getCartItems, calculateCartTotal, removeEmpty } = require('./middleware.js');
require('dotenv').config();


const app = express()
const port = process.env.PORT || 3000;

const DIST_DIR = path.join(__dirname, '../dist')
const HTML_FILE = path.join(DIST_DIR, 'index.html')


app.use(express.static(DIST_DIR))
app.use(session({
    secret: process.env.SECRET_KEY || "secret-key",
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

app.get('/cart-count', (req, res) => {
    let total
    req.session.cart ? total = cartItemCount(req.session.cart) : null
    res.send(total)
})

app.get('/cart', (req, res) => {
    req.session.cart ? cart = getCartItems(req.session.cart, productData) : cart = "Empty"
    res.send(cart)
})

app.get('/cart-total', (req, res) => {
    const items = getCartItems(req.session.cart, productData)
    req.session.cart ? cartTotal = calculateCartTotal(items) : cartTotal = "0"
    res.send(cartTotal)
})

app.post('/add/:id', (req, res) => {
    const id = req.params.id
    let cart     
    req.session.cart ? cart = req.session.cart : cart = {}
    if (!cart[id]) { cart[id] = 0 }
    cart[id] = cart[id] + 1
    req.session.cart = cart
    res.send(cart)
})

app.post('/remove/:id', (req, res) => {
    const id = req.params.id
    let cart
    req.session.cart ? cart = req.session.cart : cart = {}
    if (cart[id] > 0) {  cart[id] = cart[id] - 1 }
    removeEmpty(cart)
    req.session.cart = cart
    res.send(cart)
})


app.listen(port, function () {
    console.log(`Listening on ${port}`);
});