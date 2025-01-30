document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;
  const totalSlides = slides.length;
  const DESKTOP_WIDTH = 1200;
  const MOBILE_BREAKPOINT = 768;

  // Initialize first slide
  updateSlides();

  function getSlideWidth() {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      return window.innerWidth; // Use full viewport width on mobile
    }
    return DESKTOP_WIDTH;
  }

  function updateSlides() {
    const slideWidth = getSlideWidth();
    
    // Update container transform
    container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Update active states
    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlides();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlides();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlides();
  }

  // Event Listeners
  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);
  
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index));
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateSlides();
    }, 250);
  });

  // Add touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, false);

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50; // minimum distance for swipe
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  }
});

// Your existing smooth scroll code
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
