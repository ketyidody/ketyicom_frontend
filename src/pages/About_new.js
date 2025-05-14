import React from 'react';

function About() {
    return (
        <section data-name="about" id="about" className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div data-name="about-image" className="rounded-lg overflow-hidden">
                        <img src={"dody.jpg"} alt="Photographer" className="w-full h-[500px] object-cover" />
                    </div>
                    <div data-name="about-content" className="text-white">
                        <h2 className="text-3xl font-bold mb-6">About Me</h2>
                        <p className="mb-6">
                            I’m a Slovak photographer living in the capital little-big city of this beautiful
                            country.
                        </p>
                        <p className="mb-6">
                            I’ve been photographing many things in my life so far, later I specialized to event
                            photography: backstage, concerts and sports.
                        </p>
                        <p className="mb-6">
                            In my free time I do a lot of hiking and landscape photography. My main subject is
                            coffee in the nature so together with my gear I carry my “kotyogó” with me all the
                            time.
                        </p>
                        <div className="flex space-x-6">
                            <a href="https://www.instagram.com/ketyidody/" target={"_blank"} className="text-gray-400 hover:text-white text-2xl">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.facebook.com/jozef.ketyi" target={"_blank"} className="text-gray-400 hover:text-white text-2xl">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://500px.com/ketyidody" target={"_blank"} className="text-gray-400 hover:text-white text-2xl">
                                <i className="fab fa-500px"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
