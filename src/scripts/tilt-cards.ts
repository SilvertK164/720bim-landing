// 3D Tilt effect on cards
import VanillaTilt from "vanilla-tilt";

// Wait for DOM
function initTilt() {
  // Service cards
  const serviceCards = document.querySelectorAll(".service-card") as NodeListOf<HTMLElement>;
  if (serviceCards.length) {
    VanillaTilt.init(serviceCards, {
      max: 8,
      speed: 400,
      scale: 1.02,
      glare: true,
      "max-glare": 0.15,
      perspective: 1000,
    });
  }

  // Tech cards (bento grid)
  const techCards = document.querySelectorAll(".tech-card") as NodeListOf<HTMLElement>;
  if (techCards.length) {
    VanillaTilt.init(techCards, {
      max: 6,
      speed: 300,
      scale: 1.01,
      glare: true,
      "max-glare": 0.1,
      perspective: 1200,
    });
  }

  // Project cards
  const projectCards = document.querySelectorAll(".swiper-slide") as NodeListOf<HTMLElement>;
  if (projectCards.length) {
    VanillaTilt.init(projectCards, {
      max: 5,
      speed: 400,
      scale: 1.02,
      glare: true,
      "max-glare": 0.08,
      perspective: 1500,
    });
  }
}

// Run on load and after view transitions
initTilt();
document.addEventListener("astro:page-load", initTilt);
