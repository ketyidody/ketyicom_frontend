import './App.css';
import Gallery from "./Gallery";
import Folders from "./Folders";
import React, {useEffect, useState, useRef} from "react";
import Authenticate from "./Authenticate";
import { ParallaxProvider, ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

function App() {
    let auth = new Authenticate();

    const [currentGallery, setCurrentGallery] = useState('climbing');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const gallery = useRef(null)
    const about = useRef(null)
    const contact = useRef(null)

    useEffect(() => {
        const auth = new Authenticate();
        auth.authenticate().then(() => {
            setIsAuthenticated(true);
        }).catch(error => {
            console.error("Authentication failed:", error);
            setIsAuthenticated(false);
        });
    }, []);

    const changeGallery = (gallerySlug) => {
        setCurrentGallery(gallerySlug);
    }

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
                    </ul>
                </nav>
                <div id="sticky-element" className="sticky-element">
                    <a
                        className="App-link"
                        href="https://ketyi.com"
                        target="_blank"
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
                    <div className="App-content-main">
                        <div className="App-content-main-left">
                            <h2>
                                Welcome to Ketyi.com
                            </h2>
                            <div>
                                {isAuthenticated ? <Folders gallery={currentGallery} changeGallery={changeGallery}/> :
                                    <p>Authenticating...</p>}
                            </div>
                        </div>
                        <div className="App-content-main-right">
                            {isAuthenticated ? <Gallery gallery={currentGallery}/> : <p>Authenticating...</p>}
                        </div>
                    </div>
                </div>
                <ParallaxProvider>
                    <ParallaxBanner className={"parallax-container"} style={{ aspectRatio: '10 / 1' }}>
                        <ParallaxBannerLayer image={"waterfall.jpg"} speed={-20} />
                        <ParallaxBannerLayer>
                        <div className="absolute inset-0 flex items-center justify-center parallax-header">
                            <h2 className="text-8xl text-white font-thin">About Me</h2>
                        </div>
                    </ParallaxBannerLayer>
                </ParallaxBanner>
                </ParallaxProvider>
                <div className="App-content about" ref={about}>
                    <div className="App-content-about">
                        <div className="about-container">
                            <div className="profile-image-container">
                                <figure className="alignleft size-large is-resized">
                                    <img decoding="async" src={"dody.jpg"} alt="" className="profile-image" width="256"
                                         height="256"/>
                                </figure>
                            </div>
                            <div className="about-text-container">
                                <h4>Hi there!</h4>
                                <p>
                                    I’m a Slovak photographer living in the capital little-big city of this beautiful
                                    country.
                                </p>
                                <p>
                                    I’ve been photographing many things in my life so far, later I specialized to event
                                    photography: backstage, concerts and sports.
                                </p>
                                <p>
                                    In my free time I do a lot of hiking and landscape photography. My main subject is
                                    coffee in the nature so together with my gear I carry my “kotyogó” with me all the
                                    time.
                                </p>
                            </div>
                        </div>
                    </div>
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
                    <div className="App-content-contact">
                    <article className="contact-container">
                            <div className="contact-text-container">
                                <p className="has-small-font-size">
                                    <a href="mailto:jozef@ketyi.com">
                                        <img className={"social_logo"} src={"Gmail_Logo_256px.png"} alt={"email"}/>
                                    </a>
                                </p>


                                <p className="has-small-font-size">
                                    <a target={"_blank"} href="https://www.facebook.com/jozef.ketyi">
                                        <img className={"social_logo"} src={"Facebook_Logo_Primary.png"} alt={"facebook"}/>
                                    </a>
                                </p>


                                <p className="has-small-font-size">
                                    <a target={"_blank"} href="https://www.instagram.com/ketyidody/">
                                        <img className={"social_logo"} src={"Instagram_Glyph_Gradient.png"} alt={"instagram"}/>
                                    </a>
                                </p>


                                <p className="has-small-font-size">
                                    <a target={"_blank"} href="https://500px.com/ketyidody">
                                        <img className={"social_logo"} src={"500px-logo.png"} alt={"500px"} />
                                    </a>
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </main>
            <footer className="App-footer">
                created by ketyi.com s.r.o
            </footer>
        </div>
    );
}

export default App;
