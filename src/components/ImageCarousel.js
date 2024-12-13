import React, { useRef } from 'react';
import {PhotoProvider, PhotoView} from "react-photo-view";

const ImageCarousel = ({ product }) => {
    const scrollContainerRef = useRef(null);

    // Function to handle scroll left (previous image)
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -560, behavior: 'smooth' });
        }
    };

    // Function to handle scroll right (next image)
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 560, behavior: 'smooth' });
        }
    };

    return (
        <div className={`carousel-container carousel-container-${product.id}`}>
            <button className="scroll-button left" onClick={scrollLeft}>❮</button>
            <PhotoProvider>
                <div className="product-image-container" ref={scrollContainerRef}>
                    {product.photos.map((photo, index) => (
                        <PhotoView src={photo.url} key={index}>
                            <img width="560" height="560" src={photo.path800} alt={photo.title}/>
                        </PhotoView>
                    ))}
                </div>
            </PhotoProvider>
            <button className="scroll-button right" onClick={scrollRight}>❯</button>
        </div>
    );
};

export default ImageCarousel;
