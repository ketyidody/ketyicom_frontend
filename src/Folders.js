import React from "react";

const PREFIX_URL =
    "http://127.0.0.1:8000/";

class Folders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folders: [],
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
        await fetch(`${PREFIX_URL}api/folders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let items = result.items;
                    let folders = [];

                    {Object.values(items).map(item => (
                        folders.push({
                            id: item.id,
                            slug: item.slug,
                            name: item.name,
                        })
                    ))}

                    this.setState({folders: folders});
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        return (
            <ul>
                {this.state.folders.map((folder) =>
                    folder.slug === this.props.gallery ?
                    (
                        <li key={folder.slug} className={'gallery-link active'}
                            onClick={() => this.props.changeGallery(folder.slug)}>
                            {folder.name}
                        </li>
                    )
                    :
                    (
                        <li key={folder.slug} className={'gallery-link'}
                            onClick={() => this.props.changeGallery(folder.slug)}>
                            {folder.name}
                        </li>
                    )
                )}
            </ul>
        );
    }
}

export default Folders;