import React from 'react';

function Contact() {
    return (
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
                            <img className={"social_logo"} src={"Facebook_Logo_Primary.png"}
                                 alt={"facebook"}/>
                        </a>
                    </p>


                    <p className="has-small-font-size">
                        <a target={"_blank"} href="https://www.instagram.com/ketyidody/">
                            <img className={"social_logo"} src={"Instagram_Glyph_Gradient.png"}
                                 alt={"instagram"}/>
                        </a>
                    </p>


                    <p className="has-small-font-size">
                        <a target={"_blank"} href="https://500px.com/ketyidody">
                            <img className={"social_logo"} src={"500px-logo.png"} alt={"500px"}/>
                        </a>
                    </p>
                </div>
            </article>
        </div>);
}

export default Contact;
