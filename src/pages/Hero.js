import React from 'react';

function Hero() {
    return (
        <section data-name="hero" id="home" className="hero-section h-screen flex items-center justify-center text-white">
            <div className="text-center">
                <h1 data-name="hero-title" className="text-4xl md:text-6xl font-bold mb-4">Capturing Life's Epic Moments</h1>
                <p data-name="hero-subtitle" className="text-xl md:text-2xl mb-8">Sports & Landscape Photography</p>
                <a data-name="hero-cta" href="#portfolio" className="bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-200 transition duration-300">
                    View Portfolio
                </a>
            </div>
        </section>
    );
}

export default Hero;
