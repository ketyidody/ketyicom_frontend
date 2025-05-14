import React from 'react';

function Footer() {
    return (
        <footer data-name="footer" className="bg-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div data-name="footer-contact">
                        <h3 className="text-xl font-bold mb-4">Contact</h3>
                        <p className="mb-2">Email: ketyi.dody@gmail.com</p>
                    </div>
                    <div data-name="footer-social">
                        <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/ketyidody/" target={"_blank"}
                               className="text-gray-400 hover:text-white">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.facebook.com/jozef.ketyi" target={"_blank"}
                               className="text-gray-400 hover:text-white">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://500px.com/ketyidody" target={"_blank"}
                               className="text-gray-400 hover:text-white">
                                <i className="fab fa-500px"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                    <p>&copy; 2025 ketyi.com. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
