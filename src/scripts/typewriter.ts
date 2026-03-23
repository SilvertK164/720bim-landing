// TypeIt - Typewriter effect for hero subtitle keywords
import TypeIt from "typeit";

function initTypewriter() {
  const el = document.getElementById("typewriter-text");
  if (!el) return;

  // Don't re-init
  if (el.dataset.initialized === "true") return;
  el.dataset.initialized = "true";

  new (TypeIt as any)(el, {
    speed: 60,
    deleteSpeed: 40,
    waitUntilVisible: true,
    loop: true,
    loopDelay: 2000,
    cursorChar: "|",
    cursorSpeed: 800,
  })
    .type("Drones", { delay: 1500 })
    .delete(6)
    .type("Realidad Virtual", { delay: 1500 })
    .delete(16)
    .type("Cámaras 360°", { delay: 1500 })
    .delete(13)
    .type("BIM Integrado", { delay: 1500 })
    .delete(13)
    .type("Realidad Aumentada", { delay: 1500 })
    .delete(18)
    .type("Innovación", { delay: 2000 })
    .delete(10)
    .go();
}

initTypewriter();
document.addEventListener("astro:page-load", initTypewriter);
