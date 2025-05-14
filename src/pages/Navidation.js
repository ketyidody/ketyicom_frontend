import React from 'react';
import CartOverlay from "../pages/CartOverlay";
import {FaCartPlus} from "react-icons/fa";
import Badge from 'react-bootstrap/Badge';

function Navbar({
    isCartOpen,
    setIsCartOpen,
    cart,
    setCart,
    cartCount
}) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav data-name="navbar" className="bg-black bg-opacity-90 fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span data-name="logo" className="text-white text-xl font-bold">PHOTO</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a data-name="nav-home" href="#home"
                               className="text-gray-300 hover:text-white px-3 py-2">Home</a>
                            <a data-name="nav-portfolio" href="#portfolio"
                               className="text-gray-300 hover:text-white px-3 py-2">Portfolio</a>
                            <a data-name="nav-about" href="#about"
                               className="text-gray-300 hover:text-white px-3 py-2">About</a>
                            <a data-name="nav-shop" href="#shop"
                               className="text-gray-300 hover:text-white px-3 py-2">Shop</a>
                            <FaCartPlus className="cart-icon" onClick={() => setIsCartOpen(true)}/>
                            <Badge className="cart-count" bg="danger" pill="true">{cartCount}</Badge>

                            {isCartOpen && (
                                <CartOverlay
                                    cart={cart}
                                    clearCart={() => setCart([])}
                                    closeCart={() => setIsCartOpen(false)}
                                    setCart={setCart}
                                />
                            )}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button data-name="mobile-menu-button" onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-300 hover:text-white">
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div data-name="mobile-menu" className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a data-name="mobile-nav-home" href="#home"
                           className="text-gray-300 hover:text-white block px-3 py-2">Home</a>
                        <a data-name="mobile-nav-portfolio" href="#portfolio"
                           className="text-gray-300 hover:text-white block px-3 py-2">Portfolio</a>
                        <a data-name="mobile-nav-about" href="#about"
                           className="text-gray-300 hover:text-white block px-3 py-2">About</a>
                        <a data-name="mobile-nav-shop" href="#shop"
                           className="text-gray-300 hover:text-white block px-3 py-2">Shop</a>
                        <a className="text-gray-300 hover:text-white block px-3 py-2" onClick={() => setIsCartOpen(true)}>
                            Cart
                            <Badge className="cart-count-mobile" bg="danger" pill="true">{cartCount}</Badge>
                        </a>

                        {isCartOpen && (
                            <CartOverlay
                                cart={cart}
                                clearCart={() => setCart([])}
                                closeCart={() => setIsCartOpen(false)}
                                setCart={setCart}
                            />
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
