import React, {useEffect, useState} from 'react';
import axios from 'axios';

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

    const shopItems = [
        {
            id: 1,
            type: 'Print',
            title: 'Alpine Sunset',
            price: 199,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
        },
        {
            id: 2,
            type: 'Book',
            title: 'Climbing Chronicles',
            price: 49,
            image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851'
        },
        {
            id: 3,
            type: 'Print',
            title: 'Mountain Lake',
            price: 249,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'
        }
    ];

    return (
        <section data-name="shop" id="shop" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 data-name="shop-title" className="text-3xl font-bold text-white mb-12 text-center">Shop</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((item) => (
                        <div data-name={`shop-item-${item.id}`} key={item.id} className="shop-item bg-black rounded-lg overflow-hidden">
                            <img src={item.photos[0].path800} alt={item.title} className="w-full h-64 object-cover" />
                            <div className="p-6">
                                <span className="text-sm text-gray-400">{item.type}</span>
                                <h3 className="text-xl text-white font-bold mt-2">{item.title}</h3>
                                <p className="text-gray-300 mt-2">${item.price}</p>
                                <button onClick={() => addToCart(item)} className="w-full mt-4 bg-white text-black py-2 rounded hover:bg-gray-200 transition duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Shop;
