import React from 'react';
import '../styles/product.scss';


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
            .then(data => setCartTotal(data))
    }, [])

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

    
    return (
        <div className="cart__container">
            <button onClick={updateCart}>Update Cart</button>
            <div className="cart__contents">
                {cartItems.map((data) => {
                    return (
                        <div className="product__wrap" key={data.id}>
                            <p>{data.name}</p>
                            <p> x {data.amount}</p>
                        </div>
                    )
                })}
            </div>
            <div className="cart__total"><p>Total: £{cartTotal}</p></div>
        </div>
    )
}