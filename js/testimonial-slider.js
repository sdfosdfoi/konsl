// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;
  
  const slides = track.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  
  let currentIndex = 0;
  const slideWidth = 100; // 100%
  
  // Set initial position
  updateSlider();
  
  // Event listeners for buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
      updateSlider();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      updateSlider();
    });
  }
  
  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
  });
  
  // Auto-slide every 5 seconds
  let interval = setInterval(() => {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateSlider();
  }, 5000);
  
  // Pause auto-slide on hover
  track.addEventListener('mouseenter', () => {
    clearInterval(interval);
  });
  
  track.addEventListener('mouseleave', () => {
    clearInterval(interval);
    interval = setInterval(() => {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      updateSlider();
    }, 5000);
  });
  
  // Update slider position and active dot
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;
    
    if (touchStartX - touchEndX > minSwipeDistance) {
      // Swipe left, show next slide
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    } else if (touchEndX - touchStartX > minSwipeDistance) {
      // Swipe right, show previous slide
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    }
    
    updateSlider();
  }
});