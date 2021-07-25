const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const closeModal = document.querySelector('[data-action="close-lightbox"]');
const overlayEl = document.querySelector('.lightbox__overlay');
const imageOnBackdrop = document.querySelector('.lightbox__image');
const imagesStringHTML = galleryItems
  .map(({ preview, original, description }, index) => {
    return `<li class="gallery-item">
            <a class="gallery__link">
              <img class="gallery__image"
                   src="${preview}"
                   data-source="${original}"
                   data-index = "${index}"
                   alt="${description}"
                   tabindex="${index + 1}">
                   
            </a>
          </li>`;
  })
  .join(``);

gallery.insertAdjacentHTML('beforeend', imagesStringHTML);

gallery.addEventListener('click', opensModal);
closeModal.addEventListener('click', closesModal);
overlayEl.addEventListener('click', closesModal);

window.addEventListener('keydown', closesModalByEscape);
window.addEventListener('keydown', openModalByEscape);
window.addEventListener('keydown', prevImage);
window.addEventListener('keydown', nextImage);

let currentIndex = '';

function opensModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  modal.classList.toggle('is-open');

  insertImage(e);
  getCurrentIndex(imageOnBackdrop.dataset.index);
}

function closesModal() {
  modal.classList.toggle('is-open');
  clearImageUrl();
}

function openModalByEscape(e) {
  if (e.key !== 'Enter') {
    return;
  }
  modal.classList.add('is-open');

  insertImage(e);
  getCurrentIndex(imageOnBackdrop.dataset.index);
}

function closesModalByEscape(e) {
  if (e.key !== 'Escape') {
    return;
  }
  modal.classList.remove('is-open');
  clearImageUrl();
}

function insertImage(e) {
  imageOnBackdrop.src = e.target.dataset.source;
  imageOnBackdrop.alt = e.target.alt;
  imageOnBackdrop.dataset.index = e.target.dataset.index;
}

function clearImageUrl() {
  imageOnBackdrop.src = '';
}

function getCurrentIndex(index) {
  return (currentIndex = index);
}

function prevImage(e) {
  if (modal.classList.contains('is-open') && e.key === 'ArrowLeft') {
    if (!galleryItems[currentIndex - 1]) {
      return;
    }
    imageOnBackdrop.src = galleryItems[currentIndex - 1].original;
    currentIndex -= 1;
  }
}

function nextImage(e) {
  if (modal.classList.contains('is-open') && e.key === 'ArrowRight') {
    if (!galleryItems[Number(currentIndex) + 1]) {
      return;
    }
    imageOnBackdrop.src = galleryItems[Number(currentIndex) + 1].original;
    currentIndex = Number(currentIndex) + 1;
  }
}
