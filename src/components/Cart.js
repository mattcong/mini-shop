import React from 'react';
import '../styles/product.scss';
import BreadImg from '../assets/bread.jpeg';
import MilkImg from '../assets/milk.jpeg';
import EggsImg from '../assets/eggs.jpeg';
import OrangesImg from '../assets/oranges.jpeg';


export default function Cart() {

    const [cartItems, setCartItems] = React.useState([])
    const [cartTotal, setCartTotal] = React.useState([])


    React.useEffect(() => {
        fetch('/cart')
            .then(res => res.json())
            .then(data => setCartItems(data))
    }, [])

    React.useEffect(() => {
        fetch('/cart-total')
            .then(res => res.json())
            .then(data => { setCartTotal(data) })
    }, [])


    const addFromCart = (id) => {
        fetch(`/add/${id}`, { method: "POST" })
            .then(() => {
                updateCart()
                updateCartTotal()
            })
    }

    const removeFromCart = (id) => {
        fetch(`/remove/${id}`, { method: "POST" })
            .then(() => {
                updateCart()
                updateCartTotal()
            })
    }

    const updateCart = () => {
        fetch('/cart', { method: "GET" })
            .then(res => res.json())
            .then(data => setCartItems(data))
    }

    const updateCartTotal = () => {
        fetch('/cart-total', { method: "GET" })
            .then(res => res.json())
            .then(data => setCartTotal(data))
    }


    const images = {
        "Milk": MilkImg,
        "Bread": BreadImg,
        "Eggs": EggsImg,
        "Oranges": OrangesImg
    }


    return (
        <div className="cart__container">
            <div className="cart__head">
                <button>Checkout</button>
                <div className="cart__total"><p>Total: £ {cartTotal}</p></div>
            </div>
            <div className="cart__contents">
                {cartItems.map(({ id, productName, amount }) => {
                    return (
                        <div className="product__wrap" key={id}>
                            <p>{productName}</p>
                            <div className="small-button">
                                <button onClick={() => addFromCart(id)}>+</button>
                                <button onClick={() => removeFromCart(id)}>-</button>
                            </div>
                            <p> x {amount}</p>
                            <img className="cart__img" src={images[productName]} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}