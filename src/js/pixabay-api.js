import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42435331-5518aafb74583ec5494003d9b';
const PER_PAGE = 15;

export class PixabayAPI {
    constructor() {
        this.query = null;
    }
    async getImages() {
        const params = {
            key: API_KEY,
            q: this.query,
            page: 1, 
            per_page: PER_PAGE,
        };
        const url = `${BASE_URL}?${new URLSearchParams(params)}`;
        return axios.get(url).then(res => res.data);
    }
    
    async getMoreImages(page) {
        const params = {
            key: API_KEY,
            q: this.query,
            page: page, 
            per_page: PER_PAGE,
        };
        const url = `${BASE_URL}?${new URLSearchParams(params)}`;
        return axios.get(url).then(res => res.data);
    }
}