// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      // Simple toggle animation for mobile menu
      if (!mobileMenu.classList.contains('hidden')) {
        gsap.fromTo(mobileMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
      }
    });
  }

  // 2. Global GSAP Reveal Animations
  // Elements with .gsap-reveal-up will slide up and fade in
  const revealUpElements = document.querySelectorAll('.gsap-reveal-up');
  revealUpElements.forEach(el => {
    gsap.fromTo(el, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // Animation starts when the top of the element hits 85% of the viewport height
          toggleActions: "play none none reverse" // Play on scroll down, reverse on scroll up past it
        }
      }
    );
  });

  // Elements with .gsap-fade-in will just fade in
  const fadeInElements = document.querySelectorAll('.gsap-fade-in');
  fadeInElements.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  });
});
