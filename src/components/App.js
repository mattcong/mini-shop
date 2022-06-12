import React from 'react';
import '../styles/app.scss';
import Cart from './Cart';
import BreadImg from '../assets/bread.jpeg';
import MilkImg from '../assets/milk.jpeg';
import EggsImg from '../assets/eggs.jpeg';
import OrangesImg from '../assets/oranges.jpeg';
import Button from '@mui/material/Button';


export function App() {

    const [products, setProducts] = React.useState([])
    const [cartCount, setCartCount] = React.useState(0)
    const [showCart, setShowCart] = React.useState(false)


    React.useEffect(() => {
        fetch('/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    React.useEffect(() => {
        fetch('/cart')
            .then(res => res.json())
            .then(data => setCartItems(data))
    }, [])

    React.useEffect(() => {
        fetch('/cart-count')
            .then(res => res.json())
            .then(data => setCartCount(data))
    }, [showCart])


    const addToCart = (id) => {
        fetch(`/add/${id}`, { method: "POST" })
            .then(res => res.json())
            .then(setCartCount(cartCount + 1))
    }


    const images = {
        "Milk": MilkImg,
        "Bread": BreadImg,
        "Eggs": EggsImg,
        "Oranges": OrangesImg,
    }


    return (
        <div className="global__container">
            <div className="nav__wrap">
                {cartCount ?
                    <Button className="mid-button" onClick={() => setShowCart(!showCart)}>{!showCart ? "Open Cart" : "Close Cart"} ({cartCount})</Button>
                    : <Button className="mid-button" disabled>Cart Empty (0)</Button>}
            </div>
            {
                products.map(({ id, productName, price, discounted }) => {
                    return (
                        <div className="product__wrap" key={productName} id={productName}>
                            <img className="product__image" src={images[productName]} alt={`Image of ${productName}`} />
                            <p>{productName}</p>
                            {discounted ? <p>£{price - (price * (20 / 100))}<s className="product__old-price">£{price}</s></p> : <p>£{price}</p>}
                            <Button className="mid-button" onClick={() => addToCart(id)}>Add To Cart</Button>
                        </div>
                    )
                })
            }
            {showCart ? <Cart count={cartCount} /> : null}

        </div >
    )
}