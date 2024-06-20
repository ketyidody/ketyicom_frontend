import './App.css';
import Gallery from "./Gallery";
import Folders from "./Folders";
import StickyElement from "./StickyElement";
import {useEffect, useState} from "react";
import Authenticate from "./Authenticate";

function App() {
    let auth = new Authenticate();
    
    const [currentGallery, setCurrentGallery] = useState('main');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                <nav
                    className="App-nav"
                >
                    <ul>
                        <li>
                            <a href="/">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/galleries">
                                Galleries
                            </a>
                        </li>
                        <li>
                            <a href="/about">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/contact">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
                <StickyElement/>
            </header>
            <main>
                <div className="App-content">
                    <div className="App-content-main">
                        <div className="App-content-main-left">
                            <h2>
                                Welcome to Ketyi.com
                            </h2>
                            <div>
                                {isAuthenticated ? <Folders gallery={currentGallery} changeGallery={changeGallery}/> : <p>Authenticating...</p>}
                            </div>
                        </div>
                        <div className="App-content-main-right">
                        {isAuthenticated ? <Gallery gallery={currentGallery} /> : <p>Authenticating...</p>}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
