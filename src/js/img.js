import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class Markup {
    constructor({ selector }) {
        this.items = null;
        this.selector = selector;
        this.lightbox = null;
    }

    render() {
        const gallery = this.items
            .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
                `<a class="gallery-link" href="${largeImageURL}">
            <div class="photo-card">
            <img class="photo-image"src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes</b>: ${likes}
                </p>
                <p class="info-item">
                <b>Views</b>: ${views}
                </p>
                <p class="info-item">
                <b>Comments</b>: ${comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>: ${downloads}
                </p>
            </div>
            </div>
            </a>`
        ).join('');
        this.selector.insertAdjacentHTML('beforeend', gallery);
        this.initModal('.gallery a');
    }
    initModal(selector) {
        this.lightbox = new SimpleLightbox(selector);
    }
    reset() {
        this.selector.innerHTML = '';
    }
}