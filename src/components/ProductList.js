import React from 'react';
import './ProductList.css';

function ProductList({ products, addToCart }) {
    return (
        <div className="product-list">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <img
                        src={`${process.env.REACT_APP_BACKEND_URL}${product.photo}`}
                        alt={product.title}
                        className="product-image"
                    />
                    <div className="product-info">
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <div className="product-price">€{product.price}</div>
                        <button
                            onClick={() => addToCart(product)}
                            className="add-to-cart-btn"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
