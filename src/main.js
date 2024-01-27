import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41935591-0a413f499168cf3dc7607e044';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

// Оголошення змінних для контролю сторінки та кількості елементів на сторінці
let currentPage = 1;
const itemsPerPage = 20; // Можете змінити на бажане значення
let totalHits = 0; // Додаємо змінну для збереження загальної кількості зображень
let isLoading = false;

hideLoadMoreButton();

loadMoreButton.addEventListener('click', loadMoreImages);



async function loadMoreImages() {
  try {
    if (isLoading) {
      return;
    }

    isLoading = true;

    const data = await performSearch(
      searchInput.value.trim(),
      currentPage,
      itemsPerPage
    );

    if (data.hits.length > 0) {
      appendImagesToGallery(data.hits);
      //   displayImages(data.hits);
      currentPage += 1;
      checkEndOfCollection(); // Перевірка, чи досягнуто кінця колекції
      smoothScroll(); // Прокручування сторінки
    } else {
      hideLoadMoreButton();
      showEndMessage(); // Повідомлення про кінець колекції
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading = false;
  }
}

async function performSearch(query, page, perPage) {
  try {
    showLoader();
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: perPage,
    });

    const apiUrl = `${BASE_URL}?${searchParams.toString()}`;
    const response = await axios.get(apiUrl);
    totalHits = response.data.totalHits;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    hideLoader();
    checkEndOfCollection();
  }
}

function smoothScroll() {
  const cardHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const query = encodeURIComponent(searchInput.value.trim());

  if (query.trim() === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
    });
    return;
  }

  // Показуємо індикатор завантаження перед відправкою запиту
  showLoader();

  performSearch(query, 1, itemsPerPage)
    .then(data => {
      displayImages(data.hits);
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      hideLoader();
    });
});

function displayImages(images) {
  galleryList.innerHTML = '';

  if (images.length === 0) {
    iziToast.info({
      title: 'Info',
      message:
        'Sorry, there are no images matching your search query. Please try again.',
    });
    return;
  }
  const markup = createMarkup(images);
  galleryList.innerHTML += markup;

  lightbox.refresh();
  hideLoader();
  showLoadMoreButton();
}

function createMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
          width="360"
        />
      </a>
      <div class="thumb-block">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${likes}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${views}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${comments}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${downloads}</p>
        </div>
      </div>
    </li>`
    )
    .join('');
}

function showLoader() {
  if (loader) {
    loader.style.display = 'block';
  }
}

function hideLoader() {
  if (loader) {
    loader.style.display = 'none';
  }
}

function hideLoadMoreButton() {
  if (loadMoreButton) {
    loadMoreButton.style.display = 'none';
  }
}

function showLoadMoreButton() {
  if (loadMoreButton) {
    loadMoreButton.style.display = 'block';
  }
}

function showEndMessage() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

function checkEndOfCollection() {
  if (totalHits > 0 && currentPage > Math.ceil(totalHits / itemsPerPage)) {
    hideLoadMoreButton(); // Ховаємо кнопку "Load more"
    showEndMessage(); // Повідомлення про кінець колекції
  }
}

// Функція для відображення зображень у кінці списку
function appendImagesToGallery(images) {
  const markup = createMarkup(images)
  galleryList.innerHTML += markup;
}
