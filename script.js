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

  // Initialize first slide
  updateSlides();

  function getSlideWidth() {
      // On mobile (<=768px), use viewport width minus padding
      if (window.innerWidth <= 768) {
          // Account for the padding in carousel-content-wrapper (40px * 2)
          return window.innerWidth - 80;
      }
      // On desktop, use fixed width of 1200px
      return 1200;
  }

  function updateSlides() {
      const slideWidth = getSlideWidth();
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
  window.addEventListener('resize', updateSlides);

  // Optional: Auto-advance slides every 5 seconds
  const autoAdvance = setInterval(nextSlide, 5000);
  // Pause auto-advance when user interacts with carousel
  container.addEventListener('mouseenter', () => clearInterval(autoAdvance));
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
