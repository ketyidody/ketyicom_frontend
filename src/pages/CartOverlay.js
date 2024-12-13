import React, {useState} from 'react';
import Cart from "./Cart";

const CartOverlay = ({cart, clearCart, closeCart, setCart}) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });

    const [errors, setErrors] = useState({});
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Total Cart Price
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    // Validate form inputs
    const validateForm = () => {
        let validationErrors = {};
        if (!user.firstName) validationErrors.firstName = 'First name is required';
        if (!user.lastName) validationErrors.lastName = 'Last name is required';
        if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) validationErrors.email = 'Valid email is required';
        if (!user.phone || !/^[0-9]+$/.test(user.phone)) validationErrors.phone = 'Valid phone number is required';
        if (!user.address) validationErrors.address = 'Address is required';
        return validationErrors;
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Submit Order
    const handleSubmitOrder = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Send order to backend
        const orderData = {
            cart,
            user
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                // On success, show thank you message and clear the cart
                setOrderSuccess(true);
                clearCart();
            } else {
                alert('There was an issue with your order. Please try again.');
            }
        } catch (error) {
            console.error('Error sending order:', error);
        }
    };

    return (
        <div className="cart-overlay">
            <div className="cart-overlay-backdrop"></div>

            <div className="cart-overlay-content">
                <div className="cart-close-btn-container">
                    <button className="close-cart" onClick={closeCart}>X</button>
                </div>
                {!orderSuccess ? (
                    <div>
                        <h1>Your order</h1>
                        <Cart cart={cart} removeFromCart={removeFromCart}/>

                        {(cart.length !== 0) ? (
                            <div className="user-information">
                                <h2>User Information</h2>
                                <form className="user-form">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={user.firstName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.firstName && <p className="error">{errors.firstName}</p>}

                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={user.lastName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.lastName && <p className="error">{errors.lastName}</p>}

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={user.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && <p className="error">{errors.email}</p>}

                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        value={user.phone}
                                        onChange={handleInputChange}
                                    />
                                    {errors.phone && <p className="error">{errors.phone}</p>}

                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={user.address}
                                        onChange={handleInputChange}
                                    />
                                    {errors.address && <p className="error">{errors.address}</p>}
                                </form>
                                <button className="order-button" onClick={handleSubmitOrder}>
                                    Place Order
                                </button>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                ) : (
                    <div className="thank-you-message">
                        <h2>Thank you for your order!</h2>
                        <p>We have received your order and will process it soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartOverlay;
