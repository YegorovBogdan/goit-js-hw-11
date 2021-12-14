import './css/styles.css';
'use strict';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImagesAPIService from './js/API';
import LoadMoreBtn from './js/btns'; 
import Markup from './js/img';

const general = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
};

const imagesAPIService = new ImagesAPIService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more' });
const renderMarkup = new Markup({ selector: general.gallery });

general.form.addEventListener('submit', onFormSubmit);
loadMoreBtn.button.addEventListener('click', onloadMoreBtnClick);

async function onFormSubmit(e) {
    e.preventDefault();
    renderMarkup.reset();
    imagesAPIService.query = e.currentTarget.searchQuery.value.trim();

    if (imagesAPIService.query === '') {
        loadMoreBtn.hideBtn();
        Notify.info('Your query is empty. Try again!');
        return
    }

    imagesAPIService.resetPage();

    try {
        loadMoreBtn.showBtn();
        await initFetchImages();
    } catch (error) {
        loadMoreBtn.hideBtn();
        Notify.failure(error.message);
    }
    general.form.reset();
}

async function onloadMoreBtnClick() {
    try {
        await initFetchImages();
    } catch {
        Notify.failure(error.message);
    }
    pageScroll();
    renderMarkup.lightbox.refresh();
}

async function initFetchImages() {
    try {
        loadMoreBtn.disabled();
        const images = await imagesAPIService.fetchImages();
        renderMarkup.items = images;
        renderMarkup.render();
    } catch {
        Notify.failure(error.message);
    }

    if (imagesAPIService.endOfHits) {
        loadMoreBtn.hideBtn();
        return;
    }
    loadMoreBtn.enable();
}

function pageScroll() {
    const { height: formHeight } = general.form.getBoundingClientRect();
    const { height: cardHeight } = general.gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2 - formHeight * 2,
        behavior: 'smooth'
    });
}