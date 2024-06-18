import './App.css';
import Gallery from "./Gallery";
import Folders from "./Folders";
import StickyElement from "./StickyElement";
import {useState} from "react";

function App() {
    const [currentGallery, setCurrentGallery] = useState('main')
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
                            <p>
                                <Folders gallery={currentGallery} changeGallery={changeGallery}/>
                            </p>
                        </div>
                        <div className="App-content-main-right">
                            <Gallery gallery={currentGallery}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
