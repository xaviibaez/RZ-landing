/**
 * Módulo del carrusel de imágenes y vídeos (galería y productos)
 */

function initCarousel() {
    const carouselModal = document.getElementById('carousel-modal');
    const carouselImageContainer = document.querySelector('.carousel-image-container');
    const carouselImage = document.querySelector('.carousel-image');
    const carouselCounter = document.querySelector('.carousel-counter');
    const carouselClose = document.querySelector('.carousel-close');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const instagramLink = document.getElementById('instagramLink');

    if (!carouselModal || !carouselImage || !carouselClose || !carouselPrev || !carouselNext) return;

    let currentCarouselIndex = 0;
    let currentCarouselItems = [];
    let carouselVideo = null;

    function updateCarouselImage() {
        const currentItem = currentCarouselItems[currentCarouselIndex];
        if (!currentItem) return;

        const isVideo = currentItem.type === 'video';

        carouselImage.style.opacity = '0';
        carouselImage.style.transform = 'scale(0.95)';
        if (carouselVideo) {
            carouselVideo.style.opacity = '0';
            carouselVideo.style.transform = 'scale(0.95)';
        }

        setTimeout(() => {
            if (isVideo) {
                if (!carouselVideo) {
                    carouselVideo = document.createElement('video');
                    carouselVideo.classList.add('carousel-video');
                    carouselVideo.autoplay = true;
                    carouselVideo.muted = true;
                    carouselVideo.loop = true;
                    carouselVideo.controls = false;
                    carouselVideo.playsInline = true;
                    carouselImageContainer.insertBefore(carouselVideo, carouselCounter);
                }

                carouselVideo.src = currentItem.src;
                carouselVideo.style.display = 'block';
                carouselImage.style.display = 'none';

                if (instagramLink && currentItem.instagramUrl) {
                    instagramLink.href = currentItem.instagramUrl;
                    instagramLink.style.display = 'inline-block';
                }
            } else {
                if (carouselVideo) {
                    carouselVideo.pause();
                    carouselVideo.style.display = 'none';
                }

                carouselImage.src = currentItem.src;
                carouselImage.alt = currentItem.alt || '';
                carouselImage.style.display = 'block';

                if (instagramLink) {
                    instagramLink.style.display = 'none';
                    instagramLink.removeAttribute('href');
                }
            }

            if (carouselCounter) {
                carouselCounter.textContent = `${currentCarouselIndex + 1} / ${currentCarouselItems.length}`;
            }

            setTimeout(() => {
                if (isVideo && carouselVideo) {
                    carouselVideo.style.opacity = '1';
                    carouselVideo.style.transform = 'scale(1)';
                } else {
                    carouselImage.style.opacity = '1';
                    carouselImage.style.transform = 'scale(1)';
                }
            }, 50);
        }, 200);

        carouselPrev.disabled = currentCarouselIndex === 0;
        carouselNext.disabled = currentCarouselIndex === currentCarouselItems.length - 1;
    }

    function openCarousel(items, startIndex) {
        currentCarouselItems = items || [];
        currentCarouselIndex = startIndex;
        updateCarouselImage();
        carouselModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeCarousel() {
        carouselModal.classList.remove('show');
        document.body.style.overflow = '';

        if (carouselVideo) {
            carouselVideo.pause();
        }
        if (instagramLink) {
            instagramLink.style.display = 'none';
            instagramLink.removeAttribute('href');
        }
    }

    carouselClose.addEventListener('click', closeCarousel);

    carouselModal.addEventListener('click', (e) => {
        if (e.target === carouselModal) {
            closeCarousel();
        }
    });

    carouselPrev.addEventListener('click', () => {
        if (currentCarouselIndex > 0) {
            currentCarouselIndex--;
            updateCarouselImage();
        }
    });

    carouselNext.addEventListener('click', () => {
        if (currentCarouselIndex < currentCarouselItems.length - 1) {
            currentCarouselIndex++;
            updateCarouselImage();
        }
    });

    document.querySelectorAll('#gallery .gallery-item').forEach((item) => {
        item.addEventListener('click', () => {
            const galleryType = item.getAttribute('data-gallery');
            const parentSection = item.closest('section');
            const sectionItems = Array.from(parentSection.querySelectorAll(`.gallery-item[data-gallery="${galleryType}"]`));
            const itemIndex = sectionItems.indexOf(item);
            const items = galleryImages[galleryType] || [];
            openCarousel(items, itemIndex);
        });
    });

    document.querySelectorAll('#products .gallery-item').forEach((item) => {
        item.addEventListener('click', () => {
            const productId = item.getAttribute('product-id');
            const parentSection = item.closest('section');
            const sectionItems = Array.from(parentSection.querySelectorAll(`.gallery-item[product-id="${productId}"]`));
            const itemIndex = sectionItems.indexOf(item);
            const items = productVideos[productId] || [];
            openCarousel(items, itemIndex);
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    carouselModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    carouselModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentCarouselIndex < currentCarouselItems.length - 1) {
                carouselNext.click();
            } else if (diff < 0 && currentCarouselIndex > 0) {
                carouselPrev.click();
            }
        }
    }, false);
}
