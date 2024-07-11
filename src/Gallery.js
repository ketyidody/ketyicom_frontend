import React from "react";
import ImageGallery from "react-image-gallery";
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: true,
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
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        this.setState({ loading: true });
        let token = sessionStorage.getItem('token');

        if (token) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/gallery/${this.props.gallery}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                let items = response.data.items;
                let images = items.map(item => ({
                    original: `${item.path}`,
                    thumbnail: `${item.thumbnailPath}`,
                    originalClass: "featured-slide",
                    thumbnailClass: "featured-thumb",
                    description: item.name,
                }));
                this.setState({ images: images, loading: false });
            } catch (error) {
                console.error('Error fetching data:', error);
                this.setState({
                    error,
                    loading: false,
                });
            }
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
        // console.debug("loaded image", event.target.src);
    }

    _onSlide(index) {
        // console.debug("slid to index", index);
    }

    _onPause(index) {
        // console.debug("paused on index", index);
    }

    _onScreenChange(fullScreenElement) {
        // console.debug("isFullScreen?", !!fullScreenElement);
    }

    _onPlay(index) {
        // console.debug("playing from index", index);
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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.gallery !== this.props.gallery) {
            this.fetchData();
        }
    }

    render() {
        if (this.state.images.length > 0) {
            return (
                <section className={"app fade-in " + (this.state.loading ? 'loading' : '')}>
                    <div className="loading-overlay">
                        <div className="lds-roller">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
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
                        lazyload={true}
                    />
                </section>
            );
        } else {
            return (
                <div>
                    <h3>No images found</h3>
                </div>
            );
        }
    }
}

export default Gallery;