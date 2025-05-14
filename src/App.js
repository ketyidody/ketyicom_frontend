import './App_new.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useRef, useState, useEffect} from "react";
import Navbar from './pages/Navidation'
import Hero from "./pages/Hero";
import About from "./pages/About_new";
import Footer from "./pages/Footer";
import Portfolio from "./pages/Portfolio";
import Shop from "./pages/Shop_new";

function App() {
    const [cart, setCart] = useState([]);
    const [isCartLoaded, setIsCartLoaded] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            setCart(savedCart);
        }
        setIsCartLoaded(true);
    }, []);

    useEffect(() => {
        if (isCartLoaded) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, isCartLoaded]);

    useEffect(() => {
        if (isCartOpen) {
            // Disable scrolling when the cart overlay is open
            document.body.classList.add('cart-open');
        } else {
            // Enable scrolling again when the cart overlay is closed
            document.body.classList.remove('cart-open');
        }

        // Cleanup when component unmounts or when the state changes
        return () => {
            document.body.classList.remove('cart-open');
        };
    }, [isCartOpen]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const cartCount = cart.length;

    return (
        <div className="App">
            <Navbar isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            cart={cart}
            setCart={setCart}
            cartCount={cartCount}
            />
            <Hero />
            <Portfolio />
            <About />
            <Shop addToCart={addToCart}/>
            <Footer />
        </div>
    );
}

export default App;
