import React, {useEffect, useState} from 'react';
import Folders from "../Folders";
import Gallery from "../Gallery";
import Authenticate from "../Authenticate";

function Galleries() {
    const [currentGallery, setCurrentGallery] = useState('climbing');
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
        <div className="App-content-main">
            <div className="App-content-main-left">
                <h2>
                    My work
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
    );
}

export default Galleries;
