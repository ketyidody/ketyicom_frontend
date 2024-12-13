import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import 'react-photo-view/dist/react-photo-view.css';
import ImageCarousel from "../components/ImageCarousel";


const Shop = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const scrollContainerRef = useRef(null);

    // Function to handle scroll left (previous image)
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({left: -585, behavior: 'smooth'});
        }
    };

    // Function to handle scroll right (next image)
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({left: 585, behavior: 'smooth'});
        }
    };

    return (
        <div className="App-content-shop">
            <div className="shop-container">
                {products.map(product => (
                    <div className="product-card" key={product.id}>
                        <ImageCarousel product={product}/>
                        <div className="product-description-container">
                            <h2>{product.title}</h2>
                            <p>Price: €{product.price}</p>
                        </div>
                        <div className="product-add_to_cart-container">
                            <button onClick={() => addToCart(product)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shop;
