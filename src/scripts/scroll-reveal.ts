// Scroll reveal using IntersectionObserver — compatible with Lenis
function initReveal() {
  const elements = document.querySelectorAll("[data-reveal]:not(.revealed)");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

// Init on load
initReveal();

// Re-init after view transitions
document.addEventListener("astro:page-load", initReveal);

// Also re-check on scroll (fallback for Lenis compatibility)
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 20) {
          el.classList.add("revealed");
        }
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
