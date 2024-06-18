import React, {useState, useEffect} from 'react';

function StickyElement() {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY; // Get current scroll position
            const element = document.getElementById('sticky-element'); // Reference your element
            const elementTop = element.getBoundingClientRect().bottom + 30; // Get element's top offset

            setIsFixed(scrollTop > elementTop); // Update state based on scroll position
        };

        window.addEventListener('scroll', handleScroll); // Add scroll event listener

        return () => window.removeEventListener('scroll', handleScroll); // Cleanup
    }, []); // Empty dependency array ensures effect runs once

    return (
        <div id="sticky-element" className={`sticky-element ${isFixed ? 'fixed' : ''}`}>
            <a
                className="App-link"
                href="https://ketyi.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                Ketyi.com
            </a>
            <p>
                Nature and sports photography.
            </p>
        </div>
    );
}

export default StickyElement;