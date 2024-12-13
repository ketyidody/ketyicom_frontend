import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
    return (
        <div className="cart">
            <h2>Cart</h2>
            {cart.length === 0 ? (
                <p>The cart is empty</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <img height="50px" width="50px" src={item.photos[0].path480} alt={item.title} />
                                {item.title} - €{item.price} <button onClick={() => removeFromCart(item.id)}>Remove from cart</button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <p>Total: €{cart.reduce((total, item) => total + item.price, 0)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
