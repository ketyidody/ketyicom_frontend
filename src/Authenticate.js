import React from "react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

class Authenticate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.authenticate();
    }

     authenticate() {
        return new Promise((resolve, reject) => {
            let storedToken = sessionStorage.getItem('token');
            if (!storedToken || jwtDecode(storedToken).exp < Date.now() / 1000) {
                const credentials = { username: process.env.REACT_APP_BACKEND_USER, password: process.env.REACT_APP_BACKEND_PASSWORD };
                axios.post(`${process.env.REACT_APP_BACKEND_URL}api/login_check`, credentials).then((response) => {
                    let token = response.data['token'];
                    sessionStorage.setItem('token', token);
                    resolve();
                }).catch((error) => {
                    console.error('Authentication failed:', error);
                    reject('Authentication failed:', error);
                });
            } else {
                resolve();
            }
        });
    }
}

export default Authenticate;