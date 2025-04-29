const sliderContainer = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.arrow-left');
const nextButton = document.querySelector('.arrow-right');
const sliderDots = document.querySelector('.slider-dots');
const slideWidth = sliderContainer.offsetWidth;
let slideIndex = 0;
let startX = 0;
let isDragging = false;

function updateSlider() {
    slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    updateDots();
}

function nextSlide() {
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    updateSlider();
}

function prevSlide() {
    slideIndex--;
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    updateSlider();
}

// Функция для создания точек-индикаторов
function createDots() {
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            slideIndex = i;
            updateSlider();
        });
        sliderDots.appendChild(dot);
    }
    updateDots();
}

// Функция для обновления активной точки
function updateDots() {
    const dots = document.querySelectorAll('.slider-dots .dot');
    dots.forEach((dot, index) => {
        if (index === slideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}


// --- Touch events (для мобильных устройств) ---
sliderContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX - slider.offsetLeft;
    slider.style.transition = 'none'; // Отключаем анимацию во время перетаскивания
});

sliderContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX - slider.offsetLeft;
    const walk = (x - startX) * 1; // Чувствительность перетаскивания (можно настроить)
    slider.style.transform = `translateX(-${slideIndex * slideWidth + walk}px)`;
});

sliderContainer.addEventListener('touchend', (e) => {
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease-in-out'; // Возвращаем анимацию

    // Определяем, нужно ли переключить слайд
    const movedDistance = (e.changedTouches[0].clientX - slider.offsetLeft) - startX;
    const swipeThreshold = 0.1; // Например, 10% ширины слайда
    if (movedDistance > slideWidth * swipeThreshold) {
        prevSlide();
    } else if (movedDistance < -slideWidth * swipeThreshold) {
        nextSlide();
    } else {
        updateSlider(); // Возвращаем слайд на место, если перетащили недостаточно
    }

});

sliderContainer.addEventListener('touchcancel', () => {
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease-in-out';
    updateSlider();
});

// --- Mouse events (для десктопа, можно убрать, если нужен только тач) ---
sliderContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - slider.offsetLeft;
    slider.style.transition = 'none';
    sliderContainer.style.cursor = 'grabbing';
});

sliderContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.clientX - slider.offsetLeft;
    const walk = (x - startX) * 1;
    slider.style.transform = `translateX(-${slideIndex * slideWidth + walk}px)`;
});

sliderContainer.addEventListener('mouseup', (e) => {
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease-in-out';
    sliderContainer.style.cursor = 'grab';

    const movedDistance = (e.clientX - slider.offsetLeft) - startX;
    const swipeThreshold = 0.1; // Например, 10% ширины слайда
    if (movedDistance > slideWidth * swipeThreshold) {
        prevSlide();
    } else if (movedDistance < -slideWidth * swipeThreshold) {
        nextSlide();
    } else {
        updateSlider();
    }
});

sliderContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease-in-out';
    sliderContainer.style.cursor = 'grab';
    updateSlider();
});

// --- Arrow events ---
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Создаем точки при загрузке страницы
createDots();