import React from "react";
import axios from 'axios';

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
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        let token = sessionStorage.getItem('token');

        if (token) {
            try {
                const response = await axios.get(`${PREFIX_URL}api/folders`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                let items = response.data.items;
                let folders = items.map(item => ({
                    id: item.id,
                    slug: item.slug,
                    name: item.name,
                }));
                this.setState({ folders: folders });
            } catch (error) {
                console.error('Error fetching data:', error);
                this.setState({ error });
            }
        }
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