document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // פונקציונליות 1: גלילה חלקה
    // =========================================================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =========================================================================
    // פונקציונליות 2: לייטבוקס (הגדלת תמונות)
    // =========================================================================
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
        const closeBtn = lightbox.querySelector('.close-btn');
        const prevBtn = lightbox.querySelector('.prev-btn');
        const nextBtn = lightbox.querySelector('.next-btn');

        let currentImageIndex = 0;
        const allImages = Array.from(galleryItems);

        function showImage(index) {
            const imgLink = allImages[index];
            if (imgLink) {
                lightboxImg.src = imgLink.href;
                lightboxImg.alt = imgLink.querySelector('img').alt;
                currentImageIndex = index;
            }
        }

        function openLightbox(index) {
            showImage(index);
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
        }

        function showNextImage() {
            const nextIndex = (currentImageIndex + 1) % allImages.length;
            showImage(nextIndex);
        }

        function showPrevImage() {
            const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
            showImage(prevIndex);
        }

        allImages.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault(); // מונע פתיחה של התמונה בקישור נפרד
                openLightbox(index);
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (nextBtn) nextBtn.addEventListener('click', showNextImage);
        if (prevBtn) prevBtn.addEventListener('click', showPrevImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('show')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') showNextImage();
                if (e.key === 'ArrowRight') showPrevImage();
            }
        });
    }

    // =========================================================================
    // פונקציונליות 3: "טען עוד" לגלריה
    // =========================================================================
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
        const itemsPerLoad = 4; // כמה תמונות להציג בכל לחיצה
        let currentlyVisible = 0;

        function showItems() {
            const newLimit = currentlyVisible + itemsPerLoad;
            galleryItems.forEach((item, index) => {
                if (index < newLimit) {
                    item.classList.add('visible');
                }
            });
            currentlyVisible = newLimit;

            // הסתרת הכפתור אם כל התמונות הוצגו
            if (currentlyVisible >= galleryItems.length) {
                loadMoreBtn.style.display = 'none';
            }
        }

        // הצגת הפריטים הראשונים
        showItems();

        // האזנה לכפתור "טען עוד"
        loadMoreBtn.addEventListener('click', showItems);
    }
});