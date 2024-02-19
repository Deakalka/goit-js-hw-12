import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { PixabayAPI } from "./js/pixabay-api";
import { renderImages, renderMoreImages, showErrorMatch, showErrorFind } from "./js/render-functions";

const refs = {
    formEl: document.querySelector('.js-search-form'),
    imgEl: document.querySelector('.js-image-container'),
    loader: document.querySelector('.loader'),
    btnLoadMore: document.querySelector('.loadmore-btn'),
};

function showLoader() {
    refs.loader.classList.remove('hidden');
}

function hideLoader() {
    refs.loader.classList.add('hidden');
}

refs.formEl.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMoreClick);

const pixabayAPI = new PixabayAPI();
let currentPage = 1; 

async function onFormSubmit(e) {
    e.preventDefault();
    showLoader();

    const query = e.target.elements.text.value; 
    pixabayAPI.query = query;
    currentPage = 1; 

    try {
        const data = await pixabayAPI.getImages();
        renderImages(data, refs.imgEl);
        if (data.hits.length === 0) {
            throw new Error('No images found');
        }
   
        refs.btnLoadMore.style.display = 'block';
    } catch (error) {
        showErrorMatch();
    } finally {
        hideLoader(); 
    }
}

async function onLoadMoreClick() {
    try {
        currentPage++; 
        const data = await pixabayAPI.getMoreImages(currentPage); 
         if (data.hits.length === 0) {   
            throw new Error();
        }
        
        renderMoreImages(data, refs.imgEl);         
    } catch (error) {
        showErrorFind();
    } 
}
async function onLoadMoreClick() {
    try {
        currentPage++; 
        const data = await pixabayAPI.getMoreImages(currentPage); 
        if (data.hits.length === 0) {   
            throw new Error();
        }
        
        renderMoreImages(data, refs.imgEl);         
        
        if (data.totalHits <= currentPage * PER_PAGE) {
            refs.btnLoadMore.style.display = 'none';
        }
    } catch (error) {
        showErrorFind();
    } 
}