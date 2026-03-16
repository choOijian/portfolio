document.addEventListener("DOMContentLoaded", () => {
  // Setup reveal animations on scroll
  const revealElements = document.querySelectorAll(".reveal");

  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });
  
  // Staggered initial reveal for elements that are already in viewport
  setTimeout(() => {
    document.querySelectorAll(".reveal-immediate:not(.active)").forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("active");
      }, index * 150);
    });
  }, 100);

  // Global Image Fade-In (Placeholder effect)
  const images = document.querySelectorAll('img');
  images.forEach(img => initImageFadeIn(img));
});

// Helper function to handle fade-in logic for both static and dynamic images
window.initImageFadeIn = function(img) {
  if (!img) return;
  img.classList.add('img-lazy');
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
    img.addEventListener('error', () => img.classList.add('loaded')); // fail gracefully
  }
};
