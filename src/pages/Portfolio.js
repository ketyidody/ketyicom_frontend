import React, {useEffect} from 'react';
import axios from "axios";
import Authenticate from "../Authenticate";

class Portfolio extends React.Component {
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
            authenticated: false,
        };
    }

    componentDidMount() {
        this.authenticate();
        this.fetchData();
    }

    authenticate() {
        const auth = new Authenticate();
        auth.authenticate().then(() => {
            this.authenticated = true;
        }).catch(error => {
            console.error("Authentication failed:", error);
            this.authenticated = false;
        });
    }


    async fetchData() {
        let token = sessionStorage.getItem('token');

        if (token) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/folders`, {
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
                    image: item.folderThumbnailPath
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
            <section data-name="portfolio" id="portfolio" className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 data-name="portfolio-title"
                        className="text-3xl font-bold text-white mb-12 text-center">Portfolio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {this.state.folders.map((item) => (
                            <div data-name={`portfolio-item-${item.id}`} key={item.id}
                                 className="portfolio-item relative overflow-hidden rounded-lg">
                                <img src={item.image} alt={item.name} className="w-full h-64 object-cover"/>
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-300">{item.slug}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

export default Portfolio;
