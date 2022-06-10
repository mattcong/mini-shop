import React from 'react';
import '../styles/app.scss';
import Cart from './Cart';


export function App() {

    const [products, setProducts] = React.useState([])
    const [cartCount, setCartCount] = React.useState(0)
    const [showCart, setShowCart] = React.useState(false)


    React.useEffect(() => {
        fetch('/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    const addToCart = (id, callback) => {
        fetch(`/add/${id}`, { method: "GET" })
            .then(callback())
    }

    React.useEffect(() => {
        fetch('/cart-items')
            .then(res => res.json())
            .then(data => setCartCount(data))
    }, [])

    const updateCartCount = () => {
        fetch('/cart-items')
            .then(res => res.json())
            .then(data => setCartCount(data))
    }


    return (
        <div className="global__container">
            <div className="nav__wrap">
                <button onClick={setShowCart}>Cart ({cartCount})</button>
            </div>
            {
                products.map((data) => {
                    return (
                        <div className="product__wrap" key={data.name}>
                            <p>{data.name}</p>
                            {data.discounted ? <p>£{data.price - (data.price * (20 / 100))}<s className="product__old-price">£{data.price}</s></p> : <p>£{data.price}</p>}
                            <button onClick={() => addToCart(data.id, updateCartCount)}>Add To Cart</button>
                        </div>
                    )
                })
            }
            {showCart ? <Cart /> : null}
        </div >
    )
}