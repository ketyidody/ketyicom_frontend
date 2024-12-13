import React, { useState } from 'react';
import axios from 'axios';
import './Checkout.css';

function Checkout({ cart, goBack, clearCart }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const orderData = {
                ...formData,
                orderItems: cart.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price
                }))
            };

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/orders`, orderData);
            setSuccess(true);
            clearCart();
        } catch (err) {
            setError('There was an error processing your order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="checkout-success">
                <h2>Thank you for your order!</h2>
                <p>We'll process your order soon.</p>
                <button onClick={goBack} className="back-to-shop-btn">
                    Back to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="checkout-summary">
                    <h3>Order Summary</h3>
                    {cart.map(item => (
                        <div key={item.product.id} className="checkout-item">
                            <span>{item.product.title} x {item.quantity}</span>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="checkout-total">
                        <strong>Total: ${cart.reduce((total, item) => 
                            total + (item.product.price * item.quantity), 0).toFixed(2)}
                        </strong>
                    </div>
                </div>
                <div className="checkout-actions">
                    <button 
                        type="button" 
                        onClick={goBack}
                        className="back-btn"
                    >
                        Back to Cart
                    </button>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="submit-btn"
                    >
                        {isSubmitting ? 'Processing...' : 'Place Order'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Checkout; 