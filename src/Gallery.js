import React from "react";
import ImageGallery from "react-image-gallery";

const PREFIX_URL =
    "http://127.0.0.1:8000/";

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            showIndex: false,
            showBullets: true,
            infinite: true,
            showThumbnails: true,
            showFullscreenButton: true,
            showGalleryFullscreenButton: true,
            showPlayButton: true,
            showGalleryPlayButton: true,
            showNav: true,
            isRTL: false,
            slideDuration: 450,
            slideInterval: 2000,
            slideOnThumbnailOver: false,
            thumbnailPosition: "bottom",
            showVideo: false,
            useWindowKeyDown: true,
        };

        this.fetchData();
    }

    async fetchData() {
        if (this.props.gallery) {
            await fetch(`${PREFIX_URL}api/gallery/${this.props.gallery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        let items = result.items;
                        let images = [];

                        {Object.values(items).map(item => (
                            images.push({
                                original: `${PREFIX_URL}${item.path}`,
                                thumbnail: item.thumbnailPath,
                                originalClass: "featured-slide",
                                thumbnailClass: "featured-thumb",
                                description: item.name,
                            })
                        ))}

                        this.setState({images: images});
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        }
    }

    _onImageClick(event) {
        console.debug(
            "clicked on image",
            event.target,
            "at index",
            this._imageGallery.getCurrentIndex()
        );
    }

    _onImageLoad(event) {
        console.debug("loaded image", event.target.src);
    }

    _onSlide(index) {
        console.debug("slid to index", index);
    }

    _onPause(index) {
        console.debug("paused on index", index);
    }

    _onScreenChange(fullScreenElement) {
        console.debug("isFullScreen?", !!fullScreenElement);
    }

    _onPlay(index) {
        console.debug("playing from index", index);
    }

    _handleInputChange(state, event) {
        if (event.target.value > 0) {
            this.setState({ [state]: event.target.value });
        }
    }

    _handleCheckboxChange(state, event) {
        this.setState({ [state]: event.target.checked });
    }

    _handleThumbnailPositionChange(event) {
        this.setState({ thumbnailPosition: event.target.value });
    }

    _getStaticImages() {
        let images = [];
        for (let i = 2; i < 12; i++) {
            images.push({
                original: `${PREFIX_URL}${i}.jpg`,
                thumbnail: `${PREFIX_URL}${i}t.jpg`,
            });
        }

        return images;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.gallery !== this.props.gallery) {
            this.fetchData();
        }
    }

    render() {
        return (
            <section className="app">
                <ImageGallery
                    ref={(i) => (this._imageGallery = i)}
                    items={this.state.images}
                    onClick={this._onImageClick.bind(this)}
                    onImageLoad={this._onImageLoad}
                    onSlide={this._onSlide.bind(this)}
                    onPause={this._onPause.bind(this)}
                    onScreenChange={this._onScreenChange.bind(this)}
                    infinite={this.state.infinite}
                    showBullets={this.state.showBullets}
                    showFullscreenButton={
                        this.state.showFullscreenButton &&
                        this.state.showGalleryFullscreenButton
                    }
                    showPlayButton={
                        this.state.showPlayButton && this.state.showGalleryPlayButton
                    }
                    showThumbnails={this.state.showThumbnails}
                    showIndex={this.state.showIndex}
                    showNav={this.state.showNav}
                    isRTL={this.state.isRTL}
                    thumbnailPosition={this.state.thumbnailPosition}
                    slideDuration={parseInt(this.state.slideDuration)}
                    slideInterval={parseInt(this.state.slideInterval)}
                    slideOnThumbnailOver={this.state.slideOnThumbnailOver}
                    additionalClass="app-image-gallery"
                    useWindowKeyDown={this.state.useWindowKeyDown}
                />
            </section>
        );
    }
}

export default Gallery;