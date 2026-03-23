// Premium cursor follower effect
// Only on desktop (no touch devices)
if (window.matchMedia("(pointer: fine)").matches) {
  const cursor = document.createElement("div");
  cursor.id = "custom-cursor";
  cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
  document.body.appendChild(cursor);

  const dot = cursor.querySelector(".cursor-dot") as HTMLElement;
  const ring = cursor.querySelector(".cursor-ring") as HTMLElement;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effects on interactive elements
  const interactiveSelectors = 'a, button, [data-cursor="pointer"], .swiper-slide, .tech-card, .service-card';

  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(99, 102, 241, 0.5)";
      ring.style.background = "rgba(99, 102, 241, 0.05)";
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(0.5)`;
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(255, 255, 255, 0.3)";
      ring.style.background = "transparent";
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(1)`;
    });
  });

  // Text hover — cursor becomes blend mode
  document.querySelectorAll("h1, h2, .hero-title").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.width = "80px";
      ring.style.height = "80px";
      ring.style.mixBlendMode = "difference";
      ring.style.background = "white";
      ring.style.borderColor = "transparent";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.mixBlendMode = "normal";
      ring.style.background = "transparent";
      ring.style.borderColor = "rgba(255, 255, 255, 0.3)";
    });
  });

  // Hide on mouse leave window
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });
}
