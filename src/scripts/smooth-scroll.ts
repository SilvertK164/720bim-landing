import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap-init";

const lenis = new Lenis({
  lerp: 0.08,
  smoothWheel: true,
  wheelMultiplier: 0.8,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Handle anchor links smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(
      (anchor as HTMLAnchorElement).getAttribute("href")!
    );
    if (target) lenis.scrollTo(target as HTMLElement, { offset: -80 });
  });
});

export { lenis };
