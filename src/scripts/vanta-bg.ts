// Vanta.js animated background for CTA section
import * as THREE from "three";

function initVanta() {
  const el = document.getElementById("vanta-cta");
  if (!el) return;
  if ((el as any)._vantaEffect) return; // already initialized

  // Dynamic import to reduce initial bundle
  import("vanta/dist/vanta.net.min").then((VANTA) => {
    const effect = (VANTA as any).default({
      el,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x6366f1,         // indigo
      backgroundColor: 0x0a0a0a, // dark
      points: 8,
      maxDistance: 22,
      spacing: 18,
      showDots: true,
    });
    (el as any)._vantaEffect = effect;
  }).catch(() => {
    // Fallback: just keep the CSS background
    console.log("Vanta.js could not load, using fallback background");
  });
}

// Observe when CTA enters viewport to init (lazy)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initVanta();
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "200px" }
);

const ctaEl = document.getElementById("vanta-cta");
if (ctaEl) observer.observe(ctaEl);

document.addEventListener("astro:page-load", () => {
  const el = document.getElementById("vanta-cta");
  if (el) observer.observe(el);
});
