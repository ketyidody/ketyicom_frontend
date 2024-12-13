import React from 'react';

function About() {
    return (
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
    );
}

export default About;
