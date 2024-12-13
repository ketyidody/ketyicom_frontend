import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useRef, useState, useEffect} from "react";
import Contact from './pages/Contact';
import About from './pages/About';
import Galleries from './pages/Galleries';
import Shop from './pages/Shop';
import CartOverlay from "./pages/CartOverlay";
import {ParallaxBanner, ParallaxBannerLayer, ParallaxProvider} from "react-scroll-parallax";
import { FaCartPlus } from "react-icons/fa";
import Badge from 'react-bootstrap/Badge';

function App() {
    const gallery = useRef(null)
    const about = useRef(null)
    const contact = useRef(null)
    const shop = useRef(null)

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
            <header className="App-header">
                <div className="App-logo">
                    ketyi.com
                </div>
                <nav className="App-nav">
                    <ul>
                        <li>
                            <a onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                })
                            }>
                                Home
                            </a>
                        </li>
                        <li>
                            <a onClick={() =>
                                window.scrollTo({
                                    top: gallery.current.offsetTop,
                                    behavior: "smooth"
                                })
                            }>
                                Galleries
                            </a>
                        </li>
                        <li>
                            <a onClick={() =>
                                window.scrollTo({
                                    top: shop.current.offsetTop,
                                    behavior: "smooth"
                                })
                            }>
                                Shop
                            </a>
                        </li>
                        <li>
                            <a onClick={() =>
                                window.scrollTo({
                                    top: about.current.offsetTop,
                                    behavior: "smooth"
                                })
                            }>
                                About
                            </a>
                        </li>
                        <li>
                            <a onClick={() =>
                                window.scrollTo({
                                    top: contact.current.offsetTop,
                                    behavior: "smooth"
                                })
                            }>
                                Contact
                            </a>
                        </li>
                        <li>
                            <FaCartPlus className="cart-icon" onClick={() => setIsCartOpen(true)} />
                            <Badge className="cart-count" bg="danger" pill="true">{cartCount}</Badge>

                            {isCartOpen && (
                                <CartOverlay
                                    cart={cart}
                                    clearCart={() => setCart([])}
                                    closeCart={() => setIsCartOpen(false)}
                                    setCart={setCart}
                                />
                            )}
                        </li>
                    </ul>
                </nav>
                <div id="sticky-element" className="sticky-element">
                    <a
                        className="App-link"
                        href="https://ketyi.com"
                        rel="noopener noreferrer"
                    >
                        ketyi.com
                    </a>
                    <p>
                        Nature and sports photography.
                    </p>
                </div>
            </header>
            <main>
                <div className="App-content gallery" ref={gallery}>
                    <Galleries />
                </div>

                <ParallaxProvider>
                    <ParallaxBanner className={"parallax-container"} style={{aspectRatio: '10 / 1'}}>
                        <ParallaxBannerLayer image={"aerial.jpg"} speed={-20}/>
                        <ParallaxBannerLayer>
                            <div className="absolute inset-0 flex items-center justify-center parallax-header">
                                <h2 className="text-8xl text-white font-thin">Shop</h2>
                            </div>
                        </ParallaxBannerLayer>
                    </ParallaxBanner>
                </ParallaxProvider>

                <div className="App-content shop" ref={shop}>
                    <Shop addToCart={addToCart}/>
                </div>

                <ParallaxProvider>
                    <ParallaxBanner className={"parallax-container"} style={{aspectRatio: '10 / 1'}}>
                        <ParallaxBannerLayer image={"waterfall.jpg"} speed={-20}/>
                        <ParallaxBannerLayer>
                            <div className="absolute inset-0 flex items-center justify-center parallax-header">
                                <h2 className="text-8xl text-white font-thin">About Me</h2>
                            </div>
                        </ParallaxBannerLayer>
                    </ParallaxBanner>
                </ParallaxProvider>

                <div className="App-content about" ref={about}>
                    <About />
                </div>

                <ParallaxProvider>
                    <ParallaxBanner className={"parallax-container"} style={{aspectRatio: '10 / 1'}}>
                        <ParallaxBannerLayer image={"mountain.jpg"} speed={-20}/>
                        <ParallaxBannerLayer>
                            <div className="absolute inset-0 flex items-center justify-center parallax-header">
                                <h2 className="text-8xl text-white font-thin">Contact</h2>
                            </div>
                        </ParallaxBannerLayer>
                    </ParallaxBanner>
                </ParallaxProvider>

                <div className="App-content contact" ref={contact}>
                    <Contact />
                </div>
            </main>
            <footer className="App-footer">
                created by ketyi.com s.r.o
            </footer>
        </div>
    );
}

export default App;
