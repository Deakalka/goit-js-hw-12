import iziToast from "izitoast";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const options = {
    captionsData: 'alt',
    captionDelay: 250,
};

let lightBox = new SimpleLightbox('.gallery-link', options);

export function renderImages(data, imgEl) {
    const imagesMarkup = data.hits.map(img => imgTemplate(img)).join('');
    imgEl.innerHTML = imagesMarkup;
    lightBox.refresh();
}

export function renderMoreImages(data, imgEl) {
    const imagesMarkup = data.hits.map(img => imgTemplate(img)).join('');
    imgEl.insertAdjacentHTML('beforeend', imagesMarkup);
    lightBox.refresh();
}

export function showErrorMatch() {
    iziToast.error({
        position: "topRight",
        message: 'Sorry, there are no images matching your search query. Please try again!',
    });
}

function imgTemplate(photo) {
    return `
        <div class="photo-container">
            <a class="gallery-link" href="${photo.largeImageURL}" data-lightbox="image">
                <img src="${photo.webformatURL}" alt="${photo.tags}" class="photo" />
            </a>
            <div class="photo-body">
                <p class="photo-name"> <span>Likes</span> <span>${photo.likes}</span> </p>
                <p class="photo-name"> <span>Views</span> <span>${photo.views}</span> </p>
                <p class="photo-name"> <span>Comments</span> <span>${photo.comments}</span> </p>
                <p class="photo-name"> <span>Downloads</span> <span>${photo.downloads}</span> </p>
            </div>
        </div>
    `;
}