import axios from 'axios';

export const chatContactApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});