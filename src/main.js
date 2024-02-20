import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { PixabayAPI } from "./js/pixabay-api";
import { renderImages, renderMoreImages, showErrorMatch } from "./js/render-functions";

const refs = {
    formEl: document.querySelector('.js-search-form'),
    imgEl: document.querySelector('.js-image-container'),
    loader: document.querySelector('.loader'),
    btnLoadMore: document.querySelector('.loadmore-btn'),
};

let currentPage = 1;
let currentQuery = ''; 

function showLoader() {
    refs.loader.classList.remove('hidden');
}

function hideLoader() {
    refs.loader.classList.add('hidden');
}

refs.formEl.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMoreClick);

const pixabayAPI = new PixabayAPI();

async function onFormSubmit(e) {
    e.preventDefault();
    showLoader();

    const query = e.target.elements.text.value.trim(); // Використовуємо trim(), щоб видалити зайві пробіли
    currentQuery = query; 
    currentPage = 1; 
    
    if (!query) {
        hideLoader();
        iziToast.warning({
            position: "topRight",
            message: 'Please enter a search query.',
        });
        refs.btnLoadMore.style.display = 'none';
        return;
    }

    try {
        const data = await pixabayAPI.getImages(query); 
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
        const data = await pixabayAPI.getMoreImages(currentQuery, currentPage); 
    
        renderMoreImages(data, refs.imgEl);
        currentPage++; 
        
        if (data.hits.length < 15) {
            refs.btnLoadMore.style.display = 'none';
            iziToast.show({
                title: '',
                message: "We're sorry, but you've reached the end of search results.",
                color: 'red',
                position: 'topRight'
            });
        }
    } catch (error) {
        refs.btnLoadMore.style.display = 'block';
    }
}
